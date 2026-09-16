"""Rewrite `GRU(linear_before_reset=1)` nodes into `Scan`-wrapped manual cells.

Why: microsoft/onnxruntime#20405 introduced a typo (`"linear_before_reset "` with
trailing space) in the WebNN GRU builder. The attribute lookup always misses, so
every GRU runs with resetAfter=false regardless of what the model says. For
DeepFilterNet3 (and any PyTorch-exported GRU), this produces wrong hidden states
and downstream output is garbage.

Workaround: rewrite each `GRU(linear_before_reset=1)` node to a semantically
equivalent `Scan` node whose body implements the cell with primitive ops. The
WebNN EP accepts the Scan body without falling back to CPU.

Usage:
    python scripts/rewrite_gru_for_webnn.py INPUT.onnx OUTPUT.onnx
    python scripts/rewrite_gru_for_webnn.py --in-place file1.onnx file2.onnx
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable

import numpy as np
import onnx
from onnx import GraphProto, NodeProto, TensorProto, helper, numpy_helper


def _resolve_initializer_or_constant(graph: GraphProto, name: str) -> np.ndarray | None:
    """Return the concrete array for a tensor produced by an initializer or a Constant node."""
    for init in graph.initializer:
        if init.name == name:
            return numpy_helper.to_array(init)
    for node in graph.node:
        if node.op_type == "Constant" and name in node.output:
            for attr in node.attribute:
                if attr.name == "value":
                    return numpy_helper.to_array(attr.t)
    return None


def _get_attr(node: NodeProto, name: str, default=None):
    for attr in node.attribute:
        if attr.name == name:
            if attr.type == onnx.AttributeProto.INT: return attr.i
            if attr.type == onnx.AttributeProto.FLOAT: return attr.f
            if attr.type == onnx.AttributeProto.STRING: return attr.s.decode()
            if attr.type == onnx.AttributeProto.INTS: return list(attr.ints)
            if attr.type == onnx.AttributeProto.TENSOR: return numpy_helper.to_array(attr.t)
    return default


def _build_cell_nodes(prefix: str) -> list[NodeProto]:
    """Cell body: inputs h_prev[B,H], x_t[B,IN]; output h_new[B,H].

    Uses per-call-prefixed names for gate weights and intermediates so multiple
    rewrites in the same graph don't clash. Gate weights are initializers in the
    *body* graph, so we emit them separately and reference them here.
    """
    p = prefix
    return [
        helper.make_node("MatMul", ["x_t", f"{p}Wz_T"], [f"{p}xz_pre"]),
        helper.make_node("Add", [f"{p}xz_pre", f"{p}Wbz"], [f"{p}xz"]),
        helper.make_node("MatMul", ["x_t", f"{p}Wr_T"], [f"{p}xr_pre"]),
        helper.make_node("Add", [f"{p}xr_pre", f"{p}Wbr"], [f"{p}xr"]),
        helper.make_node("MatMul", ["x_t", f"{p}Wh_T"], [f"{p}xh_pre"]),
        helper.make_node("Add", [f"{p}xh_pre", f"{p}Wbh"], [f"{p}xh"]),
        helper.make_node("MatMul", ["h_prev", f"{p}Rz_T"], [f"{p}hz_pre"]),
        helper.make_node("Add", [f"{p}hz_pre", f"{p}Rbz"], [f"{p}hz"]),
        helper.make_node("MatMul", ["h_prev", f"{p}Rr_T"], [f"{p}hr_pre"]),
        helper.make_node("Add", [f"{p}hr_pre", f"{p}Rbr"], [f"{p}hr"]),
        helper.make_node("MatMul", ["h_prev", f"{p}Rh_T"], [f"{p}hh_pre"]),
        helper.make_node("Add", [f"{p}hh_pre", f"{p}Rbh"], [f"{p}hh"]),
        helper.make_node("Add", [f"{p}xz", f"{p}hz"], [f"{p}z_pre"]),
        helper.make_node("Sigmoid", [f"{p}z_pre"], [f"{p}z"]),
        helper.make_node("Add", [f"{p}xr", f"{p}hr"], [f"{p}r_pre"]),
        helper.make_node("Sigmoid", [f"{p}r_pre"], [f"{p}r"]),
        helper.make_node("Mul", [f"{p}r", f"{p}hh"], [f"{p}r_hh"]),
        helper.make_node("Add", [f"{p}xh", f"{p}r_hh"], [f"{p}n_pre"]),
        helper.make_node("Tanh", [f"{p}n_pre"], [f"{p}n"]),
        helper.make_node("Sub", [f"{p}const_one", f"{p}z"], [f"{p}one_minus_z"]),
        helper.make_node("Mul", [f"{p}one_minus_z", f"{p}n"], [f"{p}new_part"]),
        helper.make_node("Mul", [f"{p}z", "h_prev"], [f"{p}keep_part"]),
        helper.make_node("Add", [f"{p}new_part", f"{p}keep_part"], ["h_new"]),
    ]


def _gate_initializers(W: np.ndarray, R: np.ndarray, B: np.ndarray, prefix: str) -> list:
    """Split zrh-order GRU weights into per-gate pre-transposed matrices."""
    if W.ndim != 3 or W.shape[0] != 1:
        raise ValueError(f"expected W shape [1, 3H, IN], got {W.shape}")
    H3, IN = W.shape[1], W.shape[2]
    if H3 % 3 != 0:
        raise ValueError(f"3*hidden not divisible by 3: {H3}")
    H = H3 // 3
    if R.shape != (1, 3 * H, H):
        raise ValueError(f"expected R shape [1, 3H, H], got {R.shape}")
    if B.shape != (1, 6 * H):
        raise ValueError(f"expected B shape [1, 6H], got {B.shape}")
    Wz, Wr, Wh = W[0, :H, :], W[0, H:2 * H, :], W[0, 2 * H:, :]
    Rz, Rr, Rh = R[0, :H, :], R[0, H:2 * H, :], R[0, 2 * H:, :]
    Wbz, Wbr, Wbh = B[0, :H], B[0, H:2 * H], B[0, 2 * H:3 * H]
    Rbz, Rbr, Rbh = B[0, 3 * H:4 * H], B[0, 4 * H:5 * H], B[0, 5 * H:]
    one = np.array(1.0, dtype=W.dtype)
    p = prefix
    return [
        numpy_helper.from_array(Wz.T.astype(np.float32).copy(), name=f"{p}Wz_T"),
        numpy_helper.from_array(Wr.T.astype(np.float32).copy(), name=f"{p}Wr_T"),
        numpy_helper.from_array(Wh.T.astype(np.float32).copy(), name=f"{p}Wh_T"),
        numpy_helper.from_array(Rz.T.astype(np.float32).copy(), name=f"{p}Rz_T"),
        numpy_helper.from_array(Rr.T.astype(np.float32).copy(), name=f"{p}Rr_T"),
        numpy_helper.from_array(Rh.T.astype(np.float32).copy(), name=f"{p}Rh_T"),
        numpy_helper.from_array(Wbz.astype(np.float32).copy(), name=f"{p}Wbz"),
        numpy_helper.from_array(Wbr.astype(np.float32).copy(), name=f"{p}Wbr"),
        numpy_helper.from_array(Wbh.astype(np.float32).copy(), name=f"{p}Wbh"),
        numpy_helper.from_array(Rbz.astype(np.float32).copy(), name=f"{p}Rbz"),
        numpy_helper.from_array(Rbr.astype(np.float32).copy(), name=f"{p}Rbr"),
        numpy_helper.from_array(Rbh.astype(np.float32).copy(), name=f"{p}Rbh"),
        numpy_helper.from_array(one.astype(np.float32).copy(), name=f"{p}const_one"),
    ]


def _make_squeeze(data: str, out: str, axes: list[int], opset: int, name: str, graph: GraphProto, init_prefix: str):
    if opset >= 13:
        axes_name = f"{init_prefix}__sq_axes_{'_'.join(str(a) for a in axes)}"
        if not any(init.name == axes_name for init in graph.initializer):
            graph.initializer.append(numpy_helper.from_array(np.array(axes, dtype=np.int64), name=axes_name))
        return helper.make_node("Squeeze", [data, axes_name], [out], name=name)
    return helper.make_node("Squeeze", [data], [out], name=name, axes=axes)


def _make_unsqueeze(data: str, out: str, axes: list[int], opset: int, name: str, graph: GraphProto, init_prefix: str):
    if opset >= 13:
        axes_name = f"{init_prefix}__un_axes_{'_'.join(str(a) for a in axes)}"
        if not any(init.name == axes_name for init in graph.initializer):
            graph.initializer.append(numpy_helper.from_array(np.array(axes, dtype=np.int64), name=axes_name))
        return helper.make_node("Unsqueeze", [data, axes_name], [out], name=name)
    return helper.make_node("Unsqueeze", [data], [out], name=name, axes=axes)


def _model_opset(model: onnx.ModelProto) -> int:
    for o in model.opset_import:
        if o.domain in ("", "ai.onnx"):
            return o.version
    return 13


def _collect_used_tensor_names(graph: GraphProto) -> set[str]:
    used: set[str] = {o.name for o in graph.output}
    for node in graph.node:
        for inp in node.input:
            if inp:
                used.add(inp)
    return used


def _rewrite_one_gru(graph: GraphProto, node: NodeProto, idx: int, opset: int) -> None:
    """Replace `node` (a GRU) with an equivalent Scan subgraph, in-place on `graph`.

    The GRU has inputs [X, W, R, B, sequence_lens?, initial_h?] and outputs [Y, Y_h?].
    We build a Scan that produces scan_output matching Y up to a direction-axis unsqueeze,
    and final_state matching Y_h up to a direction-axis unsqueeze.
    """
    hidden = _get_attr(node, "hidden_size")
    lbr = _get_attr(node, "linear_before_reset", 0)
    direction = _get_attr(node, "direction", "forward")
    if hidden is None: raise ValueError(f"{node.name}: missing hidden_size")
    if direction != "forward": raise ValueError(f"{node.name}: only forward GRUs supported, got {direction}")
    if lbr != 1:
        # Not affected by the upstream bug; skip.
        return
    X_name = node.input[0]
    W_name = node.input[1]
    R_name = node.input[2]
    B_name = node.input[3] if len(node.input) > 3 and node.input[3] else None
    H0_name = node.input[5] if len(node.input) > 5 and node.input[5] else None
    W = _resolve_initializer_or_constant(graph, W_name)
    R = _resolve_initializer_or_constant(graph, R_name)
    B = _resolve_initializer_or_constant(graph, B_name) if B_name else np.zeros((1, 6 * hidden), dtype=np.float32)
    if W is None or R is None:
        raise RuntimeError(f"{node.name}: could not resolve W/R as initializer or Constant")
    # Treat a GRU output as "used" only if some other node or the graph output references it.
    consumers: set[str] = {o.name for o in graph.output}
    for other in graph.node:
        if other is node: continue
        for inp in other.input:
            if inp: consumers.add(inp)
    y_raw = node.output[0] if len(node.output) > 0 else None
    yh_raw = node.output[1] if len(node.output) > 1 else None
    y_name = y_raw if y_raw and y_raw in consumers else None
    yh_name = yh_raw if yh_raw and yh_raw in consumers else None
    prefix = f"gru_rw{idx}_"
    cell_nodes = _build_cell_nodes(prefix)
    body_inits = _gate_initializers(W, R, B, prefix)
    # Scan body: h_prev[B,H], x_t[B,IN] -> h_new[B,H], h_new_scan[B,H]
    h_prev_vi = helper.make_tensor_value_info("h_prev", TensorProto.FLOAT, [1, hidden])
    x_t_vi = helper.make_tensor_value_info("x_t", TensorProto.FLOAT, [1, W.shape[2]])
    h_state_out_vi = helper.make_tensor_value_info("h_new", TensorProto.FLOAT, [1, hidden])
    h_scan_out_vi = helper.make_tensor_value_info("h_new_scan", TensorProto.FLOAT, [1, hidden])
    cell_nodes.append(helper.make_node("Identity", ["h_new"], ["h_new_scan"]))
    body = helper.make_graph(
        cell_nodes, f"{prefix}scan_body",
        inputs=[h_prev_vi, x_t_vi],
        outputs=[h_state_out_vi, h_scan_out_vi],
        initializer=body_inits,
    )
    # Outer Scan input h0: shape [B, H]. GRU's initial_h (if given) is [num_dirs=1, B, H].
    new_nodes: list[NodeProto] = []
    if H0_name is not None:
        # Squeeze out the num_directions axis: [1, B, H] -> [B, H].
        h0_2d = f"{prefix}h0_2d"
        new_nodes.append(_make_squeeze(H0_name, h0_2d, [0], opset, f"{prefix}Squeeze_h0", graph, prefix))
    else:
        # Default to zeros. Derive batch from X via Shape+Gather+Concat to keep dynamic.
        # Simpler: GRU default is zeros with shape [1, B, H]; in DF3 batch is always 1,
        # so we emit a zeros initializer of shape [1, H].
        h0_2d = f"{prefix}h0_zeros"
        graph.initializer.append(numpy_helper.from_array(np.zeros((1, hidden), dtype=np.float32), name=h0_2d))
    scan_state_out = f"{prefix}scan_state_out"
    scan_seq_out = f"{prefix}scan_seq_out"
    new_nodes.append(helper.make_node(
        "Scan",
        inputs=[h0_2d, X_name],
        outputs=[scan_state_out, scan_seq_out],
        body=body,
        num_scan_inputs=1,
        name=f"{prefix}Scan",
    ))
    # scan_seq_out is [SEQ, B, H]; GRU's Y is [SEQ, num_dirs=1, B, H]. Insert dim 1.
    if y_name:
        new_nodes.append(_make_unsqueeze(scan_seq_out, y_name, [1], opset, f"{prefix}Unsqueeze_Y", graph, prefix))
    if yh_name:
        new_nodes.append(_make_unsqueeze(scan_state_out, yh_name, [0], opset, f"{prefix}Unsqueeze_Yh", graph, prefix))
    # Splice: replace the GRU node with new_nodes at the same position.
    gru_idx = list(graph.node).index(node)
    graph.node.remove(node)
    for offset, nn in enumerate(new_nodes):
        graph.node.insert(gru_idx + offset, nn)


def rewrite_model(model: onnx.ModelProto) -> tuple[onnx.ModelProto, int]:
    graph = model.graph
    opset = _model_opset(model)
    targets = [(i, n) for i, n in enumerate(graph.node)
               if n.op_type == "GRU" and _get_attr(n, "linear_before_reset", 0) == 1]
    rewrites = 0
    for idx, node in targets:
        _rewrite_one_gru(graph, node, rewrites, opset)
        rewrites += 1
    if rewrites > 0:
        onnx.checker.check_model(model)
    return model, rewrites


def process(inp: Path, out: Path) -> int:
    model = onnx.load(inp)
    model, n = rewrite_model(model)
    if n == 0:
        print(f"  {inp.name}: no matching GRU nodes; copying unchanged")
    else:
        print(f"  {inp.name}: rewrote {n} GRU node(s)")
    onnx.save(model, out)
    return n


def main(argv: Iterable[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("inputs", nargs="+", type=Path)
    ap.add_argument("--output", type=Path, help="single-file mode: output path")
    ap.add_argument("--suffix", default=".webnn.onnx",
                    help="when processing multiple inputs: output = input with .onnx replaced by this")
    args = ap.parse_args(list(argv))
    if args.output:
        if len(args.inputs) != 1:
            print("--output expects exactly one input", file=sys.stderr)
            return 2
        process(args.inputs[0], args.output)
        return 0
    for inp in args.inputs:
        if not inp.suffix == ".onnx":
            print(f"skipping non-.onnx file: {inp}", file=sys.stderr)
            continue
        out = inp.with_name(inp.stem + args.suffix)
        process(inp, out)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

# WebNN + ORT + OpenVINO EP: End-to-End Flow

## Overview

WebNN inference in Chrome involves two processes: the **Renderer Process** (runs JavaScript, builds the graph) and the **Browser/GPU Process** (compiles and executes the model on hardware). They communicate via Mojo IPC.

---

## Flow Diagram

```
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│       RENDERER PROCESS          │         │       BROWSER PROCESS           │
│                                 │         │                                 │
│  Web App (index.js / llm.js)   │         │  WebNN Service                  │
│         │                       │         │         │                       │
│         ▼                       │         │         ▼                       │
│  ORT Web (JS)                   │         │  ORT Backend                    │
│  ort.webgpu.min.js              │         │  onnxruntime.dll                │
│         │                       │         │  (statically linked in Chrome)  │
│         │ ORT Graph             │         │         │                       │
│         ▼                       │         │         │ ORT Optimized Graph   │
│  WebNN EP (JS)                  │         │         ▼                       │
│  maps ORT ops → WebNN ops       │         │  OpenVINO EP                    │
│         │                       │         │  (plugin DLL loaded at runtime) │
│         ▼                       │         │         │                       │
│  WebNN API Calls (JS)           │         │         ▼                       │
│         │                       │         │  Intel CPU / GPU / NPU          │
│         │ WebIDL Bindings       │         │                                 │
│         ▼                       │         └─────────────────────────────────┘
│  Blink WebNN (C++)              │                   ▲
│  blink/renderer/modules/ml/     │                   │
│         │                       │                   │
│         │ WebNN Graph           │                   │
│         ▼                       │                   │
│  Graph Serialized ──────────────┼── Mojo IPC ───────┘
│                                 │
└─────────────────────────────────┘
```

---

## Step-by-Step

### 1. Web App (Renderer)

The JavaScript application (e.g. `llm.js`) loads an ONNX model using ORT Web:

```js
session = await ort.InferenceSession.create(modelBytes, sessionOptions);
```

### 2. ORT Web (Renderer)

ORT Web (loaded from `ort.webgpu.min.js`) parses the ONNX model into an internal ORT graph. It applies JS-side optimizations and selects the WebNN Execution Provider.

### 3. WebNN EP - JS Side (Renderer)

The WebNN EP in ORT maps ORT operators to WebNN API calls. For example:
- `MatMul` → `MLGraphBuilder.matmul()`
- `GroupQueryAttention` → decomposed into `scaledDotProductAttention`, `expand`, `scatterND`, etc.
- `DequantizeLinear` → handled in WASM (not JS-side validation)

Session options like `freeDimensionOverrides` and `enableCausalLM` are passed through here.

### 4. Blink WebNN (Renderer)

The WebNN API calls from JS cross the WebIDL boundary into Blink's C++ implementation (`third_party/blink/renderer/modules/ml/`). Blink validates inputs, builds the MLGraph, and serializes it.

### 5. Mojo IPC (Renderer → Browser)

The serialized WebNN graph crosses from the Renderer process to the Browser/GPU process via Chromium's Mojo IPC channel.

### 6. WebNN Service (Browser)

`services/webnn/` receives the graph and routes it to the ORT backend.

### 7. ORT Backend (Browser)

A separate ORT instance (`onnxruntime.dll`, statically linked into Chrome) receives the WebNN graph. It:
- Reconstructs an ONNX-like graph from the WebNN representation (`services/webnn/ort/graph_builder_ort.cc`)
- Applies C++ graph optimizations (cast elimination, shape folding, etc.)
- Passes the optimized graph to the registered Execution Provider

Key config applied here (`services/webnn/public/cpp/execution_providers_info.h`):
```
ep.openvinoexecutionprovider.load_config: {
    "GPU": { "EXECUTION_MODE_HINT": "ACCURACY", "INFERENCE_PRECISION_HINT": "f16" },
    "NPU": { "EXECUTION_MODE_HINT": "ACCURACY" }
}
```

### 8. OpenVINO EP (Browser)

The OVEP plugin DLL (`onnxruntime_providers_openvino_plugin.dll`) is loaded at runtime via:
```
--webnn-ort-ep-library-path-for-testing=OpenVINOExecutionProvider?"<path>"
```

It:
- Converts the ORT graph to an OpenVINO Model via the ONNX Frontend
- Applies transformations (e.g. `MakeStateful` for causalLM)
- Calls `ov::Core::compile_model(model, "GPU", configs)` with the load_config
- Creates an `InferRequest` for execution

### 9. Hardware Execution

OpenVINO dispatches the compiled model to Intel hardware:
- **GPU**: Intel Arc / Iris Xe (via OpenCL or Level Zero)
- **NPU**: Intel AI Boost (via NPU plugin)
- **CPU**: fallback

---

## Per-Inference Flow (Dispatch)

Once the session is created, each `session.run()` call triggers:

1. **JS**: `session.run(feed, fetches)` with MLTensor inputs/outputs
2. **Renderer**: Blink validates tensor shapes against graph constraints (`ValidateDynamicDimensionConsistency`)
3. **IPC**: Tensor handles + dispatch command sent to Browser process
4. **Browser**: ORT binds tensors to OVEP's `InferRequest`, calls `infer()`
5. **GPU**: OpenVINO executes the compiled model
6. **Return**: Results available in pre-allocated MLTensors; JS calls `readTensor()` to read back

---

## Key Files

| Layer | Location | Role |
|-------|----------|------|
| Web App | `demos/text-generation-v2/llm.js` | Session creation, inference loop, KV cache management |
| ORT Web | `assets/dist/ort.webgpu.min.js` | ONNX parsing, WebNN EP, JS-side graph building |
| Blink WebNN | `third_party/blink/renderer/modules/ml/` | WebIDL bindings, graph validation |
| WebNN Service | `services/webnn/` | Graph routing, ORT backend host |
| Graph Builder | `services/webnn/ort/graph_builder_ort.cc` | Reconstructs ORT graph from WebNN representation |
| EP Config | `services/webnn/public/cpp/execution_providers_info.h` | OV load_config (precision, accuracy hints) |
| OVEP Plugin | `frameworks.ai.onnxruntime.openvino-plugin-ep/` | OV model compilation, inference, stateful support |

---

## Chrome Launch Flags

Without any ORT/OVEP flags, Chrome uses the **default WinML/DirectML backend** (Windows native WebNN implementation). To use OpenVINO instead, pass:

```
--webnn-ort-library-path-for-testing=<path-to-onnxruntime.dll-directory>
--webnn-ort-ep-library-path-for-testing=OpenVINOExecutionProvider?"<path-to-ovep.dll>"
--webnn-ort-ovep-enable-causallm
--allow-third-party-modules
--no-sandbox
--enable-features=WinSboxHighGPUJobMemoryLimits
```

| Flag | Purpose |
|------|---------|
| `--webnn-ort-library-path-for-testing` | Overrides Chrome's built-in ORT with an external `onnxruntime.dll` |
| `--webnn-ort-ep-library-path-for-testing` | Loads a custom EP plugin DLL (e.g. OpenVINO EP) |
| `--webnn-ort-ovep-enable-causallm` | Enables stateful KV cache (MakeStateful) in OVEP |
| None of the above | Uses system default WinML/DirectML backend |

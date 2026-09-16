#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");

const STEM_DIR = join(REPO_ROOT, "demos", "stem-separator", "models", "htdemucs_fwd");
const DF3_DIR = join(REPO_ROOT, "demos", "noise-suppression", "models", "df3");

const HTDEMUCS_BASE = "https://huggingface.co/Intel/demucs-openvino/resolve/main/htdemucs_v4";
const DF3_TARBALL = "https://raw.githubusercontent.com/Rikorose/DeepFilterNet/main/models/DeepFilterNet3_onnx.tar.gz";

const HTDEMUCS_FILES = [
    { name: "htdemucs_fwd.onnx", bytes: 2385507 },
    { name: "htdemucs_fwd.onnx.data", bytes: 168361984 },
];

const DF3_FILES = [
    { name: "enc.onnx", bytes: 1954042, sha256: "7c5399d3da8a50ebef1c1a0ae421b33376aa5e45d0e92df16da7e83c9c131916" },
    {
        name: "erb_dec.onnx",
        bytes: 3292397,
        sha256: "ab669a1d10afe20911728b33053a452071042317a90581092b325da7b2f9d895",
    },
    { name: "df_dec.onnx", bytes: 3340803, sha256: "23114ce3b0f6464b763ee62f7bb8aab6b2a129a21eabd5bcfe59413db05f278a" },
];

const fail = message => {
    console.error(`\n[error] ${message}\n`);
    process.exit(1);
};

const statSafe = filePath => {
    try {
        return statSync(filePath);
    } catch {
        return null;
    }
};

const sha256Of = filePath => createHash("sha256").update(readFileSync(filePath)).digest("hex");

const run = (command, args, options = {}) => spawnSync(command, args, { stdio: "inherit", ...options });

const hasCommand = (command, args = ["--version"]) => run(command, args, { stdio: "pipe" }).status === 0;

const curlDownload = (url, destination) => {
    const partial = `${destination}.partial`;
    let res = run("curl", ["-fL", "--retry", "3", "--retry-delay", "2", "--progress-bar", "-o", partial, url]);
    if (res.status !== 0) {
        res = run("curl", [
            "-fL",
            "--ssl-no-revoke",
            "--retry",
            "3",
            "--retry-delay",
            "2",
            "--progress-bar",
            "-o",
            partial,
            url,
        ]);
    }
    if (res.status !== 0) {
        rmSync(partial, { force: true });
        fail(`curl failed for ${url}`);
    }
    renameSync(partial, destination);
};

const ensureBySize = (url, destination, expectedBytes) => {
    const st = statSafe(destination);
    if (st && st.size === expectedBytes) {
        console.log(`  [skip] ${destination.replace(REPO_ROOT, ".")} (${st.size} bytes)`);
        return;
    }
    console.log(`  [get] ${url}`);
    curlDownload(url, destination);
    const done = statSafe(destination);
    if (!done || done.size !== expectedBytes) {
        fail(`${destination}: expected ${expectedBytes} bytes`);
    }
};

const findFile = (root, name) => {
    for (const entry of readdirSync(root, { withFileTypes: true })) {
        const p = join(root, entry.name);
        if (entry.isDirectory()) {
            const nested = findFile(p, name);
            if (nested) return nested;
        } else if (entry.name === name) {
            return p;
        }
    }
    return null;
};

const resolvePython = () => {
    for (const candidate of ["python3", "python"]) {
        const probe = run(candidate, ["-c", "import onnx, numpy"], { stdio: "pipe" });
        if (probe.status === 0) return candidate;
    }
    return null;
};

const ensureStem = () => {
    console.log("\n[1/3] Stem Separator model");
    mkdirSync(STEM_DIR, { recursive: true });
    for (const file of HTDEMUCS_FILES) {
        ensureBySize(`${HTDEMUCS_BASE}/${file.name}`, join(STEM_DIR, file.name), file.bytes);
    }
};

const ensureDf3Base = () => {
    console.log("\n[2/3] Noise Suppression DF3 base ONNX");
    mkdirSync(DF3_DIR, { recursive: true });
    const present = DF3_FILES.every(file => {
        const st = statSafe(join(DF3_DIR, file.name));
        return st && st.size === file.bytes;
    });

    if (!present) {
        const staging = mkdtempSync(join(tmpdir(), "df3-"));
        const archive = "DeepFilterNet3_onnx.tar.gz";
        const archivePath = join(staging, archive);

        curlDownload(DF3_TARBALL, archivePath);
        const extract = run("tar", ["-xzf", archive], { cwd: staging });
        if (extract.status !== 0) {
            rmSync(staging, { recursive: true, force: true });
            fail("failed to extract DeepFilterNet3 tarball");
        }

        for (const file of DF3_FILES) {
            const found = findFile(staging, file.name);
            if (!found) {
                rmSync(staging, { recursive: true, force: true });
                fail(`${file.name} not found in DeepFilterNet3 tarball`);
            }
            renameSync(found, join(DF3_DIR, file.name));
        }
        rmSync(staging, { recursive: true, force: true });
    }

    for (const file of DF3_FILES) {
        const full = join(DF3_DIR, file.name);
        const st = statSafe(full);
        if (!st || st.size !== file.bytes) {
            fail(`${file.name}: size check failed`);
        }
        const digest = sha256Of(full);
        if (digest !== file.sha256) {
            fail(`${file.name}: sha256 mismatch`);
        }
        console.log(`  [ok] ${file.name} (${file.bytes} bytes)`);
    }
};

const ensureDf3WebnnVariants = () => {
    console.log("\n[3/3] Derive DF3 WebNN variants (default)");
    const python = resolvePython();
    if (!python) {
        fail("Python with onnx and numpy is required. Install with: pip install onnx numpy");
    }

    const rewriteScript = join(REPO_ROOT, "scripts", "rewrite_gru_for_webnn.py");
    if (!existsSync(rewriteScript)) {
        fail(`Missing rewrite script: ${rewriteScript}`);
    }

    const inputs = DF3_FILES.map(file => join(DF3_DIR, file.name));
    const rewrite = run(python, [rewriteScript, ...inputs]);
    if (rewrite.status !== 0) {
        fail("GRU rewrite failed");
    }

    for (const file of DF3_FILES) {
        const rewritten = join(DF3_DIR, file.name.replace(".onnx", ".webnn.onnx"));
        if (!statSafe(rewritten)) {
            fail(`Missing rewritten file: ${rewritten}`);
        }
    }
    console.log("  [ok] .webnn.onnx variants are ready");
};

const main = () => {
    console.log("\nFetch only audio models for stem-separator + noise-suppression\n");

    if (!hasCommand("curl")) fail("curl is required but not found on PATH");
    if (!hasCommand("tar")) fail("tar is required but not found on PATH");

    ensureStem();
    ensureDf3Base();
    ensureDf3WebnnVariants();

    console.log("\nDone.\n");
};

main();

#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");

const STEM_DIR = join(REPO_ROOT, "demos", "stem-separator", "models", "htdemucs_fwd");

const HTDEMUCS_BASE = "https://huggingface.co/Intel/demucs-openvino/resolve/main/htdemucs_v4";

const HTDEMUCS_FILES = [
    { name: "htdemucs_fwd.onnx", bytes: 2385507 },
    { name: "htdemucs_fwd.onnx.data", bytes: 168361984 },
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

const ensureStem = () => {
    console.log("\n[1/1] Stem Separator model");
    mkdirSync(STEM_DIR, { recursive: true });
    for (const file of HTDEMUCS_FILES) {
        ensureBySize(`${HTDEMUCS_BASE}/${file.name}`, join(STEM_DIR, file.name), file.bytes);
    }
};

const main = () => {
    console.log("\nFetch only audio models for stem-separator\n");

    if (!hasCommand("curl")) fail("curl is required but not found on PATH");

    ensureStem();

    console.log("\nDone.\n");
};

main();

/* eslint-disable no-undef */
import {
    $,
    convertToSnakeCase,
    createMlTensor,
    createGpuTensor,
    readBackMLTensor,
    readBackGpuTensor,
} from "../../assets/js/common_utils.js";
import {
    getModelOPFS,
    log,
    updateOnnxCompileProgress,
    updateOnnxDataCompileProgress,
    updateLoadProgress,
    updateProgressBar,
    loadProgress,
    onnxFetchProgress,
    onnxDataFetchProgress,
    onnxCompileProgress,
    onnxDataCompileProgress,
} from "./utils.js";
import { WebNNPerf } from "../webnn-perf.js";
// Class to handle a large language model on top of onnxruntime-web
export class LLM {
    provider = "webnn";
    session1 = undefined;
    session2 = undefined;
    feed = {};
    fetches = {};
    outputTokens = [];
    stop = false;
    kvDims = [];
    deviceType = "gpu";
    maxLength = 2048;
    mlContext = undefined;
    startLength = 0;
    logitsBuffer = undefined;
    repetitionPenalty = 1.0;
    temperature = 0.0;
    topK = 0;

    constructor(maxLength) {
        this.maxLength = maxLength;
    }

    async load(model, options, flag = true) {
        this.provider = options.provider;
        this.deviceType = options.deviceType;
        const verbose = options.verbose;
        this.eos = model.eos_token_id; // End of sentence token ids
        this.numLayers = model.num_layers;
        this.kvNumHeads = model.kv_num_heads;
        this.headSize = model.head_size;
        this.kvDims = [1, model.kv_num_heads, this.maxLength, model.head_size];
        this.vocabSize = model.vocab_size;
        this.hasPositionIds = !!model.has_position_ids;
        this.useGqa = model.use_gqa !== false; // default true (GQA models); set false for non-GQA
        this.enableAdditiveDimParam = !!model.enable_additive_dim_param; // parse "a+b" dim expressions
        this.kvDtype = model.kv_dtype || "float16"; // KV cache & logits data type
        this.repetitionPenalty = model.repetition_penalty || 1.0;
        this.temperature = model.temperature || 0.0;
        this.topK = model.top_k || 0;
        this.topP = model.top_p || 1.0;
        this.endThinkTokenId = model.end_think_token_id || 0; // token ID for </think>
        this.maxThinkTokens = model.max_think_tokens || 0; // 0 = no limit
        this.logitsBuffer = this.kvDtype === "float16" ? new Float16Array(this.vocabSize) : new Float32Array(this.vocabSize);
        log(`WebNN EP config: ${model.name} · ${this.provider} · ${this.deviceType}`);

        const path = options.local ? model.local_path : model.remote_path;
        const modelFile = model.file_name;
        const modelPath = path + modelFile;
        const modelName = convertToSnakeCase(model.name);
        const modelBytes = await WebNNPerf.time(
            "webnn.model.fetch",
            () => getModelOPFS(`${modelName}_${modelFile}`, modelPath, false),
            { model: modelName },
        );
        const externalFile = model.external_data_file || modelFile + ".data";
        const externalDataPath = path + externalFile;
        const externalDataBytes = await WebNNPerf.time(
            "webnn.model.fetch",
            () => getModelOPFS(`${modelName}_${externalFile}`, externalDataPath, false),
            { model: `${modelName}-data` },
        );

        let modelSize = modelBytes.byteLength;
        modelSize += externalDataBytes.byteLength;

        log(`model size: ${Math.round(modelSize / 1024 / 1024)} MB`);
        WebNNPerf.configure({ model: modelName, device: this.deviceType, provider: this.provider });
        if (this.provider == "webnn") {
            this.mlContext = await WebNNPerf.time("webnn.context.create", () =>
                navigator.ml.createContext({ deviceType: this.deviceType }),
            );
        }
        const sessionOptions = {
            executionProviders: [
                {
                    name: this.provider,
                    deviceType: this.deviceType,
                    context: this.mlContext,
                    enableCausalLM: !!options.enable_causallm,
                    enableAdditiveDimParam: this.enableAdditiveDimParam,
                    freeDimensionBounds: this.useGqa
                        ? {
                              sequence_length: { maxSize: this.maxLength },
                              total_sequence_length: { maxSize: this.maxLength },
                          }
                        : undefined,
                },
            ],
            externalData: [
                {
                    data: externalDataBytes,
                    path: externalFile,
                },
            ],
            extra: {
                session: {
                    strict_shape_type_inference: "1",
                },
            },
        };

        if (verbose) {
            sessionOptions.logSeverityLevel = 0;
            sessionOptions.logVerbosityLevel = 0;
        }

        if (this.provider == "webnn") {
            if (this.useGqa) {
                // GQA models: past_sequence_length is static (override), KV shape stays constant
                sessionOptions.freeDimensionOverrides = {
                    batch_size: 1,
                    past_sequence_length: this.maxLength,
                };
            } else {
                // Non-GQA WebNN: fixed-size KV with masking (like GQA approach).
                // All dims are static — avoids dynamic-shape GPU crashes.
                sessionOptions.freeDimensionOverrides = {
                    batch_size: 1,
                    sequence_length: 1,
                    past_sequence_length: this.maxLength - 1,
                    "past_sequence_length + sequence_length": this.maxLength,
                };
            }
        }

        let progressBarLabel = $("#p-bar-label");
        log("Create session for prefill process");
        console.log("Create session with option: ");
        console.log({ ...sessionOptions });
        this.session1 = await WebNNPerf.time(
            "webnn.session.create",
            () => ort.InferenceSession.create(modelBytes, sessionOptions),
            { model: `${modelName}-prefill` },
        );
        updateOnnxCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Prefill session created · ${loadProgress.toFixed(2)}%`;

        log("Session created");

        if (this.provider == "webgpu") {
            this.gpuDevice = ort.env.webgpu.device;
        }

        updateOnnxDataCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Session for decode created · ${loadProgress.toFixed(2)}%`;

        updateProgressBar(100.0);
        progressBarLabel.innerHTML = "100%";

        if (!flag) {
            this.initialize();
        }
    }

    disposeTensors(tensors) {
        if (tensors && typeof tensors === "object") {
            for (const name in tensors) {
                const t = tensors[name];
                if (t.disposer == undefined) {
                    if (t.location == "ml-tensor") {
                        t.mlTensor.destroy();
                    }
                    if (t.location == "gpu-buffer") {
                        t.gpuBuffer.destroy();
                    }
                } else {
                    t.dispose();
                }
            }
        }
    }

    // Initialize key value caches
    async initialize() {
        // Dispose previous tensors
        this.disposeTensors(this.feed);
        this.disposeTensors(this.fetches);

        this.feed = {};
        this.fetches = {};
        if (this.provider == "webnn") {
            if (this.useGqa) {
                // GQA models: KV shape is static [1, heads, maxLength, headSize]
                // Pre-allocate fixed-size ml-tensors for both feed and fetches
                for (let i = 0; i < this.numLayers; ++i) {
                    this.feed[`past_key_values.${i}.key`] = await createMlTensor(
                        this.mlContext,
                        this.kvDtype,
                        this.kvDims,
                        false,
                        false,
                    );
                    this.feed[`past_key_values.${i}.value`] = await createMlTensor(
                        this.mlContext,
                        this.kvDtype,
                        this.kvDims,
                        false,
                        false,
                    );

                    this.fetches[`present.${i}.key`] = await createMlTensor(
                        this.mlContext,
                        this.kvDtype,
                        this.kvDims,
                        false,
                        false,
                    );
                    this.fetches[`present.${i}.value`] = await createMlTensor(
                        this.mlContext,
                        this.kvDtype,
                        this.kvDims,
                        false,
                        false,
                    );
                }
            } else {
                // Non-GQA WebNN: GPU-resident fixed-size KV with slice graph.
                // Pre-allocate MLTensors for both past (feed) and present (fetches).
                // A WebNN slice graph updates past from present each step (GPU-to-GPU, no CPU roundtrip).
                const pastSeqLen = this.maxLength - 1;
                const presentSeqLen = this.maxLength;
                const pastDims = [1, this.kvNumHeads, pastSeqLen, this.headSize];
                const presentDims = [1, this.kvNumHeads, presentSeqLen, this.headSize];

                for (let i = 0; i < this.numLayers; ++i) {
                    this.feed[`past_key_values.${i}.key`] = await createMlTensor(
                        this.mlContext, this.kvDtype, pastDims, true, false);
                    this.feed[`past_key_values.${i}.value`] = await createMlTensor(
                        this.mlContext, this.kvDtype, pastDims, true, false);

                    this.fetches[`present.${i}.key`] = await createMlTensor(
                        this.mlContext, this.kvDtype, presentDims, false, true);
                    this.fetches[`present.${i}.value`] = await createMlTensor(
                        this.mlContext, this.kvDtype, presentDims, false, true);
                }

                // Zero-fill all past KV tensors
                const kvElements = this.kvNumHeads * pastSeqLen * this.headSize;
                const kvZeros = this.kvDtype === "float16" ? new Float16Array(kvElements) : new Float32Array(kvElements);
                for (let i = 0; i < this.numLayers; ++i) {
                    await this.mlContext.writeTensor(this.feed[`past_key_values.${i}.key`].mlTensor, kvZeros);
                    await this.mlContext.writeTensor(this.feed[`past_key_values.${i}.value`].mlTensor, kvZeros);
                }

                // Build a WebNN slice graph: present[1:] → past (GPU-to-GPU)
                const builder = new MLGraphBuilder(this.mlContext);
                const sliceInput = builder.input('present', {
                    dataType: this.kvDtype === "float16" ? 'float16' : 'float32',
                    shape: presentDims
                });
                const sliceOutput = builder.slice(sliceInput, [0, 0, 1, 0], pastDims);
                this.kvSliceGraph = await builder.build({ 'past': sliceOutput });
                log(`GPU KV slice graph built: [1,${this.kvNumHeads},${presentSeqLen},${this.headSize}] → [1,${this.kvNumHeads},${pastSeqLen},${this.headSize}]`);

                this.startLength = 0;
            }
            // Pre-allocate logits MLTensor for both GQA and non-GQA WebNN paths
            this.fetches["logits"] = await createMlTensor(
                this.mlContext,
                this.kvDtype,
                [1, 1, this.vocabSize],
                false,
                true,
            );
        } else if (this.provider == "webgpu") {
            // Pre-allocate kv cache gpu-buffer
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const bytesPerElement = this.kvDtype === "float16" ? 2 : 4;
            const bufferSize = numElements * bytesPerElement;
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = createGpuTensor(
                    this.gpuDevice,
                    this.kvDtype,
                    this.kvDims,
                    bufferSize,
                );
                this.feed[`past_key_values.${i}.value`] = createGpuTensor(
                    this.gpuDevice,
                    this.kvDtype,
                    this.kvDims,
                    bufferSize,
                );

                // The GQA spec suggests to use the same tensor for both present_key & present_value
                // and past_key & past_value if the total_sequence_length = max_sequence_length
                // in order to save GPU memory.
                this.fetches[`present.${i}.key`] = this.feed[`past_key_values.${i}.key`];
                this.fetches[`present.${i}.value`] = this.feed[`past_key_values.${i}.value`];
            }
            this.fetches["logits"] = createGpuTensor(
                this.gpuDevice,
                this.kvDtype,
                [1, 1, this.vocabSize],
                this.vocabSize * bytesPerElement,
            );
        } else {
            // Initialize kv cache as empty tensors for WASM EP
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const emptyTensor = this.kvDtype === "float16" ? new Float16Array(numElements) : new Float32Array(numElements);
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = new ort.Tensor(this.kvDtype, emptyTensor, this.kvDims);
                this.feed[`past_key_values.${i}.value`] = new ort.Tensor(this.kvDtype, emptyTensor, this.kvDims);
            }
            const emptyLogits = this.kvDtype === "float16" ? new Float16Array(this.vocabSize) : new Float32Array(this.vocabSize);
            this.fetches["logits"] = new ort.Tensor(this.kvDtype, emptyLogits, [
                1,
                1,
                this.vocabSize,
            ]);
        }
    }

    // Update key value cache
    updateKvCache(outputs) {
        if (this.provider == "webnn" && !this.useGqa && this.kvSliceGraph) {
            // GPU-resident KV: dispatch slice graph for each layer's present → past (GPU-to-GPU)
            for (let i = 0; i < this.numLayers; ++i) {
                this.mlContext.dispatch(
                    this.kvSliceGraph,
                    { 'present': this.fetches[`present.${i}.key`].mlTensor },
                    { 'past': this.feed[`past_key_values.${i}.key`].mlTensor }
                );
                this.mlContext.dispatch(
                    this.kvSliceGraph,
                    { 'present': this.fetches[`present.${i}.value`].mlTensor },
                    { 'past': this.feed[`past_key_values.${i}.value`].mlTensor }
                );
            }
            return;
        }

        for (const name in outputs) {
            if (name.includes("present.")) {
                let newName = name.replace(name.split(".")[0], "past_key_values");
                const t = this.feed[newName];
                if (this.fetches[name]) {
                    this.feed[newName] = this.fetches[name];
                    this.fetches[name] = t;
                } else {
                    this.feed[newName] = outputs[name];
                }
            }
        }
    }

    // Padding input array with 0
    paddingInput(originInput, maxLength, reverse = false) {
        let input = originInput.slice();
        if (input.length >= maxLength) return input.slice(0, maxLength);
        const paddingLength = maxLength - input.length;
        const padding = Array.from({ length: paddingLength }, () => 0n);
        if (reverse) {
            return padding.concat(input);
        } else {
            return input.concat(padding);
        }
    }

    // Tell generate() to stop
    abort() {
        this.stop = true;
    }

    // Apply repetition penalty to logits for tokens that already appeared
    // Uses frequency-based penalty: penalty^min(count, maxCount) to avoid over-penalizing common words
    applyRepetitionPenalty(logits, vocabSize, generatedTokens, penalty) {
        if (penalty === 1.0 || generatedTokens.length === 0) return;
        const maxCount = 3; // Cap frequency to avoid destroying common word probabilities
        // Count frequency of each token
        const freq = new Map();
        for (const tokenId of generatedTokens) {
            freq.set(tokenId, (freq.get(tokenId) || 0) + 1);
        }
        for (const [tokenId, count] of freq) {
            if (tokenId >= 0 && tokenId < vocabSize) {
                const effectivePenalty = Math.pow(penalty, Math.min(count, maxCount));
                if (logits[tokenId] > 0) {
                    logits[tokenId] = logits[tokenId] / effectivePenalty;
                } else {
                    logits[tokenId] = logits[tokenId] * effectivePenalty;
                }
            }
        }
    }

    // Poor man's argmax
    argmax(arr, vocabSize) {
        let start = 0;
        let max = arr[start];
        let maxIndex = 0;

        for (let i = 0; i < vocabSize; i++) {
            const val = arr[i + start];
            if (!isFinite(val)) {
                throw new Error("Found infinity in logits");
            }
            if (val > max) {
                max = arr[i + start];
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    // Sample from logits using temperature, top-k and top-p (nucleus) sampling
    sampleTopK(logits, vocabSize, temperature, topK, topP) {
        // Build array of {index, logit} pairs
        const candidates = new Array(vocabSize);
        for (let i = 0; i < vocabSize; i++) {
            candidates[i] = { index: i, logit: Number(logits[i]) };
        }

        // Sort by logit descending
        candidates.sort((a, b) => b.logit - a.logit);

        // Top-k filtering
        const k = topK > 0 ? Math.min(topK, vocabSize) : vocabSize;
        let filtered = candidates.slice(0, k);

        // Apply temperature and compute softmax
        const scaledLogits = filtered.map(c => c.logit / temperature);
        const maxLogit = scaledLogits[0];
        const expValues = scaledLogits.map(l => Math.exp(l - maxLogit));
        const sumExp = expValues.reduce((a, b) => a + b, 0);
        const probs = expValues.map(e => e / sumExp);

        // Top-p (nucleus) filtering: keep smallest set of tokens whose cumulative prob >= topP
        if (topP < 1.0) {
            let cumProb = 0;
            let cutoff = probs.length;
            for (let i = 0; i < probs.length; i++) {
                cumProb += probs[i];
                if (cumProb >= topP) {
                    cutoff = i + 1;
                    break;
                }
            }
            // Re-normalize probabilities over the nucleus
            filtered = filtered.slice(0, cutoff);
            const nucleusProbs = probs.slice(0, cutoff);
            const nucleusSum = nucleusProbs.reduce((a, b) => a + b, 0);
            const normalizedProbs = nucleusProbs.map(p => p / nucleusSum);

            // Sample from nucleus
            const r = Math.random();
            let cumulative = 0;
            for (let i = 0; i < normalizedProbs.length; i++) {
                cumulative += normalizedProbs[i];
                if (r < cumulative) {
                    return filtered[i].index;
                }
            }
            return filtered[filtered.length - 1].index;
        }

        // Sample from the distribution (no top-p)
        const r = Math.random();
        let cumulative = 0;
        for (let i = 0; i < probs.length; i++) {
            cumulative += probs[i];
            if (r < cumulative) {
                return filtered[i].index;
            }
        }
        return filtered[filtered.length - 1].index;
    }

    // Select next token: sampling if temperature > 0, otherwise greedy argmax
    selectToken(logits, vocabSize) {
        if (this.temperature > 0) {
            return this.sampleTopK(logits, vocabSize, this.temperature, this.topK, this.topP);
        }
        return this.argmax(logits, vocabSize);
    }

    // Prefill prompt and generate tokens, greedy search only
    async generate(inputIds, callback) {
        this.outputTokens = [];
        const inputIdsLen = inputIds.length;
        const attnMaskLen = this.startLength + inputIdsLen;

        // Guard: total sequence length must not exceed maxLength
        if (this.startLength + inputIdsLen > this.maxLength) {
            throw new Error(
                `Total sequence length (${this.startLength + inputIdsLen}) exceeds maxLength (${this.maxLength}). ` +
                    `startLength=${this.startLength}, inputIdsLen=${inputIdsLen}. Use Ctrl+Enter to start a new conversation.`,
            );
        }

        this.stop = false;
        let lastToken = 0;
        let outputs;
        let attnMask;

        if (this.provider == "webnn" && !this.useGqa) {
            // Non-GQA GPU-resident KV path: prefill token-by-token with MLTensor buffers.
            // attention_mask is always [1, maxLength] with left-padded zeros, right-aligned ones.
            for (let i = 0; i < inputIdsLen; ++i) {
                this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([inputIds[i]]), [1, 1]);
                // Build fixed-size mask: zeros for empty positions, ones for real tokens + current
                const numReal = this.startLength + 1; // tokens processed so far + current
                const mask = new BigInt64Array(this.maxLength);
                for (let j = this.maxLength - numReal; j < this.maxLength; j++) {
                    mask[j] = 1n;
                }
                this.feed["attention_mask"] = new ort.Tensor("int64", mask, [1, this.maxLength]);
                if (this.hasPositionIds) {
                    this.feed["position_ids"] = new ort.Tensor(
                        "int64",
                        BigInt64Array.from([BigInt(this.startLength)]),
                        [1, 1],
                    );
                }

                outputs = await WebNNPerf.time(
                    i === 0 ? "webnn.inference.first" : "webnn.inference",
                    () => this.session1.run(this.feed, this.fetches),
                    {
                        model: i === 0 ? "prefill" : "prefill-step",
                        iteration: i + 1,
                    },
                );

                // Logits written to pre-allocated MLTensor — read back from GPU
                await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
                this.updateKvCache(outputs);
                this.startLength++;
            }
        } else {
            attnMask = Array.from({ length: attnMaskLen }, () => BigInt(1));

            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(inputIds), [1, inputIds.length]);
            this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
            if (this.hasPositionIds) {
                const positionIds = Array.from({ length: inputIdsLen }, (_, i) => BigInt(this.startLength + i));
                this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(positionIds), [
                    1,
                    positionIds.length,
                ]);
            }

            outputs = await WebNNPerf.time("webnn.inference.first", () => this.session1.run(this.feed, this.fetches), {
                model: "prefill",
            });

            if (this.provider == "webnn") {
                // GQA path: logits in pre-allocated MLTensor
                await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
            } else if (this.provider == "webgpu") {
                const logitBytes = this.vocabSize * (this.kvDtype === "float16" ? 2 : 4);
                await readBackGpuTensor(
                    this.gpuDevice,
                    this.fetches["logits"].gpuBuffer,
                    logitBytes,
                    this.logitsBuffer,
                );
            } else {
                this.logitsBuffer = outputs["logits"].cpuData;
            }

            this.startLength = this.startLength + inputIdsLen;
            this.updateKvCache(outputs);
        }

        this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
        lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);

        // Thinking budget: force </think> if model hasn't produced it within budget
        let thinkingDone = false;
        const hasThinkBudget = this.endThinkTokenId > 0 && this.maxThinkTokens > 0;

        this.outputTokens.push(lastToken);
        if (lastToken === this.endThinkTokenId) thinkingDone = true;
        if (callback) {
            callback(this.outputTokens);
        }
        while (this.eos.indexOf(lastToken) == -1 && !this.stop && this.startLength < this.maxLength) {
            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(lastToken)]), [1, 1]);
            if (this.provider == "webnn" && !this.useGqa) {
                // Fixed-size mask for non-GQA WebNN (GPU-resident KV)
                const numReal = this.startLength + 1;
                const mask = new BigInt64Array(this.maxLength);
                for (let j = this.maxLength - numReal; j < this.maxLength; j++) {
                    mask[j] = 1n;
                }
                this.feed["attention_mask"] = new ort.Tensor("int64", mask, [1, this.maxLength]);
            } else {
                attnMask.push(1n);
                this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
            }
            if (this.hasPositionIds) {
                this.feed["position_ids"] = new ort.Tensor(
                    "int64",
                    BigInt64Array.from([BigInt(this.startLength)]),
                    [1, 1],
                );
            }
            if (this.provider == "webnn") {
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode",
                    iteration: this.outputTokens.length,
                });
                // Both GQA and non-GQA: logits in pre-allocated MLTensor
                await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
            } else if (this.provider == "webgpu") {
                if (!this.fetches["logits"]) {
                    // Pre-allocate logits gpu-buffer once
                    const bpe = this.kvDtype === "float16" ? 2 : 4;
                    this.fetches["logits"] = createGpuTensor(
                        this.gpuDevice,
                        this.kvDtype,
                        [1, 1, this.vocabSize],
                        this.vocabSize * bpe,
                    );
                }
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode-webgpu",
                    iteration: this.outputTokens.length,
                });
                const logitBytes = this.vocabSize * (this.kvDtype === "float16" ? 2 : 4);
                await readBackGpuTensor(
                    this.gpuDevice,
                    this.fetches["logits"].gpuBuffer,
                    logitBytes,
                    this.logitsBuffer,
                );
            } else {
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode-wasm",
                    iteration: this.outputTokens.length,
                });
                this.logitsBuffer = outputs["logits"].cpuData;
            }

            this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
            lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);

            // Thinking budget: if model hasn't emitted </think> within budget, force it
            if (hasThinkBudget && !thinkingDone && this.outputTokens.length >= this.maxThinkTokens) {
                console.warn(
                    `[LLM] Thinking budget (${this.maxThinkTokens}) exceeded, forcing </think> token ${this.endThinkTokenId}`,
                );
                lastToken = this.endThinkTokenId;
                thinkingDone = true;
            }
            if (lastToken === this.endThinkTokenId) thinkingDone = true;

            // Break on consecutive repeat (same token 3+ times in a row)
            const len = this.outputTokens.length;
            if (len >= 2 && this.outputTokens[len - 1] === lastToken && this.outputTokens[len - 2] === lastToken) {
                console.warn(`[LLM] Breaking: token ${lastToken} repeated 3x consecutively`);
                break;
            }

            this.outputTokens.push(lastToken);
            if (callback) {
                callback(this.outputTokens);
            }
            this.updateKvCache(outputs);
            this.startLength++;
        }

        return this.outputTokens;
    }

    // Non-GQA WebNN fallback: rerun full context each token without reusing past KV from previous runs.
    async generateNonGqaWebnnStateless(inputIds, callback) {
        this.outputTokens = [];
        this.stop = false;
        const contextTokens = Array.from(inputIds);
        let lastToken = 0;

        // Thinking budget: force </think> if model hasn't produced it within budget
        let thinkingDone = false;
        const hasThinkBudget = this.endThinkTokenId > 0 && this.maxThinkTokens > 0;

        while (!this.stop && this.outputTokens.length < this.maxLength) {
            const contextLen = contextTokens.length;
            const totalLen = this.startLength + contextLen;
            if (totalLen > this.maxLength) {
                throw new Error(
                    `Total sequence length (${totalLen}) exceeds maxLength (${this.maxLength}). ` +
                        `startLength=${this.startLength}, contextLen=${contextLen}. Use Ctrl+Enter to start a new conversation.`,
                );
            }

            // Fixed-shape inputs: sequence_length is always maxLength.
            const inputBuffer = new BigInt64Array(this.maxLength);
            for (let i = 0; i < contextLen; ++i) {
                inputBuffer[i] = contextTokens[i];
            }

            // Keep full attention mask shape static: [1, startLength + maxLength].
            // The seeded KV slot is synthetic and must remain masked out.
            const attnMask = new BigInt64Array(this.startLength + this.maxLength);
            for (let i = 0; i < contextLen; ++i) {
                attnMask[this.startLength + i] = 1n;
            }

            this.feed["input_ids"] = new ort.Tensor("int64", inputBuffer, [1, this.maxLength]);
            this.feed["attention_mask"] = new ort.Tensor("int64", attnMask, [1, this.startLength + this.maxLength]);
            if (this.hasPositionIds) {
                const positionIds = new BigInt64Array(this.maxLength);
                for (let i = 0; i < contextLen; ++i) {
                    positionIds[i] = BigInt(i);
                }
                this.feed["position_ids"] = new ort.Tensor("int64", positionIds, [1, this.maxLength]);
            }

            const outputs = await WebNNPerf.time(
                this.outputTokens.length === 0 ? "webnn.inference.first" : "webnn.inference",
                () => this.session1.run(this.feed, this.fetches),
                {
                    model: this.outputTokens.length === 0 ? "prefill" : "decode-stateless",
                    iteration: this.outputTokens.length + 1,
                },
            );

            // logits shape is [1, maxLength, vocab], take the last valid token row.
            const logitsTensor = outputs["logits"];
            const cpuData = logitsTensor.cpuData;
            const offset = (contextLen - 1) * this.vocabSize;
            this.logitsBuffer.set(cpuData.subarray(offset, offset + this.vocabSize));

            this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
            lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);

            if (hasThinkBudget && !thinkingDone && this.outputTokens.length >= this.maxThinkTokens) {
                console.warn(
                    `[LLM] Thinking budget (${this.maxThinkTokens}) exceeded, forcing </think> token ${this.endThinkTokenId}`,
                );
                lastToken = this.endThinkTokenId;
                thinkingDone = true;
            }
            if (lastToken === this.endThinkTokenId) thinkingDone = true;

            this.outputTokens.push(lastToken);
            if (callback) {
                callback(this.outputTokens);
            }

            // Break on consecutive repeat (same token 3+ times in a row)
            const len = this.outputTokens.length;
            if (len >= 3 && this.outputTokens[len - 1] === this.outputTokens[len - 2] && this.outputTokens[len - 2] === this.outputTokens[len - 3]) {
                console.warn(`[LLM] Breaking: token ${lastToken} repeated 3x consecutively`);
                break;
            }

            if (this.eos.indexOf(lastToken) !== -1) {
                break;
            }

            // Stateless decode: append selected token and rerun whole context.
            contextTokens.push(BigInt(lastToken));
        }

        return this.outputTokens;
    }

    async dispose() {
        try {
            this.disposeTensors(this.feed);
            this.disposeTensors(this.fetches);

            this.feed = {};
            this.fetches = {};
            await this.session1.release();
            this.session1 = undefined;
            if (this.session2) {
                await this.session2.release();
                this.session2 = undefined;
            }
        } catch (e) {
            console.log("Error releasing session: ", e);
        }

        if (this.mlContext) {
            await this.mlContext.destroy();
        }

        this.outputTokens = [];
        this.kvDims = [];
        this.mlContext = undefined;
        this.startLength = 0;
    }
}

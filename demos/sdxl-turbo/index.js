/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run sdxl-turbo with webnn in onnxruntime-web.
//

import { AutoTokenizer, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.js";

env.localModelPath = "models/";
env.allowRemoteModels = true;
env.allowLocalModels = true;

import {
    $,
    $$,
    log,
    logError,
    setupORT,
    showCompatibleChromiumVersion,
    getHuggingFaceDomain,
    createMlTensor,
    createGpuTensor,
    readBackMLTensor,
    readBackGpuTensor,
} from "../../assets/js/common_utils.js";

let device = "gpu";
let mlContext;
let gpuDevice;
let badge;
let memoryReleaseSwitch;
const dom = {};
// Per-model MLContext for hybrid mode IO binding.
// Maps model name → MLContext. Populated during loadSingleModel().
const modelContexts = {};
const modelDOMPrefixes = {
    text_encoder: "textEncoder",
    text_encoder_2: "textEncoder2",
    unet: "unet",
    vae_decoder: "vae",
    safety_checker: "sc",
};
let generate = null;
let load = null;
let buttons = null;
let loadwave = null;
let loadwaveData = null;
let loading;
let webnnStatus;
// Round-robin counter for single-image mode: cycles through boxes 0-3
let nextImageSlot = 0;
const totalImageSlots = 4;

const config = getConfig();
const dataType = "float16";
const opt = {
    logSeverityLevel: config.verbose ? 0 : 3, // 0: verbose, 1: info, 2: warning, 3: error
};

// Always use local/relative paths for tokenizers, as they are small enough to be hosted on GitHub Pages
const tokenizer = await AutoTokenizer.from_pretrained("tokenizer");
const tokenizer2 = await AutoTokenizer.from_pretrained("tokenizer_2");

const batchSize = config.images;
const imageHeight = 512;
const imageWidth = 512;
const models = {
    text_encoder: {
        name: "Text Encoder",
        url: `text_encoder_model_${config.useQdq ? "qdq_" : ""}q4f16.onnx`,
        size: "118MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: 77,
            },
        },
        inputInfo: {
            input_ids: { dataType: "int32", dims: [1, 77], writable: true },
        },
        outputInfo: {
            "hidden_states.11": { dataType: dataType, dims: [1, 77, 768] },
        },
    },
    text_encoder_2: {
        name: "Text Encoder 2",
        url: `text_encoder_2_model_${config.useQdq ? "qdq_" : ""}q4f16.onnx`,
        size: "461MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: 77,
            },
        },
        inputInfo: {
            input_ids: { dataType: "int64", dims: [1, 77], writable: true },
        },
        outputInfo: {
            "hidden_states.31": { dataType: dataType, dims: [1, 77, 1280] },
            text_embeds: { dataType: dataType, dims: [1, 1280] },
        },
    },
    concat: {
        // A small model to concat the two text encoder outputs.
        name: "Concat Model",
        url: `concat_model_f16.onnx`,
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
            },
            graphOptimizationLevel: config.provider === "webgpu" ? "disabled" : "all",
        },
        inputInfo: {
            hidden_states_1: { dataType: dataType, dims: [1, 77, 768] },
            hidden_states_2: { dataType: dataType, dims: [1, 77, 1280] },
            text_embeds: { dataType: dataType, dims: [1, 1280] },
            sample: { dataType: "int32", dims: [batchSize], readable: true },
        },
        outputInfo: {
            prompt_embeds: { dataType: dataType, dims: [batchSize, 77, 2048] },
            pooled_prompt_embeds: { dataType: dataType, dims: [batchSize, 1280] },
        },
    },
    latents: {
        // A small model to handle latents scaling.
        name: "Latents Model",
        url: "latents_model_f16.onnx",
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 4,
                height: imageHeight / 8,
                width: imageWidth / 8,
            },
        },
        inputInfo: {
            sample: {
                dataType: dataType,
                dims: [batchSize, 4, imageHeight / 8, imageWidth / 8],
                readable: true,
            },
        },
        outputInfo: {
            latents: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
            latentModelInput: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
        },
    },
    unet: {
        name: "UNet",
        url: `unet_model_${config.useQdq ? "qdq_" : ""}q4f16.onnx`,
        size: "1.83GB",
        opt: {
            freeDimensionOverrides: {
                unet_sample_batch: batchSize,
                unet_sample_channels: 4,
                unet_sample_height: imageHeight / 8,
                unet_sample_width: imageWidth / 8,
                unet_time_batch: 1,
                unet_hidden_batch: batchSize,
                unet_hidden_sequence: 77,
                unet_text_embeds_batch: batchSize,
                unet_text_embeds_size: 1280,
                unet_time_ids_batch: batchSize,
                unet_time_ids_size: 6,
            },
        },
        inputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
            timestep: { dataType: dataType, dims: [1], writable: true },
            encoder_hidden_states: { dataType: dataType, dims: [batchSize, 77, 2048] },
            text_embeds: { dataType: dataType, dims: [batchSize, 1280] },
            time_ids: { dataType: dataType, dims: [batchSize, 6], writable: true },
        },
        outputInfo: {
            out_sample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
        },
    },
    scheduler: {
        // A small model to perform scheduler calculations.
        name: "Scheduler Model",
        url: "scheduler_model_f16.onnx",
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 4,
                height: imageHeight / 8,
                width: imageWidth / 8,
            },
        },
        inputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
            out_sample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
        },
        outputInfo: {
            prevSample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
        },
    },
    vae_decoder: {
        name: "VAE Decoder",
        url: `vae_decoder_model_${config.useQdq ? "qdq_" : ""}q4f16.onnx`,
        size: "93MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
                num_channels_latent: 4,
                height_latent: imageHeight / 8,
                width_latent: imageWidth / 8,
            },
        },
        inputInfo: {
            latent_sample: { dataType: dataType, dims: [batchSize, 4, imageHeight / 8, imageWidth / 8] },
        },
        outputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth], readable: true },
        },
    },
    sc_prep: {
        name: "Safety Checker Pre-processing Model",
        url: "sc_prep_model_f16.onnx",
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 3,
                height: imageHeight,
                width: imageWidth,
            },
        },
        inputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth] },
        },
        outputInfo: {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224] },
        },
    },
    safety_checker: {
        name: "Safety Checker",
        url: "safety_checker_model_f16.onnx",
        size: "580MB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 3,
                height: 224,
                width: 224,
            },
        },
        inputInfo: {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224], writable: true },
        },
        outputInfo: {
            has_nsfw_concepts: { dataType: "bool", dims: [batchSize], readable: true },
        },
    },
};
/*
 * get configuration from url
 */
function getConfig() {
    const queryParams = new URLSearchParams(window.location.search);
    const config = {
        model: location.href.includes("github.io") ? "https://huggingface.co/webnn/sdxl-turbo/resolve/main" : "models",
        mode: "none",
        safetyChecker: true,
        provider: "webnn",
        deviceType: "gpu",
        // Run text encoders on GPU while running the remaining models on NPU.
        hybridTextEncoderGpu: false,
        // Per-model device routing, e.g. "text_encoder:gpu,text_encoder_2:gpu,unet:npu,vae_decoder:npu"
        deviceMap: "",
        // use QDQ models by default
        // Fix me: set useQdq to true once WebNN OV backend supports MatMulNBits well
        MatMulNBitsuseQdq: true,
        useIOBinding: true,
        images: 4,
        verbose: false,
        forcedSingleImageForNpuUnet: false,
        // Enable staged loading to manage WASM heap memory during NPU compilation
        stagedLoading: false,
    };

    for (const key in config) {
        const lowerKey = key.toLowerCase();
        const value = queryParams.get(key) ?? queryParams.get(lowerKey);
        if (value !== null) {
            if (typeof config[key] === "boolean") {
                config[key] = value === "true";
            } else if (typeof config[key] === "number") {
                config[key] = isNaN(parseInt(value)) ? config[key] : parseInt(value);
            } else {
                config[key] = decodeURIComponent(value);
            }
        }
    }

    if (config.provider === "webgpu" && config.useQdq) {
        // WebGPU EP does not support INT4 QDQ model well yet.
        config.useQdq = false;
    }

    if (config.hybridTextEncoderGpu) {
        config.provider = "webnn";
        config.deviceType = "npu";
    }

    const deviceMap = parseDeviceMap(config.deviceMap);
    const unetDeviceType = (deviceMap.unet ?? config.deviceType).toLowerCase();
    if (config.provider === "webnn" && unetDeviceType === "npu" && config.images !== 1) {
        config.images = 1;
        config.forcedSingleImageForNpuUnet = true;
    }

    return config;
}

const getQueryValue = name => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

class ProgressManager {
    constructor(config) {
        this.config = config;
        this.weights = this.getWeights(config.safetyChecker);
        this.progress = {};
        this.totalProgress = 0;

        // Initialize progress for all models
        for (const key in this.weights) {
            this.progress[key] = { fetch: 0, compile: 0 };
        }
    }

    getWeights(safetyChecker) {
        if (safetyChecker) {
            return {
                text_encoder: { fetch: 5, compile: 1 },
                text_encoder_2: { fetch: 15, compile: 4 },
                unet: { fetch: 38, compile: 15 },
                vae_decoder: { fetch: 3, compile: 1 },
                safety_checker: { fetch: 16, compile: 2 },
            };
        } else {
            return {
                text_encoder: { fetch: 5, compile: 1 },
                text_encoder_2: { fetch: 15, compile: 3 },
                unet: { fetch: 55, compile: 17 },
                vae_decoder: { fetch: 3, compile: 1 },
            };
        }
    }

    update(modelName, stage, percentage) {
        let key = modelName;
        if (modelName.includes("text_encoder_2")) key = "text_encoder_2";
        else if (modelName.includes("text_encoder")) key = "text_encoder";
        else if (modelName.includes("unet")) key = "unet";
        else if (modelName.includes("vae_decoder")) key = "vae_decoder";
        else if (modelName.includes("safety_checker")) key = "safety_checker";

        if (!this.weights[key]) return;

        this.progress[key][stage] = percentage;
        this.calculateTotal();
        updateLoadWave(this.totalProgress.toFixed(2));
    }

    calculateTotal() {
        let total = 0;
        for (const key in this.weights) {
            const w = this.weights[key];
            const p = this.progress[key];
            total += (p.fetch * w.fetch) / 100;
            total += (p.compile * w.compile) / 100;
        }
        this.totalProgress = total;
    }

    reset() {
        for (const key in this.progress) {
            this.progress[key] = { fetch: 0, compile: 0 };
        }
        this.totalProgress = 0;
        updateLoadWave(0.0);
    }
}
const progressManager = new ProgressManager(config);

// Get model via Origin Private File System
async function getModelOPFS(name, url, updateModel) {
    const root = await navigator.storage.getDirectory();
    let fileHandle;

    async function updateFile() {
        const response = await fetch(url);
        const buffer = await readResponse(name, response);
        fileHandle = await root.getFileHandle(name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(buffer);
        await writable.close();
        return buffer;
    }

    if (updateModel) {
        return await updateFile();
    }

    try {
        fileHandle = await root.getFileHandle(name);
        const blob = await fileHandle.getFile();
        let buffer = await blob.arrayBuffer();
        if (buffer) {
            progressManager.update(name, "fetch", 100);
            return buffer;
        }
    } catch (e) {
        console.log(e.message);
        return await updateFile();
    }
}

async function readResponse(name, response) {
    const contentLength = response.headers.get("Content-Length");
    let total = parseInt(contentLength ?? "0");
    let buffer = new Uint8Array(total);
    let loadedByteCount = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoadedByteCount = loadedByteCount + value.length;
        let fetchProgress = (newLoadedByteCount / contentLength) * 100;
        progressManager.update(name, "fetch", fetchProgress);

        if (newLoadedByteCount > total) {
            total = newLoadedByteCount;
            let newBuffer = new Uint8Array(total);
            newBuffer.set(buffer);
            buffer = newBuffer;
        }
        buffer.set(value, loadedByteCount);
        loadedByteCount = newLoadedByteCount;
        return read();
    }

    await read();
    return buffer;
}

const getMode = () => {
    return getQueryValue("mode") === "normal" ? false : true;
};

const isHybridTextEncoderGpuMode = () => {
    return config.provider === "webnn" && config.hybridTextEncoderGpu;
};

// Parse "model:device,model:device" string into a {model: device} map
function parseDeviceMap(str) {
    if (!str) return {};
    const map = {};
    for (const entry of str.split(",")) {
        const [model, device] = entry.trim().split(":");
        if (model && device) map[model.trim()] = device.trim().toLowerCase();
    }
    return map;
}

// True when any per-model device routing is active (hybridTextEncoderGpu OR custom deviceMap)
const isHybridMode = () => {
    return isHybridTextEncoderGpuMode() || (config.provider === "webnn" && !!config.deviceMap);
};

const getModelDeviceType = modelName => {
    if (config.deviceMap) {
        const deviceMap = parseDeviceMap(config.deviceMap);
        if (deviceMap[modelName]) return deviceMap[modelName];
    }

    if (!isHybridTextEncoderGpuMode()) {
        return config.deviceType;
    }

    if (modelName === "text_encoder" || modelName === "text_encoder_2") {
        return "gpu";
    }

    return "npu";
};

const sizeOfShape = shape => shape.reduce((a, b) => a * b, 1);

/*
 * load a single model: fetch from OPFS/network, create InferenceSession
 */
async function loadSingleModel(name, model, models) {
    const modelNameInLog = model.name;
    let start = performance.now();

    let modelUrl = `${config.model}/onnx/${model.url}`;
    if (modelUrl.includes("huggingface.co")) {
        await getHuggingFaceDomain().then(domain => {
            modelUrl = modelUrl.replace("huggingface.co", domain);
        });
    }
    log(`[Load] Loading model ${modelNameInLog} · ${model.size}`);

    const hasExternalData = model.externalData === true;
    const opfsKey = `sdxl-turbo_${modelUrl.replace(/\//g, "_")}`;
    let modelBuffer = await getModelOPFS(opfsKey, modelUrl, false);

    const sessOpt = { ...opt, ...model.opt };
    // For models with external data (.onnx_data), pass the URL as a string
    // so ORT WASM fetches it internally (avoids 2GB+ ArrayBuffer allocation failure).
    if (hasExternalData) {
        const dataUrl = modelUrl + "_data";
        log(`[Load] ${modelNameInLog} has external data: ${dataUrl}`);
        sessOpt.externalData = [
            {
                path: model.url + "_data",
                data: dataUrl,
            },
        ];
    }

    if (isHybridMode()) {
        const modelDeviceType = getModelDeviceType(name);
        const perModelContext = await navigator.ml.createContext({ deviceType: modelDeviceType });
        modelContexts[name] = perModelContext;
        sessOpt.executionProviders = [
            {
                name: "webnn",
                deviceType: modelDeviceType,
                context: perModelContext,
            },
        ];
        log(`[Load] ${modelNameInLog} assigned to WebNN ${modelDeviceType.toUpperCase()}`);
    }

    const modelFetchTime = (performance.now() - start).toFixed(2);

    if (dom[name]) {
        dom[name].fetch.innerHTML = modelFetchTime;
    }

    log(`[Load] ${modelNameInLog} loaded · ${modelFetchTime}ms`);
    log(`[Session Create AK] Beginning ${modelNameInLog}`);

    start = performance.now();
    try {
        models[name].sess = await ort.InferenceSession.create(modelBuffer, sessOpt);
    } catch (sessionError) {
        log(`[Load] Session creation failed for ${modelNameInLog} (possibly corrupted cache), retrying with fresh download...`);
        modelBuffer = await getModelOPFS(opfsKey, modelUrl, true);
        models[name].sess = await ort.InferenceSession.create(modelBuffer, sessOpt);
    }
    // Release the raw model buffer to free memory before loading the next model
    modelBuffer = null;
    const sessionCreationTime = (performance.now() - start).toFixed(2);

    if (dom[name]) {
        dom[name].create.innerHTML = sessionCreationTime;
        progressManager.update(name, "compile", 100);
    }

    if (getMode()) {
        log(`[Session Create AK] Create ${modelNameInLog} completed · ${sessionCreationTime}ms`);
    } else {
        log(`[Session Create AK] Create ${modelNameInLog} completed`);
    }
}

// Returns true when staged loading is needed to avoid exceeding the WASM heap.
const needsStagedLoading = () => {
    return config.stagedLoading;
};

/*
 * load models used in the pipeline
 */
async function loadModels(models) {
    log("[Load] ONNX Runtime Execution Provider: " + config.provider);
    log("[Load] ONNX Runtime EP device type: " + config.deviceType);
    updateLoadWave(0.0);
    load.disabled = true;
    try {
        if (needsStagedLoading()) {
            // Staged loading: load UNet first (largest model) while WASM heap is empty,
            // then load remaining models. This avoids exceeding the WASM memory limit
            // during UNet compilation.
            log("[Load] Using staged loading to manage memory for all-NPU mode");

            // Stage 1: Load large models (UNet, VAE, safety_checker) first
            const largeModels = ["unet", "vae_decoder", "safety_checker", "sc_prep", "scheduler"];
            for (const name of largeModels) {
                if (models[name]) {
                    await loadSingleModel(name, models[name], models);
                }
            }

            // Stage 2: Load text encoders and small helper models
            const textModels = ["text_encoder", "text_encoder_2", "concat", "latents"];
            for (const name of textModels) {
                if (models[name]) {
                    await loadSingleModel(name, models[name], models);
                }
            }
        } else {
            // Standard loading: compile all models sequentially
            for (const [name, model] of Object.entries(models)) {
                await loadSingleModel(name, model, models);
            }
        }

        if (config.provider === "webgpu") {
            gpuDevice = ort.env.webgpu.device;
        }
        const startInitTensors = performance.now();
        await initializeTensors();
        log(`[Session Create AK] Initialize tensors completed · ${(performance.now() - startInitTensors).toFixed(2)}ms`);
    } catch (e) {
        logError(`[Load] failed, ${e}`);
        return;
    }
    updateLoadWave(100.0);
    log("[Session Create AK] Ready to generate images");
    let imageArea = $$("#image_area>div");
    imageArea.forEach(i => {
        i.setAttribute("class", "frame ready");
    });
    buttons.setAttribute("class", "button-group key loaded");
    generate.disabled = false;
    $("#user-input").setAttribute("class", "form-control enabled");
}

const getDataTypeSize = dataType => {
    switch (dataType) {
        case "int64":
            return 8;
        case "float32":
        case "int32":
            return 4;
        case "float16":
            return 2;
        case "uint8":
        case "bool":
            return 1;
        default:
            throw new Error(`Unsupported data type: ${dataType}`);
    }
};

// Returns the MLContext for a given model name. In hybrid mode, each model has
// its own context; otherwise falls back to the global mlContext.
function getContextForModel(modelName) {
    return modelContexts[modelName] || mlContext;
}

async function createTensor(tensorInfo, ctx) {
    let tensor;
    const numElements = sizeOfShape(tensorInfo.dims);
    if (!config.useIOBinding) {
        let data;
        switch (tensorInfo.dataType) {
            case "float32":
                data = new Float32Array(numElements);
                break;
            case "float16":
                data = new Float16Array(numElements);
                break;
            case "int32":
                data = new Int32Array(numElements);
                break;
            case "int64":
                data = new BigInt64Array(numElements);
                break;
            case "bool":
            case "uint8":
                data = new Uint8Array(numElements);
                break;
            default:
                throw new Error(`Unsupported data type: ${tensorInfo.dataType}`);
        }
        return new ort.Tensor(tensorInfo.dataType, data, tensorInfo.dims);
    }
    if (config.provider === "webnn") {
        const context = ctx || mlContext;
        tensor = await createMlTensor(
            context,
            tensorInfo.dataType,
            tensorInfo.dims,
            tensorInfo.writable ?? false,
            tensorInfo.readable ?? false,
        );
    } else if (config.provider === "webgpu") {
        const bufferSize = numElements * getDataTypeSize(tensorInfo.dataType);
        tensor = await createGpuTensor(gpuDevice, tensorInfo.dataType, tensorInfo.dims, bufferSize);
    } else {
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
    return tensor;
}

function writeTensor(tensor, data, ctx) {
    if (!config.useIOBinding) {
        tensor.data.set(data);
        return;
    }

    if (config.provider === "webnn") {
        const context = ctx || mlContext;
        context.writeTensor(tensor.mlTensorData, data);
    } else if (config.provider === "webgpu") {
        const size = data.byteLength;
        const alignedSize = Math.ceil(size / 4) * 4;
        const gpuBuffer = tensor.gpuBuffer;
        const commandEncoder = gpuDevice.createCommandEncoder();
        const tempBuffer = gpuDevice.createBuffer({
            size: alignedSize,
            usage: GPUBufferUsage.COPY_SRC,
            mappedAtCreation: true,
        });
        const mapping = tempBuffer.getMappedRange();
        new Uint8Array(mapping).set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
        tempBuffer.unmap();
        commandEncoder.copyBufferToBuffer(tempBuffer, 0, gpuBuffer, 0, alignedSize);
        const commandBuffer = commandEncoder.finish();
        gpuDevice.queue.submit([commandBuffer]);
    }
}

async function readTensor(tensor, targetBuffer, ctx) {
    if (!config.useIOBinding) {
        targetBuffer.set(tensor.data);
        return;
    }

    if (config.provider === "webnn") {
        const context = ctx || mlContext;
        await readBackMLTensor(context, tensor.mlTensorData, targetBuffer);
    } else if (config.provider === "webgpu") {
        const bufferSize = sizeOfShape(tensor.dims) * getDataTypeSize(tensor.type);
        await readBackGpuTensor(gpuDevice, tensor.gpuBuffer, bufferSize, targetBuffer);
    }
}

function disposeTensors() {
    // Release tensors
    for (const model of Object.values(models)) {
        const tensors = [...Object.values(model.feed), ...Object.values(model.fetches)];
        for (const tensor of tensors) {
            if (tensor) {
                if (tensor.disposer == undefined) {
                    if (tensor.dataLocation == "ml-tensor") {
                        tensor.mlTensorData.destroy();
                    } else if (tensor.dataLocation == "gpu-buffer") {
                        tensor.gpuBufferData.destroy();
                    }
                } else {
                    tensor.dispose();
                }
            }
        }
    }
}

// Bridge data from a tensor on one device context to a tensor on another device context
// by reading back to CPU and writing to the target. Only needed at cross-device boundaries.
async function bridgeTensor(srcTensor, dstTensor, srcCtx, dstCtx) {
    const size = sizeOfShape(srcTensor.dims);
    let buffer;
    switch (srcTensor.type) {
        case "float16":
            buffer = new Float16Array(size);
            break;
        case "float32":
            buffer = new Float32Array(size);
            break;
        case "int32":
            buffer = new Int32Array(size);
            break;
        default:
            buffer = new Uint8Array(size * getDataTypeSize(srcTensor.type));
    }
    await readTensor(srcTensor, buffer, srcCtx);
    writeTensor(dstTensor, buffer, dstCtx);
}

// Registry of cross-device tensor edges that need CPU-round-trip bridging at runtime.
// Populated by wireOrBridge() during initializeTensors(), consumed by bridgeOutputsOf() during generateImage().
const crossDeviceBridges = [];

// Wire a model output to a downstream model input. If both models share the same
// MLContext (or IO binding is off), returns the source tensor directly (zero-copy).
// Otherwise, recreates the source output as readable, creates a separate writable
// input on the destination context, and registers a bridge for runtime execution.
async function wireOrBridge(srcModelName, srcKey, srcInfo, dstModelName, dstKey, dstInfo) {
    const srcCtx = getContextForModel(srcModelName);
    const dstCtx = getContextForModel(dstModelName);

    if (!isHybridMode() || !config.useIOBinding || srcCtx === dstCtx) {
        return models[srcModelName].fetches[srcKey];
    }

    // Cross-device: make source readable, create separate writable dest
    models[srcModelName].fetches[srcKey] =
        await createTensor({ ...srcInfo, readable: true }, srcCtx);
    const dstTensor = await createTensor({ ...dstInfo, writable: true }, dstCtx);
    crossDeviceBridges.push({ srcModel: srcModelName, srcKey, dstModel: dstModelName, dstKey });
    return dstTensor;
}

// Execute all registered bridges where the source model matches the given name.
// Call this after running a model to copy its outputs to any cross-device consumers.
async function bridgeOutputsOf(modelName) {
    for (const { srcModel, srcKey, dstModel, dstKey } of crossDeviceBridges) {
        if (srcModel === modelName) {
            await bridgeTensor(
                models[srcModel].fetches[srcKey],
                models[dstModel].feed[dstKey],
                getContextForModel(srcModel),
                getContextForModel(dstModel),
            );
        }
    }
}

async function initializeTensors() {
    // Get per-model contexts (falls back to global mlContext in non-hybrid mode)
    const teCtx = getContextForModel("text_encoder");
    const te2Ctx = getContextForModel("text_encoder_2");
    const concatCtx = getContextForModel("concat");
    const latentsCtx = getContextForModel("latents");
    const unetCtx = getContextForModel("unet");
    const schedulerCtx = getContextForModel("scheduler");
    const vaeCtx = getContextForModel("vae_decoder");

    // Clear any previous bridges
    crossDeviceBridges.length = 0;

    // text_encoder
    models["text_encoder"].feed = {
        input_ids: await createTensor(models["text_encoder"].inputInfo.input_ids, teCtx),
    };
    models["text_encoder"].fetches = {
        "hidden_states.11": await createTensor(models["text_encoder"].outputInfo["hidden_states.11"], teCtx),
    };

    // text_encoder_2
    models["text_encoder_2"].feed = {
        input_ids: await createTensor(models["text_encoder_2"].inputInfo.input_ids, te2Ctx),
    };
    models["text_encoder_2"].fetches = {
        "hidden_states.31": await createTensor(models["text_encoder_2"].outputInfo["hidden_states.31"], te2Ctx),
        text_embeds: await createTensor(models["text_encoder_2"].outputInfo.text_embeds, te2Ctx),
    };

    // concat — inputs from text encoders (may be cross-device)
    const concatHs1 = await wireOrBridge(
        "text_encoder", "hidden_states.11", models["text_encoder"].outputInfo["hidden_states.11"],
        "concat", "hidden_states_1", models["concat"].inputInfo.hidden_states_1,
    );
    const concatHs2 = await wireOrBridge(
        "text_encoder_2", "hidden_states.31", models["text_encoder_2"].outputInfo["hidden_states.31"],
        "concat", "hidden_states_2", models["concat"].inputInfo.hidden_states_2,
    );
    const concatTe = await wireOrBridge(
        "text_encoder_2", "text_embeds", models["text_encoder_2"].outputInfo.text_embeds,
        "concat", "text_embeds", models["concat"].inputInfo.text_embeds,
    );

    models["concat"].feed = {
        hidden_states_1: concatHs1,
        hidden_states_2: concatHs2,
        text_embeds: concatTe,
        sample: await createTensor(models["concat"].inputInfo.sample, concatCtx),
    };
    models["concat"].fetches = {
        prompt_embeds: await createTensor(models["concat"].outputInfo.prompt_embeds, concatCtx),
        pooled_prompt_embeds: await createTensor(models["concat"].outputInfo.pooled_prompt_embeds, concatCtx),
    };

    // latents
    models["latents"].feed = {
        sample: await createTensor(models["latents"].inputInfo.sample, latentsCtx),
    };
    models["latents"].fetches = {
        latents: await createTensor(models["latents"].outputInfo.latents, latentsCtx),
        latentModelInput: await createTensor(models["latents"].outputInfo.latentModelInput, latentsCtx),
    };

    // unet — inputs from concat and latents (may be cross-device)
    const unetSample = await wireOrBridge(
        "latents", "latentModelInput", models["latents"].outputInfo.latentModelInput,
        "unet", "sample", models["unet"].inputInfo.sample,
    );
    const unetHidden = await wireOrBridge(
        "concat", "prompt_embeds", models["concat"].outputInfo.prompt_embeds,
        "unet", "encoder_hidden_states", models["unet"].inputInfo.encoder_hidden_states,
    );
    const unetTextEmbeds = await wireOrBridge(
        "concat", "pooled_prompt_embeds", models["concat"].outputInfo.pooled_prompt_embeds,
        "unet", "text_embeds", models["unet"].inputInfo.text_embeds,
    );

    models["unet"].feed = {
        sample: unetSample,
        timestep: await createTensor(models["unet"].inputInfo.timestep, unetCtx),
        encoder_hidden_states: unetHidden,
        text_embeds: unetTextEmbeds,
        time_ids: await createTensor(models["unet"].inputInfo.time_ids, unetCtx),
    };
    writeTensor(models["unet"].feed.timestep, new Float16Array([999]), unetCtx);
    writeTensor(models["unet"].feed.time_ids, getAddTimeIds(imageHeight, imageWidth, batchSize), unetCtx);
    models["unet"].fetches = {
        out_sample: await createTensor(models["unet"].outputInfo.out_sample, unetCtx),
    };

    // scheduler — inputs from unet and latents (may be cross-device)
    const schedOutSample = await wireOrBridge(
        "unet", "out_sample", models["unet"].outputInfo.out_sample,
        "scheduler", "out_sample", models["scheduler"].inputInfo.out_sample,
    );
    const schedSample = await wireOrBridge(
        "latents", "latents", models["latents"].outputInfo.latents,
        "scheduler", "sample", models["scheduler"].inputInfo.sample,
    );

    models["scheduler"].feed = {
        out_sample: schedOutSample,
        sample: schedSample,
    };
    models["scheduler"].fetches = {
        prevSample: await createTensor(models["scheduler"].outputInfo.prevSample, schedulerCtx),
    };

    // vae_decoder — input from scheduler (may be cross-device)
    const vaeInput = await wireOrBridge(
        "scheduler", "prevSample", models["scheduler"].outputInfo.prevSample,
        "vae_decoder", "latent_sample", models["vae_decoder"].inputInfo.latent_sample,
    );

    models["vae_decoder"].feed = {
        latent_sample: vaeInput,
    };
    models["vae_decoder"].fetches = {
        sample: await createTensor(models["vae_decoder"].outputInfo.sample, vaeCtx),
    };

    // safety_checker
    if (config.safetyChecker) {
        const scPrepCtx = getContextForModel("sc_prep");
        const scCtx = getContextForModel("safety_checker");

        const scPrepInput = await wireOrBridge(
            "vae_decoder", "sample", models["vae_decoder"].outputInfo.sample,
            "sc_prep", "sample", models["sc_prep"].inputInfo.sample,
        );

        models["sc_prep"].feed = {
            sample: scPrepInput,
        };
        models["sc_prep"].fetches = {
            clip_input: await createTensor(models["sc_prep"].outputInfo.clip_input, scPrepCtx),
        };

        const scInput = await wireOrBridge(
            "sc_prep", "clip_input", models["sc_prep"].outputInfo.clip_input,
            "safety_checker", "clip_input", models["safety_checker"].inputInfo.clip_input,
        );

        models["safety_checker"].feed = {
            clip_input: scInput,
        };
        models["safety_checker"].fetches = {
            has_nsfw_concepts: await createTensor(models["safety_checker"].outputInfo.has_nsfw_concepts, scCtx),
        };
    }

    if (crossDeviceBridges.length > 0) {
        log(`[Config] ${crossDeviceBridges.length} cross-device tensor bridge(s) registered.`);
    }
}

async function runModel(model) {
    if (config.useIOBinding) {
        await model.sess.run(model.feed, model.fetches);
    } else {
        const results = await model.sess.run(model.feed);
        for (const [name, tensor] of Object.entries(results)) {
            if (model.fetches[name]) {
                model.fetches[name].data.set(tensor.data);
            } else {
                console.warn(`[runModel] Output ${name} not found in fetches for model ${model.name}`);
            }
        }
    }
}

/*
 * Get the "add_time_ids" for SDXL (micro-conditioning).
 * These correspond to: [original_height, original_width, crop_top, crop_left, target_height, target_width]
 */
function getAddTimeIds(height, width, batchSize = 1) {
    // 1. Define the 6 basic values for the time_ids
    // [original_height, original_width, crop_top, crop_left, target_height, target_width]
    const timeIdsBase = [height, width, 0, 0, height, width];

    // 2. Construct the data array
    // Final Shape: [batchSize, 6]
    const data = new Float16Array(batchSize * 6);

    for (let i = 0; i < batchSize; i++) {
        data.set(timeIdsBase, i * 6);
    }

    return data;
}

/**
 * draw images from pixel data
 * @param {Float16Array} pix
 * @param {number} imageIndex
 * @param {number} height
 * @param {number} width
 */
function drawImage(pix, imageIndex, height, width) {
    const channelSize = height * width;
    const rgbaData = new Uint8ClampedArray(channelSize * 4);

    for (let j = 0; j < channelSize; j++) {
        // NCHW layout: R is at 0, G at channelSize, B at 2*channelSize
        let r = pix[j];
        let g = pix[j + channelSize];
        let b = pix[j + 2 * channelSize];

        // Map [-1, 1] to [0, 255]
        rgbaData[j * 4 + 0] = (r / 2 + 0.5) * 255;
        rgbaData[j * 4 + 1] = (g / 2 + 0.5) * 255;
        rgbaData[j * 4 + 2] = (b / 2 + 0.5) * 255;
        rgbaData[j * 4 + 3] = 255; // Alpha
    }

    const imageData = new ImageData(rgbaData, width, height);
    const canvas = $(`#img_canvas_${imageIndex}`);
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").putImageData(imageData, 0, 0);
    }
}

async function generateImage() {
    generate.disabled = true;
    const imgDivs = $$("#image_area > div");

    // In single-image mode (batchSize 1), only reset the target slot;
    // in batch mode, reset all slots.
    if (batchSize === 1) {
        const targetDiv = $(`#img_div_${nextImageSlot}`);
        if (targetDiv) targetDiv.setAttribute("class", "frame");
    } else {
        imgDivs.forEach(div => div.setAttribute("class", "frame"));
    }

    try {
        dom["runTotal"].innerHTML = "";
        dom["safety_checker"].run.innerHTML = "";

        $("#total_data").innerHTML = "...";
        $("#total_data").setAttribute("class", "show");

        log(`[Session Run] Beginning`);

        await loading;
        if (batchSize === 1) {
            $(`#img_div_${nextImageSlot}`).setAttribute("class", "frame inferncing");
        } else {
            for (let i = 0; i < batchSize; i++) {
                $(`#img_div_${i}`).setAttribute("class", "frame inferncing");
            }
        }

        // Inference prepare for Text Encoders
        let start = performance.now();
        const startTotal = start;

        const prompt = $("#user-input");

        // Run Text Encoder 1
        const { input_ids: inputIds } = await tokenizer(prompt.value, {
            padding: "max_length",
            maxLength: 77,
            truncation: true,
            return_tensor: false,
        });

        const inputIdsData = new Int32Array(inputIds);
        writeTensor(models["text_encoder"].feed.input_ids, inputIdsData, getContextForModel("text_encoder"));
        await runModel(models["text_encoder"]);

        const sessionRunTimeTextEncode = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] Text Encoder execution time: ${sessionRunTimeTextEncode}ms`);
        } else {
            log(`[Session Run] Text Encoder completed`);
        }

        // Run Text Encoder 2
        start = performance.now();
        const { input_ids: inputIds2 } = await tokenizer2(prompt.value, {
            padding: "max_length",
            maxLength: 77,
            truncation: true,
            return_tensor: false,
        });
        const inputIds2Data = new BigInt64Array(inputIds2.map(x => BigInt(x)));
        writeTensor(models["text_encoder_2"].feed.input_ids, inputIds2Data, getContextForModel("text_encoder_2"));
        await runModel(models["text_encoder_2"]);

        const sessionRunTimeTextEncode2 = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] Text Encoder 2 execution time: ${sessionRunTimeTextEncode2}ms`);
        } else {
            log(`[Session Run] Text Encoder 2 completed`);
        }

        // Bridge cross-device outputs from text encoders
        await bridgeOutputsOf("text_encoder");
        await bridgeOutputsOf("text_encoder_2");

        // Inference prepare for UNet

        // Construct promptEmbeds and pooledPromptEmbeds (Batch N) by repeating the single batch output
        start = performance.now();
        await runModel(models["concat"]);
        await bridgeOutputsOf("concat");
        if (getMode()) {
            log(`[Session Run] concat execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] concat completed`);
        }

        // Initialize latents (Batch N) for random noise
        start = performance.now();
        await runModel(models["latents"]);
        await bridgeOutputsOf("latents");
        if (getMode()) {
            log(`[Session Run] latents execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] latents completed`);
        }

        // Run UNet
        start = performance.now();
        await runModel(models["unet"]);
        await bridgeOutputsOf("unet");
        const unetRunTime = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] UNet execution time: ${unetRunTime}ms`);
        } else {
            log(`[Session Run] UNet completed`);
        }

        // Inference prepare for VAE Decoder

        // scheduler
        start = performance.now();
        await runModel(models["scheduler"]);
        await bridgeOutputsOf("scheduler");
        if (getMode()) {
            log(`[Session Run] Scheduler execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] Scheduler completed`);
        }

        // Run VAE Decoder
        start = performance.now();
        await runModel(models["vae_decoder"]);
        await bridgeOutputsOf("vae_decoder");

        const pixSize = sizeOfShape(models["vae_decoder"].outputInfo.sample.dims);
        let pix = new Float16Array(pixSize);
        await readTensor(models["vae_decoder"].fetches.sample, pix, getContextForModel("vae_decoder"));

        let vaeRunTime = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] VAE Decoder execution time: ${vaeRunTime}ms`);
        } else {
            log(`[Session Run] VAE Decoder completed`);
        }

        start = performance.now();
        if (batchSize === 1) {
            // Single-image mode: draw into the current round-robin slot
            drawImage(pix, nextImageSlot, imageHeight, imageWidth);
        } else {
            for (let i = 0; i < batchSize; i++) {
                const size = 3 * imageHeight * imageWidth;
                const offset = i * size;
                const subPix = pix.subarray(offset, offset + size);
                drawImage(subPix, i, imageHeight, imageWidth);
            }
        }
        const imageDrawTime = (performance.now() - start).toFixed(2);
        log(`[Images Drawing] drawing ${batchSize} images time: ${imageDrawTime}ms`);

        const totalRunTime = (performance.now() - startTotal).toFixed(2);
        if (getMode()) {
            log(`[Total] Total images generation time: ${totalRunTime}ms`);
        }
        dom.runTotal.innerHTML = totalRunTime;

        if (config.safetyChecker) {
            // 1. Run Preprocessing Model (VAE Output -> SC Input)
            let start = performance.now();
            await runModel(models["sc_prep"]);
            await bridgeOutputsOf("sc_prep");

            if (getMode()) {
                log(`[Session Run] Safety Checker input prepared time: ${(performance.now() - start).toFixed(2)}ms`);
            } else {
                log(`[Session Run] Safety Checker input prepared`);
            }

            // 2. Run Safety Checker
            start = performance.now();
            await runModel(models["safety_checker"]);

            // 3. Read Results
            let nsfwBuffer = new Uint8Array(batchSize);
            await readTensor(models["safety_checker"].fetches.has_nsfw_concepts, nsfwBuffer, getContextForModel("safety_checker"));

            const totalScRunTime = (performance.now() - start).toFixed(2);

            // 4. Process Results UI
            if (batchSize === 1) {
                let nsfw = nsfwBuffer[0] ? true : false;
                log(`[Session Run][Image ${nextImageSlot + 1}] Safety Checker - not safe for work (NSFW) concepts: ${nsfw}`);
                if (nsfw) {
                    $(`#img_div_${nextImageSlot}`).setAttribute("class", "frame done nsfw");
                    $(`#img_div_${nextImageSlot}`).setAttribute("title", "Not safe for work (NSFW) content");
                } else {
                    $(`#img_div_${nextImageSlot}`).setAttribute("class", "frame done");
                }
            } else {
                for (let i = 0; i < batchSize; i++) {
                    let nsfw = nsfwBuffer[i] ? true : false;
                    log(`[Session Run][Image ${i + 1}] Safety Checker - not safe for work (NSFW) concepts: ${nsfw}`);

                    if (nsfw) {
                        $(`#img_div_${i}`).setAttribute("class", "frame done nsfw");
                        $(`#img_div_${i}`).setAttribute("title", "Not safe for work (NSFW) content");
                    } else {
                        $(`#img_div_${i}`).setAttribute("class", "frame done");
                    }
                }
            }

            dom["safety_checker"].run.innerHTML = totalScRunTime;
            if (getMode()) {
                log(`[Session Run] Safety Checker execution time (Batch ${batchSize}): ${totalScRunTime}ms`);
            }
        } else {
            if (batchSize === 1) {
                $(`#img_div_${nextImageSlot}`).setAttribute("class", "frame done");
            } else {
                for (let i = 0; i < batchSize; i++) {
                    $(`#img_div_${i}`).setAttribute("class", "frame done");
                }
            }
        }

        // Advance round-robin slot for single-image mode
        if (batchSize === 1) {
            nextImageSlot = (nextImageSlot + 1) % totalImageSlots;
        }

        $("#total_data").innerHTML = `${totalRunTime}ms`;

        generate.disabled = false;
        log("[Info] Images generation completed");
    } catch (e) {
        logError("[Error] " + e);
        return;
    }
}

const checkWebNN = async () => {
    let status = $("#webnnstatus");
    let info = $("#info");
    webnnStatus = await getWebnnStatus();

    if (webnnStatus.webnn) {
        status.setAttribute("class", "green");
        info.innerHTML = "WebNN supported";
        updateDeviceTypeLinks();
        load.disabled = false;
    } else {
        if (webnnStatus.error) {
            status.setAttribute("class", "red");
            info.innerHTML = `WebNN not supported: ${webnnStatus.error} <a id="webnn_na" href="../../install.html" title="WebNN Installation Guide">Set up WebNN</a>`;
            logError(`[Error] ${webnnStatus.error}`);
        } else {
            status.setAttribute("class", "red");
            info.innerHTML = "WebNN not supported";
            logError(`[Error] WebNN not supported`);
        }
    }

    if (getQueryValue("provider") && getQueryValue("provider").toLowerCase() === "webgpu") {
        status.innerHTML = "";
    }
};

const getWebnnStatus = async () => {
    let result = {};
    try {
        const context = await navigator.ml.createContext();
        if (context) {
            try {
                const builder = new MLGraphBuilder(context);
                if (builder) {
                    result.webnn = true;
                    return result;
                } else {
                    result.webnn = false;
                    return result;
                }
            } catch (e) {
                result.webnn = false;
                result.error = e.message;
                return result;
            }
        } else {
            result.webnn = false;
            return result;
        }
    } catch (ex) {
        result.webnn = false;
        result.error = ex.message;
        return result;
    }
};

const updateLoadWave = value => {
    loadwave = $$(".loadwave");
    loadwaveData = $$(".loadwave-data strong");

    if (loadwave && loadwaveData) {
        loadwave.forEach(l => {
            l.style.setProperty(`--loadwave-value`, value);
        });
        loadwaveData.forEach(data => {
            data.innerHTML = value;
        });

        if (value === 100) {
            loadwave.forEach(l => {
                l.dataset.value = value;
            });
        }
    }
};

const updateDeviceTypeLinks = () => {
    let backendLinks = $("#backend-links");
    const links = `· <a href="./?devicetype=gpu">GPU</a> · <a id="npu_link" href="./?devicetype=npu">NPU</a> · <a href="./?devicetype=npu&deviceMap=text_encoder_2:gpu">Hybrid</a>`;
    backendLinks.innerHTML = `${links}`;
};

const ui = async () => {
    memoryReleaseSwitch = $("#memory_release");
    device = $("#device");
    badge = $("#badge");
    const prompt = $("#user-input");
    const title = $("#title");
    const dev = $("#dev");
    const scTr = $("#scTr");
    load = $("#load");
    generate = $("#generate");
    buttons = $("#buttons");
    $("#imagesTd").innerHTML = `Images x ${batchSize}`;

    memoryReleaseSwitch.addEventListener("change", () => {
        if (memoryReleaseSwitch.checked) {
            memoryReleaseSwitch.setAttribute("checked", "");
        } else {
            memoryReleaseSwitch.removeAttribute("checked");
        }
    });

    if (!getMode()) {
        dev.setAttribute("class", "mt-1");
    }

    if (config.forcedSingleImageForNpuUnet) {
        log("[Config] UNet on NPU supports only batch size 1. Forcing images=1.");
    }

    if (isHybridMode()) {
        log("[Config] Hybrid mode enabled with IO binding: cross-device tensors will be bridged via CPU.");
    }

    await setupORT("sdxl-turbo", "dev");
    showCompatibleChromiumVersion("sdxl-turbo");

    if (getQueryValue("provider") && getQueryValue("provider").toLowerCase() === "webgpu") {
        title.innerHTML = "WebGPU";
        $("#webnnstatus").hidden = true;
        load.disabled = false;
    } else {
        await checkWebNN();
    }

    if (isHybridMode()) {
        try {
            const deviceTypes = new Set([config.deviceType]);
            if (config.hybridTextEncoderGpu) {
                deviceTypes.add("gpu");
                deviceTypes.add("npu");
            }
            if (config.deviceMap) {
                for (const dt of Object.values(parseDeviceMap(config.deviceMap))) {
                    deviceTypes.add(dt);
                }
            }
            for (const dt of deviceTypes) {
                await navigator.ml.createContext({ deviceType: dt });
            }
            log(`[Config] Hybrid mode enabled: models routed across ${[...deviceTypes].map(d => d.toUpperCase()).join(", ")}.`);
        } catch (error) {
            logError(`[Error] Hybrid mode requires WebNN support for all specified device types: ${error.message}`);
            throw error;
        }
    }

    for (const [modelName, prefix] of Object.entries(modelDOMPrefixes)) {
        dom[modelName] = {
            fetch: $(`#${prefix}Fetch`),
            create: $(`#${prefix}Create`),
            run: $(`#${prefix}Run`),
        };
    }
    dom.runTotal = $("#runTotal");

    opt.executionProviders = [config.provider];
    switch (config.provider) {
        case "webgpu":
            if (!("gpu" in navigator)) {
                throw new Error("webgpu is NOT supported");
            }
            break;
        case "webnn":
            webnnStatus = await getWebnnStatus();
            if (webnnStatus.webnn) {
                if (config.useIOBinding) {
                    mlContext = await navigator.ml.createContext({ deviceType: config.deviceType });
                }

                const executionProvider = {
                    name: "webnn",
                    deviceType: config.deviceType,
                };

                if (mlContext) {
                    executionProvider.context = mlContext;
                }

                opt.executionProviders = [
                    executionProvider,
                ];
            }
            break;
        default:
            throw new Error(`The provider ${config.provider} is not supported.`);
    }

    const deviceType = config.deviceType.toLowerCase();
    const provider = config.provider.toLowerCase();

    if (isHybridMode()) {
        device.innerHTML = "GPU + NPU";
        badge.setAttribute("class", "hybrid");
        document.body.setAttribute("class", "hybrid");
    } else if (deviceType === "cpu") {
        device.innerHTML = "CPU";
        badge.setAttribute("class", "cpu");
        document.body.setAttribute("class", "cpu");
    } else if (deviceType === "gpu" || provider === "webgpu") {
        device.innerHTML = "GPU";
        badge.setAttribute("class", "");
        document.body.setAttribute("class", "gpu");
    } else if (deviceType === "npu") {
        device.innerHTML = "NPU";
        badge.setAttribute("class", "npu");
        document.body.setAttribute("class", "npu");
    }

    prompt.value =
        "An artistic baby raccoon DJ in a vintage suit, adjusting knobs on a futuristic mixer. The scene is a dim nightclub with vibrant lights and soft bokeh. Highly detailed, cinematic style.";

    // Event listener for Ctrl + Enter or CMD + Enter
    prompt.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") {
            generateImage();
        }
    });
    generate.addEventListener("click", () => {
        generateImage();
    });

    const loadModelUi = () => {
        if (!config.safetyChecker) {
            delete models["safety_checker"];
            delete models["sc_prep"];
        }
        loading = loadModels(models);
        const imgDivs = $$("#image_area > div");
        imgDivs.forEach(div => div.setAttribute("class", "frame loadwave"));
        buttons.setAttribute("class", "button-group key loading");
    };

    load.addEventListener("click", () => {
        loadModelUi();
    });

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;

    if (config.safetyChecker) {
        scTr.setAttribute("class", "");
    } else {
        scTr.setAttribute("class", "hide");
    }

    window.addEventListener("beforeunload", () => {
        if (memoryReleaseSwitch.checked) {
            disposeTensors();
            const sessions = [
                models["text_encoder"]?.sess,
                models["text_encoder_2"]?.sess,
                models["unet"]?.sess,
                models["vae_decoder"]?.sess,
                models["sc_prep"]?.sess,
                models["safety_checker"]?.sess,
            ];

            Promise.allSettled(sessions.filter(session => session).map(session => session?.release())).catch(error =>
                console.error("Session release error:", error),
            );

            load.disabled = false;
            buttons.setAttribute("class", "button-group key");
            generate.disabled = true;
            $("#user-input").setAttribute("class", "form-control");
            updateLoadWave(0.0);
            const imgDivs = [img_div_0, img_div_1, img_div_2, img_div_3];
            imgDivs.forEach(div => div.setAttribute("class", "frame"));
            progressManager.reset();
            for (const key in dom) {
                if (key === "runTotal") {
                    dom[key].innerHTML = "";
                } else {
                    dom[key].fetch.innerHTML = "";
                    dom[key].create.innerHTML = "";
                    if (dom[key].run) {
                        dom[key].run.innerHTML = "";
                    }
                }
            }
        }
    });
};

if (document.readyState !== "loading") {
    ui();
} else {
    document.addEventListener("DOMContentLoaded", ui, false);
}

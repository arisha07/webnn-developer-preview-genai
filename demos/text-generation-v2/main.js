/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// Text Generation v2 — dropdown model selector demo
//

import { log, logUser, logError } from "../text-generation/utils.js";
import {
    $,
    $$,
    getQueryValue,
    getWebnnStatus,
    loadScript,
    setupORT,
    showCompatibleChromiumVersion,
    updateQueryStringParameter,
    getHuggingFaceDomain,
} from "../../assets/js/common_utils.js";
import { env, AutoTokenizer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";
import { LLM } from "./llm.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// ═══════════════════════════════════════════════════════════════════════════
// Model Configurations — add new models here (no HTML changes needed)
// ═══════════════════════════════════════════════════════════════════════════

const MODELS = {
    phi4mini: {
        name: "Phi-4 Mini Instruct",
        desc: "Microsoft Phi-4 Mini Instruct",
        id: "microsoft/Phi-4-mini-instruct-onnx-webnn",
        remote_id: "microsoft/Phi-4-mini-instruct",
        file_name: "model.onnx",
        local_path: "../text-generation/models/phi-4-mini-instruct-gqa/",
        remote_path: "https://huggingface.co/webnn/Phi-4-mini-instruct-onnx-webnn/resolve/main/onnx/",
        eos_token_id: [200020, 199999],
        max_length: 131072,
        num_layers: 32,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 200064,
        has_position_ids: false,
        enable_causallm: false,
        system_content: "You are a helpful AI assistant.",
    },
    tinyllama: {
        name: "TinyLlama 1.1B Chat v1.0",
        desc: "Meta TinyLlama-1.1B-Chat-v1.0",
        id: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        file_name: "model.onnx",
        local_path: "../text-generation/models/tinyllama-1.1B-gqa/",
        remote_path: "https://huggingface.co/webnn/TinyLlama-1.1B-Chat-v1.0-onnx/resolve/main/",
        eos_token_id: [2],
        max_length: 2048,
        num_layers: 22,
        kv_num_heads: 4,
        head_size: 64,
        vocab_size: 32000,
        has_position_ids: false,
        enable_causallm: false,
        system_content: "",
    },
    qwen2: {
        name: "Qwen2 0.5B Instruct",
        desc: "Alibaba Qwen2-0.5B-Instruct",
        id: "Qwen/Qwen2-0.5B-Instruct",
        file_name: "model.onnx",
        local_path: "../text-generation/models/Qwen/Qwen2-0.5B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Qwen2-0.5B-Instruct-onnx/resolve/main/",
        eos_token_id: [151645, 151643],
        max_length: 32768,
        num_layers: 24,
        kv_num_heads: 2,
        head_size: 64,
        vocab_size: 151936,
        has_position_ids: false,
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    qwen3: {
        name: "Qwen3 4B Instruct",
        desc: "Alibaba Qwen3-4B-Instruct",
        id: "Qwen/Qwen3-4B-Instruct",
        file_name: "model.onnx",
        local_path: "../text-generation/models/Qwen/Qwen3-4B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Qwen3-4B-Instruct-onnx/resolve/main/",
        eos_token_id: [151645, 151643],
        max_length: 40960,
        num_layers: 36,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 151936,
        has_position_ids: false,
        enable_thinking: false,
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    llama32: {
        name: "Llama 3.2 3B Instruct",
        desc: "Meta Llama-3.2-3B-Instruct",
        id: "meta-llama/Llama-3.2-3B-Instruct",
        file_name: "model.onnx",
        local_path: "../text-generation/models/meta-llama/Llama-3.2-3B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Llama-3.2-3B-Instruct-onnx/resolve/main/",
        eos_token_id: [128001, 128008, 128009],
        max_length: 131072,
        num_layers: 28,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 128256,
        has_position_ids: false,
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    qwen25_nogqa: {
        name: "Qwen2.5 0.5B Instruct (no GQA)",
        desc: "Alibaba Qwen2.5-0.5B-Instruct (standard attention, no GQA fusion)",
        id: "Qwen/Qwen2.5-0.5B-Instruct",
        file_name: "model.onnx",
        external_data_file: "8c28285e-53bd-11f1-8199-58cdc9c761b4.data",
        local_path: "../text-generation/models/Qwen/Qwen2.5-0.5B-Instruct/",
        enable_additive_dim_param: false,
        remote_path: "",
        eos_token_id: [151645, 151643],
        max_length: 2048,
        num_layers: 24,
        kv_num_heads: 2,
        head_size: 64,
        vocab_size: 151936,
        has_position_ids: true,
        use_gqa: false,
        kv_dtype: "float32",
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    llama1b_nogqa: {
        name: "Llama 3.2 1B Instruct (no GQA)",
        desc: "Meta Llama-3.2-1B-Instruct (standard attention, no GQA fusion)",
        id: "llama-3.2-1B-instruct-nogqa",
        file_name: "model.onnx",
        local_path: "../text-generation/models/llama-3.2-1B-instruct-nogqa/",
        remote_path: "",
        eos_token_id: [128001, 128008, 128009],
        max_length: 2048,
        num_layers: 16,
        kv_num_heads: 8,
        head_size: 64,
        vocab_size: 128256,
        has_position_ids: true,
        use_gqa: false,
        kv_dtype: "float32",
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    deepseekr1: {
        name: "DeepSeek R1 Distill Qwen 1.5B",
        desc: "DeepSeek R1 Distill Qwen 1.5B",
        id: "onnxruntime/DeepSeek-R1-Distill-ONNX",
        remote_id: "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX",
        file_name: "model.onnx",
        local_path: "../text-generation/models/Deepseek-R1-Distill-gqa/",
        remote_path:
            "https://huggingface.co/onnxruntime/DeepSeek-R1-Distill-ONNX/resolve/main/deepseek-r1-distill-qwen-1.5B/gpu/gpu-int4-rtn-block-32/",
        eos_token_id: [151643],
        max_length: 131072,
        num_layers: 28,
        kv_num_heads: 2,
        head_size: 128,
        vocab_size: 151936,
        has_position_ids: false,
        enable_thinking: false,
        enable_causallm: false,
        repetition_penalty: 1.2,
        temperature: 0.6,
        top_k: 50,
        top_p: 0.95,
        end_think_token_id: 151649,
        max_think_tokens: 300,
        system_content: "You are a helpful assistant. Answer questions directly and concisely.",
    },
    llama3b_nogqa: {
        name: "Llama 3.2 3B Instruct (no GQA)",
        desc: "Meta Llama-3.2-3B-Instruct (standard attention, no GQA fusion)",
        id: "Llama-3.2-3B-Instruct-nogqa",
        file_name: "model.onnx",
        external_data_file: "04f049c9-6047-11f1-8199-58cdc9c761b4.data",
        local_path: "../text-generation/models/Llama-3.2-3B-Instruct-nogqa/",
        remote_path: "",
        eos_token_id: [128001, 128008, 128009],
        max_length: 2048,
        num_layers: 28,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 128256,
        has_position_ids: true,
        use_gqa: false,
        kv_dtype: "float32",
        enable_causallm: false,
        system_content: "You are a helpful assistant.",
    },
    deepseekr1_nogqa: {
        name: "DeepSeek R1 Distill Qwen 1.5B (no GQA)",
        desc: "DeepSeek R1 Distill Qwen 1.5B (standard attention, no GQA fusion)",
        id: "deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B-gpu-noGQA",
        file_name: "model.onnx",
        external_data_file: "df06157a-3f65-11f1-86db-00249b77102c.data",
        local_path: "../text-generation/models/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B-gpu-noGQA/",
        remote_path: "",
        eos_token_id: [151643],
        max_length: 4092,
        num_layers: 28,
        kv_num_heads: 2,
        head_size: 128,
        vocab_size: 151936,
        has_position_ids: true,
        use_gqa: false,
        kv_dtype: "float32",
        enable_causallm: false,
        repetition_penalty: 1.0,
        temperature: 0.6,
        top_k: 50,
        top_p: 0.95,
        system_content: "You are a helpful assistant.",
    },
};

// ═══════════════════════════════════════════════════════════════════════════
// State
// ═══════════════════════════════════════════════════════════════════════════

let performanceIndicator;
let userInput, chatHistory;
let sendButton, stopButton, buttons, scrollWrapper;
let provider = "webnn";
let deviceType = "gpu";
let device, badge;
let ctrlKey = false;
let ready = false;
let cleanCache = false;
let currentModelKey = null;

const clipboardIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'>
<path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/>
<path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/>
</svg>`;

marked.use({ mangle: false, headerIds: false });

// ═══════════════════════════════════════════════════════════════════════════
// Auto scroll
// ═══════════════════════════════════════════════════════════════════════════

let isAutoScrollOn = true;
let lastKnownScrollPosition = 0;
let ticking = false;

const autoScroller = new ResizeObserver(() => {
    if (isAutoScrollOn) {
        scrollWrapper.scrollIntoView({ behavior: "smooth", block: "end" });
    }
});

document.addEventListener("scroll", () => {
    if (!ticking && isAutoScrollOn && window.scrollY < lastKnownScrollPosition) {
        window.requestAnimationFrame(() => {
            isAutoScrollOn = false;
            ticking = false;
        });
        ticking = true;
    } else if (
        !ticking &&
        !isAutoScrollOn &&
        window.scrollY > lastKnownScrollPosition &&
        window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 30
    ) {
        window.requestAnimationFrame(() => {
            isAutoScrollOn = true;
            ticking = false;
        });
        ticking = true;
    }
    lastKnownScrollPosition = window.scrollY;
});

// ═══════════════════════════════════════════════════════════════════════════
// Clipboard copy
// ═══════════════════════════════════════════════════════════════════════════

function copyTextToClipboard(responseDiv) {
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.setAttribute("title", "Copy response to clipboard");
    copyButton.innerHTML = clipboardIcon;
    copyButton.onclick = () => {
        navigator.clipboard.writeText(responseDiv.innerText);
        logUser("Copied response to clipboard");
    };
    let responseMessageOuter = $$(".response-message-outer");
    let lastResponseMessageOuter = responseMessageOuter[responseMessageOuter.length - 1];
    lastResponseMessageOuter.appendChild(copyButton);
}

// ═══════════════════════════════════════════════════════════════════════════
// Model Info Display
// ═══════════════════════════════════════════════════════════════════════════

function showModelInfo(modelKey) {
    const model = MODELS[modelKey];
    if (!model) return;

    $("#info-type").textContent = model.use_gqa === false ? "Non-GQA (standard)" : "GQA (fused)";
    $("#info-layers").textContent = model.num_layers;
    $("#info-kv-heads").textContent = model.kv_num_heads;
    $("#info-head-size").textContent = model.head_size;
    $("#info-vocab-size").textContent = model.vocab_size.toLocaleString();
    $("#info-max-length").textContent = model.max_length.toLocaleString();
    $("#info-dtype").textContent = model.kv_dtype || "float16 (GQA)";

    $("#model-info").hidden = false;
}

// ═══════════════════════════════════════════════════════════════════════════
// Chat Logic
// ═══════════════════════════════════════════════════════════════════════════

let config;
let tokenizer;
let llm;
let messages = [];

function getConfig() {
    const query = window.location.search.substring(1);
    var cfg = {
        model: "",
        provider: "webnn",
        deviceType: "gpu",
        profiler: 0,
        verbose: 0,
        threads: 1,
        show_special: 0,
        csv: 0,
        max_length: 512,
        local: 0,
    };
    let vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] in cfg) {
            const key = pair[0];
            const value = decodeURIComponent(pair[1]);
            if (typeof cfg[key] == "number") {
                cfg[key] = parseInt(value);
            } else {
                cfg[key] = value;
            }
        }
    }
    return cfg;
}

function formatWithThinking(text) {
    const hasCloseThink = text.includes("</think>");
    if (hasCloseThink) {
        const parts = text.split("</think>");
        let thinkPart = parts[0].replace(/^<think>\s*/, "").trim();
        let answerPart = parts.slice(1).join("</think>").trim();
        answerPart = answerPart.replace(/<\/>\s*$/g, "").trim();
        let html = "";
        if (thinkPart) {
            html += `<details class="thinking-content"><summary class="thinking-label">Thinking</summary>${marked.parse(thinkPart)}</details>`;
        }
        if (answerPart) {
            html += marked.parse(answerPart);
        }
        return html;
    } else {
        let thinkContent = text.replace(/^<think>\s*/, "").trim();
        if (thinkContent) {
            return `<details class="thinking-content" open><summary class="thinking-label">Thinking...</summary>${marked.parse(thinkContent)}</details>`;
        }
        return `<details class="thinking-content" open><summary class="thinking-label">Thinking...</summary></details>`;
    }
}

function stripThinkingContent(text) {
    text = text.replace(/<think>[\s\S]*?<\/think>\s*/g, "");
    text = text.replace(/^[\s\S]*?<\/think>\s*/g, "");
    text = text.replace(/<\/>\s*$/g, "").trim();
    return text;
}

function tokenToText(tokens) {
    return tokenizer.decode(tokens, { skip_special_tokens: config.show_special != 1 });
}

async function submitRequest(e) {
    if (ready === false) return;
    if (userInput.innerText.length < 1 && sendButton.disabled === false && ctrlKey === false) {
        logUser("Please type a message");
        return;
    }
    if (sendButton.disabled === true) {
        llm.abort();
        buttons.setAttribute("class", "button-group key");
        sendButton.disabled = false;
        return;
    }

    const continuation = !(e.ctrlKey && e.key === "Enter");

    if (continuation) {
        logUser(`Continuation: ${continuation}`);
    } else {
        performanceIndicator.innerHTML = "";
        logUser(`Continuation: ${continuation}. New conversation started.`);
    }

    let input = userInput.innerText;
    if (input.length == 0) {
        chatHistory.context = "";
        while (chatHistory.firstChild) {
            chatHistory.firstChild.remove();
        }
        return;
    }

    // Append to chat history
    let messageElement = document.createElement("div");
    messageElement.className = "message-element";
    let userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.innerText = input;
    messageElement.appendChild(userMessageDiv);
    chatHistory.appendChild(messageElement);

    // Container for LLM response
    let responseDiv = document.createElement("div");
    responseDiv.className = "response-message";
    let responseOuter = document.createElement("div");
    responseOuter.className = "response-message-outer";
    let spinner = document.createElement("div");
    spinner.innerHTML = `<span class="dots"></span>`;
    responseDiv.appendChild(spinner);
    responseOuter.appendChild(responseDiv);
    chatHistory.appendChild(responseOuter);

    sendButton.disabled = true;
    buttons.setAttribute("class", "button-group key inferencing");
    autoScroller.observe(responseDiv);

    Query(continuation, input, word => {
        if (config.model.end_think_token_id) {
            responseDiv.innerHTML = formatWithThinking(word);
        } else {
            responseDiv.innerHTML = marked.parse(word);
        }
    })
        .then(() => {
            chatHistory.context = responseDiv.innerHTML;
            copyTextToClipboard(responseDiv, true);
            sendButton.disabled = false;
            buttons.setAttribute("class", "button-group key");
            spinner.remove();
        })
        .catch(error => {
            console.error(error);
            sendButton.disabled = false;
            buttons.setAttribute("class", "button-group key");
            spinner.remove();
        });

    userInput.innerHTML = "";
}

async function Query(continuation, query, cb) {
    performanceIndicator.innerHTML = "";
    logUser(`Prompt: ${query}`);
    let userChatTemplate = { role: "user", content: query };

    if (!continuation || messages.length === 0) {
        messages = [];
        if (config.model.system_content) {
            messages.push({ role: "system", content: config.model.system_content });
        }
    }
    messages.push(userChatTemplate);

    const chatTemplateOptions = {
        add_generation_prompt: true,
        tokenize: true,
        return_tensor: false,
    };
    if (config.model.enable_thinking !== undefined) {
        chatTemplateOptions.enable_thinking = config.model.enable_thinking;
    }

    let inputIds = tokenizer.apply_chat_template(messages, chatTemplateOptions);
    if (inputIds && !Array.isArray(inputIds) && inputIds.input_ids) {
        inputIds = inputIds.input_ids;
    }

    const deltaTokens = inputIds.length - llm.startLength;
    if (
        llm.outputTokens.length > 0 &&
        continuation &&
        !cleanCache &&
        deltaTokens > 0 &&
        llm.startLength + deltaTokens <= llm.maxLength
    ) {
        inputIds = inputIds.slice(llm.startLength);
        logUser(
            `Continuation: feeding ${inputIds.length} new tokens (startLength=${llm.startLength}, total=${llm.startLength + inputIds.length}/${llm.maxLength})`,
        );
    } else {
        await llm.initialize();
        llm.startLength = 0;
        cleanCache = false;
        if (inputIds.length > llm.maxLength) {
            messages = [];
            if (config.model.system_content) {
                messages.push({ role: "system", content: config.model.system_content });
            }
            messages.push(userChatTemplate);
            const overflowOptions = {
                add_generation_prompt: true,
                tokenize: true,
                return_tensor: false,
            };
            if (config.model.enable_thinking !== undefined) {
                overflowOptions.enable_thinking = config.model.enable_thinking;
            }
            inputIds = tokenizer.apply_chat_template(messages, overflowOptions);
            if (inputIds && !Array.isArray(inputIds) && inputIds.input_ids) {
                inputIds = inputIds.input_ids;
            }
        }
    }

    inputIds = Array.from(inputIds).map(num => BigInt(num));
    logUser(`Prompt length: ${inputIds.length}`);

    let timeToFirstToken;
    const startTimer = performance.now();
    const outputTokens = await llm.generate(inputIds, outputTokens => {
        if (outputTokens.length == 1) {
            timeToFirstToken = (performance.now() - startTimer) / 1000;
        }
        cb(tokenToText(outputTokens));
    });

    let outputContent = tokenizer.decode(outputTokens, {
        skip_special_tokens: config.show_special != 1,
    });
    if (config.model.end_think_token_id) {
        outputContent = stripThinkingContent(outputContent);
    }
    messages.push({ role: "assistant", content: outputContent });
    cleanCache = false;

    const took = (performance.now() - startTimer) / 1000;
    const timeToNewTokens = took - timeToFirstToken;
    const sequenceLength = outputTokens.length;
    log(`${sequenceLength} tokens in ${took.toFixed(2)} sec<br/>
    Time to first token: ${timeToFirstToken.toFixed(2)} sec<br/>
    New tokens per second: ${((sequenceLength - 1) / timeToNewTokens).toFixed(2)} tokens/sec`);

    // Performance display
    const timeToFirstTokenPerformanceUnit = document.createElement("div");
    timeToFirstTokenPerformanceUnit.className = "tokens-per-second-performance-unit";
    timeToFirstTokenPerformanceUnit.innerHTML = `time to first token`;
    const timeToFirstTokenPerformance = document.createElement("div");
    timeToFirstTokenPerformance.className = "tokens-per-second-performance-data";
    timeToFirstTokenPerformance.innerHTML = `${timeToFirstToken.toFixed(2)}s`;
    const performanceDataTtfs = document.createElement("div");
    performanceDataTtfs.className = "performance-data";
    performanceDataTtfs.setAttribute("title", "Time to first token");
    performanceDataTtfs.appendChild(timeToFirstTokenPerformanceUnit);
    performanceDataTtfs.appendChild(timeToFirstTokenPerformance);

    const tokensPerSecondPerformance = document.createElement("div");
    tokensPerSecondPerformance.className = "tokens-per-second-performance-data";
    tokensPerSecondPerformance.innerHTML = `${((sequenceLength - 1) / timeToNewTokens).toFixed(2)}`;
    const tokensPerSecondPerformanceUnit = document.createElement("div");
    tokensPerSecondPerformanceUnit.className = "tokens-per-second-performance-unit";
    tokensPerSecondPerformanceUnit.innerHTML = `tokens/s`;
    const performanceDataTps = document.createElement("div");
    performanceDataTps.className = "performance-data";
    performanceDataTps.setAttribute("title", "tokens per second");
    performanceDataTps.appendChild(tokensPerSecondPerformance);
    performanceDataTps.appendChild(tokensPerSecondPerformanceUnit);
    performanceIndicator.innerHTML = "";
    performanceIndicator.appendChild(performanceDataTtfs);
    performanceIndicator.appendChild(performanceDataTps);
}

// ═══════════════════════════════════════════════════════════════════════════
// Load Model
// ═══════════════════════════════════════════════════════════════════════════

async function loadModel(modelKey) {
    const model = MODELS[modelKey];
    if (!model) {
        logError(`Unknown model: ${modelKey}`);
        return;
    }

    // Update config
    config.model = model;
    currentModelKey = modelKey;

    // Update title
    document.querySelector("#model").innerHTML = model.name;



    // Reset state
    ready = false;
    sendButton.disabled = true;
    messages = [];
    if (model.system_content) {
        messages.push({ role: "system", content: model.system_content });
    }

    // Clear chat
    chatHistory.innerHTML = "";
    performanceIndicator.innerHTML = "";

    log(`Loading ${model.name}...`);

    try {
        // Dispose previous session if exists
        if (llm) {
            await llm.dispose();
        }

        llm = new LLM(config.max_length);

        let modelId = model.id;
        if (!config.local && model.remote_id) {
            modelId = model.remote_id;
        }

        if (!config.local) {
            const domain = await getHuggingFaceDomain();
            model.remote_path = model.remote_path.replace("huggingface.co", domain);
            env.remoteHost = `https://${domain}/`;
        }

        tokenizer = await AutoTokenizer.from_pretrained(modelId);
        await llm.load(model, {
            provider: config.provider,
            deviceType: config.deviceType,
            profiler: config.profiler,
            verbose: config.verbose,
            local: config.local,
            enable_causallm: model.enable_causallm || false,
        });

        sendButton.disabled = false;
        ready = true;
        log("Ready to type your message ...");
    } catch (error) {
        logError(`[Error] ${error}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// UI Setup
// ═══════════════════════════════════════════════════════════════════════════

const ui = async () => {
    config = getConfig();

    // Strip model param from URL — we don't auto-load, user picks from dropdown
    const initUrl = new URL(window.location);
    if (initUrl.searchParams.has("model")) {
        initUrl.searchParams.delete("model");
        window.history.replaceState({}, "", initUrl);
    }

    // Default provider/devicetype
    if (!getQueryValue("provider") && !getQueryValue("devicetype")) {
        const url = new URL(window.location);
        url.searchParams.set("provider", provider);
        url.searchParams.set("devicetype", deviceType);
        window.history.replaceState({}, "", url);
        config.provider = provider;
        config.deviceType = deviceType;
    }

    if (getQueryValue("devicetype")) {
        deviceType = getQueryValue("devicetype").toLowerCase();
        config.deviceType = deviceType;
    }
    if (getQueryValue("provider")) {
        provider = getQueryValue("provider").toLowerCase();
        config.provider = provider;
    }

    location.hostname.includes("github.io") ? (config.local = 0) : (config.local = 1);

    // Setup transformers.js
    env.localModelPath = "../text-generation/models";
    env.allowRemoteModels = config.local == 0;
    env.allowLocalModels = config.local == 1;

    // DOM refs
    device = $("#device");
    badge = $("#badge");
    sendButton = $("#send-button");
    stopButton = $("#stop-button");
    buttons = $("#buttons");
    performanceIndicator = $("#performance-indicator");
    scrollWrapper = $("#scroll-wrapper");
    userInput = $("#user-input");
    chatHistory = $("#chat-history");

    // Device badge
    if (deviceType === "cpu" || provider === "wasm") {
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

    // Device toggle buttons
    const deviceBtns = document.querySelectorAll(".device-btn");
    for (const btn of deviceBtns) {
        if (btn.dataset.device === deviceType) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
        btn.addEventListener("click", () => {
            for (const b of deviceBtns) b.classList.remove("active");
            btn.classList.add("active");
            deviceType = btn.dataset.device;
            config.deviceType = deviceType;

            // Update badge
            if (deviceType === "gpu") {
                device.innerHTML = "GPU";
                badge.setAttribute("class", "");
                document.body.setAttribute("class", "gpu");
            } else if (deviceType === "npu") {
                device.innerHTML = "NPU";
                badge.setAttribute("class", "npu");
                document.body.setAttribute("class", "npu");
            }

            // Update URL
            const url = new URL(window.location);
            url.searchParams.set("devicetype", deviceType);
            window.history.replaceState({}, "", url);

            // Force re-load on next "Load Model" click
            currentModelKey = null;
        });
    }

    // Populate dropdown
    const selector = $("#model-selector");
    for (const [key, model] of Object.entries(MODELS)) {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = model.name;
        if (model.use_gqa === false) {
            opt.textContent += " ●"; // visual indicator for non-GQA
        }
        selector.appendChild(opt);
    }

    // Pre-select from URL if present
    const urlModel = getQueryValue("model");
    if (urlModel && MODELS[urlModel]) {
        selector.value = urlModel;
    }

    // Show info on selection change
    selector.addEventListener("change", () => {
        showModelInfo(selector.value);
    });

    // Show initial model info
    showModelInfo(selector.value);

    // Load Model button
    $("#load-model").addEventListener("click", async () => {
        const selectedModel = selector.value;
        if (selectedModel === currentModelKey) {
            logUser("Model already loaded");
            return;
        }
        // Use custom local ORT build (with freeDimensionOverrides / ShapeSubgraphFolder)
        // unless ?ort= is specified in URL
        const ortOverride = getQueryValue("ort");
        if (ortOverride) {
            await setupORT("text-generation", "dev");
        } else {
            await loadScript("onnxruntime-web", "./dist/ort.webgpu.min.js");
            log("ONNX Runtime Web: local build (with QDQ fix)");
        }
        showCompatibleChromiumVersion("text-generation");
        ort.env.wasm.numThreads = 4;
        ort.env.wasm.simd = true;
        ort.env.wasm.proxy = false;
        ort.env.logLevel = "warning";
        log(`ONNX Runtime Web Execution Provider loaded · ${provider.toLowerCase()}`);
        await loadModel(selectedModel);
    });

    // WebNN status
    let webnnStatus = await getWebnnStatus();
    let status = $("#webnnstatus");
    if (provider === "wasm") {
        status.innerHTML = "";
    } else if (provider === "webgpu") {
        status.innerHTML = "";
    } else if (webnnStatus.webnn) {
        status.innerHTML = "WebNN supported ✓";
    } else {
        status.innerHTML = webnnStatus.message || "WebNN not available";
    }

    // Key handlers
    sendButton.addEventListener("click", submitRequest);
    stopButton.addEventListener("click", submitRequest);
    userInput.focus();

    $("#user-input").addEventListener("keydown", async function (e) {
        if (e.ctrlKey && e.key === "Enter") {
            ctrlKey = true;
            cleanCache = true;
            submitRequest(e);
        } else if (e.key === "Enter") {
            e.preventDefault();
            ctrlKey = false;
            submitRequest(e);
        }
    });

};

ui().catch(e => console.error("ui() failed:", e));

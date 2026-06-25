/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run LLM in onnxruntime-web.
//

import { log, logUser, logError } from "./utils.js";
import {
    $,
    $$,
    getQueryValue,
    getWebnnStatus,
    setupORT,
    showCompatibleChromiumVersion,
    updateQueryStringParameter,
    getHuggingFaceDomain,
} from "../../assets/js/common_utils.js";
import { env, AutoTokenizer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";
import { LLM } from "./llm.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const MODELS = {
    tinyllama: {
        name: "TinyLlama 1.1B Chat v1.0",
        desc: "Meta TinyLlama-1.1B-Chat-v1.0",
        id: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        file_name: "model.onnx",
        local_path: "models/TinyLlama/TinyLlama-1.1B-Chat-v1.0/",
        remote_path: "https://huggingface.co/webnn/TinyLlama-1.1B-Chat-v1.0-onnx/resolve/main/",
        eos_token_id: [2],
        max_length: 2048,
        num_layers: 22,
        kv_num_heads: 4,
        head_size: 64,
        vocab_size: 32000,
        has_position_ids: false,
        system_content: "",
    },
    tinyllama128: {
        name: "TinyLlama 1.1B Chat v1.0 (block-128)",
        desc: "TinyLlama-1.1B-Chat-v1.0 with MatMulNBits block size 128",
        id: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        file_name: "model.onnx",
        local_path: "models/TinyLlama/webnn-tinyllama-1.1b-v1.0-128-block-size/",
        remote_path: "https://huggingface.co/webnn/TinyLlama-1.1B-Chat-v1.0-onnx/resolve/main/",
        eos_token_id: [2],
        max_length: 2048,
        num_layers: 22,
        kv_num_heads: 4,
        head_size: 64,
        vocab_size: 32000,
        has_position_ids: false,
        system_content: "",
    },
    phi4mini: {
        name: "Phi-4 Mini Instruct",
        desc: "Microsoft Phi-4 Mini Instruct",
        id: "microsoft/Phi-4-mini-instruct-onnx-webnn",
        remote_id: "microsoft/Phi-4-mini-instruct",
        file_name: "model.onnx",
        local_path: "models/microsoft/Phi-4-mini-instruct-onnx-webnn/",
        remote_path: "https://huggingface.co/webnn/Phi-4-mini-instruct-onnx-webnn/resolve/main/onnx/",
        eos_token_id: [200020, 199999],
        max_length: 131072,
        num_layers: 32,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 200064,
        has_position_ids: false,
        system_content: "You are a helpful AI assistant.",
    },
    qwen2: {
        name: "Qwen2 0.5B Instruct",
        desc: "Alibaba Qwen2-0.5B-Instruct",
        id: "Qwen/Qwen2-0.5B-Instruct",
        file_name: "model.onnx",
        local_path: "models/Qwen/Qwen2-0.5B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Qwen2-0.5B-Instruct-onnx/resolve/main/",
        eos_token_id: [151645, 151643],
        max_length: 32768,
        num_layers: 24,
        kv_num_heads: 2,
        head_size: 64,
        vocab_size: 151936,
        has_position_ids: false,
        system_content: "You are a helpful assistant.",
    },
    qwen3: {
        name: "Qwen3 4B Instruct",
        desc: "Alibaba Qwen3-4B-Instruct",
        id: "Qwen/Qwen3-4B-Instruct",
        file_name: "model.onnx",
        local_path: "models/Qwen/Qwen3-4B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Qwen3-4B-Instruct-onnx/resolve/main/",
        eos_token_id: [151645, 151643],
        max_length: 40960,
        num_layers: 36,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 151936,
        has_position_ids: false,
        enable_thinking: false,
        system_content: "You are a helpful assistant.",
    },
    qwen3128: {
        name: "Qwen3 4B Instruct block-128",
        desc: "Alibaba Qwen3-4B-Instruct block size 128",
        id: "Qwen/Qwen3-4B-Instruct",
        file_name: "model.onnx",
        local_path: "models/Qwen/Qwen3-4B-Instruct-128-block-size/",
        remote_path: "https://huggingface.co/webnn/Qwen3-4B-Instruct-onnx/resolve/main/",
        eos_token_id: [151645, 151643],
        max_length: 40960,
        num_layers: 36,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 151936,
        has_position_ids: false,
        enable_thinking: false,
        system_content: "You are a helpful assistant.",
    },
    llama32: {
        name: "Llama 3.2 3B Instruct",
        desc: "Meta Llama-3.2-3B-Instruct",
        id: "meta-llama/Llama-3.2-3B-Instruct",
        file_name: "model.onnx",
        local_path: "models/meta-llama/Llama-3.2-3B-Instruct/",
        remote_path: "https://huggingface.co/webnn/Llama-3.2-3B-Instruct-onnx/resolve/main/",
        eos_token_id: [128001, 128008, 128009],
        max_length: 131072,
        num_layers: 28,
        kv_num_heads: 8,
        head_size: 128,
        vocab_size: 128256,
        has_position_ids: false,
        system_content: "You are a helpful assistant.",
    },
    deepseekr1: {
        name: "DeepSeek R1 Distill Qwen 1.5B",
        desc: "DeepSeek R1 Distill Qwen 1.5B",
        id: "onnxruntime/DeepSeek-R1-Distill-ONNX",
        remote_id: "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX", // we actually use tokenizer files from this repo
        file_name: "model.onnx",
        local_path: "models/onnxruntime/DeepSeek-R1-Distill-ONNX/",
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
        repetition_penalty: 1.2,
        temperature: 0.6,
        top_k: 50,
        top_p: 0.95,
        end_think_token_id: 151649,
        max_think_tokens: 300,
        system_content: "You are a helpful assistant. Answer questions directly and concisely.",
    },
};

let performanceIndicator;
let userInput, chatHistory;
let sendButton, stopButton, buttons, scrollWrapper;
let modelSelectors;
let provider = "webnn";
let deviceType = "gpu";
let device;
let badge;
let ctrlKey = false;
let ready = false;
let cleanCache = false;

const clipboardIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'>
<path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/>
<path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/>
</svg>`;

marked.use({ mangle: false, headerIds: false });

//
// Auto scroll the content area until a user scrolls up
//
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

//
// Make response available for copying to clipboard
//
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

//
// User hits send, Enter or Ctrl + Enter
//
async function submitRequest(e) {
    if (ready === false) {
        return;
    }
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

    // Enter will continue the conversation, Ctrl + Enter will clear the chat history and start a new conversation
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
    let context = chatHistory.context;
    if (context === undefined) {
        context = "";
    }

    // Append to chat history
    let messageElement = document.createElement("div");
    messageElement.className = "message-element";
    let userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.innerText = input;
    messageElement.appendChild(userMessageDiv);
    chatHistory.appendChild(messageElement);

    // Container for llm response
    let responseDiv = document.createElement("div");
    responseDiv.className = "response-message";
    let responseOuter = document.createElement("div");
    responseOuter.className = "response-message-outer";
    let spinner = document.createElement("div");
    spinner.innerHTML = `<span class="dots"></span>`;
    responseDiv.appendChild(spinner);
    responseOuter.appendChild(responseDiv);
    chatHistory.appendChild(responseOuter);

    // Toggle button to stop text generation
    sendButton.disabled = true;
    buttons.setAttribute("class", "button-group key inferencing");

    // Change autoScroller to keep track of our new responseDiv
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

    // Clear user input
    userInput.innerHTML = "";
}

//
// Event listener for Ctrl + Enter or Enter
//
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

function getConfig() {
    const query = window.location.search.substring(1);
    const config = {
        model: "phi4mini",
        provider: "webnn",
        deviceType: "gpu",
        profiler: 0,
        verbose: 0,
        threads: 1,
        show_special: 0,
        csv: 0,
        max_length: 512,
        enable_causallm: 0,
        local: 0,
    };
    let vars = query.split("&");
    let errorMessage = "";
    for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] in config) {
            const key = pair[0];
            const value = decodeURIComponent(pair[1]);
            if (typeof config[key] == "number") {
                config[key] = parseInt(value);
            } else {
                config[key] = value;
            }
        }
    }
    if (MODELS[config.model] !== undefined) {
        config.model = MODELS[config.model];
    } else {
        errorMessage = `Unsupported model name: ${config.model}`;
        logError(errorMessage);
        throw new Error(errorMessage);
    }
    if (config.max_length < 0 || config.max_length > config.model.context_length) {
        errorMessage = `max_length should not execeed ${config.model.context_length}`;
        logError(errorMessage);
        throw new Error(errorMessage);
    }
    return config;
}

const config = getConfig();

location.hostname.includes("github.io") ? (config.local = 0) : (config.local = 1);

// Setup for transformers.js tokenizer
env.localModelPath = "models";
env.allowRemoteModels = config.local == 0;
env.allowLocalModels = config.local == 1;

let tokenizer;

const llm = new LLM(config.max_length);
let messages = [];

if (config.model.system_content) {
    messages.push({ role: "system", content: config.model.system_content });
}
function formatWithThinking(text) {
    const hasCloseThink = text.includes("</think>");
    if (hasCloseThink) {
        // Thinking complete: split into thinking + answer
        const parts = text.split("</think>");
        let thinkPart = parts[0].replace(/^<think>\s*/, "").trim();
        let answerPart = parts.slice(1).join("</think>").trim();
        // Remove stray </> tags
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
        // Still thinking - show open
        let thinkContent = text.replace(/^<think>\s*/, "").trim();
        if (thinkContent) {
            return `<details class="thinking-content" open><summary class="thinking-label">Thinking...</summary>${marked.parse(thinkContent)}</details>`;
        }
        return `<details class="thinking-content" open><summary class="thinking-label">Thinking...</summary></details>`;
    }
}

function stripThinkingContent(text) {
    // Remove <think>...</think> blocks (including empty ones)
    text = text.replace(/<think>[\s\S]*?<\/think>\s*/g, "");
    // Remove orphaned thinking content before </think>
    // (when <think> was in the prompt, not in output tokens)
    text = text.replace(/^[\s\S]*?<\/think>\s*/g, "");
    // Remove stray closing tags like </> that small models may emit
    text = text.replace(/<\/>\s*$/g, "").trim();
    return text;
}

function tokenToText(tokenizer, tokens) {
    let text = tokenizer.decode(tokens, { skip_special_tokens: config.show_special != 1 });
    return text;
}

async function Query(continuation, query, cb) {
    performanceIndicator.innerHTML = "";
    logUser(`Prompt: ${query}`);
    let userChatTemplate = { role: "user", content: query };

    // For continuation, accumulate conversation history; otherwise start fresh
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
    // Pass enable_thinking if the model defines it (e.g., Qwen3)
    if (config.model.enable_thinking !== undefined) {
        chatTemplateOptions.enable_thinking = config.model.enable_thinking;
    }

    let inputIds = tokenizer.apply_chat_template(messages, chatTemplateOptions);

    // Extract input_ids if apply_chat_template returns an object (e.g. { input_ids, attention_mask })
    if (inputIds && !Array.isArray(inputIds) && inputIds.input_ids) {
        inputIds = inputIds.input_ids;
    }

    // For continuation, only feed the new (delta) tokens to the model since KV cache has the old context
    const deltaTokens = inputIds.length - llm.startLength;
    if (
        llm.outputTokens.length > 0 &&
        continuation &&
        !cleanCache &&
        deltaTokens > 0 &&
        llm.startLength + deltaTokens <= llm.maxLength
    ) {
        // Slice off only the new tokens that the KV cache hasn't seen
        inputIds = inputIds.slice(llm.startLength);
        logUser(
            `Continuation: feeding ${inputIds.length} new tokens (startLength=${llm.startLength}, total=${llm.startLength + inputIds.length}/${llm.maxLength})`,
        );
    } else {
        // Full initialization
        await llm.initialize();
        llm.startLength = 0;
        cleanCache = false;
        if (inputIds.length > llm.maxLength) {
            console.log(`Context length exceeds max new tokens, clean up...`);
            // Trim conversation to fit
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
    console.log("messages: ", messages);

    // Convert inputIds to BigInt
    inputIds = Array.from(inputIds).map(num => BigInt(num));
    logUser(`Prompt length: ${inputIds.length}`);

    let timeToFirstToken;
    const startTimer = performance.now();
    const outputTokens = await llm.generate(inputIds, outputTokens => {
        if (outputTokens.length == 1) {
            // Time to first token
            timeToFirstToken = (performance.now() - startTimer) / 1000;
        }
        cb(tokenToText(tokenizer, outputTokens));
    });

    let outputContent = tokenizer.decode(outputTokens, {
        skip_special_tokens: config.show_special != 1,
    });
    // For conversation history, strip thinking (model shouldn't see its own thinking in context)
    if (config.model.end_think_token_id) {
        outputContent = stripThinkingContent(outputContent);
    }
    let assistentChatTemplate = { role: "assistant", content: outputContent };
    messages.push(assistentChatTemplate);
    cleanCache = false;

    const took = (performance.now() - startTimer) / 1000;
    const timeToNewTokens = took - timeToFirstToken;
    const sequenceLength = outputTokens.length;
    const tps = (sequenceLength - 1) / timeToNewTokens;
    const ipot = llm.inferenceTokenCount > 0 ? llm.inferenceTimeSum / llm.inferenceTokenCount : 0;
    const avgSessionRun = llm.inferenceTokenCount > 0 ? llm.sessionRunTimeSum / llm.inferenceTokenCount : 0;

    log(`${sequenceLength} tokens in ${took.toFixed(2)} sec<br/>
    Time to first token: ${timeToFirstToken.toFixed(2)} sec<br/>
    New tokens per second: ${tps.toFixed(2)} tokens/sec<br/>
    IPOT: ${ipot.toFixed(2)} ms/token<br/>
    Avg session.run(): ${avgSessionRun.toFixed(2)} ms/token`);

    performanceIndicator.innerHTML =
        `<span class="perf-metric"><b>${sequenceLength}</b> tokens</span>` +
        `<span class="perf-metric">TTFT: <b>${timeToFirstToken.toFixed(2)}</b>s</span>` +
        `<span class="perf-metric">TPOS: <b>${tps.toFixed(2)}</b> tokens/s</span>` +
        `<span class="perf-metric">IPOT: <b>${ipot.toFixed(2)}</b> ms/token</span>` +
        `<span class="perf-metric">Avg session.run(): <b>${avgSessionRun.toFixed(2)}</b> ms/token</span>`;
}

const main = async () => {
    await setupORT("text-generation", "dev");
    showCompatibleChromiumVersion("text-generation");

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;
    ort.env.wasm.proxy = false;
    ort.env.logLevel = "warning";
    // ort.env.trace = true;

    log(`ONNX Runtime Web Execution Provider loaded · ${provider.toLowerCase()}`);

    sendButton.addEventListener("click", submitRequest);
    stopButton.addEventListener("click", submitRequest);
    userInput.focus();

    try {
        let modelId = config.model.id;
        if (!config.local && config.model.remote_id) {
            modelId = config.model.remote_id;
        }

        if (!config.local) {
            const domain = await getHuggingFaceDomain();
            // 1. Replace 'huggingface.co' with the detected domain (could be hf-mirror.com)
            config.model.remote_path = config.model.remote_path.replace("huggingface.co", domain);

            // 2. Update transformers.js env so AutoTokenizer uses the mirror
            env.remoteHost = `https://${domain}/`;
        }

        tokenizer = await AutoTokenizer.from_pretrained(modelId);
        await llm.load(config.model, {
            provider: config.provider,
            deviceType: config.deviceType,
            profiler: config.profiler,
            verbose: config.verbose,
            local: config.local,
            enable_causallm: config.enable_causallm,
        });
        sendButton.disabled = false;
        ready = true;
        log("Ready to type your message ...");
    } catch (error) {
        logError(`[Error] ${error}`);
    }
};

const ui = async () => {
    if (!getQueryValue("provider") && !getQueryValue("devicetype")) {
        location.href = `./?provider=${provider}&devicetype=${deviceType}&model=phi4mini`;
        return;
    }

    const currentUrl = window.location.href;

    let model = getQueryValue("model");
    if (model && $(`#${model}`)) {
        $(`#${model}`).setAttribute("class", "button active");
    }

    modelSelectors = document.querySelectorAll(".models button");
    for (const selector of modelSelectors) {
        selector.addEventListener("click", async function () {
            await llm.dispose();
            location.href = updateQueryStringParameter(currentUrl, "model", this.id);
        });
    }

    device = $("#device");
    badge = $("#badge");
    sendButton = $("#send-button");
    stopButton = $("#stop-button");
    buttons = $("#buttons");
    performanceIndicator = $("#performance-indicator");
    scrollWrapper = $("#scroll-wrapper");
    userInput = $("#user-input");
    chatHistory = $("#chat-history");

    let status = $("#webnnstatus");
    let info = $("#info");
    sendButton.disabled = true;

    document.querySelector("#model").innerHTML = config.model.name;

    if (getQueryValue("devicetype")) {
        deviceType = getQueryValue("devicetype").toLowerCase();
        config.deviceType = deviceType;
    }

    if (getQueryValue("provider")) {
        provider = getQueryValue("provider")?.toLowerCase();
    }

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

    let webnnStatus = await getWebnnStatus();

    if (provider === "wasm") {
        status.innerHTML = "";
        title.innerHTML = "WebAssembly";
        await main();
    } else if (provider === "webgpu") {
        status.innerHTML = "";
        title.innerHTML = "WebGPU";
        await main();
    } else {
        if (webnnStatus.webnn) {
            status.setAttribute("class", "green");
            info.innerHTML = `WebNN supported`;
            const gpuUrl = updateQueryStringParameter(currentUrl, "devicetype", "gpu");
            const npuUrl = updateQueryStringParameter(currentUrl, "devicetype", "npu");
            info.innerHTML = `WebNN supported · <a href="${gpuUrl}">GPU</a> · <a href="${npuUrl}">NPU</a>`;
            if (deviceType.toLowerCase() === "npu") {
                try {
                    await navigator.ml.createContext({ deviceType: "npu" });
                    await main();
                } catch (error) {
                    status.setAttribute("class", "red");
                    info.innerHTML = `
            ${error}<br>
            Your device probably doesn't have an AI processor (NPU) or the NPU driver is not successfully installed.`;
                    logError(`[Error] ${error}`);
                    logError(
                        `[Error] Your device probably doesn't have an AI processor (NPU) or the NPU driver is not successfully installed`,
                    );
                    log(`<a href="${gpuUrl}">Switch to WebNN GPU</a>`);
                }
            } else {
                await main();
            }
        } else {
            if (webnnStatus.error) {
                status.setAttribute("class", "red");
                info.innerHTML = `WebNN not supported: ${webnnStatus.error} <a id="webnn_na" href="../../install.html" title="WebNN Installation Guide">Set up WebNN</a>`;
                logError(`[Error] ${webnnStatus.error}`);
                log(`<a href="../../install.html" title="WebNN Installation Guide">WebNN Installation Guide</a>`);
            } else {
                status.setAttribute("class", "red");
                info.innerHTML = "WebNN not supported";
                logError("[Error] WebNN not supported");
            }
        }
    }

    function togglePlaceholder() {
        userInput.classList.toggle("empty", userInput.textContent.trim() === "");
    }

    userInput.addEventListener("input", togglePlaceholder);
    userInput.addEventListener("focus", togglePlaceholder);
    userInput.addEventListener("blur", togglePlaceholder);

    // Initial check
    togglePlaceholder();
};

document.addEventListener("DOMContentLoaded", ui, false);

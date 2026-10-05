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
import { env, AutoTokenizer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.2";
import { LLM } from "./llm.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const MODELS = {
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
        system_content:
            "You are a helpful AI assistant. When the user asks how many words are in some text, never count them yourself: " +
            'reply with only <|tool_call|>{"name":"get_word_count","arguments":{"text":"..."}}<|/tool_call|>. ' +
            "For any other question, answer directly without calling a tool.",
    },
};

// ============================================================================
// Phase 0 tool-calling POC — one trivial, deterministic, local tool
// ============================================================================
const TOOLS = {
    get_word_count: {
        schema: {
            type: "function",
            function: {
                name: "get_word_count",
                description: "Counts the number of whitespace-separated words in a piece of text.",
                parameters: {
                    type: "object",
                    properties: { text: { type: "string", description: "The text to count words in." } },
                    required: ["text"],
                },
            },
        },
        run: args => ({ word_count: args.text.trim().split(/\s+/).filter(Boolean).length }),
    },
};

// Phi-4's chat_template has no branch to render a tool-result turn, so the continuation is built
// by hand instead of going through apply_chat_template a second time.
const TOOL_CALL_PATTERN = /<\|tool_call\|>([\s\S]*?)<\|\/tool_call\|>/;

function extractToolCall(text) {
    const match = text.match(TOOL_CALL_PATTERN);
    // Unmarked output only counts as a call when the whole reply (minus special tokens) is JSON.
    const payload = match ? match[1].trim() : text.replace(/<\|[^|]*\|>/g, "").trim();
    if (!payload.startsWith("[") && !payload.startsWith("{")) return null;
    const candidates = [payload];

    for (const candidateText of candidates) {
        try {
            const parsed = JSON.parse(candidateText);
            const calls = Array.isArray(parsed) ? parsed : [parsed];
            for (const candidate of calls) {
                const name = candidate?.name ?? candidate?.function?.name;
                let args = candidate?.arguments ?? candidate?.function?.arguments;
                if (typeof args === "string") args = JSON.parse(args);
                if (typeof name === "string" && args && typeof args === "object") {
                    return {
                        name,
                        arguments: args,
                        matchEnd: match ? match.index + match[0].length : text.length,
                        marked: Boolean(match),
                    };
                }
            }
        } catch {
            continue;
        }
    }
    return null;
}

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
        responseDiv.innerHTML = marked.parse(word);
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
    var config = {
        model: "phi4mini",
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

// Phase 0 POC: no .onnx weights are checked in locally, so always fetch from Hugging Face
// (the browser's OPFS cache still avoids re-downloading on reload).
config.local = 0;

// Setup for transformers.js tokenizer
env.localModelPath = "models";
env.allowRemoteModels = config.local == 0;
env.allowLocalModels = config.local == 1;

let tokenizer;

const llm = new LLM(config.max_length);
let messages = [];

if (config.model.system_content) {
    messages.push({
        role: "system",
        content: config.model.system_content,
        tools: JSON.stringify(Object.values(TOOLS).map(t => t.schema)),
    });
    // Fixed example so the call format stays in context after plain Q&A turns accumulate.
    messages.push(
        { role: "user", content: "How many words are in this sentence: Hello there my friend" },
        {
            role: "assistant",
            content:
                '<|tool_call|>{"name":"get_word_count","arguments":{"text":"Hello there my friend"}}<|/tool_call|>',
        },
    );
}
const SEED_MESSAGE_COUNT = messages.length;

function tokenToText(tokenizer, tokens) {
    const text = tokenizer.decode(tokens, { skip_special_tokens: config.show_special != 1 });
    return text;
}

async function Query(continuation, query, cb) {
    performanceIndicator.innerHTML = "";
    logUser(`Prompt: ${query}`);
    let userChatTemplate = { role: "user", content: query };
    messages.push(userChatTemplate);

    if (config.provider == "webgpu") {
        messages = [userChatTemplate];
    }

    let inputIds = tokenizer.apply_chat_template(messages, {
        add_generation_prompt: true,
        tokenize: true,
        return_tensor: false,
    });

    // Clean up
    if (
        llm.outputTokens.length == 0 ||
        !continuation ||
        cleanCache ||
        inputIds.length >= llm.maxLength ||
        llm.startLength >= llm.maxLength
    ) {
        // Initialize kv cache
        await llm.initialize();
        llm.startLength = 0;
        cleanCache = true;
        if (inputIds.length > llm.maxLength) {
            console.log(`Context length exceeds max new tokens, clean up...`);
        }
        // Clean up messages if there is a cache
        if (messages.length > SEED_MESSAGE_COUNT + 1) {
            messages = messages.slice(0, SEED_MESSAGE_COUNT);
            messages.push(userChatTemplate);
            inputIds = tokenizer.apply_chat_template(messages, {
                add_generation_prompt: true,
                tokenize: true,
                return_tensor: false,
            });
        }
    }
    console.log("messages: ", messages);
    // Convert inputIds to BigInt
    inputIds = inputIds.map(num => BigInt(num));
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

    const outputContent = tokenizer.decode(outputTokens, {
        skip_special_tokens: config.show_special != 1,
    });

    // Detection must run on a decode that keeps special tokens: <|tool_call|> is marked
    // non-special in the tokenizer, but keep this explicit instead of relying on that.
    const rawOutputContent = tokenizer.decode(outputTokens, { skip_special_tokens: false });
    const toolCall = extractToolCall(rawOutputContent);

    let finalTokens = [];
    let toolRoundTrip = null;
    if (toolCall && TOOLS[toolCall.name]) {
        const toolStartTime = performance.now();
        const assistantToolCall = rawOutputContent.includes("<|tool_call|>")
            ? rawOutputContent.slice(0, toolCall.matchEnd)
            : `<|tool_call|>${rawOutputContent.trim()}<|/tool_call|>`;
        logUser(`Tool call detected: ${toolCall.name}(${JSON.stringify(toolCall.arguments)})`);
        const result = TOOLS[toolCall.name].run(toolCall.arguments);
        logUser(`Tool result: ${JSON.stringify(result)}`);
        messages.push({ role: "assistant", content: assistantToolCall });

        const toolResponse = `<|tool_response|>${JSON.stringify(result)}<|end|><|assistant|>`;
        const terminalToken = outputTokens.at(-1);
        if (config.provider === "webnn" && llm.eos.includes(terminalToken)) {
            const missingToolCallEnd = toolCall.marked ? "" : "<|/tool_call|>";
            const continuationText = missingToolCallEnd + toolResponse;
            const continuationTokens = tokenizer.encode(continuationText, { add_special_tokens: false });
            const toolInputIds = [BigInt(terminalToken), ...continuationTokens.map(BigInt)];
            logUser(`Continuing from KV cache with ${toolInputIds.length} tool-response tokens`);
            finalTokens = await llm.generateFromCache(toolInputIds, tokens => cb(tokenToText(tokenizer, tokens)));
        } else {
            const promptText = tokenizer.decode(inputIds.map(Number), { skip_special_tokens: false });
            const continuationText = promptText + assistantToolCall + toolResponse;
            const toolInputIds = tokenizer.encode(continuationText).map(num => BigInt(num));
            await llm.initialize();
            llm.startLength = 0;
            finalTokens = await llm.generate(toolInputIds, tokens => cb(tokenToText(tokenizer, tokens)));
        }
        toolRoundTrip = (performance.now() - toolStartTime) / 1000;
        const finalContent = tokenizer.decode(finalTokens, { skip_special_tokens: config.show_special != 1 });
        messages.push({ role: "assistant", content: finalContent });
        cleanCache = true; // next user turn must also start from a fresh cache
    } else {
        if (rawOutputContent.includes("<|tool_call|>")) {
            logError("Malformed tool call: the model started a tool call that could not be parsed");
        }
        messages.push({ role: "assistant", content: outputContent });
        cleanCache = false;
    }

    const took = (performance.now() - startTimer) / 1000;
    const timeToNewTokens = took - timeToFirstToken;
    const totalOutputTokens = outputTokens.length + finalTokens.length;
    const tokensPerSecond = (totalOutputTokens - 1) / timeToNewTokens;
    log(`${totalOutputTokens} generated tokens in ${took.toFixed(2)} sec<br/>
    Time to first token: ${timeToFirstToken.toFixed(2)} sec<br/>
    Effective throughput: ${tokensPerSecond.toFixed(2)} tokens/sec${
        toolRoundTrip === null ? "" : `<br/>Tool round-trip: ${toolRoundTrip.toFixed(2)} sec`
    }`);

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
    tokensPerSecondPerformance.innerHTML = `${tokensPerSecond.toFixed(2)}`;
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

const main = async () => {
    await setupORT("text-generation", "dev");
    showCompatibleChromiumVersion("text-generation");

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;
    ort.env.wasm.proxy = false;
    ort.env.logLevel = "warning";

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
    if (model) {
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

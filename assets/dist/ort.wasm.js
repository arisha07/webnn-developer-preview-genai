/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var ort = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // common/dist/esm/backend-impl.js
  var backends, backendsSortedByPriority, registerBackend, tryResolveAndInitializeBackend, resolveBackendAndExecutionProviders;
  var init_backend_impl = __esm({
    "common/dist/esm/backend-impl.js"() {
      "use strict";
      backends = /* @__PURE__ */ new Map();
      backendsSortedByPriority = [];
      registerBackend = (name, backend, priority) => {
        if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
          const currentBackend = backends.get(name);
          if (currentBackend === void 0) {
            backends.set(name, { backend, priority });
          } else if (currentBackend.priority > priority) {
            return;
          } else if (currentBackend.priority === priority) {
            if (currentBackend.backend !== backend) {
              throw new Error(`cannot register backend "${name}" using priority ${priority}`);
            }
          }
          if (priority >= 0) {
            const i = backendsSortedByPriority.indexOf(name);
            if (i !== -1) {
              backendsSortedByPriority.splice(i, 1);
            }
            for (let i2 = 0; i2 < backendsSortedByPriority.length; i2++) {
              if (backends.get(backendsSortedByPriority[i2]).priority <= priority) {
                backendsSortedByPriority.splice(i2, 0, name);
                return;
              }
            }
            backendsSortedByPriority.push(name);
          }
          return;
        }
        throw new TypeError("not a valid backend");
      };
      tryResolveAndInitializeBackend = async (backendName) => {
        const backendInfo = backends.get(backendName);
        if (!backendInfo) {
          return "backend not found.";
        }
        if (backendInfo.initialized) {
          return backendInfo.backend;
        } else if (backendInfo.aborted) {
          return backendInfo.error;
        } else {
          const isInitializing = !!backendInfo.initPromise;
          try {
            if (!isInitializing) {
              backendInfo.initPromise = backendInfo.backend.init(backendName);
            }
            await backendInfo.initPromise;
            backendInfo.initialized = true;
            return backendInfo.backend;
          } catch (e) {
            if (!isInitializing) {
              backendInfo.error = `${e}`;
              backendInfo.aborted = true;
            }
            return backendInfo.error;
          } finally {
            delete backendInfo.initPromise;
          }
        }
      };
      resolveBackendAndExecutionProviders = async (options) => {
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
        let backend;
        const errors = [];
        const availableBackendNames = /* @__PURE__ */ new Set();
        for (const backendName of backendNames) {
          const resolveResult = await tryResolveAndInitializeBackend(backendName);
          if (typeof resolveResult === "string") {
            errors.push({ name: backendName, err: resolveResult });
          } else {
            if (!backend) {
              backend = resolveResult;
            }
            if (backend === resolveResult) {
              availableBackendNames.add(backendName);
            }
          }
        }
        if (!backend) {
          throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
        }
        for (const { name, err } of errors) {
          if (backendHints.includes(name)) {
            console.warn(`removing requested execution provider "${name}" from session options because it is not available: ${err}`);
          }
        }
        const filteredEps = eps.filter((i) => availableBackendNames.has(typeof i === "string" ? i : i.name));
        return [
          backend,
          new Proxy(options, {
            get: (target, prop) => {
              if (prop === "executionProviders") {
                return filteredEps;
              }
              return Reflect.get(target, prop);
            }
          })
        ];
      };
    }
  });

  // common/dist/esm/backend.js
  var init_backend = __esm({
    "common/dist/esm/backend.js"() {
      "use strict";
      init_backend_impl();
    }
  });

  // common/dist/esm/version.js
  var version;
  var init_version = __esm({
    "common/dist/esm/version.js"() {
      "use strict";
      version = "1.26.0";
    }
  });

  // common/dist/esm/env-impl.js
  var logLevelValue, env;
  var init_env_impl = __esm({
    "common/dist/esm/env-impl.js"() {
      "use strict";
      init_version();
      logLevelValue = "warning";
      env = {
        wasm: {},
        webgl: {},
        webgpu: {},
        versions: { common: version },
        set logLevel(value) {
          if (value === void 0) {
            return;
          }
          if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
            throw new Error(`Unsupported logging level: ${value}`);
          }
          logLevelValue = value;
        },
        get logLevel() {
          return logLevelValue;
        }
      };
      Object.defineProperty(env, "logLevel", { enumerable: true });
    }
  });

  // common/dist/esm/env.js
  var env2;
  var init_env = __esm({
    "common/dist/esm/env.js"() {
      "use strict";
      init_env_impl();
      env2 = env;
    }
  });

  // common/dist/esm/tensor-conversion-impl.js
  var tensorToDataURL, tensorToImageData;
  var init_tensor_conversion_impl = __esm({
    "common/dist/esm/tensor-conversion-impl.js"() {
      "use strict";
      tensorToDataURL = (tensor, options) => {
        const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
        canvas.width = tensor.dims[3];
        canvas.height = tensor.dims[2];
        const pixels2DContext = canvas.getContext("2d");
        if (pixels2DContext != null) {
          let width;
          let height;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
          }
          const inputformat = options?.format !== void 0 ? options.format : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
              const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
              const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
              const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
              pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
              pixels2DContext.fillRect(j, i, 1, 1);
            }
          }
          if ("toDataURL" in canvas) {
            return canvas.toDataURL();
          } else {
            throw new Error("toDataURL is not supported");
          }
        } else {
          throw new Error("Can not access image data");
        }
      };
      tensorToImageData = (tensor, options) => {
        const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
        let image;
        if (pixels2DContext != null) {
          let width;
          let height;
          let channels;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[1];
            channels = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
            channels = tensor.dims[1];
          }
          const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          if (options !== void 0) {
            if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
              throw new Error("Tensor format doesn't match input tensor dims");
            }
          }
          const step = 4;
          let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          image = pixels2DContext.createImageData(width, height);
          for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
            image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
          }
        } else {
          throw new Error("Can not access image data");
        }
        return image;
      };
    }
  });

  // common/dist/esm/tensor-factory-impl.js
  var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromMLTensor, tensorFromPinnedBuffer;
  var init_tensor_factory_impl = __esm({
    "common/dist/esm/tensor-factory-impl.js"() {
      "use strict";
      init_tensor_impl();
      bufferToTensor = (buffer, options) => {
        if (buffer === void 0) {
          throw new Error("Image buffer must be defined");
        }
        if (options.height === void 0 || options.width === void 0) {
          throw new Error("Image height and width must be defined");
        }
        if (options.tensorLayout === "NHWC") {
          throw new Error("NHWC Tensor layout is not supported yet");
        }
        const { height, width } = options;
        const norm = options.norm ?? { mean: 255, bias: 0 };
        let normMean;
        let normBias;
        if (typeof norm.mean === "number") {
          normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
        } else {
          normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
        }
        if (typeof norm.bias === "number") {
          normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
        } else {
          normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
        }
        const inputformat = options.format !== void 0 ? options.format : "RGBA";
        const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
        const stride = height * width;
        const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
        let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGB") {
          step = 3;
          rImagePointer = 0;
          gImagePointer = 1;
          bImagePointer = 2;
          aImagePointer = -1;
        }
        if (outputformat === "RGBA") {
          aTensorPointer = stride * 3;
        } else if (outputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        } else if (outputformat === "BGR") {
          bTensorPointer = 0;
          gTensorPointer = stride;
          rTensorPointer = stride * 2;
        }
        for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
          float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
          float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
          float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
          if (aTensorPointer !== -1 && aImagePointer !== -1) {
            float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
          }
        }
        const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
        return outputTensor;
      };
      tensorFromImage = async (image, options) => {
        const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
        const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
        const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
        const isString = typeof image === "string";
        let data;
        let bufferToTensorOptions = options ?? {};
        const createCanvas = () => {
          if (typeof document !== "undefined") {
            return document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            return new OffscreenCanvas(1, 1);
          } else {
            throw new Error("Canvas is not supported");
          }
        };
        const createCanvasContext = (canvas) => {
          if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
            return canvas.getContext("2d");
          } else if (canvas instanceof OffscreenCanvas) {
            return canvas.getContext("2d");
          } else {
            return null;
          }
        };
        if (isHTMLImageEle) {
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            let height = image.height;
            let width = image.width;
            if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
              height = options.resizedHeight;
              width = options.resizedWidth;
            }
            if (options !== void 0) {
              bufferToTensorOptions = options;
              if (options.tensorFormat !== void 0) {
                throw new Error("Image input config format must be RGBA for HTMLImageElement");
              } else {
                bufferToTensorOptions.tensorFormat = "RGBA";
              }
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            }
            pixels2DContext.drawImage(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isImageDataEle) {
          let height;
          let width;
          if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          } else {
            height = image.height;
            width = image.width;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
          }
          bufferToTensorOptions.format = "RGBA";
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          if (options !== void 0) {
            const tempCanvas = createCanvas();
            tempCanvas.width = width;
            tempCanvas.height = height;
            const pixels2DContext = createCanvasContext(tempCanvas);
            if (pixels2DContext != null) {
              pixels2DContext.putImageData(image, 0, 0);
              data = pixels2DContext.getImageData(0, 0, width, height).data;
            } else {
              throw new Error("Can not access image data");
            }
          } else {
            data = image.data;
          }
        } else if (isImageBitmap) {
          if (options === void 0) {
            throw new Error("Please provide image config with format for Imagebitmap");
          }
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            const height = image.height;
            const width = image.width;
            pixels2DContext.drawImage(image, 0, 0, width, height);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
            return bufferToTensor(data, bufferToTensorOptions);
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isString) {
          return new Promise((resolve, reject) => {
            const canvas = createCanvas();
            const context = createCanvasContext(canvas);
            if (!image || !context) {
              return reject();
            }
            const newImage = new Image();
            newImage.crossOrigin = "Anonymous";
            newImage.src = image;
            newImage.onload = () => {
              canvas.width = newImage.width;
              canvas.height = newImage.height;
              context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
              const img = context.getImageData(0, 0, canvas.width, canvas.height);
              bufferToTensorOptions.height = canvas.height;
              bufferToTensorOptions.width = canvas.width;
              resolve(bufferToTensor(img.data, bufferToTensorOptions));
            };
          });
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        if (data !== void 0) {
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
      };
      tensorFromTexture = (texture, options) => {
        const { width, height, download, dispose } = options;
        const dims = [1, height, width, 4];
        return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
      };
      tensorFromGpuBuffer = (gpuBuffer, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
      };
      tensorFromMLTensor = (mlTensor, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
      };
      tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
    }
  });

  // common/dist/esm/tensor-impl-type-mapping.js
  var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isTypedArrayChecked, checkTypedArray;
  var init_tensor_impl_type_mapping = __esm({
    "common/dist/esm/tensor-impl-type-mapping.js"() {
      "use strict";
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
        ["float32", Float32Array],
        ["uint8", Uint8Array],
        ["int8", Int8Array],
        ["uint16", Uint16Array],
        ["int16", Int16Array],
        ["int32", Int32Array],
        ["bool", Uint8Array],
        ["float64", Float64Array],
        ["uint32", Uint32Array],
        ["int4", Uint8Array],
        ["uint4", Uint8Array]
      ]);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
        [Float32Array, "float32"],
        [Uint8Array, "uint8"],
        [Int8Array, "int8"],
        [Uint16Array, "uint16"],
        [Int16Array, "int16"],
        [Int32Array, "int32"],
        [Float64Array, "float64"],
        [Uint32Array, "uint32"]
      ]);
      isTypedArrayChecked = false;
      checkTypedArray = () => {
        if (!isTypedArrayChecked) {
          isTypedArrayChecked = true;
          const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
          const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
          const Float16Array2 = globalThis.Float16Array;
          const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
          if (isBigInt64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
          }
          if (isBigUint64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
          }
          if (isFloat16ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
          } else {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
          }
        }
      };
    }
  });

  // common/dist/esm/tensor-utils-impl.js
  var calculateSize, tensorReshape;
  var init_tensor_utils_impl = __esm({
    "common/dist/esm/tensor-utils-impl.js"() {
      "use strict";
      init_tensor_impl();
      calculateSize = (dims) => {
        let size = 1;
        for (let i = 0; i < dims.length; i++) {
          const dim = dims[i];
          if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
            throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
          }
          if (dim < 0) {
            throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
          }
          size *= dim;
        }
        return size;
      };
      tensorReshape = (tensor, dims) => {
        switch (tensor.location) {
          case "cpu":
            return new Tensor(tensor.type, tensor.data, dims);
          case "cpu-pinned":
            return new Tensor({
              location: "cpu-pinned",
              data: tensor.data,
              type: tensor.type,
              dims
            });
          case "texture":
            return new Tensor({
              location: "texture",
              texture: tensor.texture,
              type: tensor.type,
              dims
            });
          case "gpu-buffer":
            return new Tensor({
              location: "gpu-buffer",
              gpuBuffer: tensor.gpuBuffer,
              type: tensor.type,
              dims
            });
          case "ml-tensor":
            return new Tensor({
              location: "ml-tensor",
              mlTensor: tensor.mlTensor,
              type: tensor.type,
              dims
            });
          default:
            throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
        }
      };
    }
  });

  // common/dist/esm/tensor-impl.js
  var Tensor;
  var init_tensor_impl = __esm({
    "common/dist/esm/tensor-impl.js"() {
      "use strict";
      init_tensor_conversion_impl();
      init_tensor_factory_impl();
      init_tensor_impl_type_mapping();
      init_tensor_utils_impl();
      Tensor = class {
        /**
         * implementation.
         */
        constructor(arg0, arg1, arg2) {
          checkTypedArray();
          let type;
          let dims;
          if (typeof arg0 === "object" && "location" in arg0) {
            this.dataLocation = arg0.location;
            type = arg0.type;
            dims = arg0.dims;
            switch (arg0.location) {
              case "cpu-pinned": {
                const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
                if (!expectedTypedArrayConstructor) {
                  throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
                }
                if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                  throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
                }
                this.cpuData = arg0.data;
                break;
              }
              case "texture": {
                if (type !== "float32") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
                }
                this.gpuTextureData = arg0.texture;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "gpu-buffer": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
                }
                this.gpuBufferData = arg0.gpuBuffer;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "ml-tensor": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
                }
                this.mlTensorData = arg0.mlTensor;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              default:
                throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
            }
          } else {
            let data;
            let maybeDims;
            if (typeof arg0 === "string") {
              type = arg0;
              maybeDims = arg2;
              if (arg0 === "string") {
                if (!Array.isArray(arg1)) {
                  throw new TypeError("A string tensor's data must be a string array.");
                }
                data = arg1;
              } else {
                const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
                if (typedArrayConstructor === void 0) {
                  throw new TypeError(`Unsupported tensor type: ${arg0}.`);
                }
                if (Array.isArray(arg1)) {
                  if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                    throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
                  } else if (arg0 === "uint64" || arg0 === "int64") {
                    data = typedArrayConstructor.from(arg1, BigInt);
                  } else {
                    data = typedArrayConstructor.from(arg1);
                  }
                } else if (arg1 instanceof typedArrayConstructor) {
                  data = arg1;
                } else if (arg1 instanceof Uint8ClampedArray) {
                  if (arg0 === "uint8") {
                    data = Uint8Array.from(arg1);
                  } else {
                    throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
                  }
                } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
                  data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
                } else {
                  throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
                }
              }
            } else {
              maybeDims = arg1;
              if (Array.isArray(arg0)) {
                if (arg0.length === 0) {
                  throw new TypeError("Tensor type cannot be inferred from an empty array.");
                }
                const firstElementType = typeof arg0[0];
                if (firstElementType === "string") {
                  type = "string";
                  data = arg0;
                } else if (firstElementType === "boolean") {
                  type = "bool";
                  data = Uint8Array.from(arg0);
                } else {
                  throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
                }
              } else if (arg0 instanceof Uint8ClampedArray) {
                type = "uint8";
                data = Uint8Array.from(arg0);
              } else {
                const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
                if (mappedType === void 0) {
                  throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
                }
                type = mappedType;
                data = arg0;
              }
            }
            if (maybeDims === void 0) {
              maybeDims = [data.length];
            } else if (!Array.isArray(maybeDims)) {
              throw new TypeError("A tensor's dims must be a number array");
            }
            dims = maybeDims;
            this.cpuData = data;
            this.dataLocation = "cpu";
          }
          const size = calculateSize(dims);
          if (this.cpuData && size !== this.cpuData.length) {
            if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
            } else {
              throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
            }
          }
          this.type = type;
          this.dims = dims;
          this.size = size;
        }
        // #endregion
        // #region factory
        static async fromImage(image, options) {
          return tensorFromImage(image, options);
        }
        static fromTexture(texture, options) {
          return tensorFromTexture(texture, options);
        }
        static fromGpuBuffer(gpuBuffer, options) {
          return tensorFromGpuBuffer(gpuBuffer, options);
        }
        static fromMLTensor(mlTensor, options) {
          return tensorFromMLTensor(mlTensor, options);
        }
        static fromPinnedBuffer(type, buffer, dims) {
          return tensorFromPinnedBuffer(type, buffer, dims);
        }
        // #endregion
        // #region conversions
        toDataURL(options) {
          return tensorToDataURL(this, options);
        }
        toImageData(options) {
          return tensorToImageData(this, options);
        }
        // #endregion
        // #region properties
        get data() {
          this.ensureValid();
          if (!this.cpuData) {
            throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
          }
          return this.cpuData;
        }
        get location() {
          return this.dataLocation;
        }
        get texture() {
          this.ensureValid();
          if (!this.gpuTextureData) {
            throw new Error("The data is not stored as a WebGL texture.");
          }
          return this.gpuTextureData;
        }
        get gpuBuffer() {
          this.ensureValid();
          if (!this.gpuBufferData) {
            throw new Error("The data is not stored as a WebGPU buffer.");
          }
          return this.gpuBufferData;
        }
        get mlTensor() {
          this.ensureValid();
          if (!this.mlTensorData) {
            throw new Error("The data is not stored as a WebNN MLTensor.");
          }
          return this.mlTensorData;
        }
        // #endregion
        // #region methods
        async getData(releaseData) {
          this.ensureValid();
          switch (this.dataLocation) {
            case "cpu":
            case "cpu-pinned":
              return this.data;
            case "texture":
            case "gpu-buffer":
            case "ml-tensor": {
              if (!this.downloader) {
                throw new Error("The current tensor is not created with a specified data downloader.");
              }
              if (this.isDownloading) {
                throw new Error("The current tensor is being downloaded.");
              }
              try {
                this.isDownloading = true;
                const data = await this.downloader();
                this.downloader = void 0;
                this.dataLocation = "cpu";
                this.cpuData = data;
                if (releaseData && this.disposer) {
                  this.disposer();
                  this.disposer = void 0;
                }
                return data;
              } finally {
                this.isDownloading = false;
              }
            }
            default:
              throw new Error(`cannot get data from location: ${this.dataLocation}`);
          }
        }
        dispose() {
          if (this.isDownloading) {
            throw new Error("The current tensor is being downloaded.");
          }
          if (this.disposer) {
            this.disposer();
            this.disposer = void 0;
          }
          this.cpuData = void 0;
          this.gpuTextureData = void 0;
          this.gpuBufferData = void 0;
          this.mlTensorData = void 0;
          this.downloader = void 0;
          this.isDownloading = void 0;
          this.dataLocation = "none";
        }
        // #endregion
        // #region tensor utilities
        ensureValid() {
          if (this.dataLocation === "none") {
            throw new Error("The tensor is disposed.");
          }
        }
        reshape(dims) {
          this.ensureValid();
          if (this.downloader || this.disposer) {
            throw new Error("Cannot reshape a tensor that owns GPU resource.");
          }
          return tensorReshape(this, dims);
        }
      };
    }
  });

  // common/dist/esm/tensor.js
  var Tensor2;
  var init_tensor = __esm({
    "common/dist/esm/tensor.js"() {
      "use strict";
      init_tensor_impl();
      Tensor2 = Tensor;
    }
  });

  // common/dist/esm/trace.js
  var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TRACE_EVENT_BEGIN, TRACE_EVENT_END;
  var init_trace = __esm({
    "common/dist/esm/trace.js"() {
      "use strict";
      init_env_impl();
      TRACE = (deviceType, label) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeStamp(`${deviceType}::ORT::${label}`);
      };
      TRACE_FUNC = (msg, extraMsg) => {
        const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
        let hasTraceFunc = false;
        for (let i = 0; i < stack.length; i++) {
          if (hasTraceFunc && !stack[i].includes("TRACE_FUNC")) {
            let label = `FUNC_${msg}::${stack[i].trim().split(" ")[1]}`;
            if (extraMsg) {
              label += `::${extraMsg}`;
            }
            TRACE("CPU", label);
            return;
          }
          if (stack[i].includes("TRACE_FUNC")) {
            hasTraceFunc = true;
          }
        }
      };
      TRACE_FUNC_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("BEGIN", extraMsg);
      };
      TRACE_FUNC_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("END", extraMsg);
      };
      TRACE_EVENT_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.time(`ORT::${extraMsg}`);
      };
      TRACE_EVENT_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeEnd(`ORT::${extraMsg}`);
      };
    }
  });

  // common/dist/esm/inference-session-impl.js
  var InferenceSession;
  var init_inference_session_impl = __esm({
    "common/dist/esm/inference-session-impl.js"() {
      "use strict";
      init_backend_impl();
      init_tensor();
      init_trace();
      InferenceSession = class _InferenceSession {
        constructor(handler) {
          this.handler = handler;
        }
        async run(feeds, arg1, arg2) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.run");
          const fetches = {};
          let options = {};
          if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
            throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
          }
          let isFetchesEmpty = true;
          if (typeof arg1 === "object") {
            if (arg1 === null) {
              throw new TypeError("Unexpected argument[1]: cannot be null.");
            }
            if (arg1 instanceof Tensor2) {
              throw new TypeError("'fetches' cannot be a Tensor");
            }
            if (Array.isArray(arg1)) {
              if (arg1.length === 0) {
                throw new TypeError("'fetches' cannot be an empty array.");
              }
              isFetchesEmpty = false;
              for (const name of arg1) {
                if (typeof name !== "string") {
                  throw new TypeError("'fetches' must be a string array or an object.");
                }
                if (this.outputNames.indexOf(name) === -1) {
                  throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
                }
                fetches[name] = null;
              }
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              let isFetches = false;
              const arg1Keys = Object.getOwnPropertyNames(arg1);
              for (const name of this.outputNames) {
                if (arg1Keys.indexOf(name) !== -1) {
                  const v = arg1[name];
                  if (v === null || v instanceof Tensor2) {
                    isFetches = true;
                    isFetchesEmpty = false;
                    fetches[name] = v;
                  }
                }
              }
              if (isFetches) {
                if (typeof arg2 === "object" && arg2 !== null) {
                  options = arg2;
                } else if (typeof arg2 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else {
                options = arg1;
              }
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
          }
          for (const name of this.inputNames) {
            if (typeof feeds[name] === "undefined") {
              throw new Error(`input '${name}' is missing in 'feeds'.`);
            }
          }
          if (isFetchesEmpty) {
            for (const name of this.outputNames) {
              fetches[name] = null;
            }
          }
          const results = await this.handler.run(feeds, fetches, options);
          const returnValue = {};
          for (const key in results) {
            if (Object.hasOwnProperty.call(results, key)) {
              const result = results[key];
              if (result instanceof Tensor2) {
                returnValue[key] = result;
              } else {
                returnValue[key] = new Tensor2(result.type, result.data, result.dims);
              }
            }
          }
          TRACE_EVENT_END("InferenceSession.run");
          TRACE_FUNC_END();
          return returnValue;
        }
        async release() {
          return this.handler.dispose();
        }
        static async create(arg0, arg1, arg2, arg3) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.create");
          let filePathOrUint8Array;
          let options = {};
          if (typeof arg0 === "string") {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof Uint8Array) {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
            const buffer = arg0;
            let byteOffset = 0;
            let byteLength = arg0.byteLength;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 === "number") {
              byteOffset = arg1;
              if (!Number.isSafeInteger(byteOffset)) {
                throw new RangeError("'byteOffset' must be an integer.");
              }
              if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
                throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
              }
              byteLength = arg0.byteLength - byteOffset;
              if (typeof arg2 === "number") {
                byteLength = arg2;
                if (!Number.isSafeInteger(byteLength)) {
                  throw new RangeError("'byteLength' must be an integer.");
                }
                if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                  throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
                }
                if (typeof arg3 === "object" && arg3 !== null) {
                  options = arg3;
                } else if (typeof arg3 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'byteLength' must be a number.");
              }
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
            filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
          } else {
            throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
          }
          const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
          const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, optionsWithValidatedEPs);
          TRACE_EVENT_END("InferenceSession.create");
          TRACE_FUNC_END();
          return new _InferenceSession(handler);
        }
        startProfiling() {
          this.handler.startProfiling();
        }
        endProfiling() {
          this.handler.endProfiling();
        }
        get inputNames() {
          return this.handler.inputNames;
        }
        get outputNames() {
          return this.handler.outputNames;
        }
        get inputMetadata() {
          return this.handler.inputMetadata;
        }
        get outputMetadata() {
          return this.handler.outputMetadata;
        }
      };
    }
  });

  // common/dist/esm/inference-session.js
  var InferenceSession2;
  var init_inference_session = __esm({
    "common/dist/esm/inference-session.js"() {
      "use strict";
      init_inference_session_impl();
      InferenceSession2 = InferenceSession;
    }
  });

  // common/dist/esm/tensor-conversion.js
  var init_tensor_conversion = __esm({
    "common/dist/esm/tensor-conversion.js"() {
      "use strict";
    }
  });

  // common/dist/esm/tensor-factory.js
  var init_tensor_factory = __esm({
    "common/dist/esm/tensor-factory.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-model.js
  var init_onnx_model = __esm({
    "common/dist/esm/onnx-model.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-value.js
  var init_onnx_value = __esm({
    "common/dist/esm/onnx-value.js"() {
      "use strict";
    }
  });

  // common/dist/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  var init_esm = __esm({
    "common/dist/esm/index.js"() {
      "use strict";
      init_backend();
      init_env();
      init_inference_session();
      init_tensor();
      init_tensor_conversion();
      init_tensor_factory();
      init_trace();
      init_onnx_model();
      init_onnx_value();
    }
  });

  // web/lib/wasm/wasm-utils-env.ts
  var isNode;
  var init_wasm_utils_env = __esm({
    "web/lib/wasm/wasm-utils-env.ts"() {
      "use strict";
      isNode = false;
    }
  });

  // web/lib/wasm/proxy-worker/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  var WORKER_NAME, isProxyWorker, main_default;
  var init_main = __esm({
    "web/lib/wasm/proxy-worker/main.ts"() {
      "use strict";
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      WORKER_NAME = "ort-wasm-proxy-worker";
      isProxyWorker = globalThis.self?.name === WORKER_NAME;
      if (isProxyWorker) {
        self.onmessage = (ev) => {
          const { type, in: message } = ev.data;
          try {
            switch (type) {
              case "init-wasm":
                initializeWebAssembly(message.wasm).then(
                  () => {
                    initRuntime(message).then(
                      () => {
                        postMessage({ type });
                      },
                      (err) => {
                        postMessage({ type, err });
                      }
                    );
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              case "init-ep": {
                const { epName, env: env3 } = message;
                initEp(env3, epName).then(
                  () => {
                    postMessage({ type });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "copy-from": {
                const { buffer } = message;
                const bufferData = copyFromExternalBuffer(buffer);
                postMessage({ type, out: bufferData });
                break;
              }
              case "create": {
                const { model, options } = message;
                createSession(model, options).then(
                  (sessionMetadata) => {
                    postMessage({ type, out: sessionMetadata });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "release":
                releaseSession(message);
                postMessage({ type });
                break;
              case "run": {
                const { sessionId, inputIndices, inputs, outputIndices, options } = message;
                run(sessionId, inputIndices, inputs, outputIndices, new Array(outputIndices.length).fill(null), options).then(
                  (outputs) => {
                    if (outputs.some((o) => o[3] !== "cpu")) {
                      postMessage({ type, err: "Proxy does not support non-cpu tensor location." });
                    } else {
                      postMessage(
                        { type, out: outputs },
                        extractTransferableBuffers([...inputs, ...outputs])
                      );
                    }
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "end-profiling":
                endProfiling(message);
                postMessage({ type });
                break;
              default:
            }
          } catch (err) {
            postMessage({ type, err });
          }
        };
      }
      main_default = isProxyWorker ? null : (urlOverride) => new Worker(urlOverride ?? scriptSrc, { type: false ? "module" : "classic", name: WORKER_NAME });
    }
  });

  // web/lib/wasm/wasm-utils-import.ts
  var origin, getScriptSrc, scriptSrc, inferWasmPathPrefixFromScriptSrc, isSameOrigin, normalizeUrl, fallbackUrl, preload, dynamicImportDefault, createProxyWorker, importProxyWorker, embeddedWasmModule, importWasmModule;
  var init_wasm_utils_import = __esm({
    "web/lib/wasm/wasm-utils-import.ts"() {
      "use strict";
      init_wasm_utils_env();
      origin = isNode || typeof location === "undefined" ? void 0 : location.origin;
      getScriptSrc = () => {
        if (isNode) {
          return void 0;
        }
        if (false) {
          if (isEsmImportMetaUrlHardcodedAsFileUri) {
            const URL2 = URL;
            return new URL(new URL2("ort.wasm.js", void 0).href, origin).href;
          }
          return void 0;
        }
        return typeof document !== "undefined" ? document.currentScript?.src : (
          // use `self.location.href` if available
          typeof self !== "undefined" ? self.location?.href : void 0
        );
      };
      scriptSrc = getScriptSrc();
      inferWasmPathPrefixFromScriptSrc = () => {
        if (scriptSrc && !scriptSrc.startsWith("blob:")) {
          return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
        }
        return void 0;
      };
      isSameOrigin = (filename, prefixOverride) => {
        try {
          const baseUrl = prefixOverride ?? scriptSrc;
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.origin === origin;
        } catch {
          return false;
        }
      };
      normalizeUrl = (filename, prefixOverride) => {
        const baseUrl = prefixOverride ?? scriptSrc;
        try {
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.href;
        } catch {
          return void 0;
        }
      };
      fallbackUrl = (filename, prefixOverride) => `${prefixOverride ?? "./"}${filename}`;
      preload = async (absoluteUrl) => {
        const response = await fetch(absoluteUrl, { credentials: "same-origin" });
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      };
      dynamicImportDefault = async (url) => (await import(
        /* webpackIgnore: true */
        /* @vite-ignore */
        url
      )).default;
      createProxyWorker = // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      false ? void 0 : (init_main(), __toCommonJS(main_exports)).default;
      importProxyWorker = async () => {
        if (!scriptSrc) {
          throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
        }
        if (isSameOrigin(scriptSrc)) {
          return [void 0, createProxyWorker()];
        }
        const url = await preload(scriptSrc);
        return [url, createProxyWorker(url)];
      };
      embeddedWasmModule = false ? (
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        (false ? null : false ? null : false ? null : null).default
      ) : void 0;
      importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded, isWasmOverridden) => {
        let useEmbeddedModule = embeddedWasmModule && !(urlOverride || prefixOverride);
        if (useEmbeddedModule) {
          if (!scriptSrc) {
            if (isWasmOverridden && !isMultiThreaded) {
              useEmbeddedModule = true;
            } else {
              throw new Error("cannot determine the script source URL.");
            }
          } else {
            useEmbeddedModule = isSameOrigin(scriptSrc) || isWasmOverridden && !isMultiThreaded;
          }
        }
        if (useEmbeddedModule) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : false ? "ort-wasm-simd-threaded.jspi.mjs" : false ? "ort-wasm-simd-threaded.asyncify.mjs" : "ort-wasm-simd-threaded.mjs";
          const wasmModuleUrl = urlOverride ?? normalizeUrl(wasmModuleFilename, prefixOverride);
          const needPreload = !isNode && isMultiThreaded && wasmModuleUrl && !isSameOrigin(wasmModuleUrl, prefixOverride);
          const url = needPreload ? await preload(wasmModuleUrl) : wasmModuleUrl ?? fallbackUrl(wasmModuleFilename, prefixOverride);
          return [needPreload ? url : void 0, await dynamicImportDefault(url)];
        }
      };
    }
  });

  // web/lib/wasm/wasm-factory.ts
  var wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, isRelaxedSimdSupported, initializeWebAssembly, getInstance;
  var init_wasm_factory = __esm({
    "web/lib/wasm/wasm-factory.ts"() {
      "use strict";
      init_wasm_utils_import();
      initialized = false;
      initializing = false;
      aborted = false;
      isMultiThreadSupported = () => {
        if (typeof SharedArrayBuffer === "undefined") {
          return false;
        }
        try {
          if (typeof MessageChannel !== "undefined") {
            new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
          }
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              5,
              4,
              1,
              3,
              1,
              1,
              10,
              11,
              1,
              9,
              0,
              65,
              0,
              254,
              16,
              2,
              0,
              26,
              11
            ])
          );
        } catch {
          return false;
        }
      };
      isSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              10,
              30,
              1,
              28,
              0,
              65,
              0,
              253,
              15,
              253,
              12,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              253,
              186,
              1,
              26,
              11
            ])
          );
        } catch {
          return false;
        }
      };
      isRelaxedSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              5,
              1,
              96,
              0,
              1,
              123,
              3,
              2,
              1,
              0,
              10,
              19,
              1,
              17,
              0,
              65,
              1,
              253,
              15,
              65,
              2,
              253,
              15,
              65,
              3,
              253,
              15,
              253,
              147,
              2,
              11
            ])
          );
        } catch {
          return false;
        }
      };
      initializeWebAssembly = async (flags) => {
        if (initialized) {
          return Promise.resolve();
        }
        if (initializing) {
          throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        }
        if (aborted) {
          throw new Error("previous call to 'initializeWebAssembly()' failed.");
        }
        initializing = true;
        const timeout = flags.initTimeout;
        let numThreads = flags.numThreads;
        if (flags.simd === false) {
        } else if (flags.simd === "relaxed") {
          if (!isRelaxedSimdSupported()) {
            throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
          }
        } else if (!isSimdSupported()) {
          throw new Error("WebAssembly SIMD is not supported in the current environment.");
        }
        if (false) {
          if (!("Suspending" in WebAssembly)) {
            throw new Error("WebAssembly JSPI is not supported in the current environment.");
          }
        }
        const multiThreadSupported = isMultiThreadSupported();
        if (numThreads > 1 && !multiThreadSupported) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            console.warn(
              "env.wasm.numThreads is set to " + numThreads + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."
            );
          }
          console.warn(
            "WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."
          );
          flags.numThreads = numThreads = 1;
        }
        const wasmPaths = flags.wasmPaths;
        const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
        const mjsPathOverrideFlag = wasmPaths?.mjs;
        const mjsPathOverride = mjsPathOverrideFlag?.href ?? mjsPathOverrideFlag;
        const wasmPathOverrideFlag = wasmPaths?.wasm;
        const wasmPathOverride = wasmPathOverrideFlag?.href ?? wasmPathOverrideFlag;
        const wasmBinaryOverride = flags.wasmBinary;
        const [objectUrl, ortWasmFactory] = await importWasmModule(
          mjsPathOverride,
          wasmPrefixOverride,
          numThreads > 1,
          !!wasmBinaryOverride || !!wasmPathOverride
        );
        let isTimeout = false;
        const tasks = [];
        if (timeout > 0) {
          tasks.push(
            new Promise((resolve) => {
              setTimeout(() => {
                isTimeout = true;
                resolve();
              }, timeout);
            })
          );
        }
        tasks.push(
          new Promise((resolve, reject) => {
            const config = {
              /**
               * The number of threads. WebAssembly will create (Module.numThreads - 1) workers. If it is 1, no worker will be
               * created.
               */
              numThreads
            };
            if (wasmBinaryOverride) {
              config.wasmBinary = wasmBinaryOverride;
              config.locateFile = (fileName) => fileName;
            } else if (wasmPathOverride || wasmPrefixOverride) {
              config.locateFile = (fileName) => wasmPathOverride ?? wasmPrefixOverride + fileName;
            } else if (mjsPathOverride && mjsPathOverride.indexOf("blob:") !== 0) {
              config.locateFile = (fileName) => new URL(fileName, mjsPathOverride).href;
            } else if (objectUrl) {
              const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
              if (inferredWasmPathPrefix) {
                config.locateFile = (fileName) => inferredWasmPathPrefix + fileName;
              }
            }
            ortWasmFactory(config).then(
              // wasm module initialized successfully
              (module) => {
                initializing = false;
                initialized = true;
                wasm = module;
                resolve();
                if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                }
              },
              // wasm module failed to initialize
              (what) => {
                initializing = false;
                aborted = true;
                reject(what);
              }
            );
          })
        );
        await Promise.race(tasks);
        if (isTimeout) {
          throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);
        }
      };
      getInstance = () => {
        if (initialized && wasm) {
          return wasm;
        }
        throw new Error("WebAssembly is not initialized yet.");
      };
    }
  });

  // web/lib/wasm/wasm-utils.ts
  var allocWasmString, iterateExtraOptions, checkLastError;
  var init_wasm_utils = __esm({
    "web/lib/wasm/wasm-utils.ts"() {
      "use strict";
      init_wasm_factory();
      allocWasmString = (data, allocs) => {
        const wasm2 = getInstance();
        const dataLength = wasm2.lengthBytesUTF8(data) + 1;
        const dataOffset = wasm2._malloc(dataLength);
        wasm2.stringToUTF8(data, dataOffset, dataLength);
        allocs.push(dataOffset);
        return dataOffset;
      };
      iterateExtraOptions = (options, prefix, seen, handler) => {
        if (typeof options == "object" && options !== null) {
          if (seen.has(options)) {
            throw new Error("Circular reference in options");
          } else {
            seen.add(options);
          }
        }
        Object.entries(options).forEach(([key, value]) => {
          const name = prefix ? prefix + key : key;
          if (typeof value === "object") {
            iterateExtraOptions(value, name + ".", seen, handler);
          } else if (typeof value === "string" || typeof value === "number") {
            handler(name, value.toString());
          } else if (typeof value === "boolean") {
            handler(name, value ? "1" : "0");
          } else {
            throw new Error(`Can't handle extra config type: ${typeof value}`);
          }
        });
      };
      checkLastError = (message) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const paramsOffset = wasm2.stackAlloc(2 * ptrSize);
          wasm2._OrtGetLastError(paramsOffset, paramsOffset + ptrSize);
          const errorCode = Number(wasm2.getValue(paramsOffset, ptrSize === 4 ? "i32" : "i64"));
          const errorMessagePointer = wasm2.getValue(paramsOffset + ptrSize, "*");
          const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";
          throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
    }
  });

  // web/lib/wasm/run-options.ts
  var setRunOptions;
  var init_run_options = __esm({
    "web/lib/wasm/run-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      setRunOptions = (options) => {
        const wasm2 = getInstance();
        let runOptionsHandle = 0;
        const allocs = [];
        const runOptions = options || {};
        try {
          if (options?.logSeverityLevel === void 0) {
            runOptions.logSeverityLevel = 2;
          } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${options.logSeverityLevel}`);
          }
          if (options?.logVerbosityLevel === void 0) {
            runOptions.logVerbosityLevel = 0;
          } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {
            throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
          }
          if (options?.terminate === void 0) {
            runOptions.terminate = false;
          }
          let tagDataOffset = 0;
          if (options?.tag !== void 0) {
            tagDataOffset = allocWasmString(options.tag, allocs);
          }
          runOptionsHandle = wasm2._OrtCreateRunOptions(
            runOptions.logSeverityLevel,
            runOptions.logVerbosityLevel,
            !!runOptions.terminate,
            tagDataOffset
          );
          if (runOptionsHandle === 0) {
            checkLastError("Can't create run options.");
          }
          if (options?.extra !== void 0) {
            iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              const keyDataOffset = allocWasmString(key, allocs);
              const valueDataOffset = allocWasmString(value, allocs);
              if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                checkLastError(`Can't set a run config entry: ${key} - ${value}.`);
              }
            });
          }
          return [runOptionsHandle, allocs];
        } catch (e) {
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/session-options.ts
  var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, appendSessionConfig, appendEpOption, serializeWebNNFreeDimensionBounds, setExecutionProviders, setSessionOptions;
  var init_session_options = __esm({
    "web/lib/wasm/session-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      getGraphOptimzationLevel = (graphOptimizationLevel) => {
        switch (graphOptimizationLevel) {
          case "disabled":
            return 0;
          case "basic":
            return 1;
          case "extended":
            return 2;
          case "layout":
            return 3;
          case "all":
            return 99;
          default:
            throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
        }
      };
      getExecutionMode = (executionMode) => {
        switch (executionMode) {
          case "sequential":
            return 0;
          case "parallel":
            return 1;
          default:
            throw new Error(`unsupported execution mode: ${executionMode}`);
        }
      };
      appendDefaultOptions = (options) => {
        if (!options.extra) {
          options.extra = {};
        }
        if (!options.extra.session) {
          options.extra.session = {};
        }
        const session = options.extra.session;
        if (!session.use_ort_model_bytes_directly) {
          session.use_ort_model_bytes_directly = "1";
        }
        if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {
          options.enableMemPattern = false;
        }
      };
      appendSessionConfig = (sessionOptionsHandle, key, value, allocs) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);
        if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
          checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
        }
      };
      appendEpOption = (epOptions, key, value, allocs) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);
        epOptions.push([keyDataOffset, valueDataOffset]);
      };
      serializeWebNNFreeDimensionBounds = (bounds) => {
        if (!bounds) {
          return "";
        }
        const serializedEntries = [];
        for (const [name, bound] of Object.entries(bounds)) {
          if (!name) {
            throw new Error("WebNN freeDimensionBounds dimension name must not be empty.");
          }
          if (name.includes(":") || name.includes(";")) {
            throw new Error(`WebNN freeDimensionBounds dimension name must not include ':' or ';': ${name}`);
          }
          const minSize = bound?.minSize ?? 1;
          const maxSize = bound?.maxSize;
          if (!Number.isInteger(minSize) || minSize < 1) {
            throw new Error(`WebNN freeDimensionBounds minSize must be an integer >= 1 for dimension: ${name}`);
          }
          if (!Number.isInteger(maxSize) || maxSize < 1) {
            throw new Error(`WebNN freeDimensionBounds maxSize must be an integer >= 1 for dimension: ${name}`);
          }
          if (maxSize < minSize) {
            throw new Error(`WebNN freeDimensionBounds maxSize must be >= minSize for dimension: ${name}`);
          }
          serializedEntries.push(`${name}:${minSize}:${maxSize}`);
        }
        return serializedEntries.join(";");
      };
      setExecutionProviders = async (sessionOptionsHandle, sessionOptions, allocs) => {
        const executionProviders = sessionOptions.executionProviders;
        for (const ep of executionProviders) {
          let epName = typeof ep === "string" ? ep : ep.name;
          const epOptions = [];
          switch (epName) {
            case "webnn":
              epName = "WEBNN";
              if (typeof ep !== "string") {
                const webnnOptions = ep;
                const deviceType = webnnOptions?.deviceType;
                const freeDimensionBounds = webnnOptions?.freeDimensionBounds;
                if (deviceType) {
                  appendSessionConfig(sessionOptionsHandle, "deviceType", deviceType, allocs);
                }
                if (freeDimensionBounds) {
                  const serializedBounds = serializeWebNNFreeDimensionBounds(freeDimensionBounds);
                  if (serializedBounds) {
                    appendEpOption(epOptions, "FreeDimensionBounds", serializedBounds, allocs);
                  }
                }
                const enableCausalLM = webnnOptions?.enableCausalLM;
                if (enableCausalLM) {
                  appendEpOption(epOptions, "enableCausalLM", "true", allocs);
                }
              }
              break;
            case "webgpu":
              if (false) {
                epName = "WebGPU";
                let customDevice;
                if (typeof ep !== "string") {
                  const webgpuOptions = ep;
                  if (webgpuOptions.device) {
                    if (typeof GPUDevice !== "undefined" && webgpuOptions.device instanceof GPUDevice) {
                      customDevice = webgpuOptions.device;
                    } else {
                      throw new Error("Invalid GPU device set in WebGPU EP options.");
                    }
                  }
                  const { enableGraphCapture } = sessionOptions;
                  if (typeof enableGraphCapture === "boolean" && enableGraphCapture) {
                    appendEpOption(epOptions, "enableGraphCapture", "1", allocs);
                  }
                  if (typeof webgpuOptions.preferredLayout === "string") {
                    appendEpOption(epOptions, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                  }
                  if (webgpuOptions.forceCpuNodeNames) {
                    const names = Array.isArray(webgpuOptions.forceCpuNodeNames) ? webgpuOptions.forceCpuNodeNames : [webgpuOptions.forceCpuNodeNames];
                    appendEpOption(epOptions, "forceCpuNodeNames", names.join("\n"), allocs);
                  }
                  if (webgpuOptions.validationMode) {
                    appendEpOption(epOptions, "validationMode", webgpuOptions.validationMode, allocs);
                  }
                }
                const info = getInstance().webgpuRegisterDevice(customDevice);
                if (info) {
                  const [deviceId, instanceHandle, deviceHandle] = info;
                  appendEpOption(epOptions, "deviceId", deviceId.toString(), allocs);
                  appendEpOption(epOptions, "webgpuInstance", instanceHandle.toString(), allocs);
                  appendEpOption(epOptions, "webgpuDevice", deviceHandle.toString(), allocs);
                }
              } else {
                epName = "JS";
                if (typeof ep !== "string") {
                  const webgpuOptions = ep;
                  if (webgpuOptions?.preferredLayout) {
                    if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                      throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                    }
                    appendSessionConfig(sessionOptionsHandle, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                  }
                }
              }
              break;
            case "wasm":
            case "cpu":
              continue;
            default:
              throw new Error(`not supported execution provider: ${epName}`);
          }
          const epNameDataOffset = allocWasmString(epName, allocs);
          const epOptionsCount = epOptions.length;
          let keysOffset = 0;
          let valuesOffset = 0;
          if (epOptionsCount > 0) {
            keysOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(keysOffset);
            valuesOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(valuesOffset);
            for (let i = 0; i < epOptionsCount; i++) {
              getInstance().setValue(keysOffset + i * getInstance().PTR_SIZE, epOptions[i][0], "*");
              getInstance().setValue(valuesOffset + i * getInstance().PTR_SIZE, epOptions[i][1], "*");
            }
          }
          if (await getInstance()._OrtAppendExecutionProvider(
            sessionOptionsHandle,
            epNameDataOffset,
            keysOffset,
            valuesOffset,
            epOptionsCount
          ) !== 0) {
            checkLastError(`Can't append execution provider: ${epName}.`);
          }
        }
      };
      setSessionOptions = async (options) => {
        const wasm2 = getInstance();
        let sessionOptionsHandle = 0;
        const allocs = [];
        const sessionOptions = options || {};
        appendDefaultOptions(sessionOptions);
        try {
          const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");
          const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");
          const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;
          const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;
          if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${logSeverityLevel}`);
          }
          const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;
          if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {
            throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);
          }
          const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;
          sessionOptionsHandle = wasm2._OrtCreateSessionOptions(
            graphOptimizationLevel,
            !!sessionOptions.enableCpuMemArena,
            !!sessionOptions.enableMemPattern,
            executionMode,
            !!sessionOptions.enableProfiling,
            0,
            logIdDataOffset,
            logSeverityLevel,
            logVerbosityLevel,
            optimizedModelFilePathOffset
          );
          if (sessionOptionsHandle === 0) {
            checkLastError("Can't create session options.");
          }
          if (sessionOptions.executionProviders) {
            await setExecutionProviders(sessionOptionsHandle, sessionOptions, allocs);
          }
          if (sessionOptions.enableGraphCapture !== void 0) {
            if (typeof sessionOptions.enableGraphCapture !== "boolean") {
              throw new Error(`enableGraphCapture must be a boolean value: ${sessionOptions.enableGraphCapture}`);
            }
            appendSessionConfig(
              sessionOptionsHandle,
              "enableGraphCapture",
              sessionOptions.enableGraphCapture.toString(),
              allocs
            );
          }
          if (sessionOptions.freeDimensionOverrides) {
            for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {
              if (typeof name !== "string") {
                throw new Error(`free dimension override name must be a string: ${name}`);
              }
              if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
                throw new Error(`free dimension override value must be a non-negative integer: ${value}`);
              }
              const nameOffset = allocWasmString(name, allocs);
              if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {
                checkLastError(`Can't set a free dimension override: ${name} - ${value}.`);
              }
            }
          }
          if (sessionOptions.extra !== void 0) {
            iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              appendSessionConfig(sessionOptionsHandle, key, value, allocs);
            });
          }
          return [sessionOptionsHandle, allocs];
        } catch (e) {
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/wasm-common.ts
  var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, calculateTensorSizeInBytes, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, isMLTensorSupportedType, dataLocationStringToEnum;
  var init_wasm_common = __esm({
    "web/lib/wasm/wasm-common.ts"() {
      "use strict";
      tensorDataTypeStringToEnum = (type) => {
        switch (type) {
          case "int8":
            return 3 /* int8 */;
          case "uint8":
            return 2 /* uint8 */;
          case "bool":
            return 9 /* bool */;
          case "int16":
            return 5 /* int16 */;
          case "uint16":
            return 4 /* uint16 */;
          case "int32":
            return 6 /* int32 */;
          case "uint32":
            return 12 /* uint32 */;
          case "float16":
            return 10 /* float16 */;
          case "float32":
            return 1 /* float */;
          case "float64":
            return 11 /* double */;
          case "string":
            return 8 /* string */;
          case "int64":
            return 7 /* int64 */;
          case "uint64":
            return 13 /* uint64 */;
          case "int4":
            return 22 /* int4 */;
          case "uint4":
            return 21 /* uint4 */;
          default:
            throw new Error(`unsupported data type: ${type}`);
        }
      };
      tensorDataTypeEnumToString = (typeProto) => {
        switch (typeProto) {
          case 3 /* int8 */:
            return "int8";
          case 2 /* uint8 */:
            return "uint8";
          case 9 /* bool */:
            return "bool";
          case 5 /* int16 */:
            return "int16";
          case 4 /* uint16 */:
            return "uint16";
          case 6 /* int32 */:
            return "int32";
          case 12 /* uint32 */:
            return "uint32";
          case 10 /* float16 */:
            return "float16";
          case 1 /* float */:
            return "float32";
          case 11 /* double */:
            return "float64";
          case 8 /* string */:
            return "string";
          case 7 /* int64 */:
            return "int64";
          case 13 /* uint64 */:
            return "uint64";
          case 22 /* int4 */:
            return "int4";
          case 21 /* uint4 */:
            return "uint4";
          default:
            throw new Error(`unsupported data type: ${typeProto}`);
        }
      };
      calculateTensorSizeInBytes = (dateType, dimsOrSize) => {
        const elementSize = [
          -1,
          // undefined = 0
          4,
          // float = 1
          1,
          // uint8 = 2
          1,
          // int8 = 3
          2,
          // uint16 = 4
          2,
          // int16 = 5
          4,
          // int32 = 6
          8,
          // int64 = 7
          -1,
          // string = 8
          1,
          // bool = 9
          2,
          // float16 = 10
          8,
          // double = 11
          4,
          // uint32 = 12
          8,
          // uint64 = 13
          -1,
          // complex64 = 14
          -1,
          // complex128 = 15
          -1,
          // bfloat16 = 16
          -1,
          // FLOAT8E4M3FN = 17
          -1,
          // FLOAT8E4M3FNUZ = 18
          -1,
          // FLOAT8E5M2 = 19
          -1,
          // FLOAT8E5M2FNUZ = 20
          0.5,
          // uint4 = 21
          0.5
          // int4 = 22
        ][dateType];
        const size = typeof dimsOrSize === "number" ? dimsOrSize : dimsOrSize.reduce((a, b) => a * b, 1);
        return elementSize > 0 ? Math.ceil(size * elementSize) : void 0;
      };
      tensorTypeToTypedArrayConstructor = (type) => {
        switch (type) {
          case "float16":
            return typeof Float16Array !== "undefined" && Float16Array.from ? Float16Array : Uint16Array;
          case "float32":
            return Float32Array;
          case "uint8":
            return Uint8Array;
          case "int8":
            return Int8Array;
          case "uint16":
            return Uint16Array;
          case "int16":
            return Int16Array;
          case "int32":
            return Int32Array;
          case "bool":
            return Uint8Array;
          case "float64":
            return Float64Array;
          case "uint32":
            return Uint32Array;
          case "int64":
            return BigInt64Array;
          case "uint64":
            return BigUint64Array;
          default:
            throw new Error(`unsupported type: ${type}`);
        }
      };
      logLevelStringToEnum = (logLevel) => {
        switch (logLevel) {
          case "verbose":
            return 0;
          case "info":
            return 1;
          case "warning":
            return 2;
          case "error":
            return 3;
          case "fatal":
            return 4;
          default:
            throw new Error(`unsupported logging level: ${logLevel}`);
        }
      };
      isGpuBufferSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      isMLTensorSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint64" || type === "int8" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      dataLocationStringToEnum = (location2) => {
        switch (location2) {
          case "none":
            return 0;
          case "cpu":
            return 1;
          case "cpu-pinned":
            return 2;
          case "texture":
            return 3;
          case "gpu-buffer":
            return 4;
          case "ml-tensor":
            return 5;
          default:
            throw new Error(`unsupported data location: ${location2}`);
        }
      };
    }
  });

  // web/lib/wasm/wasm-utils-load-file.ts
  var loadFile;
  var init_wasm_utils_load_file = __esm({
    "web/lib/wasm/wasm-utils-load-file.ts"() {
      "use strict";
      init_wasm_utils_env();
      loadFile = async (file) => {
        if (typeof file === "string") {
          if (isNode) {
            try {
              const { readFile } = __require("node:fs/promises");
              return new Uint8Array(await readFile(file));
            } catch (e) {
              if (e.code === "ERR_FS_FILE_TOO_LARGE") {
                const { createReadStream } = __require("node:fs");
                const stream = createReadStream(file);
                const chunks = [];
                for await (const chunk of stream) {
                  chunks.push(chunk);
                }
                return new Uint8Array(Buffer.concat(chunks));
              }
              throw e;
            }
          } else {
            const response = await fetch(file);
            if (!response.ok) {
              throw new Error(`failed to load external data file: ${file}`);
            }
            const contentLengthHeader = response.headers.get("Content-Length");
            const fileSize = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
            if (fileSize < 1073741824) {
              return new Uint8Array(await response.arrayBuffer());
            } else {
              if (!response.body) {
                throw new Error(`failed to load external data file: ${file}, no response body.`);
              }
              const reader = response.body.getReader();
              let buffer;
              try {
                buffer = new ArrayBuffer(fileSize);
              } catch (e) {
                if (e instanceof RangeError) {
                  const pages = Math.ceil(fileSize / 65536);
                  buffer = new WebAssembly.Memory({ initial: pages, maximum: pages }).buffer;
                } else {
                  throw e;
                }
              }
              let offset = 0;
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const chunkSize = value.byteLength;
                const chunk = new Uint8Array(buffer, offset, chunkSize);
                chunk.set(value);
                offset += chunkSize;
              }
              return new Uint8Array(buffer, 0, fileSize);
            }
          }
        } else if (file instanceof Blob) {
          return new Uint8Array(await file.arrayBuffer());
        } else if (file instanceof Uint8Array) {
          return file;
        } else {
          return new Uint8Array(file);
        }
      };
    }
  });

  // web/lib/wasm/wasm-core-impl.ts
  var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, getSessionInputOutputMetadata, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
  var init_wasm_core_impl = __esm({
    "web/lib/wasm/wasm-core-impl.ts"() {
      "use strict";
      init_esm();
      init_run_options();
      init_session_options();
      init_wasm_common();
      init_wasm_factory();
      init_wasm_utils();
      init_wasm_utils_load_file();
      initOrt = (numThreads, loggingLevel) => {
        const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
        if (errorCode !== 0) {
          checkLastError("Can't initialize onnxruntime.");
        }
      };
      initRuntime = async (env3) => {
        initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
      };
      initEp = async (env3, epName) => {
        getInstance().asyncInit?.();
        let webgpuAdapter = env3.webgpu.adapter;
        if (epName === "webgpu") {
          if (typeof navigator === "undefined" || !navigator.gpu) {
            throw new Error("WebGPU is not supported in current environment");
          }
          if (!webgpuAdapter) {
            const powerPreference = env3.webgpu.powerPreference;
            if (powerPreference !== void 0 && powerPreference !== "low-power" && powerPreference !== "high-performance") {
              throw new Error(`Invalid powerPreference setting: "${powerPreference}"`);
            }
            const forceFallbackAdapter = env3.webgpu.forceFallbackAdapter;
            if (forceFallbackAdapter !== void 0 && typeof forceFallbackAdapter !== "boolean") {
              throw new Error(`Invalid forceFallbackAdapter setting: "${forceFallbackAdapter}"`);
            }
            webgpuAdapter = await navigator.gpu.requestAdapter({ powerPreference, forceFallbackAdapter });
            if (!webgpuAdapter) {
              throw new Error(
                'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
              );
            }
          } else {
            if (typeof webgpuAdapter.limits !== "object" || typeof webgpuAdapter.features !== "object" || typeof webgpuAdapter.requestDevice !== "function") {
              throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
            }
          }
        }
        if (epName === "webnn") {
          if (typeof navigator === "undefined" || !navigator.ml) {
            throw new Error("WebNN is not supported in current environment");
          }
        }
        if (false) {
          const initJsep = null.init;
          if (epName === "webgpu") {
            await initJsep("webgpu", getInstance(), env3, webgpuAdapter);
          }
          if (epName === "webnn") {
            await initJsep("webnn", getInstance(), env3);
          }
        } else {
          if (false) {
            getInstance().webgpuInit((device) => {
              env3.webgpu.device = device;
            });
          }
          if (false) {
            const backend = new null.WebNNBackend(env3);
            getInstance().webnnInit([
              backend,
              // webnnReserveTensorId
              () => backend.reserveTensorId(),
              // webnnReleaseTensorId,
              (tensorId) => backend.releaseTensorId(tensorId),
              // webnnEnsureTensor
              async (sessionId, tensorId, onnxDataType, shape, copyOld) => backend.ensureTensor(sessionId, tensorId, onnxDataType, shape, copyOld),
              // webnnUploadTensor
              (tensorId, data) => {
                backend.uploadTensor(tensorId, data);
              },
              // webnnDownloadTensor
              async (tensorId, dstBuffer) => backend.downloadTensor(tensorId, dstBuffer),
              // webnnRegisterMLContext
              (sessionId, mlContext) => backend.registerMLContext(sessionId, mlContext),
              // webnnEnableTraceEvent
              !!env3.trace
            ]);
          }
        }
      };
      activeSessions = /* @__PURE__ */ new Map();
      getSessionInputOutputCount = (sessionHandle) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output count.");
          }
          const type = ptrSize === 4 ? "i32" : "i64";
          return [Number(wasm2.getValue(dataOffset, type)), Number(wasm2.getValue(dataOffset + ptrSize, type))];
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      getSessionInputOutputMetadata = (sessionHandle, index) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        let metadataOffset = 0;
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputMetadata(sessionHandle, index, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output metadata.");
          }
          const nameOffset = Number(wasm2.getValue(dataOffset, "*"));
          metadataOffset = Number(wasm2.getValue(dataOffset + ptrSize, "*"));
          const elementType = wasm2.HEAP32[metadataOffset / 4];
          if (elementType === 0) {
            return [nameOffset, 0];
          }
          const dimsCount = wasm2.HEAPU32[metadataOffset / 4 + 1];
          const dims = [];
          for (let i = 0; i < dimsCount; i++) {
            const symbolicDimNameOffset = Number(wasm2.getValue(metadataOffset + 8 + i * ptrSize, "*"));
            dims.push(
              symbolicDimNameOffset !== 0 ? wasm2.UTF8ToString(symbolicDimNameOffset) : Number(wasm2.getValue(metadataOffset + 8 + (i + dimsCount) * ptrSize, "*"))
            );
          }
          return [nameOffset, elementType, dims];
        } finally {
          wasm2.stackRestore(stack);
          if (metadataOffset !== 0) {
            wasm2._OrtFree(metadataOffset);
          }
        }
      };
      copyFromExternalBuffer = (model) => {
        const wasm2 = getInstance();
        const modelDataOffset = wasm2._malloc(model.byteLength);
        if (modelDataOffset === 0) {
          throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
        }
        wasm2.HEAPU8.set(model, modelDataOffset);
        return [modelDataOffset, model.byteLength];
      };
      createSession = async (modelData, options) => {
        let modelDataOffset, modelDataLength;
        const wasm2 = getInstance();
        if (Array.isArray(modelData)) {
          [modelDataOffset, modelDataLength] = modelData;
        } else if (modelData.buffer === wasm2.HEAPU8.buffer) {
          [modelDataOffset, modelDataLength] = [modelData.byteOffset, modelData.byteLength];
        } else {
          [modelDataOffset, modelDataLength] = copyFromExternalBuffer(modelData);
        }
        let sessionHandle = 0;
        let sessionOptionsHandle = 0;
        let ioBindingHandle = 0;
        let allocs = [];
        const inputNamesUTF8Encoded = [];
        const outputNamesUTF8Encoded = [];
        try {
          [sessionOptionsHandle, allocs] = await setSessionOptions(options);
          if (options?.externalData && wasm2.mountExternalData) {
            const loadingPromises = [];
            for (const file of options.externalData) {
              const path = typeof file === "string" ? file : file.path;
              loadingPromises.push(
                loadFile(typeof file === "string" ? file : file.data).then((data) => {
                  wasm2.mountExternalData(path, data);
                })
              );
            }
            await Promise.all(loadingPromises);
          }
          for (const provider of options?.executionProviders ?? []) {
            const providerName = typeof provider === "string" ? provider : provider.name;
            if (providerName === "webnn") {
              wasm2.shouldTransferToMLTensor = false;
              if (typeof provider !== "string") {
                const webnnOptions = provider;
                const context = webnnOptions?.context;
                const gpuDevice = webnnOptions?.gpuDevice;
                const deviceType = webnnOptions?.deviceType;
                const powerPreference = webnnOptions?.powerPreference;
                if (context) {
                  wasm2.currentContext = context;
                } else if (gpuDevice) {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext(gpuDevice);
                } else {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext({ deviceType, powerPreference });
                }
              } else {
                wasm2.currentContext = await wasm2.webnnCreateMLContext();
              }
              break;
            }
          }
          sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
          wasm2.webgpuOnCreateSession?.(sessionHandle);
          if (sessionHandle === 0) {
            checkLastError("Can't create a session.");
          }
          wasm2.jsepOnCreateSession?.();
          if (wasm2.currentContext) {
            wasm2.webnnRegisterMLContext(sessionHandle, wasm2.currentContext);
            wasm2.currentContext = void 0;
            wasm2.shouldTransferToMLTensor = true;
          }
          const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
          const enableGraphCapture = !!options?.enableGraphCapture;
          const inputNames = [];
          const outputNames = [];
          const inputMetadata = [];
          const outputMetadata = [];
          const outputPreferredLocations = [];
          for (let i = 0; i < inputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i);
            if (nameOffset === 0) {
              checkLastError("Can't get an input name.");
            }
            inputNamesUTF8Encoded.push(nameOffset);
            const name = wasm2.UTF8ToString(nameOffset);
            inputNames.push(name);
            inputMetadata.push(
              elementType === 0 ? { name, isTensor: false } : { name, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
          }
          for (let i = 0; i < outputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i + inputCount);
            if (nameOffset === 0) {
              checkLastError("Can't get an output name.");
            }
            outputNamesUTF8Encoded.push(nameOffset);
            const nameString = wasm2.UTF8ToString(nameOffset);
            outputNames.push(nameString);
            outputMetadata.push(
              elementType === 0 ? { name: nameString, isTensor: false } : { name: nameString, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
            if (false) {
              if (enableGraphCapture && options?.preferredOutputLocation === void 0) {
                outputPreferredLocations.push("gpu-buffer");
                continue;
              }
              const location2 = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
              const isGraphOutput = wasm2.webnnIsGraphOutput;
              if (location2 === "cpu" && isGraphOutput && isGraphOutput(sessionHandle, nameString)) {
                outputPreferredLocations.push("ml-tensor-cpu-output");
                continue;
              }
              if (location2 !== "cpu" && location2 !== "cpu-pinned" && location2 !== "gpu-buffer" && location2 !== "ml-tensor") {
                throw new Error(`Not supported preferred output location: ${location2}.`);
              }
              if (enableGraphCapture && location2 !== "gpu-buffer") {
                throw new Error(
                  `Not supported preferred output location: ${location2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`
                );
              }
              outputPreferredLocations.push(location2);
            }
          }
          let bindingState = null;
          if (false) {
            ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
            if (ioBindingHandle === 0) {
              checkLastError("Can't create IO binding.");
            }
            bindingState = {
              handle: ioBindingHandle,
              outputPreferredLocations,
              outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => l === "ml-tensor-cpu-output" ? "ml-tensor" : l).map((l) => dataLocationStringToEnum(l))
            };
          }
          activeSessions.set(sessionHandle, [
            sessionHandle,
            inputNamesUTF8Encoded,
            outputNamesUTF8Encoded,
            bindingState,
            enableGraphCapture,
            false
          ]);
          return [sessionHandle, inputNames, outputNames, inputMetadata, outputMetadata];
        } catch (e) {
          inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          if (ioBindingHandle !== 0) {
            if (wasm2._OrtReleaseBinding(ioBindingHandle) !== 0) {
              checkLastError("Can't release IO binding.");
            }
          }
          if (sessionHandle !== 0) {
            if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
              checkLastError("Can't release session.");
            }
          }
          throw e;
        } finally {
          wasm2._free(modelDataOffset);
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          wasm2.unmountExternalData?.();
        }
      };
      releaseSession = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot release session. invalid session id: ${sessionId}`);
        }
        const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture] = session;
        if (ioBindingState) {
          if (enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
          }
          if (wasm2._OrtReleaseBinding(ioBindingState.handle) !== 0) {
            checkLastError("Can't release IO binding.");
          }
        }
        wasm2.jsepOnReleaseSession?.(sessionId);
        wasm2.webnnOnReleaseSession?.(sessionId);
        wasm2.webgpuOnReleaseSession?.(sessionId);
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
          checkLastError("Can't release session.");
        }
        activeSessions.delete(sessionId);
      };
      prepareInputOutputTensor = async (tensor, tensorHandles, allocs, sessionId, tensorNameUTF8Encoded, index, enableGraphCapture = false) => {
        if (!tensor) {
          tensorHandles.push(0);
          return;
        }
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const dataType = tensor[0];
        const dims = tensor[1];
        const location2 = tensor[3];
        let actualLocation = location2;
        let rawData;
        let dataByteLength;
        if (dataType === "string" && (location2 === "gpu-buffer" || location2 === "ml-tensor")) {
          throw new Error("String tensor is not supported on GPU.");
        }
        if (enableGraphCapture && location2 !== "gpu-buffer") {
          throw new Error(
            `External buffer must be provided for input/output index ${index} when enableGraphCapture is true.`
          );
        }
        if (location2 === "gpu-buffer") {
          const gpuBuffer = tensor[2].gpuBuffer;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          if (false) {
            const registerBuffer = wasm2.webgpuRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(gpuBuffer, sessionId);
          } else {
            const registerBuffer = wasm2.jsepRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
          }
        } else if (location2 === "ml-tensor") {
          const mlTensor = tensor[2].mlTensor;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          const registerMLTensor = wasm2.webnnRegisterMLTensor;
          if (!registerMLTensor) {
            throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
          }
          rawData = registerMLTensor(sessionId, mlTensor, tensorDataTypeStringToEnum(dataType), dims);
        } else {
          const data = tensor[2];
          if (Array.isArray(data)) {
            dataByteLength = ptrSize * data.length;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            for (let i = 0; i < data.length; i++) {
              if (typeof data[i] !== "string") {
                throw new TypeError(`tensor data at index ${i} is not a string`);
              }
              wasm2.setValue(rawData + i * ptrSize, allocWasmString(data[i], allocs), "*");
            }
          } else {
            const isGraphInput = wasm2.webnnIsGraphInput;
            const isGraphOutput = wasm2.webnnIsGraphOutput;
            if (dataType !== "string" && isGraphInput && isGraphOutput) {
              const tensorName = wasm2.UTF8ToString(tensorNameUTF8Encoded);
              if (isGraphInput(sessionId, tensorName) || isGraphOutput(sessionId, tensorName)) {
                const dataTypeEnum = tensorDataTypeStringToEnum(dataType);
                dataByteLength = calculateTensorSizeInBytes(dataTypeEnum, dims);
                actualLocation = "ml-tensor";
                const createTemporaryTensor = wasm2.webnnCreateTemporaryTensor;
                const uploadTensor = wasm2.webnnUploadTensor;
                if (!createTemporaryTensor || !uploadTensor) {
                  throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                }
                const tensorId = await createTemporaryTensor(sessionId, dataTypeEnum, dims);
                uploadTensor(tensorId, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
                rawData = tensorId;
              } else {
                dataByteLength = data.byteLength;
                rawData = wasm2._malloc(dataByteLength);
                allocs.push(rawData);
                wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
              }
            } else {
              dataByteLength = data.byteLength;
              rawData = wasm2._malloc(dataByteLength);
              allocs.push(rawData);
              wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
            }
          }
        }
        const stack = wasm2.stackSave();
        const dimsOffset = wasm2.stackAlloc(4 * dims.length);
        try {
          dims.forEach((d, index2) => wasm2.setValue(dimsOffset + index2 * ptrSize, d, ptrSize === 4 ? "i32" : "i64"));
          const tensor2 = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(dataType),
            rawData,
            dataByteLength,
            dimsOffset,
            dims.length,
            dataLocationStringToEnum(actualLocation)
          );
          if (tensor2 === 0) {
            checkLastError(`Can't create tensor for input/output. session=${sessionId}, index=${index}.`);
          }
          tensorHandles.push(tensor2);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
        }
        const sessionHandle = session[0];
        const inputNamesUTF8Encoded = session[1];
        const outputNamesUTF8Encoded = session[2];
        const ioBindingState = session[3];
        const enableGraphCapture = session[4];
        const inputOutputBound = session[5];
        const inputCount = inputIndices.length;
        const outputCount = outputIndices.length;
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        const inputTensorHandles = [];
        const outputTensorHandles = [];
        const inputOutputAllocs = [];
        const preAllocatedOutputs = [];
        const beforeRunStack = wasm2.stackSave();
        const inputValuesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const inputNamesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const outputValuesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        const outputNamesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            await prepareInputOutputTensor(
              inputTensors[i],
              inputTensorHandles,
              inputOutputAllocs,
              sessionId,
              inputNamesUTF8Encoded[inputIndices[i]],
              inputIndices[i],
              enableGraphCapture
            );
          }
          for (let i = 0; i < outputCount; i++) {
            await prepareInputOutputTensor(
              outputTensors[i],
              outputTensorHandles,
              inputOutputAllocs,
              sessionId,
              outputNamesUTF8Encoded[outputIndices[i]],
              inputCount + outputIndices[i],
              enableGraphCapture
            );
          }
          TRACE_EVENT_END("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            wasm2.setValue(inputValuesOffset + i * ptrSize, inputTensorHandles[i], "*");
            wasm2.setValue(inputNamesOffset + i * ptrSize, inputNamesUTF8Encoded[inputIndices[i]], "*");
          }
          for (let i = 0; i < outputCount; i++) {
            wasm2.setValue(outputValuesOffset + i * ptrSize, outputTensorHandles[i], "*");
            wasm2.setValue(outputNamesOffset + i * ptrSize, outputNamesUTF8Encoded[outputIndices[i]], "*");
          }
          if (false) {
            const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
            if (inputNamesUTF8Encoded.length !== inputCount) {
              throw new Error(
                `input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`
              );
            }
            TRACE_EVENT_BEGIN("wasm bindInputsOutputs");
            for (let i = 0; i < inputCount; i++) {
              const index = inputIndices[i];
              const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
              }
            }
            for (let i = 0; i < outputCount; i++) {
              const index = outputIndices[i];
              const location2 = outputTensors[i]?.[3];
              if (location2) {
                preAllocatedOutputs.push(outputTensorHandles[i]);
                const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
                }
              } else {
                const errorCode2 = wasm2._OrtBindOutput(
                  handle,
                  outputNamesUTF8Encoded[index],
                  0,
                  outputPreferredLocationsEncoded[index]
                );
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
                }
              }
            }
            TRACE_EVENT_END("wasm bindInputsOutputs");
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              true
            ]);
          }
          wasm2.jsepOnRunStart?.(sessionHandle);
          wasm2.webnnOnRunStart?.(sessionHandle);
          let errorCode;
          if (false) {
            errorCode = await wasm2._OrtRunWithBinding(
              sessionHandle,
              ioBindingState.handle,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          } else {
            errorCode = await wasm2._OrtRun(
              sessionHandle,
              inputNamesOffset,
              inputValuesOffset,
              inputCount,
              outputNamesOffset,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          }
          if (errorCode !== 0) {
            checkLastError("failed to call OrtRun().");
          }
          const output = [];
          const outputPromises = [];
          TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");
          for (let i = 0; i < outputCount; i++) {
            const tensor = Number(wasm2.getValue(outputValuesOffset + i * ptrSize, "*"));
            if (tensor === outputTensorHandles[i] || preAllocatedOutputs.includes(outputTensorHandles[i])) {
              output.push(outputTensors[i]);
              if (tensor !== outputTensorHandles[i]) {
                if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                  checkLastError("Can't release tensor.");
                }
              }
              continue;
            }
            const beforeGetTensorDataStack = wasm2.stackSave();
            const tensorDataOffset = wasm2.stackAlloc(4 * ptrSize);
            let keepOutputTensor = false;
            let type, dataOffset = 0;
            try {
              const errorCode2 = wasm2._OrtGetTensorData(
                tensor,
                tensorDataOffset,
                tensorDataOffset + ptrSize,
                tensorDataOffset + 2 * ptrSize,
                tensorDataOffset + 3 * ptrSize
              );
              if (errorCode2 !== 0) {
                checkLastError(`Can't access output tensor data on index ${i}.`);
              }
              const valueType = ptrSize === 4 ? "i32" : "i64";
              const dataType = Number(wasm2.getValue(tensorDataOffset, valueType));
              dataOffset = wasm2.getValue(tensorDataOffset + ptrSize, "*");
              const dimsOffset = wasm2.getValue(tensorDataOffset + ptrSize * 2, "*");
              const dimsLength = Number(wasm2.getValue(tensorDataOffset + ptrSize * 3, valueType));
              const dims = [];
              for (let i2 = 0; i2 < dimsLength; i2++) {
                dims.push(Number(wasm2.getValue(dimsOffset + i2 * ptrSize, valueType)));
              }
              if (wasm2._OrtFree(dimsOffset) !== 0) {
                checkLastError("Can't free memory for tensor dims.");
              }
              const size = dims.reduce((a, b) => a * b, 1);
              type = tensorDataTypeEnumToString(dataType);
              const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
              if (type === "string") {
                if (preferredLocation === "gpu-buffer" || preferredLocation === "ml-tensor") {
                  throw new Error("String tensor is not supported on GPU.");
                }
                const stringData = [];
                for (let i2 = 0; i2 < size; i2++) {
                  const offset = wasm2.getValue(dataOffset + i2 * ptrSize, "*");
                  const nextOffset = wasm2.getValue(dataOffset + (i2 + 1) * ptrSize, "*");
                  const maxBytesToRead = i2 === size - 1 ? void 0 : nextOffset - offset;
                  stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
                }
                output.push([type, dims, stringData, "cpu"]);
              } else {
                if (preferredLocation === "gpu-buffer" && size > 0) {
                  const getBuffer = false ? wasm2.webgpuGetBuffer : wasm2.jsepGetBuffer;
                  if (!getBuffer) {
                    throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  }
                  const gpuBuffer = getBuffer(dataOffset);
                  const bufferSize = calculateTensorSizeInBytes(dataType, size);
                  if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  if (false) {
                    wasm2.webgpuRegisterBuffer(gpuBuffer, sessionId, dataOffset);
                    const downloadDataFunction = wasm2.webgpuCreateDownloader(gpuBuffer, bufferSize, sessionId);
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: async () => {
                          const arrayBuffer = await downloadDataFunction();
                          const data = new (tensorTypeToTypedArrayConstructor(type))(arrayBuffer);
                          return data;
                        },
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  } else {
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: wasm2.jsepCreateDownloader(gpuBuffer, bufferSize, type),
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  }
                } else if (preferredLocation === "ml-tensor" && size > 0) {
                  const ensureTensor = wasm2.webnnEnsureTensor;
                  const isGraphInputOutputTypeSupported = wasm2.webnnIsGraphInputOutputTypeSupported;
                  if (!ensureTensor || !isGraphInputOutputTypeSupported) {
                    throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                  }
                  const tensorSize = calculateTensorSizeInBytes(dataType, size);
                  if (tensorSize === void 0 || !isMLTensorSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  if (!isGraphInputOutputTypeSupported(sessionId, type, false)) {
                    throw new Error(
                      `preferredLocation "ml-tensor" for ${type} output is not supported by current WebNN Context.`
                    );
                  }
                  const mlTensor = await ensureTensor(sessionId, dataOffset, dataType, dims, false);
                  keepOutputTensor = true;
                  output.push([
                    type,
                    dims,
                    {
                      mlTensor,
                      download: wasm2.webnnCreateMLTensorDownloader(dataOffset, type),
                      dispose: () => {
                        wasm2.webnnReleaseTensorId(dataOffset);
                        wasm2._OrtReleaseTensor(tensor);
                      }
                    },
                    "ml-tensor"
                  ]);
                } else if (preferredLocation === "ml-tensor-cpu-output" && size > 0) {
                  const data = wasm2.webnnCreateMLTensorDownloader(dataOffset, type)();
                  const index = output.length;
                  keepOutputTensor = true;
                  outputPromises.push(
                    (async () => {
                      const result = [index, await data];
                      wasm2.webnnReleaseTensorId(dataOffset);
                      wasm2._OrtReleaseTensor(tensor);
                      return result;
                    })()
                  );
                  output.push([type, dims, [], "cpu"]);
                } else {
                  const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                  const data = new typedArrayConstructor(size);
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(
                    wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength)
                  );
                  output.push([type, dims, data, "cpu"]);
                }
              }
            } finally {
              wasm2.stackRestore(beforeGetTensorDataStack);
              if (type === "string" && dataOffset) {
                wasm2._free(dataOffset);
              }
              if (!keepOutputTensor) {
                wasm2._OrtReleaseTensor(tensor);
              }
            }
          }
          if (ioBindingState && !enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              false
            ]);
          }
          for (const [index, data] of await Promise.all(outputPromises)) {
            output[index][2] = data;
          }
          TRACE_EVENT_END("wasm ProcessOutputTensor");
          return output;
        } finally {
          wasm2.webnnOnRunEnd?.(sessionHandle);
          wasm2.stackRestore(beforeRunStack);
          if (false) {
            inputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
            outputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
          }
          inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          inputOutputAllocs.forEach((p) => wasm2._free(p));
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          runOptionsAllocs.forEach((p) => wasm2._free(p));
        }
      };
      endProfiling = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error("invalid session id");
        }
        const sessionHandle = session[0];
        const profileFileName = wasm2._OrtEndProfiling(sessionHandle);
        if (profileFileName === 0) {
          checkLastError("Can't get an profile file name.");
        }
        wasm2._OrtFree(profileFileName);
      };
      extractTransferableBuffers = (tensors) => {
        const buffers = [];
        for (const tensor of tensors) {
          const data = tensor[2];
          if (!Array.isArray(data) && "buffer" in data) {
            buffers.push(data.buffer);
          }
        }
        return buffers;
      };
    }
  });

  // web/lib/wasm/proxy-wrapper.ts
  var isProxy, proxyWorker, initializing2, initialized2, aborted2, temporaryObjectUrl, initWasmCallbacks, queuedCallbacks, enqueueCallbacks, ensureWorker, onProxyWorkerMessage, initializeWebAssemblyAndOrtRuntime, initializeOrtEp, copyFromExternalBuffer2, createSession2, releaseSession2, run2, endProfiling2;
  var init_proxy_wrapper = __esm({
    "web/lib/wasm/proxy-wrapper.ts"() {
      "use strict";
      init_esm();
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      isProxy = () => !!env2.wasm.proxy && typeof document !== "undefined";
      initializing2 = false;
      initialized2 = false;
      aborted2 = false;
      queuedCallbacks = /* @__PURE__ */ new Map();
      enqueueCallbacks = (type, callbacks) => {
        const queue = queuedCallbacks.get(type);
        if (queue) {
          queue.push(callbacks);
        } else {
          queuedCallbacks.set(type, [callbacks]);
        }
      };
      ensureWorker = () => {
        if (initializing2 || !initialized2 || aborted2 || !proxyWorker) {
          throw new Error("worker not ready");
        }
      };
      onProxyWorkerMessage = (ev) => {
        switch (ev.data.type) {
          case "init-wasm":
            initializing2 = false;
            if (ev.data.err) {
              aborted2 = true;
              initWasmCallbacks[1](ev.data.err);
            } else {
              initialized2 = true;
              initWasmCallbacks[0]();
            }
            if (temporaryObjectUrl) {
              URL.revokeObjectURL(temporaryObjectUrl);
              temporaryObjectUrl = void 0;
            }
            break;
          case "init-ep":
          case "copy-from":
          case "create":
          case "release":
          case "run":
          case "end-profiling": {
            const callbacks = queuedCallbacks.get(ev.data.type);
            if (ev.data.err) {
              callbacks.shift()[1](ev.data.err);
            } else {
              callbacks.shift()[0](ev.data.out);
            }
            break;
          }
          default:
        }
      };
      initializeWebAssemblyAndOrtRuntime = async () => {
        if (initialized2) {
          return;
        }
        if (initializing2) {
          throw new Error("multiple calls to 'initWasm()' detected.");
        }
        if (aborted2) {
          throw new Error("previous call to 'initWasm()' failed.");
        }
        initializing2 = true;
        if (isProxy()) {
          return new Promise((resolve, reject) => {
            proxyWorker?.terminate();
            void importProxyWorker().then(([objectUrl, worker]) => {
              try {
                proxyWorker = worker;
                proxyWorker.onerror = (ev) => reject(ev);
                proxyWorker.onmessage = onProxyWorkerMessage;
                initWasmCallbacks = [resolve, reject];
                const message = { type: "init-wasm", in: env2 };
                if (!message.in.wasm.wasmPaths && objectUrl) {
                  const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
                  if (inferredWasmPathPrefix) {
                    message.in.wasm.wasmPaths = inferredWasmPathPrefix;
                  }
                }
                if (false) {
                  message.in.wasm.wasmPaths = {
                    wasm: false ? new URL("ort-wasm-simd-threaded.jsep.wasm", void 0).href : false ? new URL("ort-wasm-simd-threaded.jspi.wasm", void 0).href : false ? new URL("ort-wasm-simd-threaded.asyncify.wasm", void 0).href : new URL("ort-wasm-simd-threaded.wasm", void 0).href
                  };
                }
                proxyWorker.postMessage(message);
                temporaryObjectUrl = objectUrl;
              } catch (e) {
                reject(e);
              }
            }, reject);
          });
        } else {
          try {
            await initializeWebAssembly(env2.wasm);
            await initRuntime(env2);
            initialized2 = true;
          } catch (e) {
            aborted2 = true;
            throw e;
          } finally {
            initializing2 = false;
          }
        }
      };
      initializeOrtEp = async (epName) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("init-ep", [resolve, reject]);
            const message = { type: "init-ep", in: { epName, env: env2 } };
            proxyWorker.postMessage(message);
          });
        } else {
          await initEp(env2, epName);
        }
      };
      copyFromExternalBuffer2 = async (buffer) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("copy-from", [resolve, reject]);
            const message = { type: "copy-from", in: { buffer } };
            proxyWorker.postMessage(message, [buffer.buffer]);
          });
        } else {
          return copyFromExternalBuffer(buffer);
        }
      };
      createSession2 = async (model, options) => {
        if (isProxy()) {
          if (options?.preferredOutputLocation) {
            throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("create", [resolve, reject]);
            const message = { type: "create", in: { model, options: { ...options } } };
            const transferable = [];
            if (model instanceof Uint8Array) {
              transferable.push(model.buffer);
            }
            proxyWorker.postMessage(message, transferable);
          });
        } else {
          return createSession(model, options);
        }
      };
      releaseSession2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("release", [resolve, reject]);
            const message = { type: "release", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          releaseSession(sessionId);
        }
      };
      run2 = async (sessionId, inputIndices, inputs, outputIndices, outputs, options) => {
        if (isProxy()) {
          if (inputs.some((t) => t[3] !== "cpu")) {
            throw new Error("input tensor on GPU is not supported for proxy.");
          }
          if (outputs.some((t) => t)) {
            throw new Error("pre-allocated output tensor is not supported for proxy.");
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("run", [resolve, reject]);
            const serializableInputs = inputs;
            const message = {
              type: "run",
              in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options }
            };
            proxyWorker.postMessage(message, extractTransferableBuffers(serializableInputs));
          });
        } else {
          return run(sessionId, inputIndices, inputs, outputIndices, outputs, options);
        }
      };
      endProfiling2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("end-profiling", [resolve, reject]);
            const message = { type: "end-profiling", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          endProfiling(sessionId);
        }
      };
    }
  });

  // web/lib/wasm/session-handler-inference.ts
  var encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
  var init_session_handler_inference = __esm({
    "web/lib/wasm/session-handler-inference.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_wasm_common();
      init_wasm_utils_env();
      init_wasm_utils_load_file();
      encodeTensorMetadata = (tensor, getName) => {
        switch (tensor.location) {
          case "cpu":
            return [tensor.type, tensor.dims, tensor.data, "cpu"];
          case "gpu-buffer":
            return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
          case "ml-tensor":
            return [tensor.type, tensor.dims, { mlTensor: tensor.mlTensor }, "ml-tensor"];
          default:
            throw new Error(`invalid data location: ${tensor.location} for ${getName()}`);
        }
      };
      decodeTensorMetadata = (tensor) => {
        switch (tensor[3]) {
          case "cpu":
            return new Tensor2(tensor[0], tensor[2], tensor[1]);
          case "gpu-buffer": {
            const dataType = tensor[0];
            if (!isGpuBufferSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing GPU tensor`);
            }
            const { gpuBuffer, download, dispose } = tensor[2];
            return Tensor2.fromGpuBuffer(gpuBuffer, { dataType, dims: tensor[1], download, dispose });
          }
          case "ml-tensor": {
            const dataType = tensor[0];
            if (!isMLTensorSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing MLTensor tensor`);
            }
            const { mlTensor, download, dispose } = tensor[2];
            return Tensor2.fromMLTensor(mlTensor, { dataType, dims: tensor[1], download, dispose });
          }
          default:
            throw new Error(`invalid data location: ${tensor[3]}`);
        }
      };
      OnnxruntimeWebAssemblySessionHandler = class {
        async fetchModelAndCopyToWasmMemory(path) {
          return copyFromExternalBuffer2(await loadFile(path));
        }
        async loadModel(pathOrBuffer, options) {
          TRACE_FUNC_BEGIN();
          let model;
          if (typeof pathOrBuffer === "string") {
            if (isNode) {
              model = await loadFile(pathOrBuffer);
            } else {
              model = await this.fetchModelAndCopyToWasmMemory(pathOrBuffer);
            }
          } else {
            model = pathOrBuffer;
          }
          [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await createSession2(
            model,
            options
          );
          TRACE_FUNC_END();
        }
        async dispose() {
          return releaseSession2(this.sessionId);
        }
        async run(feeds, fetches, options) {
          TRACE_FUNC_BEGIN();
          const inputArray = [];
          const inputIndices = [];
          Object.entries(feeds).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.inputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid input '${name}'`);
            }
            inputArray.push(tensor);
            inputIndices.push(index);
          });
          const outputArray = [];
          const outputIndices = [];
          Object.entries(fetches).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.outputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid output '${name}'`);
            }
            outputArray.push(tensor);
            outputIndices.push(index);
          });
          const inputs = inputArray.map(
            (t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`)
          );
          const outputs = outputArray.map(
            (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
          );
          const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
          const resultMap = {};
          for (let i = 0; i < results.length; i++) {
            resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
          }
          TRACE_FUNC_END();
          return resultMap;
        }
        startProfiling() {
        }
        endProfiling() {
          void endProfiling2(this.sessionId);
        }
      };
    }
  });

  // web/lib/backend-wasm.ts
  var backend_wasm_exports = {};
  __export(backend_wasm_exports, {
    OnnxruntimeWebAssemblyBackend: () => OnnxruntimeWebAssemblyBackend,
    initializeFlags: () => initializeFlags,
    wasmBackend: () => wasmBackend
  });
  var initializeFlags, OnnxruntimeWebAssemblyBackend, wasmBackend;
  var init_backend_wasm = __esm({
    "web/lib/backend-wasm.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_session_handler_inference();
      initializeFlags = () => {
        if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
          env2.wasm.initTimeout = 0;
        }
        const simd = env2.wasm.simd;
        if (typeof simd !== "boolean" && simd !== void 0 && simd !== "fixed" && simd !== "relaxed") {
          console.warn(
            `Property "env.wasm.simd" is set to unknown value "${simd}". Reset it to \`false\` and ignore SIMD feature checking.`
          );
          env2.wasm.simd = false;
        }
        if (typeof env2.wasm.proxy !== "boolean") {
          env2.wasm.proxy = false;
        }
        if (typeof env2.wasm.trace !== "boolean") {
          env2.wasm.trace = false;
        }
        if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            env2.wasm.numThreads = 1;
          } else {
            const numCpuLogicalCores = typeof navigator === "undefined" ? __require("node:os").cpus().length : navigator.hardwareConcurrency;
            env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
          }
        }
      };
      OnnxruntimeWebAssemblyBackend = class {
        /**
         * This function initializes the WebAssembly backend.
         *
         * This function will be called only once for each backend name. It will be called the first time when
         * `ort.InferenceSession.create()` is called with a registered backend name.
         *
         * @param backendName - the registered backend name.
         */
        async init(backendName) {
          initializeFlags();
          await initializeWebAssemblyAndOrtRuntime();
          await initializeOrtEp(backendName);
        }
        async createInferenceSessionHandler(pathOrBuffer, options) {
          const handler = new OnnxruntimeWebAssemblySessionHandler();
          await handler.loadModel(pathOrBuffer, options);
          return handler;
        }
      };
      wasmBackend = new OnnxruntimeWebAssemblyBackend();
    }
  });

  // web/lib/index.ts
  var index_exports = {};
  __export(index_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    default: () => index_default,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  init_esm();
  init_esm();
  init_esm();

  // web/lib/version.ts
  var version2 = "1.26.0";

  // web/lib/index.ts
  var index_default = esm_exports;
  if (false) {
    const onnxjsBackend = null.onnxjsBackend;
    registerBackend("webgl", onnxjsBackend, -10);
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable both JSEP and WebGPU EP. This is not a valid configuration. JSEP and WebGPU EPs cannot be enabled at the same time."
    );
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable WebNN EP without JSEP or WebGPU EP. This is not a valid configuration. WebNN EP requires either JSEP or WebGPU EP to be enabled."
    );
  }
  if (true) {
    const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    if (false) {
      registerBackend("webnn", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(index_exports);
})();
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWVudi50cyIsICIuLi9saWIvd2FzbS9wcm94eS13b3JrZXIvbWFpbi50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50cyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1sb2FkLWZpbGUudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vbGliL3dhc20vcHJveHktd3JhcHBlci50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20udHMiLCAiLi4vbGliL2luZGV4LnRzIiwgIi4uL2xpYi92ZXJzaW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5cbmludGVyZmFjZSBCYWNrZW5kSW5mbyB7XG4gIGJhY2tlbmQ6IEJhY2tlbmQ7XG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgaW5pdFByb21pc2U/OiBQcm9taXNlPHZvaWQ+O1xuICBpbml0aWFsaXplZD86IGJvb2xlYW47XG4gIGFib3J0ZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuY29uc3QgYmFja2VuZHM6IE1hcDxzdHJpbmcsIEJhY2tlbmRJbmZvPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIG5hbWUgLSB0aGUgbmFtZSBhcyBhIGtleSB0byBsb29rdXAgYXMgYW4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcbiAqIDwgMCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgJ2JldGEnIHZlcnNpb24gYW5kIHdpbGwgbm90IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBiYWNrZW5kIGJ5IGRlZmF1bHQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tlbmQgPSBiYWNrZW5kcy5nZXQobmFtZSk7XG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7IGJhY2tlbmQsIHByaW9yaXR5IH0pO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPiBwcmlvcml0eSkge1xuICAgICAgLy8gc2FtZSBuYW1lIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGEgaGlnaGVyIHByaW9yaXR5LiBza2lwIHJlZ2lzdGVyYXRpb24uXG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA9PT0gcHJpb3JpdHkpIHtcbiAgICAgIGlmIChjdXJyZW50QmFja2VuZC5iYWNrZW5kICE9PSBiYWNrZW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlZ2lzdGVyIGJhY2tlbmQgXCIke25hbWV9XCIgdXNpbmcgcHJpb3JpdHkgJHtwcmlvcml0eX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJpb3JpdHkgPj0gMCkge1xuICAgICAgY29uc3QgaSA9IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChiYWNrZW5kcy5nZXQoYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5W2ldKSEucHJpb3JpdHkgPD0gcHJpb3JpdHkpIHtcbiAgICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDAsIG5hbWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIHZhbGlkIGJhY2tlbmQnKTtcbn07XG5cbi8qKlxuICogVHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBiYWNrZW5kTmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBiYWNrZW5kLlxuICogQHJldHVybnMgdGhlIGJhY2tlbmQgaW5zdGFuY2UgaWYgcmVzb2x2ZWQgYW5kIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseSwgb3IgYW4gZXJyb3IgbWVzc2FnZSBpZiBmYWlsZWQuXG4gKi9cbmNvbnN0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZCA9IGFzeW5jIChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxCYWNrZW5kIHwgc3RyaW5nPiA9PiB7XG4gIGNvbnN0IGJhY2tlbmRJbmZvID0gYmFja2VuZHMuZ2V0KGJhY2tlbmROYW1lKTtcbiAgaWYgKCFiYWNrZW5kSW5mbykge1xuICAgIHJldHVybiAnYmFja2VuZCBub3QgZm91bmQuJztcbiAgfVxuXG4gIGlmIChiYWNrZW5kSW5mby5pbml0aWFsaXplZCkge1xuICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICB9IGVsc2UgaWYgKGJhY2tlbmRJbmZvLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gYmFja2VuZEluZm8uZXJyb3IhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGlzSW5pdGlhbGl6aW5nID0gISFiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICBiYWNrZW5kSW5mby5pbml0UHJvbWlzZSA9IGJhY2tlbmRJbmZvLmJhY2tlbmQuaW5pdChiYWNrZW5kTmFtZSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICAgIGJhY2tlbmRJbmZvLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgYmFja2VuZEluZm8uZXJyb3IgPSBgJHtlfWA7XG4gICAgICAgIGJhY2tlbmRJbmZvLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZGVsZXRlIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXNvbHZlIGV4ZWN1dGlvbiBwcm92aWRlcnMgZnJvbSB0aGUgc3BlY2lmaWMgc2Vzc2lvbiBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIC0gdGhlIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIGFuIGluaXRpYWxpemVkIGJhY2tlbmQgaW5zdGFuY2UgYW5kIGEgc2Vzc2lvbiBvcHRpb25zIG9iamVjdCB3aXRoXG4gKiBmaWx0ZXJlZCBFUCBsaXN0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMgKFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuKTogUHJvbWlzZTxbYmFja2VuZDogQmFja2VuZCwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9uc10+ID0+IHtcbiAgLy8gZXh0cmFjdCBiYWNrZW5kIGhpbnRzIGZyb20gc2Vzc2lvbiBvcHRpb25zXG4gIGNvbnN0IGVwcyA9IG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzIHx8IFtdO1xuICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKChpKSA9PiAodHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xuICBjb25zdCBiYWNrZW5kTmFtZXMgPSBiYWNrZW5kSGludHMubGVuZ3RoID09PSAwID8gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5IDogYmFja2VuZEhpbnRzO1xuXG4gIC8vIHRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGFsbCByZXF1ZXN0ZWQgYmFja2VuZHNcbiAgbGV0IGJhY2tlbmQ6IEJhY2tlbmQgfCB1bmRlZmluZWQ7XG4gIGNvbnN0IGVycm9ycyA9IFtdO1xuICBjb25zdCBhdmFpbGFibGVCYWNrZW5kTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBiYWNrZW5kTmFtZSBvZiBiYWNrZW5kTmFtZXMpIHtcbiAgICBjb25zdCByZXNvbHZlUmVzdWx0ID0gYXdhaXQgdHJ5UmVzb2x2ZUFuZEluaXRpYWxpemVCYWNrZW5kKGJhY2tlbmROYW1lKTtcbiAgICBpZiAodHlwZW9mIHJlc29sdmVSZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlcnJvcnMucHVzaCh7IG5hbWU6IGJhY2tlbmROYW1lLCBlcnI6IHJlc29sdmVSZXN1bHQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghYmFja2VuZCkge1xuICAgICAgICBiYWNrZW5kID0gcmVzb2x2ZVJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChiYWNrZW5kID09PSByZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgIGF2YWlsYWJsZUJhY2tlbmROYW1lcy5hZGQoYmFja2VuZE5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIG5vIGJhY2tlbmQgaXMgYXZhaWxhYmxlLCB0aHJvdyBlcnJvci5cbiAgaWYgKCFiYWNrZW5kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBhdmFpbGFibGUgYmFja2VuZCBmb3VuZC4gRVJSOiAke2Vycm9ycy5tYXAoKGUpID0+IGBbJHtlLm5hbWV9XSAke2UuZXJyfWApLmpvaW4oJywgJyl9YCk7XG4gIH1cblxuICAvLyBmb3IgZWFjaCBleHBsaWNpdGx5IHJlcXVlc3RlZCBiYWNrZW5kLCBpZiBpdCdzIG5vdCBhdmFpbGFibGUsIG91dHB1dCB3YXJuaW5nIG1lc3NhZ2UuXG4gIGZvciAoY29uc3QgeyBuYW1lLCBlcnIgfSBvZiBlcnJvcnMpIHtcbiAgICBpZiAoYmFja2VuZEhpbnRzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgcmVtb3ZpbmcgcmVxdWVzdGVkIGV4ZWN1dGlvbiBwcm92aWRlciBcIiR7bmFtZX1cIiBmcm9tIHNlc3Npb24gb3B0aW9ucyBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGU6ICR7ZXJyfWAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZpbHRlcmVkRXBzID0gZXBzLmZpbHRlcigoaSkgPT4gYXZhaWxhYmxlQmFja2VuZE5hbWVzLmhhcyh0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKSk7XG5cbiAgcmV0dXJuIFtcbiAgICBiYWNrZW5kLFxuICAgIG5ldyBQcm94eShvcHRpb25zLCB7XG4gICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdleGVjdXRpb25Qcm92aWRlcnMnKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkRXBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3ApO1xuICAgICAgfSxcbiAgICB9KSxcbiAgXTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICB0eXBlIEZlZWRzVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xuICB0eXBlIEZldGNoZXNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9O1xuICB0eXBlIFJldHVyblR5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHNoYXJlZCBTZXNzaW9uSGFuZGxlciBmdW5jdGlvbmFsaXR5XG4gKlxuICogQGlnbm9yZVxuICovXG5pbnRlcmZhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD47XG5cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgYmFja2VuZCB0aGF0IHByb3ZpZGVzIGltcGxlbWVudGF0aW9uIG9mIG1vZGVsIGluZmVyZW5jaW5nLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJhY2tlbmQgYXN5bmNocm9ub3VzbHkuIFNob3VsZCB0aHJvdyB3aGVuIGZhaWxlZC5cbiAgICovXG4gIGluaXQoYmFja2VuZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG5cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgdXJpT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQgeyByZWdpc3RlckJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjI2LjAnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczogeyBjb21tb246IHZlcnNpb24gfSxcblxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xuICB9LFxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XG4gIH0sXG59O1xuXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYgYXMgZW52SW1wbCB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lndhc21gIGZvciBXZWJHUFUgYnVpbGQgd2l0aCBBc3luY2lmeSAod2l0aCBXZWJOTilcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzcGkud2FzbWAgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEpTUEkgc3VwcG9ydCAod2l0aCBXZWJOTilcbiAgICAgKi9cbiAgICB3YXNtPzogVVJMIHwgc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG92ZXJyaWRlIHBhdGggZm9yIHRoZSBtYWluIC5tanMgZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAubWpzIGZpbGUgaXM6XG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanNgIGZvciBkZWZhdWx0IGJ1aWxkXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qc2AgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qc2AgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEFzeW5jaWZ5ICh3aXRoIFdlYk5OKVxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS5tanNgIGZvciBXZWJHUFUgYnVpbGQgd2l0aCBKU1BJIHN1cHBvcnQgKHdpdGggV2ViTk4pXG4gICAgICovXG4gICAgbWpzPzogVVJMIHwgc3RyaW5nO1xuICB9XG4gIGV4cG9ydCB0eXBlIFdhc21QcmVmaXhPckZpbGVQYXRocyA9IFdhc21QYXRoUHJlZml4IHwgV2FzbUZpbGVQYXRocztcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3IgZ2V0IG51bWJlciBvZiB0aHJlYWQocykuIElmIG9taXR0ZWQgb3Igc2V0IHRvIDAsIG51bWJlciBvZiB0aHJlYWQocykgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHN5c3RlbS4gSWYgc2V0XG4gICAgICogdG8gMSwgbm8gd29ya2VyIHRocmVhZCB3aWxsIGJlIHNwYXduZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgd2hlbiBXZWJBc3NlbWJseSBtdWx0aXRocmVhZCBmZWF0dXJlIGlzIGF2YWlsYWJsZSBpbiBjdXJyZW50IGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIFNJTUQuXG4gICAgICpcbiAgICAgKiBPTk5YIFJ1bnRpbWUgd2lsbCBwZXJmb3JtIGZlYXR1cmUgZGV0ZWN0aW9uIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5LiBTcGVjaWZpY2FsbHksIHdoZW4gdGhlIHZhbHVlIGlzXG4gICAgICogc2V0IHRvOlxuICAgICAqIC0gYHVuZGVmaW5lZGAsIGB0cnVlYCBvciBgXCJmaXhlZFwiYDogd2lsbCBjaGVjayBhdmFpbGFiaWxpdHkgb2YgRml4ZWQtd2lkdGggU0lNRC5cbiAgICAgKiAtIGBcInJlbGF4ZWRcImA6IHdpbGwgY2hlY2sgYXZhaWxhYmlsaXR5IG9mIFJlbGF4ZWQgU0lNRC5cbiAgICAgKiAtIGBmYWxzZWA6IHdpbGwgbm90IHBlcmZvcm0gU0lNRCBmZWF0dXJlIGNoZWNraW5nLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IGRvZXMgbm90IG1ha2UgT05OWCBSdW50aW1lIHRvIHN3aXRjaCB0byB0aGUgY29ycmVzcG9uZGluZyBydW50aW1lIGF1dG9tYXRpY2FsbHkuIFVzZXIgbmVlZFxuICAgICAqIHRvIHNldCBgd2FzbVBhdGhzYCBvciBgd2FzbUJpbmFyeWAgcHJvcGVydHkgdG8gbG9hZCB0aGUgY29ycmVzcG9uZGluZyBydW50aW1lLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgU0lNRCBmZWF0dXJlIGlzIGF2YWlsYWJsZSBpbiBjdXJyZW50IGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB0cnVlYFxuICAgICAqL1xuICAgIHNpbWQ/OiBib29sZWFuIHwgJ2ZpeGVkJyB8ICdyZWxheGVkJztcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgZW52LnRyYWNlYCBpbnN0ZWFkLiBJZiBgZW52LnRyYWNlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHRyYWNlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBudW1iZXIgc3BlY2lmeWluZyB0aGUgdGltZW91dCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgV2ViQXNzZW1ibHkgYmFja2VuZCwgaW4gbWlsbGlzZWNvbmRzLiBBIHplcm9cbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxuICAgICAqL1xuICAgIGluaXRUaW1lb3V0PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY3VzdG9tIFVSTCBwcmVmaXggdG8gdGhlIC53YXNtLy5tanMgZmlsZXMsIG9yIGFuIG9iamVjdCBvZiBvdmVycmlkZXMgZm9yIGJvdGggLndhc20vLm1qcyBmaWxlLiBUaGUgb3ZlcnJpZGVcbiAgICAgKiBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqL1xuICAgIHdhc21QYXRocz86IFdhc21QcmVmaXhPckZpbGVQYXRocztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBidWZmZXIgd2hpY2ggY29udGFpbnMgdGhlIFdlYkFzc2VtYmx5IGJpbmFyeS4gSWYgdGhpcyBwcm9wZXJ0eSBpcyBzZXQsIHRoZSBgd2FzbVBhdGhzYCBwcm9wZXJ0eSB3aWxsXG4gICAgICogYmUgaWdub3JlZC5cbiAgICAgKi9cbiAgICB3YXNtQmluYXJ5PzogQXJyYXlCdWZmZXJMaWtlIHwgVWludDhBcnJheTtcblxuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBwcm94eSB0aGUgZXhlY3V0aW9uIG9mIG1haW4gdGhyZWFkIHRvIGEgd29ya2VyIHRocmVhZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHByb3h5PzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgV2ViR0wgQ29udGV4dCBJRCAod2ViZ2wgb3Igd2ViZ2wyKS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxuICAgICAqL1xuICAgIGNvbnRleHRJZD86ICd3ZWJnbCcgfCAnd2ViZ2wyJztcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIFdlYkdMIHJlbmRlcmluZyBjb250ZXh0LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBtYXhpbXVtIGJhdGNoIHNpemUgZm9yIG1hdG11bC4gMCBtZWFucyB0byBkaXNhYmxlIGJhdGNoaW5nLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBtYXRtdWxNYXhCYXRjaFNpemU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgdGV4dHVyZSBjYWNoZSBtb2RlLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgJ2Z1bGwnYFxuICAgICAqL1xuICAgIHRleHR1cmVDYWNoZU1vZGU/OiAnaW5pdGlhbGl6ZXJPbmx5JyB8ICdmdWxsJztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwYWNrZWQgdGV4dHVyZSBtb2RlXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwYWNrPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgZW5hYmxlIGFzeW5jIGRvd25sb2FkLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgYXN5bmM/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YSB7XG4gICAgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gICAgZGF0YVR5cGU6IHN0cmluZztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMSB7XG4gICAgdmVyc2lvbjogMTtcbiAgICBpbnB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcbiAgICBvdXRwdXRzTWV0YWRhdGE6IHJlYWRvbmx5IFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhW107XG4gICAga2VybmVsSWQ6IG51bWJlcjtcbiAgICBrZXJuZWxUeXBlOiBzdHJpbmc7XG4gICAga2VybmVsTmFtZTogc3RyaW5nO1xuICAgIHByb2dyYW1OYW1lOiBzdHJpbmc7XG4gICAgc3RhcnRUaW1lOiBudW1iZXI7XG4gICAgZW5kVGltZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IHR5cGUgV2ViR3B1UHJvZmlsaW5nRGF0YSA9IFdlYkdwdVByb2ZpbGluZ0RhdGFWMTtcblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgZW52LndlYmdwdS5wcm9maWxpbmcubW9kZWAgaW5zdGVhZC4gSWYgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGlzIHNldCwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlXG4gICAgICogaWdub3JlZC5cbiAgICAgKi9cbiAgICBwcm9maWxpbmdNb2RlPzogJ29mZicgfCAnZGVmYXVsdCc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgcHJvZmlsaW5nOiB7XG4gICAgICAvKipcbiAgICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBtb2RlLlxuICAgICAgICpcbiAgICAgICAqIEBkZWZhdWx0VmFsdWUgYCdvZmYnYFxuICAgICAgICovXG4gICAgICBtb2RlPzogJ29mZicgfCAnZGVmYXVsdCc7XG5cbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBwcm9maWxpbmcgZGF0YSBpcyByZWNlaXZlZC4gSWYgbm90IHNldCwgdGhlIHByb2ZpbGluZyBkYXRhIHdpbGwgYmVcbiAgICAgICAqIHByaW50ZWQgdG8gY29uc29sZS5cbiAgICAgICAqL1xuICAgICAgb25kYXRhPzogKGRhdGE6IFdlYkdwdVByb2ZpbGluZ0RhdGEpID0+IHZvaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwb3dlciBwcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgQ3JlYXRlIHlvdXIgb3duIEdQVUFkYXB0ZXIsIHVzZSBpdCB0byBjcmVhdGUgYSBHUFVEZXZpY2UgaW5zdGFuY2UgYW5kIHNldCB7QGxpbmsgZGV2aWNlfSBwcm9wZXJ0eSBpZlxuICAgICAqIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHBvd2VyIHByZWZlcmVuY2UuXG4gICAgICovXG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgZm9yY2UgZmFsbGJhY2sgYWRhcHRlciBmbGFnLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgQ3JlYXRlIHlvdXIgb3duIEdQVUFkYXB0ZXIsIHVzZSBpdCB0byBjcmVhdGUgYSBHUFVEZXZpY2UgaW5zdGFuY2UgYW5kIHNldCB7QGxpbmsgZGV2aWNlfSBwcm9wZXJ0eSBpZlxuICAgICAqIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIGZhbGxiYWNrIG9wdGlvbi5cbiAgICAgKi9cbiAgICBmb3JjZUZhbGxiYWNrQWRhcHRlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgYWRhcHRlciBmb3IgV2ViR1BVLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgdGhlIEdQVSBhZGFwdGVyIGZvciB0aGUgdW5kZXJseWluZyBXZWJHUFUgYmFja2VuZCB0byBjcmVhdGUgR1BVIGRldmljZS5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgcHJvcGVydHkgaXMgbm90IHNldCwgaXQgd2lsbCBiZSBhdmFpbGFibGUgdG8gZ2V0IGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlXG4gICAgICogdmFsdWUgd2lsbCBiZSB0aGUgR1BVIGFkYXB0ZXIgdGhhdCBjcmVhdGVkIGJ5IHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kLlxuICAgICAqXG4gICAgICogV2hlbiB1c2Ugd2l0aCBUeXBlU2NyaXB0LCB0aGUgdHlwZSBvZiB0aGlzIHByb3BlcnR5IGlzIGBHUFVBZGFwdGVyYCBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgSXQgaXMgbm8gbG9uZ2VyIHJlY29tbWVuZGVkIHRvIHVzZSB0aGlzIHByb3BlcnR5LiBUaGUgbGF0ZXN0IFdlYkdQVSBzcGVjIGFkZHMgYEdQVURldmljZS5hZGFwdGVySW5mb2BcbiAgICAgKiAoaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmdwdS8jZG9tLWdwdWRldmljZS1hZGFwdGVyaW5mbyksIHdoaWNoIGFsbG93cyB0byBnZXQgdGhlIGFkYXB0ZXIgaW5mb3JtYXRpb24gZnJvbSB0aGVcbiAgICAgKiBkZXZpY2UuIFdoZW4gaXQncyBhdmFpbGFibGUsIHRoZXJlIGlzIG5vIG5lZWQgdG8gc2V0L2dldCB0aGUge0BsaW5rIGFkYXB0ZXJ9IHByb3BlcnR5LlxuICAgICAqL1xuICAgIGFkYXB0ZXI6IFRyeUdldEdsb2JhbFR5cGU8J0dQVUFkYXB0ZXInPjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBHUFUgZGV2aWNlIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBUaGVyZSBhcmUgMyB2YWxpZCBzY2VuYXJpb3Mgb2YgYWNjZXNzaW5nIHRoaXMgcHJvcGVydHk6XG4gICAgICogLSBTZXQgYSB2YWx1ZSBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZSB1c2VkIGJ5IHRoZSBXZWJHUFUgYmFja2VuZFxuICAgICAqIHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zLiBJZiB0aGUgdmFsdWUgaXMgbm90IGEgYEdQVURldmljZWAgb2JqZWN0LCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAgICAgKiAtIEdldCB0aGUgdmFsdWUgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhpcyB3aWxsIHRyeSB0byBjcmVhdGUgYSBuZXcgR1BVRGV2aWNlXG4gICAgICogaW5zdGFuY2UuIFJldHVybnMgYSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB0byBhIGBHUFVEZXZpY2VgIG9iamVjdC5cbiAgICAgKiAtIEdldCB0aGUgdmFsdWUgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBSZXR1cm5zIGEgcmVzb2x2ZWQgYFByb21pc2VgIHRvIHRoZVxuICAgICAqIGBHUFVEZXZpY2VgIG9iamVjdCB1c2VkIGJ5IHRoZSBXZWJHUFUgYmFja2VuZC5cbiAgICAgKi9cbiAgICBnZXQgZGV2aWNlKCk6IFByb21pc2U8VHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz4+O1xuICAgIHNldCBkZXZpY2UodmFsdWU6IFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+KTtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgdmFsaWRhdGUgaW5wdXQgY29udGVudC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHZhbGlkYXRlSW5wdXRDb250ZW50PzogYm9vbGVhbjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudiB7XG4gIC8qKlxuICAgKiBzZXQgdGhlIHNldmVyaXR5IGxldmVsIGZvciBsb2dnaW5nLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGAnd2FybmluZydgXG4gICAqL1xuICBsb2dMZXZlbD86ICd2ZXJib3NlJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnZmF0YWwnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZSB3aGV0aGVyIHJ1biBpbiBkZWJ1ZyBtb2RlLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSB0cmFjZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICB0cmFjZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEdldCB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IHBhY2thZ2UuXG4gICAqL1xuICByZWFkb25seSB2ZXJzaW9uczoge1xuICAgIHJlYWRvbmx5IGNvbW1vbjogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHdlYj86IHN0cmluZztcbiAgICByZWFkb25seSBub2RlPzogc3RyaW5nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICByZWFkb25seSAncmVhY3QtbmF0aXZlJz86IHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJBc3NlbWJseVxuICAgKi9cbiAgcmVhZG9ubHkgd2FzbTogRW52LldlYkFzc2VtYmx5RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR0xcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdsOiBFbnYuV2ViR0xGbGFncztcblxuICAvKipcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHUFVcbiAgICovXG4gIHJlYWRvbmx5IHdlYmdwdTogRW52LldlYkdwdUZsYWdzO1xuXG4gIFtuYW1lOiBzdHJpbmddOiB1bmtub3duO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBhcyBhIGdsb2JhbCBzaW5nbGV0b24uXG4gKi9cbmV4cG9ydCBjb25zdCBlbnY6IEVudiA9IGVudkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci50b0RhdGFVUkwoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVG9EYXRhVVJMID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSA6IG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gIGNhbnZhcy53aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xuICBjYW52YXMuaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzXG4gICAgfCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICB8IE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIHwgbnVsbDtcblxuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWZhdWx0IGxheW91dCBpcyBOQ1dIXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zPy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAwXTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLFxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcblxuICAgIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgY29uc3QgUiA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAvLyBSIHZhbHVlXG4gICAgICAgIGNvbnN0IEcgPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxuICAgICAgICBjb25zdCBCID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07IC8vIEIgdmFsdWVcbiAgICAgICAgY29uc3QgQSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/IDI1NSA6ICgodGVuc29yLmRhdGFbYVRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzNdKSAqIG5vcm1NZWFuWzNdOyAvLyBBIHZhbHVlXG5cbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFJlY3QoaiwgaSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndG9EYXRhVVJMJyBpbiBjYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9EYXRhVVJMIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID1cbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcbiAgICAgIDogKG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMjU1XTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAoY2hhbm5lbHMgPT09IDMgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJylcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgY29uc3Qgc3RlcCA9IDQ7XG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxuICAgICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgICBiSW1hZ2VQb2ludGVyID0gMixcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgaW1hZ2UgPSBwaXhlbHMyRENvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgPCBoZWlnaHQgKiB3aWR0aDtcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXG4gICAgKSB7XG4gICAgICBpbWFnZS5kYXRhW3JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICBpbWFnZS5kYXRhW2FJbWFnZVBvaW50ZXJdID1cbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgT3B0aW9uc0RpbWVuc2lvbnMsXG4gIE9wdGlvbnNGb3JtYXQsXG4gIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9ucyxcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2UgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBidWZmZXIgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBoZWlnaHQgYW5kIHdpZHRoIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOSFdDIFRlbnNvciBsYXlvdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICB9IGVsc2Uge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcyFbMF0sIG5vcm0uYmlhcyFbMV0sIG5vcm0uYmlhcyFbMl0sIG5vcm0uYmlhcyFbM10gPz8gMF07XG4gIH1cblxuICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0JBJztcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XG5cbiAgY29uc3Qgb3V0cHV0Zm9ybWF0ID1cbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsXG4gICAgckltYWdlUG9pbnRlciA9IDAsXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgYkltYWdlUG9pbnRlciA9IDIsXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgc3RlcCA9IDM7XG4gICAgckltYWdlUG9pbnRlciA9IDA7XG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XG4gICAgYkltYWdlUG9pbnRlciA9IDI7XG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xuICB9XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfVxuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBzdHJpZGU7XG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcbiAgKSB7XG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XG4gICAgfVxuICB9XG5cbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xuICAgICAgPyBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCA0LCBoZWlnaHQsIHdpZHRoXSlcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXG4gIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gIG9wdGlvbnM/OlxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yPiA9PiB7XG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIEltYWdlRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcblxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmICh0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfSBlbHNlIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGlucHV0IGNvbmZpZyBmb3JtYXQgbXVzdCBiZSBSR0JBIGZvciBIVE1MSW1hZ2VFbGVtZW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfVxuXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlRGF0YUVsZSkge1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuZm9ybWF0ID0gJ1JHQkEnO1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG5cbiAgICAgIHRlbXBDYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KHRlbXBDYW52YXMpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuICAgICAgaWYgKCFpbWFnZSB8fCAhY29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgbmV3SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgIG5ld0ltYWdlLnNyYyA9IGltYWdlO1xuICAgICAgbmV3SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMud2lkdGggPSBuZXdJbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5ld0ltYWdlLmhlaWdodDtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobmV3SW1hZ2UsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgcmVzb2x2ZShidWZmZXJUb1RlbnNvcihpbWcuZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21UZXh0dXJlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tVGV4dHVyZSA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIC8vIEFsd2F5cyBhc3N1bWUgUkdCQUYzMi4gVE9ETzogc3VwcG9ydCBkaWZmZXJlbnQgdGV4dHVyZSBmb3JtYXRcbiAgY29uc3QgZGltcyA9IFsxLCBoZWlnaHQsIHdpZHRoLCA0XTtcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gIGdwdUJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbU1MVGVuc29yKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tTUxUZW5zb3IgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXG4gIG1sVGVuc29yOiBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdtbC10ZW5zb3InLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIG1sVGVuc29yLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICB0eXBlOiBULFxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcjtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXG4gIFsndWludDgnLCBVaW50OEFycmF5XSxcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxuICBbJ3VpbnQ0JywgVWludDhBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50L0Zsb2F0MTZBcnJheSBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQvRmxvYXQxNkFycmF5XG4vLyBwb2x5ZmlsbCBpZiBhdmFpbGFibGUuXG5sZXQgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZWRBcnJheSA9ICgpID0+IHtcbiAgaWYgKCFpc1R5cGVkQXJyYXlDaGVja2VkKSB7XG4gICAgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ0ludDY0QXJyYXkuZnJvbTtcbiAgICBjb25zdCBpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdVaW50NjRBcnJheS5mcm9tO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IEZsb2F0MTZBcnJheSA9IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5O1xuICAgIGNvbnN0IGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb207XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBGbG9hdDE2QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoRmxvYXQxNkFycmF5LCAnZmxvYXQxNicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBGbG9hdDE2QXJyYXkgaXMgbm90IGF2YWlsYWJsZSwgdXNlICdVaW50MTZBcnJheScgdG8gc3RvcmUgdGhlIGRhdGEuXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIFVpbnQxNkFycmF5KTtcbiAgICB9XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7XG4gIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcblxuLyoqXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXG4gKlxuICogQHBhcmFtIGRpbXMgdGhlIGRpbXMgYXJyYXkuIE1heSBiZSBhbiBpbGxlZ2FsIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xuICBsZXQgc2l6ZSA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XG4gICAgaWYgKHR5cGVvZiBkaW0gIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgaWYgKGRpbSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgc2l6ZSAqPSBkaW07XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5yZXNoYXBlKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcbiAgICAgICAgZGF0YTogdGVuc29yLmRhdGEgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWydkYXRhJ10sXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAndGV4dHVyZScsXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ21sLXRlbnNvcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnbWwtdGVuc29yJyxcbiAgICAgICAgbWxUZW5zb3I6IHRlbnNvci5tbFRlbnNvcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyB0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHtcbiAgdGVuc29yRnJvbUdwdUJ1ZmZlcixcbiAgdGVuc29yRnJvbUltYWdlLFxuICB0ZW5zb3JGcm9tTUxUZW5zb3IsXG4gIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsXG4gIHRlbnNvckZyb21UZXh0dXJlLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xuaW1wb3J0IHtcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zLFxuICBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7XG4gIGNoZWNrVHlwZWRBcnJheSxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheSxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyxcbn0gZnJvbSAnLi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcuanMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZSB9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xudHlwZSBUZW5zb3JNTFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgdHlwZTogVGVuc29yVHlwZSxcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy4gVHlwZSBpcyBpbmZlcnJlZCBmcm9tIGRhdGEuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJOTiBNTFRlbnNvciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbWwtdGVuc29yJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcblxuICAvKipcbiAgICogaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcmcwOlxuICAgICAgfCBUZW5zb3JUeXBlXG4gICAgICB8IFRlbnNvckRhdGFUeXBlXG4gICAgICB8IFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgICB8IHJlYWRvbmx5IHN0cmluZ1tdXG4gICAgICB8IHJlYWRvbmx5IGJvb2xlYW5bXVxuICAgICAgfCBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1xuICAgICAgfCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgYXJnMT86IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGFyZzI/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKSB7XG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50L0Zsb2F0MTZBcnJheSBzdXBwb3J0XG4gICAgY2hlY2tUeXBlZEFycmF5KCk7XG5cbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxuICAgICAgLy9cbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Jvb2wnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NCdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gYXJnMC5ncHVCdWZmZXI7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDE2JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDY0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdib29sJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDQnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBNTFRlbnNvcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1sVGVuc29yRGF0YSA9IGFyZzAubWxUZW5zb3I7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMSB8IHR5cGVvZiBhcmcyO1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBhcmcwIGlzIHR5cGUgb3IgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IodHlwZSwgZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICB0eXBlID0gYXJnMDtcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMjtcbiAgICAgICAgaWYgKGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgc3RyaW5nIHRlbnNvcidzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIGRvbid0IGNoZWNrIHdoZXRoZXIgZXZlcnkgZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgc3RyaW5nOyB0aGlzIGlzIHRvbyBzbG93LiB3ZSBhc3N1bWUgaXQncyBjb3JyZWN0IGFuZFxuICAgICAgICAgIC8vIGVycm9yIHdpbGwgYmUgcG9wdWxhdGVkIGF0IGluZmVyZW5jZVxuICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG51bWVyaWMgdGVuc29yXG4gICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQoYXJnMCk7XG4gICAgICAgICAgaWYgKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0ZW5zb3IgdHlwZTogJHthcmcwfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIGlmICgoYXJnMCA9PT0gJ2Zsb2F0MTYnICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHx8IGFyZzAgPT09ICd1aW50NCcgfHwgYXJnMCA9PT0gJ2ludDQnKSB7XG4gICAgICAgICAgICAgIC8vIC0gJ2Zsb2F0MTYnOlxuICAgICAgICAgICAgICAvLyAgIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gICBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vICAgZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyAgIFVpbnQxNkFycmF5LmZyb20oYXJnMSkgd2hpY2ggZ2VuZXJhdGVzIHdyb25nIGRhdGEuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIC0gJ3VpbnQ0JyBhbmQgJ2ludDQnOlxuICAgICAgICAgICAgICAvLyAgIFVpbnQ4QXJyYXkuZnJvbShhcmcxKSB3aWxsIGdlbmVyYXRlIHdyb25nIGRhdGEgZm9yICd1aW50NCcgYW5kICdpbnQ0JyB0ZW5zb3IuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYENyZWF0aW5nIGEgJHthcmcwfSB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfSBhcyBkYXRhLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcbiAgICAgICAgICAgICAgLy8gdXNlICdhcyBhbnknIGhlcmUgYmVjYXVzZTpcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcbiAgICAgICAgICAgICAgLy8gMi4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHVuaW9uIHR5cGUgb2YgJyhCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcikuZnJvbSgpJ1xuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxuICAgICAgICAgICAgICAvLyB0eXBlLlxuXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cblxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAndWludDgnKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBIFVpbnQ4Q2xhbXBlZEFycmF5IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mIHVpbnQ4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAnZmxvYXQxNicgJiYgYXJnMSBpbnN0YW5jZW9mIFVpbnQxNkFycmF5ICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPT0gVWludDE2QXJyYXkpIHtcbiAgICAgICAgICAgIC8vIHdoZW4gRmxvYXQxNkFycmF5IGlzIGF2YWlsYWJsZSBhbmQgZGF0YSBpcyBvZiB0eXBlIFVpbnQxNkFycmF5LlxuICAgICAgICAgICAgLy8gV2UgYWxsb3cgVWludDE2QXJyYXkgdG8gYmUgcGFzc2VkIGluIGFzIGRhdGEgZm9yICdmbG9hdDE2JyB0ZW5zb3IgdW50aWwgRmxvYXQxNkFycmF5IGlzIGdlbmVyYWxseVxuICAgICAgICAgICAgLy8gc3VwcG9ydGVkIGluIEphdmFTY3JpcHQgZW52aXJvbm1lbnQuXG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gbmV3IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5KGFyZzEuYnVmZmVyLCBhcmcxLmJ5dGVPZmZzZXQsIGFyZzEubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICB0eXBlID0gJ3VpbnQ4JztcbiAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0ZW5zb3IgdHlwZSBmcm9tIFR5cGVkQXJyYXlcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID0gTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoXG4gICAgICAgICAgICBhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlIGFuZCBkYXRhIGlzIHByb2Nlc3NlZCwgbm93IHByb2Nlc3NpbmcgZGltc1xuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxuICAgICAgICBtYXliZURpbXMgPSBbZGF0YS5sZW5ndGhdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHRlbnNvcidzIGRpbXMgbXVzdCBiZSBhIG51bWJlciBhcnJheVwiKTtcbiAgICAgIH1cbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xuICAgIC8vIGlmIGRhdGEgaXMgb24gQ1BVLCBjaGVjayB3aGV0aGVyIGRhdGEgbGVuZ3RoIG1hdGNoZXMgdGVuc29yIHNpemVcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgIGlmICgodHlwZSA9PT0gJ3VpbnQ0JyB8fCB0eXBlID09PSAnaW50NCcpICYmIE1hdGguY2VpbChzaXplIC8gMikgPT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gZm9yICh1KWludDQsIHRoZSBkYXRhIGxlbmd0aCBpcyBoYWxmIG9mIHRoZSB0ZW5zb3Igc2l6ZS4gU28gd2UgY2hlY2sgdGhpcyBzcGVjaWFsIGNhc2Ugd2hlbiBzaXplIGlzIG9kZC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGltcyA9IGRpbXM7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXG4gICAgaW1hZ2U6IEltYWdlRGF0YSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBJbWFnZUJpdG1hcCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzpcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xuICAgICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUltYWdlKGltYWdlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JHcHVCdWZmZXJUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JEYXRhVHlwZXM+KFxuICAgIG1sVGVuc29yOiBUZW5zb3JNTFRlbnNvclR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbU1MVGVuc29yKG1sVGVuc29yLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcbiAgICB0eXBlOiBULFxuICAgIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVGVuc29yIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgV2ViTk4gTUxUZW5zb3Igd2hlbiBsb2NhdGlvbiBpcyAnbWwtdGVuc29yJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBtbFRlbnNvckRhdGE/OiBUZW5zb3JNTFRlbnNvclR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcblxuICAvKipcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuXG4gIGdldCBtbFRlbnNvcigpOiBUZW5zb3JNTFRlbnNvclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMubWxUZW5zb3JEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJOTiBNTFRlbnNvci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWxUZW5zb3JEYXRhO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGhvZHNcblxuICBhc3luYyBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+IHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgc3dpdGNoICh0aGlzLmRhdGFMb2NhdGlvbikge1xuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1sVGVuc29yRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yRmFjdG9yeSB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckltcGwgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFR5cGVkVGVuc29yVXRpbHMgfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBpbiBhIFdlYk5OIE1MVGVuc29yLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmV0dXJucyB0aGUgZGF0YSBpbW1lZGlhdGVseS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCBkb3dubG9hZHMgdGhlIGRhdGEgYW5kIHJldHVybnMgdGhlIHByb21pc2UuXG4gICAqXG4gICAqIEBwYXJhbSByZWxlYXNlRGF0YSAtIHdoZXRoZXIgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuIElnbm9yZSBpZiBkYXRhIGlzIGFscmVhZHkgb24gQ1BVLlxuICAgKi9cbiAgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJlbW92ZSBpdHMgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuXG4gICAqXG4gICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHRlbnNvciBpcyBjb25zaWRlcmVkIG5vIGxvbmdlciB2YWxpZC4gSXRzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdub25lJy5cbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRlbnNvciB7XG4gIGludGVyZmFjZSBEYXRhVHlwZU1hcCB7XG4gICAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xuICAgIHVpbnQ4OiBVaW50OEFycmF5O1xuICAgIGludDg6IEludDhBcnJheTtcbiAgICB1aW50MTY6IFVpbnQxNkFycmF5O1xuICAgIGludDE2OiBJbnQxNkFycmF5O1xuICAgIGludDMyOiBJbnQzMkFycmF5O1xuICAgIGludDY0OiBCaWdJbnQ2NEFycmF5O1xuICAgIHN0cmluZzogc3RyaW5nW107XG4gICAgYm9vbDogVWludDhBcnJheTtcbiAgICBmbG9hdDE2OiBVaW50MTZBcnJheTsgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xuICAgIHVpbnQ2NDogQmlnVWludDY0QXJyYXk7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IFVpbnQ4QXJyYXk7XG4gICAgaW50NDogSW50OEFycmF5O1xuICB9XG5cbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBudW1iZXI7XG4gICAgdWludDg6IG51bWJlcjtcbiAgICBpbnQ4OiBudW1iZXI7XG4gICAgdWludDE2OiBudW1iZXI7XG4gICAgaW50MTY6IG51bWJlcjtcbiAgICBpbnQzMjogbnVtYmVyO1xuICAgIGludDY0OiBiaWdpbnQ7XG4gICAgc3RyaW5nOiBzdHJpbmc7XG4gICAgYm9vbDogYm9vbGVhbjtcbiAgICBmbG9hdDE2OiBudW1iZXI7IC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBudW1iZXI7XG4gICAgdWludDMyOiBudW1iZXI7XG4gICAgdWludDY0OiBiaWdpbnQ7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IG51bWJlcjtcbiAgICBpbnQ0OiBudW1iZXI7XG4gIH1cblxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XG4gIHR5cGUgRWxlbWVudFR5cGUgPSBFbGVtZW50VHlwZU1hcFtUeXBlXTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic7XG5cbiAgdHlwZSBHcHVCdWZmZXJUeXBlRmFsbGJhY2sgPSB7IHNpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJyB9O1xuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J0dQVUJ1ZmZlcicsIEdwdUJ1ZmZlclR5cGVGYWxsYmFjaz47XG5cbiAgdHlwZSBNTFRlbnNvclR5cGVGYWxsYmFjayA9IHsgZGVzdHJveSgpOiB2b2lkIH07XG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWNhdGlvbiBmb3IgV2ViTk4ncyBNTFRlbnNvciBpcyBjdXJyZW50bHkgaW4gZmx1eC5cbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J01MVGVuc29yJywgTUxUZW5zb3JUeXBlRmFsbGJhY2s+O1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMicgfCAnZmxvYXQxNicgfCAnaW50MzInIHwgJ2ludDY0JyB8ICd1aW50MzInIHwgJ3VpbnQ4JyB8ICdib29sJztcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yRGF0YVR5cGVzID1cbiAgICB8ICdmbG9hdDMyJ1xuICAgIHwgJ2Zsb2F0MTYnXG4gICAgfCAnaW50OCdcbiAgICB8ICd1aW50OCdcbiAgICB8ICdpbnQzMidcbiAgICB8ICd1aW50MzInXG4gICAgfCAnaW50NjQnXG4gICAgfCAndWludDY0J1xuICAgIHwgJ2Jvb2wnXG4gICAgfCAndWludDQnXG4gICAgfCAnaW50NCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJyB8ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiByZXByZXNlbnQgdGhlIGRhdGEgdHlwZSBvZiBhIHRlbnNvclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIERhdGFUeXBlTWFwO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVkVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4gZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VD4sIFR5cGVkVGVuc29yVXRpbHM8VD4ge31cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yIGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFRlbnNvci5UeXBlPiwgVHlwZWRUZW5zb3JVdGlsczxUZW5zb3IuVHlwZT4ge31cblxuLyoqXG4gKiB0eXBlIFRlbnNvckNvbnN0cnVjdG9yIGRlZmluZXMgdGhlIGNvbnN0cnVjdG9ycyBvZiAnVGVuc29yJyB0byBjcmVhdGUgQ1BVIHRlbnNvciBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yQ29uc3RydWN0b3IgZXh0ZW5kcyBUZW5zb3JGYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddIHwgcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoXG4gICAgdHlwZTogJ2Jvb2wnLFxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSBhIFVpbnQ4Q2xhbXBlZEFycmF5LCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3ICh0eXBlOiAndWludDgnLCBkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJyB8ICdib29sJyB8ICd1aW50NjQnIHwgJ2ludDY0Jz4+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiBUZW5zb3IuVHlwZSxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGUgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3I7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgVGVuc29yQ29uc3RydWN0b3I7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XG59O1xuXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xuICAgICAgaWYgKGV4dHJhTXNnKSB7XG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcbiAgICAgIH1cbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9CRUdJTiA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZShgT1JUOjoke2V4dHJhTXNnfWApO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLnRpbWVFbmQoYE9SVDo6JHtleHRyYU1zZ31gKTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVFJBQ0VfRlVOQ19CRUdJTiwgVFJBQ0VfRlVOQ19FTkQsIFRSQUNFX0VWRU5UX0JFR0lOLCBUUkFDRV9FVkVOVF9FTkQgfSBmcm9tICcuL3RyYWNlLmpzJztcblxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuU2Vzc2lvbk9wdGlvbnM7XG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJ1bk9wdGlvbnM7XG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmVlZHNUeXBlO1xudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmV0Y2hlc1R5cGU7XG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJldHVyblR5cGU7XG5cbmV4cG9ydCBjbGFzcyBJbmZlcmVuY2VTZXNzaW9uIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW4oZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgY29uc3QgZmV0Y2hlczogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCInZmVlZHMnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYSBUZW5zb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlICdmZXRjaGVzJyBvciAnb3B0aW9ucycuXCIpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICBhcmcwOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5LFxuICAgIGFyZzE/OiBTZXNzaW9uT3B0aW9ucyB8IG51bWJlcixcbiAgICBhcmcyPzogbnVtYmVyLFxuICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCdJbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZScpO1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nIHwgVWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZU9mZnNldCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZU9mZnNldCcgaXMgb3V0IG9mIHJhbmdlIFswLCAke2J1ZmZlci5ieXRlTGVuZ3RofSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGFuIGludGVnZXIuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlICdwYXRoJyBvciAnYnVmZmVyJy5cIik7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBiYWNrZW5kLCB1cGRhdGUgc2Vzc2lvbiBvcHRpb25zIHdpdGggdmFsaWRhdGVkIEVQcywgYW5kIGNyZWF0ZSBzZXNzaW9uIGhhbmRsZXJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24uY3JlYXRlJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcbiAgfVxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xuICB9XG5cbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBnZXQgaW5wdXRNZXRhZGF0YSgpOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlZhbHVlTWV0YWRhdGFbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE1ldGFkYXRhO1xuICB9XG5cbiAgZ2V0IG91dHB1dE1ldGFkYXRhKCk6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuVmFsdWVNZXRhZGF0YVtdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE1ldGFkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcjtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbCB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XG5pbXBvcnQgeyBPbm54TW9kZWxPcHRpb25zIH0gZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSwgT25ueFZhbHVlRGF0YUxvY2F0aW9uIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB0eXBlIHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcblxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG5cbiAgLyoqXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcmVtYXJrXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxuICAgKiB1c2VkIGFzIGEgcHJlLWFsbG9jYXRlZCB2YWx1ZSBieSB0aGUgaW5mZXJlbmNlIGVuZ2luZTsgaWYgb21pdHRlZCwgaW5mZXJlbmNlIGVuZ2luZSB3aWxsIGFsbG9jYXRlIGJ1ZmZlclxuICAgKiBpbnRlcm5hbGx5LlxuICAgKi9cbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHJlYWRvbmx5IHN0cmluZ1tdIHwgTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGluZmVyZW5jaW5nIHJldHVybiB0eXBlIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc2Vzc2lvbiBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBzZXNzaW9uIGJlaGF2aW9yLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyBleHRlbmRzIE9ubnhNb2RlbE9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQW4gZXhlY3V0aW9uIHByb3ZpZGVyIG9wdGlvbiBjYW4gYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgbmFtZSBvZiB0aGUgZXhlY3V0aW9uIHByb3ZpZGVyLFxuICAgICAqIG9yIGFuIG9iamVjdCBvZiBjb3JyZXNwb25kaW5nIHR5cGUuXG4gICAgICovXG4gICAgZXhlY3V0aW9uUHJvdmlkZXJzPzogcmVhZG9ubHkgRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRyYSBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludHJhT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVyIE9QIHRocmVhZHMgbnVtYmVyLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgaW50ZXJPcE51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZnJlZURpbWVuc2lvbk92ZXJyaWRlcz86IHsgcmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlciB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGltaXphdGlvbiBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBncmFwaE9wdGltaXphdGlvbkxldmVsPzogJ2Rpc2FibGVkJyB8ICdiYXNpYycgfCAnZXh0ZW5kZWQnIHwgJ2xheW91dCcgfCAnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJztcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXplZCBtb2RlbCBmaWxlIHBhdGguXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHNldHRpbmcgaXMgc3BlY2lmaWVkLCB0aGUgb3B0aW1pemVkIG1vZGVsIHdpbGwgYmUgZHVtcGVkLiBJbiBicm93c2VyLCBhIGJsb2Igd2lsbCBiZSBjcmVhdGVkXG4gICAgICogd2l0aCBhIHBvcC11cCB3aW5kb3cuXG4gICAgICovXG4gICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHN0cmluZyBhcyBhIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGZvciBhbGwgb3V0cHV0cywgb3IgYW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBhXG4gICAgICogcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHTCBhbmQgV2ViR1BVIEVQLlxuICAgICAqL1xuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9uIHwgeyByZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9uIH07XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBncmFwaCBjYXB0dXJlLlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBlbmFibGVHcmFwaENhcHR1cmU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfc2Vzc2lvbl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBleHRyYToge1xuICAgICAqICAgc2Vzc2lvbjoge1xuICAgICAqICAgICBzZXRfZGVub3JtYWxfYXNfemVybzogXCIxXCIsXG4gICAgICogICAgIGRpc2FibGVfcHJlcGFja2luZzogXCIxXCJcbiAgICAgKiAgIH0sXG4gICAgICogICBvcHRpbWl6YXRpb246IHtcbiAgICAgKiAgICAgZW5hYmxlX2dlbHVfYXBwcm94aW1hdGlvbjogXCIxXCJcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIC8vICNyZWdpb24gZXhlY3V0aW9uIHByb3ZpZGVyc1xuXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcbiAgLy8gQmFja2VuZCBOb2RlLmpzIGJpbmRpbmc6IHN1cHBvcnRzICdjcHUnLCAnZG1sJyAod2luMzIpLCAnY29yZW1sJyAobWFjT1MpIGFuZCAnY3VkYScgKGxpbnV4KS5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3dlYmdwdScgYW5kICd3ZWJubicuXG4gIC8vIEJhY2tlbmQgT05OWC5qczogc3VwcG9ydHMgJ3dlYmdsJy5cbiAgLy8gQmFja2VuZCBSZWFjdCBOYXRpdmU6IHN1cHBvcnRzICdjcHUnLCAneG5ucGFjaycsICdjb3JlbWwnIChpT1MpLCAnbm5hcGknIChBbmRyb2lkKS5cbiAgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwIHtcbiAgICBjb3JlbWw6IENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGNwdTogQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgY3VkYTogQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGRtbDogRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgdGVuc29ycnQ6IFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2FzbTogV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJnbDogV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJncHU6IFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHFubjogUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICB9XG5cbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlck5hbWUgPSBrZXlvZiBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcDtcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcFtFeGVjdXRpb25Qcm92aWRlck5hbWVdXG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvblxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJOYW1lXG4gICAgfCBzdHJpbmc7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NwdSc7XG4gICAgdXNlQXJlbmE/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjdWRhJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdkbWwnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAndGVuc29ycnQnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2FzbSc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJnbCc7XG4gICAgLy8gVE9ETzogYWRkIGZsYWdzXG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBYbm5wYWNrRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3hubnBhY2snO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdwdSc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBwcmVmZXJyZWQgbGF5b3V0IHdoZW4gcnVubmluZyBsYXlvdXQgc2Vuc2l0aXZlIG9wZXJhdG9ycy5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0ICdOQ0hXJ1xuICAgICAqL1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJyB8ICdOSFdDJztcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBsaXN0IG9mIG5vZGUgbmFtZXMgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgb24gQ1BVIGV2ZW4gd2hlbiBXZWJHUFUgRVAgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBmb3JjZUNwdU5vZGVOYW1lcz86IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgdmFsaWRhdGlvbiBtb2RlIGZvciBXZWJHUFUgZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgICAqIC0gJ2Rpc2FibGVkJzogRGlzYWJsZSBhbGwgdmFsaWRhdGlvbi5cbiAgICAgKiBXaGVuIHVzZWQgaW4gTm9kZS5qcywgZGlzYWJsZSB2YWxpZGF0aW9uIG1heSBjYXVzZSBwcm9jZXNzIGNyYXNoIGlmIFdlYkdQVSBlcnJvcnMgb2NjdXIuIEJlIGNhdXRpb3VzIHdoZW4gdXNpbmdcbiAgICAgKiB0aGlzIG1vZGUuXG4gICAgICogV2hlbiB1c2VkIGluIHdlYiwgdGhpcyBtb2RlIGlzIGVxdWl2YWxlbnQgdG8gJ3dncHVPbmx5Jy5cbiAgICAgKiAtICd3Z3B1T25seSc6IFBlcmZvcm0gV2ViR1BVIGludGVybmFsIHZhbGlkYXRpb24gb25seS5cbiAgICAgKiAtICdiYXNpYyc6IFBlcmZvcm0gYmFzaWMgdmFsaWRhdGlvbiBpbmNsdWRpbmcgV2ViR1BVIGludGVybmFsIHZhbGlkYXRpb24uIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kZS5cbiAgICAgKiAtICdmdWxsJzogUGVyZm9ybSBmdWxsIHZhbGlkYXRpb24uIFRoaXMgbW9kZSBtYXkgaGF2ZSBwZXJmb3JtYW5jZSBpbXBhY3QuIFVzZSBpdCBmb3IgZGVidWdnaW5nIHB1cnBvc2UuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCAnYmFzaWMnXG4gICAgICovXG4gICAgdmFsaWRhdGlvbk1vZGU/OiAnZGlzYWJsZWQnIHwgJ3dncHVPbmx5JyB8ICdiYXNpYycgfCAnZnVsbCc7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGFuIG9wdGlvbmFsIFdlYkdQVSBkZXZpY2UgdG8gYmUgdXNlZCBieSB0aGUgV2ViR1BVIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAgICAgKi9cbiAgICBkZXZpY2U/OiBUcnlHZXRHbG9iYWxUeXBlPCdHUFVEZXZpY2UnPjtcbiAgfVxuXG4gIC8vICNyZWdpb24gV2ViTk4gb3B0aW9uc1xuXG4gIGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2Vibm4nO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBXZWJOTiBNTENvbnRleHQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkaWN0ZGVmLW1sY29udGV4dG9wdGlvbnNcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRnJlZURpbWVuc2lvbkJvdW5kIHtcbiAgICBtaW5TaXplPzogbnVtYmVyO1xuICAgIG1heFNpemU6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgZGV2aWNlVHlwZT86ICdjcHUnIHwgJ2dwdScgfCAnbnB1JztcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdkZWZhdWx0JyB8ICdsb3ctcG93ZXInIHwgJ2hpZ2gtcGVyZm9ybWFuY2UnO1xuICAgIGZyZWVEaW1lbnNpb25Cb3VuZHM/OiB7IHJlYWRvbmx5IFtkaW1lbnNpb25OYW1lOiBzdHJpbmddOiBGcmVlRGltZW5zaW9uQm91bmQgfTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBHcm91cFF1ZXJ5QXR0ZW50aW9uIChHUUEpIG9wIHVzZXMgYSBzdGF0ZWZ1bCBjb25jYXQtYmFzZWQgS1YtY2FjaGUgc3RyYXRlZ3k6XG4gICAgICogcHJlc2VudF9rdiA9IGNvbmNhdChwYXN0X2t2LCBuZXdfa3YpLiBUaGUgY2FjaGUgZ3Jvd3MgZWFjaCBkZWNvZGUgc3RlcC5cbiAgICAgKlxuICAgICAqIFdoZW4gZmFsc2UgKGRlZmF1bHQpLCBHUUEgdXNlcyBhIHN0YXRlbGVzcyBTY2F0dGVyTkQtYmFzZWQgc3RyYXRlZ3k6IG5ldyB0b2tlbnMgYXJlXG4gICAgICogc2NhdHRlcmVkIGludG8gYSBmaXhlZC1zaXplIHBhc3Rfa3YgYnVmZmVyIGF0IHRoZSBwb3NpdGlvbiBpbmRpY2F0ZWQgYnkgc2VxbGVuc19rLlxuICAgICAqIFRoaXMgaXMgc3VpdGFibGUgZm9yIG1vZGVscyB0aGF0IG1hbmFnZSB0aGUgS1YtY2FjaGUgZXh0ZXJuYWxseSAoZS5nLiwgdmlhIEkvTyBiaW5kaW5nKS5cbiAgICAgKi9cbiAgICBlbmFibGVDYXVzYWxMTT86IGJvb2xlYW47XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhvdXRNTENvbnRleHQgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSwgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgY29udGV4dD86IG5ldmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0LlxuICAgKlxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcbiAgICogY2hhbm5lbCBsYXlvdXQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSxcbiAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcbiAgICAgIFJlcXVpcmVkPFBpY2s8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPj4ge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0IHdoaWNoIGlzIGNyZWF0ZWQgZnJvbSBHUFVEZXZpY2UuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2ViR3B1IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICAgIGdwdURldmljZTogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz47XG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgKi9cbiAgZXhwb3J0IHR5cGUgV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiA9XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXZWJHcHU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgUU5OIGJhY2tlbmQgdHlwZS4gRS5nLiwgJ2NwdScgb3IgJ2h0cCcuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRQYXRoYC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0ICdodHAnXG4gICAgICovXG4gICAgYmFja2VuZFR5cGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIHBhdGggdG8gdGhlIFFOTiBiYWNrZW5kIGxpYnJhcnkuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRUeXBlYC5cbiAgICAgKi9cbiAgICBiYWNrZW5kUGF0aD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gZW5hYmxlIEhUUCBGUDE2IHByZWNpc2lvbi5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGVGcDE2UHJlY2lzaW9uPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxuICAgICAqIENPUkVNTF9GTEFHX0VOQUJMRV9PTl9TVUJHUkFQSCA9IDB4MDAyXG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9FTkFCTEVfREVWSUNFX1dJVEhfQU5FID0gMHgwMDRcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxuICAgICAqIENPUkVNTF9GTEFHX0NSRUFURV9NTFBST0dSQU0gPSAweDAxMFxuICAgICAqIENPUkVNTF9GTEFHX1VTRV9DUFVfQU5EX0dQVSA9IDB4MDIwXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBTZWUgaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Byb3ZpZGVycy9jb3JlbWwvY29yZW1sX3Byb3ZpZGVyX2ZhY3RvcnkuaCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogVGhpcyBmbGFnIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcpLlxuICAgICAqL1xuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byB1c2UgQ1BVIG9ubHkgaW4gQ29yZU1MIEVQLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIHVzZUNQVUFuZEdQVT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGVuYWJsZSBDb3JlTUwgRVAgb24gc3ViZ3JhcGguXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgZW5hYmxlT25TdWJncmFwaD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIG9ubHkgZW5hYmxlIENvcmVNTCBFUCBmb3IgQXBwbGUgZGV2aWNlcyB3aXRoIEFORSAoQXBwbGUgTmV1cmFsIEVuZ2luZSkuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgb25seUVuYWJsZURldmljZVdpdGhBTkU/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnbm5hcGknO1xuICAgIHVzZUZQMTY/OiBib29sZWFuO1xuICAgIHVzZU5DSFc/OiBib29sZWFuO1xuICAgIGNwdURpc2FibGVkPzogYm9vbGVhbjtcbiAgICBjcHVPbmx5PzogYm9vbGVhbjtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcnVuIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIGluZmVyZW5jZSBydW4gYmVoYXZpb3JcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUnVuT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUZXJtaW5hdGUgYWxsIGluY29tcGxldGUgT3J0UnVuIGNhbGxzIGFzIHNvb24gYXMgcG9zc2libGUgaWYgdHJ1ZVxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIHRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIHRhZyBmb3IgdGhlIFJ1bigpIGNhbGxzIHVzaW5nIHRoaXNcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICB0YWc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgcnVuIGNvbmZpZ3VyYXRpb24gZW50cnkuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3J1bl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBtZW1vcnk6IHtcbiAgICAgKiAgICAgZW5hYmxlX21lbW9yeV9hcmVuYV9zaHJpbmthZ2U6IFwiMVwiLFxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdmFsdWUgbWV0YWRhdGFcblxuICAvKipcbiAgICogVGhlIGNvbW1vbiBwYXJ0IG9mIHRoZSB2YWx1ZSBtZXRhZGF0YSB0eXBlIGZvciBib3RoIHRlbnNvciBhbmQgbm9uLXRlbnNvciB2YWx1ZXMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZhbHVlTWV0YWRhdGFCYXNlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3BlY2lmaWVkIGlucHV0IG9yIG91dHB1dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSBub24tdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBOb25UZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IHRydWU7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBUZW5zb3IuVHlwZTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNoYXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgc2hhcGUgaXMgbm90IGRlZmluZWQsIHRoZSB2YWx1ZSB3aWxsIGFuIGVtcHR5IGFycmF5LiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgYW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBzaGFwZVxuICAgICAqIG9mIHRoZSB0ZW5zb3IuIEVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgY2FuIGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nLiBJZiB0aGUgZWxlbWVudCBpcyBhIG51bWJlciwgaXQgcmVwcmVzZW50c1xuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGRpbWVuc2lvbiBzaXplLiBJZiB0aGUgZWxlbWVudCBpcyBhIHN0cmluZywgaXQgcmVwcmVzZW50cyBhIHN5bWJvbGljIGRpbWVuc2lvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBzaGFwZTogUmVhZG9ubHlBcnJheTxudW1iZXIgfCBzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdmFsdWUuXG4gICAqL1xuICBleHBvcnQgdHlwZSBWYWx1ZU1ldGFkYXRhID0gTm9uVGVuc29yVmFsdWVNZXRhZGF0YSB8IFRlbnNvclZhbHVlTWV0YWRhdGE7XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcblxuICAvKipcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxuICAgKi9cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvKipcbiAgICogRW5kIHByb2ZpbGluZy5cbiAgICovXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxuICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhIFVpbnQ4QXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBJbmZlcmVuY2VTZXNzaW9uOiBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSA9IEluZmVyZW5jZVNlc3Npb25JbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQgfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVyc2lvblV0aWxzIHtcbiAgLyoqXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIEByZXR1cm5zIGEgRGF0YVVSTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiBAcmV0dXJucyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yLCBUeXBlZFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgSW1hZ2VGb3JtYXQgPSAnUkdCJyB8ICdSR0JBJyB8ICdCR1InIHwgJ1JCRyc7XG5leHBvcnQgdHlwZSBJbWFnZVRlbnNvckxheW91dCA9ICdOSFdDJyB8ICdOQ0hXJztcblxuLy8gdGhlIGZvbGxvd2luZyByZWdpb24gY29udGFpbnMgdHlwZSBkZWZpbml0aW9ucyBmb3IgY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb24uXG5cbi8vICNyZWdpb24gdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb25cblxuLyoqXG4gKiByZXByZXNlbnQgY29tbW9uIHByb3BlcnRpZXMgb2YgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cbiAqL1xuaW50ZXJmYWNlIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZTogVDtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBHUFUgcmVzb3VyY2UuXG4gKi9cbmludGVyZmFjZSBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcbiAgLyoqXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZSB0ZW5zb3IgdHJlYXQgdGhlIEdQVSBkYXRhIGFzIGV4dGVybmFsIHJlc291cmNlLlxuICAgKi9cbiAgZG93bmxvYWQ/KCk6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXG4gICAqL1xuICBkaXNwb3NlPygpOiB2b2lkO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuQ3B1UGlubmVkRGF0YVR5cGVzID0gVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2NwdS1waW5uZWQnLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdjcHUtcGlubmVkJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIENQVSBwaW5uZWQgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9IFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAndGV4dHVyZScuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogJ3RleHR1cmUnO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0gVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdncHUtYnVmZmVyJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPSBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdtbC10ZW5zb3InLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJOTiBNTFRlbnNvciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xufVxuXG4vLyAjZW5kcmVnaW9uXG5cbi8vIHRoZSBmb2xsb3dpbmcgcmVnaW9uIGNvbnRhaW5zIHR5cGUgZGVmaW5pdGlvbnMgb2YgZWFjaCBpbmRpdmlkdWFsIG9wdGlvbnMuXG4vLyB0aGUgdGVuc29yIGZhY3RvcnkgZnVuY3Rpb25zIHVzZSBhIGNvbXBvc2l0aW9uIG9mIHRob3NlIG9wdGlvbnMgYXMgdGhlIHBhcmFtZXRlciB0eXBlLlxuXG4vLyAjcmVnaW9uIE9wdGlvbnMgZmllbGRzXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0Zvcm1hdCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCByZXByZXNlbnRlZCBpbiBSR0JBIGNvbG9yIHNwYWNlLlxuICAgKi9cbiAgZm9ybWF0PzogSW1hZ2VGb3JtYXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckZvcm1hdCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIG9wdGlvbiAnZm9ybWF0Jy4gV2hpbGUgb3B0aW9uICdmb3JtYXQnIHJlcHJlc2VudHMgdGhlIG9yaWdpbmFsIGltYWdlLCAndGVuc29yRm9ybWF0J1xuICAgKiByZXByZXNlbnRzIHRoZSB0YXJnZXQgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuIEEgdHJhbnNwb3NlIHdpbGwgYmUgcGVyZm9ybWVkIGlmIHRoZXkgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIHRlbnNvckZvcm1hdD86IEltYWdlRm9ybWF0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgZGF0YVR5cGU/OiAnZmxvYXQzMicgfCAndWludDgnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JMYXlvdXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSB0ZW5zb3IgbGF5b3V0IHdoZW4gcmVwcmVzZW50aW5nIGRhdGEgb2Ygb25lIG9yIG1vcmUgaW1hZ2UocykuXG4gICAqL1xuICB0ZW5zb3JMYXlvdXQ/OiBJbWFnZVRlbnNvckxheW91dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zRGltZW5zaW9ucyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGhlaWdodCBpbiBwaXhlbFxuICAgKi9cbiAgaGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSB3aWR0aCBpbiBwaXhlbFxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSByZXNpemVkIGhlaWdodC4gSWYgb21pdHRlZCwgb3JpZ2luYWwgaGVpZ2h0IHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIHJlc2l6ZWRIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgcmVzaXplZCB3aWR0aCAtIGNhbiBiZSBhY2Nlc3NlZCB2aWEgdGVuc29yIGRpbWVuc2lvbnMgYXMgd2VsbFxuICAgKi9cbiAgcmVzaXplZFdpZHRoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgbm9ybWFsaXphdGlvbiBwYXJhbWV0ZXJzIHdoZW4gcHJlcHJvY2Vzc2luZyB0aGUgaW1hZ2UgYXMgbW9kZWwgaW5wdXQuXG4gICAqXG4gICAqIERhdGEgZWxlbWVudCBhcmUgcmFuZ2VkIGZyb20gMCB0byAyNTUuXG4gICAqL1xuICBub3JtPzoge1xuICAgIC8qKlxuICAgICAqIFRoZSAnYmlhcycgdmFsdWUgZm9yIGltYWdlIG5vcm1hbGl6YXRpb24uXG4gICAgICogLSBJZiBvbWl0dGVkLCB1c2UgZGVmYXVsdCB2YWx1ZSAwLlxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxuICAgICAqIC0gSWYgaXQncyBhbiBhcnJheSBvZiAzIG9yIDQgbnVtYmVycywgYXBwbHkgZWxlbWVudC13aXNlLiBOdW1iZXIgb2YgZWxlbWVudHMgbmVlZCB0byBtYXRjaCB0aGUgbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICogZm9yIHRoZSBjb3JyZXNwb25kaW5nIGltYWdlIGZvcm1hdFxuICAgICAqL1xuICAgIGJpYXM/OiBudW1iZXIgfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICAvKipcbiAgICAgKiBUaGUgJ21lYW4nIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMjU1LlxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxuICAgICAqIC0gSWYgaXQncyBhbiBhcnJheSBvZiAzIG9yIDQgbnVtYmVycywgYXBwbHkgZWxlbWVudC13aXNlLiBOdW1iZXIgb2YgZWxlbWVudHMgbmVlZCB0byBtYXRjaCB0aGUgbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICogZm9yIHRoZSBjb3JyZXNwb25kaW5nIGltYWdlIGZvcm1hdFxuICAgICAqL1xuICAgIG1lYW4/OiBudW1iZXIgfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgfTtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vLyAjcmVnaW9uIE9wdGlvbnMgY29tcG9zaXRpb25cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc1xuICBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21VcmxPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxuICBleHRlbmRzIFJlcXVpcmVkPE9wdGlvbnNEaW1lbnNpb25zPixcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IC8qIFRPRE86IGFkZCBtb3JlICovIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogVDtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vKipcbiAqIHR5cGUgVGVuc29yRmFjdG9yeSBkZWZpbmVzIHRoZSBmYWN0b3J5IGZ1bmN0aW9ucyBvZiAnVGVuc29yJyB0byBjcmVhdGUgdGVuc29yIGluc3RhbmNlcyBmcm9tIGV4aXN0aW5nIGRhdGEgb3JcbiAqIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGYWN0b3J5IHtcbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlRGF0YSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRGF0YSAtIHRoZSBJbWFnZURhdGEgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSW1hZ2VEYXRhLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoXG4gICAgaW1hZ2VEYXRhOiBJbWFnZURhdGEsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgSFRNTEltYWdlRWxlbWVudCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudCAtIHRoZSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEhUTUxJbWFnZUVsZW1lbnQuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShcbiAgICBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIFVSTFxuICAgKlxuICAgKiBAcGFyYW0gdXJsU291cmNlIC0gYSBzdHJpbmcgYXMgYSBVUkwgdG8gdGhlIGltYWdlIG9yIGEgZGF0YSBVUkwgY29udGFpbmluZyB0aGUgaW1hZ2UgZGF0YS5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKHVybFNvdXJjZTogc3RyaW5nLCBvcHRpb25zPzogVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlQml0bWFwIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gYml0bWFwIC0gdGhlIEltYWdlQml0bWFwIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKFxuICAgIGJpdG1hcDogSW1hZ2VCaXRtYXAsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICpcbiAgICogQHBhcmFtIHRleHR1cmUgLSB0aGUgV2ViR0xUZXh0dXJlIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdMIHRleHR1cmUuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYHdpZHRoYDogdGhlIHdpZHRoIG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cbiAgICogLSBgaGVpZ2h0YDogdGhlIGhlaWdodCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXG4gICAqIC0gYGZvcm1hdGA6IHRoZSBmb3JtYXQgb2YgdGhlIHRleHR1cmUuIElmIG9taXR0ZWQsIGFzc3VtZSAnUkdCQScuXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInPihcbiAgICB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjwnZmxvYXQzMic+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIHRoZSBHUFVCdWZmZXIgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gV2ViR1BVIGJ1ZmZlci5cbiAgICpcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBgZGF0YVR5cGVgOiB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGFzc3VtZSAnZmxvYXQzMicuXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICAgIGJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYk5OIE1MVGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSB0ZW5zb3IgLSB0aGUgTUxUZW5zb3Igb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvci5cbiAgICpcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBgZGF0YVR5cGVgOiB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGFzc3VtZSAnZmxvYXQzMicuXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIHRoZSBNTFRlbnNvciB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvclxuICAgKiBkYXRhIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgdGhlIFdlYk5OIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy5cbiAgICogVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiB0aGUgV2ViTk4gTUxUZW5zb3IuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvciB3aWxsXG4gICAqIG5vdCBiZSBkaXNwb3NlZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSB0aGUgV2ViTk4gYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvXG4gICAqIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tTUxUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcz4oXG4gICAgdGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIHByZS1hbGxvY2F0ZWQgYnVmZmVyLiBUaGUgYnVmZmVyIHdpbGwgYmUgdXNlZCBhcyBhIHBpbm5lZCBidWZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gdGhlIHRlbnNvciBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBidWZmZXIgLSBhIFR5cGVkQXJyYXkgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZS5cbiAgICogQHBhcmFtIGRpbXMgLSBzcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+PihcbiAgICB0eXBlOiBULFxuICAgIGJ1ZmZlcjogVGVuc29yLkRhdGFUeXBlTWFwW1RdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8VD47XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEgZmlsZSdzIFVSTCBvciBwYXRoLlxuICpcbiAqIFBhdGggaXMgdmFpbGFibGUgb25seSBpbiBvbm54cnVudGltZS1ub2RlIG9yIG9ubnhydW50aW1lLXdlYiBydW5uaW5nIGluIE5vZGUuanMuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVVcmxPclBhdGggPSBzdHJpbmc7XG5cbi8qKlxuICogQSBCbG9iIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmaWxlLlxuICovXG5leHBvcnQgdHlwZSBGaWxlQmxvYiA9IEJsb2I7XG5cbi8qKlxuICogQSBVaW50OEFycmF5LCBBcnJheUJ1ZmZlciBvciBTaGFyZWRBcnJheUJ1ZmZlciBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZSBjb250ZW50LlxuICpcbiAqIFdoZW4gaXQgaXMgYW4gQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIsIHRoZSB3aG9sZSBidWZmZXIgaXMgYXNzdW1lZCB0byBiZSB0aGUgZmlsZSBjb250ZW50LlxuICovXG5leHBvcnQgdHlwZSBGaWxlRGF0YSA9IFVpbnQ4QXJyYXkgfCBBcnJheUJ1ZmZlckxpa2U7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGZpbGUgdGhhdCBjYW4gYmUgbG9hZGVkIGJ5IHRoZSBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUEkuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVUeXBlID0gRmlsZVVybE9yUGF0aCB8IEZpbGVCbG9iIHwgRmlsZURhdGE7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBleHRlcm5hbCBkYXRhIGZpbGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAgICovXG4gIGRhdGE6IEZpbGVUeXBlO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZmlsZSBwYXRoLlxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICpcbiAqIFdoZW4gdXNpbmcgYSBzdHJpbmcsIGl0IHNob3VsZCBiZSBhIGZpbGUgVVJMIG9yIHBhdGggdGhhdCBpbiB0aGUgc2FtZSBkaXJlY3RvcnkgYXMgdGhlIG1vZGVsIGZpbGUuXG4gKi9cbmV4cG9ydCB0eXBlIEV4dGVybmFsRGF0YUZpbGVUeXBlID0gRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHwgRmlsZVVybE9yUGF0aDtcblxuLyoqXG4gKiBPcHRpb25zIGZvciBtb2RlbCBsb2FkaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9ubnhNb2RlbE9wdGlvbnMge1xuICAvKipcbiAgICogU3BlY2lmeWluZyBhIGxpc3Qgb2YgZmlsZXMgdGhhdCByZXByZXNlbnRzIHRoZSBleHRlcm5hbCBkYXRhLlxuICAgKi9cbiAgZXh0ZXJuYWxEYXRhPzogcmVhZG9ubHkgRXh0ZXJuYWxEYXRhRmlsZVR5cGVbXTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5leHBvcnQgdHlwZSBOb25UZW5zb3JUeXBlID0gbmV2ZXI7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWUgUmVwcmVzZW50cyBib3RoIHRlbnNvcnMgYW5kIG5vbi10ZW5zb3JzIHZhbHVlIGZvciBtb2RlbCdzIGlucHV0cy9vdXRwdXRzLlxuICpcbiAqIE5PVEU6IGN1cnJlbnRseSBub3Qgc3VwcG9ydCBub24tdGVuc29yXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZSA9IFRlbnNvciB8IE5vblRlbnNvclR5cGU7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgb2YgYW4gT25ueFZhbHVlLlxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gPSBUZW5zb3IuRGF0YUxvY2F0aW9uO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqICMgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJXG4gKlxuICogT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJIGlzIGEgdW5pZmllZCBBUEkgZm9yIGFsbCBKYXZhU2NyaXB0IHVzYWdlcywgaW5jbHVkaW5nIHRoZSBmb2xsb3dpbmcgTlBNIHBhY2thZ2VzOlxuICpcbiAqIC0gW29ubnhydW50aW1lLW5vZGVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLW5vZGUpXG4gKiAtIFtvbm54cnVudGltZS13ZWJdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXdlYilcbiAqIC0gW29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlKVxuICpcbiAqIFNlZSBhbHNvOlxuICogLSBbR2V0IFN0YXJ0ZWRdKGh0dHBzOi8vb25ueHJ1bnRpbWUuYWkvZG9jcy9nZXQtc3RhcnRlZC93aXRoLWphdmFzY3JpcHQvKVxuICogLSBbSW5mZXJlbmNlIGV4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lLWluZmVyZW5jZS1leGFtcGxlcy90cmVlL21haW4vanMpXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vZW52LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJ3ZWJ3b3JrZXJcIiAvPlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiSFRNTEltYWdlRWxlbWVudFwiXG4vL1xuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxuLy8gd2hlbiB3ZSB1c2Ugd2Vid29ya2VyLCB0aGUgbGliLndlYndvcmtlci5kLnRzIHdpbGwgYmUgdXNlZCwgd2hpY2ggZG9lcyBub3QgaGF2ZSBIVE1MSW1hZ2VFbGVtZW50IGRlZmluZWQuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gLi4vY29tbW9uL2Rpc3QvY2pzL3RlbnNvci1mYWN0b3J5LmQudHM6MTg3OjI5IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gMTg3ICAgICBmcm9tSW1hZ2UoaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMpOlxuLy8gUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gbm9kZV9tb2R1bGVzL0B3ZWJncHUvdHlwZXMvZGlzdC9pbmRleC5kLnRzOjgzOjcgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA4MyAgICAgfCBIVE1MSW1hZ2VFbGVtZW50XG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgSFRNTEltYWdlRWxlbWVudGAgaXMgb25seSB1c2VkIGluIHR5cGUgZGVjbGFyYXRpb24gYW5kIG5vdCBpbiByZWFsIGNvZGUuIFNvIHdlIGRlZmluZSBpdCBhcyBgdW5rbm93bmAgaGVyZSB0b1xuLy8gYnlwYXNzIHRoZSB0eXBlIGNoZWNrLlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiZG9jdW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiZG9jdW1lbnRcIiBpcyBkZWZpbmVkIGluIGxpYi5kb20uZC50cywgc28gaXQncyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci5cbi8vXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6NzozMyAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjYxIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxuLy8gbGlicmFyeT8gVHJ5IGNoYW5naW5nIHRoZSAnbGliJyBjb21waWxlciBvcHRpb24gdG8gaW5jbHVkZSAnZG9tJy5cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3Ojg4IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MU2NyaXB0RWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+flxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgZG9jdW1lbnRgIGlzIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjcmlwdCBVUkwsIHdoaWNoIGlzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLiBUaGlzIGZpbGUgaXMgc2VydmVkIGFzIGFcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxuLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcbiAgdHlwZSBIVE1MU2NyaXB0RWxlbWVudCA9IHsgc3JjPzogc3RyaW5nIH07XG4gIGNvbnN0IGRvY3VtZW50OiB1bmRlZmluZWQgfCB7IGN1cnJlbnRTY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudCB9O1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5XG4gKlxuICogVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhIFwiZHVhbFwiIGZpbGUgZm9yIGJvdGggZW50cmllcyBvZiB0aGUgZm9sbG93aW5nOlxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIsIGl0IGxpc3RlbnMgdG8gdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW4gdGhyZWFkIGFuZCBwZXJmb3JtcyB0aGUgY29ycmVzcG9uZGluZyBvcGVyYXRpb25zLlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCBkaXJlY3RseSB1c2luZyBgbmV3IFdvcmtlcigpYCBpbiB0aGUgbWFpbiB0aHJlYWQuXG4gKlxuICogLSBUaGUgRVNNIG1vZHVsZSB0aGF0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciAoYXMgYSB3b3JrZXIgbGF1bmNoZXIpLlxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciBsYXVuY2hlciwgaXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIGFuZCByZXR1cm5zIGl0LlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXG4gKlxuICogVGhpcyBmaWxlIHdpbGwgYmUgYWx3YXlzIGNvbXBpbGluZyBpbnRvIEVTTSBmb3JtYXQuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuLi9wcm94eS1tZXNzYWdlcy5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVTZXNzaW9uLFxuICBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLFxuICBlbmRQcm9maWxpbmcsXG4gIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzLFxuICBpbml0RXAsXG4gIGluaXRSdW50aW1lLFxuICByZWxlYXNlU2Vzc2lvbixcbiAgcnVuLFxufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuLi93YXNtLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgc2NyaXB0U3JjIH0gZnJvbSAnLi4vd2FzbS11dGlscy1pbXBvcnQuanMnO1xuXG5jb25zdCBXT1JLRVJfTkFNRSA9ICdvcnQtd2FzbS1wcm94eS13b3JrZXInO1xuY29uc3QgaXNQcm94eVdvcmtlciA9IGdsb2JhbFRoaXMuc2VsZj8ubmFtZSA9PT0gV09SS0VSX05BTUU7XG5cbmlmIChpc1Byb3h5V29ya2VyKSB7XG4gIC8vIFdvcmtlciB0aHJlYWRcbiAgc2VsZi5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIGluOiBtZXNzYWdlIH0gPSBldi5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkobWVzc2FnZSEud2FzbSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaW5pdFJ1bnRpbWUobWVzc2FnZSEpLnRoZW4oXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbml0LWVwJzoge1xuICAgICAgICAgIGNvbnN0IHsgZXBOYW1lLCBlbnYgfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIGluaXRFcChlbnYsIGVwTmFtZSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29weS1mcm9tJzoge1xuICAgICAgICAgIGNvbnN0IHsgYnVmZmVyIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjb25zdCBidWZmZXJEYXRhID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgb3V0OiBidWZmZXJEYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICBjb25zdCB7IG1vZGVsLCBvcHRpb25zIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgKHNlc3Npb25NZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIG91dDogc2Vzc2lvbk1ldGFkYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgICAgcmVsZWFzZVNlc3Npb24obWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncnVuJzoge1xuICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG5ldyBBcnJheShvdXRwdXRJbmRpY2VzLmxlbmd0aCkuZmlsbChudWxsKSwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIChvdXRwdXRzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvdXRwdXRzLnNvbWUoKG8pID0+IG9bM10gIT09ICdjcHUnKSkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyOiAnUHJveHkgZG9lcyBub3Qgc3VwcG9ydCBub24tY3B1IHRlbnNvciBsb2NhdGlvbi4nIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgeyB0eXBlLCBvdXQ6IG91dHB1dHMgfSBhcyBPcnRXYXNtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKFsuLi5pbnB1dHMsIC4uLm91dHB1dHNdIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgICAgIGVuZFByb2ZpbGluZyhtZXNzYWdlISk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3h5V29ya2VyXG4gID8gbnVsbFxuICA6ICh1cmxPdmVycmlkZT86IHN0cmluZykgPT5cbiAgICAgIG5ldyBXb3JrZXIodXJsT3ZlcnJpZGUgPz8gc2NyaXB0U3JjISwgeyB0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRSB9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuXG4vKipcbiAqIFRoZSBvcmlnaW4gb2YgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gKlxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXG4gKi9cbmNvbnN0IG9yaWdpbiA9IGlzTm9kZSB8fCB0eXBlb2YgbG9jYXRpb24gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogbG9jYXRpb24ub3JpZ2luO1xuXG4vKipcbiAqIFNvbWUgYnVuZGxlcnMgKGVnLiBXZWJwYWNrKSB3aWxsIHJld3JpdGUgYGltcG9ydC5tZXRhLnVybGAgdG8gYSBmaWxlIFVSTCBhdCBjb21waWxlIHRpbWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYGltcG9ydC5tZXRhLnVybGAgc3RhcnRzIHdpdGggYGZpbGU6YCwgYnV0IHVzaW5nIHRoZSBgPmAgYW5kIGA8YCBvcGVyYXRvcnMgaW5zdGVhZCBvZlxuICogYHN0YXJ0c1dpdGhgIGZ1bmN0aW9uIHNvIHRoYXQgY29kZSBtaW5pbWl6ZXJzIGNhbiByZW1vdmUgdGhlIGRlYWQgY29kZSBjb3JyZWN0bHkuXG4gKlxuICogRm9yIGV4YW1wbGUsIGlmIHdlIHVzZSB0ZXJzZXIgdG8gbWluaWZ5IHRoZSBmb2xsb3dpbmcgY29kZTpcbiAqIGBgYGpzXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKSkge1xuICogICBjb25zb2xlLmxvZygxKVxuICogfSBlbHNlIHtcbiAqICAgY29uc29sZS5sb2coMilcbiAqIH1cbiAqXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiID4gXCJmaWxlOlwiICYmIFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIiA8IFwiZmlsZTtcIikge1xuICogICBjb25zb2xlLmxvZygzKVxuICogfSBlbHNlIHtcbiAqICAgY29uc29sZS5sb2coNClcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFRoZSBtaW5pZmllZCBjb2RlIHdpbGwgYmU6XG4gKiBgYGBqc1xuICogXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKT9jb25zb2xlLmxvZygxKTpjb25zb2xlLmxvZygyKSxjb25zb2xlLmxvZygzKTtcbiAqIGBgYFxuICpcbiAqICh1c2UgVGVyc2VyIDUuMzkuMCB3aXRoIGRlZmF1bHQgb3B0aW9ucywgaHR0cHM6Ly90cnkudGVyc2VyLm9yZy8pXG4gKlxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgaW1wb3J0Lm1ldGEudXJsIGlzIGhhcmRjb2RlZCBhcyBhIGZpbGUgVVJJLlxuICovXG5leHBvcnQgY29uc3QgaXNFc21JbXBvcnRNZXRhVXJsSGFyZGNvZGVkQXNGaWxlVXJpID1cbiAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA+ICdmaWxlOicgJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA8ICdmaWxlOyc7XG5cbmNvbnN0IGdldFNjcmlwdFNyYyA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAvLyBpZiBOb2RlanMsIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKGlzTm9kZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgLy8gaWYgSXQncyBFU00sIHVzZSBpbXBvcnQubWV0YS51cmxcbiAgaWYgKEJVSUxEX0RFRlMuSVNfRVNNKSB7XG4gICAgLy8gRm9yIEVTTSwgaWYgdGhlIGltcG9ydC5tZXRhLnVybCBpcyBhIGZpbGUgVVJMLCB0aGlzIHVzdWFsbHkgbWVhbnMgdGhlIGJ1bmRsZXIgcmV3cml0ZXMgYGltcG9ydC5tZXRhLnVybGAgdG9cbiAgICAvLyB0aGUgZmlsZSBwYXRoIGF0IGNvbXBpbGUgdGltZS4gSW4gdGhpcyBjYXNlLCB0aGlzIGZpbGUgcGF0aCBjYW5ub3QgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHJ1bnRpbWUgVVJMLlxuICAgIC8vXG4gICAgLy8gV2UgbmVlZCB0byB1c2UgdGhlIFVSTCBjb25zdHJ1Y3RvciBsaWtlIHRoaXM6XG4gICAgLy8gYGBganNcbiAgICAvLyBuZXcgVVJMKCdhY3R1YWwtYnVuZGxlLW5hbWUuanMnLCBpbXBvcnQubWV0YS51cmwpLmhyZWZcbiAgICAvLyBgYGBcbiAgICAvLyBTbyB0aGF0IGJ1bmRsZXIgY2FuIHByZXByb2Nlc3MgdGhlIFVSTCBjb3JyZWN0bHkuXG4gICAgaWYgKGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSkge1xuICAgICAgLy8gaWYgdGhlIHJld3JpdHRlbiBVUkwgaXMgYSByZWxhdGl2ZSBwYXRoLCB3ZSBuZWVkIHRvIHVzZSB0aGUgb3JpZ2luIHRvIHJlc29sdmUgdGhlIFVSTC5cblxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBpcyBhIHdvcmthcm91bmQgZm9yIFZpdGUuXG4gICAgICAvL1xuICAgICAgLy8gVml0ZSB1c2VzIGEgYnVuZGxlcihyb2xsdXAvcm9sbGRvd24pIHRoYXQgZG9lcyBub3QgcmV3cml0ZSBgaW1wb3J0Lm1ldGEudXJsYCB0byBhIGZpbGUgVVJMLiBTbyBpbiB0aGVvcnksIHRoaXNcbiAgICAgIC8vIGNvZGUgcGF0aCBzaG91bGQgbm90IGJlIGV4ZWN1dGVkIGluIFZpdGUuIEhvd2V2ZXIsIHRoZSBidW5kbGVyIGRvZXMgbm90IGtub3cgaXQgYW5kIGl0IHN0aWxsIHRyeSB0byBsb2FkIHRoZVxuICAgICAgLy8gZm9sbG93aW5nIHBhdHRlcm46XG4gICAgICAvLyAtIGByZXR1cm4gbmV3IFVSTCgnZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWZgXG4gICAgICAvL1xuICAgICAgLy8gQnkgcmVwbGFjaW5nIHRoZSBwYXR0ZXJuIGFib3ZlIHdpdGggdGhlIGZvbGxvd2luZyBjb2RlLCB3ZSBjYW4gc2tpcCB0aGUgcmVzb3VyY2UgbG9hZGluZyBiZWhhdmlvcjpcbiAgICAgIC8vIC0gYGNvbnN0IFVSTDIgPSBVUkw7IHJldHVybiBuZXcgVVJMMignZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWY7YFxuICAgICAgLy9cbiAgICAgIC8vIEFuZCBpdCBzdGlsbCB3b3JrcyBpbiBXZWJwYWNrLlxuICAgICAgY29uc3QgVVJMMiA9IFVSTDtcbiAgICAgIHJldHVybiBuZXcgVVJMKG5ldyBVUkwyKEJVSUxEX0RFRlMuQlVORExFX0ZJTEVOQU1FLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWYsIG9yaWdpbikuaHJlZjtcbiAgICB9XG5cbiAgICByZXR1cm4gQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjXG4gICAgOiAvLyB1c2UgYHNlbGYubG9jYXRpb24uaHJlZmAgaWYgYXZhaWxhYmxlXG4gICAgICB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gc2VsZi5sb2NhdGlvbj8uaHJlZlxuICAgICAgOiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFRoZSBjbGFzc2ljIHNjcmlwdCBzb3VyY2UgVVJMLiBUaGlzIGlzIG5vdCBhbHdheXMgYXZhaWxhYmxlIGluIG5vbiBFU01vZHVsZSBlbnZpcm9ubWVudHMuXG4gKlxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSBnZXRTY3JpcHRTcmMoKTtcblxuLyoqXG4gKiBJbmZlciB0aGUgd2FzbSBwYXRoIHByZWZpeCBmcm9tIHRoZSBzY3JpcHQgc291cmNlIFVSTC5cbiAqXG4gKiBAcmV0dXJucyBUaGUgaW5mZXJyZWQgd2FzbSBwYXRoIHByZWZpeCwgb3IgdW5kZWZpbmVkIGlmIHRoZSBzY3JpcHQgc291cmNlIFVSTCBpcyBub3QgYXZhaWxhYmxlIG9yIGlzIGEgYmxvYiBVUkwuXG4gKi9cbmV4cG9ydCBjb25zdCBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoc2NyaXB0U3JjICYmICFzY3JpcHRTcmMuc3RhcnRzV2l0aCgnYmxvYjonKSkge1xuICAgIHJldHVybiBzY3JpcHRTcmMuc3Vic3RyaW5nKDAsIHNjcmlwdFNyYy5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGZpbGVuYW1lIHdpdGggcHJlZml4IGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICovXG5jb25zdCBpc1NhbWVPcmlnaW4gPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwub3JpZ2luID09PSBvcmlnaW47XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGlucHV0cyB0byBhbiBhYnNvbHV0ZSBVUkwgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4IG92ZXJyaWRlLiBJZiBmYWlsZWQsIHJldHVybiB1bmRlZmluZWQuXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZVVybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xuICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwuaHJlZjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWxsYmFjayBVUkwgaWYgYW4gYWJzb2x1dGUgVVJMIGNhbm5vdCBiZSBjcmVhdGVkIGJ5IHRoZSBub3JtYWxpemVVcmwgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGZhbGxiYWNrVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiBgJHtwcmVmaXhPdmVycmlkZSA/PyAnLi8nfSR7ZmlsZW5hbWV9YDtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIHByZWxvYWQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cbiAqXG4gKiBJZiB0aGUgb3JpZ2luIG9mIHRoZSB3b3JrZXIgVVJMIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9yaWdpbiwgdGhlIHdvcmtlciBjYW5ub3QgYmUgbG9hZGVkIGRpcmVjdGx5LlxuICogU2VlIGRpc2N1c3Npb25zIGluIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvd29ya2VyLWxvYWRlci9pc3N1ZXMvMTU0XG4gKlxuICogSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIGZldGNoIHRoZSB3b3JrZXIgVVJMIGFuZCBjcmVhdGUgYSBuZXcgQmxvYiBVUkwgd2l0aCB0aGUgc2FtZSBvcmlnaW4gYXMgYSB3b3JrYXJvdW5kLlxuICpcbiAqIEBwYXJhbSBhYnNvbHV0ZVVybCAtIFRoZSBhYnNvbHV0ZSBVUkwgdG8gcHJlbG9hZC5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbmV3IEJsb2IgVVJMXG4gKi9cbmNvbnN0IHByZWxvYWQgPSBhc3luYyAoYWJzb2x1dGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWJzb2x1dGVVcmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufTtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIGR5bmFtaWNhbGx5IGltcG9ydCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxuICpcbiAqIFRoZSBidWlsZCBzY3JpcHQgaGFzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIFVSTCBpcyBub3QgYnVuZGxlZCBpbnRvIHRoZSBmaW5hbCBvdXRwdXQuXG4gKlxuICogQHBhcmFtIHVybCAtIFRoZSBVUkwgdG8gaW1wb3J0LlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUuXG4gKi9cbmNvbnN0IGR5bmFtaWNJbXBvcnREZWZhdWx0ID0gYXN5bmMgPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiA9PlxuICAoYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gLyogQHZpdGUtaWdub3JlICovIHVybCkpLmRlZmF1bHQ7XG5cbi8qKlxuICogVGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IGltcG9ydGVkIGZyb20gdGhlIHByb3h5IHdvcmtlciBtb2R1bGUuXG4gKlxuICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSB3aGVuIHRoZSBXZWJBc3NlbWJseSBwcm94eSBpcyBub3QgZGlzYWJsZWQuXG4gKi9cbmNvbnN0IGNyZWF0ZVByb3h5V29ya2VyOiAoKHVybE92ZXJyaWRlPzogc3RyaW5nKSA9PiBXb3JrZXIpIHwgdW5kZWZpbmVkID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgPyB1bmRlZmluZWQgOiByZXF1aXJlKCcuL3Byb3h5LXdvcmtlci9tYWluJykuZGVmYXVsdDtcblxuLyoqXG4gKiBJbXBvcnQgdGhlIHByb3h5IHdvcmtlci5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICogMS4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cbiAqIDIuIFVzZSB0aGUgcHJveHkgd29ya2VyIGZhY3RvcnkgdG8gY3JlYXRlIHRoZSBwcm94eSB3b3JrZXIuXG4gKlxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIDIgZWxlbWVudHM6XG4gKiAgICAgICAgICAgIC0gVGhlIG9iamVjdCBVUkwgb2YgdGhlIHByZWxvYWRlZCBtb2R1bGUsIG9yIHVuZGVmaW5lZCBpZiBubyBwcmVsb2FkIGlzIG5lZWRlZC5cbiAqICAgICAgICAgICAgLSBUaGUgcHJveHkgd29ya2VyLlxuICovXG5leHBvcnQgY29uc3QgaW1wb3J0UHJveHlXb3JrZXIgPSBhc3luYyAoKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBXb3JrZXJdPiA9PiB7XG4gIGlmICghc2NyaXB0U3JjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBwcm94eSB3b3JrZXI6IGNhbm5vdCBkZXRlcm1pbmUgdGhlIHNjcmlwdCBzb3VyY2UgVVJMLicpO1xuICB9XG5cbiAgLy8gSWYgdGhlIHNjcmlwdCBzb3VyY2UgaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4sIHdlIGNhbiB1c2UgdGhlIGVtYmVkZGVkIHByb3h5IG1vZHVsZSBkaXJlY3RseS5cbiAgaWYgKGlzU2FtZU9yaWdpbihzY3JpcHRTcmMpKSB7XG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIGNyZWF0ZVByb3h5V29ya2VyISgpXTtcbiAgfVxuXG4gIC8vIE90aGVyd2lzZSwgbmVlZCB0byBwcmVsb2FkXG4gIGNvbnN0IHVybCA9IGF3YWl0IHByZWxvYWQoc2NyaXB0U3JjKTtcbiAgcmV0dXJuIFt1cmwsIGNyZWF0ZVByb3h5V29ya2VyISh1cmwpXTtcbn07XG5cbi8qKlxuICogVGhlIGVtYmVkZGVkIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIGluIEVTTSBhbmQgd2hlbiBlbWJlZGRpbmcgaXMgbm90IGRpc2FibGVkLlxuICovXG5jb25zdCBlbWJlZGRlZFdhc21Nb2R1bGU6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+IHwgdW5kZWZpbmVkID1cbiAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5FTkFCTEVfQlVORExFX1dBU01fSlNcbiAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgICByZXF1aXJlKFxuICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcbiAgICAgICAgICA/ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanMnXG4gICAgICAgICAgOiBCVUlMRF9ERUZTLkVOQUJMRV9KU1BJXG4gICAgICAgICAgICA/ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS5tanMnXG4gICAgICAgICAgICA6ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVXG4gICAgICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS5tanMnXG4gICAgICAgICAgICAgIDogJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnLFxuICAgICAgKS5kZWZhdWx0XG4gICAgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogSW1wb3J0IHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwczpcbiAqIDEuIElmIHRoZSBlbWJlZGRlZCBtb2R1bGUgZXhpc3RzIGFuZCBubyBjdXN0b20gVVJMIGlzIHNwZWNpZmllZCwgdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUuXG4gKiAyLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxuICogMy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHBlcmZvcm0gYSBkeW5hbWljIGltcG9ydCBvZiB0aGUgbW9kdWxlLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiAyIGVsZW1lbnRzOlxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXG4gKiAgICAgICAgICAgIC0gVGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUsIHdoaWNoIGlzIGEgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydFdhc21Nb2R1bGUgPSBhc3luYyAoXG4gIHVybE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIHByZWZpeE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGlzTXVsdGlUaHJlYWRlZDogYm9vbGVhbixcbiAgaXNXYXNtT3ZlcnJpZGRlbjogYm9vbGVhbixcbik6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT5dPiA9PiB7XG4gIC8vXG4gIC8vIENoZWNrIGlmIHdlIHNob3VsZCB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZS5cbiAgLy9cblxuICAvLyBUbyB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZSwgaXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgYW5kIG5vIFVSTCBvdmVycmlkZSBvciBwcmVmaXggb3ZlcnJpZGUgc2hvdWxkIGJlIHNwZWNpZmllZC5cbiAgbGV0IHVzZUVtYmVkZGVkTW9kdWxlID0gZW1iZWRkZWRXYXNtTW9kdWxlICYmICEodXJsT3ZlcnJpZGUgfHwgcHJlZml4T3ZlcnJpZGUpO1xuICBpZiAodXNlRW1iZWRkZWRNb2R1bGUpIHtcbiAgICBpZiAoIXNjcmlwdFNyYykge1xuICAgICAgLy8gbm8gVVJMIGluZm8gYXZhaWxhYmxlLlxuICAgICAgLy9cbiAgICAgIC8vIE5vdGU6IHdoZW4gdGhlIGVtYmVkZGVkIG1vZHVsZSBpcyBhdmFpbGFibGUsIGl0IG1lYW5zIHRoZSBjdXJyZW50IHNjcmlwdCBpcyBFU00uIFVzdWFsbHksIGluIEVTTSwgdGhlXG4gICAgICAvLyBgaW1wb3J0Lm1ldGEudXJsYCBpcyBhdmFpbGFibGUuIEJ1dCBpbiBzb21lIGNhc2VzIChlZy4gQ2xvdWRmbGFyZSBXb3JrZXJzKSwgdGhlIHZhbHVlIG9mIGBpbXBvcnQubWV0YS51cmxgXG4gICAgICAvLyBjYW4gYmUgYG51bGxgIG9yIGB1bmRlZmluZWRgLiBJbiB0aGlzIGNhc2UsIHdlIGNhbiBvbmx5IGxvYWQgdGhlIGVtYmVkZGVkIG1vZHVsZSB3aGVuOlxuICAgICAgLy9cbiAgICAgIC8vIDEuIFRoZSBXZWJBc3NlbWJseSBtb2R1bGUgYmluYXJ5IGlzIG92ZXJyaWRkZW46XG4gICAgICAvLyAgICBgYGBqc1xuICAgICAgLy8gICAgZW52Lndhc20ud2FzbVBhdGhzID0gdW5kZWZpbmVkOyAgLy8gb3Igbm90IHNwZWNpZmllZFxuICAgICAgLy8gICAgZW52Lndhc20ud2FzbUJpbmFyeSA9IC8qIGEgVWludDhBcnJheSBjb250YWluaW5nIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkgKi87XG4gICAgICAvLyAgICBgYGBcbiAgICAgIC8vXG4gICAgICAvLyAyLiBUaGUgXCIud2FzbVwiIG9ubHkgaXMgb3ZlcnJpZGRlbi5cbiAgICAgIC8vICAgIGBgYGpzXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtUGF0aHMgPSB7IHdhc206IC8qIFVSTCBvZiB0aGUgLndhc20gZmlsZSAqLyB9O1xuICAgICAgLy8gICAgYGBgXG4gICAgICAvL1xuICAgICAgaWYgKGlzV2FzbU92ZXJyaWRkZW4gJiYgIWlzTXVsdGlUaHJlYWRlZCkge1xuICAgICAgICB1c2VFbWJlZGRlZE1vZHVsZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBkZXRlcm1pbmUgdGhlIHNjcmlwdCBzb3VyY2UgVVJMLicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiB0aGUgc2NyaXB0IHNvdXJjZSBpcyBhdmFpbGFibGUsIHdlIGNhbiBjaGVjayBpZiBpdCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAgICAgIC8vIEFsc28gdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUgd2hlbiB3YXNtQmluYXJ5IGlzIHByb3ZpZGVkIGFuZCBzaW5nbGUtdGhyZWFkZWQgKGVnLiBCbG9iIFVSTCB3b3JrZXJzXG4gICAgICAvLyB3aGVyZSBpc1NhbWVPcmlnaW4gZmFpbHMgYnV0IG5vIGZpbGUgcmVzb2x1dGlvbiBvciB3b3JrZXIgc3Bhd25pbmcgaXMgbmVlZGVkKS5cbiAgICAgIHVzZUVtYmVkZGVkTW9kdWxlID0gaXNTYW1lT3JpZ2luKHNjcmlwdFNyYykgfHwgKGlzV2FzbU92ZXJyaWRkZW4gJiYgIWlzTXVsdGlUaHJlYWRlZCk7XG4gICAgfVxuICB9XG4gIGlmICh1c2VFbWJlZGRlZE1vZHVsZSkge1xuICAgIHJldHVybiBbdW5kZWZpbmVkLCBlbWJlZGRlZFdhc21Nb2R1bGUhXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB3YXNtTW9kdWxlRmlsZW5hbWUgPSAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcbiAgICAgID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanMnXG4gICAgICA6IEJVSUxEX0RFRlMuRU5BQkxFX0pTUElcbiAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLm1qcydcbiAgICAgICAgOiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVVxuICAgICAgICAgID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkubWpzJ1xuICAgICAgICAgIDogJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJztcbiAgICBjb25zdCB3YXNtTW9kdWxlVXJsID0gdXJsT3ZlcnJpZGUgPz8gbm9ybWFsaXplVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpO1xuICAgIC8vIG5lZWQgdG8gcHJlbG9hZCBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gICAgLy8gMS4gbm90IGluIE5vZGUuanMuXG4gICAgLy8gICAgLSBOb2RlLmpzIGRvZXMgbm90IGhhdmUgdGhlIHNhbWUgb3JpZ2luIHBvbGljeSBmb3IgY3JlYXRpbmcgd29ya2Vycy5cbiAgICAvLyAyLiBtdWx0aS10aHJlYWRlZCBpcyBlbmFibGVkLlxuICAgIC8vICAgIC0gSWYgbXVsdGktdGhyZWFkZWQgaXMgZGlzYWJsZWQsIG5vIHdvcmtlciB3aWxsIGJlIGNyZWF0ZWQuIFNvIHdlIGRvbid0IG5lZWQgdG8gcHJlbG9hZCB0aGUgbW9kdWxlLlxuICAgIC8vIDMuIHRoZSBhYnNvbHV0ZSBVUkwgaXMgYXZhaWxhYmxlLlxuICAgIC8vICAgIC0gSWYgdGhlIGFic29sdXRlIFVSTCBpcyBmYWlsZWQgdG8gYmUgY3JlYXRlZCwgdGhlIG9yaWdpbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIG5vdFxuICAgIC8vICAgIHByZWxvYWQgdGhlIG1vZHVsZS5cbiAgICAvLyA0LiB0aGUgd29ya2VyIFVSTCBpcyBub3QgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gICAgLy8gICAgLSBJZiB0aGUgd29ya2VyIFVSTCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIGNyZWF0ZSB0aGUgd29ya2VyIGRpcmVjdGx5LlxuICAgIGNvbnN0IG5lZWRQcmVsb2FkID0gIWlzTm9kZSAmJiBpc011bHRpVGhyZWFkZWQgJiYgd2FzbU1vZHVsZVVybCAmJiAhaXNTYW1lT3JpZ2luKHdhc21Nb2R1bGVVcmwsIHByZWZpeE92ZXJyaWRlKTtcbiAgICBjb25zdCB1cmwgPSBuZWVkUHJlbG9hZFxuICAgICAgPyBhd2FpdCBwcmVsb2FkKHdhc21Nb2R1bGVVcmwpXG4gICAgICA6ICh3YXNtTW9kdWxlVXJsID8/IGZhbGxiYWNrVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpKTtcbiAgICByZXR1cm4gW25lZWRQcmVsb2FkID8gdXJsIDogdW5kZWZpbmVkLCBhd2FpdCBkeW5hbWljSW1wb3J0RGVmYXVsdDxFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPj4odXJsKV07XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEVudiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1vZHVsZSB9IGZyb20gJy4vd2FzbS10eXBlcyc7XG5pbXBvcnQgeyBpbXBvcnRXYXNtTW9kdWxlLCBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyB9IGZyb20gJy4vd2FzbS11dGlscy1pbXBvcnQnO1xuXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZSB8IHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA0LCAxLCA5NiwgMCwgMCwgMywgMiwgMSwgMCwgNSwgNCwgMSwgMywgMSwgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgMjU0LCAxNixcbiAgICAgICAgMiwgMCwgMjYsIDExLFxuICAgICAgXSksXG4gICAgKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBpc1NpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIFNJTUQgaW5zdHJ1Y3Rpb25zLlxuXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcbiAgICAvL1xuICAgIC8vIChtb2R1bGVcbiAgICAvLyAgICh0eXBlICR0MCAoZnVuYykpXG4gICAgLy8gICAoZnVuYyAkZjAgKHR5cGUgJHQwKVxuICAgIC8vICAgICAoZHJvcFxuICAgIC8vICAgICAgIChpMzJ4NC5kb3RfaTE2eDhfc1xuICAgIC8vICAgICAgICAgKGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICAgICAgIChpMzIuY29uc3QgMCkpXG4gICAgLy8gICAgICAgICAodjEyOC5jb25zdCBpMzJ4NCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwKSkpKSlcblxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA0LCAxLCA5NiwgMCwgMCwgMywgMiwgMSwgMCwgMTAsIDMwLCAxLCAyOCwgMCwgNjUsIDAsIDI1MywgMTUsIDI1MywgMTIsIDAsIDAsIDAsXG4gICAgICAgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDI1MywgMTg2LCAxLCAyNiwgMTEsXG4gICAgICBdKSxcbiAgICApO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGlzUmVsYXhlZFNpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgUmVsYXhlZCBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgUmVsYXhlZCBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy8gKG1vZHVsZVxuICAgIC8vICAgKGZ1bmMgKHJlc3VsdCB2MTI4KVxuICAgIC8vICAgICAgaTMyLmNvbnN0IDFcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICBpMzIuY29uc3QgMlxuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgIGkzMi5jb25zdCAzXG4gICAgLy8gICAgICBpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgaTMyeDQucmVsYXhlZF9kb3RfaTh4MTZfaTd4MTZfYWRkX3NcbiAgICAvLyAgIClcbiAgICAvLyAgKVxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA1LCAxLCA5NiwgMCwgMSwgMTIzLCAzLCAyLCAxLCAwLCAxMCwgMTksIDEsIDE3LCAwLCA2NSwgMSwgMjUzLCAxNSwgNjUsIDIsIDI1MyxcbiAgICAgICAgMTUsIDY1LCAzLCAyNTMsIDE1LCAyNTMsIDE0NywgMiwgMTEsXG4gICAgICBdKSxcbiAgICApO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyAoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZmFpbGVkLlwiKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBsZXQgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuXG4gIC8vIGVuc3VyZSBTSU1EIGlzIHN1cHBvcnRlZFxuICBpZiAoZmxhZ3Muc2ltZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBza2lwIFNJTUQgZmVhdHVyZSBjaGVja2luZyBhcyBpdCBpcyBkaXNhYmxlZCBleHBsaWNpdGx5IGJ5IHVzZXJcbiAgfSBlbHNlIGlmIChmbGFncy5zaW1kID09PSAncmVsYXhlZCcpIHtcbiAgICAvLyBjaGVjayBpZiByZWxheGVkIFNJTUQgaXMgc3VwcG9ydGVkXG4gICAgaWYgKCFpc1JlbGF4ZWRTaW1kU3VwcG9ydGVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVsYXhlZCBXZWJBc3NlbWJseSBTSU1EIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc1NpbWRTdXBwb3J0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xuICB9XG5cbiAgaWYgKEJVSUxEX0RFRlMuRU5BQkxFX0pTUEkpIHtcbiAgICBpZiAoISgnU3VzcGVuZGluZycgaW4gV2ViQXNzZW1ibHkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IEpTUEkgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4nKTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVjayBpZiBtdWx0aS10aHJlYWRpbmcgaXMgc3VwcG9ydGVkXG4gIGNvbnN0IG11bHRpVGhyZWFkU3VwcG9ydGVkID0gaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xuICBpZiAobnVtVGhyZWFkcyA+IDEgJiYgIW11bHRpVGhyZWFkU3VwcG9ydGVkKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnZW52Lndhc20ubnVtVGhyZWFkcyBpcyBzZXQgdG8gJyArXG4gICAgICAgICAgbnVtVGhyZWFkcyArXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xuICAgICAgICAgICdTZWUgaHR0cHM6Ly93ZWIuZGV2L2Nyb3NzLW9yaWdpbi1pc29sYXRpb24tZ3VpZGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnV2ViQXNzZW1ibHkgbXVsdGktdGhyZWFkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuICcgKyAnRmFsbGluZyBiYWNrIHRvIHNpbmdsZS10aHJlYWRpbmcuJyxcbiAgICApO1xuXG4gICAgLy8gc2V0IGZsYWdzLm51bVRocmVhZHMgdG8gMSBzbyB0aGF0IE9ydEluaXQoKSB3aWxsIG5vdCBjcmVhdGUgYSBnbG9iYWwgdGhyZWFkIHBvb2wuXG4gICAgZmxhZ3MubnVtVGhyZWFkcyA9IG51bVRocmVhZHMgPSAxO1xuICB9XG5cbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbWpzUGF0aE92ZXJyaWRlRmxhZyA9ICh3YXNtUGF0aHMgYXMgRW52Lldhc21GaWxlUGF0aHMpPy5tanM7XG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZSA9IChtanNQYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gbWpzUGF0aE92ZXJyaWRlRmxhZztcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ud2FzbTtcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZSA9ICh3YXNtUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IHdhc21QYXRoT3ZlcnJpZGVGbGFnO1xuICBjb25zdCB3YXNtQmluYXJ5T3ZlcnJpZGUgPSBmbGFncy53YXNtQmluYXJ5O1xuXG4gIGNvbnN0IFtvYmplY3RVcmwsIG9ydFdhc21GYWN0b3J5XSA9IGF3YWl0IGltcG9ydFdhc21Nb2R1bGUoXG4gICAgbWpzUGF0aE92ZXJyaWRlLFxuICAgIHdhc21QcmVmaXhPdmVycmlkZSxcbiAgICBudW1UaHJlYWRzID4gMSxcbiAgICAhIXdhc21CaW5hcnlPdmVycmlkZSB8fCAhIXdhc21QYXRoT3ZlcnJpZGUsXG4gICk7XG5cbiAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuXG4gIGNvbnN0IHRhc2tzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xuXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgdGFza3MucHVzaChcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvLyBwcm9taXNlIGZvciBtb2R1bGUgaW5pdGlhbGl6YXRpb25cbiAgdGFza3MucHVzaChcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIHRocmVhZHMuIFdlYkFzc2VtYmx5IHdpbGwgY3JlYXRlIChNb2R1bGUubnVtVGhyZWFkcyAtIDEpIHdvcmtlcnMuIElmIGl0IGlzIDEsIG5vIHdvcmtlciB3aWxsIGJlXG4gICAgICAgICAqIGNyZWF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBudW1UaHJlYWRzLFxuICAgICAgfTtcblxuICAgICAgaWYgKHdhc21CaW5hcnlPdmVycmlkZSkge1xuICAgICAgICAvLyBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIFRoaXMgd2lsbCBza2lwIHRoZSB3YXNtIGZpbGUgZmV0Y2hpbmcuXG4gICAgICAgIGNvbmZpZy53YXNtQmluYXJ5ID0gd2FzbUJpbmFyeU92ZXJyaWRlO1xuXG4gICAgICAgIC8vIE9mZmVyIGFuIGltcGxlbWVudGF0aW9uIG9mIGxvY2F0ZUZpbGUoKSB0aGF0IHJldHVybnMgdGhlIGZpbGUgbmFtZSBkaXJlY3RseS4gVGhpcyBoZWxwcyB0byBhdm9pZCBhbiBlcnJvclxuICAgICAgICAvLyB0aHJvd24gbGF0ZXIgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgd2hlbiBgaW1wb3J0Lm1ldGEudXJsYCBpcyBhIGJsb2IgVVJMOlxuICAgICAgICAvLyBgYGBcbiAgICAgICAgLy8gICByZXR1cm4gbmV3IFVSTChcIm9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZjtcbiAgICAgICAgLy8gYGBgXG4gICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBmaWxlTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gQSBjYWxsYmFjayBmdW5jdGlvbiB0byBsb2NhdGUgdGhlIFdlYkFzc2VtYmx5IGZpbGUuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNpbmNlIEVtc2NyaXB0ZW4gMy4xLjU4LCB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAgY29uZmlnLmxvY2F0ZUZpbGUgPSAoZmlsZU5hbWUpID0+IHdhc21QYXRoT3ZlcnJpZGUgPz8gd2FzbVByZWZpeE92ZXJyaWRlICsgZmlsZU5hbWU7XG4gICAgICB9IGVsc2UgaWYgKG1qc1BhdGhPdmVycmlkZSAmJiBtanNQYXRoT3ZlcnJpZGUuaW5kZXhPZignYmxvYjonKSAhPT0gMCkge1xuICAgICAgICAvLyBpZiBtanMgcGF0aCBpcyBzcGVjaWZpZWQsIHVzZSBpdCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAgY29uZmlnLmxvY2F0ZUZpbGUgPSAoZmlsZU5hbWUpID0+IG5ldyBVUkwoZmlsZU5hbWUsIG1qc1BhdGhPdmVycmlkZSkuaHJlZjtcbiAgICAgIH0gZWxzZSBpZiAob2JqZWN0VXJsKSB7XG4gICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xuICAgICAgICBpZiAoaW5mZXJyZWRXYXNtUGF0aFByZWZpeCkge1xuICAgICAgICAgIC8vIGlmIHRoZSB3YXNtIG1vZHVsZSBpcyBwcmVsb2FkZWQsIHVzZSB0aGUgaW5mZXJyZWQgd2FzbSBwYXRoIGFzIHRoZSBiYXNlIHBhdGggZm9yIHRoZSAud2FzbSBmaWxlLlxuICAgICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBpbmZlcnJlZFdhc21QYXRoUHJlZml4ICsgZmlsZU5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3J0V2FzbUZhY3RvcnkoY29uZmlnKS50aGVuKFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICBpZiAob2JqZWN0VXJsKSB7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxuICAgICAgICAod2hhdCkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCh3aGF0KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5yYWNlKHRhc2tzKTtcblxuICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJBc3NlbWJseSBiYWNrZW5kIGluaXRpYWxpemluZyBmYWlsZWQgZHVlIHRvIHRpbWVvdXQ6ICR7dGltZW91dH1tc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XG4gICAgcmV0dXJuIHdhc207XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBpbml0aWFsaXplZCB5ZXQuJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcbiAgICAvLyBUT0RPOiBjdXJyZW50bHkgXCJQVGhyZWFkLnRlcm1pbmF0ZUFsbFRocmVhZHMoKVwiIGlzIG5vdCBleHBvc2VkIGluIHRoZSB3YXNtIG1vZHVsZS5cbiAgICAvLyAgICAgICBBbmQgdGhpcyBmdW5jdGlvbiBpcyBub3QgeWV0IGNhbGxlZCBieSBhbnkgY29kZS5cbiAgICAvLyAgICAgICBJZiBpdCBpcyBuZWVkZWQgaW4gdGhlIGZ1dHVyZSwgd2Ugc2hvdWxkIGV4cG9zZSBpdCBpbiB0aGUgd2FzbSBtb2R1bGUgYW5kIHVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUuXG5cbiAgICAvLyB3YXNtPy5QVGhyZWFkPy50ZXJtaW5hdGVBbGxUaHJlYWRzKCk7XG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgYWJvcnRlZCA9IHRydWU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgYWxsb2NXYXNtU3RyaW5nID0gKGRhdGE6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IGRhdGFMZW5ndGggPSB3YXNtLmxlbmd0aEJ5dGVzVVRGOChkYXRhKSArIDE7XG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XG4gIHdhc20uc3RyaW5nVG9VVEY4KGRhdGEsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xuICBhbGxvY3MucHVzaChkYXRhT2Zmc2V0KTtcblxuICByZXR1cm4gZGF0YU9mZnNldDtcbn07XG5cbmludGVyZmFjZSBFeHRyYU9wdGlvbnNIYW5kbGVyIHtcbiAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpdGVyYXRlRXh0cmFPcHRpb25zID0gKFxuICBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgcHJlZml4OiBzdHJpbmcsXG4gIHNlZW46IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+LFxuICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyLFxuKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBpbiBvcHRpb25zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwcmVmaXggPyBwcmVmaXggKyBrZXkgOiBrZXk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5hbWUgKyAnLicsIHNlZW4sIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGhhbmRsZXIobmFtZSwgdmFsdWUgPyAnMScgOiAnMCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGhhbmRsZSBleHRyYSBjb25maWcgdHlwZTogJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogY2hlY2sgd2ViIGFzc2VtYmx5IEFQSSdzIGxhc3QgZXJyb3IgYW5kIHRocm93IGVycm9yIGlmIGFueSBlcnJvciBvY2N1cnJlZC5cbiAqIEBwYXJhbSBtZXNzYWdlIGEgbWVzc2FnZSB1c2VkIHdoZW4gYW4gZXJyb3Igb2NjdXJyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGVja0xhc3RFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IHBhcmFtc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgcHRyU2l6ZSk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0LCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZVBvaW50ZXIgPSB3YXNtLmdldFZhbHVlKHBhcmFtc09mZnNldCArIHB0clNpemUsICcqJyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNldmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1ZlcmJvc2l0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAvLyBEZWZhdWx0IHRvIDBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy50ZXJtaW5hdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XG4gICAgaWYgKG9wdGlvbnM/LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YWdEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG9wdGlvbnMudGFnLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIHJ1bk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVSdW5PcHRpb25zKFxuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISxcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwhLFxuICAgICAgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsXG4gICAgICB0YWdEYXRhT2Zmc2V0LFxuICAgICk7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIHJ1biBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhvcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFJ1bkNvbmZpZ0VudHJ5KHJ1bk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbcnVuT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHR5cGUgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZyB8IHVua25vd24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwpIHtcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdleHRlbmRlZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiA5OTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBncmFwaCBvcHRpbWl6YXRpb24gbGV2ZWw6ICR7Z3JhcGhPcHRpbWl6YXRpb25MZXZlbH1gKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCcgfCAncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChleGVjdXRpb25Nb2RlKSB7XG4gICAgY2FzZSAnc2VxdWVudGlhbCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdwYXJhbGxlbCc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBleGVjdXRpb24gbW9kZTogJHtleGVjdXRpb25Nb2RlfWApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmREZWZhdWx0T3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogdm9pZCA9PiB7XG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xuICAgIG9wdGlvbnMuZXh0cmEgPSB7fTtcbiAgfVxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xuICAgIG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiA9IHt9O1xuICB9XG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgaWYgKCFzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cbiAgaWYgKFxuICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzICYmXG4gICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZSgoZXApID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpXG4gICkge1xuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmRTZXNzaW9uQ29uZmlnID0gKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XG4gIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG4gIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmRFcE9wdGlvbiA9IChlcE9wdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+LCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuICBlcE9wdGlvbnMucHVzaChba2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0XSk7XG59O1xuXG5jb25zdCBzZXJpYWxpemVXZWJOTkZyZWVEaW1lbnNpb25Cb3VuZHMgPSAoXG4gIGJvdW5kczogSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zWydmcmVlRGltZW5zaW9uQm91bmRzJ10sXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoIWJvdW5kcykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IHNlcmlhbGl6ZWRFbnRyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtuYW1lLCBib3VuZF0gb2YgT2JqZWN0LmVudHJpZXMoYm91bmRzKSkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJOTiBmcmVlRGltZW5zaW9uQm91bmRzIGRpbWVuc2lvbiBuYW1lIG11c3Qgbm90IGJlIGVtcHR5LicpO1xuICAgIH1cbiAgICBpZiAobmFtZS5pbmNsdWRlcygnOicpIHx8IG5hbWUuaW5jbHVkZXMoJzsnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXZWJOTiBmcmVlRGltZW5zaW9uQm91bmRzIGRpbWVuc2lvbiBuYW1lIG11c3Qgbm90IGluY2x1ZGUgJzonIG9yICc7JzogJHtuYW1lfWApO1xuICAgIH1cblxuICAgIGNvbnN0IG1pblNpemUgPSBib3VuZD8ubWluU2l6ZSA/PyAxO1xuICAgIGNvbnN0IG1heFNpemUgPSBib3VuZD8ubWF4U2l6ZTtcblxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihtaW5TaXplKSB8fCBtaW5TaXplIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXZWJOTiBmcmVlRGltZW5zaW9uQm91bmRzIG1pblNpemUgbXVzdCBiZSBhbiBpbnRlZ2VyID49IDEgZm9yIGRpbWVuc2lvbjogJHtuYW1lfWApO1xuICAgIH1cbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobWF4U2l6ZSkgfHwgbWF4U2l6ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgV2ViTk4gZnJlZURpbWVuc2lvbkJvdW5kcyBtYXhTaXplIG11c3QgYmUgYW4gaW50ZWdlciA+PSAxIGZvciBkaW1lbnNpb246ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgaWYgKG1heFNpemUgPCBtaW5TaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYk5OIGZyZWVEaW1lbnNpb25Cb3VuZHMgbWF4U2l6ZSBtdXN0IGJlID49IG1pblNpemUgZm9yIGRpbWVuc2lvbjogJHtuYW1lfWApO1xuICAgIH1cblxuICAgIHNlcmlhbGl6ZWRFbnRyaWVzLnB1c2goYCR7bmFtZX06JHttaW5TaXplfToke21heFNpemV9YCk7XG4gIH1cblxuICByZXR1cm4gc2VyaWFsaXplZEVudHJpZXMuam9pbignOycpO1xufTtcblxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMgKFxuICBzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLFxuICBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgYWxsb2NzOiBudW1iZXJbXSxcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCBleGVjdXRpb25Qcm92aWRlcnMgPSBzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMhO1xuICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xuICAgIGNvbnN0IGVwT3B0aW9uczogQXJyYXk8W251bWJlciwgbnVtYmVyXT4gPSBbXTtcblxuICAgIC8vIGNoZWNrIEVQIG5hbWVcbiAgICBzd2l0Y2ggKGVwTmFtZSkge1xuICAgICAgY2FzZSAnd2Vibm4nOlxuICAgICAgICBlcE5hbWUgPSAnV0VCTk4nO1xuICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAvLyBjb25zdCBjb250ZXh0ID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dpdGhNTENvbnRleHQpPy5jb250ZXh0O1xuICAgICAgICAgIGNvbnN0IGRldmljZVR5cGUgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/LmRldmljZVR5cGU7XG4gICAgICAgICAgY29uc3QgZnJlZURpbWVuc2lvbkJvdW5kcyA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZnJlZURpbWVuc2lvbkJvdW5kcztcbiAgICAgICAgICBpZiAoZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ2RldmljZVR5cGUnLCBkZXZpY2VUeXBlLCBhbGxvY3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZnJlZURpbWVuc2lvbkJvdW5kcykge1xuICAgICAgICAgICAgY29uc3Qgc2VyaWFsaXplZEJvdW5kcyA9IHNlcmlhbGl6ZVdlYk5ORnJlZURpbWVuc2lvbkJvdW5kcyhmcmVlRGltZW5zaW9uQm91bmRzKTtcbiAgICAgICAgICAgIGlmIChzZXJpYWxpemVkQm91bmRzKSB7XG4gICAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ0ZyZWVEaW1lbnNpb25Cb3VuZHMnLCBzZXJpYWxpemVkQm91bmRzLCBhbGxvY3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBlbmFibGVDYXVzYWxMTTogc2VsZWN0cyBiZXR3ZWVuIGNvbmNhdC1iYXNlZCAoc3RhdGVmdWwpIHZzIFNjYXR0ZXJORC1iYXNlZCAoc3RhdGVsZXNzKVxuICAgICAgICAgIC8vIEtWLWNhY2hlIHN0cmF0ZWd5IGluIHRoZSBHcm91cFF1ZXJ5QXR0ZW50aW9uIG9wIGJ1aWxkZXIuXG4gICAgICAgICAgY29uc3QgZW5hYmxlQ2F1c2FsTE0gPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/LmVuYWJsZUNhdXNhbExNO1xuICAgICAgICAgIGlmIChlbmFibGVDYXVzYWxMTSkge1xuICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnZW5hYmxlQ2F1c2FsTE0nLCAndHJ1ZScsIGFsbG9jcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2ViZ3B1JzpcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgZXBOYW1lID0gJ1dlYkdQVSc7XG4gICAgICAgICAgbGV0IGN1c3RvbURldmljZTogR1BVRGV2aWNlIHwgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBzZXQgY3VzdG9tIEdQVSBkZXZpY2VcbiAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLmRldmljZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIEdQVURldmljZSAhPT0gJ3VuZGVmaW5lZCcgJiYgd2ViZ3B1T3B0aW9ucy5kZXZpY2UgaW5zdGFuY2VvZiBHUFVEZXZpY2UpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21EZXZpY2UgPSB3ZWJncHVPcHRpb25zLmRldmljZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgR1BVIGRldmljZSBzZXQgaW4gV2ViR1BVIEVQIG9wdGlvbnMuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IGdyYXBoIGNhcHR1cmUgb3B0aW9uIGZyb20gc2Vzc2lvbiBvcHRpb25zXG4gICAgICAgICAgICBjb25zdCB7IGVuYWJsZUdyYXBoQ2FwdHVyZSB9ID0gc2Vzc2lvbk9wdGlvbnM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVuYWJsZUdyYXBoQ2FwdHVyZSA9PT0gJ2Jvb2xlYW4nICYmIGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xuICAgICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdlbmFibGVHcmFwaENhcHR1cmUnLCAnMScsIGFsbG9jcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCBsYXlvdXQgb3B0aW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdwcmVmZXJyZWRMYXlvdXQnLCB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IGZvcmNlIENQVSBmYWxsYmFjayBub2Rlc1xuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXMpIHtcbiAgICAgICAgICAgICAgY29uc3QgbmFtZXMgPSBBcnJheS5pc0FycmF5KHdlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXMpXG4gICAgICAgICAgICAgICAgPyB3ZWJncHVPcHRpb25zLmZvcmNlQ3B1Tm9kZU5hbWVzXG4gICAgICAgICAgICAgICAgOiBbd2ViZ3B1T3B0aW9ucy5mb3JjZUNwdU5vZGVOYW1lc107XG5cbiAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnZm9yY2VDcHVOb2RlTmFtZXMnLCBuYW1lcy5qb2luKCdcXG4nKSwgYWxsb2NzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHZhbGlkYXRpb24gbW9kZVxuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMudmFsaWRhdGlvbk1vZGUpIHtcbiAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAndmFsaWRhdGlvbk1vZGUnLCB3ZWJncHVPcHRpb25zLnZhbGlkYXRpb25Nb2RlLCBhbGxvY3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGluZm8gPSBnZXRJbnN0YW5jZSgpLndlYmdwdVJlZ2lzdGVyRGV2aWNlIShjdXN0b21EZXZpY2UpO1xuICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCBbZGV2aWNlSWQsIGluc3RhbmNlSGFuZGxlLCBkZXZpY2VIYW5kbGVdID0gaW5mbztcbiAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ2RldmljZUlkJywgZGV2aWNlSWQudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ3dlYmdwdUluc3RhbmNlJywgaW5zdGFuY2VIYW5kbGUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ3dlYmdwdURldmljZScsIGRldmljZUhhbmRsZS50b1N0cmluZygpLCBhbGxvY3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcE5hbWUgPSAnSlMnO1xuICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWJncHVPcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zPy5wcmVmZXJyZWRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcHJlZmVycmVkTGF5b3V0IG11c3QgYmUgZWl0aGVyICdOQ0hXJyBvciAnTkhXQyc6ICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9YCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ3ByZWZlcnJlZExheW91dCcsIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhc20nOlxuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgY29udGludWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcbiAgICBjb25zdCBlcE9wdGlvbnNDb3VudCA9IGVwT3B0aW9ucy5sZW5ndGg7XG4gICAgbGV0IGtleXNPZmZzZXQgPSAwO1xuICAgIGxldCB2YWx1ZXNPZmZzZXQgPSAwO1xuICAgIGlmIChlcE9wdGlvbnNDb3VudCA+IDApIHtcbiAgICAgIGtleXNPZmZzZXQgPSBnZXRJbnN0YW5jZSgpLl9tYWxsb2MoZXBPcHRpb25zQ291bnQgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFKTtcbiAgICAgIGFsbG9jcy5wdXNoKGtleXNPZmZzZXQpO1xuICAgICAgdmFsdWVzT2Zmc2V0ID0gZ2V0SW5zdGFuY2UoKS5fbWFsbG9jKGVwT3B0aW9uc0NvdW50ICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSk7XG4gICAgICBhbGxvY3MucHVzaCh2YWx1ZXNPZmZzZXQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcE9wdGlvbnNDb3VudDsgaSsrKSB7XG4gICAgICAgIGdldEluc3RhbmNlKCkuc2V0VmFsdWUoa2V5c09mZnNldCArIGkgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFLCBlcE9wdGlvbnNbaV1bMF0sICcqJyk7XG4gICAgICAgIGdldEluc3RhbmNlKCkuc2V0VmFsdWUodmFsdWVzT2Zmc2V0ICsgaSAqIGdldEluc3RhbmNlKCkuUFRSX1NJWkUsIGVwT3B0aW9uc1tpXVsxXSwgJyonKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgKGF3YWl0IGdldEluc3RhbmNlKCkuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyKFxuICAgICAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSxcbiAgICAgICAgZXBOYW1lRGF0YU9mZnNldCxcbiAgICAgICAga2V5c09mZnNldCxcbiAgICAgICAgdmFsdWVzT2Zmc2V0LFxuICAgICAgICBlcE9wdGlvbnNDb3VudCxcbiAgICAgICkpICE9PSAwXG4gICAgKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gYXN5bmMgKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxbbnVtYmVyLCBudW1iZXJbXV0+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7IC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNldmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ1ZlcmJvc2l0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPz8gMDsgLy8gRGVmYXVsdCB0byAwIC0gdmVyYm9zZVxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dWZXJib3NpdHlMZXZlbCkgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPCAwIHx8IGxvZ1ZlcmJvc2l0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID1cbiAgICAgIHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoLCBhbGxvY3MpXG4gICAgICAgIDogMDtcblxuICAgIHNlc3Npb25PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbk9wdGlvbnMoXG4gICAgICBncmFwaE9wdGltaXphdGlvbkxldmVsLFxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVDcHVNZW1BcmVuYSxcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybixcbiAgICAgIGV4ZWN1dGlvbk1vZGUsXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZVByb2ZpbGluZyxcbiAgICAgIDAsXG4gICAgICBsb2dJZERhdGFPZmZzZXQsXG4gICAgICBsb2dTZXZlcml0eUxldmVsLFxuICAgICAgbG9nVmVyYm9zaXR5TGV2ZWwsXG4gICAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0LFxuICAgICk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBzZXNzaW9uIG9wdGlvbnMuXCIpO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgIGF3YWl0IHNldEV4ZWN1dGlvblByb3ZpZGVycyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgc2Vzc2lvbk9wdGlvbnMsIGFsbG9jcyk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZW5hYmxlR3JhcGhDYXB0dXJlIG11c3QgYmUgYSBib29sZWFuIHZhbHVlOiAke3Nlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZX1gKTtcbiAgICAgIH1cbiAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoXG4gICAgICAgIHNlc3Npb25PcHRpb25zSGFuZGxlLFxuICAgICAgICAnZW5hYmxlR3JhcGhDYXB0dXJlJyxcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlLnRvU3RyaW5nKCksXG4gICAgICAgIGFsbG9jcyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSBuYW1lIG11c3QgYmUgYSBzdHJpbmc6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgfHwgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSB2YWx1ZSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXI6ICR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhuYW1lLCBhbGxvY3MpO1xuICAgICAgICBpZiAod2FzbS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlKHNlc3Npb25PcHRpb25zSGFuZGxlLCBuYW1lT2Zmc2V0LCB2YWx1ZSkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGU6ICR7bmFtZX0gLSAke3ZhbHVlfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHNlc3Npb25PcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleSwgdmFsdWUsIGFsbG9jcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuLy8gYSBkdW1teSB0eXBlIGRlY2xhcmF0aW9uIGZvciBGbG9hdDE2QXJyYXkgaW4gY2FzZSBhbnkgcG9seWZpbGwgaXMgYXZhaWxhYmxlLlxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IEZsb2F0MTZBcnJheTogYW55O1xufVxuXG4vLyBUaGlzIGZpbGUgaW5jbHVkZXMgY29tbW9uIGRlZmluaXRpb25zLiBUaGV5IGRvIE5PVCBoYXZlIGRlcGVuZGVuY3kgb24gdGhlIFdlYkFzc2VtYmx5IGluc3RhbmNlLlxuXG4vKipcbiAqIENvcGllZCBmcm9tIE9OTlggZGVmaW5pdGlvbi4gVXNlIHRoaXMgdG8gZHJvcCBkZXBlbmRlbmN5ICdvbm54X3Byb3RvJyB0byBkZWNyZWFzZSBjb21waWxlZCAuanMgZmlsZSBzaXplLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBEYXRhVHlwZSB7XG4gIHVuZGVmaW5lZCA9IDAsXG4gIGZsb2F0ID0gMSxcbiAgdWludDggPSAyLFxuICBpbnQ4ID0gMyxcbiAgdWludDE2ID0gNCxcbiAgaW50MTYgPSA1LFxuICBpbnQzMiA9IDYsXG4gIGludDY0ID0gNyxcbiAgc3RyaW5nID0gOCxcbiAgYm9vbCA9IDksXG4gIGZsb2F0MTYgPSAxMCxcbiAgZG91YmxlID0gMTEsXG4gIHVpbnQzMiA9IDEyLFxuICB1aW50NjQgPSAxMyxcbiAgY29tcGxleDY0ID0gMTQsXG4gIGNvbXBsZXgxMjggPSAxNSxcbiAgYmZsb2F0MTYgPSAxNixcblxuICAvLyA0LWJpdCBkYXRhLXR5cGVzXG4gIHVpbnQ0ID0gMjEsXG4gIGludDQgPSAyMixcbn1cblxuLyoqXG4gKiBNYXAgc3RyaW5nIHRlbnNvciBkYXRhIHRvIGVudW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtID0gKHR5cGU6IHN0cmluZyk6IERhdGFUeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50ODtcbiAgICBjYXNlICd1aW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuYm9vbDtcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MTY7XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDMyO1xuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDMyO1xuICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XG4gICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQ7XG4gICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZG91YmxlO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xuICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ2NDtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ2NDtcbiAgICBjYXNlICdpbnQ0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ0O1xuICAgIGNhc2UgJ3VpbnQ0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50NDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcgPSAodHlwZVByb3RvOiBEYXRhVHlwZSk6IFRlbnNvci5UeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcbiAgICBjYXNlIERhdGFUeXBlLmludDg6XG4gICAgICByZXR1cm4gJ2ludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XG4gICAgICByZXR1cm4gJ3VpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLmJvb2w6XG4gICAgICByZXR1cm4gJ2Jvb2wnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MTY6XG4gICAgICByZXR1cm4gJ2ludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcbiAgICAgIHJldHVybiAndWludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmludDMyOlxuICAgICAgcmV0dXJuICdpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MzI6XG4gICAgICByZXR1cm4gJ3VpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxuICAgICAgcmV0dXJuICdmbG9hdDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0OlxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmRvdWJsZTpcbiAgICAgIHJldHVybiAnZmxvYXQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ2NDpcbiAgICAgIHJldHVybiAnaW50NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDY0OlxuICAgICAgcmV0dXJuICd1aW50NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50NDpcbiAgICAgIHJldHVybiAnaW50NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NDpcbiAgICAgIHJldHVybiAndWludDQnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGVQcm90b31gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgdGVuc29yIHNpemUgaW4gYnl0ZXMgYnkgdGhlIGdpdmVuIGRhdGEgdHlwZSBhbmQgZGltZW5zaW9uc1xuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzID0gKFxuICBkYXRlVHlwZTogbnVtYmVyLFxuICBkaW1zT3JTaXplOiByZWFkb25seSBudW1iZXJbXSB8IG51bWJlcixcbik6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IGVsZW1lbnRTaXplID0gW1xuICAgIC0xLCAvLyB1bmRlZmluZWQgPSAwXG4gICAgNCwgLy8gZmxvYXQgPSAxXG4gICAgMSwgLy8gdWludDggPSAyXG4gICAgMSwgLy8gaW50OCA9IDNcbiAgICAyLCAvLyB1aW50MTYgPSA0XG4gICAgMiwgLy8gaW50MTYgPSA1XG4gICAgNCwgLy8gaW50MzIgPSA2XG4gICAgOCwgLy8gaW50NjQgPSA3XG4gICAgLTEsIC8vIHN0cmluZyA9IDhcbiAgICAxLCAvLyBib29sID0gOVxuICAgIDIsIC8vIGZsb2F0MTYgPSAxMFxuICAgIDgsIC8vIGRvdWJsZSA9IDExXG4gICAgNCwgLy8gdWludDMyID0gMTJcbiAgICA4LCAvLyB1aW50NjQgPSAxM1xuICAgIC0xLCAvLyBjb21wbGV4NjQgPSAxNFxuICAgIC0xLCAvLyBjb21wbGV4MTI4ID0gMTVcbiAgICAtMSwgLy8gYmZsb2F0MTYgPSAxNlxuICAgIC0xLCAvLyBGTE9BVDhFNE0zRk4gPSAxN1xuICAgIC0xLCAvLyBGTE9BVDhFNE0zRk5VWiA9IDE4XG4gICAgLTEsIC8vIEZMT0FUOEU1TTIgPSAxOVxuICAgIC0xLCAvLyBGTE9BVDhFNU0yRk5VWiA9IDIwXG4gICAgMC41LCAvLyB1aW50NCA9IDIxXG4gICAgMC41LCAvLyBpbnQ0ID0gMjJcbiAgXVtkYXRlVHlwZV07XG5cbiAgY29uc3Qgc2l6ZSA9IHR5cGVvZiBkaW1zT3JTaXplID09PSAnbnVtYmVyJyA/IGRpbXNPclNpemUgOiBkaW1zT3JTaXplLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xuICByZXR1cm4gZWxlbWVudFNpemUgPiAwID8gTWF0aC5jZWlsKHNpemUgKiBlbGVtZW50U2l6ZSkgOiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIGdldCB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciBieSB0aGUgZ2l2ZW4gdGVuc29yIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IChcbiAgdHlwZTogVGVuc29yLlR5cGUsXG4pOlxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvciA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgLy8gYWxsb3cgRmxvYXQxNkFycmF5IHBvbHlmaWxsLlxuICAgICAgcmV0dXJuIHR5cGVvZiBGbG9hdDE2QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEZsb2F0MTZBcnJheS5mcm9tID8gRmxvYXQxNkFycmF5IDogVWludDE2QXJyYXk7XG4gICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgIGNhc2UgJ2ludDgnOlxuICAgICAgcmV0dXJuIEludDhBcnJheTtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBJbnQxNkFycmF5O1xuICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgIHJldHVybiBJbnQzMkFycmF5O1xuICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gVWludDMyQXJyYXk7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIEJpZ0ludDY0QXJyYXk7XG4gICAgY2FzZSAndWludDY0JzpcbiAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIHN0cmluZyBsb2cgbGV2ZWwgdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAobG9nTGV2ZWwpIHtcbiAgICBjYXNlICd2ZXJib3NlJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2luZm8nOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnd2FybmluZyc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdmYXRhbCc6XG4gICAgICByZXR1cm4gNDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke2xvZ0xldmVsfWApO1xuICB9XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBHUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUgPSAodHlwZTogVGVuc29yLlR5cGUpOiB0eXBlIGlzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXMgPT5cbiAgdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XG4gIHR5cGUgPT09ICdmbG9hdDE2JyB8fFxuICB0eXBlID09PSAnaW50MzInIHx8XG4gIHR5cGUgPT09ICdpbnQ2NCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ4JyB8fFxuICB0eXBlID09PSAnYm9vbCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ0JyB8fFxuICB0eXBlID09PSAnaW50NCc7XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IFdlYk5OIE1MVGVuc29yXG4gKi9cbmV4cG9ydCBjb25zdCBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzID0+XG4gIHR5cGUgPT09ICdmbG9hdDMyJyB8fFxuICB0eXBlID09PSAnZmxvYXQxNicgfHxcbiAgdHlwZSA9PT0gJ2ludDMyJyB8fFxuICB0eXBlID09PSAnaW50NjQnIHx8XG4gIHR5cGUgPT09ICd1aW50MzInIHx8XG4gIHR5cGUgPT09ICd1aW50NjQnIHx8XG4gIHR5cGUgPT09ICdpbnQ4JyB8fFxuICB0eXBlID09PSAndWludDgnIHx8XG4gIHR5cGUgPT09ICdib29sJyB8fFxuICB0eXBlID09PSAndWludDQnIHx8XG4gIHR5cGUgPT09ICdpbnQ0JztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGNhc2UgJ21sLXRlbnNvcic6XG4gICAgICByZXR1cm4gNTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIGxvY2F0aW9uOiAke2xvY2F0aW9ufWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBpbnRlZ2VyIGRhdGEgbG9jYXRpb24gdG8gc3RyaW5nIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25FbnVtVG9TdHJpbmcgPSAobG9jYXRpb246IG51bWJlcik6IFRlbnNvci5EYXRhTG9jYXRpb24gfCB1bmRlZmluZWQgPT5cbiAgKFsnbm9uZScsICdjcHUnLCAnY3B1LXBpbm5lZCcsICd0ZXh0dXJlJywgJ2dwdS1idWZmZXInLCAnbWwtdGVuc29yJ10gYXMgY29uc3QpW2xvY2F0aW9uXTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XG5cbi8qKlxuICogTG9hZCBhIGZpbGUgaW50byBhIFVpbnQ4QXJyYXkuXG4gKlxuICogQHBhcmFtIGZpbGUgLSB0aGUgZmlsZSB0byBsb2FkLiBDYW4gYmUgYSBVUkwvcGF0aCwgYSBCbG9iLCBhbiBBcnJheUJ1ZmZlciwgb3IgYSBVaW50OEFycmF5LlxuICogQHJldHVybnMgYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgdGhlIGZpbGUgZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlID0gYXN5bmMgKGZpbGU6IHN0cmluZyB8IEJsb2IgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5KTogUHJvbWlzZTxVaW50OEFycmF5PiA9PiB7XG4gIGlmICh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAvLyBsb2FkIGZpbGUgaW50byBBcnJheUJ1ZmZlciBpbiBOb2RlLmpzXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHJlYWRGaWxlIH0gPSByZXF1aXJlKCdub2RlOmZzL3Byb21pc2VzJyk7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCByZWFkRmlsZShmaWxlKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLmNvZGUgPT09ICdFUlJfRlNfRklMRV9UT09fTEFSR0UnKSB7XG4gICAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBmcy5jcmVhdGVSZWFkU3RyZWFtIGluc3RlYWRcbiAgICAgICAgICBjb25zdCB7IGNyZWF0ZVJlYWRTdHJlYW0gfSA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcbiAgICAgICAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtKGZpbGUpO1xuICAgICAgICAgIGNvbnN0IGNodW5rczogVWludDhBcnJheVtdID0gW107XG4gICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBzdHJlYW0pIHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9hZCBmaWxlIGludG8gQXJyYXlCdWZmZXIgaW4gYnJvd3NlcnNcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZmlsZSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbGVkIHRvIGxvYWQgZXh0ZXJuYWwgZGF0YSBmaWxlOiAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJyk7XG4gICAgICBjb25zdCBmaWxlU2l6ZSA9IGNvbnRlbnRMZW5ndGhIZWFkZXIgPyBwYXJzZUludChjb250ZW50TGVuZ3RoSGVhZGVyLCAxMCkgOiAwO1xuICAgICAgaWYgKGZpbGVTaXplIDwgMTA3Mzc0MTgyNCAvKiAxR0IgKi8pIHtcbiAgICAgICAgLy8gd2hlbiBDb250ZW50LUxlbmd0aCBoZWFkZXIgaXMgbm90IHNldCwgd2UgY2Fubm90IGRldGVybWluZSB0aGUgZmlsZSBzaXplLiBXZSBhc3N1bWUgaXQgaXMgc21hbGwgZW5vdWdoIHRvXG4gICAgICAgIC8vIGxvYWQgaW50byBtZW1vcnkuXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbGUgaXMgdG9vIGxhcmdlLCB1c2Ugc3RyZWFtIGluc3RlYWRcbiAgICAgICAgaWYgKCFyZXNwb25zZS5ib2R5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX0sIG5vIHJlc3BvbnNlIGJvZHkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIHRyeSB0byBjcmVhdGUgQXJyYXlCdWZmZXIgZGlyZWN0bHlcbiAgICAgICAgICBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoZmlsZVNpemUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XG4gICAgICAgICAgICAvLyB1c2UgV2ViQXNzZW1ibHkgTWVtb3J5IHRvIGFsbG9jYXRlIGxhcmdlciBBcnJheUJ1ZmZlclxuICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoZmlsZVNpemUgLyA2NTUzNik7XG4gICAgICAgICAgICBidWZmZXIgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHsgaW5pdGlhbDogcGFnZXMsIG1heGltdW06IHBhZ2VzIH0pLmJ1ZmZlcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2h1bmtTaXplID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBjb25zdCBjaHVuayA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBjaHVua1NpemUpO1xuICAgICAgICAgIGNodW5rLnNldCh2YWx1ZSk7XG4gICAgICAgICAgb2Zmc2V0ICs9IGNodW5rU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCAwLCBmaWxlU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XG4gIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gZmlsZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZmlsZSk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cbi8vIFdlYk5OIEFQSSBzcGVjaWZpY2F0aW9uLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYm1hY2hpbmVsZWFybmluZy93ZWJubi9pc3N1ZXMvNjc3XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianNlcC93ZWJubi93ZWJubi5kLnRzXCIgLz5cblxuaW1wb3J0IHsgRW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3IsIFRSQUNFX0VWRU5UX0JFR0lOLCBUUkFDRV9FVkVOVF9FTkQgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcbiAgVGVuc29yTWV0YWRhdGEsXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHsgc2V0UnVuT3B0aW9ucyB9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHsgc2V0U2Vzc2lvbk9wdGlvbnMgfSBmcm9tICcuL3Nlc3Npb24tb3B0aW9ucyc7XG5pbXBvcnQge1xuICBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyxcbiAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtLFxuICBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsXG4gIGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlLFxuICBsb2dMZXZlbFN0cmluZ1RvRW51bSxcbiAgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsXG4gIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtLFxuICB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IsXG59IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XG5cbi8vICNyZWdpb24gSW5pdGlhbGl6YXRpb25zXG5cbi8qKlxuICogVGhlcmUgYXJlIDQgZGlmZmVyZW50IFwiaW5pdGlhbGl6YXRpb25cIiBzdGVwcyBmb3IgT1JULiBUaGV5IGhhcHBlbiBpbiBkaWZmZXJlbnQgcGxhY2VzIGFuZCBkaWZmZXJlbnQgdGltZS5cbiAqXG4gKiAxLiBKYXZhU2NyaXB0IGluaXRpYWxpemF0aW9uIGZvciBvbm54cnVudGltZS1jb21tb24gYW5kIG9ubnhydW50aW1lLXdlYi5cbiAqICAgIFRoaXMgaXMgdGhlIGZpcnN0IGluaXRpYWxpemF0aW9uIHN0ZXAuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGNhbGxzIG9ubnhydW50aW1lLWNvbW1vbidzIHJlZ2lzdGVyQmFja2VuZCgpXG4gKiBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyB0byByZWdpc3RlciBhbGwgdGhlIGF2YWlsYWJsZSBiYWNrZW5kcy4gVGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uIGlzIHZlcnkgZmFzdC4gSXQgb25seVxuICogcmVnaXN0ZXJzIHRoZSBiYWNrZW5kIG5hbWUgd2l0aCB0aGUgdW5pbml0aWFsaXplZCBiYWNrZW5kIG9iamVjdC4gTm8gaGVhdnkgaW5pdGlhbGl6YXRpb24gaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXG4gKiAgICBSZWZlciB0byB3ZWIvbGliL2luZGV4LnRzIGZvciB0aGUgYmFja2VuZCByZWdpc3RyYXRpb24uXG4gKlxuICogMi4gV2ViQXNzZW1ibHkgYXJ0aWZhY3QgaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgd2hlbiBhbnkgcmVnaXN0ZXJlZCB3YXNtIGJhY2tlbmQgaXMgdXNlZCBmb3IgdGhlIGZpcnN0IHRpbWUgKGllLiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzXG4gKiBjYWxsZWQpLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxuICogICAgIC0gY3JlYXRlIGEgcHJveHkgd29ya2VyIGFuZCBtYWtlIHN1cmUgdGhlIHByb3h5IHdvcmtlciBpcyByZWFkeSB0byByZWNlaXZlIG1lc3NhZ2VzLCBpZiBwcm94eSBpcyBlbmFibGVkLlxuICogICAgIC0gcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiwgbG9jYXRlIGNvcnJlY3QgV2ViQXNzZW1ibHkgYXJ0aWZhY3QgcGF0aCBhbmQgY2FsbCB0aGUgRW1zY3JpcHRlbiBnZW5lcmF0ZWRcbiAqIEphdmFTY3JpcHQgY29kZSB0byBpbml0aWFsaXplIHRoZSBXZWJBc3NlbWJseSBydW50aW1lLlxuICogICAgICAgICAtIGlmIHByb3h5IGlzIGVuYWJsZWQsIHRoaXMgc3RlcCBoYXBwZW5zIGluIHRoZSBwcm94eSB3b3JrZXIgdXNpbmcgbWVzc2FnZSAnaW5pdC13YXNtJy5cbiAqICAgICAgICAgLSBkb3dubG9hZGluZyB0aGUgJ29ydC13YXNtey4uLn0ud2FzbScgZmlsZSBpcyBkb25lIGluIHRoaXMgc3RlcC5cbiAqICAgICAgICAgLSBpZiBtdWx0aS10aHJlYWQgaXMgZW5hYmxlZCwgb25lIG9yIG1vcmUgd2Vid29ya2VyIHdpbGwgYmUgY3JlYXRlZCB0byBpbml0aWFsaXplIHRoZSBQVGhyZWFkIHRocmVhZHBvb2wuXG4gKlxuICogMy4gT1JUIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIGFmdGVyIHN0ZXAgMi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgcGVyZm9ybXMgT05OWCBSdW50aW1lIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogRnVuY3Rpb24gYF9PcnRJbml0KClgIGlzIGNhbGxlZCBpbiB0aGlzIHN0ZXAuXG4gKiAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtb3J0Jy5cbiAqICAgICAtIGxvZ2dpbmcgbGV2ZWwgKG9ydC5lbnYubG9nTGV2ZWwpIGFuZCB0aHJlYWQgbnVtYmVyIChvcnQuZW52Lndhc20ubnVtVGhyZWFkcykgYXJlIHNldCBpbiB0aGlzIHN0ZXAuXG4gKlxuICogNC4gU2Vzc2lvbiBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDMgc3RlcHMgKHRoZXkgb25seSBjYWxsZWQgb25jZSksXG4gKiB0aGlzIHN0ZXAgd2lsbCBiZSBkb25lIGZvciBlYWNoIHNlc3Npb24uIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlIGZvbGxvd2luZ3M6XG4gKiAgICBJZiB0aGUgcGFyYW1ldGVyIGlzIGEgVVJMOlxuICogICAgLSBkb3dubG9hZCB0aGUgbW9kZWwgZGF0YSBmcm9tIHRoZSBVUkwuXG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcbiAqICAgIC0gZGVyZWZlcmVuY2UgdGhlIG1vZGVsIGJ1ZmZlci4gVGhpcyBzdGVwIGFsbG93cyB0aGUgb3JpZ2luYWwgQXJyYXlCdWZmZXIgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKiAgICBJZiB0aGUgcGFyYW1ldGVyIGlzIGEgVWludDhBcnJheSBvYmplY3Q6XG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcbiAqICAgIC0gY2FsbCBgX09ydENyZWF0ZVNlc3Npb24oKWAgdG8gY3JlYXRlIHRoZSBzZXNzaW9uLiAocHJveHk6ICdjcmVhdGUnKVxuICpcbiAqXG4gKi9cblxuLyoqXG4gKiBpbml0aWFsaXplIE9SVCBlbnZpcm9ubWVudC5cbiAqXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxuICogQHBhcmFtIGxvZ2dpbmdMZXZlbCBDcmVhdGVFbnYoc3RhdGljX2Nhc3Q8T3J0TG9nZ2luZ0xldmVsPihsb2dnaW5nX2xldmVsKSlcbiAqL1xuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IGVycm9yQ29kZSA9IGdldEluc3RhbmNlKCkuX09ydEluaXQobnVtVGhyZWFkcywgbG9nZ2luZ0xldmVsKTtcbiAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBvbm54cnVudGltZS5cIik7XG4gIH1cbn07XG5cbi8qKlxuICogaW5pdGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jIChlbnY6IEVudik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAvLyBpbml0IE9SVFxuICBpbml0T3J0KGVudi53YXNtLm51bVRocmVhZHMhLCBsb2dMZXZlbFN0cmluZ1RvRW51bShlbnYubG9nTGV2ZWwpKTtcbn07XG5cbi8qKlxuICogcGVyZm9ybSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvbi5cbiAqXG4gKiBAcGFyYW0gZW52XG4gKiBAcGFyYW0gZXBOYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0RXAgPSBhc3luYyAoZW52OiBFbnYsIGVwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXRpYWxpemUgQVNZTkNJRlkgc3VwcG9ydFxuICBnZXRJbnN0YW5jZSgpLmFzeW5jSW5pdD8uKCk7XG5cbiAgLy8gcGVyZm9ybSBXZWJHUFUgYXZhaWxhYmlsaXR5IGNoZWNrICggZWl0aGVyIEpTRVAgb3IgV2ViR1BVIEVQIClcbiAgbGV0IHdlYmdwdUFkYXB0ZXIgPSBlbnYud2ViZ3B1LmFkYXB0ZXIgYXMgR1BVQWRhcHRlciB8IG51bGw7XG4gIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnIHx8ICFuYXZpZ2F0b3IuZ3B1KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdQVSBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCF3ZWJncHVBZGFwdGVyKSB7XG4gICAgICAvLyBpZiBhZGFwdGVyIGlzIG5vdCBzZXQsIHJlcXVlc3QgYSBuZXcgYWRhcHRlci5cbiAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9IGVudi53ZWJncHUucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgaWYgKHBvd2VyUHJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkICYmIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2xvdy1wb3dlcicgJiYgcG93ZXJQcmVmZXJlbmNlICE9PSAnaGlnaC1wZXJmb3JtYW5jZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvd2VyUHJlZmVyZW5jZSBzZXR0aW5nOiBcIiR7cG93ZXJQcmVmZXJlbmNlfVwiYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBmb3JjZUZhbGxiYWNrQWRhcHRlciA9IGVudi53ZWJncHUuZm9yY2VGYWxsYmFja0FkYXB0ZXI7XG4gICAgICBpZiAoZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZm9yY2VGYWxsYmFja0FkYXB0ZXIgc2V0dGluZzogXCIke2ZvcmNlRmFsbGJhY2tBZGFwdGVyfVwiYCk7XG4gICAgICB9XG4gICAgICB3ZWJncHVBZGFwdGVyID0gYXdhaXQgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcih7IHBvd2VyUHJlZmVyZW5jZSwgZm9yY2VGYWxsYmFja0FkYXB0ZXIgfSk7XG4gICAgICBpZiAoIXdlYmdwdUFkYXB0ZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdGYWlsZWQgdG8gZ2V0IEdQVSBhZGFwdGVyLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IG5lZWQgdG8gZW5hYmxlIGZsYWcgXCItLWVuYWJsZS11bnNhZmUtd2ViZ3B1XCIgaWYgeW91IGFyZSB1c2luZyBDaHJvbWUuJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgYWRhcHRlciBpcyBzZXQsIHZhbGlkYXRlIGl0LlxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5saW1pdHMgIT09ICdvYmplY3QnIHx8XG4gICAgICAgIHR5cGVvZiB3ZWJncHVBZGFwdGVyLmZlYXR1cmVzICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5yZXF1ZXN0RGV2aWNlICE9PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdQVSBhZGFwdGVyIHNldCBpbiBgZW52LndlYmdwdS5hZGFwdGVyYC4gSXQgbXVzdCBiZSBhIEdQVUFkYXB0ZXIgb2JqZWN0LicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHBlcmZvcm0gV2ViTk4gYXZhaWxhYmlsaXR5IGNoZWNrICggZWl0aGVyIEpTRVAgb3IgV2ViTk4gRVAgKVxuICBpZiAoZXBOYW1lID09PSAnd2Vibm4nKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnIHx8ICEobmF2aWdhdG9yIGFzIHVua25vd24gYXMgeyBtbDogdW5rbm93biB9KS5tbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJOTiBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcblxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2ViZ3B1JywgZ2V0SW5zdGFuY2UoKSwgZW52LCB3ZWJncHVBZGFwdGVyKTtcbiAgICB9XG4gICAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYm5uJywgZ2V0SW5zdGFuY2UoKSwgZW52KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGVwTmFtZSA9PT0gJ3dlYmdwdScpIHtcbiAgICAgIGdldEluc3RhbmNlKCkud2ViZ3B1SW5pdCEoKGRldmljZSkgPT4ge1xuICAgICAgICBlbnYud2ViZ3B1LmRldmljZSA9IGRldmljZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJOTiAmJiBlcE5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgICBjb25zdCBiYWNrZW5kID0gbmV3IChyZXF1aXJlKCcuL2pzZXAvYmFja2VuZC13ZWJubicpLldlYk5OQmFja2VuZCkoZW52KTtcbiAgICAgIGdldEluc3RhbmNlKCkud2Vibm5Jbml0IShbXG4gICAgICAgIGJhY2tlbmQsXG4gICAgICAgIC8vIHdlYm5uUmVzZXJ2ZVRlbnNvcklkXG4gICAgICAgICgpID0+IGJhY2tlbmQucmVzZXJ2ZVRlbnNvcklkKCksXG4gICAgICAgIC8vIHdlYm5uUmVsZWFzZVRlbnNvcklkLFxuICAgICAgICAodGVuc29ySWQ6IG51bWJlcikgPT4gYmFja2VuZC5yZWxlYXNlVGVuc29ySWQodGVuc29ySWQpLFxuICAgICAgICAvLyB3ZWJubkVuc3VyZVRlbnNvclxuICAgICAgICBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIgfCB1bmRlZmluZWQsIHRlbnNvcklkOiBudW1iZXIsIG9ubnhEYXRhVHlwZTogbnVtYmVyLCBzaGFwZTogbnVtYmVyW10sIGNvcHlPbGQpID0+XG4gICAgICAgICAgYmFja2VuZC5lbnN1cmVUZW5zb3Ioc2Vzc2lvbklkLCB0ZW5zb3JJZCwgb25ueERhdGFUeXBlLCBzaGFwZSwgY29weU9sZCksXG4gICAgICAgIC8vIHdlYm5uVXBsb2FkVGVuc29yXG4gICAgICAgICh0ZW5zb3JJZDogbnVtYmVyLCBkYXRhOiBVaW50OEFycmF5KSA9PiB7XG4gICAgICAgICAgYmFja2VuZC51cGxvYWRUZW5zb3IodGVuc29ySWQsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICAvLyB3ZWJubkRvd25sb2FkVGVuc29yXG4gICAgICAgIGFzeW5jICh0ZW5zb3JJZDogbnVtYmVyLCBkc3RCdWZmZXI6IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKSA9PlxuICAgICAgICAgIGJhY2tlbmQuZG93bmxvYWRUZW5zb3IodGVuc29ySWQsIGRzdEJ1ZmZlciksXG4gICAgICAgIC8vIHdlYm5uUmVnaXN0ZXJNTENvbnRleHRcbiAgICAgICAgKHNlc3Npb25JZDogbnVtYmVyLCBtbENvbnRleHQ6IE1MQ29udGV4dCkgPT4gYmFja2VuZC5yZWdpc3Rlck1MQ29udGV4dChzZXNzaW9uSWQsIG1sQ29udGV4dCksXG4gICAgICAgIC8vIHdlYm5uRW5hYmxlVHJhY2VFdmVudFxuICAgICAgICAhIWVudi50cmFjZSxcbiAgICAgIF0pO1xuICAgIH1cbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBJbml0aWFsaXphdGlvbnNcblxuLyoqXG4gKiB2YWxpZCBkYXRhIGxvY2F0aW9ucyBmb3IgaW5wdXQvb3V0cHV0IHRlbnNvcnMuXG4gKi9cbnR5cGUgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXQgPVxuICB8ICdjcHUnXG4gIHwgJ2NwdS1waW5uZWQnXG4gIHwgJ2dwdS1idWZmZXInXG4gIHwgJ21sLXRlbnNvcidcbiAgLy8gVXNlICdtbC10ZW5zb3InIGR1cmluZyBpbmZlcmVuY2UsIGJ1dCBvdXRwdXQgYSB0ZW5zb3IgbG9jYXRlZCBvbiB0aGUgQ1BVLlxuICB8ICdtbC10ZW5zb3ItY3B1LW91dHB1dCc7XG5cbnR5cGUgSU9CaW5kaW5nU3RhdGUgPSB7XG4gIC8qKlxuICAgKiB0aGUgaGFuZGxlIG9mIElPIGJpbmRpbmcuXG4gICAqL1xuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKlxuICAgKiB2YWx1ZSBpcyBvbmUgb2YgJ2NwdScsICdjcHUtcGlubmVkJywgJ2dwdS1idWZmZXInLCAnbWwtdGVuc29yJy5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcblxuICAvKipcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcbn07XG5cbi8qKlxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcbiAqL1xudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZSB8IG51bGwsXG4gIGVuYWJsZUdyYXBoQ2FwdHVyZTogYm9vbGVhbixcbiAgaW5wdXRPdXRwdXRCb3VuZDogYm9vbGVhbixcbl07XG5cbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcblxuLyoqXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSBzZXNzaW9uSGFuZGxlIHRoZSBoYW5kbGUgcmVwcmVzZW50aW5nIHRoZSBzZXNzaW9uLiBzaG91bGQgYmUgbm9uLXplcm8uXG4gKiBAcmV0dXJucyBhIHR1cGxlIGluY2x1ZGluZyAyIG51bWJlcnMsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQgY291bnQgYW5kIG91dHB1dCBjb3VudC5cbiAqL1xuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQgPSAoc2Vzc2lvbkhhbmRsZTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlLCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgcHRyU2l6ZSk7XG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgc2Vzc2lvbiBpbnB1dC9vdXRwdXQgY291bnQuXCIpO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gcHRyU2l6ZSA9PT0gNCA/ICdpMzInIDogJ2k2NCc7XG4gICAgcmV0dXJuIFtOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0LCB0eXBlKSksIE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBwdHJTaXplLCB0eXBlKSldO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEgPSAoXG4gIHNlc3Npb25IYW5kbGU6IG51bWJlcixcbiAgaW5kZXg6IG51bWJlcixcbik6IFtuYW1lT2Zmc2V0OiBudW1iZXIsIGVsZW1lbnRUeXBlOiBudW1iZXIsIGRpbXM/OiBBcnJheTxudW1iZXIgfCBzdHJpbmc+XSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGxldCBtZXRhZGF0YU9mZnNldCA9IDA7XG4gIHRyeSB7XG4gICAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpbmRleCwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIHB0clNpemUpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IG1ldGFkYXRhLlwiKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQsICcqJykpO1xuICAgIG1ldGFkYXRhT2Zmc2V0ID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIHB0clNpemUsICcqJykpO1xuICAgIC8vIGdldCBlbGVtZW50IHR5cGVcbiAgICBjb25zdCBlbGVtZW50VHlwZSA9IHdhc20uSEVBUDMyW21ldGFkYXRhT2Zmc2V0IC8gNF07XG4gICAgaWYgKGVsZW1lbnRUeXBlID09PSAwKSB7XG4gICAgICByZXR1cm4gW25hbWVPZmZzZXQsIDBdOyAvLyBub24tdGVuc29yXG4gICAgfVxuXG4gICAgLy8gZ2V0IGRpbXMgY291bnRcbiAgICBjb25zdCBkaW1zQ291bnQgPSB3YXNtLkhFQVBVMzJbbWV0YWRhdGFPZmZzZXQgLyA0ICsgMV07XG4gICAgLy8gZ2V0IGRpbXNcbiAgICBjb25zdCBkaW1zOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zQ291bnQ7IGkrKykge1xuICAgICAgY29uc3Qgc3ltYm9saWNEaW1OYW1lT2Zmc2V0ID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUobWV0YWRhdGFPZmZzZXQgKyA4ICsgaSAqIHB0clNpemUsICcqJykpO1xuICAgICAgZGltcy5wdXNoKFxuICAgICAgICBzeW1ib2xpY0RpbU5hbWVPZmZzZXQgIT09IDBcbiAgICAgICAgICA/IHdhc20uVVRGOFRvU3RyaW5nKHN5bWJvbGljRGltTmFtZU9mZnNldClcbiAgICAgICAgICA6IE51bWJlcih3YXNtLmdldFZhbHVlKG1ldGFkYXRhT2Zmc2V0ICsgOCArIChpICsgZGltc0NvdW50KSAqIHB0clNpemUsICcqJykpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgZGltc107XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICAgIGlmIChtZXRhZGF0YU9mZnNldCAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0RnJlZShtZXRhZGF0YU9mZnNldCk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGFsbG9jYXRlIHRoZSBtZW1vcnkgYW5kIG1lbWNweSB0aGUgZXh0ZXJuYWwgYnVmZmVyLlxuICpcbiAqIEBwYXJhbSBtb2RlbCAtIHRoZSBleHRlcm5hbCBidWZmZXIgY29udGFpbmluZyB0aGUgbW9kZWwgZGF0YS4gTXVzdCBub3QgYmUgdGhlIHNhbWUgYnVmZmVyIGFzIHRoZSBXQVNNIGhlYXAuXG4gKiBAcmV0dXJucyBhIDItZWxlbWVudHMgdHVwbGUgLSB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgYWxsb2NhdGVkIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgY29weUZyb21FeHRlcm5hbEJ1ZmZlciA9IChtb2RlbDogVWludDhBcnJheSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbW9kZWxEYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKG1vZGVsLmJ5dGVMZW5ndGgpO1xuICBpZiAobW9kZWxEYXRhT2Zmc2V0ID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLiBmYWlsZWQgdG8gYWxsb2NhdGUgYSBidWZmZXIgb2Ygc2l6ZSAke21vZGVsLmJ5dGVMZW5ndGh9LmApO1xuICB9XG4gIHdhc20uSEVBUFU4LnNldChtb2RlbCwgbW9kZWxEYXRhT2Zmc2V0KTtcbiAgcmV0dXJuIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsLmJ5dGVMZW5ndGhdO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgYW4gaW5mZXJlbmNlIHNlc3Npb24gZnJvbSBhIG1vZGVsIGRhdGEgYnVmZmVyLlxuICpcbiAqIEBwYXJhbSBtb2RlbERhdGEgLSBlaXRoZXIgYSBVaW50OEFycmF5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1vZGVsIGRhdGEsIG9yIGEgMi1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIHRoZVxuICogICAgIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGEgYnVmZmVyLlxuICogQHBhcmFtIG9wdGlvbnMgYW4gb3B0aW9uYWwgc2Vzc2lvbiBvcHRpb25zIG9iamVjdC5cbiAqIEByZXR1cm5zIGEgMy1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIFtzZXNzaW9uIGhhbmRsZSwgaW5wdXQgbmFtZXMsIG91dHB1dCBuYW1lc11cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPSBhc3luYyAoXG4gIG1vZGVsRGF0YTogVWludDhBcnJheSB8IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLFxuICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbik6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XG4gIGxldCBtb2RlbERhdGFPZmZzZXQ6IG51bWJlciwgbW9kZWxEYXRhTGVuZ3RoOiBudW1iZXI7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KG1vZGVsRGF0YSkpIHtcbiAgICAvLyBpZiBtb2RlbCBkYXRhIGlzIGFuIGFycmF5LCBpdCBtdXN0IGJlIGEgMi1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IG1vZGVsRGF0YTtcbiAgfSBlbHNlIGlmIChtb2RlbERhdGEuYnVmZmVyID09PSB3YXNtLkhFQVBVOC5idWZmZXIpIHtcbiAgICAvLyBpZiBtb2RlbCBkYXRhIHVzZXMgdGhlIHNhbWUgYnVmZmVyIGFzIHRoZSBXQVNNIGhlYXAsIHdlIGRvbid0IG5lZWQgdG8gY29weSBpdC5cbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gW21vZGVsRGF0YS5ieXRlT2Zmc2V0LCBtb2RlbERhdGEuYnl0ZUxlbmd0aF07XG4gIH0gZWxzZSB7XG4gICAgLy8gb3RoZXJ3aXNlLCBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIobW9kZWxEYXRhKTtcbiAgfVxuXG4gIGxldCBzZXNzaW9uSGFuZGxlID0gMDtcbiAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcbiAgbGV0IGlvQmluZGluZ0hhbmRsZSA9IDA7XG4gIGxldCBhbGxvY3M6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gW107XG5cbiAgdHJ5IHtcbiAgICBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc10gPSBhd2FpdCBzZXRTZXNzaW9uT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zPy5leHRlcm5hbERhdGEgJiYgd2FzbS5tb3VudEV4dGVybmFsRGF0YSkge1xuICAgICAgY29uc3QgbG9hZGluZ1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygb3B0aW9ucy5leHRlcm5hbERhdGEpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJyA/IGZpbGUgOiBmaWxlLnBhdGg7XG4gICAgICAgIGxvYWRpbmdQcm9taXNlcy5wdXNoKFxuICAgICAgICAgIGxvYWRGaWxlKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJyA/IGZpbGUgOiBmaWxlLmRhdGEpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHdhc20ubW91bnRFeHRlcm5hbERhdGEocGF0aCwgZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdhaXQgZm9yIGFsbCBleHRlcm5hbCBkYXRhIGZpbGVzIHRvIGJlIGxvYWRlZFxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZGluZ1Byb21pc2VzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3ZpZGVyIG9mIG9wdGlvbnM/LmV4ZWN1dGlvblByb3ZpZGVycyA/PyBbXSkge1xuICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gdHlwZW9mIHByb3ZpZGVyID09PSAnc3RyaW5nJyA/IHByb3ZpZGVyIDogcHJvdmlkZXIubmFtZTtcbiAgICAgIGlmIChwcm92aWRlck5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgICAgd2FzbS5zaG91bGRUcmFuc2ZlclRvTUxUZW5zb3IgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBwcm92aWRlciBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0KT8uY29udGV4dDtcbiAgICAgICAgICBjb25zdCBncHVEZXZpY2UgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2ViR3B1KT8uZ3B1RGV2aWNlO1xuICAgICAgICAgIGNvbnN0IGRldmljZVR5cGUgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/LmRldmljZVR5cGU7XG4gICAgICAgICAgY29uc3QgcG93ZXJQcmVmZXJlbmNlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5wb3dlclByZWZlcmVuY2U7XG4gICAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBjb250ZXh0IGFzIE1MQ29udGV4dDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdwdURldmljZSkge1xuICAgICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGF3YWl0IHdhc20ud2Vibm5DcmVhdGVNTENvbnRleHQhKGdwdURldmljZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0ISh7IGRldmljZVR5cGUsIHBvd2VyUHJlZmVyZW5jZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGF3YWl0IHdhc20ud2Vibm5DcmVhdGVNTENvbnRleHQhKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Vzc2lvbkhhbmRsZSA9IGF3YWl0IHdhc20uX09ydENyZWF0ZVNlc3Npb24obW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGgsIHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICB3YXNtLndlYmdwdU9uQ3JlYXRlU2Vzc2lvbj8uKHNlc3Npb25IYW5kbGUpO1xuICAgIGlmIChzZXNzaW9uSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBhIHNlc3Npb24uXCIpO1xuICAgIH1cblxuICAgIHdhc20uanNlcE9uQ3JlYXRlU2Vzc2lvbj8uKCk7XG5cbiAgICAvLyBjbGVhciBjdXJyZW50IE1MQ29udGV4dCBhZnRlciBzZXNzaW9uIGNyZWF0aW9uXG4gICAgaWYgKHdhc20uY3VycmVudENvbnRleHQpIHtcbiAgICAgIHdhc20ud2Vibm5SZWdpc3Rlck1MQ29udGV4dCEoc2Vzc2lvbkhhbmRsZSwgd2FzbS5jdXJyZW50Q29udGV4dCk7XG4gICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgd2FzbS5zaG91bGRUcmFuc2ZlclRvTUxUZW5zb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlKTtcblxuICAgIGNvbnN0IGVuYWJsZUdyYXBoQ2FwdHVyZSA9ICEhb3B0aW9ucz8uZW5hYmxlR3JhcGhDYXB0dXJlO1xuXG4gICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dE5hbWVzID0gW107XG4gICAgY29uc3QgaW5wdXRNZXRhZGF0YTogSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW10gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRNZXRhZGF0YTogSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW10gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgW25hbWVPZmZzZXQsIGVsZW1lbnRUeXBlLCBzaGFwZV0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpKTtcbiAgICAgIGlmIChuYW1lT2Zmc2V0ID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IGFuIGlucHV0IG5hbWUuXCIpO1xuICAgICAgfVxuICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZU9mZnNldCk7XG4gICAgICBjb25zdCBuYW1lID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZU9mZnNldCk7XG4gICAgICBpbnB1dE5hbWVzLnB1c2gobmFtZSk7XG4gICAgICBpbnB1dE1ldGFkYXRhLnB1c2goXG4gICAgICAgIGVsZW1lbnRUeXBlID09PSAwXG4gICAgICAgICAgPyB7IG5hbWUsIGlzVGVuc29yOiBmYWxzZSB9XG4gICAgICAgICAgOiB7IG5hbWUsIGlzVGVuc29yOiB0cnVlLCB0eXBlOiB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhlbGVtZW50VHlwZSksIHNoYXBlOiBzaGFwZSEgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgW25hbWVPZmZzZXQsIGVsZW1lbnRUeXBlLCBzaGFwZV0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpICsgaW5wdXRDb3VudCk7XG4gICAgICBpZiAobmFtZU9mZnNldCA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBvdXRwdXQgbmFtZS5cIik7XG4gICAgICB9XG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZU9mZnNldCk7XG4gICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZU9mZnNldCk7XG4gICAgICBvdXRwdXROYW1lcy5wdXNoKG5hbWVTdHJpbmcpO1xuICAgICAgb3V0cHV0TWV0YWRhdGEucHVzaChcbiAgICAgICAgZWxlbWVudFR5cGUgPT09IDBcbiAgICAgICAgICA/IHsgbmFtZTogbmFtZVN0cmluZywgaXNUZW5zb3I6IGZhbHNlIH1cbiAgICAgICAgICA6IHsgbmFtZTogbmFtZVN0cmluZywgaXNUZW5zb3I6IHRydWUsIHR5cGU6IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGVsZW1lbnRUeXBlKSwgc2hhcGU6IHNoYXBlISB9LFxuICAgICAgKTtcblxuICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaCgnZ3B1LWJ1ZmZlcicpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID1cbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG9wdGlvbnMucHJlZmVycmVkT3V0cHV0TG9jYXRpb25cbiAgICAgICAgICAgIDogKG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uPy5bbmFtZVN0cmluZ10gPz8gJ2NwdScpO1xuICAgICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ2NwdScgJiYgaXNHcmFwaE91dHB1dCAmJiBpc0dyYXBoT3V0cHV0KHNlc3Npb25IYW5kbGUsIG5hbWVTdHJpbmcpKSB7XG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ21sLXRlbnNvci1jcHUtb3V0cHV0Jyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicgJiYgbG9jYXRpb24gIT09ICdtbC10ZW5zb3InKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgbG9jYXRpb24gIT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LiBPbmx5ICdncHUtYnVmZmVyJyBsb2NhdGlvbiBpcyBzdXBwb3J0ZWQgd2hlbiBlbmFibGVHcmFwaENhcHR1cmUgaXMgdHJ1ZS5gLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVzZSBJTyBiaW5kaW5nIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb3V0cHV0IGlzIHByZWZlcnJlZCB0byBiZSBvbiBHUFUuXG4gICAgbGV0IGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGUgfCBudWxsID0gbnVsbDtcbiAgICBpZiAoXG4gICAgICAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJlxuICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUoKGwpID0+IGwgPT09ICdncHUtYnVmZmVyJyB8fCBsID09PSAnbWwtdGVuc29yJyB8fCBsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnKVxuICAgICkge1xuICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgSU8gYmluZGluZy5cIik7XG4gICAgICB9XG5cbiAgICAgIGJpbmRpbmdTdGF0ZSA9IHtcbiAgICAgICAgaGFuZGxlOiBpb0JpbmRpbmdIYW5kbGUsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zXG4gICAgICAgICAgLy8gJ21sLXRlbnNvci1jcHUtb3V0cHV0JyBpcyB0cmVhdGVkIGFzICdtbC10ZW5zb3InIGZvciB0aGUgcHVycG9zZSBvZiBJTyBiaW5kaW5nLlxuICAgICAgICAgIC5tYXAoKGwpID0+IChsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnID8gJ21sLXRlbnNvcicgOiBsKSlcbiAgICAgICAgICAubWFwKChsKSA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBhY3RpdmVTZXNzaW9ucy5zZXQoc2Vzc2lvbkhhbmRsZSwgW1xuICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZCxcbiAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICBiaW5kaW5nU3RhdGUsXG4gICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICBmYWxzZSxcbiAgICBdKTtcbiAgICByZXR1cm4gW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXMsIG91dHB1dE5hbWVzLCBpbnB1dE1ldGFkYXRhLCBvdXRwdXRNZXRhZGF0YV07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xuICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ0hhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIElPIGJpbmRpbmcuXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24uXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uX2ZyZWUobW9kZWxEYXRhT2Zmc2V0KTtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uIG9wdGlvbnMuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcblxuICAgIC8vIHVubW91bnQgZXh0ZXJuYWwgZGF0YSBpZiBuZWNlc3NhcnlcbiAgICB3YXNtLnVubW91bnRFeHRlcm5hbERhdGE/LigpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlLCBlbmFibGVHcmFwaENhcHR1cmVdID0gc2Vzc2lvbjtcblxuICBpZiAoaW9CaW5kaW5nU3RhdGUpIHtcbiAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNsZWFyIGJvdW5kIG91dHB1dHMuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAod2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIElPIGJpbmRpbmcuXCIpO1xuICAgIH1cbiAgfVxuXG4gIHdhc20uanNlcE9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuICB3YXNtLndlYm5uT25SZWxlYXNlU2Vzc2lvbj8uKHNlc3Npb25JZCk7XG4gIHdhc20ud2ViZ3B1T25SZWxlYXNlU2Vzc2lvbj8uKHNlc3Npb25JZCk7XG5cbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKSAhPT0gMCkge1xuICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uLlwiKTtcbiAgfVxuICBhY3RpdmVTZXNzaW9ucy5kZWxldGUoc2Vzc2lvbklkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPSBhc3luYyAoXG4gIHRlbnNvcjogVGVuc29yTWV0YWRhdGEgfCBudWxsLFxuICB0ZW5zb3JIYW5kbGVzOiBudW1iZXJbXSxcbiAgYWxsb2NzOiBudW1iZXJbXSxcbiAgc2Vzc2lvbklkOiBudW1iZXIsXG4gIHRlbnNvck5hbWVVVEY4RW5jb2RlZDogbnVtYmVyLFxuICBpbmRleDogbnVtYmVyLFxuICBlbmFibGVHcmFwaENhcHR1cmUgPSBmYWxzZSxcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIXRlbnNvcikge1xuICAgIHRlbnNvckhhbmRsZXMucHVzaCgwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XG5cbiAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XG4gIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuICBsZXQgYWN0dWFsTG9jYXRpb24gPSBsb2NhdGlvbjtcblxuICBsZXQgcmF3RGF0YTogbnVtYmVyO1xuICBsZXQgZGF0YUJ5dGVMZW5ndGg6IG51bWJlcjtcblxuICBpZiAoZGF0YVR5cGUgPT09ICdzdHJpbmcnICYmIChsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInIHx8IGxvY2F0aW9uID09PSAnbWwtdGVuc29yJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gIH1cblxuICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgRXh0ZXJuYWwgYnVmZmVyIG11c3QgYmUgcHJvdmlkZWQgZm9yIGlucHV0L291dHB1dCBpbmRleCAke2luZGV4fSB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmAsXG4gICAgKTtcbiAgfVxuXG4gIGlmIChsb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgY29uc3QgZ3B1QnVmZmVyID0gdGVuc29yWzJdLmdwdUJ1ZmZlcjtcbiAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcykhO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20ud2ViZ3B1UmVnaXN0ZXJCdWZmZXI7XG4gICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XG4gICAgICB9XG5cbiAgICAgIHJhd0RhdGEgPSByZWdpc3RlckJ1ZmZlcihncHVCdWZmZXIsIHNlc3Npb25JZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZ2lzdGVyQnVmZmVyID0gd2FzbS5qc2VwUmVnaXN0ZXJCdWZmZXI7XG4gICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XG4gICAgICB9XG4gICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGxvY2F0aW9uID09PSAnbWwtdGVuc29yJykge1xuICAgIGNvbnN0IG1sVGVuc29yID0gdGVuc29yWzJdLm1sVGVuc29yIGFzIE1MVGVuc29yO1xuICAgIGRhdGFCeXRlTGVuZ3RoID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXModGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCBkaW1zKSE7XG5cbiAgICBjb25zdCByZWdpc3Rlck1MVGVuc29yID0gd2FzbS53ZWJublJlZ2lzdGVyTUxUZW5zb3I7XG4gICAgaWYgKCFyZWdpc3Rlck1MVGVuc29yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICB9XG4gICAgcmF3RGF0YSA9IHJlZ2lzdGVyTUxUZW5zb3Ioc2Vzc2lvbklkLCBtbFRlbnNvciwgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCBkaW1zKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIC8vIHN0cmluZyB0ZW5zb3JcbiAgICAgIGRhdGFCeXRlTGVuZ3RoID0gcHRyU2l6ZSAqIGRhdGEubGVuZ3RoO1xuICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICB3YXNtLnNldFZhbHVlKHJhd0RhdGEgKyBpICogcHRyU2l6ZSwgYWxsb2NXYXNtU3RyaW5nKGRhdGFbaV0sIGFsbG9jcyksICcqJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlzR3JhcGhJbnB1dCA9IHdhc20ud2Vibm5Jc0dyYXBoSW5wdXQ7XG4gICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XG4gICAgICBpZiAoZGF0YVR5cGUgIT09ICdzdHJpbmcnICYmIGlzR3JhcGhJbnB1dCAmJiBpc0dyYXBoT3V0cHV0KSB7XG4gICAgICAgIGNvbnN0IHRlbnNvck5hbWUgPSB3YXNtLlVURjhUb1N0cmluZyh0ZW5zb3JOYW1lVVRGOEVuY29kZWQpO1xuICAgICAgICAvLyBQcm9tb3RlIHRoZSB0ZW5zb3IgdG8gJ21sLXRlbnNvcicgaWYgaXQgaXMgYSBncmFwaCBpbnB1dC5cbiAgICAgICAgaWYgKGlzR3JhcGhJbnB1dChzZXNzaW9uSWQsIHRlbnNvck5hbWUpIHx8IGlzR3JhcGhPdXRwdXQoc2Vzc2lvbklkLCB0ZW5zb3JOYW1lKSkge1xuICAgICAgICAgIGNvbnN0IGRhdGFUeXBlRW51bSA9IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKTtcbiAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlRW51bSwgZGltcykhO1xuICAgICAgICAgIGFjdHVhbExvY2F0aW9uID0gJ21sLXRlbnNvcic7XG4gICAgICAgICAgY29uc3QgY3JlYXRlVGVtcG9yYXJ5VGVuc29yID0gd2FzbS53ZWJubkNyZWF0ZVRlbXBvcmFyeVRlbnNvcjtcbiAgICAgICAgICBjb25zdCB1cGxvYWRUZW5zb3IgPSB3YXNtLndlYm5uVXBsb2FkVGVuc29yO1xuICAgICAgICAgIGlmICghY3JlYXRlVGVtcG9yYXJ5VGVuc29yIHx8ICF1cGxvYWRUZW5zb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwibWwtdGVuc29yXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYk5OLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0ZW5zb3JJZCA9IGF3YWl0IGNyZWF0ZVRlbXBvcmFyeVRlbnNvcihzZXNzaW9uSWQsIGRhdGFUeXBlRW51bSwgZGltcyBhcyBudW1iZXJbXSk7XG4gICAgICAgICAgdXBsb2FkVGVuc29yKHRlbnNvcklkLCBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICByYXdEYXRhID0gdGVuc29ySWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgd2FzbS5IRUFQVTguc2V0KG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGFCeXRlTGVuZ3RoKSwgcmF3RGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcbiAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogZGltcy5sZW5ndGgpO1xuICB0cnkge1xuICAgIGRpbXMuZm9yRWFjaCgoZCwgaW5kZXgpID0+IHdhc20uc2V0VmFsdWUoZGltc09mZnNldCArIGluZGV4ICogcHRyU2l6ZSwgZCwgcHRyU2l6ZSA9PT0gNCA/ICdpMzInIDogJ2k2NCcpKTtcbiAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksXG4gICAgICByYXdEYXRhLFxuICAgICAgZGF0YUJ5dGVMZW5ndGgsXG4gICAgICBkaW1zT2Zmc2V0LFxuICAgICAgZGltcy5sZW5ndGgsXG4gICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0oYWN0dWFsTG9jYXRpb24pLFxuICAgICk7XG4gICAgaWYgKHRlbnNvciA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGNyZWF0ZSB0ZW5zb3IgZm9yIGlucHV0L291dHB1dC4gc2Vzc2lvbj0ke3Nlc3Npb25JZH0sIGluZGV4PSR7aW5kZXh9LmApO1xuICAgIH1cbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2godGVuc29yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogcGVyZm9ybSBpbmZlcmVuY2UgcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxuICBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sXG4gIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJ1biBpbmZlcmVuY2UuIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG4gIGNvbnN0IGlucHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMV07XG4gIGNvbnN0IG91dHB1dE5hbWVzVVRGOEVuY29kZWQgPSBzZXNzaW9uWzJdO1xuICBjb25zdCBpb0JpbmRpbmdTdGF0ZSA9IHNlc3Npb25bM107XG4gIGNvbnN0IGVuYWJsZUdyYXBoQ2FwdHVyZSA9IHNlc3Npb25bNF07XG4gIGNvbnN0IGlucHV0T3V0cHV0Qm91bmQgPSBzZXNzaW9uWzVdO1xuXG4gIGNvbnN0IGlucHV0Q291bnQgPSBpbnB1dEluZGljZXMubGVuZ3RoO1xuICBjb25zdCBvdXRwdXRDb3VudCA9IG91dHB1dEluZGljZXMubGVuZ3RoO1xuXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgbGV0IHJ1bk9wdGlvbnNBbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgaW5wdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBvdXRwdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBpbnB1dE91dHB1dEFsbG9jczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgcHJlQWxsb2NhdGVkT3V0cHV0czogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBiZWZvcmVSdW5TdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGlucHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiBwdHJTaXplKTtcbiAgY29uc3QgaW5wdXROYW1lc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogcHRyU2l6ZSk7XG4gIGNvbnN0IG91dHB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIHB0clNpemUpO1xuICBjb25zdCBvdXRwdXROYW1lc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIHB0clNpemUpO1xuXG4gIHRyeSB7XG4gICAgW3J1bk9wdGlvbnNIYW5kbGUsIHJ1bk9wdGlvbnNBbGxvY3NdID0gc2V0UnVuT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xuICAgIC8vIGNyZWF0ZSBpbnB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIGF3YWl0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcbiAgICAgICAgaW5wdXRUZW5zb3JzW2ldLFxuICAgICAgICBpbnB1dFRlbnNvckhhbmRsZXMsXG4gICAgICAgIGlucHV0T3V0cHV0QWxsb2NzLFxuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbnB1dEluZGljZXNbaV1dLFxuICAgICAgICBpbnB1dEluZGljZXNbaV0sXG4gICAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBhd2FpdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgIG91dHB1dFRlbnNvcnNbaV0sXG4gICAgICAgIG91dHB1dFRlbnNvckhhbmRsZXMsXG4gICAgICAgIGlucHV0T3V0cHV0QWxsb2NzLFxuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV0sXG4gICAgICAgIGlucHV0Q291bnQgKyBvdXRwdXRJbmRpY2VzW2ldLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICApO1xuICAgIH1cbiAgICBUUkFDRV9FVkVOVF9FTkQoJ3dhc20gcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5zZXRWYWx1ZShpbnB1dFZhbHVlc09mZnNldCArIGkgKiBwdHJTaXplLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0sICcqJyk7XG4gICAgICB3YXNtLnNldFZhbHVlKGlucHV0TmFtZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV0sICcqJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5zZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgJyonKTtcbiAgICAgIHdhc20uc2V0VmFsdWUob3V0cHV0TmFtZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXSwgJyonKTtcbiAgICB9XG5cbiAgICBpZiAoKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiYgaW9CaW5kaW5nU3RhdGUgJiYgIWlucHV0T3V0cHV0Qm91bmQpIHtcbiAgICAgIGNvbnN0IHsgaGFuZGxlLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQgfSA9IGlvQmluZGluZ1N0YXRlO1xuXG4gICAgICBpZiAoaW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aCAhPT0gaW5wdXRDb3VudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7aW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBUUkFDRV9FVkVOVF9CRUdJTignd2FzbSBiaW5kSW5wdXRzT3V0cHV0cycpO1xuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5wdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgaW5wdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBvdXRwdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgLy8gdW5kZWZpbmVkIG1lYW5zIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC5cblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgcHJlLWFsbG9jYXRlZCwgc3RvcmUgYW5kIGJpbmQgdGhlIHRlbnNvci5cbiAgICAgICAgICBwcmVBbGxvY2F0ZWRPdXRwdXRzLnB1c2gob3V0cHV0VGVuc29ySGFuZGxlc1tpXSk7XG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldLCAwKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoXG4gICAgICAgICAgICBoYW5kbGUsXG4gICAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkW2luZGV4XSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIG91dHB1dFske2l9XSB0byAke291dHB1dFByZWZlcnJlZExvY2F0aW9uc1tpXX0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIGJpbmRJbnB1dHNPdXRwdXRzJyk7XG4gICAgICBhY3RpdmVTZXNzaW9ucy5zZXQoc2Vzc2lvbklkLCBbXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZCxcbiAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCxcbiAgICAgICAgaW9CaW5kaW5nU3RhdGUsXG4gICAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIHdhc20uanNlcE9uUnVuU3RhcnQ/LihzZXNzaW9uSGFuZGxlKTtcbiAgICB3YXNtLndlYm5uT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xuXG4gICAgbGV0IGVycm9yQ29kZTogbnVtYmVyO1xuICAgIGlmICgoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuV2l0aEJpbmRpbmcoXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLmhhbmRsZSxcbiAgICAgICAgb3V0cHV0Q291bnQsXG4gICAgICAgIG91dHB1dFZhbHVlc09mZnNldCxcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW5wdXROYW1lc09mZnNldCxcbiAgICAgICAgaW5wdXRWYWx1ZXNPZmZzZXQsXG4gICAgICAgIGlucHV0Q291bnQsXG4gICAgICAgIG91dHB1dE5hbWVzT2Zmc2V0LFxuICAgICAgICBvdXRwdXRDb3VudCxcbiAgICAgICAgb3V0cHV0VmFsdWVzT2Zmc2V0LFxuICAgICAgICBydW5PcHRpb25zSGFuZGxlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignZmFpbGVkIHRvIGNhbGwgT3J0UnVuKCkuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0OiBUZW5zb3JNZXRhZGF0YVtdID0gW107XG4gICAgY29uc3Qgb3V0cHV0UHJvbWlzZXM6IEFycmF5PFByb21pc2U8W251bWJlciwgVGVuc29yLkRhdGFUeXBlXT4+ID0gW107XG5cbiAgICBUUkFDRV9FVkVOVF9CRUdJTignd2FzbSBQcm9jZXNzT3V0cHV0VGVuc29yJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB0ZW5zb3IgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgJyonKSk7XG4gICAgICAvLyBUT0RPOiByZXZpc2l0IHRoaXMgcGFydCB0byBlbnN1cmUgaXQgd29ya3MgZm9yIFdlYkdQVSB3aGVuIGJvdGggcHJlLWFsbG9jYXRlZCBvdXRwdXRzIGFuZFxuICAgICAgLy8gcHJlZmVycmVkIGxvY2F0aW9uIGFyZSBzcGVjaWZpZWQuXG4gICAgICAvLyBDZXJ0YWluIHByZS1hbGxvY2F0ZWQgdGVuc29ycyBtYXkgYWxyZWFkeSBiZSBib3VuZCBpbiB0aGUgSU8gYmluZGluZy4gZS5nLiB0aGUgV2ViTk4gYmFja2VuZFxuICAgICAgLy8gYWx3YXlzIGJpbmRzIGl0cyB0ZW5zb3IgdG8gJ21sLXRlbnNvcicuIEluIHN1Y2ggY2FzZXMsIHRoZSB0ZW5zb3IgSUQgbWlnaHQgY2hhbmdlIGFmdGVyIGJpbmRpbmcsXG4gICAgICAvLyBidXQgY29weWluZyBkYXRhIGZvciB0aGVzZSB0ZW5zb3JzIHNob3VsZCBzdGlsbCBiZSBhdm9pZGVkLlxuICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSB8fCBwcmVBbGxvY2F0ZWRPdXRwdXRzLmluY2x1ZGVzKG91dHB1dFRlbnNvckhhbmRsZXNbaV0pKSB7XG4gICAgICAgIC8vIG91dHB1dCB0ZW5zb3IgaXMgcHJlLWFsbG9jYXRlZC4gbm8gbmVlZCB0byBjb3B5IGRhdGEuXG4gICAgICAgIG91dHB1dC5wdXNoKG91dHB1dFRlbnNvcnNbaV0hKTtcbiAgICAgICAgaWYgKHRlbnNvciAhPT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xuICAgICAgICAgIC8vIHJlbGVhc2UgcmVkdW5kYW50IHRlbnNvciBlYXJsaWVyLlxuICAgICAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcikgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSB0ZW5zb3IuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogcHRyU2l6ZSk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGUgfCB1bmRlZmluZWQsXG4gICAgICAgIGRhdGFPZmZzZXQgPSAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcbiAgICAgICAgICB0ZW5zb3IsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMiAqIHB0clNpemUsXG5cbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMyAqIHB0clNpemUsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYWNjZXNzIG91dHB1dCB0ZW5zb3IgZGF0YSBvbiBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnO1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IE51bWJlcih3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQsIHZhbHVlVHlwZSkpO1xuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcbiAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uZ2V0VmFsdWUodGVuc29yRGF0YU9mZnNldCArIHB0clNpemUgKiAyLCAnKicpO1xuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUodGVuc29yRGF0YU9mZnNldCArIHB0clNpemUgKiAzLCB2YWx1ZVR5cGUpKTtcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRpbXMucHVzaChOdW1iZXIod2FzbS5nZXRWYWx1ZShkaW1zT2Zmc2V0ICsgaSAqIHB0clNpemUsIHZhbHVlVHlwZSkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2FzbS5fT3J0RnJlZShkaW1zT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZnJlZSBtZW1vcnkgZm9yIHRlbnNvciBkaW1zLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaXplID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgdHlwZSA9IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGRhdGFUeXBlKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRMb2NhdGlvbiA9IGlvQmluZGluZ1N0YXRlPy5vdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbb3V0cHV0SW5kaWNlc1tpXV07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgfHwgcHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIGkgKiBwdHJTaXplLCAnKicpO1xuICAgICAgICAgICAgY29uc3QgbmV4dE9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIChpICsgMSkgKiBwdHJTaXplLCAnKicpO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IG5leHRPZmZzZXQgLSBvZmZzZXQ7XG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgc3RyaW5nRGF0YSwgJ2NwdSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBhIGNlcnRhaW4gb3V0cHV0J3MgcHJlZmVycmVkIGxvY2F0aW9uIGlzIEdQVSBidXQgdGhlIHRlbnNvciBpcyBlbXB0eSwgd2Ugc3RpbGwgbmVlZCB0byBjcmVhdGUgYSBDUFVcbiAgICAgICAgICAvLyB0ZW5zb3IgZm9yIGl0LiBUaGVyZSBpcyBubyBtYXBwaW5nIEdQVSBidWZmZXIgZm9yIGFuIGVtcHR5IHRlbnNvci5cbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ2V0QnVmZmVyID0gIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyB3YXNtLndlYmdwdUdldEJ1ZmZlciA6IHdhc20uanNlcEdldEJ1ZmZlcjtcbiAgICAgICAgICAgIGlmICghZ2V0QnVmZmVyKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IGdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XG4gICAgICAgICAgICBpZiAoYnVmZmVyU2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZG8gbm90IHJlbGVhc2UgdGhlIHRlbnNvciByaWdodCBub3cuIGl0IHdpbGwgYmUgcmVsZWFzZWQgd2hlbiB1c2VyIGNhbGxzIHRlbnNvci5kaXNwb3NlKCkuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgICAgIHdhc20ud2ViZ3B1UmVnaXN0ZXJCdWZmZXIhKGdwdUJ1ZmZlciwgc2Vzc2lvbklkLCBkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWREYXRhRnVuY3Rpb24gPSB3YXNtLndlYmdwdUNyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgYnVmZmVyU2l6ZSwgc2Vzc2lvbklkKTtcbiAgICAgICAgICAgICAgb3V0cHV0LnB1c2goW1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgZGltcyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgICBkb3dubG9hZDogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGRvd25sb2FkRGF0YUZ1bmN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlISkpKGFycmF5QnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgVGVuc29yLkRhdGFUeXBlTWFwW1RlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXNdO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSB0ZW5zb3IuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2dwdS1idWZmZXInLFxuICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIGRpbXMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxuICAgICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgYnVmZmVyU2l6ZSwgdHlwZSksXG4gICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcikgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdncHUtYnVmZmVyJyxcbiAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVuc3VyZVRlbnNvciA9IHdhc20ud2Vibm5FbnN1cmVUZW5zb3I7XG4gICAgICAgICAgICBjb25zdCBpc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkID0gd2FzbS53ZWJubklzR3JhcGhJbnB1dE91dHB1dFR5cGVTdXBwb3J0ZWQ7XG4gICAgICAgICAgICBpZiAoIWVuc3VyZVRlbnNvciB8fCAhaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZWZlcnJlZExvY2F0aW9uIFwibWwtdGVuc29yXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYk5OLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGVuc29yU2l6ZSA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlLCBzaXplKTtcbiAgICAgICAgICAgIGlmICh0ZW5zb3JTaXplID09PSB1bmRlZmluZWQgfHwgIWlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzR3JhcGhJbnB1dE91dHB1dFR5cGVTdXBwb3J0ZWQoc2Vzc2lvbklkLCB0eXBlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGZvciAke3R5cGV9IG91dHB1dCBpcyBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgV2ViTk4gQ29udGV4dC5gLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZ3JhcGggaGFzIGJlZW4gcGFydGl0aW9uZWQsIHRoZSBvdXRwdXQgdGVuc29yIG1heSBoYXZlIG5vdCBiZWVuIGNyZWF0ZWQuIEZvciB0aGlzIHJlYXNvbiwgd2UgdXNlXG4gICAgICAgICAgICAvLyBlbnN1cmVUZW5zb3IgdG8gZ2V0L2NyZWF0ZSB0aGUgTUxUZW5zb3IuIEluIHdoaWNoIGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gY29weSB0aGUgZGF0YSBpZiBhIG5ldyB0ZW5zb3JcbiAgICAgICAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICBjb25zdCBtbFRlbnNvciA9IGF3YWl0IGVuc3VyZVRlbnNvcihzZXNzaW9uSWQsIGRhdGFPZmZzZXQsIGRhdGFUeXBlLCBkaW1zLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgZGltcyxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1sVGVuc29yLFxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLndlYm5uQ3JlYXRlTUxUZW5zb3JEb3dubG9hZGVyIShkYXRhT2Zmc2V0LCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnbWwtdGVuc29yJyxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB3YXNtLndlYm5uQ3JlYXRlTUxUZW5zb3JEb3dubG9hZGVyIShkYXRhT2Zmc2V0LCB0eXBlIGFzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcykoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIC8vIERlbGF5IHRoZSBkYXRhIGRvd25sb2FkIGFuZCByZWxlYXNpbmcgdGhlIHRlbnNvciB1bnRpbCB3ZSBjYW4gd2FpdCBmb3IgYWxsIG91dHB1dCB0ZW5zb3JzIHRvIGJlIGRvd25sb2FkZWQuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcbiAgICAgICAgICAgIG91dHB1dFByb21pc2VzLnB1c2goXG4gICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBbbnVtYmVyLCBUZW5zb3IuRGF0YVR5cGVdID0gW2luZGV4LCBhd2FpdCBkYXRhXTtcbiAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgW10sICdjcHUnXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSAmJiAhZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNsZWFyIGJvdW5kIG91dHB1dHMuXCIpO1xuICAgICAgfVxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIGZhbHNlLFxuICAgICAgXSk7XG4gICAgfVxuICAgIC8vIFdhaXQgZm9yIGFsbCBvdXRwdXQgdGVuc29yIGRhdGEgdG8gYmUgZG93bmxvYWRlZC5cbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgZGF0YV0gb2YgYXdhaXQgUHJvbWlzZS5hbGwob3V0cHV0UHJvbWlzZXMpKSB7XG4gICAgICBvdXRwdXRbaW5kZXhdWzJdID0gZGF0YTtcbiAgICB9XG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIFByb2Nlc3NPdXRwdXRUZW5zb3InKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20ud2Vibm5PblJ1bkVuZD8uKHNlc3Npb25IYW5kbGUpO1xuXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICBpbnB1dFRlbnNvcnMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICBpZiAodCAmJiB0WzNdID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB3YXNtLndlYmdwdVVucmVnaXN0ZXJCdWZmZXIhKHRbMl0uZ3B1QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRwdXRUZW5zb3JzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKHQgJiYgdFszXSA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgd2FzbS53ZWJncHVVbnJlZ2lzdGVyQnVmZmVyISh0WzJdLmdwdUJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpbnB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCgodikgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKCh2KSA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcblxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgcHJvZmlsaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNlc3Npb24gaWQnKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcblxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxuICBjb25zdCBwcm9maWxlRmlsZU5hbWUgPSB3YXNtLl9PcnRFbmRQcm9maWxpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gIGlmIChwcm9maWxlRmlsZU5hbWUgPT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS5cIik7XG4gIH1cbiAgd2FzbS5fT3J0RnJlZShwcm9maWxlRmlsZU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzID0gKHRlbnNvcnM6IHJlYWRvbmx5IFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pOiBBcnJheUJ1ZmZlckxpa2VbXSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XG4gIGZvciAoY29uc3QgdGVuc29yIG9mIHRlbnNvcnMpIHtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XG4gICAgICBidWZmZXJzLnB1c2goZGF0YS5idWZmZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnVmZmVycztcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiwgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7XG4gIE9ydFdhc21NZXNzYWdlLFxuICBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcbiAgVGVuc29yTWV0YWRhdGEsXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7IGluaXRpYWxpemVXZWJBc3NlbWJseSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7XG4gIGltcG9ydFByb3h5V29ya2VyLFxuICBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyxcbiAgaXNFc21JbXBvcnRNZXRhVXJsSGFyZGNvZGVkQXNGaWxlVXJpLFxufSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxuY29uc3QgaXNQcm94eSA9ICgpOiBib29sZWFuID0+ICEhZW52Lndhc20ucHJveHkgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbmxldCBwcm94eVdvcmtlcjogV29ya2VyIHwgdW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xubGV0IHRlbXBvcmFyeU9iamVjdFVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gW3Jlc29sdmU6IChyZXN1bHQ6IFQpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XG5sZXQgaW5pdFdhc21DYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M7XG5jb25zdCBxdWV1ZWRDYWxsYmFja3M6IE1hcDxPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+Pj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGVucXVldWVDYWxsYmFja3MgPSAodHlwZTogT3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgY2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHF1ZXVlID0gcXVldWVkQ2FsbGJhY2tzLmdldCh0eXBlKTtcbiAgaWYgKHF1ZXVlKSB7XG4gICAgcXVldWUucHVzaChjYWxsYmFja3MpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlZENhbGxiYWNrcy5zZXQodHlwZSwgW2NhbGxiYWNrc10pO1xuICB9XG59O1xuXG5jb25zdCBlbnN1cmVXb3JrZXIgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXppbmcgfHwgIWluaXRpYWxpemVkIHx8IGFib3J0ZWQgfHwgIXByb3h5V29ya2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XG4gIH1cbn07XG5cbmNvbnN0IG9uUHJveHlXb3JrZXJNZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gIHN3aXRjaCAoZXYuZGF0YS50eXBlKSB7XG4gICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1sxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzBdKCk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcG9yYXJ5T2JqZWN0VXJsKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGVtcG9yYXJ5T2JqZWN0VXJsKTtcbiAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5pdC1lcCc6XG4gICAgY2FzZSAnY29weS1mcm9tJzpcbiAgICBjYXNlICdjcmVhdGUnOlxuICAgIGNhc2UgJ3JlbGVhc2UnOlxuICAgIGNhc2UgJ3J1bic6XG4gICAgY2FzZSAnZW5kLXByb2ZpbGluZyc6IHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHF1ZXVlZENhbGxiYWNrcy5nZXQoZXYuZGF0YS50eXBlKSE7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIGNhbGxzIHRvICdpbml0V2FzbSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0V2FzbSgpJyBmYWlsZWQuXCIpO1xuICB9XG5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwcm94eVdvcmtlcj8udGVybWluYXRlKCk7XG5cbiAgICAgIHZvaWQgaW1wb3J0UHJveHlXb3JrZXIoKS50aGVuKChbb2JqZWN0VXJsLCB3b3JrZXJdKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJveHlXb3JrZXIgPSB3b3JrZXI7XG4gICAgICAgICAgcHJveHlXb3JrZXIub25lcnJvciA9IChldjogRXJyb3JFdmVudCkgPT4gcmVqZWN0KGV2KTtcbiAgICAgICAgICBwcm94eVdvcmtlci5vbm1lc3NhZ2UgPSBvblByb3h5V29ya2VyTWVzc2FnZTtcbiAgICAgICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnaW5pdC13YXNtJywgaW46IGVudiB9O1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBub3QgbG9zdC5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIHdoZW4gYGVudi53YXNtLndhc21QYXRoc2AgaXMgbm90IHNldCwgd2UgbmVlZCB0byBwYXNzIHRoZSBwYXRoIGluZm9ybWF0aW9uIHRvIHRoZSB3b3JrZXIuXG4gICAgICAgICAgLy9cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRU5BQkxFX0JVTkRMRV9XQVNNX0pTICYmICFtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyAmJiBvYmplY3RVcmwpIHtcbiAgICAgICAgICAgIC8vIGZvciBhIGJ1aWxkIG5vdCBidW5kbGVkIHRoZSB3YXNtIEpTLCB3ZSBuZWVkIHRvIHBhc3MgdGhlIHBhdGggcHJlZml4IHRvIHRoZSB3b3JrZXIuXG4gICAgICAgICAgICAvLyB0aGUgcGF0aCBwcmVmaXggd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgdGhlIHBhdGggdG8gYm90aCB0aGUgd2FzbSBKUyBhbmQgdGhlIHdhc20gZmlsZS5cbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xuICAgICAgICAgICAgaWYgKGluZmVycmVkV2FzbVBhdGhQcmVmaXgpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgPSBpbmZlcnJlZFdhc21QYXRoUHJlZml4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEJVSUxEX0RFRlMuSVNfRVNNICYmXG4gICAgICAgICAgICBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KUyAmJlxuICAgICAgICAgICAgIW1lc3NhZ2UuaW4hLndhc20ud2FzbVBhdGhzICYmXG4gICAgICAgICAgICAob2JqZWN0VXJsIHx8IGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGZvciBhIGJ1aWxkIGJ1bmRsZWQgdGhlIHdhc20gSlMsIGlmIGVpdGhlciBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgaXMgbWV0OlxuICAgICAgICAgICAgLy8gLSB0aGUgcHJveHkgd29ya2VyIGlzIGxvYWRlZCBmcm9tIGEgYmxvYiBVUkxcbiAgICAgICAgICAgIC8vIC0gYGltcG9ydC5tZXRhLnVybGAgaXMgYSBmaWxlIFVSTCwgaXQgbWVhbnMgaXQgaXMgb3ZlcndyaXR0ZW4gYnkgdGhlIGJ1bmRsZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaW4gZWl0aGVyIGNhc2UsIHRoZSBwYXRoIGluZm9ybWF0aW9uIGlzIGxvc3QsIHdlIG5lZWQgdG8gcGFzcyB0aGUgcGF0aCBvZiB0aGUgLndhc20gZmlsZSB0byB0aGUgd29ya2VyLlxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1c2UgdGhlIGJ1bmRsZXIgcHJlZmVycmVkIFVSTCBmb3JtYXQ6XG4gICAgICAgICAgICAvLyBuZXcgVVJMKCdmaWxlbmFtZScsIGltcG9ydC5tZXRhLnVybClcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgdGhlIGJ1bmRsZXIgY2FuIGhhbmRsZSB0aGUgZmlsZSB1c2luZyBjb3JyZXNwb25kaW5nIGxvYWRlcnMuXG4gICAgICAgICAgICBtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyA9IHtcbiAgICAgICAgICAgICAgd2FzbTogIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQXG4gICAgICAgICAgICAgICAgPyBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZlxuICAgICAgICAgICAgICAgIDogQlVJTERfREVGUy5FTkFCTEVfSlNQSVxuICAgICAgICAgICAgICAgICAgPyBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzcGkud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZlxuICAgICAgICAgICAgICAgICAgOiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBVUkwoJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZlxuICAgICAgICAgICAgICAgICAgICA6IG5ldyBVUkwoJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IG9iamVjdFVybDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KGVudi53YXNtKTtcbiAgICAgIGF3YWl0IGNvcmUuaW5pdFJ1bnRpbWUoZW52KTtcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHRocm93IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVPcnRFcCA9IGFzeW5jIChlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdpbml0LWVwJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LWVwJywgaW46IHsgZXBOYW1lLCBlbnYgfSB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGNvcmUuaW5pdEVwKGVudiwgZXBOYW1lKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSBhc3luYyAoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY29weS1mcm9tJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdjb3B5LWZyb20nLCBpbjogeyBidWZmZXIgfSB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFtidWZmZXIuYnVmZmVyXSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIChcbiAgbW9kZWw6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyIHwgVWludDhBcnJheSxcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIC8vIGNoZWNrIHVuc3VwcG9ydGVkIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2Vzc2lvbiBvcHRpb24gXCJwcmVmZXJyZWRPdXRwdXRMb2NhdGlvblwiIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjcmVhdGUnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NyZWF0ZScsIGluOiB7IG1vZGVsLCBvcHRpb25zOiB7IC4uLm9wdGlvbnMgfSB9IH07XG4gICAgICBjb25zdCB0cmFuc2ZlcmFibGU6IFRyYW5zZmVyYWJsZVtdID0gW107XG4gICAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHRyYW5zZmVyYWJsZS5wdXNoKG1vZGVsLmJ1ZmZlcik7XG4gICAgICB9XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJhYmxlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3JlbGVhc2UnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ3JlbGVhc2UnLCBpbjogc2Vzc2lvbklkIH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5yZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMgKFxuICBzZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgaW5wdXRzOiBUZW5zb3JNZXRhZGF0YVtdLFxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgb3V0cHV0czogQXJyYXk8VGVuc29yTWV0YWRhdGEgfCBudWxsPixcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgaW5wdXRzIGxvY2F0aW9uXG4gICAgaWYgKGlucHV0cy5zb21lKCh0KSA9PiB0WzNdICE9PSAnY3B1JykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW5wdXQgdGVuc29yIG9uIEdQVSBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgb3V0cHV0cyBsb2NhdGlvblxuICAgIGlmIChvdXRwdXRzLnNvbWUoKHQpID0+IHQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZS1hbGxvY2F0ZWQgb3V0cHV0IHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3J1bicsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IHNlcmlhbGl6YWJsZUlucHV0cyA9IGlucHV0cyBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdOyAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ3J1bicsXG4gICAgICAgIGluOiB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHM6IHNlcmlhbGl6YWJsZUlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9LFxuICAgICAgfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jIChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdlbmQtcHJvZmlsaW5nJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdlbmQtcHJvZmlsaW5nJywgaW46IHNlc3Npb25JZCB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvcmUuZW5kUHJvZmlsaW5nKHNlc3Npb25JZCk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7XG4gIEluZmVyZW5jZVNlc3Npb24sXG4gIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyLFxuICBTZXNzaW9uSGFuZGxlcixcbiAgVGVuc29yLFxuICBUUkFDRV9GVU5DX0JFR0lOLFxuICBUUkFDRV9GVU5DX0VORCxcbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQgeyBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLCBjcmVhdGVTZXNzaW9uLCBlbmRQcm9maWxpbmcsIHJlbGVhc2VTZXNzaW9uLCBydW4gfSBmcm9tICcuL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHsgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLCBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSB9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XG5pbXBvcnQgeyBsb2FkRmlsZSB9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xuXG5leHBvcnQgY29uc3QgZW5jb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3IsIGdldE5hbWU6ICgpID0+IHN0cmluZyk6IFRlbnNvck1ldGFkYXRhID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHRlbnNvci5kYXRhLCAnY3B1J107XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgeyBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIgfSwgJ2dwdS1idWZmZXInXTtcbiAgICBjYXNlICdtbC10ZW5zb3InOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHsgbWxUZW5zb3I6IHRlbnNvci5tbFRlbnNvciB9LCAnbWwtdGVuc29yJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVjb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3JNZXRhZGF0YSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvclswXSwgdGVuc29yWzJdLCB0ZW5zb3JbMV0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGdwdUJ1ZmZlciwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IHRlbnNvclsyXTtcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XG4gICAgfVxuICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgaWYgKCFpc01MVGVuc29yU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgTUxUZW5zb3IgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IG1sVGVuc29yLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gdGVuc29yWzJdO1xuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tTUxUZW5zb3IobWxUZW5zb3IsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XG5cbiAgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgaW5wdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XG4gIG91dHB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcblxuICBhc3luYyBmZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiB7XG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGxldCBtb2RlbDogUGFyYW1ldGVyczx0eXBlb2YgY3JlYXRlU2Vzc2lvbj5bMF07XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPckJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgLy8gbm9kZVxuICAgICAgICBtb2RlbCA9IGF3YWl0IGxvYWRGaWxlKHBhdGhPckJ1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyXG4gICAgICAgIC8vIGZldGNoIG1vZGVsIGFuZCBjb3B5IHRvIHdhc20gaGVhcC5cbiAgICAgICAgbW9kZWwgPSBhd2FpdCB0aGlzLmZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGhPckJ1ZmZlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGVsID0gcGF0aE9yQnVmZmVyO1xuICAgIH1cblxuICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzLCB0aGlzLmlucHV0TWV0YWRhdGEsIHRoaXMub3V0cHV0TWV0YWRhdGFdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihcbiAgICAgIG1vZGVsLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gIH1cblxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiByZWxlYXNlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XG4gIH1cblxuICBhc3luYyBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBjb25zdCBpbnB1dEFycmF5OiBUZW5zb3JbXSA9IFtdO1xuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaCgoa3ZwKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yIHwgbnVsbD4gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZldGNoZXMpLmZvckVhY2goKGt2cCkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3V0cHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgb3V0cHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlucHV0cyA9IGlucHV0QXJyYXkubWFwKCh0LCBpKSA9PlxuICAgICAgZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApLFxuICAgICk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcCgodCwgaSkgPT5cbiAgICAgIHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsLFxuICAgICk7XG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdE1hcFt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dXSA9IG91dHB1dEFycmF5W2ldID8/IGRlY29kZVRlbnNvck1ldGFkYXRhKHJlc3VsdHNbaV0pO1xuICAgIH1cbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICAgIHJldHVybiByZXN1bHRNYXA7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJvZmlsaW5nXG4gIH1cblxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdm9pZCBlbmRQcm9maWxpbmcodGhpcy5zZXNzaW9uSWQpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEJhY2tlbmQsIGVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBpbml0aWFsaXplT3J0RXAsIGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XG5pbXBvcnQgeyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyBhbGwgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5LlxuICpcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxuICogYmVpbmcgY3JlYXRlZCwgdG8gb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5pbml0VGltZW91dCAhPT0gJ251bWJlcicgfHwgZW52Lndhc20uaW5pdFRpbWVvdXQgPCAwKSB7XG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xuICB9XG5cbiAgY29uc3Qgc2ltZCA9IGVudi53YXNtLnNpbWQ7XG4gIGlmICh0eXBlb2Ygc2ltZCAhPT0gJ2Jvb2xlYW4nICYmIHNpbWQgIT09IHVuZGVmaW5lZCAmJiBzaW1kICE9PSAnZml4ZWQnICYmIHNpbWQgIT09ICdyZWxheGVkJykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYFByb3BlcnR5IFwiZW52Lndhc20uc2ltZFwiIGlzIHNldCB0byB1bmtub3duIHZhbHVlIFwiJHtzaW1kfVwiLiBSZXNldCBpdCB0byBcXGBmYWxzZVxcYCBhbmQgaWdub3JlIFNJTUQgZmVhdHVyZSBjaGVja2luZy5gLFxuICAgICk7XG4gICAgZW52Lndhc20uc2ltZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5wcm94eSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20ucHJveHkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20udHJhY2UgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnRyYWNlID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLm51bVRocmVhZHMgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGVudi53YXNtLm51bVRocmVhZHMpIHx8IGVudi53YXNtLm51bVRocmVhZHMgPD0gMCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbG9naWMgb25seSBhcHBsaWVzIHdoZW4gYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCBpcyBub3Qgc2V0IGJ5IHVzZXIuIFdlIHdpbGwgYWx3YXlzIGhvbm9yIHVzZXInc1xuICAgIC8vIHNldHRpbmcgaWYgaXQgaXMgcHJvdmlkZWQuXG5cbiAgICAvLyBCcm93c2VyOiB3aGVuIGNyb3NzT3JpZ2luSXNvbGF0ZWQgaXMgZmFsc2UsIFNoYXJlZEFycmF5QnVmZmVyIGlzIG5vdCBhdmFpbGFibGUgc28gV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdFxuICAgIC8vIHdvcmsuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBzZXQgbnVtVGhyZWFkcyB0byAxLlxuICAgIC8vXG4gICAgLy8gVGhlcmUgaXMgYW4gZXhjZXB0aW9uOiB3aGVuIHRoZSBicm93c2VyIGlzIGNvbmZpZ3VyZWQgdG8gZm9yY2UtZW5hYmxlIFNoYXJlZEFycmF5QnVmZmVyIChlLmcuIENocm9tdWltIHdpdGhcbiAgICAvLyAtLWVuYWJsZS1mZWF0dXJlcz1TaGFyZWRBcnJheUJ1ZmZlciksIGl0IGlzIHBvc3NpYmxlIHRoYXQgYHNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZGAgaXMgZmFsc2UgYW5kXG4gICAgLy8gU2hhcmVkQXJyYXlCdWZmZXIgaXMgYXZhaWxhYmxlIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgaXMgdXN1YWxseSBmb3IgdGVzdGluZy4gSW4gdGhpcyBjYXNlLCAgd2Ugd2lsbCBzdGlsbCBzZXRcbiAgICAvLyBudW1UaHJlYWRzIHRvIDEgaGVyZS4gSWYgd2Ugd2FudCB0byBlbmFibGUgbXVsdGktdGhyZWFkaW5nIGluIHRlc3QsIHdlIHNob3VsZCBzZXQgYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCB0byBhXG4gICAgLy8gdmFsdWUgZ3JlYXRlciB0aGFuIDEuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbnVtQ3B1TG9naWNhbENvcmVzID1cbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdub2RlOm9zJykuY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBXZWJBc3NlbWJseSBiYWNrZW5kLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cbiAgICogYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpcyBjYWxsZWQgd2l0aCBhIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXG4gICAqL1xuICBhc3luYyBpbml0KGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXG4gICAgaW5pdGlhbGl6ZUZsYWdzKCk7XG5cbiAgICAvLyBpbml0IHdhc21cbiAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lKCk7XG5cbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxuICAgIGF3YWl0IGluaXRpYWxpemVPcnRFcChiYWNrZW5kTmFtZSk7XG4gIH1cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgYnVmZmVyOiBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aE9yQnVmZmVyOiBzdHJpbmcgfCBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPiB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIoKTtcbiAgICBhd2FpdCBoYW5kbGVyLmxvYWRNb2RlbChwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiBoYW5kbGVyO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB3YXNtQmFja2VuZCA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCgpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5cbi8vIFdlIHVzZSBcInJlcXVpcmVcIiBpbnN0ZWFkIG9mIFwiaW1wb3J0XCIgaGVyZSBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnQgbXVzdCBiZSBwdXQgaW4gdG9wIGxldmVsLiBPdXIgY3VycmVudCBjb2RlIGRvZXNcbi8vIG5vdCBhbGxvdyBidW5kbGVyIHRvIHRyZWUtc2hha2luZyBjb2RlIGFzIGV4cGVjdGVkIGJlY2F1c2Ugc29tZSBjb2RlcyBhcmUgdHJlYXRlZCBhcyBoYXZpbmcgc2lkZSBlZmZlY3RzLlxuLy8gU28gd2UgaW1wb3J0IGNvZGUgaW5zaWRlIHRoZSBpZi1jbGF1c2UgdG8gYWxsb3cgYnVuZGxlciByZW1vdmUgdGhlIGNvZGUgc2FmZWx5LlxuXG5leHBvcnQgKiBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0ICogYXMgb3J0IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5leHBvcnQgZGVmYXVsdCBvcnQ7XG5cbmltcG9ydCB7IHJlZ2lzdGVyQmFja2VuZCwgZW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHTCkge1xuICBjb25zdCBvbm54anNCYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLW9ubnhqcycpLm9ubnhqc0JhY2tlbmQ7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ2wnLCBvbm54anNCYWNrZW5kLCAtMTApO1xufVxuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnVGhlIGN1cnJlbnQgYnVpbGQgaXMgc3BlY2lmaWVkIHRvIGVuYWJsZSBib3RoIEpTRVAgYW5kIFdlYkdQVSBFUC4gVGhpcyBpcyBub3QgYSB2YWxpZCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICdKU0VQIGFuZCBXZWJHUFUgRVBzIGNhbm5vdCBiZSBlbmFibGVkIGF0IHRoZSBzYW1lIHRpbWUuJyxcbiAgKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ1RoZSBjdXJyZW50IGJ1aWxkIGlzIHNwZWNpZmllZCB0byBlbmFibGUgV2ViTk4gRVAgd2l0aG91dCBKU0VQIG9yIFdlYkdQVSBFUC4gVGhpcyBpcyBub3QgYSB2YWxpZCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICdXZWJOTiBFUCByZXF1aXJlcyBlaXRoZXIgSlNFUCBvciBXZWJHUFUgRVAgdG8gYmUgZW5hYmxlZC4nLFxuICApO1xufVxuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNKSB7XG4gIGNvbnN0IHdhc21CYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLXdhc20nKS53YXNtQmFja2VuZDtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ3B1Jywgd2FzbUJhY2tlbmQsIDUpO1xuICB9XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQk5OKSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7IHZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4yNi4wJztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFnQk0sVUFDQSwwQkFZTyxpQkF3Q1AsZ0NBd0NPO0FBN0diOzs7QUFnQkEsTUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELE1BQU0sMkJBQXFDLENBQUE7QUFZcEMsTUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFNBQWtCLGFBQTBCO0FBQ3hGLFlBQUksV0FBVyxPQUFPLFFBQVEsU0FBUyxjQUFjLE9BQU8sUUFBUSxrQ0FBa0MsWUFBWTtBQUNoSCxnQkFBTSxpQkFBaUIsU0FBUyxJQUFJLElBQUk7QUFDeEMs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QUFBO0FBQUEsa0JBQUFDO0FBQUEsSUFBQTtBQUFBLGVBQUFDO0FBQUEsSUFBQTtBQUFBO0FBU0E7QUFDQTtBQUdBOzs7QUNQTyxNQUFNQyxXQUFVOzs7QURLdkIsTUFBTyxnQkFBUTtBQUtmLE1BQUksT0FBMkI7QUFDN0IsVUFBTSxnQkFBZ0IsS0FBNEI7QUFDbEQsb0JBQWdCLFNBQVMsZUFBZSxHQUFHO0FBQUEsRUFDN0M7QUFFQSxNQUFJLE9BQXdEO0FBQzFELFVBQU0sSUFBSTtBQUFBLE1BQ1I7QUFBQSxJQUVGO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBbUY7QUFDckYsVUFBTSxJQUFJO0FBQUEsTUFDUjtBQUFBLElBRUY7QUFBQSxFQUNGO0FBRUEsTUFBSSxNQUEwQjtBQUM1QixVQUFNQyxlQUFjLDBEQUEwQjtBQUM5QyxRQUFnQyxPQUE0QjtBQUMxRCxzQkFBZ0IsVUFBVUEsY0FBYSxDQUFDO0FBQUEsSUFDMUM7QUFDQSxRQUFJLE9BQTJCO0FBQzdCLHNCQUFnQixTQUFTQSxjQUFhLENBQUM7QUFBQSxJQUN6QztBQUNBLG9CQUFnQixPQUFPQSxjQUFhLEVBQUU7QUFDdEMsb0JBQWdCLFFBQVFBLGNBQWEsRUFBRTtBQUFBLEVBQ3pDO0FBRUEsU0FBTyxlQUFlQyxLQUFJLFVBQVUsT0FBTyxFQUFFLE9BQU9DLFVBQVMsWUFBWSxLQUFLLENBQUM7IiwKICAibmFtZXMiOiBbImkiLCAiZW52IiwgIkZsb2F0MTZBcnJheSIsICJUZW5zb3IiLCAiVGVuc29yIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiZW52IiwgImVudiIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJsb2NhdGlvbiIsICJlbnYiLCAid2FzbSIsICJsb2NhdGlvbiIsICJpbmRleCIsICJ0ZW5zb3IiLCAiZXJyb3JDb2RlIiwgImkiLCAiaW5pdGlhbGl6aW5nIiwgImluaXRpYWxpemVkIiwgImFib3J0ZWQiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgIlRlbnNvciIsICJjb3B5RnJvbUV4dGVybmFsQnVmZmVyIiwgImNyZWF0ZVNlc3Npb24iLCAicmVsZWFzZVNlc3Npb24iLCAicnVuIiwgImVuZFByb2ZpbGluZyIsICJlbnYiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiZW52IiwgInZlcnNpb24iLCAid2FzbUJhY2tlbmQiLCAiZW52IiwgInZlcnNpb24iXQp9Cg==

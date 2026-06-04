/*!
 * ONNX Runtime Web v1.25.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var $P=Object.create;var _i=Object.defineProperty;var AP=Object.getOwnPropertyDescriptor;var OP=Object.getOwnPropertyNames;var PP=Object.getPrototypeOf,EP=Object.prototype.hasOwnProperty;var Ms=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var U=(n,e)=>()=>(n&&(e=n(n=0)),e);var fe=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Nn=(n,e)=>{for(var r in e)_i(n,r,{get:e[r],enumerable:!0})},og=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of OP(e))!EP.call(n,o)&&o!==r&&_i(n,o,{get:()=>e[o],enumerable:!(t=AP(e,o))||t.enumerable});return n};var Oe=(n,e,r)=>(r=n!=null?$P(PP(n)):{},og(e||!n||!n.__esModule?_i(r,"default",{value:n,enumerable:!0}):r,n)),oo=n=>og(_i({},"__esModule",{value:!0}),n);var wi,Ln,mn,CP,ig,Bs=U(()=>{"use strict";wi=new Map,Ln=[],mn=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=wi.get(n);if(t===void 0)wi.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=Ln.indexOf(n);o!==-1&&Ln.splice(o,1);for(let i=0;i<Ln.length;i++)if(wi.get(Ln[i]).priority<=r){Ln.splice(i,0,n);return}Ln.push(n)}return}throw new TypeError("not a valid backend")},CP=async n=>{let e=wi.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},ig=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?Ln:r,o,i=[],a=new Set;for(let u of t){let c=await CP(u);typeof c=="string"?i.push({name:u,err:c}):(o||(o=c),o===c&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:c}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${c}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,c)=>c==="executionProviders"?s:Reflect.get(u,c)})]}});var ag=U(()=>{"use strict";Bs()});var sg,ug=U(()=>{"use strict";sg="1.25.0"});var lg,gt,Fs=U(()=>{"use strict";ug();lg="warning",gt={wasm:{},webgl:{},webgpu:{},versions:{common:sg},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);lg=n}},get logLevel(){return lg}};Object.defineProperty(gt,"logLevel",{enumerable:!0})});var ve,cg=U(()=>{"use strict";Fs();ve=gt});var dg,pg,fg=U(()=>{"use strict";dg=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,c;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?c=[0,0,0,0]:typeof s.bias=="number"?c=[s.bias,s.bias,s.bias,s.bias]:(c=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(c[3]=s.bias[3]));let f=i*o,m=0,b=f,_=f*2,v=-1;a==="RGBA"?(m=0,b=f,_=f*2,v=f*3):a==="RGB"?(m=0,b=f,_=f*2):a==="RBG"&&(m=0,_=f,b=f*2);for(let x=0;x<i;x++)for(let O=0;O<o;O++){let I=(n.data[m++]-c[0])*u[0],S=(n.data[b++]-c[1])*u[1],C=(n.data[_++]-c[2])*u[2],D=v===-1?255:(n.data[v++]-c[3])*u[3];t.fillStyle="rgba("+I+","+S+","+C+","+D+")",t.fillRect(O,x,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},pg=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,c,f;u===void 0||u.mean===void 0?c=[255,255,255,255]:typeof u.mean=="number"?c=[u.mean,u.mean,u.mean,u.mean]:(c=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(c[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let m=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let b=4,_=0,v=1,x=2,O=3,I=0,S=m,C=m*2,D=-1;s==="RGBA"?(I=0,S=m,C=m*2,D=m*3):s==="RGB"?(I=0,S=m,C=m*2):s==="RBG"&&(I=0,C=m,S=m*2),t=r.createImageData(o,i);for(let N=0;N<i*o;_+=b,v+=b,x+=b,O+=b,N++)t.data[_]=(n.data[I++]-f[0])*c[0],t.data[v]=(n.data[S++]-f[1])*c[1],t.data[x]=(n.data[C++]-f[2])*c[2],t.data[O]=D===-1?255:(n.data[D++]-f[3])*c[3]}else throw new Error("Can not access image data");return t}});var Vs,hg,mg,gg,bg,yg,_g=U(()=>{"use strict";vi();Vs=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",c=r*t,f=u==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),m=4,b=0,_=1,v=2,x=3,O=0,I=c,S=c*2,C=-1;s==="RGB"&&(m=3,b=0,_=1,v=2,x=-1),u==="RGBA"?C=c*3:u==="RBG"?(O=0,S=c,I=c*2):u==="BGR"&&(S=0,I=c,O=c*2);for(let N=0;N<c;N++,b+=m,v+=m,_+=m,x+=m)f[O++]=(n[b]+a[0])/i[0],f[I++]=(n[_]+a[1])/i[1],f[S++]=(n[v]+a[2])/i[2],C!==-1&&x!==-1&&(f[C++]=(n[x]+a[3])/i[3]);return u==="RGBA"?new vt("float32",f,[1,4,r,t]):new vt("float32",f,[1,3,r,t])},hg=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=u();f.width=n.width,f.height=n.height;let m=c(f);if(m!=null){let b=n.height,_=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(b=e.resizedHeight,_=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=b,s.width=_}else s.tensorFormat="RGBA",s.height=b,s.width=_;m.drawImage(n,0,0),a=m.getImageData(0,0,_,b).data}else throw new Error("Can not access image data")}else if(t){let f,m;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(f=e.resizedHeight,m=e.resizedWidth):(f=n.height,m=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=f,s.width=m,e!==void 0){let b=u();b.width=m,b.height=f;let _=c(b);if(_!=null)_.putImageData(n,0,0),a=_.getImageData(0,0,m,f).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=u();f.width=n.width,f.height=n.height;let m=c(f);if(m!=null){let b=n.height,_=n.width;return m.drawImage(n,0,0,_,b),a=m.getImageData(0,0,_,b).data,s.height=b,s.width=_,Vs(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,m)=>{let b=u(),_=c(b);if(!n||!_)return m();let v=new Image;v.crossOrigin="Anonymous",v.src=n,v.onload=()=>{b.width=v.width,b.height=v.height,_.drawImage(v,0,0,b.width,b.height);let x=_.getImageData(0,0,b.width,b.height);s.height=b.height,s.width=b.width,f(Vs(x.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Vs(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},mg=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new vt({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},gg=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new vt({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},bg=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new vt({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},yg=(n,e,r)=>new vt({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var Rn,Po,wg,vg,xg=U(()=>{"use strict";Rn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Po=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),wg=!1,vg=()=>{if(!wg){wg=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(Rn.set("int64",BigInt64Array),Po.set(BigInt64Array,"int64")),e&&(Rn.set("uint64",BigUint64Array),Po.set(BigUint64Array,"uint64")),t?(Rn.set("float16",r),Po.set(r,"float16")):Rn.set("float16",Uint16Array)}}});var Tg,Ig,Sg=U(()=>{"use strict";vi();Tg=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},Ig=(n,e)=>{switch(n.location){case"cpu":return new vt(n.type,n.data,e);case"cpu-pinned":return new vt({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new vt({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new vt({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new vt({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var vt,vi=U(()=>{"use strict";fg();_g();xg();Sg();vt=class{constructor(e,r,t){vg();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Rn.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let c=Rn.get(e);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&c===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${c.name} as data.`);e==="uint64"||e==="int64"?s=c.from(r,BigInt):s=c.from(r)}else if(r instanceof c)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof e[0];if(c==="string")o="string",s=e;else if(c==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let c=Po.get(e.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=c,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Tg(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return hg(e,r)}static fromTexture(e,r){return mg(e,r)}static fromGpuBuffer(e,r){return gg(e,r)}static fromMLTensor(e,r){return bg(e,r)}static fromPinnedBuffer(e,r,t){return yg(e,r,t)}toDataURL(e){return dg(this,e)}toImageData(e){return pg(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ig(this,e)}}});var Rt,Gs=U(()=>{"use strict";vi();Rt=vt});var xi,$g,zt,Pt,gn,bn,Us=U(()=>{"use strict";Fs();xi=(n,e)=>{(typeof gt.trace>"u"?!gt.wasm.trace:!gt.trace)||console.timeStamp(`${n}::ORT::${e}`)},$g=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),xi("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},zt=n=>{(typeof gt.trace>"u"?!gt.wasm.trace:!gt.trace)||$g("BEGIN",n)},Pt=n=>{(typeof gt.trace>"u"?!gt.wasm.trace:!gt.trace)||$g("END",n)},gn=n=>{(typeof gt.trace>"u"?!gt.wasm.trace:!gt.trace)||console.time(`ORT::${n}`)},bn=n=>{(typeof gt.trace>"u"?!gt.wasm.trace:!gt.trace)||console.timeEnd(`ORT::${n}`)}});var Ti,Ag=U(()=>{"use strict";Bs();Gs();Us();Ti=class n{constructor(e){this.handler=e}async run(e,r,t){zt(),gn("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof Rt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Rt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,f=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(f.indexOf(m)!==-1){let b=r[m];(b===null||b instanceof Rt)&&(c=!0,a=!1,o[m]=b)}if(c){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof e[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let s=await this.handler.run(e,o,i),u={};for(let c in s)if(Object.hasOwnProperty.call(s,c)){let f=s[c];f instanceof Rt?u[c]=f:u[c]=new Rt(f.type,f.data,f.dims)}return bn("InferenceSession.run"),Pt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){zt(),gn("InferenceSession.create");let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let f=e,m=0,b=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(b=e.byteLength-m,typeof t=="number"){if(b=t,!Number.isSafeInteger(b))throw new RangeError("'byteLength' must be an integer.");if(b<=0||m+b>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-m}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,m,b)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await ig(a),c=await s.createInferenceSessionHandler(i,u);return bn("InferenceSession.create"),Pt(),new n(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var DP,Og=U(()=>{"use strict";Ag();DP=Ti});var Pg=U(()=>{"use strict"});var Eg=U(()=>{"use strict"});var Cg=U(()=>{"use strict"});var Dg=U(()=>{"use strict"});var Ws={};Nn(Ws,{InferenceSession:()=>DP,TRACE:()=>xi,TRACE_EVENT_BEGIN:()=>gn,TRACE_EVENT_END:()=>bn,TRACE_FUNC_BEGIN:()=>zt,TRACE_FUNC_END:()=>Pt,Tensor:()=>Rt,env:()=>ve,registerBackend:()=>mn});var xt=U(()=>{"use strict";ag();cg();Og();Gs();Pg();Eg();Us();Cg();Dg()});function yn(n,e,r,t){if(e===void 0)return NP(n);if(r===void 0)Ii(n,e,1);else if(typeof r=="number"&&t===void 0)Ii(n,e,r);else if(typeof r=="string"&&t===void 0)Ii(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")Ii(n,r,t,e);else throw new TypeError("input is valid")}function NP(n){return{verbose:yn.verbose.bind(null,n),info:yn.info.bind(null,n),warning:yn.warning.bind(null,n),error:yn.error.bind(null,n),fatal:yn.fatal.bind(null,n)}}function Ii(n,e,r,t){let o=Eo[t||""]||Eo[""];Ng[n]<Ng[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,kP[o.provider].log(n,e,t))}var Hs,js,Ng,kP,Lg,Eo,qe,$i,Ai,Oi,Si,Vt=U(()=>{"use strict";Hs=class{log(e,r,t){}},js=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Ng={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},kP={none:new Hs,console:new js},Lg={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Eo={"":Lg};(u=>{function n(c,f){u("verbose",c,f)}u.verbose=n;function e(c,f){u("info",c,f)}u.info=e;function r(c,f){u("warning",c,f)}u.warning=r;function t(c,f){u("error",c,f)}u.error=t;function o(c,f){u("fatal",c,f)}u.fatal=o;function i(c){Eo={},a("",c||{})}u.reset=i;function a(c,f){if(c==="*")i(f);else{let m=Eo[c]||Lg;Eo[c]={provider:f.provider||m.provider,minimalSeverity:f.minimalSeverity||m.minimalSeverity,logDateTime:f.logDateTime===void 0?m.logDateTime:f.logDateTime,logSourceLocation:f.logSourceLocation===void 0?m.logSourceLocation:f.logSourceLocation}}}u.set=a;function s(c){let f={};c.logLevel&&(f.minimalSeverity=c.logLevel),a("",f)}u.setWithEnv=s})(yn||={});qe=yn,$i=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Ai=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},Oi=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=Si(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,c)=>{s.then(async f=>{i&&await i.end(),u(f)},async f=>{i&&await i.end(),c(f)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((c,f)=>{u.then(()=>{c(s)},m=>{f(m)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=Si();return this.flush(o),new $i(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new $i(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ai(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=Si();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Ai(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){qe.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=Si()}}get started(){return this._started}},Si=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Rg(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let c of e)if((c.domain===i||c.domain==="ai.onnx"&&i==="")&&LP(c.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function LP(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var zg=U(()=>{"use strict"});var Mg=fe(qs=>{"use strict";qs.__esModule=!0;var RP=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();qs.Guid=RP});function Qe(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function St(n){return(n&&n.__isLong__)===!0}function Bg(n){var e=Math.clz32(n&-n);return n?31-e:e}function zn(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=Vg[n],t)?t:(r=Ue(n,0,!0),o&&(Vg[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Fg[n],t)?t:(r=Ue(n,n<0?-1:0,!1),o&&(Fg[n]=r),r))}function Ut(n,e){if(isNaN(n))return e?sn:Qt;if(e){if(n<0)return sn;if(n>=Hg)return Kg}else{if(n<=-Ug)return Et;if(n+1>=Ug)return qg}return n<0?Ut(-n,e).neg():Ue(n%ao|0,n/ao|0,e)}function Ue(n,e,r){return new Qe(n,e,r)}function Xs(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?sn:Qt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Xs(n.substring(1),e,r).neg();for(var o=Ut(Pi(r,8)),i=Qt,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var c=Ut(Pi(r,s));i=i.mul(c).add(Ut(u))}else i=i.mul(o),i=i.add(Ut(u))}return i.unsigned=e,i}function er(n,e){return typeof n=="number"?Ut(n,e):typeof n=="string"?Xs(n,e):Ue(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Gt,Fg,Vg,Pi,Gg,zP,ao,Hg,Ug,Wg,Qt,sn,io,jg,Ks,qg,Kg,Et,te,_n,Zs=U(()=>{Gt=null;try{Gt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Qe.prototype.__isLong__;Object.defineProperty(Qe.prototype,"__isLong__",{value:!0});Qe.isLong=St;Fg={},Vg={};Qe.fromInt=zn;Qe.fromNumber=Ut;Qe.fromBits=Ue;Pi=Math.pow;Qe.fromString=Xs;Qe.fromValue=er;Gg=65536,zP=1<<24,ao=Gg*Gg,Hg=ao*ao,Ug=Hg/2,Wg=zn(zP),Qt=zn(0);Qe.ZERO=Qt;sn=zn(0,!0);Qe.UZERO=sn;io=zn(1);Qe.ONE=io;jg=zn(1,!0);Qe.UONE=jg;Ks=zn(-1);Qe.NEG_ONE=Ks;qg=Ue(-1,2147483647,!1);Qe.MAX_VALUE=qg;Kg=Ue(-1,-1,!0);Qe.MAX_UNSIGNED_VALUE=Kg;Et=Ue(0,-2147483648,!1);Qe.MIN_VALUE=Et;te=Qe.prototype;te.toInt=function(){return this.unsigned?this.low>>>0:this.low};te.toNumber=function(){return this.unsigned?(this.high>>>0)*ao+(this.low>>>0):this.high*ao+(this.low>>>0)};te.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Et)){var r=Ut(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Ut(Pi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),c=a.sub(u.mul(i)).toInt()>>>0,f=c.toString(e);if(a=u,a.isZero())return f+s;for(;f.length<6;)f="0"+f;s=""+f+s}};te.getHighBits=function(){return this.high};te.getHighBitsUnsigned=function(){return this.high>>>0};te.getLowBits=function(){return this.low};te.getLowBitsUnsigned=function(){return this.low>>>0};te.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Et)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};te.isZero=function(){return this.high===0&&this.low===0};te.eqz=te.isZero;te.isNegative=function(){return!this.unsigned&&this.high<0};te.isPositive=function(){return this.unsigned||this.high>=0};te.isOdd=function(){return(this.low&1)===1};te.isEven=function(){return(this.low&1)===0};te.equals=function(e){return St(e)||(e=er(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};te.eq=te.equals;te.notEquals=function(e){return!this.eq(e)};te.neq=te.notEquals;te.ne=te.notEquals;te.lessThan=function(e){return this.comp(e)<0};te.lt=te.lessThan;te.lessThanOrEqual=function(e){return this.comp(e)<=0};te.lte=te.lessThanOrEqual;te.le=te.lessThanOrEqual;te.greaterThan=function(e){return this.comp(e)>0};te.gt=te.greaterThan;te.greaterThanOrEqual=function(e){return this.comp(e)>=0};te.gte=te.greaterThanOrEqual;te.ge=te.greaterThanOrEqual;te.compare=function(e){if(St(e)||(e=er(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};te.comp=te.compare;te.negate=function(){return!this.unsigned&&this.eq(Et)?Et:this.not().add(io)};te.neg=te.negate;te.add=function(e){St(e)||(e=er(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,c=e.low&65535,f=0,m=0,b=0,_=0;return _+=i+c,b+=_>>>16,_&=65535,b+=o+u,m+=b>>>16,b&=65535,m+=t+s,f+=m>>>16,m&=65535,f+=r+a,f&=65535,Ue(b<<16|_,f<<16|m,this.unsigned)};te.subtract=function(e){return St(e)||(e=er(e)),this.add(e.neg())};te.sub=te.subtract;te.multiply=function(e){if(this.isZero())return this;if(St(e)||(e=er(e)),Gt){var r=Gt.mul(this.low,this.high,e.low,e.high);return Ue(r,Gt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?sn:Qt;if(this.eq(Et))return e.isOdd()?Et:Qt;if(e.eq(Et))return this.isOdd()?Et:Qt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Wg)&&e.lt(Wg))return Ut(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,c=e.low>>>16,f=e.low&65535,m=0,b=0,_=0,v=0;return v+=a*f,_+=v>>>16,v&=65535,_+=i*f,b+=_>>>16,_&=65535,_+=a*c,b+=_>>>16,_&=65535,b+=o*f,m+=b>>>16,b&=65535,b+=i*c,m+=b>>>16,b&=65535,b+=a*u,m+=b>>>16,b&=65535,m+=t*f+o*c+i*u+a*s,m&=65535,Ue(_<<16|v,m<<16|b,this.unsigned)};te.mul=te.multiply;te.divide=function(e){if(St(e)||(e=er(e)),e.isZero())throw Error("division by zero");if(Gt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Gt.div_u:Gt.div_s)(this.low,this.high,e.low,e.high);return Ue(r,Gt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?sn:Qt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return sn;if(e.gt(this.shru(1)))return jg;i=sn}else{if(this.eq(Et)){if(e.eq(io)||e.eq(Ks))return Et;if(e.eq(Et))return io;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Qt)?e.isNegative()?io:Ks:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(Et))return this.unsigned?sn:Qt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Qt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:Pi(2,s-48),c=Ut(t),f=c.mul(e);f.isNegative()||f.gt(o);)t-=u,c=Ut(t,this.unsigned),f=c.mul(e);c.isZero()&&(c=io),i=i.add(c),o=o.sub(f)}return i};te.div=te.divide;te.modulo=function(e){if(St(e)||(e=er(e)),Gt){var r=(this.unsigned?Gt.rem_u:Gt.rem_s)(this.low,this.high,e.low,e.high);return Ue(r,Gt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};te.mod=te.modulo;te.rem=te.modulo;te.not=function(){return Ue(~this.low,~this.high,this.unsigned)};te.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};te.clz=te.countLeadingZeros;te.countTrailingZeros=function(){return this.low?Bg(this.low):Bg(this.high)+32};te.ctz=te.countTrailingZeros;te.and=function(e){return St(e)||(e=er(e)),Ue(this.low&e.low,this.high&e.high,this.unsigned)};te.or=function(e){return St(e)||(e=er(e)),Ue(this.low|e.low,this.high|e.high,this.unsigned)};te.xor=function(e){return St(e)||(e=er(e)),Ue(this.low^e.low,this.high^e.high,this.unsigned)};te.shiftLeft=function(e){return St(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ue(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Ue(0,this.low<<e-32,this.unsigned)};te.shl=te.shiftLeft;te.shiftRight=function(e){return St(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ue(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Ue(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};te.shr=te.shiftRight;te.shiftRightUnsigned=function(e){return St(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ue(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Ue(this.high,0,this.unsigned):Ue(this.high>>>e-32,0,this.unsigned)};te.shru=te.shiftRightUnsigned;te.shr_u=te.shiftRightUnsigned;te.rotateLeft=function(e){var r;return St(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ue(this.high,this.low,this.unsigned):e<32?(r=32-e,Ue(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Ue(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};te.rotl=te.rotateLeft;te.rotateRight=function(e){var r;return St(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ue(this.high,this.low,this.unsigned):e<32?(r=32-e,Ue(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Ue(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};te.rotr=te.rotateRight;te.toSigned=function(){return this.unsigned?Ue(this.low,this.high,!1):this};te.toUnsigned=function(){return this.unsigned?this:Ue(this.low,this.high,!0)};te.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};te.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};te.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};Qe.fromBytes=function(e,r,t){return t?Qe.fromBytesLE(e,r):Qe.fromBytesBE(e,r)};Qe.fromBytesLE=function(e,r){return new Qe(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};Qe.fromBytesBE=function(e,r){return new Qe(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};_n=Qe});var Js=fe(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.ArgType=void 0;var Xg;(function(n){n[n.INPUT=0]="INPUT",n[n.OUTPUT=1]="OUTPUT"})(Xg||(Ei.ArgType=Xg={}))});var Mn=fe(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.SIZE_PREFIX_LENGTH=pr.FILE_IDENTIFIER_LENGTH=pr.SIZEOF_INT=pr.SIZEOF_SHORT=void 0;pr.SIZEOF_SHORT=2;pr.SIZEOF_INT=4;pr.FILE_IDENTIFIER_LENGTH=4;pr.SIZE_PREFIX_LENGTH=4});var Ys=fe(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.isLittleEndian=Wt.float64=Wt.float32=Wt.int32=void 0;Wt.int32=new Int32Array(2);Wt.float32=new Float32Array(Wt.int32.buffer);Wt.float64=new Float64Array(Wt.int32.buffer);Wt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Qs=fe(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.Encoding=void 0;var Zg;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Zg||(Ci.Encoding=Zg={}))});var tu=fe(Di=>{"use strict";Object.defineProperty(Di,"__esModule",{value:!0});Di.ByteBuffer=void 0;var fr=Mn(),Ct=Ys(),MP=Qs(),eu=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return Ct.int32[0]=this.readInt32(e),Ct.float32[0]}readFloat64(e){return Ct.int32[Ct.isLittleEndian?0:1]=this.readInt32(e),Ct.int32[Ct.isLittleEndian?1:0]=this.readInt32(e+4),Ct.float64[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){Ct.float32[0]=r,this.writeInt32(e,Ct.int32[0])}writeFloat64(e,r){Ct.float64[0]=r,this.writeInt32(e,Ct.int32[Ct.isLittleEndian?0:1]),this.writeInt32(e+4,Ct.int32[Ct.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+fr.SIZEOF_INT+fr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<fr.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+fr.SIZEOF_INT+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=fr.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return r===MP.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+fr.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=fr.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+fr.FILE_IDENTIFIER_LENGTH);for(let r=0;r<fr.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+fr.SIZEOF_INT+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};Di.ByteBuffer=eu});var Yg=fe(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.Builder=void 0;var Jg=tu(),Mt=Mn(),ru=class n{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let r;e?r=e:r=1024,this.bb=Jg.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,r){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+r)+1&e-1;for(;this.space<t+e+r;){let o=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let r=0;r<e;r++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,r,t){(this.force_defaults||r!=t)&&(this.addInt8(r),this.slot(e))}addFieldInt16(e,r,t){(this.force_defaults||r!=t)&&(this.addInt16(r),this.slot(e))}addFieldInt32(e,r,t){(this.force_defaults||r!=t)&&(this.addInt32(r),this.slot(e))}addFieldInt64(e,r,t){(this.force_defaults||r!==t)&&(this.addInt64(r),this.slot(e))}addFieldFloat32(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat32(r),this.slot(e))}addFieldFloat64(e,r,t){(this.force_defaults||r!=t)&&(this.addFloat64(r),this.slot(e))}addFieldOffset(e,r,t){(this.force_defaults||r!=t)&&(this.addOffset(r),this.slot(e))}addFieldStruct(e,r,t){r!=t&&(this.nested(r),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(r&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=r<<1,o=Jg.ByteBuffer.allocate(t);return o.setPosition(t-r),o.bytes().set(e.bytes(),t-r),o}addOffset(e){this.prep(Mt.SIZEOF_INT,0),this.writeInt32(this.offset()-e+Mt.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let r=0;r<e;r++)this.vtable[r]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),r=this.vtable_in_use-1;for(;r>=0&&this.vtable[r]==0;r--);let t=r+1;for(;r>=0;r--)this.addInt16(this.vtable[r]!=0?e-this.vtable[r]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*Mt.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(r=0;r<this.vtables.length;r++){let u=this.bb.capacity()-this.vtables[r];if(i==this.bb.readInt16(u)){for(let c=Mt.SIZEOF_SHORT;c<i;c+=Mt.SIZEOF_SHORT)if(this.bb.readInt16(s+c)!=this.bb.readInt16(u+c))continue e;a=this.vtables[r];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,r,t){let o=t?Mt.SIZE_PREFIX_LENGTH:0;if(r){let i=r;if(this.prep(this.minalign,Mt.SIZEOF_INT+Mt.FILE_IDENTIFIER_LENGTH+o),i.length!=Mt.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+Mt.FILE_IDENTIFIER_LENGTH);for(let a=Mt.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,Mt.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,r){this.finish(e,r,!0)}requiredField(e,r){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(r<this.bb.readInt16(o)&&this.bb.readInt16(o+r)!=0))throw new TypeError("FlatBuffers: field "+r+" must be set")}startVector(e,r,t){this.notNested(),this.vector_num_elems=r,this.prep(Mt.SIZEOF_INT,e*r),this.prep(t,e*r)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let r=this.createString(e);return this.string_maps.set(e,r),r}createString(e){if(e==null)return 0;let r;return e instanceof Uint8Array?r=e:r=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,r.length,1),this.bb.setPosition(this.space-=r.length),this.bb.bytes().set(r,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let r=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)r.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return r}createStructOffsetList(e,r){return r(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};ki.Builder=ru});var We=fe(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.ByteBuffer=nt.Builder=nt.Encoding=nt.isLittleEndian=nt.float64=nt.float32=nt.int32=nt.SIZE_PREFIX_LENGTH=nt.FILE_IDENTIFIER_LENGTH=nt.SIZEOF_INT=nt.SIZEOF_SHORT=void 0;var BP=Mn();Object.defineProperty(nt,"SIZEOF_SHORT",{enumerable:!0,get:function(){return BP.SIZEOF_SHORT}});var FP=Mn();Object.defineProperty(nt,"SIZEOF_INT",{enumerable:!0,get:function(){return FP.SIZEOF_INT}});var VP=Mn();Object.defineProperty(nt,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return VP.FILE_IDENTIFIER_LENGTH}});var GP=Mn();Object.defineProperty(nt,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return GP.SIZE_PREFIX_LENGTH}});var Ni=Ys();Object.defineProperty(nt,"int32",{enumerable:!0,get:function(){return Ni.int32}});Object.defineProperty(nt,"float32",{enumerable:!0,get:function(){return Ni.float32}});Object.defineProperty(nt,"float64",{enumerable:!0,get:function(){return Ni.float64}});Object.defineProperty(nt,"isLittleEndian",{enumerable:!0,get:function(){return Ni.isLittleEndian}});var UP=Qs();Object.defineProperty(nt,"Encoding",{enumerable:!0,get:function(){return UP.Encoding}});var WP=Yg();Object.defineProperty(nt,"Builder",{enumerable:!0,get:function(){return WP.Builder}});var HP=tu();Object.defineProperty(nt,"ByteBuffer",{enumerable:!0,get:function(){return HP.ByteBuffer}})});var ou=fe(hr=>{"use strict";var jP=hr&&hr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qP=hr&&hr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),KP=hr&&hr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&jP(e,n,r);return qP(e,n),e};Object.defineProperty(hr,"__esModule",{value:!0});hr.ArgTypeAndIndex=void 0;var XP=KP(We()),Qg=Js(),nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+XP.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):Qg.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,Qg.ArgType.INPUT)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}};hr.ArgTypeAndIndex=nu});var iu=fe(Li=>{"use strict";Object.defineProperty(Li,"__esModule",{value:!0});Li.AttributeType=void 0;var eb;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.INT=2]="INT",n[n.STRING=3]="STRING",n[n.TENSOR=4]="TENSOR",n[n.GRAPH=5]="GRAPH",n[n.FLOATS=6]="FLOATS",n[n.INTS=7]="INTS",n[n.STRINGS=8]="STRINGS",n[n.TENSORS=9]="TENSORS",n[n.GRAPHS=10]="GRAPHS",n[n.SPARSE_TENSOR=11]="SPARSE_TENSOR",n[n.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(eb||(Li.AttributeType=eb={}))});var au=fe(Ri=>{"use strict";Object.defineProperty(Ri,"__esModule",{value:!0});Ri.NodeType=void 0;var tb;(function(n){n[n.Primitive=0]="Primitive",n[n.Fused=1]="Fused"})(tb||(Ri.NodeType=tb={}))});var uu=fe(mr=>{"use strict";var ZP=mr&&mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),JP=mr&&mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),YP=mr&&mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&ZP(e,n,r);return JP(e,n),e};Object.defineProperty(mr,"__esModule",{value:!0});mr.Node=void 0;var QP=YP(We()),eE=lu(),rb=au(),su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+QP.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):rb.NodeType.Primitive}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new eE.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,rb.NodeType.Primitive)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,c,f,m,b,_,v){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,c),n.addInputs(e,f),n.addOutputs(e,m),n.addAttributes(e,b),n.addInputArgCounts(e,_),n.addImplicitInputs(e,v),n.endNode(e)}};mr.Node=su});var du=fe(zi=>{"use strict";Object.defineProperty(zi,"__esModule",{value:!0});zi.EdgeEnd=void 0;var cu=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}};zi.EdgeEnd=cu});var fu=fe(gr=>{"use strict";var tE=gr&&gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),rE=gr&&gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),nE=gr&&gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&tE(e,n,r);return rE(e,n),e};Object.defineProperty(gr,"__esModule",{value:!0});gr.NodeEdge=void 0;var oE=nE(We()),nb=du(),pu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+oE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new nb.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new nb.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}};gr.NodeEdge=pu});var mu=fe(br=>{"use strict";var iE=br&&br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),aE=br&&br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),sE=br&&br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&iE(e,n,r);return aE(e,n),e};Object.defineProperty(br,"__esModule",{value:!0});br.NodesToOptimizeIndices=void 0;var uE=sE(We()),hu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+uE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}};br.NodesToOptimizeIndices=hu});var bu=fe(yr=>{"use strict";var lE=yr&&yr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),cE=yr&&yr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),dE=yr&&yr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&lE(e,n,r);return cE(e,n),e};Object.defineProperty(yr,"__esModule",{value:!0});yr.RuntimeOptimizationRecord=void 0;var pE=dE(We()),fE=mu(),gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+pE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new fE.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};yr.RuntimeOptimizationRecord=gu});var _u=fe(_r=>{"use strict";var hE=_r&&_r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),mE=_r&&_r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),gE=_r&&_r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&hE(e,n,r);return mE(e,n),e};Object.defineProperty(_r,"__esModule",{value:!0});_r.RuntimeOptimizationRecordContainerEntry=void 0;var bE=gE(We()),yE=bu(),yu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+bE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new yE.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}};_r.RuntimeOptimizationRecordContainerEntry=yu});var vu=fe(wr=>{"use strict";var _E=wr&&wr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),wE=wr&&wr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),vE=wr&&wr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&_E(e,n,r);return wE(e,n),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.RuntimeOptimizations=void 0;var xE=vE(We()),TE=_u(),wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+xE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new TE.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}};wr.RuntimeOptimizations=wu});var Co=fe(Mi=>{"use strict";Object.defineProperty(Mi,"__esModule",{value:!0});Mi.TensorDataType=void 0;var ob;(function(n){n[n.UNDEFINED=0]="UNDEFINED",n[n.FLOAT=1]="FLOAT",n[n.UINT8=2]="UINT8",n[n.INT8=3]="INT8",n[n.UINT16=4]="UINT16",n[n.INT16=5]="INT16",n[n.INT32=6]="INT32",n[n.INT64=7]="INT64",n[n.STRING=8]="STRING",n[n.BOOL=9]="BOOL",n[n.FLOAT16=10]="FLOAT16",n[n.DOUBLE=11]="DOUBLE",n[n.UINT32=12]="UINT32",n[n.UINT64=13]="UINT64",n[n.COMPLEX64=14]="COMPLEX64",n[n.COMPLEX128=15]="COMPLEX128",n[n.BFLOAT16=16]="BFLOAT16",n[n.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",n[n.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",n[n.FLOAT8E5M2=19]="FLOAT8E5M2",n[n.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(ob||(Mi.TensorDataType=ob={}))});var Do=fe(vr=>{"use strict";var IE=vr&&vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),SE=vr&&vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),$E=vr&&vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&IE(e,n,r);return SE(e,n),e};Object.defineProperty(vr,"__esModule",{value:!0});vr.Tensor=void 0;var AE=$E(We()),ib=Co(),xu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+AE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):ib.TensorDataType.UNDEFINED}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,ib.TensorDataType.UNDEFINED)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}};vr.Tensor=xu});var Iu=fe(xr=>{"use strict";var OE=xr&&xr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),PE=xr&&xr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),EE=xr&&xr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&OE(e,n,r);return PE(e,n),e};Object.defineProperty(xr,"__esModule",{value:!0});xr.SparseTensor=void 0;var CE=EE(We()),ab=Do(),Tu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+CE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new ab.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new ab.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}};xr.SparseTensor=Tu});var $u=fe(Tr=>{"use strict";var DE=Tr&&Tr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),kE=Tr&&Tr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),NE=Tr&&Tr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&DE(e,n,r);return kE(e,n),e};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.MapType=void 0;var LE=NE(We()),sb=Co(),RE=ko(),Su=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsMapType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,r){return e.setPosition(e.position()+LE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):sb.TensorDataType.UNDEFINED}valueType(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new RE.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,r){e.addFieldInt32(0,r,sb.TensorDataType.UNDEFINED)}static addValueType(e,r){e.addFieldOffset(1,r,0)}static endMapType(e){return e.endObject()}};Tr.MapType=Su});var Ou=fe(Ir=>{"use strict";var zE=Ir&&Ir.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),ME=Ir&&Ir.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),BE=Ir&&Ir.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&zE(e,n,r);return ME(e,n),e};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.SequenceType=void 0;var FE=BE(We()),VE=ko(),Au=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSequenceType(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,r){return e.setPosition(e.position()+FE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new VE.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,r){e.addFieldOffset(0,r,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,r){return n.startSequenceType(e),n.addElemType(e,r),n.endSequenceType(e)}};Ir.SequenceType=Au});var Pu=fe(Bi=>{"use strict";Object.defineProperty(Bi,"__esModule",{value:!0});Bi.DimensionValueType=void 0;var ub;(function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.VALUE=1]="VALUE",n[n.PARAM=2]="PARAM"})(ub||(Bi.DimensionValueType=ub={}))});var Cu=fe(Sr=>{"use strict";var GE=Sr&&Sr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),UE=Sr&&Sr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),WE=Sr&&Sr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&GE(e,n,r);return UE(e,n),e};Object.defineProperty(Sr,"__esModule",{value:!0});Sr.DimensionValue=void 0;var HE=WE(We()),lb=Pu(),Eu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+HE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):lb.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,lb.DimensionValueType.UNKNOWN)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}};Sr.DimensionValue=Eu});var ku=fe($r=>{"use strict";var jE=$r&&$r.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),qE=$r&&$r.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),KE=$r&&$r.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&jE(e,n,r);return qE(e,n),e};Object.defineProperty($r,"__esModule",{value:!0});$r.Dimension=void 0;var XE=KE(We()),ZE=Cu(),Du=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+XE.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new ZE.DimensionValue).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}};$r.Dimension=Du});var Lu=fe(Ar=>{"use strict";var JE=Ar&&Ar.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),YE=Ar&&Ar.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),QE=Ar&&Ar.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&JE(e,n,r);return YE(e,n),e};Object.defineProperty(Ar,"__esModule",{value:!0});Ar.Shape=void 0;var e3=QE(We()),t3=ku(),Nu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+e3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new t3.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}};Ar.Shape=Nu});var zu=fe(Or=>{"use strict";var r3=Or&&Or.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),n3=Or&&Or.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),o3=Or&&Or.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&r3(e,n,r);return n3(e,n),e};Object.defineProperty(Or,"__esModule",{value:!0});Or.TensorTypeAndShape=void 0;var i3=o3(We()),a3=Lu(),cb=Co(),Ru=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+i3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):cb.TensorDataType.UNDEFINED}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new a3.Shape).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,cb.TensorDataType.UNDEFINED)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}};Or.TensorTypeAndShape=Ru});var Mu=fe(wn=>{"use strict";Object.defineProperty(wn,"__esModule",{value:!0});wn.unionListToTypeInfoValue=wn.unionToTypeInfoValue=wn.TypeInfoValue=void 0;var db=$u(),pb=Ou(),fb=zu(),Fi;(function(n){n[n.NONE=0]="NONE",n[n.tensor_type=1]="tensor_type",n[n.sequence_type=2]="sequence_type",n[n.map_type=3]="map_type"})(Fi||(wn.TypeInfoValue=Fi={}));function s3(n,e){switch(Fi[n]){case"NONE":return null;case"tensor_type":return e(new fb.TensorTypeAndShape);case"sequence_type":return e(new pb.SequenceType);case"map_type":return e(new db.MapType);default:return null}}wn.unionToTypeInfoValue=s3;function u3(n,e,r){switch(Fi[n]){case"NONE":return null;case"tensor_type":return e(r,new fb.TensorTypeAndShape);case"sequence_type":return e(r,new pb.SequenceType);case"map_type":return e(r,new db.MapType);default:return null}}wn.unionListToTypeInfoValue=u3});var ko=fe(Pr=>{"use strict";var l3=Pr&&Pr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),c3=Pr&&Pr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),d3=Pr&&Pr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&l3(e,n,r);return c3(e,n),e};Object.defineProperty(Pr,"__esModule",{value:!0});Pr.TypeInfo=void 0;var p3=d3(We()),hb=Mu(),Bu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+p3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):hb.TypeInfoValue.NONE}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,hb.TypeInfoValue.NONE)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}};Pr.TypeInfo=Bu});var Vu=fe(Er=>{"use strict";var f3=Er&&Er.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),h3=Er&&Er.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),m3=Er&&Er.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&f3(e,n,r);return h3(e,n),e};Object.defineProperty(Er,"__esModule",{value:!0});Er.ValueInfo=void 0;var g3=m3(We()),b3=ko(),Fu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+g3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new b3.TypeInfo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}};Er.ValueInfo=Fu});var Vi=fe(Cr=>{"use strict";var y3=Cr&&Cr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),_3=Cr&&Cr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),w3=Cr&&Cr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&y3(e,n,r);return _3(e,n),e};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.Graph=void 0;var v3=w3(We()),x3=uu(),T3=fu(),I3=vu(),S3=Iu(),$3=Do(),A3=Vu(),Gu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+v3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new $3.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new A3.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new x3.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new T3.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new S3.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new I3.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}};Cr.Graph=Gu});var lu=fe(Dr=>{"use strict";var O3=Dr&&Dr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),P3=Dr&&Dr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),E3=Dr&&Dr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&O3(e,n,r);return P3(e,n),e};Object.defineProperty(Dr,"__esModule",{value:!0});Dr.Attribute=void 0;var C3=E3(We()),mb=iu(),gb=Vi(),bb=Do(),Uu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+C3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):mb.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new bb.Tensor).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new gb.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new bb.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new gb.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,mb.AttributeType.UNDEFINED)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}};Dr.Attribute=Uu});var Hu=fe(kr=>{"use strict";var D3=kr&&kr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),k3=kr&&kr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),N3=kr&&kr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&D3(e,n,r);return k3(e,n),e};Object.defineProperty(kr,"__esModule",{value:!0});kr.DeprecatedKernelCreateInfos=void 0;var L3=N3(We()),Wu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedKernelCreateInfos(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,r){return e.setPosition(e.position()+L3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.readUint64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addKernelDefHashes(e,r){e.addFieldOffset(1,r,0)}static createKernelDefHashesVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startKernelDefHashesVector(e,r){e.startVector(8,r,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,r,t){return n.startDeprecatedKernelCreateInfos(e),n.addNodeIndices(e,r),n.addKernelDefHashes(e,t),n.endDeprecatedKernelCreateInfos(e)}};kr.DeprecatedKernelCreateInfos=Wu});var yb=fe(Nr=>{"use strict";var R3=Nr&&Nr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),z3=Nr&&Nr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),M3=Nr&&Nr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&R3(e,n,r);return z3(e,n),e};Object.defineProperty(Nr,"__esModule",{value:!0});Nr.DeprecatedNodeIndexAndKernelDefHash=void 0;var B3=M3(We()),ju=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,r){return e.setPosition(e.position()+B3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addKernelDefHash(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,r,t){return n.startDeprecatedNodeIndexAndKernelDefHash(e),n.addNodeIndex(e,r),n.addKernelDefHash(e,t),n.endDeprecatedNodeIndexAndKernelDefHash(e)}};Nr.DeprecatedNodeIndexAndKernelDefHash=ju});var Ku=fe(Lr=>{"use strict";var F3=Lr&&Lr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),V3=Lr&&Lr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),G3=Lr&&Lr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&F3(e,n,r);return V3(e,n),e};Object.defineProperty(Lr,"__esModule",{value:!0});Lr.DeprecatedSubGraphSessionState=void 0;var U3=G3(We()),W3=Xu(),qu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSubGraphSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,r){return e.setPosition(e.position()+U3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}sessionState(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new W3.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,r){e.addFieldOffset(0,r,0)}static addSessionState(e,r){e.addFieldOffset(1,r,0)}static endDeprecatedSubGraphSessionState(e){let r=e.endObject();return e.requiredField(r,4),r}};Lr.DeprecatedSubGraphSessionState=qu});var Xu=fe(Rr=>{"use strict";var H3=Rr&&Rr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),j3=Rr&&Rr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),q3=Rr&&Rr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&H3(e,n,r);return j3(e,n),e};Object.defineProperty(Rr,"__esModule",{value:!0});Rr.DeprecatedSessionState=void 0;var K3=q3(We()),X3=Hu(),Z3=Ku(),Zu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDeprecatedSessionState(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,r){return e.setPosition(e.position()+K3.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new X3.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}subGraphSessionStates(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Z3.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,r){e.addFieldOffset(0,r,0)}static addSubGraphSessionStates(e,r){e.addFieldOffset(1,r,0)}static createSubGraphSessionStatesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,r){e.startVector(4,r,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,r,t){return n.startDeprecatedSessionState(e),n.addKernels(e,r),n.addSubGraphSessionStates(e,t),n.endDeprecatedSessionState(e)}};Rr.DeprecatedSessionState=Zu});var Yu=fe(zr=>{"use strict";var J3=zr&&zr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),Y3=zr&&zr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),Q3=zr&&zr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&J3(e,n,r);return Y3(e,n),e};Object.defineProperty(zr,"__esModule",{value:!0});zr.KernelTypeStrArgsEntry=void 0;var eC=Q3(We()),tC=ou(),Ju=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+eC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new tC.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}};zr.KernelTypeStrArgsEntry=Ju});var el=fe(Mr=>{"use strict";var rC=Mr&&Mr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),nC=Mr&&Mr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),oC=Mr&&Mr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&rC(e,n,r);return nC(e,n),e};Object.defineProperty(Mr,"__esModule",{value:!0});Mr.OpIdKernelTypeStrArgsEntry=void 0;var iC=oC(We()),aC=Yu(),Qu=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+iC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new aC.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}};Mr.OpIdKernelTypeStrArgsEntry=Qu});var rl=fe(Br=>{"use strict";var sC=Br&&Br.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),uC=Br&&Br.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),lC=Br&&Br.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&sC(e,n,r);return uC(e,n),e};Object.defineProperty(Br,"__esModule",{value:!0});Br.KernelTypeStrResolver=void 0;var cC=lC(We()),dC=el(),tl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+cC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new dC.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}};Br.KernelTypeStrResolver=tl});var ol=fe(Fr=>{"use strict";var pC=Fr&&Fr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),fC=Fr&&Fr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),hC=Fr&&Fr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&pC(e,n,r);return fC(e,n),e};Object.defineProperty(Fr,"__esModule",{value:!0});Fr.OperatorSetId=void 0;var mC=hC(We()),nl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+mC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}};Fr.OperatorSetId=nl});var al=fe(Vr=>{"use strict";var gC=Vr&&Vr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),bC=Vr&&Vr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),yC=Vr&&Vr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&gC(e,n,r);return bC(e,n),e};Object.defineProperty(Vr,"__esModule",{value:!0});Vr.StringStringEntry=void 0;var _C=yC(We()),il=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+_C.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}};Vr.StringStringEntry=il});var ul=fe(Gr=>{"use strict";var wC=Gr&&Gr.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),vC=Gr&&Gr.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),xC=Gr&&Gr.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&wC(e,n,r);return vC(e,n),e};Object.defineProperty(Gr,"__esModule",{value:!0});Gr.Model=void 0;var TC=xC(We()),IC=Vi(),SC=ol(),$C=al(),sl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+TC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new SC.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new IC.Graph).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new $C.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}};Gr.Model=sl});var _b=fe(Ur=>{"use strict";var AC=Ur&&Ur.__createBinding||(Object.create?function(n,e,r,t){t===void 0&&(t=r);var o=Object.getOwnPropertyDescriptor(e,r);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(n,t,o)}:function(n,e,r,t){t===void 0&&(t=r),n[t]=e[r]}),OC=Ur&&Ur.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),PC=Ur&&Ur.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(n!=null)for(var r in n)r!=="default"&&Object.prototype.hasOwnProperty.call(n,r)&&AC(e,n,r);return OC(e,n),e};Object.defineProperty(Ur,"__esModule",{value:!0});Ur.InferenceSession=void 0;var EC=PC(We()),CC=rl(),DC=ul(),ll=class n{constructor(){this.bb=null,this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+EC.SIZE_PREFIX_LENGTH),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new DC.Model).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new CC.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}};Ur.InferenceSession=ll});var kC,NC,Gi,Ht,LC,RC,zC,MC,BC,FC,VC,GC,cl,dl,UC,WC,HC,jC,pl,qC,KC,XC,ZC,JC,YC,QC,eD,tD,rD,nD,oD,iD,No,fl,aD,hl,sD,wb=U(()=>{"use strict";kC=Oe(Js()),NC=Oe(ou()),Gi=Oe(lu()),Ht=Oe(iu()),LC=Oe(Hu()),RC=Oe(yb()),zC=Oe(Xu()),MC=Oe(Ku()),BC=Oe(ku()),FC=Oe(Cu()),VC=Oe(Pu()),GC=Oe(du()),cl=Oe(Vi()),dl=Oe(_b()),UC=Oe(Yu()),WC=Oe(rl()),HC=Oe($u()),jC=Oe(ul()),pl=Oe(uu()),qC=Oe(fu()),KC=Oe(au()),XC=Oe(mu()),ZC=Oe(el()),JC=Oe(ol()),YC=Oe(bu()),QC=Oe(_u()),eD=Oe(vu()),tD=Oe(Ou()),rD=Oe(Lu()),nD=Oe(Iu()),oD=Oe(al()),iD=Oe(Do()),No=Oe(Co()),fl=Oe(zu()),aD=Oe(ko()),hl=Oe(Mu()),sD=Oe(Vu())});var Lo=U(()=>{"use strict";wb()});var xb=fe((BB,vb)=>{"use strict";vb.exports=uD;function uD(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(f){if(i)if(i=!1,f)u(f);else{for(var m=new Array(arguments.length-1),b=0;b<m.length;)m[b++]=arguments[b];s.apply(null,m)}};try{n.apply(e||null,r)}catch(c){i&&(i=!1,u(c))}})}});var $b=fe(Sb=>{"use strict";var Wi=Sb;Wi.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var so=new Array(64),Ib=new Array(123);for(tr=0;tr<64;)Ib[so[tr]=tr<26?tr+65:tr<52?tr+71:tr<62?tr-4:tr-59|43]=tr++;var tr;Wi.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var c=e[r++];switch(s){case 0:i[a++]=so[c>>2],u=(c&3)<<4,s=1;break;case 1:i[a++]=so[u|c>>4],u=(c&15)<<2,s=2;break;case 2:i[a++]=so[u|c>>6],i[a++]=so[c&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=so[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Tb="invalid encoding";Wi.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=Ib[u])===void 0)throw Error(Tb);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Tb);return t-o};Wi.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Ob=fe((VB,Ab)=>{"use strict";Ab.exports=Hi;function Hi(){this._listeners={}}Hi.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};Hi.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};Hi.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var Lb=fe((GB,Nb)=>{"use strict";Nb.exports=Pb(Pb);function Pb(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,c,f){e[0]=u,c[f]=r[0],c[f+1]=r[1],c[f+2]=r[2],c[f+3]=r[3]}function i(u,c,f){e[0]=u,c[f]=r[3],c[f+1]=r[2],c[f+2]=r[1],c[f+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],e[0]}function s(u,c){return r[3]=u[c],r[2]=u[c+1],r[1]=u[c+2],r[0]=u[c+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),c=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|c)>>>0,i,a)}}n.writeFloatLE=e.bind(null,Eb),n.writeFloatBE=e.bind(null,Cb);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,c=a&8388607;return u===255?c?NaN:s*(1/0):u===0?s*1401298464324817e-60*c:s*Math.pow(2,u-150)*(c+8388608)}n.readFloatLE=r.bind(null,Db),n.readFloatBE=r.bind(null,kb)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,c,f){e[0]=u,c[f]=r[0],c[f+1]=r[1],c[f+2]=r[2],c[f+3]=r[3],c[f+4]=r[4],c[f+5]=r[5],c[f+6]=r[6],c[f+7]=r[7]}function i(u,c,f){e[0]=u,c[f]=r[7],c[f+1]=r[6],c[f+2]=r[5],c[f+3]=r[4],c[f+4]=r[3],c[f+5]=r[2],c[f+6]=r[1],c[f+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],r[4]=u[c+4],r[5]=u[c+5],r[6]=u[c+6],r[7]=u[c+7],e[0]}function s(u,c){return r[7]=u[c],r[6]=u[c+1],r[5]=u[c+2],r[4]=u[c+3],r[3]=u[c+4],r[2]=u[c+5],r[1]=u[c+6],r[0]=u[c+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var c=a<0?1:0;if(c&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((c<<31|2146435072)>>>0,s,u+i);else{var f;if(a<22250738585072014e-324)f=a/5e-324,t(f>>>0,s,u+o),t((c<<31|f/4294967296)>>>0,s,u+i);else{var m=Math.floor(Math.log(a)/Math.LN2);m===1024&&(m=1023),f=a*Math.pow(2,-m),t(f*4503599627370496>>>0,s,u+o),t((c<<31|m+1023<<20|f*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,Eb,0,4),n.writeDoubleBE=e.bind(null,Cb,4,0);function r(t,o,i,a,s){var u=t(a,s+o),c=t(a,s+i),f=(c>>31)*2+1,m=c>>>20&2047,b=4294967296*(c&1048575)+u;return m===2047?b?NaN:f*(1/0):m===0?f*5e-324*b:f*Math.pow(2,m-1075)*(b+4503599627370496)}n.readDoubleLE=r.bind(null,Db,0,4),n.readDoubleBE=r.bind(null,kb,4,0)}(),n}function Eb(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function Cb(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Db(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function kb(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Rb=fe((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var Mb=fe(zb=>{"use strict";var ml=zb;ml.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};ml.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};ml.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Fb=fe((WB,Bb)=>{"use strict";Bb.exports=lD;function lD(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var c=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),c}}});var Gb=fe((HB,Vb)=>{"use strict";Vb.exports=_t;var Ro=xn();function _t(n,e){this.lo=n>>>0,this.hi=e>>>0}var Bn=_t.zero=new _t(0,0);Bn.toNumber=function(){return 0};Bn.zzEncode=Bn.zzDecode=function(){return this};Bn.length=function(){return 1};var cD=_t.zeroHash="\0\0\0\0\0\0\0\0";_t.fromNumber=function(e){if(e===0)return Bn;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new _t(t,o)};_t.from=function(e){if(typeof e=="number")return _t.fromNumber(e);if(Ro.isString(e))if(Ro.Long)e=Ro.Long.fromString(e);else return _t.fromNumber(parseInt(e,10));return e.low||e.high?new _t(e.low>>>0,e.high>>>0):Bn};_t.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};_t.prototype.toLong=function(e){return Ro.Long?new Ro.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var vn=String.prototype.charCodeAt;_t.fromHash=function(e){return e===cD?Bn:new _t((vn.call(e,0)|vn.call(e,1)<<8|vn.call(e,2)<<16|vn.call(e,3)<<24)>>>0,(vn.call(e,4)|vn.call(e,5)<<8|vn.call(e,6)<<16|vn.call(e,7)<<24)>>>0)};_t.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};_t.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};_t.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};_t.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var xn=fe(gl=>{"use strict";var be=gl;be.asPromise=xb();be.base64=$b();be.EventEmitter=Ob();be.float=Lb();be.inquire=Rb();be.utf8=Mb();be.pool=Fb();be.LongBits=Gb();be.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);be.global=be.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||gl;be.emptyArray=Object.freeze?Object.freeze([]):[];be.emptyObject=Object.freeze?Object.freeze({}):{};be.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};be.isString=function(e){return typeof e=="string"||e instanceof String};be.isObject=function(e){return e&&typeof e=="object"};be.isset=be.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};be.Buffer=function(){try{var n=be.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();be._Buffer_from=null;be._Buffer_allocUnsafe=null;be.newBuffer=function(e){return typeof e=="number"?be.Buffer?be._Buffer_allocUnsafe(e):new be.Array(e):be.Buffer?be._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};be.Array=typeof Uint8Array<"u"?Uint8Array:Array;be.Long=be.global.dcodeIO&&be.global.dcodeIO.Long||be.global.Long||be.inquire("long");be.key2Re=/^true|false|0|1$/;be.key32Re=/^-?(?:0|[1-9][0-9]*)$/;be.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;be.longToHash=function(e){return e?be.LongBits.from(e).toHash():be.LongBits.zeroHash};be.longFromHash=function(e,r){var t=be.LongBits.fromHash(e);return be.Long?be.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Ub(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}be.merge=Ub;be.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Wb(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Ub(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}be.newError=Wb;be.ProtocolError=Wb("ProtocolError");be.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};be.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};be.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};be._configure=function(){var n=be.Buffer;if(!n){be._Buffer_from=be._Buffer_allocUnsafe=null;return}be._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},be._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var Tl=fe((qB,Kb)=>{"use strict";Kb.exports=Be;var jt=xn(),bl,ji=jt.LongBits,Hb=jt.base64,jb=jt.utf8;function zo(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function _l(){}function dD(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function Be(){this.len=0,this.head=new zo(_l,0,0),this.tail=this.head,this.states=null}var qb=function(){return jt.Buffer?function(){return(Be.create=function(){return new bl})()}:function(){return new Be}};Be.create=qb();Be.alloc=function(e){return new jt.Array(e)};jt.Array!==Array&&(Be.alloc=jt.pool(Be.alloc,jt.Array.prototype.subarray));Be.prototype._push=function(e,r,t){return this.tail=this.tail.next=new zo(e,r,t),this.len+=r,this};function wl(n,e,r){e[r]=n&255}function pD(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function vl(n,e){this.len=n,this.next=void 0,this.val=e}vl.prototype=Object.create(zo.prototype);vl.prototype.fn=pD;Be.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new vl((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};Be.prototype.int32=function(e){return e<0?this._push(xl,10,ji.fromNumber(e)):this.uint32(e)};Be.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function xl(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}Be.prototype.uint64=function(e){var r=ji.from(e);return this._push(xl,r.length(),r)};Be.prototype.int64=Be.prototype.uint64;Be.prototype.sint64=function(e){var r=ji.from(e).zzEncode();return this._push(xl,r.length(),r)};Be.prototype.bool=function(e){return this._push(wl,1,e?1:0)};function yl(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}Be.prototype.fixed32=function(e){return this._push(yl,4,e>>>0)};Be.prototype.sfixed32=Be.prototype.fixed32;Be.prototype.fixed64=function(e){var r=ji.from(e);return this._push(yl,4,r.lo)._push(yl,4,r.hi)};Be.prototype.sfixed64=Be.prototype.fixed64;Be.prototype.float=function(e){return this._push(jt.float.writeFloatLE,4,e)};Be.prototype.double=function(e){return this._push(jt.float.writeDoubleLE,8,e)};var fD=jt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};Be.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(wl,1,0);if(jt.isString(e)){var t=Be.alloc(r=Hb.length(e));Hb.decode(e,t,0),e=t}return this.uint32(r)._push(fD,r,e)};Be.prototype.string=function(e){var r=jb.length(e);return r?this.uint32(r)._push(jb.write,r,e):this._push(wl,1,0)};Be.prototype.fork=function(){return this.states=new dD(this),this.head=this.tail=new zo(_l,0,0),this.len=0,this};Be.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new zo(_l,0,0),this.len=0),this};Be.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};Be.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};Be._configure=function(n){bl=n,Be.create=qb(),bl._configure()}});var Jb=fe((KB,Zb)=>{"use strict";Zb.exports=Wr;var Xb=Tl();(Wr.prototype=Object.create(Xb.prototype)).constructor=Wr;var Tn=xn();function Wr(){Xb.call(this)}Wr._configure=function(){Wr.alloc=Tn._Buffer_allocUnsafe,Wr.writeBytesBuffer=Tn.Buffer&&Tn.Buffer.prototype instanceof Uint8Array&&Tn.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};Wr.prototype.bytes=function(e){Tn.isString(e)&&(e=Tn._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(Wr.writeBytesBuffer,r,e),this};function hD(n,e,r){n.length<40?Tn.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}Wr.prototype.string=function(e){var r=Tn.Buffer.byteLength(e);return this.uint32(r),r&&this._push(hD,r,e),this};Wr._configure()});var $l=fe((XB,ry)=>{"use strict";ry.exports=lt;var rr=xn(),Sl,ey=rr.LongBits,mD=rr.utf8;function nr(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function lt(n){this.buf=n,this.pos=0,this.len=n.length}var Yb=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new lt(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new lt(e);throw Error("illegal buffer")},ty=function(){return rr.Buffer?function(r){return(lt.create=function(o){return rr.Buffer.isBuffer(o)?new Sl(o):Yb(o)})(r)}:Yb};lt.create=ty();lt.prototype._slice=rr.Array.prototype.subarray||rr.Array.prototype.slice;lt.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,nr(this,10);return e}}();lt.prototype.int32=function(){return this.uint32()|0};lt.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Il(){var n=new ey(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw nr(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw nr(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}lt.prototype.bool=function(){return this.uint32()!==0};function qi(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}lt.prototype.fixed32=function(){if(this.pos+4>this.len)throw nr(this,4);return qi(this.buf,this.pos+=4)};lt.prototype.sfixed32=function(){if(this.pos+4>this.len)throw nr(this,4);return qi(this.buf,this.pos+=4)|0};function Qb(){if(this.pos+8>this.len)throw nr(this,8);return new ey(qi(this.buf,this.pos+=4),qi(this.buf,this.pos+=4))}lt.prototype.float=function(){if(this.pos+4>this.len)throw nr(this,4);var e=rr.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};lt.prototype.double=function(){if(this.pos+8>this.len)throw nr(this,4);var e=rr.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};lt.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw nr(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=rr.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};lt.prototype.string=function(){var e=this.bytes();return mD.read(e,0,e.length)};lt.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw nr(this,e);this.pos+=e}else do if(this.pos>=this.len)throw nr(this);while(this.buf[this.pos++]&128);return this};lt.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};lt._configure=function(n){Sl=n,lt.create=ty(),Sl._configure();var e=rr.Long?"toLong":"toNumber";rr.merge(lt.prototype,{int64:function(){return Il.call(this)[e](!1)},uint64:function(){return Il.call(this)[e](!0)},sint64:function(){return Il.call(this).zzDecode()[e](!1)},fixed64:function(){return Qb.call(this)[e](!0)},sfixed64:function(){return Qb.call(this)[e](!1)}})}});var ay=fe((ZB,iy)=>{"use strict";iy.exports=Fn;var oy=$l();(Fn.prototype=Object.create(oy.prototype)).constructor=Fn;var ny=xn();function Fn(n){oy.call(this,n)}Fn._configure=function(){ny.Buffer&&(Fn.prototype._slice=ny.Buffer.prototype.slice)};Fn.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Fn._configure()});var uy=fe((JB,sy)=>{"use strict";sy.exports=Mo;var Al=xn();(Mo.prototype=Object.create(Al.EventEmitter.prototype)).constructor=Mo;function Mo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");Al.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}Mo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return Al.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,c){if(u)return a.emit("error",u,e),i(u);if(c===null){a.end(!0);return}if(!(c instanceof t))try{c=t[a.responseDelimited?"decodeDelimited":"decode"](c)}catch(f){return a.emit("error",f,e),i(f)}return a.emit("data",c,e),i(null,c)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};Mo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var cy=fe(ly=>{"use strict";var gD=ly;gD.Service=uy()});var py=fe((QB,dy)=>{"use strict";dy.exports={}});var my=fe(hy=>{"use strict";var Dt=hy;Dt.build="minimal";Dt.Writer=Tl();Dt.BufferWriter=Jb();Dt.Reader=$l();Dt.BufferReader=ay();Dt.util=xn();Dt.rpc=cy();Dt.roots=py();Dt.configure=fy;function fy(){Dt.util._configure(),Dt.Writer._configure(Dt.BufferWriter),Dt.Reader._configure(Dt.BufferReader)}fy()});var by=fe((tF,gy)=>{"use strict";gy.exports=my()});var uo=fe((rF,yy)=>{"use strict";var et=by(),oe=et.Reader,ct=et.Writer,L=et.util,E=et.roots.default||(et.roots.default={});E.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=L.Long?L.Long.fromBits(0,0,!1):0,e.prototype.s=L.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=L.emptyArray,e.prototype.ints=L.emptyArray,e.prototype.strings=L.emptyArray,e.prototype.tensors=L.emptyArray,e.prototype.graphs=L.emptyArray,e.prototype.sparseTensors=L.emptyArray,e.prototype.typeProtos=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&E.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&E.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)E.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)E.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&E.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)E.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&E.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)E.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=E.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=E.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=E.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=E.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(E.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(E.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(E.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(E.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!L.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!L.isInteger(t.i)&&!(t.i&&L.isInteger(t.i.low)&&L.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||L.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=E.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=E.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=E.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=E.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!L.isInteger(t.ints[i])&&!(t.ints[i]&&L.isInteger(t.ints[i].low)&&L.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||L.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=E.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=E.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=E.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=E.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof E.onnx.AttributeProto)return t;var o=new E.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(L.Long?(o.i=L.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new L.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?L.base64.decode(t.s,o.s=L.newBuffer(L.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=E.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=E.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=E.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=E.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)L.Long?(o.ints[i]=L.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new L.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?L.base64.decode(t.strings[i],o.strings[i]=L.newBuffer(L.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=E.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=E.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=E.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=E.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,L.Long){var a=new L.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=L.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?L.Long.prototype.toString.call(t.i):o.longs===Number?new L.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?L.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=E.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=E.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?L.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new L.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?L.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=E.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=E.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=E.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=E.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?E.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:E.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=E.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=E.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ct.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&E.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=E.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=E.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof E.onnx.ValueInfoProto)return t;var o=new E.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=E.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=E.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=L.emptyArray,e.prototype.output=L.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=L.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)E.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(E.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!L.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!L.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!L.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!L.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=E.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof E.onnx.NodeProto)return t;var o=new E.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=E.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=E.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=L.emptyArray,e.prototype.updateBinding=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&E.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&E.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)E.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)E.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=E.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=E.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(E.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(E.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=E.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=E.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=E.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=E.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof E.onnx.TrainingInfoProto)return t;var o=new E.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=E.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=E.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=E.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=E.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=E.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=E.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=E.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=E.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=L.Long?L.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=L.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=L.Long?L.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=L.emptyArray,e.prototype.trainingInfo=L.emptyArray,e.prototype.functions=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&E.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)E.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)E.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)E.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)E.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(E.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=E.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(E.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(E.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(E.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!L.isInteger(t.irVersion)&&!(t.irVersion&&L.isInteger(t.irVersion.low)&&L.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=E.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!L.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!L.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!L.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!L.isInteger(t.modelVersion)&&!(t.modelVersion&&L.isInteger(t.modelVersion.low)&&L.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=E.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=E.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=E.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=E.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof E.onnx.ModelProto)return t;var o=new E.onnx.ModelProto;if(t.irVersion!=null&&(L.Long?(o.irVersion=L.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new L.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=E.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(L.Long?(o.modelVersion=L.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new L.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=E.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=E.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=E.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=E.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(L.Long){var a=new L.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",L.Long){var a=new L.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?L.Long.prototype.toString.call(t.irVersion):o.longs===Number?new L.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?L.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new L.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=E.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=E.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=E.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=E.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=E.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ct.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!L.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!L.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof E.onnx.StringStringEntryProto)return t;var o=new E.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)E.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(E.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!L.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=E.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof E.onnx.TensorAnnotation)return t;var o=new E.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=E.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=E.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=L.emptyArray,e.prototype.name="",e.prototype.initializer=L.emptyArray,e.prototype.sparseInitializer=L.emptyArray,e.prototype.docString="",e.prototype.input=L.emptyArray,e.prototype.output=L.emptyArray,e.prototype.valueInfo=L.emptyArray,e.prototype.quantizationAnnotation=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)E.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)E.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)E.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)E.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)E.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)E.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)E.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(E.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(E.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(E.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(E.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(E.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(E.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(E.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=E.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=E.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=E.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=E.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=E.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=E.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=E.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof E.onnx.GraphProto)return t;var o=new E.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=E.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=E.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=E.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=E.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=E.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=E.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=E.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=E.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=E.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=E.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=E.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=E.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=E.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=E.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=L.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=L.emptyArray,e.prototype.int32Data=L.emptyArray,e.prototype.stringData=L.emptyArray,e.prototype.int64Data=L.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=L.newBuffer([]),e.prototype.externalData=L.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=L.emptyArray,e.prototype.uint64Data=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&E.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)E.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=E.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(E.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!L.isInteger(t.dims[o])&&!(t.dims[o]&&L.isInteger(t.dims[o].low)&&L.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!L.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=E.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!L.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||L.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!L.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&L.isInteger(t.int64Data[o].low)&&L.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||L.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=E.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!L.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&L.isInteger(t.uint64Data[o].low)&&L.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof E.onnx.TensorProto)return t;var o=new E.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)L.Long?(o.dims[i]=L.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new L.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=E.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?L.base64.decode(t.stringData[i],o.stringData[i]=L.newBuffer(L.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)L.Long?(o.int64Data[i]=L.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new L.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?L.base64.decode(t.rawData,o.rawData=L.newBuffer(L.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=E.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)L.Long?(o.uint64Data[i]=L.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new L.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=L.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?L.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new L.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=E.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?L.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?L.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new L.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?L.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?L.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new L.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=E.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?E.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:E.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=L.Long?L.Long.fromBits(0,0,!1):0,r.prototype.end=L.Long?L.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=ct.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof oe||(o=oe.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new E.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof oe||(o=new oe(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!L.isInteger(o.begin)&&!(o.begin&&L.isInteger(o.begin.low)&&L.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!L.isInteger(o.end)&&!(o.end&&L.isInteger(o.end.low)&&L.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof E.onnx.TensorProto.Segment)return o;var i=new E.onnx.TensorProto.Segment;return o.begin!=null&&(L.Long?(i.begin=L.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new L.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(L.Long?(i.end=L.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new L.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(L.Long){var s=new L.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(L.Long){var s=new L.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?L.Long.prototype.toString.call(o.begin):i.longs===Number?new L.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?L.Long.prototype.toString.call(o.end):i.longs===Number?new L.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&E.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&E.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=E.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=E.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=E.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=E.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!L.isInteger(t.dims[i])&&!(t.dims[i]&&L.isInteger(t.dims[i].low)&&L.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof E.onnx.SparseTensorProto)return t;var o=new E.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=E.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=E.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)L.Long?(o.dims[i]=L.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new L.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=E.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=E.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?L.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new L.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=L.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)E.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push(E.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=E.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof E.onnx.TensorShapeProto)return t;var o=new E.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=E.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=E.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:L.oneOfGetter(t=["dimValue","dimParam"]),set:L.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=ct.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TensorShapeProto.Dimension;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(c&7);break}}return u},r.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!L.isInteger(i.dimValue)&&!(i.dimValue&&L.isInteger(i.dimValue.low)&&L.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!L.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!L.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof E.onnx.TensorShapeProto.Dimension)return i;var a=new E.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(L.Long?(a.dimValue=L.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new L.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?L.Long.prototype.toString.call(i.dimValue):a.longs===Number?new L.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:L.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:L.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=ct.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&E.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&E.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&E.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&E.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&E.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof oe||(o=oe.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new E.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=E.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=E.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=E.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=E.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=E.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof oe||(o=new oe(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=E.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=E.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=E.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=E.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=E.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!L.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof E.onnx.TypeProto)return o;var i=new E.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=E.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=E.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=E.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=E.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=E.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=E.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=E.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=E.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=E.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=E.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=ct.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&E.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TypeProto.Tensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=E.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!L.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=E.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof E.onnx.TypeProto.Tensor)return i;var a=new E.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=E.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=E.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=ct.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&E.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TypeProto.Sequence;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=E.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=E.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof E.onnx.TypeProto.Sequence)return i;var a=new E.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=E.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=E.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=ct.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&E.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TypeProto.Map;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=E.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!L.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=E.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof E.onnx.TypeProto.Map)return i;var a=new E.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=E.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=E.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=ct.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&E.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TypeProto.Optional;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=E.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=E.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof E.onnx.TypeProto.Optional)return i;var a=new E.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=E.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=E.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=ct.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&E.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof oe||(i=oe.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new E.onnx.TypeProto.SparseTensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=E.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof oe||(i=new oe(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!L.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=E.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof E.onnx.TypeProto.SparseTensor)return i;var a=new E.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=E.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=E.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=L.Long?L.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ct.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!L.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!L.isInteger(t.version)&&!(t.version&&L.isInteger(t.version.low)&&L.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof E.onnx.OperatorSetIdProto)return t;var o=new E.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(L.Long?(o.version=L.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new L.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",L.Long){var a=new L.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?L.Long.prototype.toString.call(t.version):o.longs===Number?new L.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=L.emptyArray,e.prototype.output=L.emptyArray,e.prototype.attribute=L.emptyArray,e.prototype.attributeProto=L.emptyArray,e.prototype.node=L.emptyArray,e.prototype.docString="",e.prototype.opsetImport=L.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ct.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)E.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)E.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)E.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof oe||(t=oe.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new E.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(E.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(E.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(E.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof oe||(t=new oe(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!L.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!L.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!L.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!L.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=E.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=E.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!L.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=E.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!L.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof E.onnx.FunctionProto)return t;var o=new E.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=E.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=E.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=E.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=E.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=E.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=E.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,et.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();yy.exports=E});function lo(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Fo(n){return new TextDecoder().decode(n)}var tt,Vn,Ol,$t,Ki,Tt,kt,pe,Bo,Gn,Un,Wn,He=U(()=>{"use strict";Zs();tt=Oe(uo());Hn();Vn=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},Ol=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},$t=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=Ol.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],f=i-u<0?1:r[i-u];if(c!==f&&c>1&&f>1)return;s[a-u]=Math.max(c,f)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!pe.areEqual(a,e.dims))return;let s=pe.size(a),u=o?e:new ft(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let c=new Array(a.length),f=new Array(e.dims.length),m=new Array(r.dims.length),b=0,_=0,v=!1,x=!1;e.dims.length===0&&(b=e.get([]),v=!0),r.dims.length===0&&(_=r.get([]),x=!0);let O;for(let I=0;I<s;I++){O=I;for(let S=a.length-1;S>=0;S--)c[S]=O%a[S],O=Math.floor(O/a[S]);v||(n.fillIndex(c,e.dims,f),b=e.get(f)),x||(n.fillIndex(c,r.dims,m),_=r.get(m)),u.set(c,t(b,_))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Ki=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!$t.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Tt=class n{static tensorDataTypeFromProto(e){switch(e){case tt.onnx.TensorProto.DataType.INT8:return"int8";case tt.onnx.TensorProto.DataType.UINT8:return"uint8";case tt.onnx.TensorProto.DataType.BOOL:return"bool";case tt.onnx.TensorProto.DataType.INT16:return"int16";case tt.onnx.TensorProto.DataType.UINT16:return"uint16";case tt.onnx.TensorProto.DataType.INT32:return"int32";case tt.onnx.TensorProto.DataType.UINT32:return"uint32";case tt.onnx.TensorProto.DataType.FLOAT:return"float32";case tt.onnx.TensorProto.DataType.DOUBLE:return"float64";case tt.onnx.TensorProto.DataType.STRING:return"string";case tt.onnx.TensorProto.DataType.INT64:return"int32";case tt.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${tt.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return tt.onnx.TensorProto.DataType.INT8;case"uint8":return tt.onnx.TensorProto.DataType.UINT8;case"bool":return tt.onnx.TensorProto.DataType.BOOL;case"int16":return tt.onnx.TensorProto.DataType.INT16;case"uint16":return tt.onnx.TensorProto.DataType.UINT16;case"int32":return tt.onnx.TensorProto.DataType.INT32;case"uint32":return tt.onnx.TensorProto.DataType.UINT32;case"float32":return tt.onnx.TensorProto.DataType.FLOAT;case"float64":return tt.onnx.TensorProto.DataType.DOUBLE;case"string":return tt.onnx.TensorProto.DataType.STRING;case"int64":return tt.onnx.TensorProto.DataType.INT64;case"uint64":return tt.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>_n.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(kt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},kt=class{static longToNumber(e){return _n.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return _n.isLong(e)||typeof e=="bigint"}},pe=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},Bo=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},Gn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(m+1)/2:m/2),i[s]=m-i[a],Math.floor((e+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},Un=-34028234663852886e22,Wn=34028234663852886e22});function bD(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function _y(n){switch(n){case De.onnx.TensorProto.DataType.UINT8:case De.onnx.TensorProto.DataType.INT8:case De.onnx.TensorProto.DataType.BOOL:return 1;case De.onnx.TensorProto.DataType.UINT16:case De.onnx.TensorProto.DataType.INT16:return 2;case De.onnx.TensorProto.DataType.FLOAT:case De.onnx.TensorProto.DataType.INT32:case De.onnx.TensorProto.DataType.UINT32:return 4;case De.onnx.TensorProto.DataType.INT64:case De.onnx.TensorProto.DataType.DOUBLE:case De.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${De.onnx.TensorProto.DataType[n]}`)}}function yD(n,e){return new(xy(e))(n)}function xy(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Pl(n,e){if(e===De.onnx.TensorProto.DataType.INT64||e===No.TensorDataType.INT64){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===De.onnx.TensorProto.DataType.UINT32||e===No.TensorDataType.UINT32||e===De.onnx.TensorProto.DataType.UINT64||e===No.TensorDataType.UINT64){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${De.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function wy(n,e,r){switch(e){case De.onnx.TensorProto.DataType.BOOL:case De.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case De.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case De.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case De.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case De.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case De.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case De.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case De.onnx.TensorProto.DataType.INT64:return Pl(_n.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case De.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case De.onnx.TensorProto.DataType.UINT64:return Pl(_n.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${De.onnx.TensorProto.DataType[e]}`)}}var vy,De,ft,Hn=U(()=>{"use strict";vy=Oe(Mg());Zs();Lo();De=Oe(uo());He();ft=class n{constructor(e,r,t,o,i,a=vy.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=pe.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(c=>typeof c=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let c=xy(r);if(!(i instanceof c))throw new TypeError(`cache should be type ${c.name}`)}if(u){let c=new ArrayBuffer(s*bD(r));this.cache=yD(c,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[pe.indicesToOffset(e,this.strides)]}set(e,r){this.data[pe.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=pe.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=Tt.tensorDataTypeFromProto(e.dataType),t=Tt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Fo(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=_y(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let f=wy(a,e.dataType,c*s);i[c]=f}}else{let i;switch(e.dataType){case De.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case De.onnx.TensorProto.DataType.INT32:case De.onnx.TensorProto.DataType.INT16:case De.onnx.TensorProto.DataType.UINT16:case De.onnx.TensorProto.DataType.INT8:case De.onnx.TensorProto.DataType.UINT8:case De.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case De.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case De.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case De.onnx.TensorProto.DataType.UINT32:case De.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];_n.isLong(u)?a[s]=Pl(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=Tt.tensorDimsFromORTFormat(e),t=Tt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=_y(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let f=wy(a,e.dataType(),c*s);i[c]=f}}return o}}});function ye(n){return n===1?_D:wD}function Ty(n){let e=ye(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Iy(n){let e=ye(n);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function Sy(n,e){let r=ye(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var _D,wD,ot=U(()=>{"use strict";_D={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},wD={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Le=U(()=>{"use strict"});async function El(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Xi(n){return lo(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function $y(n){return lo(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function co(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function po(n,e){return e.map(r=>n[r]).join(", ")}function At(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function or(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Hr=U(()=>{"use strict";He()});function vD(n,e){return or(e).map(r=>`${n}.${r}`)}function fo(n,e){return e===1?[n]:vD(n,e)}function jr(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var jn=U(()=>{"use strict";Hr()});function TD(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function ID(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function SD(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var Ay,xD,Oy,Py=U(()=>{"use strict";ot();Le();Hr();jn();Ay={name:"pack",inputNames:["A"],inputTypes:[1]},xD=(n,e)=>{let r=ye(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=At(i),s=fo("rc",i),u=SD(i,s,t[t.length-2],t[t.length-1]),c;o===0?c=[1,1]:o===1?c=[t[0],1]:c=[t[i-1],t[i-2]];let f=TD(i,c,s),m=ID(t,s),b=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${f}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${m});
          }
        }
      `;return{...Ay,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:b}},Oy=(n,e)=>({...Ay,get:()=>xD(n,e)})});function Cl(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function Cy(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function OD(n){let e=pe.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function PD(n){let e=pe.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var $D,AD,Ey,Dy=U(()=>{"use strict";He();ot();Le();jn();$D=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),AD=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let c=0;c<4;c++){let f="";switch(c){case 0:f="outputCoords = rc;";break;case 1:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:f="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${f}
        ${c>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${c}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${c>0?"}":""}
      `}let s=ye(n.session.backend.glContext.version),u=`
      ${OD(o)}
      ${PD(i)}
      ${jr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Ey=(n,e,r)=>{let t=$D(r);return{...t,get:()=>AD(n,e,t,r)}}});var Dl,ky=U(()=>{"use strict";ot();Le();Dl=(n,e)=>{let r=e.shape,t=ye(n.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function CD(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Ny,ED,Ly,Ry=U(()=>{"use strict";ot();Le();Hr();jn();Ny={name:"unpack",inputNames:["A"],inputTypes:[2]},ED=(n,e)=>{let r=e.dims.length,t=fo("rc",r),o=t.slice(-2),i=At(r),a=jr(),u=e.dims.length===0?"":CD(r,t),c=r<=1?"rc":`vec2(${o.join(",")})`,f=ye(n.session.backend.glContext.version),m=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${f.output} = vec4(getChannel(packedInput, ${c}), 0, 0, 0);
     }
   `;return{...Ny,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:m}},Ly=(n,e)=>({...Ny,get:()=>ED(n,e)})});var Zi,Vo,Ji,Go=U(()=>{"use strict";Vt();Zi=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(qe.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(qe.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Vo=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(qe.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Ji=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Uo,zy,kl,My=U(()=>{"use strict";He();Le();Uo=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,c)=>c===e.length-1?u*4:u):void 0;return kl(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},zy=(n,e,r)=>{let t=Uo(n,e,r);return[t.width,t.height]},kl=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,c=e.slice(0);if(u===0&&(c=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(c[u-1]=Math.ceil(c[u-1]/2)),u>1&&(c[u-2]=Math.ceil(c[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:c,strides:pe.computeStrides(c),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var kD,Yi,Fy=U(()=>{"use strict";Vt();Hn();He();Py();Dy();ky();Ry();Go();My();Le();kD=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Yi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return zy(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let c=0;c<e.inputNames.length;++c)t[c]=this.getOrCreateTextureData(r[c],e.inputTypes[c]);let o=kD(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Uo(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Uo(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],c=Uo(this.session.layoutStrategy,u,r),f=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let m=s[0],b=s[1]*s[2]*s[3],_=Math.ceil(b*1/4)*4,v=m*_;f=new Float32Array(v);for(let x=0;x<m;++x){let O=x*b,I=x*_+x%1*b;f.set(e.numberData.subarray(O,O+b),I)}}return this.createTextureData(c,e.type,f,e,1)}}if(r===2){let i=kl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){qe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:pe.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(Cy(e.dims,r)){let c={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:pe.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(c,e.type,t.texture).tensor}let o=Cl(e.dims),i=Cl(r),a=this.reshapePacked(e,o),s=this.run(Ey(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new ft(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Dl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Dl(this,e))}pack(e){return this.executeProgram(Oy(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Ly(this,e.tensor),[e.tensor])}}});var Nl,Ee,wt=U(()=>{"use strict";Nl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ee=n=>new Nl(n)});var Vy,Gy,Uy,ND,LD,Wy=U(()=>{"use strict";wt();ot();Le();Vy={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Gy=(n,e,r)=>(LD(e),[n.run({...Vy,cacheHint:r.cacheKey,get:()=>ND(n,e,r)},e)]),Uy=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return Ee({epsilon:e,momentum:r,spatial:t})},ND=(n,e,r)=>{let t=ye(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Vy,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},LD=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Qi,qt,ie,Wo,ea,un=U(()=>{"use strict";Qi=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},qt=class{constructor(e){this.context=e}},ie=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},Wo=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},ea=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function zD(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function MD(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function BD(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function FD(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function VD(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function GD(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function UD(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function WD(){let n="and_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:n,type:0}}function HD(){let n="or_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:n,type:0}}function jD(){let n="xor_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:n,type:0}}function qD(){return XD("pow")}function KD(){let n="prelu_";return{body:`
  float ${n}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:n,type:0}}function XD(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var Kt,ZD,Hy,jy,qy,Ky,Xy,Zy,Jy,Yy,Qy,e_,t_,r_,n_=U(()=>{"use strict";He();un();ot();Le();Kt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>ZD(n,e,r,t)}},ZD=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!pe.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let f=$t.calcShape(e[0].dims,e[1].dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");a=f;let m=a.length,b=e[0].dims.length!==0?e[0].dims.length:1,_=e[1].dims.length!==0?e[1].dims.length:1,v=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",x=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",O=ye(n.session.backend.glContext.version),I=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${O.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${m}]) {
        int aindices[${b}];
        int bindices[${_}];
        ${v}
        ${x}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:I,hasMain:s}}let u=ye(n.session.backend.glContext.version),c=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:c,hasMain:!0}},Hy=(n,e)=>[n.run(Kt(n,e,zD()),e)],jy=(n,e)=>[n.run(Kt(n,e,WD(),"bool"),e)],qy=(n,e)=>[n.run(Kt(n,e,MD()),e)],Ky=(n,e)=>[n.run(Kt(n,e,VD(),"bool"),e)],Xy=(n,e)=>[n.run(Kt(n,e,GD(),"bool"),e)],Zy=(n,e)=>[n.run(Kt(n,e,UD(),"bool"),e)],Jy=(n,e)=>[n.run(Kt(n,e,BD()),e)],Yy=(n,e)=>[n.run(Kt(n,e,HD(),"bool"),e)],Qy=(n,e)=>[n.run(Kt(n,e,qD()),e)],e_=(n,e)=>[n.run(Kt(n,e,KD()),e)],t_=(n,e)=>[n.run(Kt(n,e,FD()),e)],r_=(n,e)=>[n.run(Kt(n,e,jD(),"bool"),e)]});var o_,i_,YD,a_=U(()=>{"use strict";He();o_=(n,e,r)=>(YD(e),[n.cast(e[0],r)]),i_=n=>Tt.tensorDataTypeFromProto(n.attributes.getInt("to")),YD=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var QD,ek,s_,ta,u_=U(()=>{"use strict";ot();Le();Hr();jn();QD=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),ek=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let N=1;N<r.length;N++){let R=r[N].dims.slice();for(let H=0;H<o.length;H++)if(H===t)i[t]+=R[H];else if(o[H]!==R[H])throw new Error("non concat dimensions must match")}let a=i.length,s=fo("coords",a),u=At(a),c=jr(),f=r.map(N=>N.dims),m=or(a),b=new Array(f.length-1);b[0]=f[0][t];for(let N=1;N<b.length;N++)b[N]=b[N-1]+f[N][t];let _=m[t],v=m.slice(-2),x=m.join(),O=`if (${_} < ${b[0]}) {
        return getChannel(
            getX0(${x}), vec2(${v.join()}));
        }`;for(let N=1;N<b.length;N++){let R=b[N-1];O+=`
            if (${_} < ${b[N]}  && ${_} >= ${b[N-1]}) {
              return getChannel(
                getX${N}(${ta(m,_,R)}),
                vec2(${ta(v,_,R)}));
            }`}let I=b.length,S=b[b.length-1];O+=`
            return getChannel(
              getX${I}(${ta(m,_,S)}),
              vec2(${ta(v,_,S)}));`;let C=ye(n.session.backend.glContext.version),D=`
          ${c}
          float getValue(${m.map(N=>"int "+N)}) {
            ${O}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${m[a-1]};
            coords.${m[a-1]} = coords.${m[a-2]};
            coords.${m[a-2]} = lastDim;

            vec4 result = vec4(getValue(${s}), 0., 0., 0.);

            ${s[a-1]} = ${s[a-1]} + 1;
            if (${s[a-1]} < ${i[a-1]}) {
              result.g = getValue(${s});
            }

            ${s[a-2]} = ${s[a-2]} + 1;
            if (${s[a-2]} < ${i[a-2]}) {
              result.a = getValue(${s});
            }

            ${s[a-1]} = ${s[a-1]} - 1;
            if (${s[a-2]} < ${i[a-2]} &&
                ${s[a-1]} < ${i[a-1]}) {
              result.b = getValue(${s});
            }
            ${C.output} = result;
          }
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:D,hasMain:!0}},s_=(n,e,r)=>{let t=QD(e.length,r.cacheKey);return{...t,get:()=>ek(n,t,e,r.axis)}},ta=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var l_,tk,rk,nk,c_,ok,ik,ak,d_,sk,p_=U(()=>{"use strict";wt();Le();u_();l_=(n,e,r)=>(sk(e),n.session.pack&&e[0].dims.length>1?[n.run(s_(n,e,r),e)]:[n.run(nk(n,e,r),e)]),tk=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),rk=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let _=1;_<r.length;_++){let v=r[_].dims.slice();for(let x=0;x<o.length;x++)if(x===t)i[t]+=v[x];else if(o[x]!==v[x])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let _=0;_<s.length;++_)u+=r[_].dims[t],s[_]=u;let c="";r.length<5?c=c_(s):c=ok(s);let f=ik(r.length,a),m=ak(s),b=`
        ${f}
        ${m}
        ${c}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:b}},nk=(n,e,r)=>{let t=tk(e.length,r.cacheKey);return{...t,get:()=>rk(n,t,e,r.axis)}},c_=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,ok=n=>c_(n),ik=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},ak=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},d_=n=>Ee({axis:n.attributes.getInt("axis")}),sk=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function uk(){return Xt("abs")}function lk(){return Xt("acos")}function ck(){return Xt("asin")}function dk(){return Xt("atan")}function pk(){return Xt("ceil")}function fk(){return Xt("cos")}function hk(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function mk(){return Xt("exp")}function gk(){return Xt("floor")}function Ll(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function bk(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function yk(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function _k(){return Xt("log")}function wk(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function vk(){let n="not";return{body:`
  float ${n}_(float a) {
    return float( ! bool(a) );
  }
  bool ${n}_(bool a) {
    return !a;
  }
  vec4 ${n}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${n}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:n,type:0}}function xk(){return Xt("sin")}function Rl(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function zl(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function Tk(){return Xt("sqrt")}function Ik(){return Xt("tan")}function Sk(){let n="tanh";return{body:`
  float ${n}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${n}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:n,type:0}}function Xt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var $k,dt,f_,h_,m_,g_,Ml,b_,y_,Ak,__,w_,v_,x_,T_,I_,Bl,S_,$_,A_,O_,P_,E_,C_,D_,k_,N_,L_,Fl=U(()=>{"use strict";wt();He();un();ot();Le();$k=(n,e,r,t)=>{let o=n.session.pack?2:0,i=ye(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},dt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>$k(n,i,e,r)}},f_=(n,e)=>[n.run(dt(n,e[0],uk()),e)],h_=(n,e)=>[n.run(dt(n,e[0],lk()),e)],m_=(n,e)=>[n.run(dt(n,e[0],ck()),e)],g_=(n,e)=>[n.run(dt(n,e[0],dk()),e)],Ml=(n,e,r)=>[n.run(dt(n,e[0],Ll(r.min,r.max),r.cacheKey),e)],b_=n=>Ee({min:n.attributes.getFloat("min",Un),max:n.attributes.getFloat("max",Wn)}),y_=(n,e)=>{let r=Ak(n,e);return Ml(n,[e[0]],r)},Ak=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:Un,t=e.length>=3?e[2].numberData[0]:Wn;return Ee({min:r,max:t})},__=(n,e)=>[n.run(dt(n,e[0],pk()),e)],w_=(n,e)=>[n.run(dt(n,e[0],fk()),e)],v_=(n,e,r)=>[n.run(dt(n,e[0],hk(r.alpha),r.cacheKey),e)],x_=n=>Ee({alpha:n.attributes.getFloat("alpha",1)}),T_=(n,e)=>[n.run(dt(n,e[0],mk()),e)],I_=(n,e)=>[n.run(dt(n,e[0],gk()),e)],Bl=(n,e)=>[n.run(dt(n,e[0],bk()),e)],S_=(n,e,r)=>[n.run(dt(n,e[0],yk(r.alpha),r.cacheKey),e)],$_=n=>Ee({alpha:n.attributes.getFloat("alpha",.01)}),A_=(n,e)=>[n.run(dt(n,e[0],_k()),e)],O_=(n,e)=>[n.run(dt(n,e[0],wk()),e)],P_=(n,e)=>[n.run(dt(n,e[0],vk()),e)],E_=(n,e)=>[n.run(dt(n,e[0],Rl()),e)],C_=(n,e)=>[n.run(dt(n,e[0],zl()),e)],D_=(n,e)=>[n.run(dt(n,e[0],xk()),e)],k_=(n,e)=>[n.run(dt(n,e[0],Tk()),e)],N_=(n,e)=>[n.run(dt(n,e[0],Ik()),e)],L_=(n,e)=>[n.run(dt(n,e[0],Sk()),e)]});function qr(n){let e;switch(n.activation){case"Relu":e=Rl();break;case"Sigmoid":e=zl();break;case"Clip":e=Ll(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var ho,qn=U(()=>{"use strict";He();Fl();ho=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[Un,Wn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var Pk,Ek,R_,z_=U(()=>{"use strict";Vt();ot();Le();ra();qn();Pk=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),Ek=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;qe.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let c=mo(a,s,t.dilations,t.pads,t.strides),f=ye(n.session.backend.glContext.version),{activationFunction:m,applyActivation:b}=qr(t),_=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${m}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${a[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${a[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${b}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:_,hasMain:!0}},R_=(n,e,r)=>{let t=Pk(e.length>2,r.cacheKey);return{...t,get:()=>Ek(n,e,t,r)}}});var Ck,Dk,M_,B_=U(()=>{"use strict";ot();Le();jn();Ck=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),Dk=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,c=3,f=o.length,m=[s[1]*s[2]*s[3],o[2]*o[3]],b=s[2]*s[3],_=jr(),v=ye(n.session.backend.glContext.version),x="";for(let I=0;I<=1;I++)for(let S=0;S<=1;S++)x+=`
            blockIndex = rc.x + ${S};
            pos = rc.y + ${I};

            if(blockIndex < ${m[1]} && pos < ${m[0]}) {
              offsetY = int(blockIndex / (${o[f-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${b}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[f-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${b}), ${s[2]});

                if(d1 < ${a[c]} && d1 >= 0) {

                  ch = int(float(pos)/ ${b}.);
                    innerDims = vec2(d0, d1);
                    result[${I*2+S}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let O=`
      ${_}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${x}
          ${v.output} = result;
      }
            `;return{...e,output:{dims:m,type:r.type,textureType:2},shaderSource:O,hasMain:!0}},M_=(n,e,r,t,o)=>{let i=Ck(o.cacheKey);return{...i,get:()=>Dk(n,i,e,r,t,o)}}});function Nk(n,e,r){let t=e[0].dims,o=e[1].dims,i=$t.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=At(i.length),s=or(),{activationFunction:u,applyActivation:c}=qr(r),f=e.length>2,m=f?"value += getBiasForMatmul();":"",b=f?`${Gl(a,s,e[2].dims,i,!1)}`:"",_=i.length,v=t.length,x=o.length,O=t[t.length-1],I=`
    ${u}
    ${b}
    float process(int indices[${_}]) {
        int a[${v}];
        int b[${x}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${O}; ++k) {
            a[${v-1}] = k;
            b[${x-2}] = k;
            value += _A(a) * _B(b);
        }
        ${m}
        ${c}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:I}}function Vl(n,e){let r=kk(n.length>2,e.activationCacheKey);return{...r,get:()=>Nk(r,n,e)}}function Gl(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((x,O)=>`coords.${e[O+u]}`).join(", ");let f=$t.getBroadcastDims(r,t).map(x=>`coords.${e[x+u]} = 0;`).join(`
`),b=pe.size(r)===1,_="vec4(outputValue.xx, outputValue.yy)";return b&&(_="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${f}
  vec4 outputValue = getBias(${i});
  return ${_};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${f}
  return getBias(coords.x);
}`}var F_,V_,kk,Lk,na=U(()=>{"use strict";He();Le();Hr();qn();Ul();F_=(n,e,r)=>(Lk(e),n.session.pack?[n.run(oa(n,e,r),e)]:[n.run(Vl(e,r),e)]),V_=n=>ho(n.attributes),kk=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});Lk=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function Mk(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,c=s.length,f=t.length,m=f-u,b=f-c;o=a.map((C,D)=>`coords.${e[D+m]}`),o[u-1]="i*2",o.join(", "),i=s.map((C,D)=>`coords.${e[D+b]}`),i[c-2]="i*2",i.join(", ");let _=$t.getBroadcastDims(a,t),v=$t.getBroadcastDims(s,t),x=_.map(C=>`coords.${e[C+m]} = 0;`).join(`
`),O=v.map(C=>`coords.${e[C+b]} = 0;`).join(`
`),I=`int lastDim = coords.${e[f-1]};
  coords.${e[f-1]} = coords.${e[f-2]};
  coords.${e[f-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${I}
  ${x}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${I}
  ${O}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function Bk(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function Fk(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var Rk,zk,oa,Ul=U(()=>{"use strict";He();ot();Le();Hr();qn();na();Rk=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),zk=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=$t.calcShape(a,s,!0),c=!pe.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let f=a[a.length-1],m=Math.ceil(f/2),b=a.length,_=s.length,v=ye(n.session.backend.glContext.version),x=At(u.length),O=u.length,I=or(),{activationFunction:S,applyActivation:C}=qr(t),D=o?`${Gl(x,I,r[2].dims,u,!0)}`:"",N=c?`${Mk(x,I,r,u)}`:"",R=c?"getAAtOutCoordsMatmul(i)":`getA(${Bk(I,b)})`,H=c?"getBAtOutCoordsMatmul(i)":`getB(${Fk(I,_)})`,A=c?"":`${x} rc =
          getOutputCoords(); int lastDim = rc.${I[O-1]}; rc.${I[O-1]} =
          rc.${I[O-2]}; rc.${I[O-2]} = lastDim;
      `,X=`
            ${N}
            ${D}
            ${S}
            void main() {
              ${A}

              vec4 value = vec4(0);
              for (int i = 0; i < ${m}; i++) {
                vec4 a = ${R};
                vec4 b = ${H};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${C}
              ${v.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:X,hasMain:!0}},oa=(n,e,r)=>{let t=Rk(e.length>2,r.activationCacheKey);return{...t,get:()=>zk(n,t,e,r)}}});var G_,U_=U(()=>{"use strict";ra();B_();Ul();G_=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=mo(t,o,r.dilations,r.pads,r.strides),a=n.run(M_(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],c=n.run(oa(n,u,r),u);return n.reshapePacked(c,i)}});var Vk,Gk,W_,Wl,Hl=U(()=>{"use strict";Le();Vk=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),Gk=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,c=Wl(a,s,o,4),f=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${a.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:c,type:r.type,textureType:4},shaderSource:f}},W_=(n,e,r,t,o)=>{let i=Vk(o.cacheKey);return{...i,get:()=>Gk(n,i,e,r,t,o)}},Wl=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var Uk,Wk,H_,j_=U(()=>{"use strict";He();ot();Le();qn();Hl();Uk=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),Wk=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Wl(i,a,t),[c,f]=n.calculateTextureWidthAndHeight(s,4),m=pe.computeStrides(u),[b,_]=n.calculateTextureWidthAndHeight(u,4),v=t.length,x=r.length<3?"0.0":"_B(b)",O=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:I,applyActivation:S}=qr(o),C=ye(n.session.backend.glContext.version),D=`
${I}
float process(int indices[${v}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${m[0]} + im2col[1] * ${m[1]} + im2col[2] * ${m[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${x};
  for (int i = 0; i < ${O}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${b}, ${_});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${c}, ${f});
    value += dot(${C.texture2D}(Im2Col, im2colCoords), ${C.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${S}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:D}},H_=(n,e,r,t)=>{let o=Uk(e.length>2,t);return{...o,get:()=>Wk(n,o,e,r,t)}}});var mo,jl,Hk,jk,qk,Kk,ql,Xk,ra=U(()=>{"use strict";wt();He();z_();U_();j_();qn();Hl();na();mo=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],f=e.slice(2).map((v,x)=>v+(v-1)*(r[x]-1)),b=a.map((v,x)=>v+t[x]+t[x+s]).map((v,x)=>Math.floor((v-f[x]+o[x])/o[x]));return[i,u].concat(...b)},jl=(n,e,r)=>(Xk(e,r),Hk(n,e,r)),Hk=(n,e,r)=>{let t=Kk(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(R_(n,e,t),e)]:i&&o?[jk(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[G_(n,e,t)]:[qk(n,e,t)]},jk=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=mo(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],c=n.run(Vl(u,r),u);return n.reshapeUnpacked(c,i)},qk=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=mo(t,o,r.dilations,r.pads,r.strides),a=n.run(W_(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(H_(n,e,i,r),s)},Kk=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();Gn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},ql=n=>{let e=n.attributes,r=ho(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return Ee({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},Xk=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var Zk,Jk,Yk,q_,Qk,eN,tN,rN,nN,oN,K_,iN,X_=U(()=>{"use strict";wt();ot();Le();qn();Zk=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,Jk=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},Yk=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,c=s.length===0;for(let f=0;f<u;++f){let m=c?n[f+2]*i[f]:s[f],b=Zk(n[f+2],i[f],o[f],e[f],r[f],m);Jk(b,t,o,f,f+u),c&&s.push(i[f]*(n[f+2]-1)+a[f]+(e[f]-1)*r[f]+1-o[f]-o[f+u])}},q_=(n,e,r)=>(iN(e,r),Qk(n,e,r)),Qk=(n,e,r)=>{let t=oN(r,e);return[nN(n,e,t)]},eN=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),tN=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],c=s[0]/t.group,f=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],m=ye(n.session.backend.glContext.version),{activationFunction:b,applyActivation:_}=qr(t),v=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${b}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${c}; inChannelOffset++) {
      int input_channel = group_id * ${c} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${a[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${a[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${_}
    ${m.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:f,type:e[0].type,textureType:0},shaderSource:v,hasMain:!0}},rN=(n,e,r)=>{let t=eN(e.length>2,r.cacheKey);return{...t,get:()=>tN(n,e,t,r)}},nN=(n,e,r)=>n.run(rN(n,e,r),e),oN=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;Yk(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},K_=n=>{let e=n.attributes,r=ho(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),c=e.getInts("pads",[0,0,0,0]),f=e.getInts("strides",[1,1]);return Ee({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:c,strides:f,...r})},iN=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Z_,Kn,J_,aN,Y_,sN,uN,lN,ia=U(()=>{"use strict";wt();He();Le();Z_={name:"Transpose",inputNames:["A"],inputTypes:[0]},Kn=(n,e,r)=>(lN(e),[n.run({...Z_,cacheHint:r.cacheKey,get:()=>aN(n,e[0],r.perm)},e)]),J_=n=>Ee({perm:n.attributes.getInts("perm",[])}),aN=(n,e,r)=>{let t=e.dims;r=Y_(t,r);let o=sN(t,r),i=t.length,a=`
      ${uN("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Z_,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Y_=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),sN=(n,e)=>(e=Y_(n,e),pe.sortBasedOnPerm(n,e)),uN=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},lN=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Q_,e0,cN,t0=U(()=>{"use strict";ia();Q_=(n,e,r)=>{cN(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[c]=Kn(n,[s],u),f=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(c,f)]},e0=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},cN=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var r0,n0,dN,o0=U(()=>{"use strict";He();r0=(n,e,r)=>{dN(e,r);let t=pe.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},n0=n=>n.attributes.getInt("axis",1),dN=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var In,Ho=U(()=>{"use strict";In=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var i0,a0,pN,fN,hN,mN,s0=U(()=>{"use strict";wt();Ho();He();Le();i0=(n,e,r)=>(mN(e,r.axis),[n.run(hN(n,e,r),e)]),a0=n=>Ee({axis:n.attributes.getInt("axis",0)}),pN={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},fN=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=pe.normalizeAxis(t,o.length);let s=[];for(let b=0;b<a.length;b++)b<t?(a[b]=o[b],s.push(`inputIdx[${b}] = outputIdx[${b}];`)):b<t+i.length?(a[b]=i[b-t],s.push(`indexDataIdx[${b-t}] = outputIdx[${b}];`)):(a[b]=o[b-i.length+1],s.push(`inputIdx[${b-i.length+1}] = outputIdx[${b}];`));let u=a.length||1,c=o.length,f=i.length||1,m=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${c}];
        int indexDataIdx[${f}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:m}},hN=(n,e,r)=>{let t={...pN,cacheHint:r.cacheKey};return{...t,get:()=>fN(n,t,e,r.axis)}},mN=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(In.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var Kl,u0,l0,c0,gN,bN,yN,d0=U(()=>{"use strict";wt();He();Le();Kl=(n,e,r)=>(yN(e,r),[n.run(gN(e,r),e)]),u0=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return Ee({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},l0=n=>u0(n,!1),c0=n=>u0(n,!0),gN=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>bN(r,n,e)}},bN=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Ki.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],c="";r.transA&&(u=t[0]),r.transA&&r.transB?c="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?c="value += _A_T(a) * _B(b);":!r.transA&&r.transB?c="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(c="value += _A(a) * _B(b);");let f=s.length,m=e.length===3?`int c[${e[2].dims.length}];`:"",b=e.length===3?"bcastIndices_C(indices, c);":"",_=e.length===3?"value += beta * _C(c);":"",v=`
      float process(int indices[${f}]) {
          int a[${f}];
          int b[${f}];
          ${m}

          copyVec(indices, a);
          copyVec(indices, b);
          ${b}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${f-1}] = k;
              b[${f-2}] = k;
              ${c}
          }

          value = value * alpha;
          ${_}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:v}},yN=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var p0,f0,_N,wN,vN,xN,TN,h0=U(()=>{"use strict";wt();Le();p0=(n,e,r)=>(TN(e),[n.run(vN(n,e,r),e)]),f0=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return Ee({scale:e,bias:r})},_N={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},wN=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${xN(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},vN=(n,e,r)=>{let t={..._N,cacheHint:r.cacheKey};return{...t,get:()=>wN(n,t,e,r)}},xN=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},TN=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var g0,b0,m0,IN,SN,$N,AN,ON,PN,y0=U(()=>{"use strict";ot();Le();g0=(n,e,r)=>{PN(e);let t=n.run(SN(e[0]),e);return[n.run(ON(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},b0=n=>n.attributes.getFloat("epsilon",1e-5),m0={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},IN=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},SN=n=>({...m0,get:()=>IN(m0,n)}),$N={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},AN=(n,e,r,t,o)=>{let i=ye(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,c]=[a/4,s],f=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${c});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:f}},ON=(n,e,r,t)=>{let o={...$N,cacheHint:`${r}`};return{...o,get:()=>AN(n,o,e,r,t)}},PN=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function EN(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,c=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${r}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...v0,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:c}}function CN(n,e){return{...v0,cacheHint:e.cacheKey,get:()=>EN(n,e)}}var _0,w0,v0,DN,x0=U(()=>{"use strict";wt();Le();_0=(n,e,r)=>(DN(e),[n.run(CN(e,r),e)]),w0=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return Ee({alpha:e,beta:r,bias:t,size:o})},v0={name:"LRN",inputNames:["X"],inputTypes:[0]};DN=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var kN,Xl,T0,I0,S0,NN,LN,RN,zN,MN,BN,FN,VN,$0=U(()=>{"use strict";wt();He();ot();Le();kN={name:"Pad",inputNames:["A"],inputTypes:[0]},Xl=(n,e,r)=>(RN(e),[n.run({...kN,cacheHint:r.cacheKey,get:()=>LN(n,e[0],r)},e)]),T0=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return Ee({mode:e,value:r,pads:t})},I0=(n,e,r)=>{zN(e);let t=NN(n,e,r);return Xl(n,[e[0]],t)},S0=n=>n.attributes.getString("mode","constant"),NN=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return Ee({mode:r,pads:t,value:o})},LN=(n,e,r)=>{let t=pe.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${MN(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},RN=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},zN=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},MN=(n,e,r)=>{let t=ye(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=pe.computeStrides(e.dims);switch(r.mode){case"constant":return BN(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return FN(t,e.dims,a,o,i,r.pads);case"edge":return VN(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},BN=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let c=s-1;c>=0;--c)u+=`
        k = m[${c}] - ${i[c]};
        if (k < 0)  return constant;
        if (k >= ${e[c]}) return constant;
        offset += k * ${r[c]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},FN=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},VN=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${r[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `}});var O0,P0,E0,C0,D0,k0,N0,L0,R0,GN,A0,z0,sa,M0,aa,UN,B0=U(()=>{"use strict";wt();He();Le();O0=(n,e,r)=>{sa(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>E0(e,t,!1,r)},e)]},P0=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Ee({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},E0=(n,e,r,t)=>{let[o,i]=R0(n,t,r),a=pe.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let f=`
        ${M0(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:f}},C0=(n,e,r)=>{sa(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>E0(e,t,!0,r)},e)]},D0=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return Ee({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},k0=(n,e,r)=>{sa(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>L0(e,t,!1,r)},e)]},N0=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Ee({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},L0=(n,e,r,t)=>{let[o,i]=R0(n,t,r),c=`
      ${M0(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},R0=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Gn.adjustPoolAttributes(r,t,i,a,s,u);let c=Gn.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),f=Object.assign({},e);return o?Object.assign(f,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[f,c]},GN={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},A0={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},z0=(n,e)=>(sa(e),[n.run({...A0,get:()=>L0(e,A0,!0,GN)},e)]),sa=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},M0=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],f=n[i-1],m="",b="",_="";if(u+c!==0?m=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${f}) {
              pad++;
              continue;
            }
            ${r}
          }`:m=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let x=e.kernelShape[e.kernelShape.length-2],O=e.strides[e.strides.length-2],I=e.pads[e.pads.length/2-2],S=e.pads[e.pads.length-2],C=n[i-2];I+S!==0?b=`
            for (int j = 0; j < ${x}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${O} - ${I} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${C}) {
                pad+= ${a};
                continue;
              }
          `:b=`
            for (int j = 0; j < ${x}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${O} - ${I} + j;
            `,_=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${b}
          ${m}
          ${_}
          ${t}
          return value;
        }
      `}else{let a=pe.size(e.kernelShape),s=pe.computeStrides(e.kernelShape),u=s.length,c=e.pads.length,f=UN(u),m=aa(n,"inputDims"),b=aa(e.pads,"pads"),_=aa(s,"kernelStrides"),v=aa(e.strides,"strides"),x=e.pads.reduce((S,C)=>S+C),O="";return x?O=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:O=`
          }
          ${r}
        `,`
        ${f}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${c}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${b}
          ${m}
          ${v}
          ${_}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${O}
          }
          ${t}

          return value;
        }
      `}},aa=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},UN=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var Xn,Sn,WN,HN,F0,V0,G0,U0,W0,H0,j0,q0=U(()=>{"use strict";wt();Ho();He();Le();Xn=(n,e,r,t,o)=>{HN(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>WN(n,e,r,t,o,i)},e)]},Sn=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return Ee({axes:e,keepDims:r})},WN=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],c=pe.normalizeAxes(r.axes,e[0].dims.length),f=o(e,c),m=f[1];for(let v=0;v<e[0].dims.length;v++)c.indexOf(v)>=0||c.length===0?(r.keepDims&&a.push(1),m=`
          for(int j${v} = 0; j${v} < ${e[0].dims[v]}; j${v}++) {
            inputIdx[${v}] = j${v};
            ${m}
          }`):(u.push(`inputIdx[${v}] = outputIdx[${a.length}];`),a.push(e[0].dims[v]));let _=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${f[0]}       // init ops for reduce max/min
        ${m}
        ${f[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:_}},HN=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(In.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},F0=(n,e,r)=>Xn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),V0=(n,e,r)=>Xn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),G0=(n,e,r)=>Xn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),U0=(n,e,r)=>Xn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),W0=(n,e,r)=>Xn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),H0=(n,e,r)=>Xn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),j0=(n,e,r)=>Xn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var K0,X0=U(()=>{"use strict";He();K0=(n,e)=>{let r=pe.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var Z0,Zl,J0,Y0,jo,jN,Jl,ua,Yl=U(()=>{"use strict";wt();ot();Le();Z0={name:"Upsample",inputNames:["X"],inputTypes:[0]},Zl=(n,e,r)=>(Jl(e,r),[n.run({...Z0,cacheHint:r.cacheKey,get:()=>jN(n,e,r)},e)]),J0=n=>jo(n,7),Y0=n=>jo(n,9),jo=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),ua(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,c=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(c)===-1)throw new Error(`nearest_mode '${c}' is not supported`);let f=n.attributes.getFloat("cubic_coeff_a",-.75),m=n.attributes.getInt("exclude_outside",0)!==0;if(m&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let b=e<11?!0:t==="nearest"&&a==="asymmetric"&&c==="floor",_=0,v=0,x=0;return e>10?n.inputs.length>2?(_=1,v=2,x=3):(v=1,x=2):e===9&&(v=1),Ee({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:c,cubicCoefficientA:f,excludeOutside:m,useNearest2xOptimization:b,roiInputIdx:_,scalesInputIdx:v,sizesInputIdx:x})},jN=(n,e,r)=>{let t=ye(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((x,O)=>Math.floor(x*r.scales[O])),[s,u]=n.calculateTextureWidthAndHeight(a,0),c=a.length,f=new Array(c),m=new Array(c),b=`
      int output_pitches[${c}];
      int input_pitches[${c}];
      `;for(let x=c-1;x>=0;x--)f[x]=x===c-1?1:f[x+1]*a[x+1],m[x]=x===c-1?1:m[x+1]*e[0].dims[x+1],b+=`
        output_pitches[${x}] = ${f[x]};
        input_pitches[${x}] = ${m[x]};
        `;let _=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,v=r.mode==="nearest"?`
    ${_}
    float process(int indices[${c}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${b}

      int d, m;
      for (int dim = 0; dim < ${c}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:c===4?`
    ${_}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${b}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${_}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${b}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...Z0,output:{dims:a,type:e[0].type,textureType:0},shaderSource:v,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(x=>Math.ceil(x))}]}},Jl=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},ua=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Ql,ec,Q0,ew,qN,KN,XN,ZN,tw=U(()=>{"use strict";ot();Le();Hr();jn();Yl();Ql={name:"Resize",inputNames:["A"],inputTypes:[2]},ec=(n,e,r)=>(Jl(e,r),[n.run({...Ql,cacheHint:r.cacheKey,get:()=>qN(n,e,r)},e)]),Q0=n=>jo(n,10),ew=n=>jo(n,11),qN=(n,e,r)=>{let t=ye(n.session.backend.glContext.version),[o,i]=KN(e,r);if(o.every(C=>C===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Ql,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],c=i[s-1],f=e[0].dims;if(s!==f.length)throw new Error(`output dimension should match input ${f.length}, but got ${s}`);let m=f[s-2],b=f[s-1],_=o[s-2],v=o[s-1],x="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${c}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${c}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${c}.0 - 1.0, ${u}.0 - 1.0, ${c}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${b}.0 - 1.0, ${m}.0 - 1.0, ${b}.0 - 1.0,
                            ${m}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let O=At(s),I=jr(),S=`
            const vec2 inputWH = vec2(${m}.0, ${b}.0);
            const vec4 scaleWHWH = vec4(float(${_}), float(${v}), float(${_}), float(${v}));
            ${I}
            ${x}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${O} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${c-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...Ql,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:S}},KN=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=XN(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=ZN(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},XN=(n,e,r)=>{let t=Array.from(n.floatData);return ua(t,e,r),t},ZN=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return ua(i,r,t),i}});var rw,JN,nw=U(()=>{"use strict";Hn();rw=(n,e)=>(JN(e),[new ft([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),JN=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var tc,ow,iw,aw,YN,sw,QN,e4,uw=U(()=>{"use strict";wt();Ho();He();Le();tc={name:"Slice",inputNames:["A"],inputTypes:[0]},ow=(n,e,r)=>(YN(e),[n.run({...tc,cacheHint:r.cacheKey,get:()=>aw(n,e[0],r)},e)]),iw=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return Ee({starts:e,ends:r,axes:t})},aw=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((m,b)=>b):r.axes,o=pe.normalizeAxes(t,e.dims.length),i=r.starts.map((m,b)=>m>e.dims[o[b]]-1?e.dims[o[b]]:pe.normalizeAxis(m,e.dims[o[b]])),a=r.ends.map((m,b)=>m>e.dims[o[b]]-1?e.dims[o[b]]:pe.normalizeAxis(m,e.dims[o[b]])),s=e.dims.slice(),u=[];for(let m=0;m<o.length;m++)s[o[m]]=a[m]-i[m],i[m]>0&&u.push(`outputIdx[${o[m]}] += ${i[m]};`);let f=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...tc,output:{dims:s,type:e.type,textureType:0},shaderSource:f}},YN=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(In.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},sw=(n,e)=>{e4(e);let r=QN(n,e);return[n.run({...tc,cacheHint:r.cacheKey,get:()=>aw(n,e[0],r)},[e[0]])]},QN=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},e4=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var lw,cw,dw,pw,fw,hw,mw,gw,t4,r4,n4,bw,yw=U(()=>{"use strict";wt();He();ot();Le();ia();lw={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},cw={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},dw={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},pw=(n,e,r)=>{bw(e);let t=e[0].dims.slice(),o=pe.normalizeAxis(r.axis,t.length),i=pe.sizeToDimension(t,o),a=pe.sizeFromDimension(t,o);return gw(n,e,r,i,a)},fw=n=>Ee({axis:n.attributes.getInt("axis",1)}),hw=n=>Ee({axis:n.attributes.getInt("axis",-1)}),mw=(n,e,r)=>{bw(e);let t=e[0].dims.slice(),o=pe.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],c=[],f;a&&(u=Array.from({length:i}).map((v,x)=>x),u[o]=i-1,u[i-1]=o,u.map(v=>s.push(t[v])),f=Ee({perm:u}),c=Kn(n,e,f));let m=a?pe.sizeToDimension(s,i-1):pe.sizeToDimension(t,i-1),b=a?pe.sizeFromDimension(s,i-1):pe.sizeFromDimension(t,i-1),_=gw(n,a?c:e,r,m,b);return a?Kn(n,_,f):_},gw=(n,e,r,t,o)=>{let i=t4(n,e[0],t,o,[t]),a=n.run({...lw,cacheHint:r.cacheKey,get:()=>i},e),s=r4(n,e[0],t,o,i.output.dims,[t]),u=n.run({...cw,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),c=n4(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...dw,cacheHint:r.cacheKey,get:()=>c},[e[0],a,u])]},t4=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=ye(n.session.backend.glContext.version),c=`
      float process(int[${s}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${a} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...lw,output:{dims:o,type:e.type,textureType:0},shaderSource:c}},r4=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=ye(n.session.backend.glContext.version),f=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${c.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...cw,output:{dims:i,type:e.type,textureType:0},shaderSource:f}},n4=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${s});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...dw,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},bw=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var _w,ww,vw,o4,i4,a4,xw=U(()=>{"use strict";wt();He();Le();_w={name:"Split",inputNames:["A"],inputTypes:[0]},ww=(n,e,r)=>{a4(e);let t=pe.normalizeAxis(r.axis,e[0].dims.length),o=o4(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({..._w,cacheHint:`${r.cacheKey};${a}`,get:()=>i4(n,e[0],r,t,a)},e));return i},vw=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return Ee({axis:e,split:r,numOutputs:t})},o4=(n,e,r,t)=>{let[,o]=Bo.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},i4=(n,e,r,t,o)=>{let[i,a]=Bo.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],f=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{..._w,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:f}},a4=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var rc,Tw,Iw,s4,u4,Sw=U(()=>{"use strict";He();rc=(n,e,r)=>{s4(e);let t=pe.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Tw=(n,e)=>(u4(e),rc(n,[e[0]],Array.from(e[1].integerData))),Iw=n=>n.attributes.getInts("axes"),s4=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},u4=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var $w,l4,c4,Aw=U(()=>{"use strict";ot();Le();$w=(n,e)=>{c4(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>l4(n,e,r)},e)]},l4=(n,e,r)=>{let t=ye(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},c4=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var Ow,d4,p4,Pw=U(()=>{"use strict";Ho();Le();Ow=(n,e)=>{p4(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>d4(n,e,r)},e)]},d4=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},p4=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(In.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var nc,Ew,Cw,f4,h4,Dw=U(()=>{"use strict";He();nc=(n,e,r)=>{f4(e);let t=pe.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Ew=(n,e)=>(h4(e),nc(n,[e[0]],Array.from(e[1].integerData))),Cw=n=>n.attributes.getInts("axes"),f4=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},h4=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var kw,Nw=U(()=>{"use strict";Wy();n_();a_();p_();ra();X_();t0();o0();s0();d0();h0();y0();x0();na();$0();B0();q0();X0();tw();nw();uw();yw();xw();Sw();Aw();Pw();ia();Fl();Dw();Yl();kw=[["Abs","","6+",f_],["Acos","","7+",h_],["Add","","7+",Hy],["And","","7+",jy],["Asin","","7+",m_],["Atan","","7+",g_],["AveragePool","","7+",O0,P0],["BatchNormalization","","7+",Gy,Uy],["Cast","","6+",o_,i_],["Ceil","","6+",__],["Clip","","6-10",Ml,b_],["Clip","","11+",y_],["Concat","","4+",l_,d_],["Conv","","1+",jl,ql],["ConvTranspose","","1+",q_,K_],["Cos","","7+",w_],["Div","","7+",qy],["Dropout","","7+",Bl],["DepthToSpace","","1+",Q_,e0],["Equal","","7+",Ky],["Elu","","6+",v_,x_],["Exp","","6+",T_],["Flatten","","1+",r0,n0],["Floor","","6+",I_],["FusedConv","com.microsoft","1+",jl,ql],["Gather","","1+",i0,a0],["Gemm","","7-10",Kl,l0],["Gemm","","11+",Kl,c0],["GlobalAveragePool","","1+",C0,D0],["GlobalMaxPool","","1+",z0],["Greater","","7+",Xy],["Identity","","1+",Bl],["ImageScaler","","1+",p0,f0],["InstanceNormalization","","6+",g0,b0],["LeakyRelu","","6+",S_,$_],["Less","","7+",Zy],["LRN","","1+",_0,w0],["Log","","6+",A_],["MatMul","","1+",F_,V_],["MaxPool","","1+",k0,N0],["Mul","","7+",Jy],["Neg","","6+",O_],["Not","","1+",P_],["Or","","7+",Yy],["Pad","","2-10",Xl,T0],["Pad","","11+",I0,S0],["Pow","","7+",Qy],["PRelu","","7+",e_],["ReduceLogSum","","1+",H0,Sn],["ReduceMax","","1+",G0,Sn],["ReduceMean","","1+",V0,Sn],["ReduceMin","","1+",U0,Sn],["ReduceProd","","1+",W0,Sn],["ReduceSum","","1-12",F0,Sn],["ReduceSumSquare","","1+",j0,Sn],["Relu","","6+",E_],["Reshape","","5+",K0],["Resize","","10",ec,Q0],["Resize","","11+",ec,ew],["Shape","","1+",rw],["Sigmoid","","6+",C_],["Sin","","7+",D_],["Slice","","10+",sw],["Slice","","1-9",ow,iw],["Softmax","","1-12",pw,fw],["Softmax","","13+",mw,hw],["Split","","2-12",ww,vw],["Sqrt","","6+",k_],["Squeeze","","1-12",rc,Iw],["Squeeze","","13+",Tw],["Sub","","7+",t_],["Sum","","6+",$w],["Tan","","7+",N_],["Tanh","","6+",L_],["Tile","","6+",Ow],["Transpose","","1+",Kn,J_],["Upsample","","7-8",Zl,J0],["Upsample","","9",Zl,Y0],["Unsqueeze","","1-12",nc,Cw],["Unsqueeze","","13+",Ew],["Xor","","7+",r_]]});function Rw(n){let e={},r;for(;(r=Lw.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=m4.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),c=a?`${a} ${s};`:"",f=e[t].body,m="";e[t].params.forEach((_,v)=>{_&&(m+=`${_.type} ${_.name} = ${u[v]};
`)}),f=`${m}
 ${f}`,f=f.replace("return",`${s} = `);let b=`
      ${c}
      {
        ${f}
      }
      `;n=n.replace(r[0],b)}}return n=n.replace(Lw,""),n}var Lw,m4,zw=U(()=>{"use strict";Lw=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,m4="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function go(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:g4(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function g4(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),lo(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),lo(n.every(b4),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function b4(n){return n%1===0}function y4(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function Mw(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var la,oc=U(()=>{"use strict";Vt();He();la=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((c,f)=>c*f),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((c,f)=>c*f);if(s>o||u>o)qe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=go(i).newShape);let a=y4(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Mw(a/4).map(s=>s*2):Mw(a)}}});var ca,Bw=U(()=>{"use strict";He();un();ot();oc();Hr();ca=class extends qt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new ie(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new ie(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let s=`
      void setOutput(vec4 val) {
        ${ye(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new ie(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${ye(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new ie(s),o}getOutputScalarCoords(){return new ie(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new ie(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new ie(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new ie(o))}getOutputPacked2DCoords(e,r){let t="";if(Vn.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new ie(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new ie(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          int b = index / ${i};
          index -= b * ${i};

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec3(b, r, c);
        }
      `;return new ie(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let f=2;f<e.length-1;f++)a*=e[e.length-f-1],s=`
      int b${f} = index / ${a};
      index -= b${f} * ${a};
    `+s,u=`b${f}, `+u;let c=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.y * ${t[0]} + resTexRC.x;

        ${s}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${u});
      }
    `;return new ie(c)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new ie(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new ie(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,m=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${m};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new ie(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,m=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${m};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new ie(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,m=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${m};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new ie(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,m=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${m};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new ie(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new ie(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new ie(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new ie(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new ie(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=ye(this.context.glContext.version);return e[r]=new ie(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Xi(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=$y(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Xi(o),c=i.length,f=a.length,m=$t.getBroadcastDims(i,a),b=At(f),_=f-c,v,x=or();c===0?v="":f<2&&m.length>=1?v="coords = 0;":v=m.map(A=>`coords.${x[A+_]} = 0;`).join(`
`);let O="";f<2&&c>0?O="coords":O=i.map((A,X)=>`coords.${x[X+_]}`).join(", ");let I="return outputValue;",C=pe.size(i)===1,N=pe.size(a)===1;if(c===1&&!C&&!N)I=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(C&&!N)f===1?I=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:I=`
          return vec4(outputValue.x);
        `;else if(m.length){let A=c-2,X=c-1;m.indexOf(A)>-1&&m.indexOf(X)>-1?I="return vec4(outputValue.x);":m.indexOf(A)>-1?I="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":m.indexOf(X)>-1&&(I="return vec4(outputValue.xx, outputValue.zz);")}let R=`
        int lastDim = coords.${x[f-1]};
        coords.${x[f-1]} = coords.${x[f-2]};
        coords.${x[f-2]} = lastDim;
      `,H=`
      vec4 ${e}() {
        ${b} coords = getOutputCoords();
        ${R}
        ${v}
        vec4 outputValue = ${u}(${O});
        ${I}
      }
    `;return new ie(H,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,c=r.unpackedShape,f=t.unpackedShape,m=Xi(o);if(s===u&&Vn.arraysEqual(a,i)){let C=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new ie(C,["coordinates.sampleTexture"])}let b=At(u),_=$t.getBroadcastDims(c,f),v=u-s,x,O=or();s===0?x="":u<2&&_.length>=1?x="coords = 0;":x=_.map(C=>`coords.${O[C+v]} = 0;`).join(`
`);let I="";u<2&&s>0?I="coords":I=r.unpackedShape.map((C,D)=>`coords.${O[D+v]}`).join(", ");let S=`
        float ${e}() {
          ${b} coords = getOutputCoords();
          ${x}
          return ${m}(${I});
        }
      `;return new ie(S,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=ye(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new ie(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=ye(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new ie(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=ye(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&Vn.arraysEqual(o,i)){let _=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new ie(_)}let c=i,f=Math.ceil(o[1]/2),b=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${f}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new ie(b,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=ye(this.context.glContext.version);if(o[0]===1){let v=o.slice(1),x=[1,2],O=co(o,v),I=["b","row","col"],S=JSON.parse(JSON.stringify(t));S.unpackedShape=O;let C=this.getPackedSamplerFromInput(e,r,S),N=`${C.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${po(I,x)});
      } `;return new ie(N,C.dependencies)}let u=a[0],c=a[1],f=Math.ceil(o[2]/2),m=f*Math.ceil(o[1]/2),_=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${u}, ${m}, ${f}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new ie(_,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=ye(this.context.glContext.version),u=[a[0],a[1]],c=u[1],f=u[0],m=Math.ceil(o[i-1]/2),b=m*Math.ceil(o[i-2]/2),_="int b, int row, int col",v=`b * ${b} + (row / 2) * ${m} + (col / 2)`;for(let I=2;I<i-1;I++)_=`int b${I}, `+_,b*=o[i-I-1],v=`b${I} * ${b} + `+v;let O=`vec4 ${e}(${_}) {
      int index = ${v};
      int texR = index / ${f};
      int texC = index - texR * ${f};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${f}, ${c});
      return ${s.texture2D}(${r}, uv);
    }`;return new ie(O)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new ie(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new ie(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new ie(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new ie(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&Vn.arraysEqual(o,i)){let b=i[1],_=i[0],v=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${b}.0, ${_}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(v,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=go(o),u=a;if(u.length<o.length){let b=co(o,u),_=JSON.parse(JSON.stringify(t));_.unpackedShape=b;let v=["col","row"],x=`
          ${this.getUnpackedSamplerFromInput(e,r,_).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${po(v,s)});
          }
        `;return new ie(x,["coordinates.sampleTexture"])}let c=i[1],f=i[0];if(f===1){let b=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let b=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${f}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(b,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let m=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${f}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new ie(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=go(o),c=s;if(c.length<o.length){let _=co(o,c),v=["batch","col","row"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=_;let O=this.getUnpackedSamplerFromInput(e,r,x),I=u.reverse(),S=`
          ${O.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${po(v,I)});
          }
        `;return new ie(S,O.dependencies)}let f=t.width,m=t.height,b=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${f}, ${m}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new ie(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,c=t.height,f=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new ie(f,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:c,keptDims:f}=go(o);if(c.length<o.length){let v=co(o,c),x=["row","col","depth","depth2","depth3"],O=JSON.parse(JSON.stringify(t));O.unpackedShape=v;let I=`
          ${this.getUnpackedSamplerFromInput(e,r,O).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${po(x,f)});
          }
        `;return new ie(I,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let m=t.width,b=t.height,_=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${m}, ${b}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new ie(_,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,c=o[1]*u,{newShape:f,keptDims:m}=go(o);if(f.length<o.length){let x=co(o,f),O=["row","col","depth","depth2","depth3","depth4"],I=JSON.parse(JSON.stringify(t));I.unpackedShape=x;let S=`
            ${this.getUnpackedSamplerFromInput(e,r,I).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${po(O,m)});
            }
          `;return new ie(S,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let b=t.width,_=t.height,v=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${b}, ${_}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new ie(v,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${r-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${r}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${r}]) {
        ${a.join("")}
      }
    `;return{toVec:new ie(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new ie(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new ie(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=ye(this.context.glContext.version);return`
        float ${a}(int m[${r}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=ye(this.context.glContext.version);return`
        vec4 ${a}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var da,Fw=U(()=>{"use strict";un();da=class n extends qt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new ie(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new ie(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new ie(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new ie(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var pa,Vw=U(()=>{"use strict";un();ot();pa=class extends qt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ye(this.context.glContext.version);return{setFragColor:new ie(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new ie(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var fa,Gw=U(()=>{"use strict";un();fa=class n extends qt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,c="";for(let m=0;m<a;++m)c+=`
          realIndices[${m}] = int( mod(float(bcastedIndices[${s+m}]), ${i[m]}.0) );
          `;let f=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
        }
        `;r[u]=new ie(f)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,c="";for(let m=0;m<a-2;++m)c+=`
          realIndices[${m}] = int( mod(float(bcastedIndices[${s+m}]), ${i[m]}.0) );
          `;let f=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new ie(f)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new ie(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new ie(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new ie(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new ie(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${r-1}] = offset;`),`
      void ${e}(int offset, out int indices[${r}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${r}`,s="";for(let c=0;c<i;++c)s+=`
        shape[${c}] = ${o[c]};`;let u=`
        void ${a}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${s};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[a]=new ie(u)}),e}}});var ha,Uw=U(()=>{"use strict";un();ha=class extends qt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let c=0;c<r;++c)s+=`
          dest[${c}] ${t[i]} src[${c}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new ie(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new ie(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${r} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${r-1}] = value;
        `;let o=`
      void setVecItem(out int m[${r}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new ie(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${r} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${r-1}];
        `;let o=`
      int getVecItem(int m[${r}], int index) {
        ${t}
      }
    `;return{getVecItem:new ie(o)}}}});var ic,Ww=U(()=>{"use strict";Bw();Fw();Vw();Gw();Uw();ic={encoding:da,fragcolor:pa,vec:ha,shapeUtils:fa,coordinates:ca}});var ma,Hw=U(()=>{"use strict";un();zw();Ww();ot();ma=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Qi(e,r,t,o),Object.keys(ic).forEach(a=>{let s=new ic[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let c in u){let f=a+"."+c,m;i[f]?(m=i[f],m.routineBody=u[c].routineBody):(m=new Wo(f,u[c].routineBody),i[f]=m);let b=u[c].dependencies;if(b)for(let _=0;_<b.length;++_)if(i[b[_]])m.addDependency(i[b[_]]);else{let v=new Wo(b[_]);i[b[_]]=v,m.addDependency(v)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${Sy(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=Rw(r),`${Iy(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),ea.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var ga,jw=U(()=>{"use strict";xt();Vt();Hw();ot();ga=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw qe.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ma(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){qe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Ty(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ve.debug&&qe.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;qe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:c}of e){let f=r.find(m=>m.name===a)?.data;if(s!=="sampler2D"&&!f)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":c?o.uniform1fv(u,f):o.uniform1f(u,f);break;case"int":c?o.uniform1iv(u,f):o.uniform1i(u,f);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var ba,qw=U(()=>{"use strict";Vt();Go();ba=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,c,f;if(this.config.reuseTextures){c=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,f=this.inUseTextures.get(c),f||(f=[],this.inUseTextures.set(c,f));let b=this.idleTextures.get(c);if(b&&b.length>0){let _=b.pop();return f.push(_),o===1&&this.glContext.updateTexture(_,s,u,a,this.toTextureData(e,t)),_}}qe.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let m=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(f.push(m),this.textureLookup.set(m,c)),m}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((c,f)=>c*f)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(c=>c(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(qe.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var ya,Kw=U(()=>{"use strict";Vt();zg();Fy();Nw();jw();oc();qw();ya=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new la(e.glContext.maxTextureSize),this.programManager=new ga(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new ba(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Yi(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){qe.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Rg(e,r,kw);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function _4(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var qo,Xw=U(()=>{"use strict";xt();Go();Go();Hr();qo=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),c=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,c),this.checkError(),u.decode(c,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ve.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new Zi(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Vo(this.gl,r):new Vo(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Ji(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await El(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=_4(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await El(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function ac(n){let e;if((!n||n==="webgl2")&&"webgl2"in bo?e=bo.webgl2:(!n||n==="webgl")&&"webgl"in bo&&(e=bo.webgl),!e)try{let t=v4();e=Zw(t,n)}catch{let t=w4();e=Zw(t,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return bo[n]=e,r.isContextLost()?(delete bo[n],ac(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function Zw(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new qo(t,2)}catch(i){qe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new qo(t,1)}catch(i){qe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function w4(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function v4(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var bo,Jw=U(()=>{"use strict";Vt();Xw();bo={}});var _a,Yw=U(()=>{"use strict";xt();Vt();Kw();Jw();_a=class{get contextId(){return ve.webgl.contextId}set contextId(e){ve.webgl.contextId=e}get matmulMaxBatchSize(){return ve.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ve.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ve.webgl.textureCacheMode}set textureCacheMode(e){ve.webgl.textureCacheMode=e}get pack(){return ve.webgl.pack}set pack(e){ve.webgl.pack=e}get async(){return ve.webgl.async}set async(e){ve.webgl.async=e}initialize(){try{return this.glContext=ac(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),qe.setWithEnv(ve),ve.webgl.context||Object.defineProperty(ve.webgl,"context",{value:this.glContext.gl}),qe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return qe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ya(this,e)}dispose(){this.glContext.dispose()}}});async function sc(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Qw.get(r);if(t)return t;let o=await T4(r);if(o)return o}}else return sc(["webgl"]);throw new Error("no available backend to use")}async function T4(n){let e=x4;if(typeof e[n]<"u"&&I4(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Qw.set(n,r),r}}function I4(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Qw,x4,ev=U(()=>{"use strict";Yw();Qw=new Map,x4={webgl:new _a}});var uc,wa,tv=U(()=>{"use strict";Vt();uc=class{constructor(e,r){this.op=e;this.node=r}},wa=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new uc(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((f,m)=>{let b=o[m];this._values[b]=f});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let f=i[u++],m=this._ops[f],b=m.node.inputs.map(O=>this._values[O]);if(b.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${m.node}`);let _=b;qe.verbose("ExecPlan",`Running op:${m.node.name} (${_.map((O,I)=>`'${m.node.inputs[I]}': ${O.type}[${O.dims.join(",")}]`).join(", ")})`);let v=await this.profiler.event("node",m.node.name,async()=>m.op.impl(t,_,m.op.context));if(v.length!==m.node.outputs.length)throw new Error("the size of output does not match model definition.");v.forEach((O,I)=>{let S=m.node.outputs[I];if(this._values[S])throw new Error(`output [${S}] already has value: op:${m.node.name}`);this._values[S]=O});let x=new Set;v.forEach((O,I)=>{let S=m.node.outputs[I];for(let C of a[S].to){let D=s[C],N=!0;for(let R of D.inputs)if(!this._values[R]){N=!1;break}N&&x.add(C)}}),i.push(...x)}let c=[];for(let f=0;f<this.graph.getOutputIndices().length;f++){let m=this.graph.getOutputIndices()[f],b=this._values[m];if(b===void 0)throw new Error(`required output [${m}] does not have value`);m===0?await b.getData():b.data,c.push(b)}return qe.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),c})}}});var Ne,Ko,rv=U(()=>{"use strict";Lo();Ne=Oe(uo());Hn();He();Ko=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof Ne.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Gi.Attribute&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof Ne.onnx.AttributeProto?e.type:e.type();switch(r){case Ne.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Ne.onnx.AttributeProto.AttributeType.INT:return"int";case Ne.onnx.AttributeProto.AttributeType.STRING:return"string";case Ne.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Ne.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Ne.onnx.AttributeProto.AttributeType.INTS:return"ints";case Ne.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Ne.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Ne.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof Ne.onnx.AttributeProto?e.type:e.type();if(r===Ne.onnx.AttributeProto.AttributeType.GRAPH||r===Ne.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===Ne.onnx.AttributeProto.AttributeType.INT&&kt.isLong(t))return kt.longToNumber(t);if(r===Ne.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=kt.longToNumber(s)}return i}if(r===Ne.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Ne.onnx.AttributeProto?ft.fromProto(t):ft.fromOrtTensor(t);if(r===Ne.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Ne.onnx.AttributeProto)return t.map(i=>ft.fromProto(i));if(e instanceof Gi.Attribute)return t.map(i=>ft.fromOrtTensor(i))}return r===Ne.onnx.AttributeProto.AttributeType.STRING&&e instanceof Ne.onnx.AttributeProto?Fo(t):r===Ne.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Ne.onnx.AttributeProto?t.map(Fo):t}static getValueNoCheck(e){return e instanceof Ne.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Ne.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Ne.onnx.AttributeProto.AttributeType.INT:return e.i;case Ne.onnx.AttributeProto.AttributeType.STRING:return e.s;case Ne.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Ne.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Ne.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Ne.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Ne.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Ne.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Ne.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Ne.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Ht.AttributeType.FLOAT:return e.f();case Ht.AttributeType.INT:return e.i();case Ht.AttributeType.STRING:return e.s();case Ht.AttributeType.TENSOR:return e.t();case Ht.AttributeType.GRAPH:return e.g();case Ht.AttributeType.FLOATS:return e.floatsArray();case Ht.AttributeType.INTS:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case Ht.AttributeType.STRINGS:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case Ht.AttributeType.TENSORS:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${Ht.AttributeType[e.type()]}`)}}}});var cc,dc,Kr,va,lc,nv=U(()=>{"use strict";rv();Lo();cc=Oe(uo());Hn();He();dc={from:(n,e)=>new lc(n,e)},Kr=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=Tt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},va=class{constructor(e,r){e instanceof cc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Ko(e.attribute)):e instanceof pl.Node&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Ko(Tt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},lc=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof cc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof cl.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Kr(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new Kr;s.type={shape:{dims:Tt.tensorDimsFromProto(i.dims)},tensorType:Tt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=ft.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Kr(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new va(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let c=r.get(u);if(typeof c>"u"&&(c=this._allData.push(new Kr)-1,r.set(u,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=ft.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let c=r.get(u);if(typeof c>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(c),this._allData[c]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Kr;if(e.nodeArgs(s)?.type()?.valueType()!==hl.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let f=e.nodeArgs(s).type().value(new fl.TensorTypeAndShape),m=Tt.tensorDataTypeFromProto(f.elemType()),b=f.shape(),_=[];for(let x=0;x<b.dimLength();x++)_.push(kt.longToNumber(b.dim(x).value().dimValue()));u.type={shape:{dims:_},tensorType:m};let v=this._allData.push(u)-1;r.set(a,v),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new Kr,c=Tt.tensorDimsFromORTFormat(a),f=Tt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:c},tensorType:f},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=ft.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Kr)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let c=0;s=`unnamed_${a.opType()}_${c}`,!!t.has(s);c++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new va(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let c=s?.outputs(u),f=r.get(c);if(typeof f>"u"&&(f=this._allData.push(new Kr)-1,r.set(c,f)),a.outputs.push(f),this._allData[f]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${f}`);if(this._allData[f]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[f]._from=-1,this._allData[f].tensor=ft.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let c=s.inputs(u),f=r.get(c);if(typeof f>"u")throw new Error(`unrecognized input '${c}' for node: ${s.name()}`);a.inputs.push(f),this._allData[f]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Un,Wn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var ov,iv,xa,av=U(()=>{"use strict";ov=Oe(We());nv();Lo();iv=Oe(uo());He();xa=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=iv.onnx.ModelProto.decode(e);if(kt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:kt.longToNumber(i.version)})),this._graph=dc.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new ov.ByteBuffer(e),o=dl.InferenceSession.getRootAsInferenceSession(t).model();if(kt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:kt.longToNumber(s.version())})}this._graph=dc.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Ta,sv=U(()=>{"use strict";ev();tv();Vt();av();Ta=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Oi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await sc(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new xa,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new wa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var Ia,uv=U(()=>{"use strict";xt();Hn();Ia=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new ft(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new Rt(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var lv={};Nn(lv,{onnxjsBackend:()=>S4});var pc,S4,cv=U(()=>{"use strict";sv();uv();pc=class{async init(){}async createInferenceSessionHandler(e,r){let t=new Ta(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new Ia(t)}},S4=new pc});var Sa=U(()=>{"use strict"});var fv={};Nn(fv,{default:()=>$4});var dv,pv,$4,hv=U(()=>{"use strict";fc();$n();$a();dv="ort-wasm-proxy-worker",pv=globalThis.self?.name===dv;pv&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":Aa(r.wasm).then(()=>{Oa(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;Pa(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Xo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;Ea(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":Ca(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;Da(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Na([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":ka(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});$4=pv?null:n=>new Worker(n??Bt,{type:"module",name:dv})});var gv={};Nn(gv,{default:()=>A4});async function mv(n={}){var e=n,r=!!globalThis.window,t=!!globalThis.WorkerGlobalScope,o=t&&self.name?.startsWith("em-pthread");e.mountExternalData=(l,p)=>{l.startsWith("./")&&(l=l.substring(2)),(e.zj||(e.zj=new Map)).set(l,p)},e.unmountExternalData=()=>{delete e.zj},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qk:!0}).buffer.constructor;let i=l=>async(...p)=>{try{if(e.Cj)throw Error("Session already started");let h=e.Cj={fk:p[0],errors:[]},d=await l(...p);if(e.Cj!==h)throw Error("Session mismatch");e.Kj?.flush();let g=h.errors;if(0<g.length){let y=await Promise.all(g);if(y=y.filter(w=>w),0<y.length)throw Error(y.join(`
`))}return d}finally{e.Cj=null}};e.jsepInit=(l,p)=>{if(l==="webgpu"){[e.Kj,e.Wj,e.$j,e.Lj,e.Zj,e.kf,e.ak,e.ck,e.Xj,e.Yj,e.bk]=p;let h=e.Kj;e.jsepRegisterBuffer=(d,g,y,w)=>h.registerBuffer(d,g,y,w),e.jsepGetBuffer=d=>h.getBuffer(d),e.jsepCreateDownloader=(d,g,y)=>h.createDownloader(d,g,y),e.jsepOnCreateSession=d=>{h.onCreateSession(d)},e.jsepOnReleaseSession=d=>{h.onReleaseSession(d)},e.jsepOnRunStart=d=>h.onRunStart(d),e.dk=(d,g)=>{h.upload(d,g)}}else if(l==="webnn"){let h=p[0];[e.nk,e.Pj,e.webnnEnsureTensor,e.Qj,e.webnnDownloadTensor,e.mk,e.webnnEnableTraceEvent]=p.slice(1),e.webnnReleaseTensorId=e.Pj,e.webnnUploadTensor=e.Qj,e.webnnRegisterMLContext=e.mk,e.webnnOnRunStart=d=>h.onRunStart(d),e.webnnOnRunEnd=h.onRunEnd.bind(h),e.webnnOnReleaseSession=d=>{h.onReleaseSession(d)},e.webnnCreateMLTensorDownloader=(d,g)=>h.createMLTensorDownloader(d,g),e.webnnRegisterMLTensor=(d,g,y,w)=>h.registerMLTensor(d,g,y,w),e.webnnCreateMLContext=d=>h.createMLContext(d),e.webnnRegisterMLConstant=(d,g,y,w,T,$)=>h.registerMLConstant(d,g,y,w,T,e.zj,$),e.webnnRegisterGraphInput=h.registerGraphInput.bind(h),e.webnnIsGraphInput=h.isGraphInput.bind(h),e.webnnRegisterGraphOutput=h.registerGraphOutput.bind(h),e.webnnIsGraphOutput=h.isGraphOutput.bind(h),e.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),e.webnnIsGraphInputOutputTypeSupported=h.isGraphInputOutputTypeSupported.bind(h)}};let a=()=>{let l=p=>(...h)=>{let d=cr;return h=p(...h),cr!=d?new Promise((g,y)=>{$s={resolve:g,reject:y}}):h};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[p]=l(e[p])})(),i!==void 0&&(e._OrtRun=i(e._OrtRun),e._OrtRunWithBinding=i(e._OrtRunWithBinding)),a=void 0};e.asyncInit=()=>{a?.()};var s,u,c=(l,p)=>{throw p},f=import.meta.url,m="";if(r||t){try{m=new URL(".",f).href}catch{}t&&(u=l=>{var p=new XMLHttpRequest;return p.open("GET",l,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),s=async l=>{if(H(l))return new Promise((h,d)=>{var g=new XMLHttpRequest;g.open("GET",l,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?h(g.response):d(g.status)},g.onerror=d,g.send(null)});var p=await fetch(l,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var b,_,v,x,O,I,S=console.log.bind(console),C=console.error.bind(console),D=S,N=C,R=!1,H=l=>l.startsWith("file://");function A(){pn.buffer!=Y.buffer&&It()}if(o){let l=function(p){try{var h=p.data,d=h.vi;if(d==="load"){let g=[];self.onmessage=y=>g.push(y),I=()=>{postMessage({vi:"loaded"});for(let y of g)l(y);self.onmessage=l};for(let y of h.Tj)e[y]&&!e[y].proxy||(e[y]=(...w)=>{postMessage({vi:"callHandler",Sj:y,args:w})},y=="print"&&(D=e[y]),y=="printErr"&&(N=e[y]));pn=h.jk,It(),_=h.kk,Ge(),yi()}else if(d==="run"){(function(g){var y=(A(),Q)[g+52>>>2>>>0];g=(A(),Q)[g+56>>>2>>>0],op(y,y-g),z(y)})(h.ui),Cs(h.ui,0,0,1,0,0),id(),Ts(h.ui),X||(Yd(),X=!0);try{sI(h.hk,h.Ij)}catch(g){if(g!="unwind")throw g}}else h.target!=="setimmediate"&&(d==="checkMailbox"?X&&di():d&&(N(`worker: received unknown command ${d}`),N(h)))}catch(g){throw Qd(),g}};var nM=l,X=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=l}var Y,le,ae,me,j,Q,de,he,ce,xe,Ae,ke=!1;function It(){var l=pn.buffer;e.HEAP8=Y=new Int8Array(l),ae=new Int16Array(l),e.HEAPU8=le=new Uint8Array(l),me=new Uint16Array(l),e.HEAP32=j=new Int32Array(l),e.HEAPU32=Q=new Uint32Array(l),de=new Float32Array(l),he=new Float64Array(l),ce=new BigInt64Array(l),xe=new BigUint64Array(l)}function Xe(){ke=!0,o?I():on.Ce()}function Z(l){throw N(l="Aborted("+l+")"),R=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),O?.(l),l}function re(){return{a:{Dc:kS,ke:DS,t:uI,Y:lI,b:cI,o:dI,A:pI,s:fI,Pb:hI,w:mI,ab:gI,vd:dd,h:bI,Nb:md,Ld:gd,rd:bd,td:yd,Md:_d,Jd:wd,Cd:vd,Id:xd,pc:Td,sd:Id,pd:Sd,Kd:$d,qd:Ad,Rd:yI,kc:wI,jd:vI,hd:TI,jc:SI,Ea:$I,na:AI,id:OI,Mb:LI,kd:RI,Fd:zI,nd:BI,wd:FI,fd:VI,lc:GI,Ed:Ts,Od:UI,ed:qI,W:YI,md:vs,ne:QI,Lb:eS,qb:tS,ve:rS,U:nS,V:Ld,oe:oS,bd:iS,re:aS,ja:sS,Ya:uS,xe:lS,ue:cS,zd:dS,Ad:pS,Bd:fS,xd:Bd,yd:Fd,gd:Vd,Vd:mS,Qd:yS,E:_S,_b:wS,mc:vS,Pd:gS,xb:xS,Nd:TS,od:IS,fa:hS,rb:SS,Bc:gi,ld:AS,ce:$S,Xd:OS,Gd:Hd,Hd:jd,ud:bs,Ob:qd,oc:Kd,Dd:Xd,nc:Zd,Jb:_$,wb:NO,qc:IP,z:cP,ya:gO,Ca:y$,Td:SP,Ub:kO,gc:K$,X:ZA,he:AO,y:JS,c:zS,jb:mA,f:LS,Ga:W$,qa:hP,i:NS,ma:yA,j:jS,Ud:xP,q:KS,m:BS,v:A$,r:b$,Va:FA,N:c$,da:Y$,oa:tA,cd:i$,ac:KA,_a:JA,Rb:rP,cb:MO,Qc:_A,_c:$$,Nc:TA,$a:pA,Oc:vA,kb:hA,$:bA,Kb:l$,ec:gA,_:C$,ka:dA,K:BA,Pc:wA,Ae:g$,Pa:QA,H:H$,wc:dP,mb:Z$,te:xA,xa:OO,Fa:eA,D:YS,Kc:OA,Mc:IA,Tc:uA,Uc:sA,fc:aA,se:$A,sc:_P,Qa:z$,ba:IO,Ra:mP,sa:pP,bb:wP,tc:yP,Sc:lA,rc:vP,Xb:bO,Z:QS,O:XS,G:nA,sb:TP,Wd:bP,Da:Q$,P:pO,Lc:AA,Rc:cA,Q:P$,d:MS,Ua:UA,k:FS,Yc:k$,Xa:B$,ra:U$,Fb:PA,g:RS,Zc:D$,aa:j$,ua:HA,vb:BO,hb:CA,e:GS,Yd:uP,$d:iP,l:US,Hc:WA,n:VS,Zd:sP,Jc:DA,ae:oP,Gc:jA,ge:VO,p:WS,Na:oO,Cb:nO,Ma:iO,Eb:kA,Tb:RO,F:u$,L:ZS,I:h$,Sa:lP,_d:aP,Ec:DO,Db:GA,ca:a$,ia:qS,va:JO,gb:XA,Ta:QO,qe:NA,Ia:s$,Ba:J$,xc:eP,yc:YO,Za:ZO,tb:XO,Ja:FO,me:qA,wa:EO,be:tP,je:TO,le:tO,Wb:yO,Ka:PO,T:HS,eb:CO,Fc:wO,yb:_O,ta:SO,fb:eO,Vc:iA,Ib:T$,ib:SA,ub:HO,ea:e$,pa:L$,$c:v$,Gb:q$,ga:N$,cc:LA,dd:o$,Qb:nP,zc:KO,hc:V$,Wc:F$,Xc:R$,Wa:fA,vc:fP,dc:EA,fe:WO,ee:jO,C:p$,B:t$,ic:O$,Ha:x$,ze:M$,Hb:I$,pe:RA,S:f$,db:zO,Aa:xO,Cc:LO,Be:n$,de:qO,x:r$,R:S$,ha:m$,ie:$O,Zb:cO,Ac:UO,pb:w$,Yb:dO,ob:E$,Vb:vO,we:oA,Sb:GO,$b:YA,nb:G$,ad:d$,bc:MA,uc:gP,la:fO,Ic:zA,J:VA,lb:rA,ye:X$,za:mO,M:hO,Ab:uO,La:sO,Oa:rO,zb:lO,Bb:aO,u:ES,a:pn,Sd:ii}}}async function Ge(){function l(d,g){var y=on=d.exports;d={};for(let[w,T]of Object.entries(y))typeof T=="function"?(y=WI(T),d[w]=y):d[w]=T;return on=d,on=function(){var w=on,T=P=>k=>P(k)>>>0,$=P=>()=>P()>>>0;return(w=Object.assign({},w)).De=T(w.De),w.ff=$(w.ff),w.hf=T(w.hf),w.wf=T(w.wf),w.xf=$(w.xf),w.Bf=T(w.Bf),w}(),nd.push(on.jf),Jd=(d=on).De,Yd=d.Ee,e._OrtInit=d.Fe,e._OrtGetLastError=d.Ge,e._OrtCreateSessionOptions=d.He,e._OrtAppendExecutionProvider=d.Ie,e._OrtAddFreeDimensionOverride=d.Je,e._OrtAddSessionConfigEntry=d.Ke,e._OrtReleaseSessionOptions=d.Le,e._OrtCreateSession=d.Me,e._OrtReleaseSession=d.Ne,e._OrtGetInputOutputCount=d.Oe,e._OrtGetInputOutputMetadata=d.Pe,e._OrtFree=d.Qe,e._OrtCreateTensor=d.Re,e._OrtGetTensorData=d.Se,e._OrtReleaseTensor=d.Te,e._OrtCreateRunOptions=d.Ue,e._OrtAddRunConfigEntry=d.Ve,e._OrtReleaseRunOptions=d.We,e._OrtCreateBinding=d.Xe,e._OrtBindInput=d.Ye,e._OrtBindOutput=d.Ze,e._OrtClearBoundOutputs=d._e,e._OrtReleaseBinding=d.$e,e._OrtRunWithBinding=d.af,e._OrtRun=d.bf,e._OrtEndProfiling=d.cf,e._JsepOutput=d.df,e._JsepGetNodeName=d.ef,bi=d.ff,dr=e._free=d.gf,$o=e._malloc=d.hf,Cs=d.lf,Qd=d.mf,ep=d.nf,tp=d.of,Ds=d.pf,rp=d.qf,np=d.rf,B=d.sf,Ao=d.tf,op=d.uf,z=d.vf,ks=d.wf,M=d.xf,ip=d.yf,Ns=d.zf,ap=d.Af,sp=d.Bf,up=d.Cf,Ls=d.Df,lp=d.Ef,cp=d.Ff,dp=d.Gf,pp=d.Hf,fp=d.If,hp=d.Jf,mp=d.Kf,gp=d.Lf,bp=d.Mf,yp=d.Nf,_p=d.Of,wp=d.Pf,vp=d.Qf,xp=d.Rf,Tp=d.Sf,Ip=d.Tf,Sp=d.Uf,$p=d.Vf,Ap=d.Wf,Op=d.Xf,Pp=d.Yf,Ep=d.Zf,Cp=d._f,Dp=d.$f,kp=d.ag,Np=d.bg,Lp=d.cg,Rp=d.dg,zp=d.eg,Mp=d.fg,Bp=d.gg,Fp=d.hg,Vp=d.ig,Gp=d.jg,Up=d.kg,Wp=d.lg,Hp=d.mg,jp=d.ng,qp=d.og,Kp=d.pg,Xp=d.qg,Zp=d.rg,Jp=d.sg,Yp=d.tg,Qp=d.ug,ef=d.vg,tf=d.wg,rf=d.xg,nf=d.yg,of=d.zg,af=d.Ag,sf=d.Bg,uf=d.Cg,lf=d.Dg,cf=d.Eg,df=d.Fg,pf=d.Gg,ff=d.Hg,hf=d.Ig,mf=d.Jg,gf=d.Kg,bf=d.Lg,yf=d.Mg,_f=d.Ng,wf=d.Og,vf=d.Pg,xf=d.Qg,Tf=d.Rg,If=d.Sg,Sf=d.Tg,$f=d.Ug,Af=d.Vg,Of=d.Wg,Pf=d.Xg,Ef=d.Yg,Cf=d.Zg,Df=d._g,kf=d.$g,Nf=d.ah,Lf=d.bh,Rf=d.ch,zf=d.dh,Mf=d.eh,Bf=d.fh,Ff=d.gh,Vf=d.hh,Gf=d.ih,Uf=d.jh,Wf=d.kh,Hf=d.lh,jf=d.mh,qf=d.nh,Kf=d.oh,Xf=d.ph,Zf=d.qh,Jf=d.rh,Yf=d.sh,Qf=d.th,eh=d.uh,th=d.vh,rh=d.wh,nh=d.xh,oh=d.yh,ih=d.zh,ah=d.Ah,sh=d.Bh,uh=d.Ch,lh=d.Dh,ch=d.Eh,dh=d.Fh,ph=d.Gh,fh=d.Hh,hh=d.Ih,mh=d.Jh,gh=d.Kh,bh=d.Lh,yh=d.Mh,_h=d.Nh,wh=d.Ph,vh=d.Qh,xh=d.Rh,Th=d.Sh,Ih=d.Th,Sh=d.Uh,$h=d.Vh,Ah=d.Wh,Oh=d.Xh,Ph=d.Yh,Eh=d.Zh,Ch=d._h,Dh=d.$h,kh=d.ai,Nh=d.bi,Lh=d.ci,Rh=d.di,zh=d.ei,Mh=d.fi,Bh=d.gi,Fh=d.hi,Vh=d.ii,Gh=d.ji,Uh=d.ki,Wh=d.li,Hh=d.mi,jh=d.ni,qh=d.oi,Kh=d.pi,Xh=d.qi,Zh=d.ri,Jh=d.si,Yh=d.ti,Qh=d.wi,em=d.xi,tm=d.zi,rm=d.Ai,nm=d.Bi,om=d.Ci,im=d.Di,am=d.Ei,sm=d.Fi,um=d.Gi,lm=d.Hi,cm=d.Ii,dm=d.Ji,pm=d.Ki,fm=d.Li,hm=d.Mi,mm=d.Ni,gm=d.Oi,bm=d.Pi,ym=d.Qi,_m=d.Ri,wm=d.Si,vm=d.Ti,xm=d.Ui,Tm=d.Vi,Im=d.Wi,Sm=d.Xi,$m=d.Yi,Am=d.Zi,Om=d._i,Pm=d.$i,Em=d.aj,Cm=d.bj,Dm=d.cj,km=d.dj,Nm=d.ej,Lm=d.fj,Rm=d.gj,zm=d.hj,Mm=d.ij,Bm=d.jj,Fm=d.kj,Vm=d.lj,Gm=d.mj,Um=d.nj,Wm=d.oj,Hm=d.rj,jm=d.sj,qm=d.tj,Km=d.uj,Xm=d.wj,Zm=d.xj,Jm=d.yj,Ym=d.Aj,Qm=d.Bj,eg=d.Ej,tg=d.Fj,rg=d.Gj,ng=d.Hj,_=g,on}var p,h=re();return e.instantiateWasm?new Promise(d=>{e.instantiateWasm(h,(g,y)=>{d(l(g,y))})}):o?l(new WebAssembly.Instance(_,re()),_):(Ae??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",m):m+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,p=await async function(d){var g=Ae;if(!b&&!H(g))try{var y=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(y,d)}catch(w){N(`wasm streaming compile failed: ${w}`),N("falling back to ArrayBuffer instantiation")}return async function(w,T){try{var $=await async function(P){if(!b)try{var k=await s(P);return new Uint8Array(k)}catch{}if(P==Ae&&b)P=new Uint8Array(b);else{if(!u)throw"both async and sync fetching of the wasm failed";P=u(P)}return P}(w);return await WebAssembly.instantiate($,T)}catch(P){N(`failed to asynchronously prepare wasm: ${P}`),Z(P)}}(g,d)}(h),l(p.instance,p.module))}class pt{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var Ze=l=>{l.terminate(),l.onmessage=()=>{}},mt=[],Me=0,Ye=null,Jt=l=>{dn.length==0&&(sd(),ad(dn[0]));var p=dn.pop();if(!p)return 6;Io.push(p),Cn[l.ui]=p,p.ui=l.ui;var h={vi:"run",hk:l.gk,Ij:l.Ij,ui:l.ui};return p.postMessage(h,l.Oj),0},Lt=0,Je=(l,p,...h)=>{var d,g=16*h.length,y=M(),w=ks(g),T=w>>>3;for(d of h)typeof d=="bigint"?((A(),ce)[T++>>>0]=1n,(A(),ce)[T++>>>0]=d):((A(),ce)[T++>>>0]=0n,(A(),he)[T++>>>0]=d);return l=ep(l,0,g,w,p),z(y),l};function ii(l){if(o)return Je(0,1,l);if(v=l,!(0<Lt)){for(var p of Io)Ze(p);for(p of dn)Ze(p);dn=[],Io=[],Cn={},R=!0}c(0,new pt(l))}function rd(l){if(o)return Je(1,0,l);bs(l)}var bs=l=>{if(v=l,o)throw rd(l),"unwind";ii(l)},dn=[],Io=[],nd=[],Cn={},od=l=>{var p=l.ui;delete Cn[p],dn.push(l),Io.splice(Io.indexOf(l),1),l.ui=0,tp(p)};function id(){nd.forEach(l=>l())}var ad=l=>new Promise(p=>{l.onmessage=g=>{var y=g.data;if(g=y.vi,y.Dj&&y.Dj!=bi()){var w=Cn[y.Dj];w?w.postMessage(y,y.Oj):N(`Internal error! Worker sent a message "${g}" to target pthread ${y.Dj}, but that thread no longer exists!`)}else g==="checkMailbox"?di():g==="spawnThread"?Jt(y):g==="cleanupThread"?ci(()=>{od(Cn[y.ik])}):g==="loaded"?(l.loaded=!0,p(l)):y.target==="setimmediate"?l.postMessage(y):g==="uncaughtException"?l.onerror(y.error):g==="callHandler"?e[y.Sj](...y.args):g&&N(`worker sent an unknown command ${g}`)},l.onerror=g=>{throw N(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var h,d=[];for(h of[])e.propertyIsEnumerable(h)&&d.push(h);l.postMessage({vi:"load",Tj:d,jk:pn,kk:_})});function sd(){var l=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});dn.push(l)}var pn,sI=(l,p)=>{Lt=0,l=Ls(l,p),0<Lt?v=l:Ds(l)},ai=[],si=0;function uI(l){var p=new ys(l>>>=0);return(A(),Y)[p.yi+12>>>0]==0&&(ud(p,!0),si--),ld(p,!1),ai.push(p),sp(l)}var ro=0,lI=()=>{B(0,0);var l=ai.pop();ip(l.Jj),ro=0};function ud(l,p){p=p?1:0,(A(),Y)[l.yi+12>>>0]=p}function ld(l,p){p=p?1:0,(A(),Y)[l.yi+13>>>0]=p}class ys{constructor(p){this.Jj=p,this.yi=p-24}}var ui=l=>{var p=ro;if(!p)return Ao(0),0;var h=new ys(p);(A(),Q)[h.yi+16>>>2>>>0]=p;var d=(A(),Q)[h.yi+4>>>2>>>0];if(!d)return Ao(0),p;for(var g of l){if(g===0||g===d)break;if(ap(g,d,h.yi+16))return Ao(g),p}return Ao(d),p};function cI(){return ui([])}function dI(l){return ui([l>>>0])}function pI(l,p){return ui([l>>>0,p>>>0])}function fI(l,p,h,d){return ui([l>>>0,p>>>0,h>>>0,d>>>0])}var hI=()=>{var l=ai.pop();l||Z("no exception to throw");var p=l.Jj;throw(A(),Y)[l.yi+13>>>0]==0&&(ai.push(l),ld(l,!0),ud(l,!1),si++),Ns(p),ro=p};function mI(l,p,h){var d=new ys(l>>>=0);throw p>>>=0,h>>>=0,(A(),Q)[d.yi+16>>>2>>>0]=0,(A(),Q)[d.yi+4>>>2>>>0]=p,(A(),Q)[d.yi+8>>>2>>>0]=h,Ns(l),si++,ro=l}var gI=()=>si;function cd(l,p,h,d){return o?Je(2,1,l,p,h,d):dd(l,p,h,d)}function dd(l,p,h,d){if(l>>>=0,p>>>=0,h>>>=0,d>>>=0,!globalThis.SharedArrayBuffer)return 6;var g=[];return o&&g.length===0?cd(l,p,h,d):(l={gk:h,ui:l,Ij:d,Oj:g},o?(l.vi="spawnThread",postMessage(l,g),0):Jt(l))}function bI(l){throw ro||=l>>>0,ro}var pd=globalThis.TextDecoder&&new TextDecoder,fd=(l,p,h,d)=>{if(h=p+h,d)return h;for(;l[p]&&!(p>=h);)++p;return p},hd=(l,p=0,h,d)=>{if(16<(h=fd(l,p>>>=0,h,d))-p&&l.buffer&&pd)return pd.decode(l.buffer instanceof ArrayBuffer?l.subarray(p,h):l.slice(p,h));for(d="";p<h;){var g=l[p++];if(128&g){var y=63&l[p++];if((224&g)==192)d+=String.fromCharCode((31&g)<<6|y);else{var w=63&l[p++];65536>(g=(240&g)==224?(15&g)<<12|y<<6|w:(7&g)<<18|y<<12|w<<6|63&l[p++])?d+=String.fromCharCode(g):(g-=65536,d+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else d+=String.fromCharCode(g)}return d},at=(l,p,h)=>(l>>>=0)?hd((A(),le),l,p,h):"";function md(l,p,h){return o?Je(3,1,l,p,h):0}function gd(l,p){if(o)return Je(4,1,l,p)}function bd(l,p){if(o)return Je(5,1,l,p)}function yd(l,p,h){if(o)return Je(6,1,l,p,h)}function _d(l,p,h){return o?Je(7,1,l,p,h):0}function wd(l,p){if(o)return Je(8,1,l,p)}function vd(l,p,h){if(o)return Je(9,1,l,p,h)}function xd(l,p,h,d){if(o)return Je(10,1,l,p,h,d)}function Td(l,p,h,d){if(o)return Je(11,1,l,p,h,d)}function Id(l,p,h,d){if(o)return Je(12,1,l,p,h,d)}function Sd(l){if(o)return Je(13,1,l)}function $d(l,p){if(o)return Je(14,1,l,p)}function Ad(l,p,h){if(o)return Je(15,1,l,p,h)}var yI=()=>Z(""),lr=l=>{l>>>=0;for(var p="";;){var h=(A(),le)[l++>>>0];if(!h)return p;p+=String.fromCharCode(h)}},_s={},ws={},_I={},no=class extends Error{constructor(l){super(l),this.name="BindingError"}};function nn(l,p,h={}){return function(d,g,y={}){var w=g.name;if(!d)throw new no(`type "${w}" must have a positive integer typeid pointer`);if(ws.hasOwnProperty(d)){if(y.Uj)return;throw new no(`Cannot register type '${w}' twice`)}ws[d]=g,delete _I[d],_s.hasOwnProperty(d)&&(g=_s[d],delete _s[d],g.forEach(T=>T()))}(l,p,h)}var Od=(l,p,h)=>{switch(p){case 1:return h?d=>(A(),Y)[d>>>0]:d=>(A(),le)[d>>>0];case 2:return h?d=>(A(),ae)[d>>>1>>>0]:d=>(A(),me)[d>>>1>>>0];case 4:return h?d=>(A(),j)[d>>>2>>>0]:d=>(A(),Q)[d>>>2>>>0];case 8:return h?d=>(A(),ce)[d>>>3>>>0]:d=>(A(),xe)[d>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${l}`)}};function wI(l,p,h,d,g){l>>>=0,h>>>=0,p=lr(p>>>0);let y=w=>w;if(d=d===0n){let w=8*h;y=T=>BigInt.asUintN(w,T),g=y(g)}nn(l,{name:p,Oh:y,qj:(w,T)=>(typeof T=="number"&&(T=BigInt(T)),T),pj:Od(p,h,!d),vj:null})}function vI(l,p,h,d){nn(l>>>=0,{name:p=lr(p>>>0),Oh:function(g){return!!g},qj:function(g,y){return y?h:d},pj:function(g){return this.Oh((A(),le)[g>>>0])},vj:null})}var Pd=[],Dn=[0,1,,1,null,1,!0,1,!1,1];function vs(l){9<(l>>>=0)&&--Dn[l+1]==0&&(Dn[l]=void 0,Pd.push(l))}var Ft=l=>{if(!l)throw new no(`Cannot use deleted val. handle = ${l}`);return Dn[l]},Yt=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Pd.pop()||Dn.length;return Dn[p]=l,Dn[p+1]=1,p}};function xs(l){return this.Oh((A(),Q)[l>>>2>>>0])}var xI={name:"emscripten::val",Oh:l=>{var p=Ft(l);return vs(l),p},qj:(l,p)=>Yt(p),pj:xs,vj:null};function TI(l){return nn(l>>>0,xI)}var II=(l,p)=>{switch(p){case 4:return function(h){return this.Oh((A(),de)[h>>>2>>>0])};case 8:return function(h){return this.Oh((A(),he)[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${l}`)}};function SI(l,p,h){h>>>=0,nn(l>>>=0,{name:p=lr(p>>>0),Oh:d=>d,qj:(d,g)=>g,pj:II(p,h),vj:null})}function $I(l,p,h,d,g){l>>>=0,h>>>=0,p=lr(p>>>0);let y=T=>T;if(d===0){var w=32-8*h;y=T=>T<<w>>>w,g=y(g)}nn(l,{name:p,Oh:y,qj:(T,$)=>$,pj:Od(p,h,d!==0),vj:null})}function AI(l,p,h){function d(y){var w=(A(),Q)[y>>>2>>>0];return y=(A(),Q)[y+4>>>2>>>0],new g((A(),Y).buffer,y,w)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];nn(l>>>=0,{name:h=lr(h>>>0),Oh:d,pj:d},{Uj:!0})}var fn=(l,p,h)=>{var d=(A(),le);if(p>>>=0,0<h){var g=p;h=p+h-1;for(var y=0;y<l.length;++y){var w=l.codePointAt(y);if(127>=w){if(p>=h)break;d[p++>>>0]=w}else if(2047>=w){if(p+1>=h)break;d[p++>>>0]=192|w>>6,d[p++>>>0]=128|63&w}else if(65535>=w){if(p+2>=h)break;d[p++>>>0]=224|w>>12,d[p++>>>0]=128|w>>6&63,d[p++>>>0]=128|63&w}else{if(p+3>=h)break;d[p++>>>0]=240|w>>18,d[p++>>>0]=128|w>>12&63,d[p++>>>0]=128|w>>6&63,d[p++>>>0]=128|63&w,y++}}d[p>>>0]=0,l=p-g}else l=0;return l},li=l=>{for(var p=0,h=0;h<l.length;++h){var d=l.charCodeAt(h);127>=d?p++:2047>=d?p+=2:55296<=d&&57343>=d?(p+=4,++h):p+=3}return p};function OI(l,p){nn(l>>>=0,{name:p=lr(p>>>0),Oh(h){var d=(A(),Q)[h>>>2>>>0];return d=at(h+4,d,!0),dr(h),d},qj(h,d){d instanceof ArrayBuffer&&(d=new Uint8Array(d));var g=typeof d=="string";if(!(g||ArrayBuffer.isView(d)&&d.BYTES_PER_ELEMENT==1))throw new no("Cannot pass non-string to std::string");var y=g?li(d):d.length,w=$o(4+y+1),T=w+4;return(A(),Q)[w>>>2>>>0]=y,g?fn(d,T,y+1):(A(),le).set(d,T>>>0),h!==null&&h.push(dr,w),w},pj:xs,vj(h){dr(h)}})}var Ed=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,PI=(l,p,h)=>{if(l>>>=1,16<(p=fd((A(),me),l,p/2,h))-l&&Ed)return Ed.decode((A(),me).slice(l,p));for(h="";l<p;++l){var d=(A(),me)[l>>>0];h+=String.fromCharCode(d)}return h},EI=(l,p,h)=>{if(h??=2147483647,2>h)return 0;var d=p;h=(h-=2)<2*l.length?h/2:l.length;for(var g=0;g<h;++g){var y=l.charCodeAt(g);(A(),ae)[p>>>1>>>0]=y,p+=2}return(A(),ae)[p>>>1>>>0]=0,p-d},CI=l=>2*l.length,DI=(l,p,h)=>{var d="";l>>>=2;for(var g=0;!(g>=p/4);g++){var y=(A(),Q)[l+g>>>0];if(!y&&!h)break;d+=String.fromCodePoint(y)}return d},kI=(l,p,h)=>{if(p>>>=0,h??=2147483647,4>h)return 0;var d=p;h=d+h-4;for(var g=0;g<l.length;++g){var y=l.codePointAt(g);if(65535<y&&g++,(A(),j)[p>>>2>>>0]=y,(p+=4)+4>h)break}return(A(),j)[p>>>2>>>0]=0,p-d},NI=l=>{for(var p=0,h=0;h<l.length;++h)65535<l.codePointAt(h)&&h++,p+=4;return p};function LI(l,p,h){if(l>>>=0,p>>>=0,h=lr(h>>>=0),p===2)var d=PI,g=EI,y=CI;else d=DI,g=kI,y=NI;nn(l,{name:h,Oh:w=>{var T=(A(),Q)[w>>>2>>>0];return T=d(w+4,T*p,!0),dr(w),T},qj:(w,T)=>{if(typeof T!="string")throw new no(`Cannot pass non-string to C++ string type ${h}`);var $=y(T),P=$o(4+$+p);return(A(),Q)[P>>>2>>>0]=$/p,g(T,P+4,$+p),w!==null&&w.push(dr,P),P},pj:xs,vj(w){dr(w)}})}function RI(l,p){nn(l>>>=0,{Vj:!0,name:p=lr(p>>>0),Oh:()=>{},qj:()=>{}})}function zI(l){Cs(l>>>0,!t,1,!r,131072,!1),id()}var ci=l=>{if(!R)try{if(l(),!(0<Lt))try{o?bi()&&Ds(v):bs(v)}catch(p){p instanceof pt||p=="unwind"||c(0,p)}}catch(p){p instanceof pt||p=="unwind"||c(0,p)}},MI=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Ts(l){l>>>=0,MI||(Atomics.waitAsync((A(),j),l>>>2,l).value.then(di),l+=128,Atomics.store((A(),j),l>>>2,1))}var di=()=>ci(()=>{var l=bi();l&&(Ts(l),np())});function BI(l,p){(l>>>=0)==p>>>0?setTimeout(di):o?postMessage({Dj:l,vi:"checkMailbox"}):(l=Cn[l])&&l.postMessage({vi:"checkMailbox"})}var Is=[];function FI(l,p,h,d,g){for(p>>>=0,g>>>=0,Is.length=0,h=g>>>3,d=g+d>>>3;h<d;){var y;y=(A(),ce)[h++>>>0]?(A(),ce)[h++>>>0]:(A(),he)[h++>>>0],Is.push(y)}return(p?Rs[p]:CS[l])(...Is)}var VI=()=>{Lt=0};function GI(l){l>>>=0,o?postMessage({vi:"cleanupThread",ik:l}):od(Cn[l])}function UI(l){}var pi=l=>{try{l()}catch(p){Z(p)}};function WI(l){var p=(...h)=>{fi.push(l);try{return l(...h)}finally{R||(fi.pop(),cr&&hn===1&&fi.length===0&&(hn=0,Lt+=1,pi(tg),typeof Fibers<"u"&&Fibers.sk()))}};return kd.set(l,p),p}var hn=0,cr=null,Cd=0,fi=[],Ss=new Map,Dd=new Map,kd=new Map,HI=0,$s=null,jI=[],Nd=l=>function(p){if(!R){if(hn===0){var h=!1,d=!1;p((g=0)=>{if(!R&&(Cd=g,h=!0,d)){hn=2,pi(()=>rg(cr)),typeof MainLoop<"u"&&MainLoop.Rj&&MainLoop.resume(),g=!1;try{var y=function(){var $=(A(),j)[cr+8>>>2>>>0];return $=Dd.get($),$=kd.get($),--Lt,$()}()}catch($){y=$,g=!0}var w=!1;if(!cr){var T=$s;T&&($s=null,(g?T.reject:T.resolve)(y),w=!0)}if(g&&!w)throw y}}),d=!0,h||(hn=1,cr=function(){var g=$o(65548),y=g+12;if((A(),Q)[g>>>2>>>0]=y,(A(),Q)[g+4>>>2>>>0]=y+65536,y=fi[0],!Ss.has(y)){var w=HI++;Ss.set(y,w),Dd.set(w,y)}return y=Ss.get(y),(A(),j)[g+8>>>2>>>0]=y,g}(),typeof MainLoop<"u"&&MainLoop.Rj&&MainLoop.pause(),pi(()=>eg(cr)))}else hn===2?(hn=0,pi(ng),dr(cr),cr=null,jI.forEach(ci)):Z(`invalid state: ${hn}`);return Cd}}(p=>{l().then(p)});function qI(l){return l>>>=0,Nd(async()=>{var p=await Ft(l);return Yt(p)})}var As=[],KI=l=>{var p=As.length;return As.push(l),p},XI=(l,p)=>{for(var h=Array(l),d=0;d<l;++d){var g=d,y=(A(),Q)[p+4*d>>>2>>>0],w=ws[y];if(w===void 0)throw l=`parameter ${d}`,y=Jd(y),p=lr(y),dr(y),new no(`${l} has unknown type ${p}`);h[g]=w}return h},ZI=(l,p,h)=>{var d=[];return l=l(d,h),d.length&&((A(),Q)[p>>>2>>>0]=Yt(d)),l},JI={},hi=l=>{var p=JI[l];return p===void 0?lr(l):p};function YI(l,p,h){var[d,...g]=XI(l,p>>>0);p=d.qj.bind(d);var y=g.map($=>$.pj.bind($));l--;var w={toValue:Ft};switch(l=y.map(($,P)=>{var k=`argFromPtr${P}`;return w[k]=$,`${k}(args${P?"+"+8*P:""})`}),h){case 0:var T="toValue(handle)";break;case 2:T="new (toValue(handle))";break;case 3:T="";break;case 1:w.getStringOrSymbol=hi,T="toValue(handle)[getStringOrSymbol(methodName)]"}return T+=`(${l})`,d.Vj||(w.toReturnWire=p,w.emval_returnValue=ZI,T=`return emval_returnValue(toReturnWire, destructorsRef, ${T})`),T=`return function (handle, methodName, destructorsRef, args) {
  ${T}
  }`,h=new Function(Object.keys(w),T)(...Object.values(w)),T=`methodCaller<(${g.map($=>$.name)}) => ${d.name}>`,KI(Object.defineProperty(h,"name",{value:T}))}function QI(l,p){return p>>>=0,(l=Ft(l>>>0))==Ft(p)}function eS(l){return(l>>>=0)?(l=hi(l),Yt(globalThis[l])):Yt(globalThis)}function tS(l){return l=hi(l>>>0),Yt(e[l])}function rS(l,p){return p>>>=0,l=Ft(l>>>0),p=Ft(p),Yt(l[p])}function nS(l){9<(l>>>=0)&&(Dn[l+1]+=1)}function Ld(l,p,h,d,g){return As[l>>>0](p>>>0,h>>>0,d>>>0,g>>>0)}function oS(l,p,h,d,g){return Ld(l>>>0,p>>>0,h>>>0,d>>>0,g>>>0)}function iS(){return Yt([])}function aS(l){l=Ft(l>>>0);for(var p=Array(l.length),h=0;h<l.length;h++)p[h]=l[h];return Yt(p)}function sS(l){return Yt(hi(l>>>0))}function uS(){return Yt({})}function lS(l){for(var p=Ft(l>>>=0);p.length;){var h=p.pop();p.pop()(h)}vs(l)}function cS(l,p,h){p>>>=0,h>>>=0,l=Ft(l>>>0),p=Ft(p),h=Ft(h),l[p]=h}function dS(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(A(),j)[p>>>2>>>0]=l.getUTCSeconds(),(A(),j)[p+4>>>2>>>0]=l.getUTCMinutes(),(A(),j)[p+8>>>2>>>0]=l.getUTCHours(),(A(),j)[p+12>>>2>>>0]=l.getUTCDate(),(A(),j)[p+16>>>2>>>0]=l.getUTCMonth(),(A(),j)[p+20>>>2>>>0]=l.getUTCFullYear()-1900,(A(),j)[p+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(A(),j)[p+28>>>2>>>0]=l}var Rd=l=>l%4==0&&(l%100!=0||l%400==0),zd=[0,31,60,91,121,152,182,213,244,274,305,335],Md=[0,31,59,90,120,151,181,212,243,273,304,334];function pS(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),(A(),j)[p>>>2>>>0]=l.getSeconds(),(A(),j)[p+4>>>2>>>0]=l.getMinutes(),(A(),j)[p+8>>>2>>>0]=l.getHours(),(A(),j)[p+12>>>2>>>0]=l.getDate(),(A(),j)[p+16>>>2>>>0]=l.getMonth(),(A(),j)[p+20>>>2>>>0]=l.getFullYear()-1900,(A(),j)[p+24>>>2>>>0]=l.getDay();var h=(Rd(l.getFullYear())?zd:Md)[l.getMonth()]+l.getDate()-1|0;(A(),j)[p+28>>>2>>>0]=h,(A(),j)[p+36>>>2>>>0]=-60*l.getTimezoneOffset(),h=new Date(l.getFullYear(),6,1).getTimezoneOffset();var d=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(h!=d&&l.getTimezoneOffset()==Math.min(d,h)),(A(),j)[p+32>>>2>>>0]=l}function fS(l){l>>>=0;var p=new Date((A(),j)[l+20>>>2>>>0]+1900,(A(),j)[l+16>>>2>>>0],(A(),j)[l+12>>>2>>>0],(A(),j)[l+8>>>2>>>0],(A(),j)[l+4>>>2>>>0],(A(),j)[l>>>2>>>0],0),h=(A(),j)[l+32>>>2>>>0],d=p.getTimezoneOffset(),g=new Date(p.getFullYear(),6,1).getTimezoneOffset(),y=new Date(p.getFullYear(),0,1).getTimezoneOffset(),w=Math.min(y,g);return 0>h?(A(),j)[l+32>>>2>>>0]=+(g!=y&&w==d):0<h!=(w==d)&&(g=Math.max(y,g),p.setTime(p.getTime()+6e4*((0<h?w:g)-d))),(A(),j)[l+24>>>2>>>0]=p.getDay(),h=(Rd(p.getFullYear())?zd:Md)[p.getMonth()]+p.getDate()-1|0,(A(),j)[l+28>>>2>>>0]=h,(A(),j)[l>>>2>>>0]=p.getSeconds(),(A(),j)[l+4>>>2>>>0]=p.getMinutes(),(A(),j)[l+8>>>2>>>0]=p.getHours(),(A(),j)[l+12>>>2>>>0]=p.getDate(),(A(),j)[l+16>>>2>>>0]=p.getMonth(),(A(),j)[l+20>>>2>>>0]=p.getYear(),l=p.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function Bd(l,p,h,d,g,y,w){return o?Je(16,1,l,p,h,d,g,y,w):-52}function Fd(l,p,h,d,g,y){if(o)return Je(17,1,l,p,h,d,g,y)}var So={},hS=()=>performance.timeOrigin+performance.now();function Vd(l,p){if(o)return Je(18,1,l,p);if(So[l]&&(clearTimeout(So[l].id),delete So[l]),!p)return 0;var h=setTimeout(()=>{delete So[l],ci(()=>rp(l,performance.timeOrigin+performance.now()))},p);return So[l]={id:h,rk:p},0}function mS(l,p,h,d){l>>>=0,p>>>=0,h>>>=0,d>>>=0;var g=new Date().getFullYear(),y=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var w=Math.max(y,g);(A(),Q)[l>>>2>>>0]=60*w,(A(),j)[p>>>2>>>0]=+(y!=g),l=(p=T=>{var $=Math.abs(T);return`UTC${0<=T?"-":"+"}${String(Math.floor($/60)).padStart(2,"0")}${String($%60).padStart(2,"0")}`})(y),p=p(g),g<y?(fn(l,h,17),fn(p,d,17)):(fn(l,d,17),fn(p,h,17))}var gS=()=>Date.now(),bS=1;function yS(l,p,h){if(h>>>=0,!(0<=l&&3>=l))return 28;if(l===0)l=Date.now();else{if(!bS)return 52;l=performance.timeOrigin+performance.now()}return l=Math.round(1e6*l),(A(),ce)[h>>>3>>>0]=BigInt(l),0}var Os=[],Gd=(l,p)=>{Os.length=0;for(var h;h=(A(),le)[l++>>>0];){var d=h!=105;p+=(d&=h!=112)&&p%8?4:0,Os.push(h==112?(A(),Q)[p>>>2>>>0]:h==106?(A(),ce)[p>>>3>>>0]:h==105?(A(),j)[p>>>2>>>0]:(A(),he)[p>>>3>>>0]),p+=d?8:4}return Os};function _S(l,p,h){return l>>>=0,p=Gd(p>>>0,h>>>0),Rs[l](...p)}function wS(l,p,h){return l>>>=0,p=Gd(p>>>0,h>>>0),Rs[l](...p)}var vS=()=>{};function xS(l,p){return N(at(l>>>0,p>>>0))}var TS=()=>{throw Lt+=1,"unwind"};function IS(){return 4294901760}var SS=()=>navigator.hardwareConcurrency,kn={},mi=l=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(l))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(l))?2147483648|+p[1]:0},Ud=l=>{for(var p of l)(l=mi(p))&&(kn[l]=p)};function $S(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),Ud(l),kn.Mj=mi(l[3]),kn.ek=l,kn.Mj}function gi(l){if(!(l=kn[l>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(l))l=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(l))l=p[1];else{if(!(p=/^(.+?)@/.exec(l)))return 0;l=p[1]}dr(gi.Nj??0),p=li(l)+1;var h=$o(p);return h&&fn(l,h,p),gi.Nj=h,gi.Nj}function AS(l){l>>>=0;var p=(A(),le).length;if(l<=p||4294901760<l)return!1;for(var h=1;4>=h;h*=2){var d=p*(1+.2/h);d=Math.min(d,l+100663296);e:{d=(Math.min(4294901760,65536*Math.ceil(Math.max(l,d)/65536))-pn.buffer.byteLength+65535)/65536|0;try{pn.grow(d),It();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}function OS(l,p,h){if(l>>>=0,p>>>=0,kn.Mj==l)var d=kn.ek;else(d=Error().stack.toString().split(`
`))[0]=="Error"&&d.shift(),Ud(d);for(var g=3;d[g]&&mi(d[g])!=l;)++g;for(l=0;l<h&&d[l+g];++l)(A(),j)[p+4*l>>>2>>>0]=mi(d[l+g]);return l}var Ps,Es={},Wd=()=>{if(!Ps){var l,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in Es)Es[l]===void 0?delete p[l]:p[l]=Es[l];var h=[];for(l in p)h.push(`${l}=${p[l]}`);Ps=h}return Ps};function Hd(l,p){if(o)return Je(19,1,l,p);l>>>=0,p>>>=0;var h,d=0,g=0;for(h of Wd()){var y=p+d;(A(),Q)[l+g>>>2>>>0]=y,d+=fn(h,y,1/0)+1,g+=4}return 0}function jd(l,p){if(o)return Je(20,1,l,p);l>>>=0,p>>>=0;var h=Wd();for(var d of((A(),Q)[l>>>2>>>0]=h.length,l=0,h))l+=li(d)+1;return(A(),Q)[p>>>2>>>0]=l,0}function qd(l){return o?Je(21,1,l):52}function Kd(l,p,h,d){return o?Je(22,1,l,p,h,d):52}function Xd(l,p,h,d){return o?Je(23,1,l,p,h,d):70}var PS=[null,[],[]];function Zd(l,p,h,d){if(o)return Je(24,1,l,p,h,d);p>>>=0,h>>>=0,d>>>=0;for(var g=0,y=0;y<h;y++){var w=(A(),Q)[p>>>2>>>0],T=(A(),Q)[p+4>>>2>>>0];p+=8;for(var $=0;$<T;$++){var P=l,k=(A(),le)[w+$>>>0],F=PS[P];k===0||k===10?((P===1?D:N)(hd(F)),F.length=0):F.push(k)}g+=T}return(A(),Q)[d>>>2>>>0]=g,0}function ES(l){return l>>>0}o||function(){for(var l=e.numThreads-1;l--;)sd();mt.push(async()=>{var p=async function(){if(!o)return Promise.all(dn.map(ad))}();Me++,await p,--Me==0&&Ye&&(p=Ye,Ye=null,p())})}(),o||(pn=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),It()),e.wasmBinary&&(b=e.wasmBinary),e.stackSave=()=>M(),e.stackRestore=l=>z(l),e.stackAlloc=l=>ks(l),e.setValue=function(l,p,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":(A(),Y)[l>>>0]=p;break;case"i16":(A(),ae)[l>>>1>>>0]=p;break;case"i32":(A(),j)[l>>>2>>>0]=p;break;case"i64":(A(),ce)[l>>>3>>>0]=BigInt(p);break;case"float":(A(),de)[l>>>2>>>0]=p;break;case"double":(A(),he)[l>>>3>>>0]=p;break;case"*":(A(),Q)[l>>>2>>>0]=p;break;default:Z(`invalid type for setValue: ${h}`)}},e.getValue=function(l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(A(),Y)[l>>>0];case"i16":return(A(),ae)[l>>>1>>>0];case"i32":return(A(),j)[l>>>2>>>0];case"i64":return(A(),ce)[l>>>3>>>0];case"float":return(A(),de)[l>>>2>>>0];case"double":return(A(),he)[l>>>3>>>0];case"*":return(A(),Q)[l>>>2>>>0];default:Z(`invalid type for getValue: ${p}`)}},e.UTF8ToString=at,e.stringToUTF8=fn,e.lengthBytesUTF8=li;var Jd,Yd,bi,dr,$o,Cs,Qd,ep,tp,Ds,rp,np,B,Ao,op,z,ks,M,ip,Ns,ap,sp,up,Ls,lp,cp,dp,pp,fp,hp,mp,gp,bp,yp,_p,wp,vp,xp,Tp,Ip,Sp,$p,Ap,Op,Pp,Ep,Cp,Dp,kp,Np,Lp,Rp,zp,Mp,Bp,Fp,Vp,Gp,Up,Wp,Hp,jp,qp,Kp,Xp,Zp,Jp,Yp,Qp,ef,tf,rf,nf,of,af,sf,uf,lf,cf,df,pf,ff,hf,mf,gf,bf,yf,_f,wf,vf,xf,Tf,If,Sf,$f,Af,Of,Pf,Ef,Cf,Df,kf,Nf,Lf,Rf,zf,Mf,Bf,Ff,Vf,Gf,Uf,Wf,Hf,jf,qf,Kf,Xf,Zf,Jf,Yf,Qf,eh,th,rh,nh,oh,ih,ah,sh,uh,lh,ch,dh,ph,fh,hh,mh,gh,bh,yh,_h,wh,vh,xh,Th,Ih,Sh,$h,Ah,Oh,Ph,Eh,Ch,Dh,kh,Nh,Lh,Rh,zh,Mh,Bh,Fh,Vh,Gh,Uh,Wh,Hh,jh,qh,Kh,Xh,Zh,Jh,Yh,Qh,em,tm,rm,nm,om,im,am,sm,um,lm,cm,dm,pm,fm,hm,mm,gm,bm,ym,_m,wm,vm,xm,Tm,Im,Sm,$m,Am,Om,Pm,Em,Cm,Dm,km,Nm,Lm,Rm,zm,Mm,Bm,Fm,Vm,Gm,Um,Wm,Hm,jm,qm,Km,Xm,Zm,Jm,Ym,Qm,eg,tg,rg,ng,on,CS=[ii,rd,cd,md,gd,bd,yd,_d,wd,vd,xd,Td,Id,Sd,$d,Ad,Bd,Fd,Vd,Hd,jd,qd,Kd,Xd,Zd],Rs={1589140:(l,p,h,d,g)=>{if(e===void 0||!e.zj)return 1;if((l=at(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=e.zj.get(l)))return 2;if(p=Number(p>>>0),h=Number(h>>>0),d=Number(d>>>0),p+h>l.byteLength)return 3;try{let y=l.subarray(p,p+h);switch(g){case 0:(A(),le).set(y,d>>>0);break;case 1:e.lk?e.lk(d,y):e.dk(d,y);break;default:return 4}return 0}catch{return 4}},1589964:(l,p,h)=>{e.Qj(l,(A(),le).subarray(p>>>0,p+h>>>0))},1590028:()=>e.nk(),1590070:l=>{e.Pj(l)},1590107:()=>{e.Xj()},1590138:()=>{e.Yj()},1590167:()=>{e.bk()},1590192:l=>e.Wj(l),1590225:l=>e.$j(l),1590257:(l,p,h)=>{e.Lj(Number(l),Number(p),Number(h),!0)},1590320:(l,p,h)=>{e.Lj(Number(l),Number(p),Number(h))},1590377:()=>typeof wasmOffsetConverter<"u",1590434:l=>{e.kf("Abs",l,void 0)},1590485:l=>{e.kf("Neg",l,void 0)},1590536:l=>{e.kf("Floor",l,void 0)},1590589:l=>{e.kf("Ceil",l,void 0)},1590641:l=>{e.kf("Reciprocal",l,void 0)},1590699:l=>{e.kf("Sqrt",l,void 0)},1590751:l=>{e.kf("Exp",l,void 0)},1590802:l=>{e.kf("Erf",l,void 0)},1590853:l=>{e.kf("Sigmoid",l,void 0)},1590908:(l,p,h)=>{e.kf("HardSigmoid",l,{alpha:p,beta:h})},1590987:l=>{e.kf("Log",l,void 0)},1591038:l=>{e.kf("Sin",l,void 0)},1591089:l=>{e.kf("Cos",l,void 0)},1591140:l=>{e.kf("Tan",l,void 0)},1591191:l=>{e.kf("Asin",l,void 0)},1591243:l=>{e.kf("Acos",l,void 0)},1591295:l=>{e.kf("Atan",l,void 0)},1591347:l=>{e.kf("Sinh",l,void 0)},1591399:l=>{e.kf("Cosh",l,void 0)},1591451:l=>{e.kf("Asinh",l,void 0)},1591504:l=>{e.kf("Acosh",l,void 0)},1591557:l=>{e.kf("Atanh",l,void 0)},1591610:l=>{e.kf("Tanh",l,void 0)},1591662:l=>{e.kf("Not",l,void 0)},1591713:(l,p,h)=>{e.kf("Clip",l,{min:p,max:h})},1591782:l=>{e.kf("Clip",l,void 0)},1591834:(l,p)=>{e.kf("Elu",l,{alpha:p})},1591892:l=>{e.kf("Gelu",l,void 0)},1591944:l=>{e.kf("Relu",l,void 0)},1591996:(l,p)=>{e.kf("LeakyRelu",l,{alpha:p})},1592060:(l,p)=>{e.kf("ThresholdedRelu",l,{alpha:p})},1592130:(l,p)=>{e.kf("Cast",l,{to:p})},1592188:l=>{e.kf("Add",l,void 0)},1592239:l=>{e.kf("Sub",l,void 0)},1592290:l=>{e.kf("Mul",l,void 0)},1592341:l=>{e.kf("Div",l,void 0)},1592392:l=>{e.kf("Pow",l,void 0)},1592443:l=>{e.kf("Equal",l,void 0)},1592496:l=>{e.kf("Greater",l,void 0)},1592551:l=>{e.kf("GreaterOrEqual",l,void 0)},1592613:l=>{e.kf("Less",l,void 0)},1592665:l=>{e.kf("LessOrEqual",l,void 0)},1592724:(l,p,h,d,g)=>{e.kf("ReduceMean",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1592899:(l,p,h,d,g)=>{e.kf("ReduceMax",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593073:(l,p,h,d,g)=>{e.kf("ReduceMin",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593247:(l,p,h,d,g)=>{e.kf("ReduceProd",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593422:(l,p,h,d,g)=>{e.kf("ReduceSum",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593596:(l,p,h,d,g)=>{e.kf("ReduceL1",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593769:(l,p,h,d,g)=>{e.kf("ReduceL2",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1593942:(l,p,h,d,g)=>{e.kf("ReduceLogSum",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1594119:(l,p,h,d,g)=>{e.kf("ReduceSumSquare",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1594299:(l,p,h,d,g)=>{e.kf("ReduceLogSumExp",l,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1594479:l=>{e.kf("Where",l,void 0)},1594532:(l,p,h)=>{e.kf("Transpose",l,{perm:p?Array.from((A(),j).subarray(Number(p)>>>0,Number(h)>>>0)):[]})},1594656:(l,p,h,d)=>{e.kf("DepthToSpace",l,{blocksize:p,mode:at(h),format:d?"NHWC":"NCHW"})},1594789:(l,p,h,d)=>{e.kf("DepthToSpace",l,{blocksize:p,mode:at(h),format:d?"NHWC":"NCHW"})},1594922:(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)=>{e.kf("ConvTranspose",l,{format:$?"NHWC":"NCHW",autoPad:p,dilations:[h],group:d,kernelShape:[g],pads:[y,w],strides:[T],wIsConst:()=>!!(A(),Y)[P>>>0],outputPadding:k?Array.from((A(),j).subarray(Number(k)>>>0,Number(F)>>>0)):[],outputShape:G?Array.from((A(),j).subarray(Number(G)>>>0,Number(q)>>>0)):[],activation:at(K)})},1595355:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("ConvTranspose",l,{format:T?"NHWC":"NCHW",autoPad:p,dilations:Array.from((A(),j).subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:d,kernelShape:Array.from((A(),j).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from((A(),j).subarray(Number(y)>>>0,4+(Number(y)>>>0)>>>0)),strides:Array.from((A(),j).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),wIsConst:()=>!!(A(),Y)[$>>>0],outputPadding:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],outputShape:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[],activation:at(q)})},1596016:(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)=>{e.kf("ConvTranspose",l,{format:$?"NHWC":"NCHW",autoPad:p,dilations:[h],group:d,kernelShape:[g],pads:[y,w],strides:[T],wIsConst:()=>!!(A(),Y)[P>>>0],outputPadding:k?Array.from((A(),j).subarray(Number(k)>>>0,Number(F)>>>0)):[],outputShape:G?Array.from((A(),j).subarray(Number(G)>>>0,Number(q)>>>0)):[],activation:at(K)})},1596449:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("ConvTranspose",l,{format:T?"NHWC":"NCHW",autoPad:p,dilations:Array.from((A(),j).subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:d,kernelShape:Array.from((A(),j).subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from((A(),j).subarray(Number(y)>>>0,4+(Number(y)>>>0)>>>0)),strides:Array.from((A(),j).subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),wIsConst:()=>!!(A(),Y)[$>>>0],outputPadding:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],outputShape:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[],activation:at(q)})},1597110:(l,p)=>{e.kf("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1597201:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("AveragePool",l,{format:q?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:d,storage_order:g,dilations:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[],kernel_shape:T?Array.from((A(),j).subarray(Number(T)>>>0,Number($)>>>0)):[],pads:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],strides:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[]})},1597680:(l,p)=>{e.kf("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},1597771:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("AveragePool",l,{format:q?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:d,storage_order:g,dilations:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[],kernel_shape:T?Array.from((A(),j).subarray(Number(T)>>>0,Number($)>>>0)):[],pads:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],strides:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[]})},1598250:(l,p)=>{e.kf("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1598337:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("MaxPool",l,{format:q?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:d,storage_order:g,dilations:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[],kernel_shape:T?Array.from((A(),j).subarray(Number(T)>>>0,Number($)>>>0)):[],pads:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],strides:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[]})},1598812:(l,p)=>{e.kf("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},1598899:(l,p,h,d,g,y,w,T,$,P,k,F,G,q)=>{e.kf("MaxPool",l,{format:q?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:d,storage_order:g,dilations:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[],kernel_shape:T?Array.from((A(),j).subarray(Number(T)>>>0,Number($)>>>0)):[],pads:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],strides:F?Array.from((A(),j).subarray(Number(F)>>>0,Number(G)>>>0)):[]})},1599374:(l,p,h,d,g)=>{e.kf("Gemm",l,{alpha:p,beta:h,transA:d,transB:g})},1599478:l=>{e.kf("MatMul",l,void 0)},1599532:(l,p,h,d)=>{e.kf("ArgMax",l,{keepDims:!!p,selectLastIndex:!!h,axis:d})},1599640:(l,p,h,d)=>{e.kf("ArgMin",l,{keepDims:!!p,selectLastIndex:!!h,axis:d})},1599748:(l,p)=>{e.kf("Softmax",l,{axis:p})},1599811:(l,p)=>{e.kf("Concat",l,{axis:p})},1599871:(l,p,h,d,g)=>{e.kf("Split",l,{axis:p,numOutputs:h,splitSizes:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1600027:l=>{e.kf("Expand",l,void 0)},1600081:(l,p)=>{e.kf("Gather",l,{axis:Number(p)})},1600152:(l,p)=>{e.kf("GatherElements",l,{axis:Number(p)})},1600231:(l,p)=>{e.kf("GatherND",l,{batch_dims:Number(p)})},1600310:(l,p,h,d,g,y,w,T,$,P,k)=>{e.kf("Resize",l,{antialias:p,axes:h?Array.from((A(),j).subarray(Number(h)>>>0,Number(d)>>>0)):[],coordinateTransformMode:at(g),cubicCoeffA:y,excludeOutside:w,extrapolationValue:T,keepAspectRatioPolicy:at($),mode:at(P),nearestMode:at(k)})},1600672:(l,p,h,d,g,y,w)=>{e.kf("Slice",l,{starts:p?Array.from((A(),j).subarray(Number(p)>>>0,Number(h)>>>0)):[],ends:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[],axes:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1600936:l=>{e.kf("Tile",l,void 0)},1600988:(l,p,h)=>{e.kf("InstanceNormalization",l,{epsilon:p,format:h?"NHWC":"NCHW"})},1601102:(l,p,h)=>{e.kf("InstanceNormalization",l,{epsilon:p,format:h?"NHWC":"NCHW"})},1601216:l=>{e.kf("Range",l,void 0)},1601269:(l,p)=>{e.kf("Einsum",l,{equation:at(p)})},1601350:(l,p,h,d,g)=>{e.kf("Pad",l,{mode:p,value:h,pads:d?Array.from((A(),j).subarray(Number(d)>>>0,Number(g)>>>0)):[]})},1601493:(l,p,h,d,g,y)=>{e.kf("BatchNormalization",l,{epsilon:p,momentum:h,spatial:!!g,trainingMode:!!d,format:y?"NHWC":"NCHW"})},1601662:(l,p,h,d,g,y)=>{e.kf("BatchNormalization",l,{epsilon:p,momentum:h,spatial:!!g,trainingMode:!!d,format:y?"NHWC":"NCHW"})},1601831:(l,p,h)=>{e.kf("CumSum",l,{exclusive:Number(p),reverse:Number(h)})},1601928:(l,p,h)=>{e.kf("DequantizeLinear",l,{axis:p,blockSize:h})},1602018:(l,p,h,d,g)=>{e.kf("GridSample",l,{align_corners:p,mode:at(h),padding_mode:at(d),format:g?"NHWC":"NCHW"})},1602188:(l,p,h,d,g)=>{e.kf("GridSample",l,{align_corners:p,mode:at(h),padding_mode:at(d),format:g?"NHWC":"NCHW"})},1602358:(l,p)=>{e.kf("ScatterND",l,{reduction:at(p)})},1602443:(l,p,h,d,g,y,w,T,$)=>{e.kf("Attention",l,{numHeads:p,isUnidirectional:h,maskFilterValue:d,scale:g,doRotary:y,qkvHiddenSizes:w?Array.from((A(),j).subarray(Number(T)>>>0,Number(T)+w>>>0)):[],pastPresentShareBuffer:!!$})},1602715:l=>{e.kf("BiasAdd",l,void 0)},1602770:l=>{e.kf("BiasSplitGelu",l,void 0)},1602831:l=>{e.kf("FastGelu",l,void 0)},1602887:(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)=>{e.kf("Conv",l,{format:F?"NHWC":"NCHW",auto_pad:p,dilations:h?Array.from((A(),j).subarray(Number(h)>>>0,Number(d)>>>0)):[],group:g,kernel_shape:y?Array.from((A(),j).subarray(Number(y)>>>0,Number(w)>>>0)):[],pads:T?Array.from((A(),j).subarray(Number(T)>>>0,Number($)>>>0)):[],strides:P?Array.from((A(),j).subarray(Number(P)>>>0,Number(k)>>>0)):[],w_is_const:()=>!!(A(),Y)[Number(G)>>>0],activation:at(q),activation_params:K?Array.from((A(),de).subarray(Number(K)>>>0,Number(ne)>>>0)):[]})},1603471:l=>{e.kf("Gelu",l,void 0)},1603523:(l,p,h,d,g,y,w,T,$)=>{e.kf("GroupQueryAttention",l,{numHeads:p,kvNumHeads:h,scale:d,softcap:g,doRotary:y,rotaryInterleaved:w,smoothSoftmax:T,localWindowSize:$})},1603740:(l,p,h,d)=>{e.kf("LayerNormalization",l,{axis:p,epsilon:h,simplified:!!d})},1603851:(l,p,h,d)=>{e.kf("LayerNormalization",l,{axis:p,epsilon:h,simplified:!!d})},1603962:(l,p,h,d,g,y)=>{e.kf("MatMulNBits",l,{k:p,n:h,accuracyLevel:d,bits:g,blockSize:y})},1604089:(l,p,h,d,g,y)=>{e.kf("MultiHeadAttention",l,{numHeads:p,isUnidirectional:h,maskFilterValue:d,scale:g,doRotary:y})},1604248:(l,p)=>{e.kf("QuickGelu",l,{alpha:p})},1604312:(l,p,h,d,g)=>{e.kf("RotaryEmbedding",l,{interleaved:!!p,numHeads:h,rotaryEmbeddingDim:d,scale:g})},1604451:(l,p,h)=>{e.kf("SkipLayerNormalization",l,{epsilon:p,simplified:!!h})},1604553:(l,p,h)=>{e.kf("SkipLayerNormalization",l,{epsilon:p,simplified:!!h})},1604655:(l,p,h,d)=>{e.kf("GatherBlockQuantized",l,{gatherAxis:p,quantizeAxis:h,blockSize:d})},1604776:l=>{e.ak(l)},1604810:(l,p)=>e.ck(Number(l),Number(p),e.Cj.fk,e.Cj.errors)};function DS(l,p,h){return Nd(async()=>{await e.Zj(Number(l),Number(p),Number(h))})}function kS(){return typeof wasmOffsetConverter<"u"}function NS(l,p,h,d){var g=M();try{return dp(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function LS(l,p,h){var d=M();try{return lp(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function RS(l,p,h){var d=M();try{cp(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function zS(l,p){var h=M();try{return Ls(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function MS(l){var p=M();try{up(l)}catch(h){if(z(p),h!==h+0)throw h;B(1,0)}}function BS(l,p,h,d,g,y,w){var T=M();try{return fp(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function FS(l,p){var h=M();try{bp(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function VS(l,p,h,d,g,y){var w=M();try{mp(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function GS(l,p,h,d){var g=M();try{hp(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function US(l,p,h,d,g){var y=M();try{pp(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function WS(l,p,h,d,g,y,w){var T=M();try{_p(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function HS(l,p,h,d,g,y,w){var T=M();try{wp(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function jS(l,p,h,d,g){var y=M();try{return yp(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function qS(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{vp(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function KS(l,p,h,d,g,y){var w=M();try{return Ip(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function XS(l,p,h){var d=M();try{return Ep(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;return B(1,0),0n}}function ZS(l,p,h,d,g,y,w,T,$){var P=M();try{gp(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function JS(l){var p=M();try{return Cp(l)}catch(h){if(z(p),h!==h+0)throw h;B(1,0)}}function YS(l,p,h){var d=M();try{return Ap(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function QS(l,p){var h=M();try{return zp(l,p)}catch(d){if(z(h),d!==d+0)throw d;return B(1,0),0n}}function e$(l,p,h,d,g){var y=M();try{Dp(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function t$(l,p,h,d,g){var y=M();try{Sp(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function r$(l,p,h){var d=M();try{$p(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function n$(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{Lp(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function o$(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{Mp(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function i$(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{return Bp(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function a$(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{Fp(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function s$(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne){var ue=M();try{Vp(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)}catch(ge){if(z(ue),ge!==ge+0)throw ge;B(1,0)}}function u$(l,p,h,d,g,y,w,T){var $=M();try{kp(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function l$(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{return Wp(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function c$(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{return Hp(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function d$(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{qp(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function p$(l,p,h,d){var g=M();try{Op(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function f$(l,p,h,d,g){var y=M();try{Xp(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function h$(l,p,h,d,g,y,w,T,$,P){var k=M();try{Rp(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function m$(l,p,h,d,g){var y=M();try{Up(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function g$(l,p,h,d,g,y,w,T,$){var P=M();try{return Zp(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function b$(l,p,h,d,g,y,w,T,$){var P=M();try{return xp(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function y$(l,p){var h=M();try{return Yp(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function _$(l,p){var h=M();try{return ef(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function w$(l,p,h,d){var g=M();try{rf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function v$(l,p,h,d,g,y,w){var T=M();try{Xm(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function x$(l,p,h,d,g,y,w){var T=M();try{Jp(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function T$(l,p,h,d,g,y,w,T){var $=M();try{Xh(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function I$(l,p,h,d,g,y,w,T,$,P){var k=M();try{jp(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function S$(l,p,h,d){var g=M();try{Kp(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function $$(l,p,h,d,g,y,w,T,$){var P=M();try{return Gp(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function A$(l,p,h,d,g,y,w,T){var $=M();try{return Tp(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function O$(l,p,h,d,g,y){var w=M();try{Pf(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function P$(l,p,h){var d=M();try{return nf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;return B(1,0),0n}}function E$(l,p,h,d,g){var y=M();try{of(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function C$(l,p,h,d,g){var y=M();try{return af(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function D$(l,p,h,d){var g=M();try{sf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function k$(l,p,h){var d=M();try{uf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function N$(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{lf(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function L$(l,p,h,d,g,y){var w=M();try{ph(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function R$(l,p,h,d,g,y,w,T,$){var P=M();try{Pp(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function z$(l,p){var h=M();try{return mf(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function M$(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge){var Pe=M();try{Zm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge)}catch(Ce){if(z(Pe),Ce!==Ce+0)throw Ce;B(1,0)}}function B$(l,p,h,d){var g=M();try{wf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function F$(l,p,h,d,g,y,w,T){var $=M();try{vf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function V$(l,p,h,d,g,y,w){var T=M();try{xf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function G$(l,p,h,d,g){var y=M();try{Tf(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function U$(l,p,h){var d=M();try{bf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function W$(l,p,h,d){var g=M();try{return _f(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function H$(l,p,h,d){var g=M();try{return yf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function j$(l,p,h,d){var g=M();try{gf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function q$(l,p,h,d,g,y,w,T){var $=M();try{If(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function K$(l,p,h,d){var g=M();try{return qm(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function X$(l,p,h,d,g){var y=M();try{Sf(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function Z$(l,p,h,d,g,y){var w=M();try{return pf(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function J$(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue){var ge=M();try{ff(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue)}catch(Pe){if(z(ge),Pe!==Pe+0)throw Pe;B(1,0)}}function Y$(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{return $f(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function Q$(l,p,h,d){var g=M();try{return Nf(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;return B(1,0),0n}}function eA(l,p,h,d,g,y){var w=M();try{return hf(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function tA(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{return Ef(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function rA(l,p,h,d,g,y,w,T){var $=M();try{Cf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function nA(l,p,h,d){var g=M();try{return Df(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;return B(1,0),0n}}function oA(l,p,h,d,g,y,w,T,$){var P=M();try{kf(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function iA(l,p,h,d,g,y,w){var T=M();try{Af(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function aA(l,p,h,d,g,y){var w=M();try{return Of(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function sA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{return Lf(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function uA(l,p,h,d,g,y,w){var T=M();try{return Rf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function lA(l,p,h,d,g,y){var w=M();try{return zf(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function cA(l,p){var h=M();try{return cf(l,p)}catch(d){if(z(h),d!==d+0)throw d;return B(1,0),0n}}function dA(l,p,h,d,g,y){var w=M();try{return df(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function pA(l,p,h,d,g,y,w,T){var $=M();try{return Mf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function fA(l,p,h,d,g,y,w,T,$){var P=M();try{Bf(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function hA(l,p,h,d,g,y){var w=M();try{return Ff(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function mA(l,p,h){var d=M();try{return Vf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function gA(l,p,h,d,g,y,w,T){var $=M();try{return Gf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function bA(l,p,h,d,g,y,w){var T=M();try{return Uf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function yA(l,p,h,d,g,y){var w=M();try{return Wf(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function _A(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{return Hf(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function wA(l,p,h,d,g,y,w,T){var $=M();try{return jf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function vA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{return qf(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function xA(l,p,h,d,g,y,w){var T=M();try{return Kf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function TA(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{return Xf(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function IA(l,p,h,d,g,y,w){var T=M();try{return Zf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function SA(l,p,h,d,g,y,w,T){var $=M();try{Jf(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function $A(l,p,h,d,g,y,w){var T=M();try{return Yf(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function AA(l,p,h){var d=M();try{return Qf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;return B(1,0),0n}}function OA(l,p,h,d){var g=M();try{return eh(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function PA(l,p,h,d,g,y,w){var T=M();try{th(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function EA(l,p,h,d,g,y,w,T,$){var P=M();try{rh(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function CA(l,p,h,d,g,y,w){var T=M();try{nh(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function DA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{oh(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function kA(l,p,h,d,g,y,w,T,$){var P=M();try{ah(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function NA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue){var ge=M();try{sh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue)}catch(Pe){if(z(ge),Pe!==Pe+0)throw Pe;B(1,0)}}function LA(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{uh(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function RA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{ch(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function zA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne){var ue=M();try{dh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)}catch(ge){if(z(ue),ge!==ge+0)throw ge;B(1,0)}}function MA(l,p,h,d,g,y,w,T,$){var P=M();try{fh(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function BA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{return hh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function FA(l,p,h,d,g,y,w,T,$,P){var k=M();try{return mh(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function VA(l,p){var h=M();try{gh(l,p)}catch(d){if(z(h),d!==d+0)throw d;B(1,0)}}function GA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne){var ue=M();try{vh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)}catch(ge){if(z(ue),ge!==ge+0)throw ge;B(1,0)}}function UA(l,p,h,d,g){var y=M();try{bh(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function WA(l,p,h,d,g,y,w){var T=M();try{yh(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function HA(l,p,h,d,g){var y=M();try{wh(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function jA(l,p,h,d,g,y,w,T){var $=M();try{_h(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function qA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{xh(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function KA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge){var Pe=M();try{return Th(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge)}catch(Ce){if(z(Pe),Ce!==Ce+0)throw Ce;B(1,0)}}function XA(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{Ih(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function ZA(l,p,h,d,g){var y=M();try{return Jm(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function JA(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut){var Oo=M();try{return Sh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut)}catch(an){if(z(Oo),an!==an+0)throw an;B(1,0)}}function YA(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{$h(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function QA(l,p,h,d,g,y,w){var T=M();try{return Ah(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function eO(l,p,h,d,g,y){var w=M();try{Ph(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function tO(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{Eh(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function rO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge){var Pe=M();try{Ch(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge)}catch(Ce){if(z(Pe),Ce!==Ce+0)throw Ce;B(1,0)}}function nO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue){var ge=M();try{Dh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue)}catch(Pe){if(z(ge),Pe!==Pe+0)throw Pe;B(1,0)}}function oO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne){var ue=M();try{kh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)}catch(ge){if(z(ue),ge!==ge+0)throw ge;B(1,0)}}function iO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{Nh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function aO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt){var st=M();try{Lh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt)}catch(ut){if(z(st),ut!==ut+0)throw ut;B(1,0)}}function sO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe){var Ce=M();try{Rh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe)}catch(rt){if(z(Ce),rt!==rt+0)throw rt;B(1,0)}}function uO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge){var Pe=M();try{zh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge)}catch(Ce){if(z(Pe),Ce!==Ce+0)throw Ce;B(1,0)}}function lO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt){var st=M();try{Mh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt)}catch(ut){if(z(st),ut!==ut+0)throw ut;B(1,0)}}function cO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{Bh(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function dO(l,p,h,d,g,y,w,T,$,P){var k=M();try{Fh(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function pO(l,p,h,d,g,y,w,T){var $=M();try{return Vh(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;return B(1,0),0n}}function fO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{Gh(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function hO(l,p,h,d,g,y,w,T,$,P){var k=M();try{Uh(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function mO(l,p,h,d,g,y,w,T,$){var P=M();try{Wh(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function gO(l,p,h,d,g,y,w){var T=M();try{return Oh(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function bO(l,p,h){var d=M();try{return Ym(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;return B(1,0),0n}}function yO(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{Hh(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function _O(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{qh(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function wO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{Kh(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function vO(l,p,h,d,g,y){var w=M();try{jh(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function xO(l,p,h,d,g,y,w,T){var $=M();try{Zh(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function TO(l,p,h,d,g,y,w,T,$,P){var k=M();try{Jh(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function IO(l,p,h,d){var g=M();try{return lh(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function SO(l,p,h,d,g,y,w,T,$,P){var k=M();try{Yh(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function $O(l,p,h,d,g,y){var w=M();try{Qh(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function AO(l,p,h){var d=M();try{return em(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function OO(l,p,h,d,g,y,w,T){var $=M();try{return rm(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function PO(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{nm(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function EO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{om(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function CO(l,p,h,d,g,y,w,T){var $=M();try{im(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function DO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt){var st=M();try{am(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt)}catch(ut){if(z(st),ut!==ut+0)throw ut;B(1,0)}}function kO(l,p,h,d){var g=M();try{return sm(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function NO(l,p,h){var d=M();try{return tf(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function LO(l,p,h,d,g,y,w,T,$){var P=M();try{um(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function RO(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{lm(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function zO(l,p,h,d,g,y){var w=M();try{cm(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function MO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne){var ue=M();try{return dm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne)}catch(ge){if(z(ue),ge!==ge+0)throw ge;B(1,0)}}function BO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{pm(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function FO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut,Oo){var an=M();try{fm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut,Oo)}catch(zs){if(z(an),zs!==zs+0)throw zs;B(1,0)}}function VO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{hm(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function GO(l,p,h,d,g,y,w,T,$,P){var k=M();try{mm(l,p,h,d,g,y,w,T,$,P)}catch(F){if(z(k),F!==F+0)throw F;B(1,0)}}function UO(l,p,h,d,g,y,w,T,$,P,k,F,G,q){var K=M();try{gm(l,p,h,d,g,y,w,T,$,P,k,F,G,q)}catch(ne){if(z(K),ne!==ne+0)throw ne;B(1,0)}}function WO(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{bm(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function HO(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{ym(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function jO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{_m(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function qO(l,p,h,d,g,y,w){var T=M();try{wm(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function KO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce){var rt=M();try{Im(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce)}catch(st){if(z(rt),st!==st+0)throw st;B(1,0)}}function XO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt){var st=M();try{Qm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt)}catch(ut){if(z(st),ut!==ut+0)throw ut;B(1,0)}}function ZO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce){var rt=M();try{Tm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce)}catch(st){if(z(rt),st!==st+0)throw st;B(1,0)}}function JO(l,p,h,d,g,y,w,T,$,P,k,F,G){var q=M();try{vm(l,p,h,d,g,y,w,T,$,P,k,F,G)}catch(K){if(z(q),K!==K+0)throw K;B(1,0)}}function YO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe){var Ce=M();try{xm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe)}catch(rt){if(z(Ce),rt!==rt+0)throw rt;B(1,0)}}function QO(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{tm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function eP(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge){var Pe=M();try{Sm(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge)}catch(Ce){if(z(Pe),Ce!==Ce+0)throw Ce;B(1,0)}}function tP(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{$m(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function rP(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut){var Oo=M();try{return Am(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K,ne,ue,ge,Pe,Ce,rt,st,ut)}catch(an){if(z(Oo),an!==an+0)throw an;B(1,0)}}function nP(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K){var ne=M();try{Om(l,p,h,d,g,y,w,T,$,P,k,F,G,q,K)}catch(ue){if(z(ne),ue!==ue+0)throw ue;B(1,0)}}function oP(l,p,h,d,g,y,w){var T=M();try{Pm(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function iP(l,p,h,d,g){var y=M();try{Em(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function aP(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{Cm(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function sP(l,p,h,d,g,y,w){var T=M();try{Dm(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function uP(l,p,h,d,g){var y=M();try{km(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function lP(l,p,h,d,g,y,w,T,$,P,k,F){var G=M();try{ih(l,p,h,d,g,y,w,T,$,P,k,F)}catch(q){if(z(G),q!==q+0)throw q;B(1,0)}}function cP(l,p,h,d,g,y){var w=M();try{return Nm(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function dP(l,p,h,d,g){var y=M();try{return Lm(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function pP(l,p,h,d,g,y,w,T){var $=M();try{return Rm(l,p,h,d,g,y,w,T)}catch(P){if(z($),P!==P+0)throw P;B(1,0)}}function fP(l,p,h,d,g,y,w,T,$,P,k){var F=M();try{zm(l,p,h,d,g,y,w,T,$,P,k)}catch(G){if(z(F),G!==G+0)throw G;B(1,0)}}function hP(l,p,h,d,g,y){var w=M();try{return Mm(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function mP(l,p,h,d,g){var y=M();try{return Fm(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function gP(l,p,h,d,g,y,w,T,$){var P=M();try{Bm(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function bP(l,p,h,d,g,y){var w=M();try{return Vm(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;return B(1,0),0n}}function yP(l,p,h,d,g,y,w){var T=M();try{return Gm(l,p,h,d,g,y,w)}catch($){if(z(T),$!==$+0)throw $;B(1,0)}}function _P(l,p,h,d,g,y,w,T,$){var P=M();try{return Um(l,p,h,d,g,y,w,T,$)}catch(k){if(z(P),k!==k+0)throw k;B(1,0)}}function wP(l,p,h,d,g){var y=M();try{return Wm(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;B(1,0)}}function vP(l){var p=M();try{return Np(l)}catch(h){if(z(p),h!==h+0)throw h;return B(1,0),0n}}function xP(l,p,h,d,g,y){var w=M();try{return Hm(l,p,h,d,g,y)}catch(T){if(z(w),T!==T+0)throw T;B(1,0)}}function TP(l,p,h,d,g){var y=M();try{return jm(l,p,h,d,g)}catch(w){if(z(y),w!==w+0)throw w;return B(1,0),0n}}function IP(l,p,h,d){var g=M();try{return Km(l,p,h,d)}catch(y){if(z(g),y!==y+0)throw y;B(1,0)}}function SP(l,p,h){var d=M();try{return Qp(l,p,h)}catch(g){if(z(d),g!==g+0)throw g;B(1,0)}}function yi(){if(0<Me)Ye=yi;else if(o)x?.(e),Xe();else{for(var l=mt;0<l.length;)l.shift()(e);0<Me?Ye=yi:(e.calledRun=!0,R||(Xe(),x?.(e)))}}return o||(on=await Ge(),yi()),e.PTR_SIZE=4,ke?e:new Promise((l,p)=>{x=l,O=p})}var A4,O4,bv=U(()=>{"use strict";A4=mv,O4=globalThis.self?.name?.startsWith("em-pthread");O4&&mv()});var wv,mc,P4,Bt,vv,hc,E4,C4,xv,D4,yv,Tv,_v,Iv,$a=U(()=>{"use strict";Sa();wv=typeof location>"u"?void 0:location.origin,mc=import.meta.url>"file:"&&import.meta.url<"file;",P4=()=>{if(!!1){if(mc){let n=URL;return new URL(new n("ort.all.bundle.min.mjs",import.meta.url).href,wv).href}return import.meta.url}},Bt=P4(),vv=()=>{if(Bt&&!Bt.startsWith("blob:"))return Bt.substring(0,Bt.lastIndexOf("/")+1)},hc=(n,e)=>{try{let r=e??Bt;return(r?new URL(n,r):new URL(n)).origin===wv}catch{return!1}},E4=(n,e)=>{let r=e??Bt;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},C4=(n,e)=>`${e??"./"}${n}`,xv=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},D4=async n=>(await import(/*webpackIgnore:true*/ /*@vite-ignore*/n)).default,yv=(hv(),oo(fv)).default,Tv=async()=>{if(!Bt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(hc(Bt))return[void 0,yv()];let n=await xv(Bt);return[n,yv(n)]},_v=(bv(),oo(gv)).default,Iv=async(n,e,r,t)=>{let o=_v&&!(n||e);if(o)if(Bt)o=hc(Bt)||t&&!r;else if(t&&!r)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,_v];{let i="ort-wasm-simd-threaded.jsep.mjs",a=n??E4(i,e),s=!!1&&r&&a&&!hc(a,e),u=s?await xv(a):a??C4(i,e);return[s?u:void 0,await D4(u)]}}});var gc,bc,La,Sv,k4,N4,L4,Aa,je,$n=U(()=>{"use strict";$a();bc=!1,La=!1,Sv=!1,k4=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},N4=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},L4=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Aa=async n=>{if(bc)return Promise.resolve();if(La)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Sv)throw new Error("previous call to 'initializeWebAssembly()' failed.");La=!0;let e=n.initTimeout,r=n.numThreads;if(n.simd!==!1){if(n.simd==="relaxed"){if(!L4())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!N4())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=k4();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,c=u?.href??u,f=n.wasmBinary,[m,b]=await Iv(s,i,r>1,!!f||!!c),_=!1,v=[];if(e>0&&v.push(new Promise(x=>{setTimeout(()=>{_=!0,x()},e)})),v.push(new Promise((x,O)=>{let I={numThreads:r};if(f)I.wasmBinary=f,I.locateFile=S=>S;else if(c||i)I.locateFile=S=>c??i+S;else if(s&&s.indexOf("blob:")!==0)I.locateFile=S=>new URL(S,s).href;else if(m){let S=vv();S&&(I.locateFile=C=>S+C)}b(I).then(S=>{La=!1,bc=!0,gc=S,x(),m&&URL.revokeObjectURL(m)},S=>{La=!1,Sv=!0,O(S)})})),await Promise.race(v),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},je=()=>{if(bc&&gc)return gc;throw new Error("WebAssembly is not initialized yet.")}});var Ot,Zo,Re,Ra=U(()=>{"use strict";$n();Ot=(n,e)=>{let r=je(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Zo=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Zo(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Re=n=>{let e=je(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var $v,Av=U(()=>{"use strict";$n();Ra();$v=n=>{let e=je(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=Ot(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&Re("Can't create run options."),n?.extra!==void 0&&Zo(n.extra,"",new WeakSet,(a,s)=>{let u=Ot(a,t),c=Ot(s,t);e._OrtAddRunConfigEntry(r,u,c)!==0&&Re(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var R4,z4,M4,za,B4,F4,V4,Ov,Pv=U(()=>{"use strict";$n();Ra();R4=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},z4=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},M4=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},za=(n,e,r,t)=>{let o=Ot(e,t),i=Ot(r,t);je()._OrtAddSessionConfigEntry(n,o,i)!==0&&Re(`Can't set a session config entry: ${e} - ${r}.`)},B4=(n,e,r,t)=>{let o=Ot(e,t),i=Ot(r,t);n.push([o,i])},F4=n=>{if(!n)return"";let e=[];for(let[r,t]of Object.entries(n)){if(!r)throw new Error("WebNN freeDimensionBounds dimension name must not be empty.");if(r.includes(":")||r.includes(";"))throw new Error(`WebNN freeDimensionBounds dimension name must not include ':' or ';': ${r}`);let o=t?.minSize??1,i=t?.maxSize;if(!Number.isInteger(o)||o<1)throw new Error(`WebNN freeDimensionBounds minSize must be an integer >= 1 for dimension: ${r}`);if(!Number.isInteger(i)||i<1)throw new Error(`WebNN freeDimensionBounds maxSize must be an integer >= 1 for dimension: ${r}`);if(i<o)throw new Error(`WebNN freeDimensionBounds maxSize must be >= minSize for dimension: ${r}`);e.push(`${r}:${o}:${i}`)}return e.join(";")},V4=async(n,e,r)=>{let t=e.executionProviders;for(let o of t){let i=typeof o=="string"?o:o.name,a=[];switch(i){case"webnn":if(i="WEBNN",typeof o!="string"){let m=o,b=m?.deviceType,_=m?.freeDimensionBounds;if(b&&za(n,"deviceType",b,r),_){let v=F4(_);v&&B4(a,"FreeDimensionBounds",v,r)}}break;case"webgpu":if(i="JS",typeof o!="string"){let m=o;if(m?.preferredLayout){if(m.preferredLayout!=="NCHW"&&m.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${m.preferredLayout}`);za(n,"preferredLayout",m.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let s=Ot(i,r),u=a.length,c=0,f=0;if(u>0){c=je()._malloc(u*je().PTR_SIZE),r.push(c),f=je()._malloc(u*je().PTR_SIZE),r.push(f);for(let m=0;m<u;m++)je().setValue(c+m*je().PTR_SIZE,a[m][0],"*"),je().setValue(f+m*je().PTR_SIZE,a[m][1],"*")}await je()._OrtAppendExecutionProvider(n,s,c,f,u)!==0&&Re(`Can't append execution provider: ${i}.`)}},Ov=async n=>{let e=je(),r=0,t=[],o=n||{};M4(o);try{let i=R4(o.graphOptimizationLevel??"all"),a=z4(o.executionMode??"sequential"),s=typeof o.logId=="string"?Ot(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let f=typeof o.optimizedModelFilePath=="string"?Ot(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,c,f),r===0&&Re("Can't create session options."),o.executionProviders&&await V4(r,o,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);za(r,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[m,b]of Object.entries(o.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof b!="number"||!Number.isInteger(b)||b<0)throw new Error(`free dimension override value must be a non-negative integer: ${b}`);let _=Ot(m,t);e._OrtAddFreeDimensionOverride(r,_,b)!==0&&Re(`Can't set a free dimension override: ${m} - ${b}.`)}return o.extra!==void 0&&Zo(o.extra,"",new WeakSet,(m,b)=>{za(r,m,b,t)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&Re("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var An,Xr,On,yo,Jo,Ma,Ba,yc,_e=U(()=>{"use strict";An=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},Xr=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},On=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},yo=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Jo=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},Ma=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Ba=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",yc=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Yo,_c=U(()=>{"use strict";Sa();Yo=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=Ms("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Ms("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let c=u.byteLength;new Uint8Array(i,a,c).set(u),a+=c}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var G4,U4,Ev,Cv,Fa,W4,$e,Zr=U(()=>{"use strict";_e();G4=["V","I","W","E","F"],U4=(n,e)=>{console.log(`[${G4[n]},${new Date().toISOString()}]${e}`)},Fa=(n,e)=>{Ev=n,Cv=e},W4=(n,e)=>{let r=Jo(n),t=Jo(Ev);r>=t&&U4(r,typeof e=="function"?e():e)},$e=(...n)=>{Cv&&W4(...n)}});var wc,Jr,V,Jn,Va,Dv,kv,Te=U(()=>{"use strict";wc=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Jr=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=wc.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],f=i-u<0?1:r[i-u];if(c!==f&&c>1&&f>1)return;let m=Math.max(c,f);if(c&&f)s[a-u]=Math.max(c,f);else{if(m>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},V=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},Jn=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(m+1)/2:m/2),i[s]=m-i[a],Math.floor((e+m-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},Va=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Jr.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Dv=-34028234663852886e22,kv=34028234663852886e22});var Ga,vc=U(()=>{"use strict";_e();Ga=(n,e)=>new(yo(e))(n)});var Lv,Tc,Rv,H4,Nv,j4,zv,Ua,Wa,xc,Mv,Bv=U(()=>{"use strict";_e();Zr();Lv=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Tc=(n,e)=>{if(e==="int32")return n;let r=Lv.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);let t=r/8;if(n.byteLength%t!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${t}.`);let o=n.byteLength/t,i=new(yo(e))(n.buffer,n.byteOffset,o);switch(e){case"int64":case"uint64":{let a=new Int32Array(o);for(let s=0;s<o;s++){let u=i[s];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[s]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},Rv=(n,e)=>{if(e==="int32")return n;if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=n.byteLength/4,t=new Int32Array(n.buffer,n.byteOffset,r);switch(e){case"int64":{let o=BigInt64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(t.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(t,Number);return new Uint8Array(o.buffer)}case"uint8":{if(t.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(t,Number)}case"uint32":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(t,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},H4=1,Nv=()=>H4++,j4=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),zv=(n,e)=>{let r=Lv.get(n);if(!r)throw new Error(`WebNN backend does not support data type: ${n}`);return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Ua=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return zv(this.dataType,this.tensorShape)}destroy(){$e("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),t=Rv(new Uint8Array(r),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t);return}else return t.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsDataConverted(e){this.isDataConverted=e}},Wa=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(r)){if(s=j4.get(r),!s||a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${r}`);$e("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==zv(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=Tc(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else $e("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?Rv(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},xc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Nv();return this.tensorTrackersById.set(e,new Wa(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){$e("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){$e("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=Nv(),s=new Ua({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Wa(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a,s){let u=this.getMLContext(e);for(let[f,m]of this.freeTensors.entries())if(m.canReuseTensor(u,r,t)){$e("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}`);let b=this.freeTensors.splice(f,1)[0];return b.sessionId=e,b}$e("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}}`);let c=await u.createTensor({dataType:s??r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ua({sessionId:e,context:u,tensor:c,dataType:r,shape:t,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Mv=(...n)=>new xc(...n)});var Ha,q4,ja,Fv=U(()=>{"use strict";_e();$n();vc();Bv();Zr();Ha=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),q4=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},ja=class{constructor(e){this.tensorManager=Mv(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Fa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){$e("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){$e("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)$e("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>q4(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){$e("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=Ha.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){$e("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=Ha.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!je().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");$e("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return Ga(t,r)}}registerMLTensor(e,r,t,o){let i=Ha.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return $e("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let c=a.get(u);if(!c)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let f=c.slice(r,r+t).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(f);break;case"float16":m=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(f):new Uint16Array(f);break;case"int32":m=new Int32Array(f);break;case"uint32":m=new Uint32Array(f);break;case"int64":if(s){let b=Tc(new Uint8Array(f),"int64");m=new Int32Array(b.buffer),i.dataType="int32"}else m=new BigInt64Array(f);break;case"uint64":m=new BigUint64Array(f);break;case"int8":m=new Int8Array(f);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(f);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return $e("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,m)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isGraphOutput(e,r){let t=this.sessionGraphOutputs.get(e);return t?t.includes(r):!1}isGraphInputOutputTypeSupported(e,r,t=!0){let o=Ha.get(An(r)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof o>"u"?!1:t?!!i?.input.dataTypes.includes(o):!!i?.output.dataTypes.includes(o)}flush(){}}});var qa=U(()=>{"use strict"});var Vv,Ic,Sc,K4,X4,Gv,Ac,$c,Wv,Hv=U(()=>{"use strict";Zr();qa();Vv=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ic=[],Sc=n=>Math.ceil(Number(n)/16)*16,K4=n=>{for(let e=0;e<Ic.length;e++){let r=Ic[e];if(n<=r)return r}return Math.ceil(n/16)*16},X4=1,Gv=()=>X4++,Ac=async(n,e,r,t)=>{let o=Sc(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},$c=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Vv)Ic.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=Sc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=u.getMappedRange();new Uint8Array(c).set(new Uint8Array(t,o,i)),u.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([f.finish()]),u.destroy(),$e("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Sc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return $e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Gv();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),$e("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),$e("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=K4(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(t);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:Gv(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),$e("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return $e("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await Ac(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=Vv.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&($e("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Wv=(...n)=>new $c(...n)});var Oc,we,it=U(()=>{"use strict";Oc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},we=n=>new Oc(n)});var Yn,Ec,Ke,bt,ee,ze,Cc,Qn,ir,se,Ka,W,J,jv,Xa,Pc,qv,Se=U(()=>{"use strict";_e();Te();Yn=64,Ec=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Ke=(n,e=1)=>{let r=Ec(n,e);return typeof r=="string"?r:r[0]},bt=(n,e=1)=>{let r=Ec(n,e);return typeof r=="string"?r:r[1]},ee=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:V.computeStrides(r)})}),e},ze=n=>n%4===0?4:n%2===0?2:1,Cc=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,Qn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,ir=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,se=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,Ka=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=Ec(e,o),f=typeof c=="string"?c:c[1],m=typeof c=="string"?c:c[0],b={indices:u,value:f,storage:m,tensor:e},_=Z=>typeof Z=="string"?Z:`${Z}u`,v={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},x=i?"uniforms.":"",O=`${x}${n}_shape`,I=`${x}${n}_strides`,S="";for(let Z=0;Z<a-1;Z++)S+=`
    let dim${Z} = current / ${se(I,Z,a)};
    let rest${Z} = current % ${se(I,Z,a)};
    indices[${Z}] = dim${Z};
    current = rest${Z};
    `;S+=`indices[${a-1}] = current;`;let C=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${b.indices} {
    var indices: ${b.indices};
    var current = offset;
    ${S}
    return indices;
  }`,D=Z=>(v.offsetToIndices=!0,a<2?Z:`o2i_${n}(${Z})`),N=[];if(a>=2)for(let Z=a-1;Z>=0;Z--)N.push(`${se(I,Z,a)} * (indices[${Z}])`);let R=a<2?"":`
  fn i2o_${n}(indices: ${b.indices}) -> u32 {
    return ${N.join("+")};
  }`,H=Z=>(v.indicesToOffset=!0,a<2?Z:`i2o_${n}(${Z})`),A=(...Z)=>a===0?"0u":`${b.indices}(${Z.map(_).join(",")})`,X=(Z,re)=>a<2?`${Z}`:`${se(Z,re,a)}`,Y=(Z,re,Ge)=>a<2?`${Z}=${Ge};`:`${se(Z,re,a)}=${Ge};`,le={},ae=(Z,re)=>{v.broadcastedIndicesToOffset=!0;let Ge=`${re.name}broadcastedIndicesTo${n}Offset`;if(Ge in le)return`${Ge}(${Z})`;let pt=[];for(let Ze=a-1;Ze>=0;Ze--){let mt=re.indicesGet("outputIndices",Ze+re.rank-a);pt.push(`${X(I,Ze)} * (${mt} % ${X(O,Ze)})`)}return le[Ge]=`fn ${Ge}(outputIndices: ${re.type.indices}) -> u32 {
             return ${pt.length>0?pt.join("+"):"0u"};
           }`,`${Ge}(${Z})`},me=(Z,re)=>(()=>{if(b.storage===b.value)return`${n}[${Z}]=${re};`;if(b.storage==="vec2<u32>"&&b.value==="i32")return`${n}[${Z}]=vec2<u32>(u32(${re}), select(0u, 0xFFFFFFFFu, ${re} < 0));`;if(b.storage==="vec2<u32>"&&b.value==="u32")return`${n}[${Z}]=vec2<u32>(u32(${re}), 0u);`;if(b.storage==="u32"&&b.value==="vec4<bool>")return`${n}[${Z}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${re}));`;throw new Error(`not supported combination of storage type ${b.storage} and value type ${b.value} yet`)})(),j=Z=>(()=>{if(b.storage===b.value)return`${n}[${Z}]`;if(b.storage==="vec2<u32>"&&b.value==="i32")return`i32(${n}[${Z}].x)`;if(b.storage==="vec2<u32>"&&b.value==="u32")return`u32(${n}[${Z}].x)`;if(b.storage==="u32"&&b.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${Z}] & 0xFFu), bool(${n}[${Z}] & 0xFF00u), bool(${n}[${Z}] & 0xFF0000u), bool(${n}[${Z}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${b.storage} and value type ${b.value} yet`)})(),Q=a<2?"":`
  fn get_${n}ByIndices(indices: ${b.indices}) -> ${f} {
    return ${j(`i2o_${n}(indices)`)};
  }`,de=a<2?"":(()=>{let Z=s.map(Ge=>`d${Ge}: u32`).join(", "),re=s.map(Ge=>`d${Ge}`).join(", ");return`
  fn get_${n}(${Z}) -> ${f} {
    return get_${n}ByIndices(${A(re)});
  }`})(),he=(...Z)=>{if(Z.length!==a)throw new Error(`indices length must be ${a}`);let re=Z.map(_).join(",");return a===0?j("0u"):a===1?j(re[0]):(v.get=!0,v.getByIndices=!0,v.indicesToOffset=!0,`get_${n}(${re})`)},ce=Z=>a<2?j(Z):(v.getByIndices=!0,v.indicesToOffset=!0,`get_${n}ByIndices(${Z})`),xe=a<2?"":`
  fn set_${n}ByIndices(indices: ${b.indices}, value: ${f}) {
    ${me(`i2o_${n}(indices)`,"value")}
  }`,Ae=a<2?"":(()=>{let Z=s.map(Ge=>`d${Ge}: u32`).join(", "),re=s.map(Ge=>`d${Ge}`).join(", ");return`
  fn set_${n}(${Z}, value: ${f}) {
    set_${n}ByIndices(${A(re)}, value);
  }`})();return{impl:()=>{let Z=[],re=!1;return v.offsetToIndices&&(Z.push(C),re=!0),v.indicesToOffset&&(Z.push(R),re=!0),v.broadcastedIndicesToOffset&&(Object.values(le).forEach(Ge=>Z.push(Ge)),re=!0),v.set&&(Z.push(Ae),re=!0),v.setByIndices&&(Z.push(xe),re=!0),v.get&&(Z.push(de),re=!0),v.getByIndices&&(Z.push(Q),re=!0),!i&&re&&Z.unshift(`const ${O} = ${b.indices}(${r.join(",")});`,`const ${I} = ${b.indices}(${V.computeStrides(r).join(",")});`),Z.join(`
`)},type:b,offsetToIndices:D,indicesToOffset:H,broadcastedIndicesToOffset:ae,indices:A,indicesGet:X,indicesSet:Y,set:(...Z)=>{if(Z.length!==a+1)throw new Error(`indices length must be ${a}`);let re=Z[a];if(typeof re!="string")throw new Error("value must be string");let Ge=Z.slice(0,a).map(_).join(",");return a===0?me("0u",re):a===1?me(Ge[0],re):(v.set=!0,v.setByIndices=!0,v.indicesToOffset=!0,`set_${n}(${Ge}, ${re})`)},setByOffset:me,setByIndices:(Z,re)=>a<2?me(Z,re):(v.setByIndices=!0,v.indicesToOffset=!0,`set_${n}ByIndices(${Z}, ${re});`),get:he,getByOffset:j,getByIndices:ce,usage:t,name:n,strides:I,shape:O,rank:a}},W=(n,e,r,t=1)=>Ka(n,e,r,"input",t),J=(n,e,r,t=1)=>Ka(n,e,r,"output",t),jv=(n,e,r)=>Ka(n,e,r,"atomicOutput",1),Xa=(n,e,r,t=1)=>Ka(n,e,r,"internal",t),Pc=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Yn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*t*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,t=1){return this.uniforms.push({name:e,type:r,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${r}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${r}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},qv=(n,e)=>new Pc(n,e)});var Z4,Kv,J4,Y4,Q4,eL,yt,Xv,Zv,ln=U(()=>{"use strict";_e();Te();it();Se();Z4=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},Kv=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),J4=(n,e)=>V.sortBasedOnPerm(n,Kv(n.length,e)),Y4=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},Q4=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},eL=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},yt=(n,e)=>{let r=n.dataType,t=n.dims.length,o=Kv(t,e),i=J4(n.dims,o),a=n.dims,s=i,u=t<2||eL(o,n.dims),c;if(u)return c=x=>{let O=W("input",r,a,4),I=J("output",r,s,4);return`
  ${x.registerUniform("output_size","u32").declareVariables(O,I)}
  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=V.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(x/64/4)},programUniforms:[{type:12,data:Math.ceil(x/4)}]}},getShaderSource:c};let{newShape:f,newPerm:m}=Q4(n.dims,o),b=V.areEqual(m,[2,3,1]),_=V.areEqual(m,[3,1,2]);if(f.length===2||b||_){a=b?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,s=[a[1],a[0]];let x=16;return c=O=>{let I=W("a",r,a.length),S=J("output",r,s.length);return`
  ${O.registerUniform("output_size","u32").declareVariables(I,S)}
  var<workgroup> tile : array<array<${S.type.value}, ${x+1}>, ${x}>;
  ${O.mainStart([x,x,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${x} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${x}u + local_id.x;
    let input_row = workgroup_id_x * ${x}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${I.getByIndices(`${I.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${x}u + local_id.x;
    let output_row = workgroup_id_y * ${x}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${S.setByIndices(`${S.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let O=V.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/x),y:Math.ceil(s[0]/x)},programUniforms:[{type:12,data:O},...ee(a,s)]}},getShaderSource:c}}return c=x=>{let O=W("a",r,a.length),I=J("output",r,s.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(O,I)}

  ${Y4(o,t,O,I)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${I.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${I.setByOffset("global_idx",O.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let x=V.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...ee(a,s)]}},getShaderSource:c}},Xv=(n,e)=>{Z4(n.inputs,e.perm),n.compute(yt(n.inputs[0],e.perm))},Zv=n=>we({perm:n.perm})});var tL,rL,nL,oL,iL,aL,sL,uL,lL,cL,Yr,Jv,Yv,Qv,ex,tx,rx,nx,ox,ix,ax,sx=U(()=>{"use strict";_e();Te();Se();Za();ln();tL={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},rL={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},nL={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},oL={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},iL=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},aL=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},sL=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},uL=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},lL=(n,e)=>{let r=[];if(!uL(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},cL=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=V.size(i),c=V.size(a),f=W("_A",r[0].dataType,s),m=J("output",o,i),b=64;u===1&&(b=256);let _=`
          var<workgroup> aBestValues : array<f32, ${b}>;
       `,v=x=>`
        ${x.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${x.mainStart(b)}

          let outputIndex = global_idx / ${b};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${nL[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${b}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${tL[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${b}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${rL[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${t==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${oL[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${b}`,inputDependencies:["type"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:c}]})}},Yr=(n,e,r,t)=>{let o=n.inputs.length===1?r:Dc(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((_,v)=>v));let a=V.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],c=lL(s,n.inputs[0].dims.length);c.length>0&&(u=n.compute(yt(n.inputs[0],c),{inputs:[0],outputs:[-1]})[0],s=iL(s.length,u.dims.length));let[f,m]=aL(u.dims,s),b=f;o.keepDims&&(b=sL(f,a)),n.compute(cL(e,o.cacheKey,[u],t,n.inputs[0].dataType,b,m),{inputs:[u]})},Jv=(n,e)=>{Yr(n,"ReduceMeanShared",e,"mean")},Yv=(n,e)=>{Yr(n,"ReduceL1Shared",e,"l1")},Qv=(n,e)=>{Yr(n,"ReduceL2Shared",e,"l2")},ex=(n,e)=>{Yr(n,"ReduceLogSumExpShared",e,"logSumExp")},tx=(n,e)=>{Yr(n,"ReduceMaxShared",e,"max")},rx=(n,e)=>{Yr(n,"ReduceMinShared",e,"min")},nx=(n,e)=>{Yr(n,"ReduceProdShared",e,"prod")},ox=(n,e)=>{Yr(n,"ReduceSumShared",e,"sum")},ix=(n,e)=>{Yr(n,"ReduceSumSquareShared",e,"sumSquare")},ax=(n,e)=>{Yr(n,"ReduceLogSumShared",e,"logSum")}});var Qr,dL,Ja,Dc,en,pL,fL,hL,mL,gL,bL,yL,_L,wL,vL,tn,ux,lx,cx,dx,px,fx,hx,mx,gx,bx,Za=U(()=>{"use strict";_e();Te();it();Se();sx();Qr=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},dL=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],Ja=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],c=r[0].dims,f=c.length,m=V.normalizeAxes(o,f),b=!s&&m.length===0;c.forEach((O,I)=>{b||m.indexOf(I)>=0?a&&u.push(1):u.push(O)});let _=u.length,v=V.size(u);return{name:n,shaderCache:e,getShaderSource:O=>{let I=[],S=W("_A",r[0].dataType,f),C=J("output",i,_),D=t(S,C,m),N=D[2];for(let R=0,H=0;R<f;R++)b||m.indexOf(R)>=0?(a&&H++,N=`for(var j${R}: u32 = 0; j${R} < ${c[R]}; j${R}++) {
                  ${D[2].includes("last_index")?`let last_index = j${R};`:""}
                  ${S.indicesSet("input_indices",R,`j${R}`)}
                  ${N}
                }`):(I.push(`${S.indicesSet("input_indices",R,C.indicesGet("output_indices",H))};`),H++);return`

        ${O.registerUniform("output_size","u32").declareVariables(S,C)}

        ${O.mainStart()}
          ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${S.type.indices};
          let output_indices = ${C.offsetToIndices("global_idx")};

          ${I.join(`
`)}
          ${D[0]}       // init ops for reduce max/min
          ${D[1]}
          ${N}
          ${D[3]}
          ${D.length===4?C.setByOffset("global_idx","value"):D.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...ee(c,u)]})}},Dc=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),we({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},en=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:Dc(o,r);n.compute(Ja(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?dL:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},pL=(n,e)=>{Qr(n.inputs),en(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},fL=(n,e)=>{Qr(n.inputs),en(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},hL=(n,e)=>{Qr(n.inputs),en(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},mL=(n,e)=>{Qr(n.inputs),en(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},gL=(n,e)=>{Qr(n.inputs),en(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},bL=(n,e)=>{Qr(n.inputs),en(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},yL=(n,e)=>{Qr(n.inputs),en(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},_L=(n,e)=>{Qr(n.inputs),en(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},wL=(n,e)=>{Qr(n.inputs),en(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},vL=(n,e)=>{Qr(n.inputs),en(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},tn=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},ux=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?bL(n,e):Jv(n,e)},lx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?fL(n,e):Yv(n,e)},cx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?hL(n,e):Qv(n,e)},dx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?mL(n,e):ex(n,e)},px=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?gL(n,e):tx(n,e)},fx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?yL(n,e):rx(n,e)},hx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?_L(n,e):nx(n,e)},mx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?wL(n,e):ox(n,e)},gx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?vL(n,e):ix(n,e)},bx=(n,e)=>{tn(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?pL(n,e):ax(n,e)}});var yx,_x,wx,kc,vx=U(()=>{"use strict";_e();it();Za();yx=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},_x=(n,e)=>{yx(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ja("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},wx=(n,e)=>{yx(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(Ja("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},kc=n=>we(n)});var xL,Nc,TL,IL,SL,_o,$L,xx,Ya=U(()=>{"use strict";_e();Te();qa();Se();xL=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],c=r.dims[1],f=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=o.dims[0]/3,b=m,_=b;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let C of e.qkvHiddenSizes)if(C%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=e.qkvHiddenSizes[0],b=e.qkvHiddenSizes[1],_=e.qkvHiddenSizes[2]}let v=c;if(m!==b)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==m+b+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let x=0;if(a){if(b!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==b/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(x=a.dims[3])}let O=v+x,I=-1,S=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==c||s.dims[3]!==O)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:c,pastSequenceLength:x,kvSequenceLength:v,totalSequenceLength:O,maxSequenceLength:I,inputHiddenSize:f,hiddenSize:m,vHiddenSize:_,headSize:Math.floor(m/e.numHeads),vHeadSize:Math.floor(_/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:S,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Nc=(n,e,r)=>e&&n?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${n?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,TL=(n,e,r,t,o,i,a,s)=>{let u=ze(a?1:i),c=64,f=i/u;f<c&&(c=32);let m=Math.ceil(i/u/c),b=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:f},{type:12,data:m}],_=Ke(n.dataType,u),v=bt(1,u),x=["type"];a&&x.push("type"),s&&x.push("type");let O=I=>{let S=J("x",n.dataType,n.dims,u),C=[S],D=a?W("seq_lens",a.dataType,a.dims):void 0;D&&C.push(D);let N=s?W("total_sequence_length_input",s.dataType,s.dims):void 0;N&&C.push(N);let R=bt(n.dataType),H=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${I.registerUniforms(H).declareVariables(...C)}
  ${I.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Nc(D,N,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${v}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${v}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${v}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${v}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${S.type.value}(${R}(1.0) / ${R}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${v}(x[offset + i]);
        x[offset + i] = ${S.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${S.type.value}(${R}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${_};${u}`,inputDependencies:x},getShaderSource:O,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*r},programUniforms:b})}},IL=(n,e,r,t,o,i,a,s,u)=>{let c=a+i.kvSequenceLength,f=[i.batchSize,i.numHeads,i.sequenceLength,c],m=n>1&&t,b=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=m?[i.batchSize,b,c,i.headSize]:void 0,v=i.nReps?i.nReps:1,x=i.scale===0?1/Math.sqrt(i.headSize):i.scale,O=ze(i.headSize),I=i.headSize/O,S=12,C={x:Math.ceil(c/S),y:Math.ceil(i.sequenceLength/S),z:i.batchSize*i.numHeads},D=[{type:12,data:i.sequenceLength},{type:12,data:I},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:x},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:v}],N=m&&t&&V.size(t.dims)>0,R=["type","type"];N&&R.push("type"),o&&R.push("type"),s&&R.push("type"),u&&R.push("type");let H=[{dims:f,dataType:e.dataType,gpuDataType:0}];m&&H.push({dims:_,dataType:e.dataType,gpuDataType:0});let A=X=>{let Y=W("q",e.dataType,e.dims,O),le=W("key",r.dataType,r.dims,O),ae=[Y,le];if(N){let xe=W("past_key",t.dataType,t.dims,O);ae.push(xe)}o&&ae.push(W("attention_bias",o.dataType,o.dims));let me=s?W("seq_lens",s.dataType,s.dims):void 0;me&&ae.push(me);let j=u?W("total_sequence_length_input",u.dataType,u.dims):void 0;j&&ae.push(j);let Q=J("output",e.dataType,f),de=[Q];m&&de.push(J("present_key",e.dataType,_,O));let he=bt(1,O),ce=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${S}u;

  var<workgroup> tileQ: array<${Y.type.storage}, ${S*S}>;
  var<workgroup> tileK: array<${Y.type.storage}, ${S*S}>;
  ${X.registerUniforms(ce).declareVariables(...ae,...de)}
  ${X.mainStart([S,S,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${v===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${v===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Nc(me,j,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${N&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${he}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${N&&m?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${m?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${he}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(O){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${O}`)}})()};
        output[outputIdx] = ${Q.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${O};${o!==void 0};${t!==void 0};${n}`,inputDependencies:R},getRunData:()=>({outputs:H,dispatchGroup:C,programUniforms:D}),getShaderSource:A}},SL=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,f=o.vHiddenSize*c,m=n>1&&t,b=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=m?[o.batchSize,b,u,o.headSize]:void 0,v=[o.batchSize,o.sequenceLength,f],x=12,O={x:Math.ceil(o.vHeadSize/x),y:Math.ceil(o.sequenceLength/x),z:o.batchSize*o.numHeads},I=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],S=m&&t&&V.size(t.dims)>0,C=["type","type"];S&&C.push("type"),a&&C.push("type"),s&&C.push("type");let D=[{dims:v,dataType:e.dataType,gpuDataType:0}];m&&D.push({dims:_,dataType:e.dataType,gpuDataType:0});let N=R=>{let H=W("probs",e.dataType,e.dims),A=W("v",r.dataType,r.dims),X=[H,A];S&&X.push(W("past_value",t.dataType,t.dims));let Y=a?W("seq_lens",a.dataType,a.dims):void 0;a&&X.push(Y);let le=s?W("total_sequence_length_input",s.dataType,s.dims):void 0;s&&X.push(le);let me=[J("output",e.dataType,v)];m&&me.push(J("present_value",e.dataType,_));let j=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;
  var<workgroup> tileQ: array<${H.type.value}, ${x*x}>;
  var<workgroup> tileV: array<${H.type.value}, ${x*x}>;
  ${R.registerUniforms(j).declareVariables(...X,...me)}
  ${R.mainStart([x,x,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Nc(Y,le,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${S&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${H.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${S&&m?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${m?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:C},getRunData:()=>({outputs:D,dispatchGroup:O,programUniforms:I}),getShaderSource:N}},_o=(n,e,r,t,o,i,a,s,u,c,f=void 0,m=void 0)=>{let b=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),_=b>1?c.pastSequenceLength:0,v=_+c.kvSequenceLength,x=u&&V.size(u.dims)>0?u:void 0,O=[e,r];b>1&&a&&V.size(a.dims)>0&&O.push(a),x&&O.push(x),f&&O.push(f),m&&O.push(m);let I=n.compute(IL(b,e,r,a,x,c,_,f,m),{inputs:O,outputs:b>1?[-1,1]:[-1]})[0];n.compute(TL(I,c.batchSize,c.numHeads,_,c.sequenceLength,v,f,m),{inputs:f&&m?[I,f,m]:[I],outputs:[]});let S=[I,t];b>1&&s&&V.size(s.dims)>0&&S.push(s),f&&S.push(f),m&&S.push(m),n.compute(SL(b,I,t,s,c,_,f,m),{inputs:S,outputs:b>1?[0,2]:[0]})},$L=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],c=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],f=m=>{let b=J("output_q",u[0].dataType,r),_=J("output_k",u[0].dataType,r),v=J("output_v",u[0].dataType,r),x=W("input",u[0].dataType,u[0].dims),O=W("weight",u[1].dataType,u[1].dims),I=W("bias",u[2].dataType,u[2].dims),S=x.type.storage,C=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${S}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${S}, ${a*a}>;
  var<workgroup> tileWeightK: array<${S}, ${a*a}>;
  var<workgroup> tileWeightV: array<${S}, ${a*a}>;
  ${m.registerUniforms(C).declareVariables(x,O,I,b,_,v)}
  ${m.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${S}(0);
    var valueK = ${S}(0);
    var valueV = ${S}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:c}),getShaderSource:f},{inputs:u,outputs:[-1,-1,-1]})},xx=(n,e)=>{let r=xL(n.inputs,e),[t,o,i]=$L(n,r);return _o(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var AL,OL,PL,Tx,Ix=U(()=>{"use strict";xt();_e();Te();it();Se();AL=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},OL=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?ze(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=V.size(i)/a,c=t,f=c?i.length:i,m=W("x",n[0].dataType,n[0].dims,a),b=W("scale",n[1].dataType,n[1].dims,s),_=W("bias",n[2].dataType,n[2].dims,s),v=W("inputMean",n[3].dataType,n[3].dims,s),x=W("inputVar",n[4].dataType,n[4].dims,s),O=J("y",n[0].dataType,f,a),I=()=>{let C="";if(t)C=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")C=`
            ${O.indicesSet("outputIndices","0","0")}
            let cOffset = ${O.indicesToOffset("outputIndices")};`;else{C=`var cIndices = ${b.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let D=1;D<b.rank;D++)C+=`cIndices[${D}] = outputIndices[${D}];`;C+=`let cOffset = ${b.indicesToOffset("cIndices")};`}return C},S=C=>`
  const epsilon = ${r};
  ${C.registerUniform("outputSize","u32").declareVariables(m,b,_,v,x,O)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${O.offsetToIndices(`global_idx * ${a}`)};
    ${I()}
    let scale = ${b.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${v.getByOffset("cOffset")};
    let inputVar = ${x.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${O.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:S,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c?[{type:12,data:u},...ee(i)]:[{type:12,data:u}]})}},PL=n=>we(n),Tx=(n,e)=>{let{inputs:r,outputCount:t}=n,o=PL({...e,outputCount:t});if(ve.webgpu.validateInputContent&&AL(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(OL(r,o))}});var EL,CL,Sx,$x=U(()=>{"use strict";Te();Se();EL=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},CL=n=>{let e=n[0].dims,r=n[0].dims[2],t=V.size(e)/4,o=n[0].dataType,i=W("input",o,e,4),a=W("bias",o,[r],4),s=W("residual",o,e,4),u=J("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:f=>`
  const channels = ${r}u / 4;
  ${f.declareVariables(i,a,s,u)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Sx=n=>{EL(n.inputs),n.compute(CL(n.inputs))}});var DL,Ve,Ax,Ox,Px,Ex,Cx,Dx,kx,Nx,Lx,kL,Rx,zx,Mx,Bx,Qo,Fx,Qa,Vx,Gx,Ux,Wx,Hx,jx,qx,Kx,Xx,Zx,Jx,Yx,Qx,eT,tT,rT,nT,oT,Lc,Rc,iT,aT,sT,NL,LL,uT,es=U(()=>{"use strict";_e();Te();it();Se();DL=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let c=W("inputData",r,[s],4),f=J("outputData",t,[s],4),m=[{name:"vec_size",type:"u32"}];return a&&m.push(...a),`
      ${n.registerUniforms(m).declareVariables(c,f)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",u)}
  }`},Ve=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(V.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>DL(c,V.size(n.dims),n.dataType,i,r,t,s),getRunData:c=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(V.size(c[0].dims)/64/4)},programUniforms:u})}},Ax=n=>{n.compute(Ve(n.inputs[0],"Abs","abs"))},Ox=n=>{n.compute(Ve(n.inputs[0],"Acos","acos"))},Px=n=>{n.compute(Ve(n.inputs[0],"Acosh","acosh"))},Ex=n=>{n.compute(Ve(n.inputs[0],"Asin","asin"))},Cx=n=>{n.compute(Ve(n.inputs[0],"Asinh","asinh"))},Dx=n=>{n.compute(Ve(n.inputs[0],"Atan","atan"))},kx=n=>{n.compute(Ve(n.inputs[0],"Atanh","atanh"))},Nx=n=>we(n),Lx=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(Ve(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},kL=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return we({min:e,max:r})},Rx=(n,e)=>{let r=e||kL(n.inputs),t=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},zx=n=>{n.compute(Ve(n.inputs[0],"Ceil","ceil"))},Mx=n=>{n.compute(Ve(n.inputs[0],"Cos","cos"))},Bx=n=>{n.compute(Ve(n.inputs[0],"Cosh","cosh"))},Qo=n=>we(n),Fx=(n,e)=>{let r=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Qa=(n="f32")=>`
const r0: ${n} = 0.3275911;
const r1: ${n} = 0.254829592;
const r2: ${n} = -0.284496736;
const r3: ${n} = 1.421413741;
const r4: ${n} = -1.453152027;
const r5: ${n} = 1.061405429;

fn erf_vf32(v: vec4<${n}>) -> vec4<${n}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Vx=n=>{let e=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,Qa(e)))},Gx=n=>{n.compute(Ve(n.inputs[0],"Exp","exp"))},Ux=n=>{n.compute(Ve(n.inputs[0],"Floor","floor"))},Wx=n=>{let e=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Qa(e)))},Hx=(n,e)=>{let r=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},jx=n=>{n.compute(Ve(n.inputs[0],"Not",e=>`!${e}`))},qx=n=>{n.compute(Ve(n.inputs[0],"Neg",e=>`-${e}`))},Kx=n=>{n.compute(Ve(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Xx=n=>{let e=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},Zx=n=>{n.compute(Ve(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},Jx=n=>we(n),Yx=(n,e)=>{let r=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},Qx=n=>{n.compute(Ve(n.inputs[0],"Sin","sin"))},eT=n=>{n.compute(Ve(n.inputs[0],"Sinh","sinh"))},tT=n=>{n.compute(Ve(n.inputs[0],"Sqrt","sqrt"))},rT=n=>{n.compute(Ve(n.inputs[0],"Tan","tan"))},nT=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,oT=n=>{n.compute(Ve(n.inputs[0],"Tanh",nT))},Lc=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${nT("v")};
}
`,Rc=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,iT=n=>{let e=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"FastGelu",Rc,Lc(e),void 0,n.inputs[0].dataType))},aT=(n,e)=>{let r=bt(n.inputs[0].dataType);return n.compute(Ve(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},sT=n=>{n.compute(Ve(n.inputs[0],"Log","log"))},NL=(n,e)=>`
const alpha = vec4<${n}>(${e});
const one = ${n}(1.0);
const zero = ${n}(0.0);

fn quick_gelu_impl(x: vec4<${n}>) -> vec4<${n}> {
  let v = x *alpha;
  var x1 : vec4<${n}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,LL=n=>`quick_gelu_impl(${n})`,uT=(n,e)=>{let r=bt(n.inputs[0].dataType);n.compute(Ve(n.inputs[0],"QuickGelu",LL,NL(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var RL,zL,cT,dT=U(()=>{"use strict";Te();Se();es();RL=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zL=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=W("input",n[0].dataType,n[0].dims,4),t=W("bias",n[0].dataType,[n[0].dims[2]],4),o=J("output",n[0].dataType,e,4),i=V.size(e)/4,a=Ke(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${Qa(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},cT=n=>{RL(n.inputs),n.compute(zL(n.inputs))}});var ML,BL,rn,pT,fT,hT,mT,gT,bT,yT,_T,wT,vT,xT=U(()=>{"use strict";_e();Te();Se();ML=(n,e,r,t,o,i,a,s,u,c,f,m)=>{let b,_;typeof s=="string"?b=_=(S,C)=>`${s}((${S}),(${C}))`:typeof s=="function"?b=_=s:(b=s.scalar,_=s.vector);let v=J("outputData",f,t.length,4),x=W("aData",u,e.length,4),O=W("bData",c,r.length,4),I;if(o)if(i){let S=V.size(e)===1,C=V.size(r)===1,D=e.length>0&&e[e.length-1]%4===0,N=r.length>0&&r[r.length-1]%4===0;S||C?I=v.setByOffset("global_idx",_(S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"),C?`${O.type.value}(${O.getByOffset("0")}.x)`:O.getByOffset("global_idx"))):I=`
            let outputIndices = ${v.offsetToIndices("global_idx * 4u")};
            let offsetA = ${x.broadcastedIndicesToOffset("outputIndices",v)};
            let offsetB = ${O.broadcastedIndicesToOffset("outputIndices",v)};
            ${v.setByOffset("global_idx",_(a||D?x.getByOffset("offsetA / 4u"):`${x.type.value}(${x.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||N?O.getByOffset("offsetB / 4u"):`${O.type.value}(${O.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else I=v.setByOffset("global_idx",_(x.getByOffset("global_idx"),O.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let S=(C,D,N="")=>{let R=`aData[indexA${D}][componentA${D}]`,H=`bData[indexB${D}][componentB${D}]`;return`
            let outputIndices${D} = ${v.offsetToIndices(`global_idx * 4u + ${D}u`)};
            let offsetA${D} = ${x.broadcastedIndicesToOffset(`outputIndices${D}`,v)};
            let offsetB${D} = ${O.broadcastedIndicesToOffset(`outputIndices${D}`,v)};
            let indexA${D} = offsetA${D} / 4u;
            let indexB${D} = offsetB${D} / 4u;
            let componentA${D} = offsetA${D} % 4u;
            let componentB${D} = offsetB${D} % 4u;
            ${C}[${D}] = ${N}(${b(R,H)});
          `};f===9?I=`
            var data = vec4<u32>(0);
            ${S("data",0,"u32")}
            ${S("data",1,"u32")}
            ${S("data",2,"u32")}
            ${S("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:I=`
            ${S("outputData[global_idx]",0)}
            ${S("outputData[global_idx]",1)}
            ${S("outputData[global_idx]",2)}
            ${S("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(x,O,v)}

        ${m??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${I}
      }`},BL=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(Number),u=t.dims.map(Number),c=!V.areEqual(s,u),f=s,m=V.size(s),b=!1,_=!1,v=[c];if(c){let x=Jr.calcShape(s,u,!1);if(!x)throw new Error("Can't perform binary op on the given tensors");f=x.slice(),m=V.size(f);let O=V.size(s)===1,I=V.size(u)===1,S=s.length>0&&s[s.length-1]%4===0,C=u.length>0&&u[u.length-1]%4===0;v.push(O),v.push(I),v.push(S),v.push(C);let D=1;for(let N=1;N<f.length;N++){let R=s[s.length-N],H=u[u.length-N];if(R===H)D*=R;else break}D%4===0?(_=!0,b=!0):(O||I||S||C)&&(b=!0)}else b=!0;return v.push(b),{name:n,shaderCache:{hint:e+v.map(x=>x.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:x=>ML(x,s,u,f,b,c,_,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:f,dataType:a}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(V.size(f)/4)},...ee(s,u,f)]})}},rn=(n,e,r,t,o,i)=>{n.compute(BL(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},pT=n=>{rn(n,"Add",(e,r)=>`${e}+${r}`)},fT=n=>{rn(n,"Div",(e,r)=>`${e}/${r}`)},hT=n=>{rn(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},mT=n=>{rn(n,"Mul",(e,r)=>`${e}*${r}`)},gT=n=>{let e=W("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;rn(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},bT=n=>{rn(n,"Sub",(e,r)=>`${e}-${r}`)},yT=n=>{rn(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},_T=n=>{rn(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},wT=n=>{rn(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},vT=n=>{rn(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var VL,GL,UL,WL,TT,IT,ST=U(()=>{"use strict";_e();Te();it();Se();VL=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,c)=>{if(c!==e&&u!==t.dims[c])throw new Error("non concat dimensions must match")})}})},GL=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,UL=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},WL=(n,e,r,t)=>{let o=V.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],c=[],f=[{type:12,data:o}];for(let x=0;x<n.length;++x)s+=n[x].dims[e],i[x]=s,c.push(n[x].dims.length),a[x]=W(`input${x}`,t,c[x]),u.push("rank"),f.push({type:12,data:i[x]});for(let x=0;x<n.length;++x)f.push(...ee(n[x].dims));f.push(...ee(r));let m=J("output",t,r.length),b=m.indicesGet("indices",e),_=Array.from(Array(i.length).keys()).map(x=>`uniforms.sizeInConcatAxis${x}`).join(","),v=x=>`

  ${(()=>{x.registerUniform("outputSize","u32");for(let O=0;O<n.length;O++)x.registerUniform(`sizeInConcatAxis${O}`,"u32");return x.declareVariables(...a,m)})()}

  ${GL(i.length,_)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${b});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${b} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${UL(a,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:v}},TT=(n,e)=>{let r=n.inputs,t=r[0].dims,o=V.normalizeAxis(e.axis,t.length);VL(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>V.size(s.dims)>0);n.compute(WL(a,o,i,r[0].dataType),{inputs:a})},IT=n=>we({axis:n.axis})});var ar,sr,ur,ts,Pn=U(()=>{"use strict";_e();Te();ar=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},sr=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},ur=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},ts=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[Dv,kv];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var ht,$T,rs=U(()=>{"use strict";ht=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},$T=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var AT,OT=U(()=>{"use strict";AT=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var ei,ns,os=U(()=>{"use strict";_e();Te();Se();Pn();ei=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${se(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,se(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},ns=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],c=s[s.length-1],f=a[a.length-1],m=ze(c),b=ze(f),_=ze(u),v=V.size(r)/m/_,x=n.length>2,O=t?t.slice(0,-2):r.slice(0,-2),S=[V.size(O),u,c],C=[{type:12,data:v},{type:12,data:u},{type:12,data:c},{type:12,data:f}];sr(e,C),C.push(...ee(O,a,s)),x&&C.push(...ee(n[2].dims)),C.push(...ee(S));let D=N=>{let R=Xa("batch_dims",n[0].dataType,O.length),H=W("a",n[0].dataType,a.length,b),A=W("b",n[1].dataType,s.length,m),X=J("output",n[0].dataType,S.length,m),Y=Ke(X.type.tensor),le=ar(e,X.type.value,Y),ae=[H,A],me="";if(x){let de=o?m:1;ae.push(W("bias",n[2].dataType,n[2].dims.length,de)),me=`${o?`value += bias[col / ${de}];`:`value += ${X.type.value}(bias[row + i]);`}`}let j=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];ur(e,j);let Q=()=>{let de=`var a_data: ${H.type.value};`;for(let he=0;he<b;he++)de+=`
              let b_data${he} = b[(b_offset + (k + ${he}) * uniforms.N + col) / ${m}];`;for(let he=0;he<_;he++){de+=`a_data = a[(a_offset + (row + ${he}) * uniforms.K + k) / ${b}];`;for(let ce=0;ce<b;ce++)de+=`
            values[${he}] = fma(${A.type.value}(a_data${b===1?"":`[${ce}]`}), b_data${ce}, values[${he}]);
`}return de};return`
  ${N.registerUniforms(j).registerInternalVariables(R).declareVariables(...ae,X)}
  ${N.mainStart()}
    ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${R.offsetToIndices("batch")};`}

    var a_indices: ${H.type.indices};
    ${ei("a_indices",H,H.rank-2,R.rank,"batch_indices")}
    ${H.indicesSet("a_indices",H.rank-2,0)}
    ${H.indicesSet("a_indices",H.rank-1,0)}
    let a_offset = ${H.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${ei("b_indices",A,A.rank-2,R.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${X.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${b}) {
      ${Q()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${me}
      ${le}
      let cur_indices = ${X.type.indices}(batch, row + i, col);
      let offset = ${X.indicesToOffset("cur_indices")};
      ${X.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${m};${b};${_};${o}`,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:C}),getShaderSource:D}}});var HL,jL,zc,PT,qL,Mc,KL,ti,is=U(()=>{"use strict";_e();Te();Se();Pn();os();rs();HL=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,jL=(n,e)=>n?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,zc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],c=e[0]*n[0],f=o?u:i,m=o?i:u,b=f/e[0],_=i/e[1];if(!((o&&b===4&&n[1]===4||!o&&(b===3||b===4))&&f%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${b} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${b} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${b}<${r}>, ${f/b}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${b};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${HL(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${b===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${jL(o,b)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},PT=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,qL=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Mc=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let c=n[1]*e[1],f=n[0]*e[0],m=o?c:i,b=o?i:c;if(!(b%e[1]===0&&m%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${b} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let _=b/e[1],v=m/e[0],x=i/e[1],O=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${b}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${e[0]}) {
          ${PT(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${v};
let tileRowB = i32(localId.y) * ${x};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${v}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${PT(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${x}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${qL(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${b}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${i}>;
  const rowPerThread = ${n[1]};
  const colPerThread = ${n[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${O}
  }
`},KL=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,c=Ke(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ht(n,c)} {
      var value = ${ht(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${ei("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ht(n,c)} {
      var value = ${ht(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${ei("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ht(n,c)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${ht(n,c)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ti=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),c=s.slice(0,-2),f=t?t.slice(0,-2):r.slice(0,-2),m=V.size(f),b=a[a.length-2],_=a[a.length-1],v=s[s.length-1],x=_%4===0&&v%4===0,O=b<=8?[4,1,1]:[4,4,1],I=[8,8,1],S=[Math.ceil(v/I[0]/O[0]),Math.ceil(b/I[1]/O[1]),Math.ceil(m/I[2]/O[2])],C=x?4:1,D=[...u,b,_/C],N=D.length,R=[...c,_,v/C],H=R.length,A=[m,b,v/C],X=[{type:6,data:b},{type:6,data:v},{type:6,data:_}];sr(e,X),X.push(...ee(f,D,R));let Y=["rank","rank"],le=n.length>2;le&&(X.push(...ee(n[2].dims)),Y.push("rank")),X.push(...ee(A));let ae=me=>{let j=f.length,Q=Xa("batchDims",n[0].dataType,j,1),de=Ke(n[0].dataType),he=W("a",n[0].dataType,N,C),ce=W("b",n[1].dataType,H,C),xe=J("result",n[0].dataType,A.length,C),Ae=[he,ce];if(le){let re=o?C:1;Ae.push(W("bias",n[2].dataType,n[2].dims.length,re))}let ke=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];ur(e,ke);let It=Ke(xe.type.tensor),Xe=ar(e,xe.type.value,It),Z=KL(C,le,Xe,[Q,he,ce,xe],o);return`
  ${me.registerUniforms(ke).registerInternalVariables(Q).declareVariables(...Ae,xe)}
  ${Z}
  ${x?zc(O,I,de,Q):Mc(O,I,de,Q)}
                   `};return{name:"MatMul",shaderCache:{hint:`${O};${e.activation};${x};${o}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:X}),getShaderSource:ae}}});var XL,ET,CT=U(()=>{"use strict";_e();Zr();Se();Pn();rs();OT();is();XL=(n,e,r,t,o=!1,i,a=4,s=4,u=4,c="f32")=>{let f=Y=>{switch(Y){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${Y} is not supported.`)}},m=Y=>{switch(Y){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${Y} is not supported.`)}},b=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=n?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,v=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",x=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",O=n?"row":"col",I=n?"col":"row",S=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${O} / outWidth;
    let outCol = ${O} % outWidth;

    let WRow = ${I} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${I} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${I} % inChannels;
    var resData = ${ht(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${v} && xCol >= 0 && xCol < ${x}) {
      ${b}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(a)}
    }
    return resData;`,C=n?e&&t?`
    let col = colIn * ${a};
    ${S}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${S}
    }
    return ${ht(a,c)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${S}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${S}
    }
    return ${ht(a,c)}(0.0);`,D=n?t&&r?m(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(s)}
    }
    return ${ht(s,c)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(s)}
    }
    return ${ht(s,c)}(0.0);`,N=ht(u,c),R=n?ht(a,c):ht(s,c),H=n?ht(s,c):ht(a,c),A=ar(i,N,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${n?C:D}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${H} {
      ${n?D:C}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${N}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${$T(o)}
      ${A}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ET=(n,e,r,t,o,i,a,s,u)=>{let c=e.format==="NHWC",f=c?n[0].dims[3]:n[0].dims[1],m=r[0],b=c?r[2]:r[3],_=c?r[1]:r[2],v=c?r[3]:r[1],x=c&&(f%4===0||f%3===0)&&v%4===0,O=c?v:b*_,I=c?b*_:v,S=[8,8,1],C=t<=8?[4,1,1]:[4,4,1],D=[Math.ceil(O/S[0]/C[0]),Math.ceil(I/S[1]/C[1]),Math.ceil(m/S[2]/C[2])];$e("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${D}`);let N=x?c&&f%4!==0?3:4:1,R=S[1]*C[1],H=S[0]*C[0],A=Math.max(S[0]*N,S[1]),X=t%R===0,Y=o%H===0,le=i%A===0,ae=x?[N,4,4]:[1,1,1],me=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];sr(e,me),me.push(...ee(n[0].dims,n[1].dims));let j=["rank","rank"];a&&(me.push(...ee(n[2].dims)),j.push("rank")),me.push(...ee(r));let Q=de=>{let he=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];ur(e,he);let ce=x?4:1,xe=Ke(n[0].dataType),Ae=`
      fn setOutputAtIndex(flatIndex : i32, value : ${x?`vec4<${xe}>`:xe}) {
        result[flatIndex] = ${x?`vec4<${xe}>`:xe}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${x?`vec4<${xe}>`:xe}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${x?"/ 4":""}, value);
      }`,ke=W("x",n[0].dataType,n[0].dims.length,N===3?1:N),It=W("w",n[1].dataType,n[1].dims.length,ce),Xe=[ke,It],Z=J("result",n[0].dataType,r.length,ce);if(a){let re=W("bias",n[2].dataType,n[2].dims.length,ce);Xe.push(re),Ae+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${x?`vec4<${xe}>`:xe} {
          return bias[coords.${c?"w":"y"}${x?"/ 4":""}];
        }`}return`
        ${AT("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${de.registerUniforms(he).declareVariables(...Xe,Z)}
        ${Ae}
        ${XL(c,X,Y,le,a,e,ae[0],ae[1],ae[2],xe)}
        ${x?zc(C,S,xe,void 0,!c,A):Mc(C,S,xe,void 0,!c,A,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${N};${x};${X};${Y};${le};${R};${H};${A}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:D[0],y:D[1],z:D[2]},programUniforms:me}),getShaderSource:Q}}});var ZL,DT,as,JL,kT,YL,NT,LT,RT=U(()=>{"use strict";_e();Zr();Te();Se();Pn();rs();ZL=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},DT=n=>typeof n=="number"?[n,n,n]:n,as=(n,e)=>e<=1?n:n+(n-1)*(e-1),JL=(n,e,r,t=1)=>{let o=as(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},kT=(n,e,r,t,o)=>{o==null&&(o=JL(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},YL=(n,e,r,t,o,i,a,s,u,c)=>{let f,m,b,_;if(n==="VALID"&&(n=0),typeof n=="number"){f={top:n,bottom:n,left:n,right:n,front:n,back:n};let v=kT([e,r,t,1],[s,u,c],1,[o,i,a],n);m=v[0],b=v[1],_=v[2]}else if(Array.isArray(n)){if(!n.every((x,O,I)=>x===I[0]))throw Error(`Unsupported padding parameter: ${n}`);f={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let v=kT([e,r,t,1],[s,u,c],1,[o,i,a],n[0]);m=v[0],b=v[1],_=v[2]}else if(n==="SAME_UPPER"){m=Math.ceil(e/o),b=Math.ceil(r/i),_=Math.ceil(t/a);let v=(m-1)*o+s-e,x=(b-1)*i+u-r,O=(_-1)*a+c-t,I=Math.floor(v/2),S=v-I,C=Math.floor(x/2),D=x-C,N=Math.floor(O/2),R=O-N;f={top:C,bottom:D,left:N,right:R,front:I,back:S}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:f,outDepth:m,outHeight:b,outWidth:_}},NT=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,c,f,m;if(a==="channelsLast")[s,u,c,f,m]=n;else if(a==="channelsFirst")[s,m,u,c,f]=n;else throw new Error(`Unknown dataFormat ${a}`);let[b,,_,v,x]=e,[O,I,S]=DT(r),[C,D,N]=DT(t),R=as(_,C),H=as(v,D),A=as(x,N),{padInfo:X,outDepth:Y,outHeight:le,outWidth:ae}=YL(o,u,c,f,O,I,S,R,H,A),me=i?b*m:b,j=[0,0,0,0,0];return a==="channelsFirst"?j=[s,me,Y,le,ae]:a==="channelsLast"&&(j=[s,Y,le,ae,me]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:c,inWidth:f,inChannels:m,outDepth:Y,outHeight:le,outWidth:ae,outChannels:me,padInfo:X,strideDepth:O,strideHeight:I,strideWidth:S,filterDepth:_,filterHeight:v,filterWidth:x,effectiveFilterDepth:R,effectiveFilterHeight:H,effectiveFilterWidth:A,dilationDepth:C,dilationHeight:D,dilationWidth:N,inShape:n,outShape:j,filterShape:e}},LT=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,c=[64,1,1],f={x:r.map((S,C)=>C)},m=[Math.ceil(ZL(f.x.map(S=>r[S]))/c[0]),1,1];$e("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let b=u?a&&s%4!==0?3:4:1,_=V.size(r),v=[{type:12,data:_},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];sr(e,v),v.push(...ee(n[0].dims,n[1].dims));let x=["rank","rank"],O=n.length===3;O&&(v.push(...ee(n[2].dims)),x.push("rank")),v.push(...ee(r));let I=S=>{let C=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];ur(e,C);let D=u?4:1,N=Ke(n[0].dataType),R=W("x",n[0].dataType,n[0].dims.length,b===3?1:b),H=W("W",n[1].dataType,n[1].dims.length,D),A=[R,H],X=J("result",n[0].dataType,r.length,D),Y="";if(O){let me=W("bias",n[2].dataType,n[2].dims.length,D);A.push(me),Y+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${N}>`:N} {
          return bias[${a?se("coords",4,5):se("coords",1,5)}${u?"/ 4":""}];
        }`}let le=ht(b,N),ae=ar(e,le,N);return`
            ${Y}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${H.getByIndices("aIndices")};
            }
          ${S.registerUniforms(C).declareVariables(...A,X)}
          ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${X.offsetToIndices("global_idx")};
              let batch = ${se("coords",0,R.rank)};
              let d2 = ${a?se("coords",R.rank-1,R.rank):se("coords",1,R.rank)};
              let xFRCCorner = vec3<u32>(${a?se("coords",1,R.rank):se("coords",2,R.rank)},
              ${a?se("coords",2,R.rank):se("coords",3,R.rank)},
              ${a?se("coords",3,R.rank):se("coords",4,R.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?se("uniforms.x_shape",1,R.rank):se("uniforms.x_shape",2,R.rank)};
              let xShapeZ = ${a?se("uniforms.x_shape",2,R.rank):se("uniforms.x_shape",3,R.rank)};
              let xShapeW = ${a?se("uniforms.x_shape",3,R.rank):se("uniforms.x_shape",4,R.rank)};
              let xShapeU = ${a?se("uniforms.x_shape",4,R.rank):se("uniforms.x_shape",1,R.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${O?"value = value + getBiasByOutputCoords(coords)":""};
              ${ae}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${b};${O}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:v}),getShaderSource:I}}});var zT,MT,BT=U(()=>{"use strict";_e();Te();Se();Pn();zT=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",c=u?r[3]:r[1],f=c/e.group,m=u&&f>=4?ze(c):1,b=V.size(r)/m,_=[{type:12,data:b},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:f}];sr(e,_),_.push(...ee(a,[s[0],s[1],s[2],s[3]/m]));let v=o?["rank","rank","rank"]:["rank","rank"];_.push(...ee([r[0],r[1],r[2],r[3]/m]));let x=O=>{let I=J("output",n[0].dataType,r.length,m),S=Ke(I.type.tensor),C=ar(e,I.type.value,S),D=W("x",n[0].dataType,a.length),N=W("w",n[1].dataType,s.length,m),R=[D,N];o&&R.push(W("b",n[2].dataType,n[2].dims,m));let H=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];ur(e,H);let A=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${D.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${N.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${D.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${N.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${O.registerUniforms(H).declareVariables(...R,I)}

  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${I.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${I.type.value} = ${I.type.value}(0);
    ${A}
    ${i}
    ${C}
    ${I.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${m}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:x}},MT=(n,e,r,t)=>{let o=n.length>2,i=ze(r[3]),a=ze(r[2]),s=V.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],c=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],f=[r[0],r[1],r[2],r[3]/i],m=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];sr(e,m),m.push(...ee(u,c,f));let b=(a-1)*e.strides[1]+c[1],_=v=>{let x=J("output",n[0].dataType,f.length,i),O=Ke(x.type.tensor),I=ar(e,x.type.value,O),S=W("x",n[0].dataType,u.length,i),C=W("w",n[1].dataType,c.length,i),D=[S,C];o&&D.push(W("b",n[2].dataType,n[2].dims,i));let N=o?"value += b[output_channel];":"",R=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return ur(e,R),`
  ${v.registerUniforms(R).declareVariables(...D,x)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${S.type.value}, ${b}>;
    var values: array<${x.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${b}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${S.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${S.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${C.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${N}
      ${I}
      ${x.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${b};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:m}),getShaderSource:_}}});var QL,Bc,eR,Fc,Vc,FT,tR,rR,Gc,VT=U(()=>{"use strict";Te();CT();RT();is();BT();Pn();os();ln();QL=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,c=e[0],m=e.slice(2).map((v,x)=>v+(v-1)*(r[x]-1)),_=s.map((v,x)=>v+t[x]+t[x+u]).map((v,x)=>Math.floor((v-m[x]+o[x])/o[x]));return _.splice(0,0,a),_.splice(i?3:1,0,c),_},Bc=[2,3,1,0],eR=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Fc=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();Jn.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Vc=n=>{let e=ts(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,c=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},FT=(n,e,r,t)=>{let o=r.format==="NHWC",i=QL(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let R=[e[0]];if(o){let A=n.kernelCustomData.wT??n.compute(yt(e[1],Bc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=A),R.push(A)}else R.push(e[1]);e.length===3&&R.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(MT(R,r,i,t),{inputs:R}):n.compute(zT(R,r,i,t),{inputs:R});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],c=e[0].dims[o?3:1],f=e[1].dims[2],m=e[1].dims[3],b=i[o?1:2],_=i[o?2:3],v=i[o?3:1],x=o&&f===s&&m===u&&r.pads[0]===0&&r.pads[1]===0;if(x||f===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let R=i[0],H,A,X,Y=[];if(o){let me=n.kernelCustomData.wT??n.compute(yt(e[1],Bc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=me),x){let j=s*u*c;H=e[0].reshape([1,R,j]),A=me.reshape([1,j,v]),X=[1,R,v]}else H=e[0].reshape([R,s*u,c]),A=me.reshape([1,c,v]),X=[R,b*_,v];Y.push(H),Y.push(A)}else H=e[0].reshape([R,c,s*u]),A=e[1].reshape([1,v,c]),X=[R,v,b*_],Y.push(A),Y.push(H);a&&Y.push(e[2]);let le=X[2],ae=Y[0].dims[Y[0].dims.length-1];le<8&&ae<8?n.compute(ns(Y,r,i,X,o,t),{inputs:Y}):n.compute(ti(Y,r,i,X,o,t),{inputs:Y});return}let O=!0,I=n.kernelCustomData.wT??n.compute(yt(e[1],Bc),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=I);let S=[e[0],I];a&&S.push(e[2]);let C=o?b*_:v,D=o?v:b*_,N=f*m*c;n.compute(ET(S,r,i,C,D,N,a,O,t),{inputs:S})},tR=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Fc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);FT(n,t,u,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},rR=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Fc(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=NT(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(LT(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Gc=(n,e)=>{if(eR(n.inputs,e),n.inputs[0].dims.length===3)tR(n,e);else if(n.inputs[0].dims.length===5)rR(n,n.inputs,e);else{let r=Fc(e,n.inputs);FT(n,n.inputs,r)}}});var GT,UT=U(()=>{"use strict";_e();Zr();Te();Se();GT=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,c=s[3],f=i?ze(u):1,m=i&&c===1&&u>=4,b=m?Math.floor(u/4)*4:Math.floor(u/f)*f,_=u-b,v=i?ze(c):1,x=i?c===1?f:v:1,O=V.size(o)/v,I=[Math.ceil(O/64),1,1];$e("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${I}`);let S=["rank","rank"],C=[e.strides[0],e.strides[1]],D=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],N=[e.dilations[0],e.dilations[1]],R=[D[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),D[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],H=[R[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),R[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],A=[{type:12,data:O},{type:12,data:C},{type:12,data:D},{type:12,data:N},{type:12,data:R},{type:6,data:H},{type:12,data:b},{type:12,data:u},{type:12,data:c},...ee(n[0].dims,n[1].dims)];t&&(A.push(...ee(n[2].dims)),S.push("rank")),A.push(...ee(o));let X=Y=>{let le=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:C.length},{name:"filter_dims",type:"u32",length:D.length},{name:"dilations",type:"u32",length:D.length},{name:"effective_filter_dims",type:"u32",length:R.length},{name:"pads",type:"i32",length:H.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ae=Ke(n[0].dataType),me=i?1:2,j=i?2:3,Q=i?3:1,de=W("W",n[1].dataType,n[1].dims.length,x),he=W("Dy",n[0].dataType,n[0].dims.length,f),ce=[he,de];t&&ce.push(W("bias",n[2].dataType,[o[Q]].length,v));let xe=J("result",n[0].dataType,o.length,v),Ae=()=>{let Xe="";if(m)f===4?Xe+=`
        let xValue = ${he.getByOffset("x_offset")};
        let wValue = ${de.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?Xe+=`
          dotProd = dotProd + dot(vec4<${ae}>(${he.getByOffset("x_offset")}, ${he.getByOffset("x_offset + 1u")}), vec4<${ae}>(${de.getByOffset("w_offset")}, ${de.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(Xe+=`
          dotProd = dotProd + dot(vec4<${ae}>(${he.getByOffset("x_offset")}, ${he.getByOffset("x_offset + 1u")}, ${he.getByOffset("x_offset + 2u")}, ${he.getByOffset("x_offset + 3u")}), vec4<${ae}>(${de.getByOffset("w_offset")}, ${de.getByOffset("w_offset + 1u")}, ${de.getByOffset("w_offset + 2u")}, ${de.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Xe+=`
                  let xValue = ${i?he.getByOffset(`${he.indicesToOffset(`${he.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):he.get("batch","inputChannel","idyR","idyC")};
        `,f===1)Xe+=`
          let w_offset = ${de.indicesToOffset(`${de.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${de.getByOffset(`w_offset / ${x}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let Z=0;Z<f;Z++)Xe+=`
            let wValue${Z} = ${de.getByOffset(`${de.indicesToOffset(`${de.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${Z}, wOutChannel)`)} / ${x}`)};
            dotProd = dotProd + xValue[${Z}] * wValue${Z};`;return Xe},ke=()=>{if(_===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let Xe="";if(f===1){Xe+="dotProd = dotProd";for(let Z=0;Z<_;Z++)Xe+=`
            + ${he.getByOffset(`x_offset + ${Z}`)} * ${de.getByOffset(`w_offset + ${Z}`)}`;Xe+=";"}else if(f===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);Xe+=`
          let xValue = ${he.getByOffset("x_offset")};
          let wValue = ${de.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Xe},It=`
            let outputIndices = ${xe.offsetToIndices(`global_idx * ${v}`)};
            let batch = ${xe.indicesGet("outputIndices",0)};
            let d1 = ${xe.indicesGet("outputIndices",Q)};
            let r = ${xe.indicesGet("outputIndices",me)};
            let c = ${xe.indicesGet("outputIndices",j)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${xe.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${ae}(dyRCorner) + ${ae}(wR)) / ${ae}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ae}(uniforms.Dy_shape[${me}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${ae}(dyCCorner) + ${ae}(wC)) / ${ae}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ae}(uniforms.Dy_shape[${j}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${he.indicesToOffset(`${he.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${de.indicesToOffset(`${de.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${x};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:f}) {
                  ${Ae()}
                  inputChannel = inputChannel + ${m?4:f};
                }
                ${ke()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${v}]`:""};
            ${xe.setByOffset("global_idx","value")};
          `;return`
    ${Y.registerUniforms(le).declareVariables(...ce,xe)}
      ${Y.mainStart()}
      ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${It}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${f}${x}${v}${m}${_}`,inputDependencies:S},getRunData:()=>({dispatchGroup:{x:I[0],y:I[1],z:I[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:A}),getShaderSource:X}}});var nR,oR,iR,WT,HT,aR,jT,sR,qT,KT=U(()=>{"use strict";UT();Pn();ln();nR=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,oR=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},iR=(n,e,r,t,o,i,a,s,u,c)=>{let f=n.length-2,m=c.length===0;u.length<f&&u.push(...Array(f-u.length).fill(0));let b=n[0],_=e[s?3:1]*o;for(let v=0,x=n.length-f-(s?1:0);v<f;++v,++x){let O=n[x],I=m?O*a[v]:c[v],S=nR(O,a[v],i[v],e[x],r[v],I);oR(S,t,i,v,v+f),m&&c.push(a[v]*(O-1)+u[v]+(e[x]-1)*r[v]+1-i[v]-i[v+f])}c.splice(0,0,b),c.splice(s?3:1,0,_)},WT=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((m,b)=>m*b,1)===0){r.length=0;for(let m=2;m<e[1].dims.length;++m)r.push(e[1].dims[m])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((m,b)=>m+b,0)===0){let m=e[0].dims.length-2;u=new Array(m).fill(1)}let c=n.strides.slice();if(c.reduce((m,b)=>m+b,0)===0){let m=e[0].dims.length-2;c=new Array(m).fill(1)}iR(s,r,u,n.autoPad,n.group,o,c,t,a,i);let f=Object.assign({},n);return Object.assign(f,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:c}),f},HT=n=>{let e=ts(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group??1,a=n.kernelShape,s=n.pads,u=n.strides,c=n.wIsConst(),f=n.outputPadding,m=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:f,outputShape:m,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},aR=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((f,m)=>f+m,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((f,m)=>f+m,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((f,m)=>f+m,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((f,m)=>f+m,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},jT=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(yt(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(GT(i,r,t),{inputs:i})},sR=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let c=WT({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);jT(n,t,c,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},qT=(n,e)=>{if(aR(n.inputs,e),n.inputs[0].dims.length===3)sR(n,e);else{let r=WT(e,n.inputs);jT(n,n.inputs,r)}}});var uR,XT,ZT,JT=U(()=>{"use strict";_e();Te();it();Se();uR=(n,e,r,t)=>{let o=V.size(e),i=e.length,a=W("input",n,i),s=J("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=V.normalizeAxis(u,i),f=m=>{let b=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,_=se("uniforms.input_shape","uniforms.axis",i),v=t.reverse?b+(t.exclusive?" + 1":""):"0",x=t.reverse?_:b+(t.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${v};
                  let last : i32 = ${x};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...ee(e,e)]}),getShaderSource:f}},XT=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(uR(t,r,o,e),{inputs:[0]})},ZT=n=>{let e=n.exclusive===1,r=n.reverse===1;return we({exclusive:e,reverse:r})}});var lR,cR,dR,YT,QT,e1=U(()=>{"use strict";_e();Te();it();Se();lR=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cR=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},dR=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",c=e.blocksize,f=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=f?[r,t,o,c,c,i/c**2]:[r,t,o,i/c**2,c,c],s=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=f?[r,c,c,i/c**2,t,o]:[r,i/c**2,c,c,t,o],s=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=n.reshape(a),b=m.dims.length,_=n.dataType,v=W("a",_,b),x=J("output",_,b),O=I=>`
  ${I.registerUniform("output_size","u32").declareVariables(v,x)}

  ${cR(s,b,v,x)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:I=>{let S=u?[r,t*c,o*c,i/c**2]:[r,i/c**2,t*c,o*c],C=V.size(S),D=m.dims,N=V.sortBasedOnPerm(D,s);return{outputs:[{dims:S,dataType:I[0].dataType}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:[{type:12,data:C},...ee(D,N)]}},getShaderSource:O}},YT=(n,e)=>{lR(n.inputs),n.compute(dR(n.inputs[0],e))},QT=n=>we({blocksize:n.blocksize,mode:n.mode,format:n.format})});var Uc,ss,t1,pR,fR,Wc,Hc,r1,hR,n1,o1,i1=U(()=>{"use strict";_e();Te();it();Se();Uc="[a-zA-Z]|\\.\\.\\.",ss="("+Uc+")+",t1="^"+ss+"$",pR="("+ss+",)*"+ss,fR="^"+pR+"$",Wc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},Hc=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(fR)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let c=e[u].dims.slice();if(!s.match(RegExp(t1)))throw new Error("Invalid LHS term");let f=this.processTerm(s,!0,c,u);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(ss)))throw new Error("Invalid RHS");o.match(RegExp(Uc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(t1))&&!r&&e!=="")throw new Error("Invalid LHS term");let c=e.match(RegExp(Uc,"g")),f=new Wc(o);return c?.forEach((m,b)=>{if(m==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let _=i-c.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+_),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let v=0;v<s.length;v++){let x=String.fromCharCode(48+v);f.addSymbol(x,b+v),this.addSymbol(x,t[u++],o)}}else f.addSymbol(m,b+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,t[u++],o)}),f}},r1=n=>n+"_max",hR=(n,e,r,t)=>{let i=n.map(f=>f.length).map((f,m)=>W(`input${m}`,e,f)),a=V.size(t),s=J("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(f=>!r.rhs.symbolToIndices.has(f)),c=f=>{let m=[],b="var prod = 1.0;",_="var sum = 0.0;",v="sum += prod;",x=[],O=[],I=[],S=[],C=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((N,R)=>{if(r.rhs.symbolToIndices.has(R)){let H=r.rhs.symbolToIndices.get(R)?.[0];H!==void 0&&r.lhs.forEach((A,X)=>{if(N.inputIndices.includes(X)){let Y=A.symbolToIndices.get(R);if(Y===void 0)throw new Error("Invalid symbol error");Y.forEach(le=>{m.push(`${i[X].indicesSet(`input${X}Indices`,le,s.indicesGet("outputIndices",H))}`)})}})}else r.lhs.forEach((H,A)=>{if(N.inputIndices.includes(A)){let X=H.symbolToIndices.get(R);if(X===void 0)throw new Error("Invalid symbol error");X.forEach(Y=>{x.push(`${i[A].indicesSet(`input${A}Indices`,Y,`${R}`)}`)}),S.push(`prod *= ${i[A].getByIndices(`input${A}Indices`)};`)}}),O.push(`for(var ${R}: u32 = 0; ${R} < uniforms.${r1(R)}; ${R}++) {`),I.push("}")});let D=C?[...m,`let sum = ${i.map((N,R)=>N.getByIndices(`input${R}Indices`)).join(" * ")};`]:[...m,_,...O,...x,b,...S,v,...I];return`
            ${f.registerUniforms(u.map(N=>({name:`${r1(N)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((N,R)=>`var input${R}Indices: ${i[R].type.indices};`).join(`
`)}
            ${D.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let f=u.filter(b=>r.symbolToInfo.has(b)).map(b=>({type:12,data:r.symbolToInfo.get(b)?.dimValue||0}));f.push({type:12,data:a});let m=n.map((b,_)=>[...ee(b)]).reduce((b,_)=>b.concat(_),f);return m.push(...ee(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:m}},getShaderSource:c}},n1=(n,e)=>{let r=new Hc(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(hR(o,n.inputs[0].dataType,r,t))},o1=n=>{let e=n.equation.replace(/\s+/g,"");return we({equation:e})}});var mR,a1,gR,bR,s1,u1=U(()=>{"use strict";_e();Te();Se();mR=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},a1=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},gR=(n,e)=>n.length>e.length?a1(n,e):a1(e,n),bR=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=gR(e,r),o=n[0].dataType,i=o===9||V.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(V.size(t)/s),c=m=>{let b=W("input",o,e.length,a),_=J("output",o,t.length,s),v;if(o===9){let x=(O,I,S="")=>`
          let outputIndices${I} = ${_.offsetToIndices(`outputOffset + ${I}u`)};
          let offset${I} = ${b.broadcastedIndicesToOffset(`outputIndices${I}`,_)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${O}[${I}] = ${S}(${b.getByOffset(`index${I}`)}[component${I}]);
        `;v=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${x("data",0,"u32")}
        ${x("data",1,"u32")}
        ${x("data",2,"u32")}
        ${x("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else v=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${b.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${b.getByOffset(`inputOffset / ${a}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(b,_)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${v}`},f=[{type:12,data:u},...ee(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f})}},s1=n=>{mR(n.inputs),n.compute(bR(n.inputs),{inputs:[0]})}});var yR,l1,c1=U(()=>{"use strict";_e();Te();Se();es();yR=n=>{let e=n[0].dataType,r=V.size(n[0].dims),t=V.size(n[1].dims),o=t%4===0,i=a=>{let s=W("x",e,[1],4),u=W("bias",e,[1],4),c=J("y",e,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${u.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,b=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(f).declareVariables(s,u,c)}

    ${Lc(bt(e))}

    ${a.mainStart(Yn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${b}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",Rc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Yn/4)}})}},l1=n=>{n.inputs.length<2||V.size(n.inputs[1].dims)===0?iT(n):n.compute(yR(n.inputs))}});var _R,wR,d1,p1,f1=U(()=>{"use strict";_e();Te();it();Se();_R=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},wR=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=V.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,c=Math.ceil(V.size(a)/u),f=[{type:12,data:c},{type:6,data:s},{type:12,data:i},...ee(n[0].dims,n[1].dims,a)],m=b=>{let _=W("data",n[0].dataType,n[0].dims.length,u),v=W("inputIndices",n[1].dataType,n[1].dims.length),x=J("output",n[0].dataType,a.length,u),O=S=>{let C=t.length,D=`var indicesIndices${S}  = ${v.type.indices}(0);`;for(let N=0;N<C;N++)D+=`${C>1?`indicesIndices${S}[${N}]`:`indicesIndices${S}`} = ${a.length>1?`outputIndices${S}[uniforms.axis + ${N}]`:`outputIndices${S}`};`;D+=`
          var idx${S} = ${v.getByIndices(`indicesIndices${S}`)};
          if (idx${S} < 0) {
            idx${S} = idx${S} + uniforms.axisDimLimit;
          }
          var dataIndices${S} : ${_.type.indices};
        `;for(let N=0,R=0;N<o;N++)N===i?(D+=`${o>1?`dataIndices${S}[${N}]`:`dataIndices${S}`} = u32(idx${S});`,R+=C):(D+=`${o>1?`dataIndices${S}[${N}]`:`dataIndices${S}`} = ${a.length>1?`outputIndices${S}[${R}]`:`outputIndices${S}`};`,R++);return D},I;if(n[0].dataType===9){let S=(C,D,N="")=>`
          let outputIndices${D} = ${x.offsetToIndices(`outputOffset + ${D}u`)};
          ${O(D)};
          let offset${D} = ${_.indicesToOffset(`dataIndices${D}`)};
          let index${D} = offset${D} / 4u;
          let component${D} = offset${D} % 4u;
          ${C}[${D}] = ${N}(${_.getByOffset(`index${D}`)}[component${D}]);
        `;I=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${S("value",0,"u32")}
        ${S("value",1,"u32")}
        ${S("value",2,"u32")}
        ${S("value",3,"u32")}
        ${x.setByOffset("global_idx","value")}
      `}else I=`
      let outputIndices = ${x.offsetToIndices("global_idx")};
      ${O("")};
      let value = ${_.getByIndices("dataIndices")};
      ${x.setByOffset("global_idx","value")};
      `;return`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,v,x)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${I}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:m}},d1=n=>we({axis:n.axis}),p1=(n,e)=>{let r=n.inputs;_R(r),n.compute(wR(n.inputs,e))}});var vR,h1,m1,g1=U(()=>{"use strict";_e();Te();Se();vR=(n,e,r,t,o,i,a,s,u)=>{let c=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],f=[i];c.push(...ee(e.dims,f));let m=b=>{let _=W("indices_data",e.dataType,e.dims.length),v=J("input_slice_offsets_data",12,1,1),x=[_,v],O=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${b.registerUniforms(O).declareVariables(...x)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${o.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:m},{inputs:[e],outputs:[-1]})[0]},h1=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=V.sizeToDimension(i,i.length-1),u=V.sizeFromDimension(t,e.batchDims+a),c=V.sizeToDimension(t,e.batchDims),f=V.sizeFromDimension(t,e.batchDims),m=s/c,b=new Array(a),_=u;for(let D=0;D<a;++D)b[a-1-D]=_,_*=t[e.batchDims+a-1-D];let v=vR(n,r[1],b,e.batchDims,t,s,m,f,a),x=e.batchDims+a;if(x>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let O=i.slice(0,-1).concat(t.slice(x)),I=V.size(O),S=[{type:12,data:I},{type:12,data:u},...ee(r[0].dims,v.dims,O)],C=D=>{let N=W("data",r[0].dataType,r[0].dims.length),R=W("slice_offsets",12,v.dims.length),H=J("output",r[0].dataType,O.length);return`
          ${D.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(N,R,H)}
            ${D.mainStart()}
            ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:O,dataType:o}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:S}),getShaderSource:C},{inputs:[r[0],v]})},m1=n=>({batchDims:n.batch_dims,cacheKey:""})});var xR,TR,b1,y1,_1=U(()=>{"use strict";_e();Te();it();Se();xR=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=V.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},TR=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=V.normalizeAxis(e.gatherAxis,o),a=V.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=V.size(s),c=n[2].dataType,m=n[0].dataType===22,b=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...ee(...n.map((v,x)=>v.dims),s)],_=v=>{let x=W("data",n[0].dataType,n[0].dims.length),O=W("inputIndices",n[1].dataType,n[1].dims.length),I=W("scales",n[2].dataType,n[2].dims.length),S=n.length>3?W("zeroPoint",n[3].dataType,n[3].dims.length):void 0,C=J("output",c,s.length),D=[x,O,I];S&&D.push(S);let N=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${v.registerUniforms(N).declareVariables(...D,C)}
        ${v.mainStart()}
        let output_indices = ${C.offsetToIndices("global_idx")};
        var indices_indices = ${O.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${C.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${O.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${C.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${x.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${C.indicesGet("output_indices","i")};
          ${x.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${O.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${x.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${C.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${x.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${x.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${x.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${I.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${I.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${I.getByIndices("scale_indices")};
        ${S?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${S.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${S.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${bt(c)}(quantized_data - zero_point) * scale;
        ${C.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((v,x)=>x!==1).map(v=>v.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(v,x)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:c}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:b}),getShaderSource:_}},b1=(n,e)=>{let r=n.inputs;xR(r,e),n.compute(TR(n.inputs,e))},y1=n=>we({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var IR,SR,w1,v1,x1=U(()=>{"use strict";_e();Te();it();Se();IR=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},SR=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=V.normalizeAxis(e.axis,o),u=r[s],c=i.slice(0),f=V.size(c),m=W("input",t,o),b=W("indicesInput",a,i.length),_=J("output",t,c.length),v=[{type:12,data:f},{type:6,data:u},{type:12,data:s}];return v.push(...ee(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:v}),getShaderSource:I=>`
      ${I.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,b,_)}
      ${I.mainStart()}
      ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${b.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},w1=n=>we({axis:n.axis}),v1=(n,e)=>{let r=n.inputs;IR(r),n.compute(SR(n.inputs,e))}});var $R,AR,T1,I1,S1=U(()=>{"use strict";_e();Te();Se();$R=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},AR=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=Va.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,c=Math.ceil(i/u),f=Math.ceil(o/u),m=!0,b=V.size(s),_=[{type:12,data:m?c:b},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],v=["type","type"];n.length===3&&(_.push(...ee(n[2].dims)),v.push("rank")),_.push(...ee(s));let x=I=>{let S="";e.transA&&e.transB?S="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?S="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?S="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(S="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let C=e.alpha===1?"":"value *= uniforms.alpha;",D=W("a",n[0].dataType,n[0].dims),N=W("b",n[1].dataType,n[1].dims),R=D.type.value,H=null,A=[D,N];n.length===3&&(H=W("c",n[2].dataType,n[2].dims.length),A.push(H));let X=J("output",n[0].dataType,s.length);A.push(X);let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${I.registerUniforms(Y).declareVariables(...A)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${R}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${S}
    }

    ${C}
    ${H!=null?`let cOffset = ${H.broadcastedIndicesToOffset("vec2(m, n)",X)}; value += ${R}(uniforms.beta) * ${H.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},O=I=>{let S=W("a",n[0].dataType,n[0].dims),C=W("b",n[1].dataType,n[1].dims),D=null,N=[S,C];n.length===3&&(D=W("c",n[2].dataType,n[2].dims.length),N.push(D));let R=J("output",n[0].dataType,s.length);N.push(R);let H=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],A="",X="";e.transA&&e.transB?(X=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${S.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,A="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(X=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${S.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,A="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(X=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${S.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,A="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(X=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${S.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${C.type.value}(0);
      }
      `,A="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let Y=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${I.registerUniforms(H).declareVariables(...N)}
  var<workgroup> tile_a: array<array<${S.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${C.type.storage}, ${u}>, ${u}>;
  ${I.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${R.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${X}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${A}
      }
      workgroupBarrier();
    }

    ${Y}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${D!=null?`let cOffset = ${D.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${R.type.value}(uniforms.beta) * ${D.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:c*f},programUniforms:_}),getShaderSource:O}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:_}),getShaderSource:x}},T1=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},I1=(n,e)=>{$R(n.inputs),n.compute(AR(n.inputs,e))}});var cn,En,wo,vo,OR,PR,ER,CR,DR,kR,NR,LR,$1,A1,O1=U(()=>{"use strict";_e();Te();it();Se();[cn,En,wo,vo]=[0,1,2,3],OR=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},PR=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,ER=n=>`
  fn gs_bicubic_interpolate(p: mat4x4<${n}>, x: f32, y: f32) -> ${n} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${n}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,CR=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,DR=n=>`
  ${n.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,kR=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${cn}] = batch;
     indices[${En}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${wo}] = u32(r);
            indices[${vo}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${wo}] = u32(clamp(r, 0, H - 1));
          indices[${vo}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${wo}] = gs_reflect(r, border[1], border[3]);
          indices[${vo}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,NR=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${cn}], indices[${En}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${cn}], indices[${En}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${cn}], indices[${En}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${cn}], indices[${En}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${cn}], indices[${En}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${cn}], indices[${En}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,LR=(n,e)=>{let r=W("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=W("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[cn,En,wo,vo]=[0,3,1,2]);let a=J("output",n[0].dataType,i.length),s=r.type.value,u=V.size(i),c=[{type:12,data:u},...ee(n[0].dims,t,i)],f=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${PR}
  ${ER(s)}
  ${CR(e)}
  ${DR(e)}
  ${kR(r,s,e)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${wo}]);
      let W_in = i32(uniforms.x_shape[${vo}]);

      ${e.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${cn}], indices[${wo}], indices[${vo}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${NR(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let b=V.size(i);return{outputs:[{dims:i,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:c}},getShaderSource:f}},$1=(n,e)=>{OR(n.inputs),n.compute(LR(n.inputs,e))},A1=n=>we({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var Nt,MR,E1,P1,BR,ri,C1,jc=U(()=>{"use strict";_e();Te();it();qa();Ya();Se();ln();Nt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,MR=(n,e)=>{let r=n[0],t=Nt(n,1),o=Nt(n,2),i=Nt(n,3),a=Nt(n,4),s=Nt(n,5),u=Nt(n,6),c=Nt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],m=r.dims[1],b=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],_=m,v=0,x=0,O=Math.floor(b/e.numHeads);if(u&&c&&V.size(u.dims)&&V.size(c.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==e.numHeads||u.dims[3]!==O)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==f||c.dims[1]!==e.numHeads||c.dims[3]!==O)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');v=u.dims[2],x=u.dims[2]}else if(u&&V.size(u.dims)||c&&V.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let I;if(t&&V.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');I=2,_=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==O)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');I=5,_=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==O)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');I=0,_=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');I=3}if(i&&V.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let S=v+_,C=0;if(a&&V.size(a.dims)>0){C=8;let H=a.dims;throw H.length===1?H[0]===f?C=1:H[0]===3*f+2&&(C=3):H.length===2&&H[0]===f&&H[1]===S&&(C=5),C===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let D=!1,N=b;if(o&&V.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');N=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');N=o.dims[1]*o.dims[3],D=!0}}let R=!1;if(a&&V.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&V.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==f||s.dims[1]!==e.numHeads||s.dims[2]!==m||s.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:m,pastSequenceLength:v,kvSequenceLength:_,totalSequenceLength:S,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:b,vHiddenSize:N,headSize:O,vHeadSize:Math.floor(N/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:C,scale:e.scale,broadcastResPosBias:R,passPastInKv:D,qkvFormat:I}},E1=n=>we({...n}),P1=we({perm:[0,2,1,3]}),BR=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=V.size(s),c=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],f=m=>{let b=J("qkv_with_bias",e.dataType,s),_=W("qkv",e.dataType,s),v=W("bias",r.dataType,s),x=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(_,v,b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:f},{inputs:[e,r],outputs:[-1]})[0]},ri=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&V.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=BR(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(yt(u,P1.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(yt(u,P1.perm),{inputs:[u],outputs:[-1]})[0]},C1=(n,e)=>{let r=MR(n.inputs,e),t=n.inputs[0],o=Nt(n.inputs,1),i=Nt(n.inputs,2),a=Nt(n.inputs,3),s=Nt(n.inputs,4),u=Nt(n.inputs,5),c=Nt(n.inputs,6),f=Nt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let m=o&&i&&o.dims.length===4&&i.dims.length===4,b=ri(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(m)return _o(n,b,o,i,s,void 0,c,f,u,r);if(!o||!i)throw new Error("key and value must be provided");let _=ri(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),v=ri(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);_o(n,b,_,v,s,void 0,c,f,u,r)}});var FR,VR,GR,UR,qc,D1,k1,Kc=U(()=>{"use strict";_e();Te();it();Se();FR=n=>{if(!n||n.length<1)throw new Error("too few inputs")},VR=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),we({numOutputs:t,axis:e.axis,splitSizes:r})},GR=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${se("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,UR=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},qc=(n,e)=>{let r=n[0].dims,t=V.size(r),o=n[0].dataType,i=V.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=W("input",o,r.length),u=new Array(e.numOutputs),c=[],f=[],m=0,b=[{type:12,data:t}];for(let v=0;v<e.numOutputs;v++){m+=e.splitSizes[v],u[v]=m;let x=r.slice();x[i]=e.splitSizes[v],f.push(x),a[v]=J(`output${v}`,o,x.length),c.push({dims:f[v],dataType:n[0].dataType})}b.push({type:12,data:u},...ee(r,...f));let _=v=>`
  ${v.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${GR(u.length)}
  ${UR(a)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${se("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:b})}},D1=(n,e)=>{FR(n.inputs);let r=n.inputs.length===1?e:VR(n.inputs,e);n.compute(qc(n.inputs,r),{inputs:[0]})},k1=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return we({axis:e,numOutputs:t,splitSizes:r})}});var WR,us,N1,Xc=U(()=>{"use strict";_e();Te();it();Se();WR=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!V.areEqual(t.dims,[])&&!V.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!V.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],c=r.dims[r.dims.length-2],f=o.dims[0],m=V.sizeFromDimension(r.dims,1)/c,b=s===0?o.dims[1]*2:m/a;if(s>b)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(c!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(b/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},us=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=V.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],c=s/u,f=n[2].dims[1],m=o===0?f*2:c/t,b=new Array(a,u,c/m,m-f),_=V.computeStrides(b),v=[{type:1,data:i},{type:12,data:b},{type:12,data:_},...n[0].dims.length===3?new Array({type:12,data:[s,c,m,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,m,u*m,1]}):[],...ee(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],x=O=>{let I=W("input",n[0].dataType,n[0].dims.length),S=W("position_ids",n[1].dataType,n[1].dims.length),C=W("cos_cache",n[2].dataType,n[2].dims.length),D=W("sin_cache",n[3].dataType,n[3].dims.length),N=J("output",n[0].dataType,n[0].dims.length);return O.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:b.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${O.declareVariables(I,S,C,D,N)}

        ${O.mainStart(Yn)}
          let half_rotary_emb_dim = uniforms.${C.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${O.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${S.broadcastedIndicesToOffset("bsnh.xy",J("",S.type.tensor,2))};
            let position_id =
                u32(${S.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${I.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} -
                ${I.getByOffset("j")} * ${D.get("position_id","bsnh[3]")};
            ${N.setByOffset("i","re")}
            let im = ${I.getByOffset("i")} * ${D.get("position_id","bsnh[3]")} +
                ${I.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${N.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${N.setByOffset("k",I.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:we({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(V.size(b)/Yn)},programUniforms:v})}},N1=(n,e)=>{WR(n.inputs,e),n.compute(us(n.inputs,e))}});var HR,jR,L1,qR,R1,z1=U(()=>{"use strict";it();_e();Ya();jc();Kc();ln();Xc();Se();HR=(n,e)=>{if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.doRotary!==0&&n.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],c=r.dims[1],f=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],m=c,b=0,_=!t||t.dims.length===0,v=Math.floor(_?f/(e.numHeads+2*e.kvNumHeads):f/e.numHeads);_&&(f=v*e.numHeads);let x=i&&i.dims.length!==0,O=a&&a.dims.length!==0;if(x&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===v)throw new Error("BSNH pastKey/pastValue is not supported");if(x&&O){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=i.dims[2]}else if(x||O)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let S=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');m=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');S=3}let C=0,D=!1,N=e.kvNumHeads?v*e.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');N=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');N=o.dims[1]*o.dims[3],D=!0}}let R=n.length>4?n[5]:void 0;if(R&&R.dims.length!==1&&R.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:c,pastSequenceLength:b,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:N,headSize:v,vHeadSize:Math.floor(N/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:C,scale:e.scale,broadcastResPosBias:!1,passPastInKv:D,qkvFormat:S}},jR=we({perm:[0,2,1,3]}),L1=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(yt(t,jR.perm),{inputs:[t],outputs:[-1]})[0]),t},qR=(n,e,r,t)=>{let o=7,i=["type","type"],a=[n*e],s=n*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:n}],c=f=>{let m=W("seq_lens",r.dataType,r.dims),b=W("total_seq_lens",t.dataType,t.dims),_=J("pos_ids",o,a),v=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(v).declareVariables(m,b,_)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${b.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${m.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${n};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:c}},R1=(n,e)=>{let r=HR(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,c=n.inputs.length>5?n.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=we({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[b,_,v]=!o&&!i?n.compute(qc([t],m),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],x,O;if(e.doRotary){let D=n.compute(qR(r.batchSize,r.sequenceLength,u,c),{inputs:[u,c],outputs:[-1]})[0],N=n.inputs[7],R=n.inputs[8],H=we({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),A=[b,D,N,R],X=[-1];x=n.compute(us(A,H),{inputs:A,outputs:X})[0],A.splice(0,1,_);let Y=we({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});O=n.compute(us(A,Y),{inputs:A,outputs:X})[0]}let I=ri(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?x:b,void 0,0),S=L1(n,e.doRotary?O:_,r),C=L1(n,v,r);_o(n,I,S,C,void 0,void 0,a,s,void 0,r,u,c)}});var M1,KR,XR,B1,F1=U(()=>{"use strict";_e();Te();ln();Se();M1=(n,e,r,t,o,i,a,s)=>{let u=ze(i),c=u===1?"f32":`vec${u}f`,f=u===1?"vec2f":`mat2x${u}f`,m=o*a,b=64;m===1&&(b=256);let _=[o,a,i/u],v=[o,a,2],x=["rank","type","type"],O=[];O.push(...ee(_,v));let I=S=>{let C=W("x",e.dataType,3,u),D=W("scale",r.dataType,r.dims),N=W("bias",t.dataType,t.dims),R=J("output",1,3,2),H=[C,D,N,R];return`
  var<workgroup> workgroup_shared : array<${f}, ${b}>;
  const workgroup_size = ${b}u;
  ${S.declareVariables(...H)}
  ${S.mainStart(b)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${C.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ir("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${ir("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${b}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:v,dataType:1}],dispatchGroup:{x:m},programUniforms:O}),getShaderSource:I},{inputs:[e,r,t],outputs:[-1]})[0]},KR=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=V.sizeFromDimension(t,i),c=ze(u),f=V.size(o)/c,m=M1(n,e[0],e[1],e[2],a,u,s,r.epsilon),b=[a,s,u/c],_=[a,s],v=["type","none"],x=O=>{let I=W("x",e[0].dataType,b.length,c),S=W("scale_shift",1,_.length,2),C=J("output",e[0].dataType,b.length,c),D=[I,S,C];return`
  ${O.registerUniform("output_size","u32").declareVariables(...D)}
  ${O.mainStart()}
  ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${C.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${S.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${I.getByOffset("global_idx")} * ${C.type.value}(scale_shift.x) + ${C.type.value}(scale_shift.y);
      ${C.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...ee(b,_,b)]}),getShaderSource:x},{inputs:[e[0],m]})},XR=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=V.sizeFromDimension(t,1)/a,u=ze(a),c=V.size(o)/u,f=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],m=["type","type"],b=!1,_=[0,t.length-1];for(let I=0;I<t.length-2;I++)b=b||t[I+1]!==1,_.push(I+1);b=b&&t[t.length-1]!==1;let v=b?n.compute(yt(n.inputs[0],_),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(I,S)=>t[_[S]])),x=M1(n,v,e[1],e[2],i,s,a,r.epsilon),O=I=>{let S=Ke(e[0].dataType),C=u===1?"vec2f":`mat${u}x2f`,D=H=>{let A=H===0?"x":"y",X=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${S}(${X}(scale.${A}))`;case 2:return`vec2<${S}>(${X}(scale[0].${A}, scale[1].${A}))`;case 4:return`vec4<${S}>(${X}(scale[0].${A}, scale[1].${A}, scale[2].${A}, scale[3].${A}))`;default:throw new Error(`Not supported compoents ${u}`)}},N=W("input",e[0].dataType,e[0].dims,u),R=J("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${N.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${C}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${R.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${I.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${D(0)}, ${D(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:O},{inputs:[e[0],x]})},B1=(n,e)=>{e.format==="NHWC"?XR(n,n.inputs,e):KR(n,n.inputs,e)}});var ZR,JR,V1,G1=U(()=>{"use strict";_e();Te();Se();ZR=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},JR=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=V.normalizeAxis(e.axis,o.length),c=V.sizeToDimension(o,u),f=V.sizeFromDimension(o,u),m=V.size(i.dims),b=a?V.size(a.dims):0;if(m!==f||a&&b!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${b}`);let _=[];for(let N=0;N<o.length;++N)N<u?_.push(o[N]):_.push(1);let v=ze(f),x=["type","type"],O=[{type:12,data:c},{type:1,data:f},{type:12,data:Math.floor(f/v)},{type:1,data:e.epsilon}];a&&x.push("type");let I=r>1,S=r>2,C=N=>{let R=Ke(n[0].dataType),H=[W("x",n[0].dataType,n[0].dims,v),W("scale",i.dataType,i.dims,v)];a&&H.push(W("bias",a.dataType,a.dims,v)),H.push(J("output",n[0].dataType,s,v)),I&&H.push(J("mean_data_output",1,_)),S&&H.push(J("inv_std_output",1,_));let A=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${N.registerUniforms(A).declareVariables(...H)}
  ${N.mainStart()}
    ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Cc("f32",v)};
    var mean_square_vector = ${Cc("f32",v)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Qn(R,v,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ir("mean_vector",v)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ir("mean_square_vector",v)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Qn(R,v,"x[j + offset]")};
      let f32scale = ${Qn(R,v,"scale[j]")};
      output[j + offset] = ${H[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Qn(R,v,"bias[j]")}`:""}
      );
    }

    ${I?"mean_data_output[global_idx] = mean":""};
    ${S?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},D=[{dims:s,dataType:n[0].dataType}];return I&&D.push({dims:_,dataType:1}),S&&D.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${v};${r};${t}`,inputDependencies:x},getRunData:()=>({outputs:D,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:O}),getShaderSource:C}},V1=(n,e)=>{ZR(n.inputs),n.compute(JR(n.inputs,e,n.outputCount))}});var YR,U1,W1=U(()=>{"use strict";Te();os();is();YR=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},U1=n=>{YR(n.inputs);let e=Jr.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(ns(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=V.size(n.inputs[0].dims.slice(0,-2)),a=V.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),c=[1,i,r],f=[s,u];n.compute(ti(f,{activation:""},e,c),{inputs:f})}else n.compute(ti(n.inputs,{activation:""},e))}}});var QR,ez,tz,H1,j1,q1=U(()=>{"use strict";_e();Te();it();Se();QR=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!V.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(V.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let f=n[3].dims,m=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(V.size(f)!==m)throw new Error("zeroPoints input size error.")}},ez=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=V.size(s),f=n[1].dims[2]/4,m=n[0].dataType,b=ze(e.k),_=ze(f),v=ze(a),x=s.concat([o,a]),O=o>1&&a/v%2===0?2:1,I=V.size(x)/v/O,S=64,C=[],D=[u,o,i/b],N=V.convertShape(n[1].dims).slice();N.splice(-1,1,f/_),C.push(...ee(D)),C.push(...ee(N)),C.push(...ee(n[2].dims)),n.length===4&&C.push(...ee(V.convertShape(n[3].dims)));let R=[u,o,a/v];C.push(...ee(R));let H=A=>{let X=D.length,Y=W("a",n[0].dataType,X,b),le=W("b",12,N.length,_),ae=W("scales",n[2].dataType,n[2].dims.length),me=[Y,le,ae],j=n.length===4?W("zero_points",12,n[3].dims.length):void 0;j&&me.push(j);let Q=R.length,de=J("output",n[0].dataType,Q,v),he=Ke(n[0].dataType),ce=(()=>{switch(b){case 1:return`array<${he}, 8>`;case 2:return`mat4x2<${he}>`;case 4:return`mat2x4<${he}>`;default:throw new Error(`${b}-component is not supported.`)}})(),xe=Math.floor(32/e.bits),Ae=Math.floor(xe/8),ke=()=>{let Z="";for(let re=0;re<Ae;re++){let Ge=re*e.bits*4,pt=Ge+e.bits;Z+=`
          // reuse a data (pass ${re})
            var input_offset${re>0?re:""} = ${re===0?Y.indicesToOffset(`${Y.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${re>0?re:""}: ${ce};
            for (var j${re>0?re:""}: u32 = 0; j${re>0?re:""} < ${8/b}; j${re>0?re:""}++) {
              a_data${re>0?re:""}[j${re>0?re:""}] = ${Y.getByOffset(`input_offset${re>0?re:""}`)};
              input_offset${re>0?re:""}++;
            }
          `;for(let Ze=0;Ze<v*O;Ze++)Z+=`
            b_value = ${_===1?`b${Ze}_data`:`b${Ze}_data[i]`};
            ${e.bits===2?`{
              let half_word = b_value >> ${re*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Ge}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${pt}u) & b_mask);`}
            b_quantized_values = ${ce}(${Array.from({length:4},(mt,Me)=>`${he}(b_value_lower[${Me}]), ${he}(b_value_upper[${Me}])`).join(", ")});
            b_dequantized_values = ${b===1?`${ce}(${Array.from({length:8},(mt,Me)=>`(b_quantized_values[${Me}] - ${j?`zero_point${Ze}`:"zero_point"}) * scale${Ze}`).join(", ")});`:`(b_quantized_values - ${ce}(${Array(8).fill(`${j?`zero_point${Ze}`:"zero_point"}`).join(",")})) * scale${Ze};`};
            workgroup_shared[local_id.x * ${O} + ${Math.floor(Ze/v)}]${v>1?`[${Ze%v}]`:""} += ${Array.from({length:8/b},(mt,Me)=>`${b===1?`a_data${re>0?re:""}[${Me}] * b_dequantized_values[${Me}]`:`dot(a_data${re>0?re:""}[${Me}], b_dequantized_values[${Me}])`}`).join(" + ")};
          `}return Z},It=()=>{let Z=`
            var col_index = col * ${v};
            ${j?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${he}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            `;for(let re=0;re<v*O;re++)Z+=`
            let scale${re} = ${ae.getByOffset("col_index * nBlocksPerCol + block")};
            ${j?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            zero_point_word = ${j.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${re} = ${he}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return Z},Xe=()=>{let Z=`col_index = col * ${v};`;for(let re=0;re<v*O;re++)Z+=`
            let b${re}_data = ${le.getByIndices(`${le.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Z+=`
            var b_value: u32;
            let b_mask: u32 = ${e.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ce};
            var b_dequantized_values: ${ce};`,Z};return`
        var<workgroup> workgroup_shared: array<${de.type.value}, ${O*S}>;
        ${A.declareVariables(...me,de)}
        ${A.mainStart([S,1,1])}
          let output_indices = ${de.offsetToIndices(`(global_idx / ${S}) * ${O}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${S}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/b};
            ${It()}
            for (var word: u32 = 0; word < ${f}; word += ${_}) {
              ${Xe()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${ke()}
                word_offset += ${xe/b};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${O}) {
            var output_value: ${de.type.value} = ${de.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${S}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${O};
            }
            ${de.setByIndices(`${de.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${b};${_};${v};${O};${S}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:x,dataType:m}],dispatchGroup:{x:I},programUniforms:C}),getShaderSource:H}},tz=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=V.size(s),f=n[1].dims[2]/4,m=n[0].dataType,b=ze(e.k),_=ze(f),v=s.concat([o,a]),x=128,O=a%8===0?8:a%4===0?4:1,I=x/O,S=Math.floor(32/e.bits),C=I*_*S,D=C/b,N=C/e.blockSize,R=V.size(v)/O,H=[],A=[u,o,i/b],X=V.convertShape(n[1].dims).slice();X.splice(-1,1,f/_),H.push(...ee(A)),H.push(...ee(X)),H.push(...ee(n[2].dims)),n.length===4&&H.push(...ee(V.convertShape(n[3].dims)));let Y=[u,o,a];H.push(...ee(Y));let le=ae=>{let me=A.length,j=W("a",n[0].dataType,me,b),Q=W("b",12,X.length,_),de=W("scales",n[2].dataType,n[2].dims.length),he=[j,Q,de],ce=n.length===4?W("zero_points",12,n[3].dims.length):void 0;ce&&he.push(ce);let xe=Y.length,Ae=J("output",n[0].dataType,xe),ke=Ke(n[0].dataType),It=()=>{switch(b){case 1:return`
          let a_data0 = vec4<${ke}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ke}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ke}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ke}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${b}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${j.type.value}, ${D}>;
        var<workgroup> inter_results: array<array<${Ae.type.value}, ${I}>, ${O}>;
        ${ae.declareVariables(...he,Ae)}
        ${ae.mainStart([I,O,1])}
          let output_indices = ${Ae.offsetToIndices(`workgroup_index * ${O}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${N} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${D};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${D}; a_offset += ${x})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${j.getByIndices(`${j.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${j.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${N} + local_id.x;
            ${ce?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            let zero_point_word = ${ce.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ke}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${ke}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            let scale = ${de.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Q.getByIndices(`${Q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/b};
            for (var i: u32 = 0; i < ${_}; i++) {
              let b_value = ${_===1?"b_data":"b_data[i]"};
              ${(()=>{let Xe=Math.floor(S/8),Z="";for(let re=0;re<Xe;re++){let Ge=re*e.bits*4,pt=Ge+e.bits;Z+=`
              ${It()}
              {${e.bits===2?`
                let half_word = b_value >> ${re*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Ge}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${pt}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ke}>(${Array.from({length:4},(Ze,mt)=>`${ke}(b_value_lower[${mt}]), ${ke}(b_value_upper[${mt}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ke}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ze,mt)=>`${`dot(a_data${mt}, b_dequantized_values[${mt}])`}`).join(" + ")};
              }
              word_offset += ${8/b};`}return Z})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${O}) {
            var output_value: ${Ae.type.value} = ${Ae.type.value}(0);
            for (var b = 0u; b < ${I}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Ae.setByIndices(`${Ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${b};${_};${I};${O}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:m}],dispatchGroup:{x:R},programUniforms:H}),getShaderSource:le}},H1=(n,e)=>{QR(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(tz(n.inputs,e)):n.compute(ez(n.inputs,e))},j1=n=>we(n)});var rz,nz,oz,iz,az,sz,uz,lz,K1,X1=U(()=>{"use strict";_e();Te();Se();rz=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},nz=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${se("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${se("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${se("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},oz=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${se("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${se("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${se("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${se("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},iz=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${se("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${se("uniforms.x_shape",o,e)})) {
                  k = i32(${se("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${se("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},az=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${se("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${se("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${se("uniforms.x_shape",o,e)})) {
                  k -= i32(${se("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${se("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},sz=(n,e,r)=>{switch(r.mode){case 0:return nz(n,e,r.pads.length);case 1:return oz(n,e,r.pads.length);case 2:return iz(n,e,r.pads.length);case 3:return az(n,e,r.pads.length);default:throw new Error("Invalid mode")}},uz=(n,e)=>{let r=V.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=V.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...ee(n[0].dims,r));let s=["rank"],u=c=>{let f=J("output",n[0].dataType,r.length),m=W("x",n[0].dataType,t.length),b=m.type.value,_=sz(f,t.length,e),v=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&v.push({name:"constant_value",type:a?b:"f32"}),`
            ${c.registerUniforms(v).declareVariables(m,f)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${b}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(V.size(r)/64)},programUniforms:i}),getShaderSource:u}},lz=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},K1=(n,e)=>{rz(n.inputs);let r=lz(n.inputs,e);n.compute(uz(n.inputs,r),{inputs:[0]})}});var ls,Z1,J1,Y1,Q1,cz,dz,e2,t2,r2,n2,o2,i2,a2,s2,u2,l2,c2,d2,p2=U(()=>{"use strict";xt();_e();Te();Se();ls=n=>{if(ve.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Z1=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],c=e.pads.slice();Jn.adjustPoolAttributes(r,o,a,s,u,c);let f=Jn.computePoolOutputShape(r,o,s,u,a,c,e.autoPad),m=Object.assign({},e);i?Object.assign(m,{kernelShape:a,strides:s,pads:c,dilations:u,cacheKey:e.cacheKey}):Object.assign(m,{kernelShape:a,strides:s,pads:c,cacheKey:e.cacheKey});let b=f.slice();return b.push(b.splice(1,1)[0]),[m,t?b:f]},J1=(n,e)=>{let r=e.format==="NHWC",t=V.size(n),o=V.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],c=e.pads[e.pads.length/2-1],f=e.pads[e.pads.length-1],m=!!(c+f);i.push({type:12,data:s},{type:12,data:u},{type:12,data:c},{type:12,data:f}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let b=!1;if(e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],v=e.strides[e.strides.length-2],x=e.pads[e.pads.length/2-2],O=e.pads[e.pads.length-2];b=!!(x+O),i.push({type:12,data:_},{type:12,data:v},{type:12,data:x},{type:12,data:O}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,m,b]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=V.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((c,f)=>c+f);return[i,a,!!u,!1,!1]}},Y1=(n,e,r,t,o,i,a,s,u,c,f,m)=>{let b=o.format==="NHWC",_=e.type.value,v=J("output",e.type.tensor,t);if(o.kernelShape.length<=2){let x="",O="",I="",S=r-(b?2:1);if(f?x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${S}] < 0 || xIndices[${S}]
                      >= uniforms.x_shape[${S}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let D=r-(b?3:2);m?O=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${D}] = indices[${D}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${D}] < 0 || xIndices[${D}] >= uniforms.x_shape[${D}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:O=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${D}] = indices[${D}] * uniforms.sh - uniforms.phStart + j;
                `,I=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,v)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var value = ${_}(${s});
              var pad = 0;
              ${O}
              ${x}
              ${I}
              ${a}

              output[global_idx] = value;
            }`}else{if(b)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let x=o.kernelShape.length,O=o.pads.length,I="";return c?I=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:I=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,v)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var offsets: array<u32, ${x}>;

              var value = ${_}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${x-1}u; j++) {
                  offsets[j] = offset / ${se("uniforms.kernelStrides","j",x)};
                  offset -= offsets[j] * ${se("uniforms.kernelStrides","j",x)};
                }
                offsets[${x-1}] = offset;

                isPad = false;
                for (var j = ${r-x}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${se("uniforms.strides",`j - ${r-x}u`,x)}
                    + offsets[j - ${r-x}u] - ${se("uniforms.pads","j - 2u",O)};
                  ${I}
              }
              ${a}

              output[global_idx] = value;
            }`}},Q1=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,cz=n=>`${Q1(n)};${n.countIncludePad}`,dz=n=>`${Q1(n)};${n.storageOrder};${n.dilations}`,e2=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),t2=(n,e,r,t)=>{let[o,i]=Z1(e,t,r),a=W("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",c="";o.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[f,m,b,_,v]=J1(i,o);f.push(...ee(e.dims,i));let x=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${b};${_};${v}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(V.size(i)/64)},programUniforms:f}),getShaderSource:O=>Y1(O,a,e.dims.length,i.length,o,u,c,0,m,b,_,v)}},r2=n=>{let e=n.count_include_pad!==0,r=e2(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:cz(t)}},n2=(n,e)=>{ls(n.inputs),n.compute(t2("AveragePool",n.inputs[0],!1,e))},o2={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},i2=n=>{let e=n.format;return{format:e,...o2,cacheKey:e}},a2=(n,e)=>{ls(n.inputs),n.compute(t2("GlobalAveragePool",n.inputs[0],!0,e))},s2=(n,e,r,t)=>{let[o,i]=Z1(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=W("x",e.dataType,e.dims.length),c=["rank"],[f,m,b,_,v]=J1(i,o);return f.push(...ee(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${b};${_};${v}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(V.size(i)/64)},programUniforms:f}),getShaderSource:x=>Y1(x,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,m,b,_,v)}},u2=(n,e)=>{ls(n.inputs),n.compute(s2("MaxPool",n.inputs[0],!1,e))},l2=n=>{let e=n.storage_order,r=n.dilations,t=e2(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:dz(o)}},c2=n=>{let e=n.format;return{format:e,...o2,cacheKey:e}},d2=(n,e)=>{ls(n.inputs),n.compute(s2("GlobalMaxPool",n.inputs[0],!0,e))}});var fz,hz,f2,h2,m2=U(()=>{"use strict";_e();Te();it();Se();fz=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},hz=(n,e)=>{let r=V.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=V.size(i),u=t===3||t===2,c=u?[Math.ceil(V.size(n[0].dims)/4)]:n[0].dims,f=n[1].dims,m=n.length>2?n[2]:void 0,b=m?u?[Math.ceil(V.size(m.dims)/4)]:m.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,v=_===!1&&f.length===1,x=ze(s),O=_&&(!u||x===4),I=O?x:1,S=O&&!u?x:1,C=W("input",u?12:t,c.length,S),D=W("scale",a,f.length),N=m?W("zero_point",u?12:t,b.length):void 0,R=J("output",a,i.length,I),H=[C,D];N&&H.push(N);let A=[c,f];m&&A.push(b);let X=[{type:12,data:s/I},{type:12,data:r},{type:12,data:e.blockSize},...ee(...A,i)],Y=le=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${le.registerUniforms(ae).declareVariables(...H,R)}
      ${le.mainStart()}
          ${le.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${R.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${C.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${I===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${C.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${D.getByOffset("0")}`:v?`
            let scale_index = ${R.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${D.getByOffset("scale_index")};`:`
            var scale_indices: ${D.type.indices} = output_indices;
            let index = ${D.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${D.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${D.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${N?_?u?`
                let zero_point_input = ${N.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${N.getByOffset("0")}`:v?u?`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${N.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${N.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${D.indicesToOffset("scale_indices")};
                let zero_point_input = ${N.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${N.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":C.type.value}(0);`};
      // Compute and write output
      ${R.setByOffset("global_idx",`${R.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:N?["rank","rank","rank"]:["rank","rank"]},getShaderSource:Y,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/I/64),y:1,z:1},programUniforms:X})}},f2=(n,e)=>{fz(n.inputs,e),n.compute(hz(n.inputs,e))},h2=n=>we({axis:n.axis,blockSize:n.blockSize})});var mz,gz,g2,b2=U(()=>{"use strict";xt();_e();Se();mz=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},gz=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...ee(i)],u=c=>{let f=J("output",t,i.length),m=f.type.value,b=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${c.registerUniforms(b).declareVariables(f)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},g2=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),ve.webgpu.validateInputContent&&mz(e,r,t),n.compute(gz(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var bz,yz,y2,_2,w2=U(()=>{"use strict";_e();Te();it();Se();bz=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(n){case"none":return`${e}=${r};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${r}));`:`
              ${o}bitcast<${t}>(oldValue) + (${r})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},yz=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(V.sizeToDimension(t,t.length-1)/i),s=t[t.length-1],u=V.sizeFromDimension(r,s),c=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...ee(n[1].dims,n[2].dims,o)],f=m=>{let b=W("indices",n[1].dataType,n[1].dims.length),_=W("updates",n[2].dataType,n[2].dims.length,i),v=e.reduction!=="none"&&e.reduction!==""?jv("output",n[0].dataType,o.length):J("output",n[0].dataType,o.length,i);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(b,_,v)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${n[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${bz(e.reduction,"output[data_offset + i]","value",v.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:f}},y2=n=>we({reduction:n.reduction}),_2=(n,e)=>{n.compute(yz(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var _z,wz,vz,v2,xz,Tz,Iz,Sz,$z,Az,Oz,Pz,x2,Ez,Cz,Dz,kz,Nz,T2,I2,S2=U(()=>{"use strict";_e();Te();it();Se();_z=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},wz=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},vz=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],c=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(f=>i.push(f));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(f=>t.push(f)),t.length!==0&&t.length!==c&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");_z(t,e),e.axes.length>0&&wz(t,e.axes,c).forEach((f,m)=>t[m]=f)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==c&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},v2=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,xz=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${v2("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${v2("xResized","lengthOriginal - 1","lengthResized - 1",e)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",Tz=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",Iz=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},Sz=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},$z=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},Az=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${se("uniforms.scales","i",t)};
        var roi_low = ${se("uniforms.roi","i",o)};
        var roi_hi = ${se("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${se("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${se("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Oz=(n,e,r,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${se("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${se("uniforms.roi","i",i)};
          var roi_hi = ${se("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${se("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${se("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Pz=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${se("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,x2=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",Ez=(n,e,r,t,o)=>{let[a,s,u,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],f=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${x2(n,c,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${s}];
      var col:${f} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${f} = getInputValue(batch, channel, row1, col1);
      var x12: ${f} = getInputValue(batch, channel, row1, col2);
      var x21: ${f} = getInputValue(batch, channel, row2, col1);
      var x22: ${f} = getInputValue(batch, channel, row2, col2);
      var dx1: ${f} = abs(row - ${f}(row1));
      var dx2: ${f} = abs(${f}(row2) - row);
      var dy1: ${f} = abs(col - ${f}(col1));
      var dy2: ${f} = abs(${f}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Cz=(n,e,r,t,o,i,a,s,u,c)=>{let f=r.length===2,m=!0,[b,_]=f?[0,1]:m?[2,3]:[1,2],v=n.type.value,x=O=>{let I=O===b?"row":"col";return`
      fn ${I}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${v} {
        var output_index = ${e.indicesGet("output_indices",O)};
        var originalIdx: ${v} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[O]},
        ${t[O]}, ${r[O]}, ${i[O]}, ${i[O]} + ${r.length});
        var fractOriginalIdx: ${v} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[O]} - 1))) {
          return ${u};
        }
        var data: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${I}: ${v} = originalIdx + ${v}(i);
          if (${I} < 0 || ${I} >= ${r[O]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${I} = max(0, min(${I}, ${r[O]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",O,`u32(${I})`)};
          data[i + 1] = ${O===b?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${x(b)};
    ${x(_)};
  fn getCubicInterpolationCoefs(s: ${v}) -> array<${v}, 4> {
    var absS = abs(s);
    var coeffs: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${v} = 1.0 - absS;
    var twoMinusAbsS: ${v} = 2.0 - absS;
    var onePlusAbsS: ${v} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${v}, 4>, coefs: array<${v}, 4>) -> ${v} {
    var coefsSum: ${v} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${v} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Dz=(n,e,r,t,o)=>{let[a,s,u,c,f]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${m} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${x2(n,f,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${m} = originalIndices[${s}];
      var height:${m} = originalIndices[${u}];
      var width:${m} = originalIndices[${c}];
      ${t?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${m} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${m} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${m} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${m} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${m} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${m} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${m} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${m} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${m} = abs(depth - ${m}(depth1));
      var dx2: ${m} = abs(${m}(depth2) - depth);
      var dy1: ${m} = abs(height - ${m}(height1));
      var dy2: ${m} = abs(${m}(height2) - height);
      var dz1: ${m} = abs(width - ${m}(width1));
      var dz2: ${m} = abs(${m}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},kz=(n,e,r,t,o,i)=>{let a=n.dims,s=Iz(i,e.axes,a.length),u=Sz(a,t,o,e.axes),c=t.slice();t.length===0&&(c=a.map((S,C)=>S===0?1:u[C]/S),e.keepAspectRatioPolicy!=="stretch"&&(u=$z(a,c,e)));let f=J("output",n.dataType,u.length),m=W("input",n.dataType,a.length),b=V.size(u),_=a.length===u.length&&a.every((S,C)=>S===u[C]),v=e.coordinateTransformMode==="tf_crop_and_resize",x=e.extrapolationValue,O=m.type.value,I=S=>`
      ${_?"":`
      ${xz(e.coordinateTransformMode,O)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${Pz(m,a)};
              ${Tz(e.nearestMode,r,O)};
              ${Oz(m,f,a,u,c.length,s.length,v)};
              `;case"linear":return`
              ${Az(f,a,u,c.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Ez(m,f,a,v,x)}`;if(a.length===3||a.length===5)return`${Dz(m,f,a,v,x)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Cz(m,f,a,u,c,s,e.cubicCoeffA,v,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${S.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",s.length).declareVariables(m,f)}
      ${S.mainStart()}
        ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${c.length>0?e.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${_}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:I,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},{type:1,data:c},{type:1,data:s},...ee(a,u)]})}},Nz=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},T2=(n,e)=>{let r=[],t=[],o=[],i=Nz(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");vz(n.inputs,e,i,r,t,o),n.compute(kz(n.inputs[0],e,i,r,t,o),{inputs:[0]})},I2=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,c=n.nearestMode===""?"simple":n.nearestMode;return we({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:c})}});var Lz,Rz,$2,A2=U(()=>{"use strict";_e();Te();Se();Lz=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Rz=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=V.size(i),s=i,u=a,c=i.slice(-1)[0],f=t?i.slice(0,-1).concat(1):[],m=!o&&n.length>3,b=n.length>4,_=t&&r>1,v=t&&r>2,x=r>3,O=64,I=ze(c),S=[{type:12,data:u},{type:12,data:I},{type:12,data:c},{type:1,data:e.epsilon}],C=N=>{let R=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],H=[W("x",n[0].dataType,n[0].dims,I),W("skip",n[1].dataType,n[1].dims,I),W("gamma",n[2].dataType,n[2].dims,I)];m&&H.push(W("beta",n[3].dataType,n[3].dims,I)),b&&H.push(W("bias",n[4].dataType,n[4].dims,I)),H.push(J("output",n[0].dataType,s,I)),_&&H.push(J("mean_output",1,f)),v&&H.push(J("inv_std_output",1,f)),x&&H.push(J("input_skip_bias_sum",n[0].dataType,s,I));let A=Ke(n[0].dataType),X=Ke(1,I);return`

      ${N.registerUniforms(R).declareVariables(...H)}
      var<workgroup> sum_shared : array<${X}, ${O}>;
      var<workgroup> sum_squared_shared : array<${X}, ${O}>;

      ${N.mainStart([O,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${O};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${O};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${O-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${b?"bias[offset1d + i]":A+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${x?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Qn(A,I,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${O};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${ir("sum",I)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ir("square_sum",I)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${v?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${A}(mean)`}) *
            ${A}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},D=[{dims:s,dataType:n[0].dataType}];return r>1&&D.push({dims:f,dataType:1}),r>2&&D.push({dims:f,dataType:1}),r>3&&D.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${I};${_};${v};${x}`,inputDependencies:n.map((N,R)=>"type")},getShaderSource:C,getRunData:()=>({outputs:D,dispatchGroup:{x:Math.ceil(u/c)},programUniforms:S})}},$2=(n,e)=>{Lz(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(Rz(n.inputs,e,n.outputCount,!1),{outputs:t})}});var zz,cs,Mz,O2,Bz,Fz,P2,E2,C2=U(()=>{"use strict";_e();Te();it();Se();zz=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},cs=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},Mz=(n,e)=>{if(n.length>1){let r=cs(n,1),t=cs(n,2),o=cs(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),we({starts:r,ends:t,axes:o})}else return e},O2=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},Bz=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${se("uniforms.input_shape","i",r.length)};
            let steps_i = ${se("uniforms.steps","i",r.length)};
            let signs_i = ${se("uniforms.signs","i",r.length)};
            let starts_i = ${se("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${n.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Fz=(n,e)=>{let r=n[0].dims,t=V.size(r),o=e.axes.length>0?V.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=cs(n,4);i.forEach(I=>I!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((I,S)=>O2(I,S,r,o,i)),s=e.ends.map((I,S)=>O2(I,S,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let I=0;I<r.length;++I)o.includes(I)||(a.splice(I,0,0),s.splice(I,0,r[I]),i.splice(I,0,1));let u=i.map(I=>Math.sign(I));i.forEach((I,S,C)=>{if(I<0){let D=(s[S]-a[S])/I,N=a[S],R=N+D*i[S];a[S]=R,s[S]=N,C[S]=-I}});let c=r.slice(0);o.forEach((I,S)=>{c[I]=Math.ceil((s[I]-a[I])/i[I])});let f={dims:c,dataType:n[0].dataType},m=J("output",n[0].dataType,c.length),b=W("input",n[0].dataType,n[0].dims.length),_=V.size(c),v=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],x=[{type:12,data:_},{type:12,data:a},{type:6,data:u},{type:12,data:i},...ee(n[0].dims,c)],O=I=>`
      ${I.registerUniforms(v).declareVariables(b,m)}
        ${Bz(b,m,r)}
        ${I.mainStart()}
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",b.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:O,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:x})}},P2=(n,e)=>{zz(n.inputs,e);let r=Mz(n.inputs,e);n.compute(Fz(n.inputs,r),{inputs:[0]})},E2=n=>{let e=n.starts,r=n.ends,t=n.axes;return we({starts:e,ends:r,axes:t})}});var Vz,Gz,D2,k2,N2=U(()=>{"use strict";_e();Te();it();ln();Se();Vz=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},Gz=(n,e)=>{let r=n.inputs[0],t=r.dims,o=V.size(t),i=t.length,a=V.normalizeAxis(e.axis,i),s=a<t.length-1,u,c=[];s?(c=Array.from({length:i},(H,A)=>A),c[a]=i-1,c[i-1]=a,u=n.compute(yt(r,c),{inputs:[r],outputs:[-1]})[0]):u=r;let f=u.dims,m=f[i-1],b=o/m,_=ze(m),v=m/_,x=64;b===1&&(x=256);let O=(H,A)=>A===4?`max(max(${H}.x, ${H}.y), max(${H}.z, ${H}.w))`:A===2?`max(${H}.x, ${H}.y)`:A===3?`max(max(${H}.x, ${H}.y), ${H}.z)`:H,I=W("x",u.dataType,u.dims,_),S=J("result",u.dataType,u.dims,_),C=I.type.value,D=Ke(u.dataType)==="f32"?`var threadMax = ${C}(-3.4028234663852886e+38f);`:`var threadMax = ${C}(-65504.0h);`,N=H=>`
      var<workgroup> rowMaxShared : ${C};
      var<workgroup> rowSumShared : ${C};
      var<workgroup> threadShared : array<${C}, ${x}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${C} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${C}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${H.registerUniform("packedCols","i32").declareVariables(I,S)}
      ${H.mainStart(x)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${x};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${D}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${C}(${O("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${C}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${C}(${ir("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${C}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,R=n.compute({name:"Softmax",shaderCache:{hint:`${_};${x}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:u.dataType}],dispatchGroup:{x:b},programUniforms:[{type:6,data:v}]}),getShaderSource:N},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(yt(R,c),{inputs:[R]})},D2=(n,e)=>{Vz(n.inputs),Gz(n,e)},k2=n=>we({axis:n.axis})});var L2,Uz,Wz,Hz,R2,z2=U(()=>{"use strict";_e();Te();Se();L2=n=>Array.from(n.getBigInt64Array(),Number),Uz=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(L2(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Wz=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},Hz=(n,e)=>{let r=n[0].dims,t=e??L2(n[1]),o=Wz(r,t),i=V.size(o),a=n[0].dataType,s=W("input",a,r.length),u=J("output",a,o.length),c=f=>`
      const inputShape = ${s.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(s,u)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...ee(n[0].dims,o)]}),getShaderSource:c}},R2=n=>{Uz(n.inputs),n.compute(Hz(n.inputs),{inputs:[0]})}});var jz,qz,M2,B2=U(()=>{"use strict";_e();Te();Se();jz=(n,e,r,t,o)=>{let i=J("output_data",o,r.length,4),a=W("a_data",e[1].dataType,e[1].dims.length,4),s=W("b_data",e[2].dataType,e[2].dims.length,4),u=W("c_data",e[0].dataType,e[0].dims.length,4),c,f=(m,b,_)=>`select(${b}, ${m}, ${_})`;if(!t)c=i.setByOffset("global_idx",f(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let m=(b,_,v="")=>{let x=`a_data[index_a${_}][component_a${_}]`,O=`b_data[index_b${_}][component_b${_}]`,I=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${a.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${b}[${_}] = ${v}(${f(x,O,I)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${m("data",0,"u32")}
            ${m("data",1,"u32")}
            ${m("data",2,"u32")}
            ${m("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${m("output_data[global_idx]",0)}
            ${m("output_data[global_idx]",1)}
            ${m("output_data[global_idx]",2)}
            ${m("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},qz=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(V.areEqual(e,r)&&V.areEqual(r,t)),a=e,s=V.size(e);if(i){let c=Jr.calcShape(Jr.calcShape(e,r,!1),t,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,s=V.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>jz(c,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...ee(t,e,r,a)]})}},M2=n=>{n.compute(qz(n.inputs))}});var F2,V2=U(()=>{"use strict";vx();Ya();Ix();$x();dT();xT();ST();VT();KT();JT();e1();i1();u1();c1();f1();g1();_1();x1();S1();O1();z1();F1();G1();W1();q1();jc();X1();p2();m2();b2();w2();Za();S2();Xc();A2();C2();N2();Kc();z2();ln();es();B2();F2=new Map([["Abs",[Ax]],["Acos",[Ox]],["Acosh",[Px]],["Add",[pT]],["ArgMax",[wx,kc]],["ArgMin",[_x,kc]],["Asin",[Ex]],["Asinh",[Cx]],["Atan",[Dx]],["Atanh",[kx]],["Attention",[xx]],["AveragePool",[n2,r2]],["BatchNormalization",[Tx]],["BiasAdd",[Sx]],["BiasSplitGelu",[cT]],["Cast",[Lx,Nx]],["Ceil",[zx]],["Clip",[Rx]],["Concat",[TT,IT]],["Conv",[Gc,Vc]],["ConvTranspose",[qT,HT]],["Cos",[Mx]],["Cosh",[Bx]],["CumSum",[XT,ZT]],["DepthToSpace",[YT,QT]],["DequantizeLinear",[f2,h2]],["Div",[fT]],["Einsum",[n1,o1]],["Elu",[Fx,Qo]],["Equal",[hT]],["Erf",[Vx]],["Exp",[Gx]],["Expand",[s1]],["FastGelu",[l1]],["Floor",[Ux]],["FusedConv",[Gc,Vc]],["Gather",[p1,d1]],["GatherElements",[v1,w1]],["GatherBlockQuantized",[b1,y1]],["GatherND",[h1,m1]],["Gelu",[Wx]],["Gemm",[I1,T1]],["GlobalAveragePool",[a2,i2]],["GlobalMaxPool",[d2,c2]],["Greater",[yT]],["GreaterOrEqual",[wT]],["GridSample",[$1,A1]],["GroupQueryAttention",[R1]],["HardSigmoid",[Yx,Jx]],["InstanceNormalization",[B1]],["LayerNormalization",[V1]],["LeakyRelu",[Hx,Qo]],["Less",[_T]],["LessOrEqual",[vT]],["Log",[sT]],["MatMul",[U1]],["MatMulNBits",[H1,j1]],["MaxPool",[u2,l2]],["Mul",[mT]],["MultiHeadAttention",[C1,E1]],["Neg",[qx]],["Not",[jx]],["Pad",[K1]],["Pow",[gT]],["QuickGelu",[uT,Qo]],["Range",[g2]],["Reciprocal",[Kx]],["ReduceMin",[fx]],["ReduceMean",[ux]],["ReduceMax",[px]],["ReduceSum",[mx]],["ReduceProd",[hx]],["ReduceL1",[lx]],["ReduceL2",[cx]],["ReduceLogSum",[bx]],["ReduceLogSumExp",[dx]],["ReduceSumSquare",[gx]],["Relu",[Xx]],["Resize",[T2,I2]],["RotaryEmbedding",[N1]],["ScatterND",[_2,y2]],["Sigmoid",[Zx]],["Sin",[Qx]],["Sinh",[eT]],["Slice",[P2,E2]],["SkipLayerNormalization",[$2]],["Split",[D1,k1]],["Sqrt",[tT]],["Softmax",[D2,k2]],["Sub",[bT]],["Tan",[rT]],["Tanh",[oT]],["ThresholdedRelu",[aT,Qo]],["Tile",[R2]],["Transpose",[Xv,Zv]],["Where",[M2]]])});var ds,G2=U(()=>{"use strict";xt();Zr();Se();ds=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){zt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of r)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}s.setPipeline(e.computePipeline),s.setBindGroup(0,c),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Pt(e.programInfo.name)}dispose(){}build(e,r){zt(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(m=>{t.features.has(m.feature)&&o.push(`enable ${m.extension};`)});let a=qv(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,c=t.createShaderModule({code:u,label:e.name});$e("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let f=t.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:e.name});return Pt(e.name),{programInfo:e,computePipeline:f,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var U2={};Nn(U2,{WebGpuBackend:()=>Jc});var Kz,Xz,Zc,Jc,W2=U(()=>{"use strict";xt();_e();Zr();vc();Hv();V2();G2();Kz=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},Xz=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${Kz(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Zc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Jc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await r.requestDevice(o),this.adapterInfo=new Zc(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Wv(this),this.programManager=new ds(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Fa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;zt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,c=s.kernelName,f=i.programName,m=i.inputTensorViews,b=i.outputTensorViews,_=r[o*2],v=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let x=Number(_-this.queryTimeBase),O=Number(v-this.queryTimeBase);if(!Number.isSafeInteger(x)||!Number.isSafeInteger(O))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map(I=>({dims:I.dims,dataType:Xr(I.dataType)})),outputsMetadata:b.map(I=>({dims:I.dims,dataType:Xr(I.dataType)})),kernelId:a,kernelType:u,kernelName:c,programName:f,startTime:x,endTime:O});else{let I="";m.forEach((C,D)=>{I+=`input[${D}]: [${C.dims}] | ${Xr(C.dataType)}, `});let S="";b.forEach((C,D)=>{S+=`output[${D}]: [${C.dims}] | ${Xr(C.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${c}|${f}" ${I}${S}start time: ${x} ns, execution time: ${O-x} ns`)}xi("GPU",`${f}::${_}::${v}`)}e.unmap(),this.pendingQueries.delete(e)}),Pt()}run(e,r,t,o,i,a){zt(e.name);let s=[];for(let C=0;C<r.length;++C){let D=r[C].data;if(D===0)continue;let N=this.gpuDataManager.get(D);if(!N)throw new Error(`no GPU data for input: ${D}`);s.push(N)}let{outputs:u,dispatchGroup:c,programUniforms:f}=e.getRunData(r),m=t.length===0?u.map((C,D)=>D):t;if(m.length!==u.length)throw new Error(`Output size ${m.length} must be equal to ${u.length}.`);let b=[],_=[];for(let C=0;C<u.length;++C){if(!Number.isInteger(m[C])||m[C]<-3||m[C]>=a)throw new Error(`Invalid output index: ${m[C]}`);if(m[C]===-3)continue;let D=m[C]===-1,N=m[C]===-2,R=D||N?i(u[C].dataType,u[C].dims):o(m[C],u[C].dataType,u[C].dims);if(b.push(R),R.data===0)continue;let H=this.gpuDataManager.get(R.data);if(!H)throw new Error(`no GPU data for output: ${R.data}`);if(D&&this.temporaryData.push(H),N){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(H)}_.push(H)}if(s.length!==r.length||_.length!==b.length){if(_.length===0)return Pt(e.name),b;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let v;if(f){let C=0,D=[];f.forEach(A=>{let X=typeof A.data=="number"?[A.data]:A.data;if(X.length===0)return;let Y=A.type===10?2:4,le,ae;A.type===10?(ae=X.length>4?16:X.length>2?8:X.length*Y,le=X.length>4?16:Y*X.length):(ae=X.length<=2?X.length*Y:16,le=16),C=Math.ceil(C/ae)*ae,D.push(C);let me=A.type===10?8:4;C+=X.length>4?Math.ceil(X.length/me)*le:X.length*Y});let N=16;C=Math.ceil(C/N)*N;let R=new ArrayBuffer(C);f.forEach((A,X)=>{let Y=D[X],le=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(R,Y,le.length).set(le);else if(A.type===12)new Uint32Array(R,Y,le.length).set(le);else if(A.type===10)new Uint16Array(R,Y,le.length).set(le);else if(A.type===1)new Float32Array(R,Y,le.length).set(le);else throw new Error(`Unsupported uniform type: ${Xr(A.type)}`)});let H=this.gpuDataManager.create(C,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(H.buffer,0,R,0,C),this.gpuDataManager.release(H.id),v={offset:0,size:C,buffer:H.buffer}}let x=this.programManager.normalizeDispatchGroupSize(c),O=x[1]===1&&x[2]===1,I=Xz(e,r,O),S=this.programManager.getArtifact(I);if(S||(S=this.programManager.build(e,x),this.programManager.setArtifact(I,S),$e("info",()=>`[artifact] key: ${I}, programName: ${e.name}`)),f&&S.uniformVariablesInfo){if(f.length!==S.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${S.uniformVariablesInfo.length}, got ${f.length} in program "${S.programInfo.name}".`);for(let C=0;C<f.length;C++){let D=f[C],N=D.type,R=typeof D.data=="number"?1:D.data.length,[H,A]=S.uniformVariablesInfo[C];if(N!==H||R!==A)throw new Error(`Uniform variable ${C} mismatch: expect type ${H} with size ${A}, got type ${N} with size ${R} in program "${S.programInfo.name}".`)}}if($e("info",()=>`[ProgramManager] run "${e.name}" (key=${I}) with ${x[0]}x${x[1]}x${x[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let C={kernelId:this.currentKernelId,programName:S.programInfo.name,inputTensorViews:r,outputTensorViews:b};this.pendingKernels.push(C),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(C)}return this.programManager.run(S,s,_,x,v),Pt(e.name),b}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=F2.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),$e("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(f){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${f}`)),1}finally{c&&t.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${a}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await Ac(this,e,r);return Ga(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){$e("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){$e("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){$e("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var H2={};Nn(H2,{init:()=>Zz});var ni,Yc,Zz,j2=U(()=>{"use strict";_e();Zr();Te();Fv();ni=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=V.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=V.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=V.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=V.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(V.size(e)!==V.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Yc=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let c=0;c<s;c++){let f=Number(e.getValue(o*i++,a)),m=Number(e.getValue(o*i++,"*")),b=Number(e.getValue(o*i++,a)),_=[];for(let v=0;v<b;v++)_.push(Number(e.getValue(o*i++,a)));u.push(new ni(e,f,m,_))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,c)=>new ni(this.module,u,this.output(s,c),c),a=(s,u)=>{let c=On(s,u);if(!c)throw new Error(`Unsupported data type: ${s}`);let f=c>0?this.backend.gpuDataManager.create(c).id:0;return new ni(this.module,s,f,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},Zz=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=(W2(),oo(U2)).WebGpuBackend,a=new i;await a.initialize(r,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,c,f=!1)=>{if(f)$e("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(c)}`),a.memcpy(Number(s),Number(u));else{$e("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(c)}`);let m=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(c));a.upload(Number(u),m)}},async(s,u,c)=>{$e("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${c}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+c)>>>0))},(s,u,c)=>a.createKernel(s,Number(u),c,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,c,f)=>{$e("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${s}, contextDataOffset=${u}`);let m=new Yc(e,a,Number(u));return a.computeKernel(Number(s),m,f)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new ja(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,c,f)=>i.ensureTensor(a,s,u,c,f),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s),(a,s)=>i.registerMLContext(a,s),!!r.trace])}}});var Jz,Oa,Pa,eo,Yz,q2,Xo,Ea,Ca,K2,Da,ka,Na,fc=U(()=>{"use strict";xt();Av();Pv();_e();$n();Ra();_c();Jz=(n,e)=>{je()._OrtInit(n,e)!==0&&Re("Can't initialize onnxruntime.")},Oa=async n=>{Jz(n.wasm.numThreads,Jo(n.logLevel))},Pa=async(n,e)=>{je().asyncInit?.();let r=n.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=n.webgpu.powerPreference;if(t!==void 0&&t!=="low-power"&&t!=="high-performance")throw new Error(`Invalid powerPreference setting: "${t}"`);let o=n.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:o}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let t=(j2(),oo(H2)).init;e==="webgpu"&&await t("webgpu",je(),n,r),e==="webnn"&&await t("webnn",je(),n)}},eo=new Map,Yz=n=>{let e=je(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&Re("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},q2=(n,e)=>{let r=je(),t=r.stackSave(),o=0;try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(n,e,a,a+i)!==0&&Re("Can't get session input/output metadata.");let u=Number(r.getValue(a,"*"));o=Number(r.getValue(a+i,"*"));let c=r.HEAP32[o/4];if(c===0)return[u,0];let f=r.HEAPU32[o/4+1],m=[];for(let b=0;b<f;b++){let _=Number(r.getValue(o+8+b*i,"*"));m.push(_!==0?r.UTF8ToString(_):Number(r.getValue(o+8+(b+f)*i,"*")))}return[u,c,m]}finally{r.stackRestore(t),o!==0&&r._OrtFree(o)}},Xo=n=>{let e=je(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},Ea=async(n,e)=>{let r,t,o=je();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Xo(n);let i=0,a=0,s=0,u=[],c=[],f=[];try{if([a,u]=await Ov(e),e?.externalData&&o.mountExternalData){let D=[];for(let N of e.externalData){let R=typeof N=="string"?N:N.path;D.push(Yo(typeof N=="string"?N:N.data).then(H=>{o.mountExternalData(R,H)}))}await Promise.all(D)}for(let D of e?.executionProviders??[])if((typeof D=="string"?D:D.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof D!="string"){let R=D,H=R?.context,A=R?.gpuDevice,X=R?.deviceType,Y=R?.powerPreference;H?o.currentContext=H:A?o.currentContext=await o.webnnCreateMLContext(A):o.currentContext=await o.webnnCreateMLContext({deviceType:X,powerPreference:Y})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),o.webgpuOnCreateSession?.(i),i===0&&Re("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[m,b]=Yz(i),_=!!e?.enableGraphCapture,v=[],x=[],O=[],I=[],S=[];for(let D=0;D<m;D++){let[N,R,H]=q2(i,D);N===0&&Re("Can't get an input name."),c.push(N);let A=o.UTF8ToString(N);v.push(A),O.push(R===0?{name:A,isTensor:!1}:{name:A,isTensor:!0,type:Xr(R),shape:H})}for(let D=0;D<b;D++){let[N,R,H]=q2(i,D+m);N===0&&Re("Can't get an output name."),f.push(N);let A=o.UTF8ToString(N);x.push(A),I.push(R===0?{name:A,isTensor:!1}:{name:A,isTensor:!0,type:Xr(R),shape:H});{if(_&&e?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let X=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[A]??"cpu",Y=o.webnnIsGraphOutput;if(X==="cpu"&&Y&&Y(i,A)){S.push("ml-tensor-cpu-output");continue}if(X!=="cpu"&&X!=="cpu-pinned"&&X!=="gpu-buffer"&&X!=="ml-tensor")throw new Error(`Not supported preferred output location: ${X}.`);if(_&&X!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${X}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(X)}}let C=null;return S.some(D=>D==="gpu-buffer"||D==="ml-tensor"||D==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&Re("Can't create IO binding."),C={handle:s,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(D=>D==="ml-tensor-cpu-output"?"ml-tensor":D).map(D=>yc(D))}),eo.set(i,[i,c,f,C,_,!1]),[i,v,x,O,I]}catch(m){throw c.forEach(b=>o._OrtFree(b)),f.forEach(b=>o._OrtFree(b)),s!==0&&o._OrtReleaseBinding(s)!==0&&Re("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Re("Can't release session."),m}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Re("Can't release session options."),u.forEach(m=>o._free(m)),o.unmountExternalData?.()}},Ca=n=>{let e=je(),r=eo.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Re("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Re("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),e.webnnOnReleaseSession?.(n),e.webgpuOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Re("Can't release session."),eo.delete(n)},K2=async(n,e,r,t,o,i,a=!1)=>{if(!n){e.push(0);return}let s=je(),u=s.PTR_SIZE,c=n[0],f=n[1],m=n[3],b=m,_,v;if(c==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let I=n[2].gpuBuffer;v=On(An(c),f);{let S=s.jsepRegisterBuffer;if(!S)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=S(t,i,I,v)}}else if(m==="ml-tensor"){let I=n[2].mlTensor;v=On(An(c),f);let S=s.webnnRegisterMLTensor;if(!S)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=S(t,I,An(c),f)}else{let I=n[2];if(Array.isArray(I)){v=u*I.length,_=s._malloc(v),r.push(_);for(let S=0;S<I.length;S++){if(typeof I[S]!="string")throw new TypeError(`tensor data at index ${S} is not a string`);s.setValue(_+S*u,Ot(I[S],r),"*")}}else{let S=s.webnnIsGraphInput,C=s.webnnIsGraphOutput;if(c!=="string"&&S&&C){let D=s.UTF8ToString(o);if(S(t,D)||C(t,D)){let N=An(c);v=On(N,f),b="ml-tensor";let R=s.webnnCreateTemporaryTensor,H=s.webnnUploadTensor;if(!R||!H)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let A=await R(t,N,f);H(A,new Uint8Array(I.buffer,I.byteOffset,I.byteLength)),_=A}else v=I.byteLength,_=s._malloc(v),r.push(_),s.HEAPU8.set(new Uint8Array(I.buffer,I.byteOffset,v),_)}else v=I.byteLength,_=s._malloc(v),r.push(_),s.HEAPU8.set(new Uint8Array(I.buffer,I.byteOffset,v),_)}}let x=s.stackSave(),O=s.stackAlloc(4*f.length);try{f.forEach((S,C)=>s.setValue(O+C*u,S,u===4?"i32":"i64"));let I=s._OrtCreateTensor(An(c),_,v,O,f.length,yc(b));I===0&&Re(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(I)}finally{s.stackRestore(x)}},Da=async(n,e,r,t,o,i)=>{let a=je(),s=a.PTR_SIZE,u=eo.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let c=u[0],f=u[1],m=u[2],b=u[3],_=u[4],v=u[5],x=e.length,O=t.length,I=0,S=[],C=[],D=[],N=[],R=[],H=a.stackSave(),A=a.stackAlloc(x*s),X=a.stackAlloc(x*s),Y=a.stackAlloc(O*s),le=a.stackAlloc(O*s);try{[I,S]=$v(i),gn("wasm prepareInputOutputTensor");for(let Q=0;Q<x;Q++)await K2(r[Q],C,N,n,f[e[Q]],e[Q],_);for(let Q=0;Q<O;Q++)await K2(o[Q],D,N,n,m[t[Q]],x+t[Q],_);bn("wasm prepareInputOutputTensor");for(let Q=0;Q<x;Q++)a.setValue(A+Q*s,C[Q],"*"),a.setValue(X+Q*s,f[e[Q]],"*");for(let Q=0;Q<O;Q++)a.setValue(Y+Q*s,D[Q],"*"),a.setValue(le+Q*s,m[t[Q]],"*");if(b&&!v){let{handle:Q,outputPreferredLocations:de,outputPreferredLocationsEncoded:he}=b;if(f.length!==x)throw new Error(`input count from feeds (${x}) is expected to be always equal to model's input count (${f.length}).`);gn("wasm bindInputsOutputs");for(let ce=0;ce<x;ce++){let xe=e[ce];await a._OrtBindInput(Q,f[xe],C[ce])!==0&&Re(`Can't bind input[${ce}] for session=${n}.`)}for(let ce=0;ce<O;ce++){let xe=t[ce];o[ce]?.[3]?(R.push(D[ce]),a._OrtBindOutput(Q,m[xe],D[ce],0)!==0&&Re(`Can't bind pre-allocated output[${ce}] for session=${n}.`)):a._OrtBindOutput(Q,m[xe],0,he[xe])!==0&&Re(`Can't bind output[${ce}] to ${de[ce]} for session=${n}.`)}bn("wasm bindInputsOutputs"),eo.set(n,[c,f,m,b,_,!0])}a.jsepOnRunStart?.(c),a.webnnOnRunStart?.(c);let ae;b?ae=await a._OrtRunWithBinding(c,b.handle,O,Y,I):ae=await a._OrtRun(c,X,A,x,le,O,Y,I),ae!==0&&Re("failed to call OrtRun().");let me=[],j=[];gn("wasm ProcessOutputTensor");for(let Q=0;Q<O;Q++){let de=Number(a.getValue(Y+Q*s,"*"));if(de===D[Q]||R.includes(D[Q])){me.push(o[Q]),de!==D[Q]&&a._OrtReleaseTensor(de)!==0&&Re("Can't release tensor.");continue}let he=a.stackSave(),ce=a.stackAlloc(4*s),xe=!1,Ae,ke=0;try{a._OrtGetTensorData(de,ce,ce+s,ce+2*s,ce+3*s)!==0&&Re(`Can't access output tensor data on index ${Q}.`);let Xe=s===4?"i32":"i64",Z=Number(a.getValue(ce,Xe));ke=a.getValue(ce+s,"*");let re=a.getValue(ce+s*2,"*"),Ge=Number(a.getValue(ce+s*3,Xe)),pt=[];for(let Me=0;Me<Ge;Me++)pt.push(Number(a.getValue(re+Me*s,Xe)));a._OrtFree(re)!==0&&Re("Can't free memory for tensor dims.");let Ze=pt.reduce((Me,Ye)=>Me*Ye,1);Ae=Xr(Z);let mt=b?.outputPreferredLocations[t[Q]];if(Ae==="string"){if(mt==="gpu-buffer"||mt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Me=[];for(let Ye=0;Ye<Ze;Ye++){let Jt=a.getValue(ke+Ye*s,"*"),Lt=a.getValue(ke+(Ye+1)*s,"*"),Je=Ye===Ze-1?void 0:Lt-Jt;Me.push(a.UTF8ToString(Jt,Je))}me.push([Ae,pt,Me,"cpu"])}else if(mt==="gpu-buffer"&&Ze>0){let Me=a.jsepGetBuffer;if(!Me)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ye=Me(ke),Jt=On(Z,Ze);if(Jt===void 0||!Ma(Ae))throw new Error(`Unsupported data type: ${Ae}`);xe=!0,me.push([Ae,pt,{gpuBuffer:Ye,download:a.jsepCreateDownloader(Ye,Jt,Ae),dispose:()=>{a._OrtReleaseTensor(de)!==0&&Re("Can't release tensor.")}},"gpu-buffer"])}else if(mt==="ml-tensor"&&Ze>0){let Me=a.webnnEnsureTensor,Ye=a.webnnIsGraphInputOutputTypeSupported;if(!Me||!Ye)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(On(Z,Ze)===void 0||!Ba(Ae))throw new Error(`Unsupported data type: ${Ae}`);if(!Ye(n,Ae,!1))throw new Error(`preferredLocation "ml-tensor" for ${Ae} output is not supported by current WebNN Context.`);let Lt=await Me(n,ke,Z,pt,!1);xe=!0,me.push([Ae,pt,{mlTensor:Lt,download:a.webnnCreateMLTensorDownloader(ke,Ae),dispose:()=>{a.webnnReleaseTensorId(ke),a._OrtReleaseTensor(de)}},"ml-tensor"])}else if(mt==="ml-tensor-cpu-output"&&Ze>0){let Me=a.webnnCreateMLTensorDownloader(ke,Ae)(),Ye=me.length;xe=!0,j.push((async()=>{let Jt=[Ye,await Me];return a.webnnReleaseTensorId(ke),a._OrtReleaseTensor(de),Jt})()),me.push([Ae,pt,[],"cpu"])}else{let Me=yo(Ae),Ye=new Me(Ze);new Uint8Array(Ye.buffer,Ye.byteOffset,Ye.byteLength).set(a.HEAPU8.subarray(ke,ke+Ye.byteLength)),me.push([Ae,pt,Ye,"cpu"])}}finally{a.stackRestore(he),Ae==="string"&&ke&&a._free(ke),xe||a._OrtReleaseTensor(de)}}b&&!_&&(a._OrtClearBoundOutputs(b.handle)!==0&&Re("Can't clear bound outputs."),eo.set(n,[c,f,m,b,_,!1]));for(let[Q,de]of await Promise.all(j))me[Q][2]=de;return bn("wasm ProcessOutputTensor"),me}finally{a.webnnOnRunEnd?.(c),a.stackRestore(H),C.forEach(ae=>a._OrtReleaseTensor(ae)),D.forEach(ae=>a._OrtReleaseTensor(ae)),N.forEach(ae=>a._free(ae)),I!==0&&a._OrtReleaseRunOptions(I),S.forEach(ae=>a._free(ae))}},ka=n=>{let e=je(),r=eo.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&Re("Can't get an profile file name."),e._OrtFree(o)},Na=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var to,Zt,oi,fs,hs,ps,Qc,ed,xo,To,eM,X2,Z2,J2,Y2,Q2,eI,tI,td=U(()=>{"use strict";xt();fc();$n();$a();to=()=>!!ve.wasm.proxy&&typeof document<"u",oi=!1,fs=!1,hs=!1,ed=new Map,xo=(n,e)=>{let r=ed.get(n);r?r.push(e):ed.set(n,[e])},To=()=>{if(oi||!fs||hs||!Zt)throw new Error("worker not ready")},eM=n=>{switch(n.data.type){case"init-wasm":oi=!1,n.data.err?(hs=!0,Qc[1](n.data.err)):(fs=!0,Qc[0]()),ps&&(URL.revokeObjectURL(ps),ps=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=ed.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},X2=async()=>{if(!fs){if(oi)throw new Error("multiple calls to 'initWasm()' detected.");if(hs)throw new Error("previous call to 'initWasm()' failed.");if(oi=!0,to())return new Promise((n,e)=>{Zt?.terminate(),Tv().then(([r,t])=>{try{Zt=t,Zt.onerror=i=>e(i),Zt.onmessage=eM,Qc=[n,e];let o={type:"init-wasm",in:ve};!o.in.wasm.wasmPaths&&(r||mc)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Zt.postMessage(o),ps=r}catch(o){e(o)}},e)});try{await Aa(ve.wasm),await Oa(ve),fs=!0}catch(n){throw hs=!0,n}finally{oi=!1}}},Z2=async n=>{if(to())return To(),new Promise((e,r)=>{xo("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:ve}};Zt.postMessage(t)});await Pa(ve,n)},J2=async n=>to()?(To(),new Promise((e,r)=>{xo("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Zt.postMessage(t,[n.buffer])})):Xo(n),Y2=async(n,e)=>{if(to()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return To(),new Promise((r,t)=>{xo("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Zt.postMessage(o,i)})}else return Ea(n,e)},Q2=async n=>{if(to())return To(),new Promise((e,r)=>{xo("release",[e,r]);let t={type:"release",in:n};Zt.postMessage(t)});Ca(n)},eI=async(n,e,r,t,o,i)=>{if(to()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return To(),new Promise((a,s)=>{xo("run",[a,s]);let u=r,c={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Zt.postMessage(c,Na(u))})}else return Da(n,e,r,t,o,i)},tI=async n=>{if(to())return To(),new Promise((e,r)=>{xo("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Zt.postMessage(t)});ka(n)}});var rI,tM,ms,nI=U(()=>{"use strict";xt();td();_e();Sa();_c();rI=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},tM=n=>{switch(n[3]){case"cpu":return new Rt(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!Ma(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return Rt.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!Ba(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return Rt.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},ms=class{async fetchModelAndCopyToWasmMemory(e){return J2(await Yo(e))}async loadModel(e,r){zt();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Y2(t,r),Pt()}async dispose(){return Q2(this.sessionId)}async run(e,r,t){zt();let o=[],i=[];Object.entries(e).forEach(b=>{let _=b[0],v=b[1],x=this.inputNames.indexOf(_);if(x===-1)throw new Error(`invalid input '${_}'`);o.push(v),i.push(x)});let a=[],s=[];Object.entries(r).forEach(b=>{let _=b[0],v=b[1],x=this.outputNames.indexOf(_);if(x===-1)throw new Error(`invalid output '${_}'`);a.push(v),s.push(x)});let u=o.map((b,_)=>rI(b,()=>`input "${this.inputNames[i[_]]}"`)),c=a.map((b,_)=>b?rI(b,()=>`output "${this.outputNames[s[_]]}"`):null),f=await eI(this.sessionId,i,u,s,c,t),m={};for(let b=0;b<f.length;b++)m[this.outputNames[s[b]]]=a[b]??tM(f[b]);return Pt(),m}startProfiling(){}endProfiling(){tI(this.sessionId)}}});var iI={};Nn(iI,{OnnxruntimeWebAssemblyBackend:()=>gs,initializeFlags:()=>oI,wasmBackend:()=>rM});var oI,gs,rM,aI=U(()=>{"use strict";xt();td();nI();oI=()=>{(typeof ve.wasm.initTimeout!="number"||ve.wasm.initTimeout<0)&&(ve.wasm.initTimeout=0);let n=ve.wasm.simd;if(typeof n!="boolean"&&n!==void 0&&n!=="fixed"&&n!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${n}". Reset it to \`false\` and ignore SIMD feature checking.`),ve.wasm.simd=!1),typeof ve.wasm.proxy!="boolean"&&(ve.wasm.proxy=!1),typeof ve.wasm.trace!="boolean"&&(ve.wasm.trace=!1),typeof ve.wasm.numThreads!="number"||!Number.isInteger(ve.wasm.numThreads)||ve.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ve.wasm.numThreads=1;else{let e=typeof navigator>"u"?Ms("node:os").cpus().length:navigator.hardwareConcurrency;ve.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},gs=class{async init(e){oI(),await X2(),await Z2(e)}async createInferenceSessionHandler(e,r){let t=new ms;return await t.loadModel(e,r),t}},rM=new gs});xt();xt();xt();var kg="1.25.0";var RY=Ws;{let n=(cv(),oo(lv)).onnxjsBackend;mn("webgl",n,-10)}{let n=(aI(),oo(iI)).wasmBackend;mn("webgpu",n,5),mn("webnn",n,5),mn("cpu",n,10),mn("wasm",n,10)}Object.defineProperty(ve.versions,"web",{value:kg,enumerable:!0});export{DP as InferenceSession,xi as TRACE,gn as TRACE_EVENT_BEGIN,bn as TRACE_EVENT_END,zt as TRACE_FUNC_BEGIN,Pt as TRACE_FUNC_END,Rt as Tensor,RY as default,ve as env,mn as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.bundle.min.mjs.map

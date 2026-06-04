/*!
 * ONNX Runtime Web v1.25.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Yn=Object.defineProperty;var L0=Object.getOwnPropertyDescriptor;var W0=Object.getOwnPropertyNames;var G0=Object.prototype.hasOwnProperty;var Xn=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Q=(t,e)=>()=>(t&&(e=t(t=0)),e);var Zt=(t,e)=>{for(var r in e)Yn(t,r,{get:e[r],enumerable:!0})},H0=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of W0(e))!G0.call(t,i)&&i!==r&&Yn(t,i,{get:()=>e[i],enumerable:!(o=L0(e,i))||o.enumerable});return t};var sr=t=>H0(Yn({},"__esModule",{value:!0}),t);var zr,Ut,Nt,F0,Qd,Jn=Q(()=>{"use strict";zr=new Map,Ut=[],Nt=(t,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let o=zr.get(t);if(o===void 0)zr.set(t,{backend:e,priority:r});else{if(o.priority>r)return;if(o.priority===r&&o.backend!==e)throw new Error(`cannot register backend "${t}" using priority ${r}`)}if(r>=0){let i=Ut.indexOf(t);i!==-1&&Ut.splice(i,1);for(let u=0;u<Ut.length;u++)if(zr.get(Ut[u]).priority<=r){Ut.splice(u,0,t);return}Ut.push(t)}return}throw new TypeError("not a valid backend")},F0=async t=>{let e=zr.get(t);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(t)),await e.initPromise,e.initialized=!0,e.backend}catch(o){return r||(e.error=`${o}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Qd=async t=>{let e=t.executionProviders||[],r=e.map(p=>typeof p=="string"?p:p.name),o=r.length===0?Ut:r,i,u=[],d=new Set;for(let p of o){let m=await F0(p);typeof m=="string"?u.push({name:p,err:m}):(i||(i=m),i===m&&d.add(p))}if(!i)throw new Error(`no available backend found. ERR: ${u.map(p=>`[${p.name}] ${p.err}`).join(", ")}`);for(let{name:p,err:m}of u)r.includes(p)&&console.warn(`removing requested execution provider "${p}" from session options because it is not available: ${m}`);let l=e.filter(p=>d.has(typeof p=="string"?p:p.name));return[i,new Proxy(t,{get:(p,m)=>m==="executionProviders"?l:Reflect.get(p,m)})]}});var Yd=Q(()=>{"use strict";Jn()});var Xd,Jd=Q(()=>{"use strict";Xd="1.25.0"});var ec,Le,eo=Q(()=>{"use strict";Jd();ec="warning",Le={wasm:{},webgl:{},webgpu:{},versions:{common:Xd},set logLevel(t){if(t!==void 0){if(typeof t!="string"||["verbose","info","warning","error","fatal"].indexOf(t)===-1)throw new Error(`Unsupported logging level: ${t}`);ec=t}},get logLevel(){return ec}};Object.defineProperty(Le,"logLevel",{enumerable:!0})});var Ce,tc=Q(()=>{"use strict";eo();Ce=Le});var rc,nc,oc=Q(()=>{"use strict";rc=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=t.dims[3],r.height=t.dims[2];let o=r.getContext("2d");if(o!=null){let i,u;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(i=t.dims[2],u=t.dims[3]):(i=t.dims[3],u=t.dims[2]);let d=e?.format!==void 0?e.format:"RGB",l=e?.norm,p,m;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?m=[0,0,0,0]:typeof l.bias=="number"?m=[l.bias,l.bias,l.bias,l.bias]:(m=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(m[3]=l.bias[3]));let g=u*i,y=0,w=g,$=g*2,v=-1;d==="RGBA"?(y=0,w=g,$=g*2,v=g*3):d==="RGB"?(y=0,w=g,$=g*2):d==="RBG"&&(y=0,$=g,w=g*2);for(let S=0;S<u;S++)for(let k=0;k<i;k++){let C=(t.data[y++]-m[0])*p[0],I=(t.data[w++]-m[1])*p[1],E=(t.data[$++]-m[2])*p[2],P=v===-1?255:(t.data[v++]-m[3])*p[3];o.fillStyle="rgba("+C+","+I+","+E+","+P+")",o.fillRect(k,S,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},nc=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),o;if(r!=null){let i,u,d;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(i=t.dims[2],u=t.dims[1],d=t.dims[3]):(i=t.dims[3],u=t.dims[2],d=t.dims[1]);let l=e!==void 0&&e.format!==void 0?e.format:"RGB",p=e?.norm,m,g;p===void 0||p.mean===void 0?m=[255,255,255,255]:typeof p.mean=="number"?m=[p.mean,p.mean,p.mean,p.mean]:(m=[p.mean[0],p.mean[1],p.mean[2],255],p.mean[3]!==void 0&&(m[3]=p.mean[3])),p===void 0||p.bias===void 0?g=[0,0,0,0]:typeof p.bias=="number"?g=[p.bias,p.bias,p.bias,p.bias]:(g=[p.bias[0],p.bias[1],p.bias[2],0],p.bias[3]!==void 0&&(g[3]=p.bias[3]));let y=u*i;if(e!==void 0&&(e.format!==void 0&&d===4&&e.format!=="RGBA"||d===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let w=4,$=0,v=1,S=2,k=3,C=0,I=y,E=y*2,P=-1;l==="RGBA"?(C=0,I=y,E=y*2,P=y*3):l==="RGB"?(C=0,I=y,E=y*2):l==="RBG"&&(C=0,E=y,I=y*2),o=r.createImageData(i,u);for(let M=0;M<u*i;$+=w,v+=w,S+=w,k+=w,M++)o.data[$]=(t.data[C++]-g[0])*m[0],o.data[v]=(t.data[I++]-g[1])*m[1],o.data[S]=(t.data[E++]-g[2])*m[2],o.data[k]=P===-1?255:(t.data[P++]-g[3])*m[3]}else throw new Error("Can not access image data");return o}});var to,ic,ac,sc,uc,dc,cc=Q(()=>{"use strict";Dr();to=(t,e)=>{if(t===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:o}=e,i=e.norm??{mean:255,bias:0},u,d;typeof i.mean=="number"?u=[i.mean,i.mean,i.mean,i.mean]:u=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?d=[i.bias,i.bias,i.bias,i.bias]:d=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let l=e.format!==void 0?e.format:"RGBA",p=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",m=r*o,g=p==="RGBA"?new Float32Array(m*4):new Float32Array(m*3),y=4,w=0,$=1,v=2,S=3,k=0,C=m,I=m*2,E=-1;l==="RGB"&&(y=3,w=0,$=1,v=2,S=-1),p==="RGBA"?E=m*3:p==="RBG"?(k=0,I=m,C=m*2):p==="BGR"&&(I=0,C=m,k=m*2);for(let M=0;M<m;M++,w+=y,v+=y,$+=y,S+=y)g[k++]=(t[w]+d[0])/u[0],g[C++]=(t[$]+d[1])/u[1],g[I++]=(t[v]+d[2])/u[2],E!==-1&&S!==-1&&(g[E++]=(t[S]+d[3])/u[3]);return p==="RGBA"?new He("float32",g,[1,4,r,o]):new He("float32",g,[1,3,r,o])},ic=async(t,e)=>{let r=typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,o=typeof ImageData<"u"&&t instanceof ImageData,i=typeof ImageBitmap<"u"&&t instanceof ImageBitmap,u=typeof t=="string",d,l=e??{},p=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},m=g=>typeof HTMLCanvasElement<"u"&&g instanceof HTMLCanvasElement||g instanceof OffscreenCanvas?g.getContext("2d"):null;if(r){let g=p();g.width=t.width,g.height=t.height;let y=m(g);if(y!=null){let w=t.height,$=t.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(w=e.resizedHeight,$=e.resizedWidth),e!==void 0){if(l=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=w,l.width=$}else l.tensorFormat="RGBA",l.height=w,l.width=$;y.drawImage(t,0,0),d=y.getImageData(0,0,$,w).data}else throw new Error("Can not access image data")}else if(o){let g,y;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(g=e.resizedHeight,y=e.resizedWidth):(g=t.height,y=t.width),e!==void 0&&(l=e),l.format="RGBA",l.height=g,l.width=y,e!==void 0){let w=p();w.width=y,w.height=g;let $=m(w);if($!=null)$.putImageData(t,0,0),d=$.getImageData(0,0,y,g).data;else throw new Error("Can not access image data")}else d=t.data}else if(i){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let g=p();g.width=t.width,g.height=t.height;let y=m(g);if(y!=null){let w=t.height,$=t.width;return y.drawImage(t,0,0,$,w),d=y.getImageData(0,0,$,w).data,l.height=w,l.width=$,to(d,l)}else throw new Error("Can not access image data")}else{if(u)return new Promise((g,y)=>{let w=p(),$=m(w);if(!t||!$)return y();let v=new Image;v.crossOrigin="Anonymous",v.src=t,v.onload=()=>{w.width=v.width,w.height=v.height,$.drawImage(v,0,0,w.width,w.height);let S=$.getImageData(0,0,w.width,w.height);l.height=w.height,l.width=w.width,g(to(S.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(d!==void 0)return to(d,l);throw new Error("Input data provided is not supported - aborted tensor creation")},ac=(t,e)=>{let{width:r,height:o,download:i,dispose:u}=e,d=[1,o,r,4];return new He({location:"texture",type:"float32",texture:t,dims:d,download:i,dispose:u})},sc=(t,e)=>{let{dataType:r,dims:o,download:i,dispose:u}=e;return new He({location:"gpu-buffer",type:r??"float32",gpuBuffer:t,dims:o,download:i,dispose:u})},uc=(t,e)=>{let{dataType:r,dims:o,download:i,dispose:u}=e;return new He({location:"ml-tensor",type:r??"float32",mlTensor:t,dims:o,download:i,dispose:u})},dc=(t,e,r)=>new He({location:"cpu-pinned",type:t,data:e,dims:r??[e.length]})});var Vt,ur,lc,pc,fc=Q(()=>{"use strict";Vt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ur=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),lc=!1,pc=()=>{if(!lc){lc=!0;let t=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,o=typeof r<"u"&&r.from;t&&(Vt.set("int64",BigInt64Array),ur.set(BigInt64Array,"int64")),e&&(Vt.set("uint64",BigUint64Array),ur.set(BigUint64Array,"uint64")),o?(Vt.set("float16",r),ur.set(r,"float16")):Vt.set("float16",Uint16Array)}}});var mc,hc,gc=Q(()=>{"use strict";Dr();mc=t=>{let e=1;for(let r=0;r<t.length;r++){let o=t[r];if(typeof o!="number"||!Number.isSafeInteger(o))throw new TypeError(`dims[${r}] must be an integer, got: ${o}`);if(o<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${o}`);e*=o}return e},hc=(t,e)=>{switch(t.location){case"cpu":return new He(t.type,t.data,e);case"cpu-pinned":return new He({location:"cpu-pinned",data:t.data,type:t.type,dims:e});case"texture":return new He({location:"texture",texture:t.texture,type:t.type,dims:e});case"gpu-buffer":return new He({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:e});case"ml-tensor":return new He({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${t.location} is not supported`)}}});var He,Dr=Q(()=>{"use strict";oc();cc();fc();gc();He=class{constructor(e,r,o){pc();let i,u;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,u=e.dims,e.location){case"cpu-pinned":{let l=Vt.get(i);if(!l)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof l))throw new TypeError(`buffer should be of type ${l.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let l,p;if(typeof e=="string")if(i=e,p=o,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");l=r}else{let m=Vt.get(e);if(m===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&m===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${m.name} as data.`);e==="uint64"||e==="int64"?l=m.from(r,BigInt):l=m.from(r)}else if(r instanceof m)l=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")l=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&m!==Uint16Array)l=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${i} tensor's data must be type of ${m}`)}else if(p=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let m=typeof e[0];if(m==="string")i="string",l=e;else if(m==="boolean")i="bool",l=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${m}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",l=Uint8Array.from(e);else{let m=ur.get(e.constructor);if(m===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=m,l=e}if(p===void 0)p=[l.length];else if(!Array.isArray(p))throw new TypeError("A tensor's dims must be a number array");u=p,this.cpuData=l,this.dataLocation="cpu"}let d=mc(u);if(this.cpuData&&d!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(d/2)===this.cpuData.length))throw new Error(`Tensor's size(${d}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=u,this.size=d}static async fromImage(e,r){return ic(e,r)}static fromTexture(e,r){return ac(e,r)}static fromGpuBuffer(e,r){return sc(e,r)}static fromMLTensor(e,r){return uc(e,r)}static fromPinnedBuffer(e,r,o){return dc(e,r,o)}toDataURL(e){return rc(this,e)}toImageData(e){return nc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return hc(this,e)}}});var nt,ro=Q(()=>{"use strict";Dr();nt=He});var Br,yc,Qe,je,At,kt,no=Q(()=>{"use strict";eo();Br=(t,e)=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeStamp(`${t}::ORT::${e}`)},yc=(t,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],o=!1;for(let i=0;i<r.length;i++){if(o&&!r[i].includes("TRACE_FUNC")){let u=`FUNC_${t}::${r[i].trim().split(" ")[1]}`;e&&(u+=`::${e}`),Br("CPU",u);return}r[i].includes("TRACE_FUNC")&&(o=!0)}},Qe=t=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||yc("BEGIN",t)},je=t=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||yc("END",t)},At=t=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.time(`ORT::${t}`)},kt=t=>{(typeof Le.trace>"u"?!Le.wasm.trace:!Le.trace)||console.timeEnd(`ORT::${t}`)}});var Mr,bc=Q(()=>{"use strict";Jn();ro();no();Mr=class t{constructor(e){this.handler=e}async run(e,r,o){Qe(),At("InferenceSession.run");let i={},u={};if(typeof e!="object"||e===null||e instanceof nt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof nt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let m of r){if(typeof m!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(m)===-1)throw new RangeError(`'fetches' contains invalid output name: ${m}.`);i[m]=null}if(typeof o=="object"&&o!==null)u=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else{let m=!1,g=Object.getOwnPropertyNames(r);for(let y of this.outputNames)if(g.indexOf(y)!==-1){let w=r[y];(w===null||w instanceof nt)&&(m=!0,d=!1,i[y]=w)}if(m){if(typeof o=="object"&&o!==null)u=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else u=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let m of this.inputNames)if(typeof e[m]>"u")throw new Error(`input '${m}' is missing in 'feeds'.`);if(d)for(let m of this.outputNames)i[m]=null;let l=await this.handler.run(e,i,u),p={};for(let m in l)if(Object.hasOwnProperty.call(l,m)){let g=l[m];g instanceof nt?p[m]=g:p[m]=new nt(g.type,g.data,g.dims)}return kt("InferenceSession.run"),je(),p}async release(){return this.handler.dispose()}static async create(e,r,o,i){Qe(),At("InferenceSession.create");let u,d={};if(typeof e=="string"){if(u=e,typeof r=="object"&&r!==null)d=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(u=e,typeof r=="object"&&r!==null)d=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let g=e,y=0,w=e.byteLength;if(typeof r=="object"&&r!==null)d=r;else if(typeof r=="number"){if(y=r,!Number.isSafeInteger(y))throw new RangeError("'byteOffset' must be an integer.");if(y<0||y>=g.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${g.byteLength}).`);if(w=e.byteLength-y,typeof o=="number"){if(w=o,!Number.isSafeInteger(w))throw new RangeError("'byteLength' must be an integer.");if(w<=0||y+w>g.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${g.byteLength-y}].`);if(typeof i=="object"&&i!==null)d=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof o<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");u=new Uint8Array(g,y,w)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,p]=await Qd(d),m=await l.createInferenceSessionHandler(u,p);return kt("InferenceSession.create"),je(),new t(m)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var q0,wc=Q(()=>{"use strict";bc();q0=Mr});var _c=Q(()=>{"use strict"});var vc=Q(()=>{"use strict"});var $c=Q(()=>{"use strict"});var xc=Q(()=>{"use strict"});var oo={};Zt(oo,{InferenceSession:()=>q0,TRACE:()=>Br,TRACE_EVENT_BEGIN:()=>At,TRACE_EVENT_END:()=>kt,TRACE_FUNC_BEGIN:()=>Qe,TRACE_FUNC_END:()=>je,Tensor:()=>nt,env:()=>Ce,registerBackend:()=>Nt});var Ye=Q(()=>{"use strict";Yd();tc();wc();ro();_c();vc();no();$c();xc()});var Rr=Q(()=>{"use strict"});var Cc={};Zt(Cc,{default:()=>j0});var Tc,Ic,j0,Ac=Q(()=>{"use strict";io();Et();Ur();Tc="ort-wasm-proxy-worker",Ic=globalThis.self?.name===Tc;Ic&&(self.onmessage=t=>{let{type:e,in:r}=t.data;try{switch(e){case"init-wasm":Nr(r.wasm).then(()=>{Vr(r).then(()=>{postMessage({type:e})},o=>{postMessage({type:e,err:o})})},o=>{postMessage({type:e,err:o})});break;case"init-ep":{let{epName:o,env:i}=r;Lr(i,o).then(()=>{postMessage({type:e})},u=>{postMessage({type:e,err:u})});break}case"copy-from":{let{buffer:o}=r,i=dr(o);postMessage({type:e,out:i});break}case"create":{let{model:o,options:i}=r;Wr(o,i).then(u=>{postMessage({type:e,out:u})},u=>{postMessage({type:e,err:u})});break}case"release":Gr(r),postMessage({type:e});break;case"run":{let{sessionId:o,inputIndices:i,inputs:u,outputIndices:d,options:l}=r;Hr(o,i,u,d,new Array(d.length).fill(null),l).then(p=>{p.some(m=>m[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:p},qr([...u,...p]))},p=>{postMessage({type:e,err:p})});break}case"end-profiling":Fr(r),postMessage({type:e});break;default:}}catch(o){postMessage({type:e,err:o})}});j0=Ic?null:t=>new Worker(t??Xe,{type:"module",name:Tc})});var Ec={};Zt(Ec,{default:()=>K0});async function kc(t={}){var e=t,r=!!globalThis.window,o=!!globalThis.WorkerGlobalScope,i=o&&self.name?.startsWith("em-pthread");e.mountExternalData=(n,s)=>{n.startsWith("./")&&(n=n.substring(2)),(e.zj||(e.zj=new Map)).set(n,s)},e.unmountExternalData=()=>{delete e.zj},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qk:!0}).buffer.constructor;let u=n=>async(...s)=>{try{if(e.Cj)throw Error("Session already started");let c=e.Cj={fk:s[0],errors:[]},a=await n(...s);if(e.Cj!==c)throw Error("Session mismatch");e.Kj?.flush();let f=c.errors;if(0<f.length){let h=await Promise.all(f);if(h=h.filter(b=>b),0<h.length)throw Error(h.join(`
`))}return a}finally{e.Cj=null}};e.jsepInit=(n,s)=>{if(n==="webgpu"){[e.Kj,e.Wj,e.$j,e.Lj,e.Zj,e.kf,e.ak,e.ck,e.Xj,e.Yj,e.bk]=s;let c=e.Kj;e.jsepRegisterBuffer=(a,f,h,b)=>c.registerBuffer(a,f,h,b),e.jsepGetBuffer=a=>c.getBuffer(a),e.jsepCreateDownloader=(a,f,h)=>c.createDownloader(a,f,h),e.jsepOnCreateSession=a=>{c.onCreateSession(a)},e.jsepOnReleaseSession=a=>{c.onReleaseSession(a)},e.jsepOnRunStart=a=>c.onRunStart(a),e.dk=(a,f)=>{c.upload(a,f)}}else if(n==="webnn"){let c=s[0];[e.nk,e.Pj,e.webnnEnsureTensor,e.Qj,e.webnnDownloadTensor,e.mk,e.webnnEnableTraceEvent]=s.slice(1),e.webnnReleaseTensorId=e.Pj,e.webnnUploadTensor=e.Qj,e.webnnRegisterMLContext=e.mk,e.webnnOnRunStart=a=>c.onRunStart(a),e.webnnOnRunEnd=c.onRunEnd.bind(c),e.webnnOnReleaseSession=a=>{c.onReleaseSession(a)},e.webnnCreateMLTensorDownloader=(a,f)=>c.createMLTensorDownloader(a,f),e.webnnRegisterMLTensor=(a,f,h,b)=>c.registerMLTensor(a,f,h,b),e.webnnCreateMLContext=a=>c.createMLContext(a),e.webnnRegisterMLConstant=(a,f,h,b,_,x)=>c.registerMLConstant(a,f,h,b,_,e.zj,x),e.webnnRegisterGraphInput=c.registerGraphInput.bind(c),e.webnnIsGraphInput=c.isGraphInput.bind(c),e.webnnRegisterGraphOutput=c.registerGraphOutput.bind(c),e.webnnIsGraphOutput=c.isGraphOutput.bind(c),e.webnnCreateTemporaryTensor=c.createTemporaryTensor.bind(c),e.webnnIsGraphInputOutputTypeSupported=c.isGraphInputOutputTypeSupported.bind(c)}};let d=()=>{let n=s=>(...c)=>{let a=dt;return c=s(...c),dt!=a?new Promise((f,h)=>{Nn={resolve:f,reject:h}}):c};(()=>{for(let s of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[s]=n(e[s])})(),u!==void 0&&(e._OrtRun=u(e._OrtRun),e._OrtRunWithBinding=u(e._OrtRunWithBinding)),d=void 0};e.asyncInit=()=>{d?.()};var l,p,m=(n,s)=>{throw s},g=import.meta.url,y="";if(r||o){try{y=new URL(".",g).href}catch{}o&&(p=n=>{var s=new XMLHttpRequest;return s.open("GET",n,!1),s.responseType="arraybuffer",s.send(null),new Uint8Array(s.response)}),l=async n=>{if(W(n))return new Promise((c,a)=>{var f=new XMLHttpRequest;f.open("GET",n,!0),f.responseType="arraybuffer",f.onload=()=>{f.status==200||f.status==0&&f.response?c(f.response):a(f.status)},f.onerror=a,f.send(null)});var s=await fetch(n,{credentials:"same-origin"});if(s.ok)return s.arrayBuffer();throw Error(s.status+" : "+s.url)}}var w,$,v,S,k,C,I=console.log.bind(console),E=console.error.bind(console),P=I,M=E,R=!1,W=n=>n.startsWith("file://");function T(){Tt.buffer!=Z.buffer&&Fe()}if(i){let n=function(s){try{var c=s.data,a=c.vi;if(a==="load"){let f=[];self.onmessage=h=>f.push(h),C=()=>{postMessage({vi:"loaded"});for(let h of f)n(h);self.onmessage=n};for(let h of c.Tj)e[h]&&!e[h].proxy||(e[h]=(...b)=>{postMessage({vi:"callHandler",Sj:h,args:b})},h=="print"&&(P=e[h]),h=="printErr"&&(M=e[h]));Tt=c.jk,Fe(),$=c.kk,Te(),Or()}else if(a==="run"){(function(f){var h=(T(),Y)[f+52>>>2>>>0];f=(T(),Y)[f+56>>>2>>>0],Yi(h,h-f),z(h)})(c.ui),Hn(c.ui,0,0,1,0,0),Xo(),Mn(c.ui),j||(Fi(),j=!0);try{$h(c.hk,c.Ij)}catch(f){if(f!="unwind")throw f}}else c.target!=="setimmediate"&&(a==="checkMailbox"?j&&Tr():a&&(M(`worker: received unknown command ${a}`),M(c)))}catch(f){throw qi(),f}};var Sx=n,j=!1;self.onunhandledrejection=s=>{throw s.reason||s},self.onmessage=n}var Z,oe,te,ue,G,Y,ae,se,ie,pe,ye,_e=!1;function Fe(){var n=Tt.buffer;e.HEAP8=Z=new Int8Array(n),te=new Int16Array(n),e.HEAPU8=oe=new Uint8Array(n),ue=new Uint16Array(n),e.HEAP32=G=new Int32Array(n),e.HEAPU32=Y=new Uint32Array(n),ae=new Float32Array(n),se=new Float64Array(n),ie=new BigInt64Array(n),pe=new BigUint64Array(n)}function ke(){_e=!0,i?C():_t.Ce()}function q(n){throw M(n="Aborted("+n+")"),R=!0,n=new WebAssembly.RuntimeError(n+". Build with -sASSERTIONS for more info."),k?.(n),n}function J(){return{a:{Dc:Kg,ke:jg,t:xh,Y:Sh,b:Th,o:Ih,A:Ch,s:Ah,Pb:kh,w:Eh,ab:Ph,vd:oi,h:Oh,Nb:ui,Ld:di,rd:ci,td:li,Md:pi,Jd:fi,Cd:mi,Id:hi,pc:gi,sd:yi,pd:bi,Kd:wi,qd:_i,Rd:zh,kc:Bh,jd:Mh,hd:Uh,jc:Vh,Ea:Lh,na:Wh,id:Gh,Mb:Qh,kd:Yh,Fd:Xh,nd:eg,wd:tg,fd:rg,lc:ng,Ed:Mn,Od:og,ed:ug,W:fg,md:Dn,ne:mg,Lb:hg,qb:gg,ve:yg,U:bg,V:Ai,oe:wg,bd:_g,re:vg,ja:$g,Ya:xg,xe:Sg,ue:Tg,zd:Ig,Ad:Cg,Bd:Ag,xd:Oi,yd:zi,gd:Di,Vd:Eg,Qd:zg,E:Dg,_b:Bg,mc:Mg,Pd:Pg,xb:Rg,Nd:Ug,od:Ng,fa:kg,rb:Vg,Bc:Er,ld:Wg,ce:Lg,Xd:Gg,Gd:Ui,Hd:Ni,ud:En,Ob:Vi,oc:Li,Dd:Wi,nc:Gi,Jb:Dy,wb:Zw,qc:N0,z:T0,ya:Pw,Ca:zy,Td:V0,Ub:Kw,gc:db,X:lw,he:Ww,y:py,c:Xg,jb:Eb,f:Qg,Ga:ib,qa:k0,i:Zg,ma:zb,j:sy,Ud:R0,q:dy,m:ey,v:Wy,r:Oy,Va:tw,N:Ty,da:fb,oa:gb,cd:_y,ac:dw,_a:pw,Rb:y0,cb:Jw,Qc:Db,_c:Ly,Nc:Ub,$a:Cb,Oc:Mb,kb,$:Ob,Kb:Sy,ec:Pb,_:qy,ka:Ib,K:ew,Pc:Bb,Ae:Py,Pa:mw,H:ab,wc:I0,mb:lb,te:Rb,xa:Gw,Fa:hb,D:fy,Kc:Gb,Mc:Nb,Tc:xb,Uc:$b,fc:vb,se:Lb,sc:D0,Qa:Xy,ba:Nw,Ra:E0,sa:C0,bb:B0,tc:z0,Sc:Sb,rc:M0,Xb:Ow,Z:my,O:cy,G:bb,sb:U0,Wd:O0,Da:mb,P:Cw,Lc:Wb,Rc:Tb,Q:Hy,d:Jg,Ua:ow,k:ty,Yc:Ky,Xa:eb,ra:ob,Fb:Hb,g:Yg,Zc:jy,aa:sb,ua:aw,vb:e0,hb:qb,e:ny,Yd:x0,$d:_0,l:oy,Hc:iw,n:ry,Zd:$0,Jc:jb,ae:w0,Gc:sw,ge:r0,p:iy,Na:ww,Cb:bw,Ma:_w,Eb:Kb,Tb:Yw,F:xy,L:ly,I:ky,Sa:S0,_d:v0,Ec:jw,Db:nw,ca:vy,ia:uy,va:p0,gb:cw,Ta:m0,qe:Zb,Ia:$y,Ba:pb,xc:h0,yc:f0,Za:l0,tb:c0,Ja:t0,me:uw,wa:Fw,be:g0,je:Uw,le:gw,Wb:zw,Ka:Hw,T:ay,eb:qw,Fc:Bw,yb:Dw,ta:Vw,fb:hw,Vc:_b,Ib:Uy,ib:Vb,ub:a0,ea:hy,pa:Qy,$c:My,Gb:ub,ga:Zy,cc:Qb,dd:wy,Qb:b0,zc:d0,hc:rb,Wc:tb,Xc:Yy,Wa:Ab,vc:A0,dc:Fb,fe:i0,ee:s0,C:Cy,B:gy,ic:Gy,Ha:Ry,ze:Jy,Hb:Ny,pe:Yb,S:Ay,db:Xw,Aa:Rw,Cc:Qw,Be:by,de:u0,x:yy,R:Vy,ha:Ey,ie:Lw,Zb:Tw,Ac:o0,pb:By,Yb:Iw,ob:Fy,Vb:Mw,we:wb,Sb:n0,$b:fw,nb,ad:Iy,bc:Jb,uc:P0,la:Aw,Ic:Xb,J:rw,lb:yb,ye:cb,za:Ew,M:kw,Ab:xw,La:$w,Oa:yw,zb:Sw,Bb:vw,u:Fg,a:Tt,Sd:wr}}}async function Te(){function n(a,f){var h=_t=a.exports;a={};for(let[b,_]of Object.entries(h))typeof _=="function"?(h=ig(_),a[b]=h):a[b]=_;return _t=a,_t=function(){var b=_t,_=A=>O=>A(O)>>>0,x=A=>()=>A()>>>0;return(b=Object.assign({},b)).De=_(b.De),b.ff=x(b.ff),b.hf=_(b.hf),b.wf=_(b.wf),b.xf=x(b.xf),b.Bf=_(b.Bf),b}(),Qo.push(_t.jf),Hi=(a=_t).De,Fi=a.Ee,e._OrtInit=a.Fe,e._OrtGetLastError=a.Ge,e._OrtCreateSessionOptions=a.He,e._OrtAppendExecutionProvider=a.Ie,e._OrtAddFreeDimensionOverride=a.Je,e._OrtAddSessionConfigEntry=a.Ke,e._OrtReleaseSessionOptions=a.Le,e._OrtCreateSession=a.Me,e._OrtReleaseSession=a.Ne,e._OrtGetInputOutputCount=a.Oe,e._OrtGetInputOutputMetadata=a.Pe,e._OrtFree=a.Qe,e._OrtCreateTensor=a.Re,e._OrtGetTensorData=a.Se,e._OrtReleaseTensor=a.Te,e._OrtCreateRunOptions=a.Ue,e._OrtAddRunConfigEntry=a.Ve,e._OrtReleaseRunOptions=a.We,e._OrtCreateBinding=a.Xe,e._OrtBindInput=a.Ye,e._OrtBindOutput=a.Ze,e._OrtClearBoundOutputs=a._e,e._OrtReleaseBinding=a.$e,e._OrtRunWithBinding=a.af,e._OrtRun=a.bf,e._OrtEndProfiling=a.cf,e._JsepOutput=a.df,e._JsepGetNodeName=a.ef,Pr=a.ff,ct=e._free=a.gf,or=e._malloc=a.hf,Hn=a.lf,qi=a.mf,ji=a.nf,Ki=a.of,Fn=a.pf,Zi=a.qf,Qi=a.rf,B=a.sf,ir=a.tf,Yi=a.uf,z=a.vf,qn=a.wf,D=a.xf,Xi=a.yf,jn=a.zf,Ji=a.Af,ea=a.Bf,ta=a.Cf,Kn=a.Df,ra=a.Ef,na=a.Ff,oa=a.Gf,ia=a.Hf,aa=a.If,sa=a.Jf,ua=a.Kf,da=a.Lf,ca=a.Mf,la=a.Nf,pa=a.Of,fa=a.Pf,ma=a.Qf,ha=a.Rf,ga=a.Sf,ya=a.Tf,ba=a.Uf,wa=a.Vf,_a=a.Wf,va=a.Xf,$a=a.Yf,xa=a.Zf,Sa=a._f,Ta=a.$f,Ia=a.ag,Ca=a.bg,Aa=a.cg,ka=a.dg,Ea=a.eg,Pa=a.fg,Oa=a.gg,za=a.hg,Da=a.ig,Ba=a.jg,Ma=a.kg,Ra=a.lg,Ua=a.mg,Na=a.ng,Va=a.og,La=a.pg,Wa=a.qg,Ga=a.rg,Ha=a.sg,Fa=a.tg,qa=a.ug,ja=a.vg,Ka=a.wg,Za=a.xg,Qa=a.yg,Ya=a.zg,Xa=a.Ag,Ja=a.Bg,es=a.Cg,ts=a.Dg,rs=a.Eg,ns=a.Fg,os=a.Gg,is=a.Hg,as=a.Ig,ss=a.Jg,us=a.Kg,ds=a.Lg,cs=a.Mg,ls=a.Ng,ps=a.Og,fs=a.Pg,ms=a.Qg,hs=a.Rg,gs=a.Sg,ys=a.Tg,bs=a.Ug,ws=a.Vg,_s=a.Wg,vs=a.Xg,$s=a.Yg,xs=a.Zg,Ss=a._g,Ts=a.$g,Is=a.ah,Cs=a.bh,As=a.ch,ks=a.dh,Es=a.eh,Ps=a.fh,Os=a.gh,zs=a.hh,Ds=a.ih,Bs=a.jh,Ms=a.kh,Rs=a.lh,Us=a.mh,Ns=a.nh,Vs=a.oh,Ls=a.ph,Ws=a.qh,Gs=a.rh,Hs=a.sh,Fs=a.th,qs=a.uh,js=a.vh,Ks=a.wh,Zs=a.xh,Qs=a.yh,Ys=a.zh,Xs=a.Ah,Js=a.Bh,eu=a.Ch,tu=a.Dh,ru=a.Eh,nu=a.Fh,ou=a.Gh,iu=a.Hh,au=a.Ih,su=a.Jh,uu=a.Kh,du=a.Lh,cu=a.Mh,lu=a.Nh,pu=a.Ph,fu=a.Qh,mu=a.Rh,hu=a.Sh,gu=a.Th,yu=a.Uh,bu=a.Vh,wu=a.Wh,_u=a.Xh,vu=a.Yh,$u=a.Zh,xu=a._h,Su=a.$h,Tu=a.ai,Iu=a.bi,Cu=a.ci,Au=a.di,ku=a.ei,Eu=a.fi,Pu=a.gi,Ou=a.hi,zu=a.ii,Du=a.ji,Bu=a.ki,Mu=a.li,Ru=a.mi,Uu=a.ni,Nu=a.oi,Vu=a.pi,Lu=a.qi,Wu=a.ri,Gu=a.si,Hu=a.ti,Fu=a.wi,qu=a.xi,ju=a.zi,Ku=a.Ai,Zu=a.Bi,Qu=a.Ci,Yu=a.Di,Xu=a.Ei,Ju=a.Fi,ed=a.Gi,td=a.Hi,rd=a.Ii,nd=a.Ji,od=a.Ki,id=a.Li,ad=a.Mi,sd=a.Ni,ud=a.Oi,dd=a.Pi,cd=a.Qi,ld=a.Ri,pd=a.Si,fd=a.Ti,md=a.Ui,hd=a.Vi,gd=a.Wi,yd=a.Xi,bd=a.Yi,wd=a.Zi,_d=a._i,vd=a.$i,$d=a.aj,xd=a.bj,Sd=a.cj,Td=a.dj,Id=a.ej,Cd=a.fj,Ad=a.gj,kd=a.hj,Ed=a.ij,Pd=a.jj,Od=a.kj,zd=a.lj,Dd=a.mj,Bd=a.nj,Md=a.oj,Rd=a.rj,Ud=a.sj,Nd=a.tj,Vd=a.uj,Ld=a.wj,Wd=a.xj,Gd=a.yj,Hd=a.Aj,Fd=a.Bj,qd=a.Ej,jd=a.Fj,Kd=a.Gj,Zd=a.Hj,$=f,_t}var s,c=J();return e.instantiateWasm?new Promise(a=>{e.instantiateWasm(c,(f,h)=>{a(n(f,h))})}):i?n(new WebAssembly.Instance($,J()),$):(ye??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",y):y+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,s=await async function(a){var f=ye;if(!w&&!W(f))try{var h=fetch(f,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(h,a)}catch(b){M(`wasm streaming compile failed: ${b}`),M("falling back to ArrayBuffer instantiation")}return async function(b,_){try{var x=await async function(A){if(!w)try{var O=await l(A);return new Uint8Array(O)}catch{}if(A==ye&&w)A=new Uint8Array(w);else{if(!p)throw"both async and sync fetching of the wasm failed";A=p(A)}return A}(b);return await WebAssembly.instantiate(x,_)}catch(A){M(`failed to asynchronously prepare wasm: ${A}`),q(A)}}(f,a)}(c),n(s.instance,s.module))}class Ue{name="ExitStatus";constructor(s){this.message=`Program terminated with exit(${s})`,this.status=s}}var Ee=n=>{n.terminate(),n.onmessage=()=>{}},Ve=[],xe=0,Oe=null,tt=n=>{St.length==0&&(ei(),Jo(St[0]));var s=St.pop();if(!s)return 6;rr.push(s),Bt[n.ui]=s,s.ui=n.ui;var c={vi:"run",hk:n.gk,Ij:n.Ij,ui:n.ui};return s.postMessage(c,n.Oj),0},Ze=0,Pe=(n,s,...c)=>{var a,f=16*c.length,h=D(),b=qn(f),_=b>>>3;for(a of c)typeof a=="bigint"?((T(),ie)[_++>>>0]=1n,(T(),ie)[_++>>>0]=a):((T(),ie)[_++>>>0]=0n,(T(),se)[_++>>>0]=a);return n=ji(n,0,f,b,s),z(h),n};function wr(n){if(i)return Pe(0,1,n);if(v=n,!(0<Ze)){for(var s of rr)Ee(s);for(s of St)Ee(s);St=[],rr=[],Bt={},R=!0}m(0,new Ue(n))}function Zo(n){if(i)return Pe(1,0,n);En(n)}var En=n=>{if(v=n,i)throw Zo(n),"unwind";wr(n)},St=[],rr=[],Qo=[],Bt={},Yo=n=>{var s=n.ui;delete Bt[s],St.push(n),rr.splice(rr.indexOf(n),1),n.ui=0,Ki(s)};function Xo(){Qo.forEach(n=>n())}var Jo=n=>new Promise(s=>{n.onmessage=f=>{var h=f.data;if(f=h.vi,h.Dj&&h.Dj!=Pr()){var b=Bt[h.Dj];b?b.postMessage(h,h.Oj):M(`Internal error! Worker sent a message "${f}" to target pthread ${h.Dj}, but that thread no longer exists!`)}else f==="checkMailbox"?Tr():f==="spawnThread"?tt(h):f==="cleanupThread"?Sr(()=>{Yo(Bt[h.ik])}):f==="loaded"?(n.loaded=!0,s(n)):h.target==="setimmediate"?n.postMessage(h):f==="uncaughtException"?n.onerror(h.error):f==="callHandler"?e[h.Sj](...h.args):f&&M(`worker sent an unknown command ${f}`)},n.onerror=f=>{throw M(`worker sent an error! ${f.filename}:${f.lineno}: ${f.message}`),f};var c,a=[];for(c of[])e.propertyIsEnumerable(c)&&a.push(c);n.postMessage({vi:"load",Tj:a,jk:Tt,kk:$})});function ei(){var n=new Worker((()=>{let s=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new s("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});St.push(n)}var Tt,$h=(n,s)=>{Ze=0,n=Kn(n,s),0<Ze?v=n:Fn(n)},_r=[],vr=0;function xh(n){var s=new Pn(n>>>=0);return(T(),Z)[s.yi+12>>>0]==0&&(ti(s,!0),vr--),ri(s,!1),_r.push(s),ea(n)}var jt=0,Sh=()=>{B(0,0);var n=_r.pop();Xi(n.Jj),jt=0};function ti(n,s){s=s?1:0,(T(),Z)[n.yi+12>>>0]=s}function ri(n,s){s=s?1:0,(T(),Z)[n.yi+13>>>0]=s}class Pn{constructor(s){this.Jj=s,this.yi=s-24}}var $r=n=>{var s=jt;if(!s)return ir(0),0;var c=new Pn(s);(T(),Y)[c.yi+16>>>2>>>0]=s;var a=(T(),Y)[c.yi+4>>>2>>>0];if(!a)return ir(0),s;for(var f of n){if(f===0||f===a)break;if(Ji(f,a,c.yi+16))return ir(f),s}return ir(a),s};function Th(){return $r([])}function Ih(n){return $r([n>>>0])}function Ch(n,s){return $r([n>>>0,s>>>0])}function Ah(n,s,c,a){return $r([n>>>0,s>>>0,c>>>0,a>>>0])}var kh=()=>{var n=_r.pop();n||q("no exception to throw");var s=n.Jj;throw(T(),Z)[n.yi+13>>>0]==0&&(_r.push(n),ri(n,!0),ti(n,!1),vr++),jn(s),jt=s};function Eh(n,s,c){var a=new Pn(n>>>=0);throw s>>>=0,c>>>=0,(T(),Y)[a.yi+16>>>2>>>0]=0,(T(),Y)[a.yi+4>>>2>>>0]=s,(T(),Y)[a.yi+8>>>2>>>0]=c,jn(n),vr++,jt=n}var Ph=()=>vr;function ni(n,s,c,a){return i?Pe(2,1,n,s,c,a):oi(n,s,c,a)}function oi(n,s,c,a){if(n>>>=0,s>>>=0,c>>>=0,a>>>=0,!globalThis.SharedArrayBuffer)return 6;var f=[];return i&&f.length===0?ni(n,s,c,a):(n={gk:c,ui:n,Ij:a,Oj:f},i?(n.vi="spawnThread",postMessage(n,f),0):tt(n))}function Oh(n){throw jt||=n>>>0,jt}var ii=globalThis.TextDecoder&&new TextDecoder,ai=(n,s,c,a)=>{if(c=s+c,a)return c;for(;n[s]&&!(s>=c);)++s;return s},si=(n,s=0,c,a)=>{if(16<(c=ai(n,s>>>=0,c,a))-s&&n.buffer&&ii)return ii.decode(n.buffer instanceof ArrayBuffer?n.subarray(s,c):n.slice(s,c));for(a="";s<c;){var f=n[s++];if(128&f){var h=63&n[s++];if((224&f)==192)a+=String.fromCharCode((31&f)<<6|h);else{var b=63&n[s++];65536>(f=(240&f)==224?(15&f)<<12|h<<6|b:(7&f)<<18|h<<12|b<<6|63&n[s++])?a+=String.fromCharCode(f):(f-=65536,a+=String.fromCharCode(55296|f>>10,56320|1023&f))}}else a+=String.fromCharCode(f)}return a},Be=(n,s,c)=>(n>>>=0)?si((T(),oe),n,s,c):"";function ui(n,s,c){return i?Pe(3,1,n,s,c):0}function di(n,s){if(i)return Pe(4,1,n,s)}function ci(n,s){if(i)return Pe(5,1,n,s)}function li(n,s,c){if(i)return Pe(6,1,n,s,c)}function pi(n,s,c){return i?Pe(7,1,n,s,c):0}function fi(n,s){if(i)return Pe(8,1,n,s)}function mi(n,s,c){if(i)return Pe(9,1,n,s,c)}function hi(n,s,c,a){if(i)return Pe(10,1,n,s,c,a)}function gi(n,s,c,a){if(i)return Pe(11,1,n,s,c,a)}function yi(n,s,c,a){if(i)return Pe(12,1,n,s,c,a)}function bi(n){if(i)return Pe(13,1,n)}function wi(n,s){if(i)return Pe(14,1,n,s)}function _i(n,s,c){if(i)return Pe(15,1,n,s,c)}var zh=()=>q(""),ut=n=>{n>>>=0;for(var s="";;){var c=(T(),oe)[n++>>>0];if(!c)return s;s+=String.fromCharCode(c)}},On={},zn={},Dh={},Kt=class extends Error{constructor(n){super(n),this.name="BindingError"}};function wt(n,s,c={}){return function(a,f,h={}){var b=f.name;if(!a)throw new Kt(`type "${b}" must have a positive integer typeid pointer`);if(zn.hasOwnProperty(a)){if(h.Uj)return;throw new Kt(`Cannot register type '${b}' twice`)}zn[a]=f,delete Dh[a],On.hasOwnProperty(a)&&(f=On[a],delete On[a],f.forEach(_=>_()))}(n,s,c)}var vi=(n,s,c)=>{switch(s){case 1:return c?a=>(T(),Z)[a>>>0]:a=>(T(),oe)[a>>>0];case 2:return c?a=>(T(),te)[a>>>1>>>0]:a=>(T(),ue)[a>>>1>>>0];case 4:return c?a=>(T(),G)[a>>>2>>>0]:a=>(T(),Y)[a>>>2>>>0];case 8:return c?a=>(T(),ie)[a>>>3>>>0]:a=>(T(),pe)[a>>>3>>>0];default:throw new TypeError(`invalid integer width (${s}): ${n}`)}};function Bh(n,s,c,a,f){n>>>=0,c>>>=0,s=ut(s>>>0);let h=b=>b;if(a=a===0n){let b=8*c;h=_=>BigInt.asUintN(b,_),f=h(f)}wt(n,{name:s,Oh:h,qj:(b,_)=>(typeof _=="number"&&(_=BigInt(_)),_),pj:vi(s,c,!a),vj:null})}function Mh(n,s,c,a){wt(n>>>=0,{name:s=ut(s>>>0),Oh:function(f){return!!f},qj:function(f,h){return h?c:a},pj:function(f){return this.Oh((T(),oe)[f>>>0])},vj:null})}var $i=[],Mt=[0,1,,1,null,1,!0,1,!1,1];function Dn(n){9<(n>>>=0)&&--Mt[n+1]==0&&(Mt[n]=void 0,$i.push(n))}var Je=n=>{if(!n)throw new Kt(`Cannot use deleted val. handle = ${n}`);return Mt[n]},rt=n=>{switch(n){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let s=$i.pop()||Mt.length;return Mt[s]=n,Mt[s+1]=1,s}};function Bn(n){return this.Oh((T(),Y)[n>>>2>>>0])}var Rh={name:"emscripten::val",Oh:n=>{var s=Je(n);return Dn(n),s},qj:(n,s)=>rt(s),pj:Bn,vj:null};function Uh(n){return wt(n>>>0,Rh)}var Nh=(n,s)=>{switch(s){case 4:return function(c){return this.Oh((T(),ae)[c>>>2>>>0])};case 8:return function(c){return this.Oh((T(),se)[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${s}): ${n}`)}};function Vh(n,s,c){c>>>=0,wt(n>>>=0,{name:s=ut(s>>>0),Oh:a=>a,qj:(a,f)=>f,pj:Nh(s,c),vj:null})}function Lh(n,s,c,a,f){n>>>=0,c>>>=0,s=ut(s>>>0);let h=_=>_;if(a===0){var b=32-8*c;h=_=>_<<b>>>b,f=h(f)}wt(n,{name:s,Oh:h,qj:(_,x)=>x,pj:vi(s,c,a!==0),vj:null})}function Wh(n,s,c){function a(h){var b=(T(),Y)[h>>>2>>>0];return h=(T(),Y)[h+4>>>2>>>0],new f((T(),Z).buffer,h,b)}var f=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][s];wt(n>>>=0,{name:c=ut(c>>>0),Oh:a,pj:a},{Uj:!0})}var It=(n,s,c)=>{var a=(T(),oe);if(s>>>=0,0<c){var f=s;c=s+c-1;for(var h=0;h<n.length;++h){var b=n.codePointAt(h);if(127>=b){if(s>=c)break;a[s++>>>0]=b}else if(2047>=b){if(s+1>=c)break;a[s++>>>0]=192|b>>6,a[s++>>>0]=128|63&b}else if(65535>=b){if(s+2>=c)break;a[s++>>>0]=224|b>>12,a[s++>>>0]=128|b>>6&63,a[s++>>>0]=128|63&b}else{if(s+3>=c)break;a[s++>>>0]=240|b>>18,a[s++>>>0]=128|b>>12&63,a[s++>>>0]=128|b>>6&63,a[s++>>>0]=128|63&b,h++}}a[s>>>0]=0,n=s-f}else n=0;return n},xr=n=>{for(var s=0,c=0;c<n.length;++c){var a=n.charCodeAt(c);127>=a?s++:2047>=a?s+=2:55296<=a&&57343>=a?(s+=4,++c):s+=3}return s};function Gh(n,s){wt(n>>>=0,{name:s=ut(s>>>0),Oh(c){var a=(T(),Y)[c>>>2>>>0];return a=Be(c+4,a,!0),ct(c),a},qj(c,a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));var f=typeof a=="string";if(!(f||ArrayBuffer.isView(a)&&a.BYTES_PER_ELEMENT==1))throw new Kt("Cannot pass non-string to std::string");var h=f?xr(a):a.length,b=or(4+h+1),_=b+4;return(T(),Y)[b>>>2>>>0]=h,f?It(a,_,h+1):(T(),oe).set(a,_>>>0),c!==null&&c.push(ct,b),b},pj:Bn,vj(c){ct(c)}})}var xi=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Hh=(n,s,c)=>{if(n>>>=1,16<(s=ai((T(),ue),n,s/2,c))-n&&xi)return xi.decode((T(),ue).slice(n,s));for(c="";n<s;++n){var a=(T(),ue)[n>>>0];c+=String.fromCharCode(a)}return c},Fh=(n,s,c)=>{if(c??=2147483647,2>c)return 0;var a=s;c=(c-=2)<2*n.length?c/2:n.length;for(var f=0;f<c;++f){var h=n.charCodeAt(f);(T(),te)[s>>>1>>>0]=h,s+=2}return(T(),te)[s>>>1>>>0]=0,s-a},qh=n=>2*n.length,jh=(n,s,c)=>{var a="";n>>>=2;for(var f=0;!(f>=s/4);f++){var h=(T(),Y)[n+f>>>0];if(!h&&!c)break;a+=String.fromCodePoint(h)}return a},Kh=(n,s,c)=>{if(s>>>=0,c??=2147483647,4>c)return 0;var a=s;c=a+c-4;for(var f=0;f<n.length;++f){var h=n.codePointAt(f);if(65535<h&&f++,(T(),G)[s>>>2>>>0]=h,(s+=4)+4>c)break}return(T(),G)[s>>>2>>>0]=0,s-a},Zh=n=>{for(var s=0,c=0;c<n.length;++c)65535<n.codePointAt(c)&&c++,s+=4;return s};function Qh(n,s,c){if(n>>>=0,s>>>=0,c=ut(c>>>=0),s===2)var a=Hh,f=Fh,h=qh;else a=jh,f=Kh,h=Zh;wt(n,{name:c,Oh:b=>{var _=(T(),Y)[b>>>2>>>0];return _=a(b+4,_*s,!0),ct(b),_},qj:(b,_)=>{if(typeof _!="string")throw new Kt(`Cannot pass non-string to C++ string type ${c}`);var x=h(_),A=or(4+x+s);return(T(),Y)[A>>>2>>>0]=x/s,f(_,A+4,x+s),b!==null&&b.push(ct,A),A},pj:Bn,vj(b){ct(b)}})}function Yh(n,s){wt(n>>>=0,{Vj:!0,name:s=ut(s>>>0),Oh:()=>{},qj:()=>{}})}function Xh(n){Hn(n>>>0,!o,1,!r,131072,!1),Xo()}var Sr=n=>{if(!R)try{if(n(),!(0<Ze))try{i?Pr()&&Fn(v):En(v)}catch(s){s instanceof Ue||s=="unwind"||m(0,s)}}catch(s){s instanceof Ue||s=="unwind"||m(0,s)}},Jh=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Mn(n){n>>>=0,Jh||(Atomics.waitAsync((T(),G),n>>>2,n).value.then(Tr),n+=128,Atomics.store((T(),G),n>>>2,1))}var Tr=()=>Sr(()=>{var n=Pr();n&&(Mn(n),Qi())});function eg(n,s){(n>>>=0)==s>>>0?setTimeout(Tr):i?postMessage({Dj:n,vi:"checkMailbox"}):(n=Bt[n])&&n.postMessage({vi:"checkMailbox"})}var Rn=[];function tg(n,s,c,a,f){for(s>>>=0,f>>>=0,Rn.length=0,c=f>>>3,a=f+a>>>3;c<a;){var h;h=(T(),ie)[c++>>>0]?(T(),ie)[c++>>>0]:(T(),se)[c++>>>0],Rn.push(h)}return(s?Zn[s]:qg[n])(...Rn)}var rg=()=>{Ze=0};function ng(n){n>>>=0,i?postMessage({vi:"cleanupThread",ik:n}):Yo(Bt[n])}function og(n){}var Ir=n=>{try{n()}catch(s){q(s)}};function ig(n){var s=(...c)=>{Cr.push(n);try{return n(...c)}finally{R||(Cr.pop(),dt&&Ct===1&&Cr.length===0&&(Ct=0,Ze+=1,Ir(jd),typeof Fibers<"u"&&Fibers.sk()))}};return Ii.set(n,s),s}var Ct=0,dt=null,Si=0,Cr=[],Un=new Map,Ti=new Map,Ii=new Map,ag=0,Nn=null,sg=[],Ci=n=>function(s){if(!R){if(Ct===0){var c=!1,a=!1;s((f=0)=>{if(!R&&(Si=f,c=!0,a)){Ct=2,Ir(()=>Kd(dt)),typeof MainLoop<"u"&&MainLoop.Rj&&MainLoop.resume(),f=!1;try{var h=function(){var x=(T(),G)[dt+8>>>2>>>0];return x=Ti.get(x),x=Ii.get(x),--Ze,x()}()}catch(x){h=x,f=!0}var b=!1;if(!dt){var _=Nn;_&&(Nn=null,(f?_.reject:_.resolve)(h),b=!0)}if(f&&!b)throw h}}),a=!0,c||(Ct=1,dt=function(){var f=or(65548),h=f+12;if((T(),Y)[f>>>2>>>0]=h,(T(),Y)[f+4>>>2>>>0]=h+65536,h=Cr[0],!Un.has(h)){var b=ag++;Un.set(h,b),Ti.set(b,h)}return h=Un.get(h),(T(),G)[f+8>>>2>>>0]=h,f}(),typeof MainLoop<"u"&&MainLoop.Rj&&MainLoop.pause(),Ir(()=>qd(dt)))}else Ct===2?(Ct=0,Ir(Zd),ct(dt),dt=null,sg.forEach(Sr)):q(`invalid state: ${Ct}`);return Si}}(s=>{n().then(s)});function ug(n){return n>>>=0,Ci(async()=>{var s=await Je(n);return rt(s)})}var Vn=[],dg=n=>{var s=Vn.length;return Vn.push(n),s},cg=(n,s)=>{for(var c=Array(n),a=0;a<n;++a){var f=a,h=(T(),Y)[s+4*a>>>2>>>0],b=zn[h];if(b===void 0)throw n=`parameter ${a}`,h=Hi(h),s=ut(h),ct(h),new Kt(`${n} has unknown type ${s}`);c[f]=b}return c},lg=(n,s,c)=>{var a=[];return n=n(a,c),a.length&&((T(),Y)[s>>>2>>>0]=rt(a)),n},pg={},Ar=n=>{var s=pg[n];return s===void 0?ut(n):s};function fg(n,s,c){var[a,...f]=cg(n,s>>>0);s=a.qj.bind(a);var h=f.map(x=>x.pj.bind(x));n--;var b={toValue:Je};switch(n=h.map((x,A)=>{var O=`argFromPtr${A}`;return b[O]=x,`${O}(args${A?"+"+8*A:""})`}),c){case 0:var _="toValue(handle)";break;case 2:_="new (toValue(handle))";break;case 3:_="";break;case 1:b.getStringOrSymbol=Ar,_="toValue(handle)[getStringOrSymbol(methodName)]"}return _+=`(${n})`,a.Vj||(b.toReturnWire=s,b.emval_returnValue=lg,_=`return emval_returnValue(toReturnWire, destructorsRef, ${_})`),_=`return function (handle, methodName, destructorsRef, args) {
  ${_}
  }`,c=new Function(Object.keys(b),_)(...Object.values(b)),_=`methodCaller<(${f.map(x=>x.name)}) => ${a.name}>`,dg(Object.defineProperty(c,"name",{value:_}))}function mg(n,s){return s>>>=0,(n=Je(n>>>0))==Je(s)}function hg(n){return(n>>>=0)?(n=Ar(n),rt(globalThis[n])):rt(globalThis)}function gg(n){return n=Ar(n>>>0),rt(e[n])}function yg(n,s){return s>>>=0,n=Je(n>>>0),s=Je(s),rt(n[s])}function bg(n){9<(n>>>=0)&&(Mt[n+1]+=1)}function Ai(n,s,c,a,f){return Vn[n>>>0](s>>>0,c>>>0,a>>>0,f>>>0)}function wg(n,s,c,a,f){return Ai(n>>>0,s>>>0,c>>>0,a>>>0,f>>>0)}function _g(){return rt([])}function vg(n){n=Je(n>>>0);for(var s=Array(n.length),c=0;c<n.length;c++)s[c]=n[c];return rt(s)}function $g(n){return rt(Ar(n>>>0))}function xg(){return rt({})}function Sg(n){for(var s=Je(n>>>=0);s.length;){var c=s.pop();s.pop()(c)}Dn(n)}function Tg(n,s,c){s>>>=0,c>>>=0,n=Je(n>>>0),s=Je(s),c=Je(c),n[s]=c}function Ig(n,s){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),s>>>=0,n=new Date(1e3*n),(T(),G)[s>>>2>>>0]=n.getUTCSeconds(),(T(),G)[s+4>>>2>>>0]=n.getUTCMinutes(),(T(),G)[s+8>>>2>>>0]=n.getUTCHours(),(T(),G)[s+12>>>2>>>0]=n.getUTCDate(),(T(),G)[s+16>>>2>>>0]=n.getUTCMonth(),(T(),G)[s+20>>>2>>>0]=n.getUTCFullYear()-1900,(T(),G)[s+24>>>2>>>0]=n.getUTCDay(),n=(n.getTime()-Date.UTC(n.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(T(),G)[s+28>>>2>>>0]=n}var ki=n=>n%4==0&&(n%100!=0||n%400==0),Ei=[0,31,60,91,121,152,182,213,244,274,305,335],Pi=[0,31,59,90,120,151,181,212,243,273,304,334];function Cg(n,s){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),s>>>=0,n=new Date(1e3*n),(T(),G)[s>>>2>>>0]=n.getSeconds(),(T(),G)[s+4>>>2>>>0]=n.getMinutes(),(T(),G)[s+8>>>2>>>0]=n.getHours(),(T(),G)[s+12>>>2>>>0]=n.getDate(),(T(),G)[s+16>>>2>>>0]=n.getMonth(),(T(),G)[s+20>>>2>>>0]=n.getFullYear()-1900,(T(),G)[s+24>>>2>>>0]=n.getDay();var c=(ki(n.getFullYear())?Ei:Pi)[n.getMonth()]+n.getDate()-1|0;(T(),G)[s+28>>>2>>>0]=c,(T(),G)[s+36>>>2>>>0]=-60*n.getTimezoneOffset(),c=new Date(n.getFullYear(),6,1).getTimezoneOffset();var a=new Date(n.getFullYear(),0,1).getTimezoneOffset();n=0|(c!=a&&n.getTimezoneOffset()==Math.min(a,c)),(T(),G)[s+32>>>2>>>0]=n}function Ag(n){n>>>=0;var s=new Date((T(),G)[n+20>>>2>>>0]+1900,(T(),G)[n+16>>>2>>>0],(T(),G)[n+12>>>2>>>0],(T(),G)[n+8>>>2>>>0],(T(),G)[n+4>>>2>>>0],(T(),G)[n>>>2>>>0],0),c=(T(),G)[n+32>>>2>>>0],a=s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset(),h=new Date(s.getFullYear(),0,1).getTimezoneOffset(),b=Math.min(h,f);return 0>c?(T(),G)[n+32>>>2>>>0]=+(f!=h&&b==a):0<c!=(b==a)&&(f=Math.max(h,f),s.setTime(s.getTime()+6e4*((0<c?b:f)-a))),(T(),G)[n+24>>>2>>>0]=s.getDay(),c=(ki(s.getFullYear())?Ei:Pi)[s.getMonth()]+s.getDate()-1|0,(T(),G)[n+28>>>2>>>0]=c,(T(),G)[n>>>2>>>0]=s.getSeconds(),(T(),G)[n+4>>>2>>>0]=s.getMinutes(),(T(),G)[n+8>>>2>>>0]=s.getHours(),(T(),G)[n+12>>>2>>>0]=s.getDate(),(T(),G)[n+16>>>2>>>0]=s.getMonth(),(T(),G)[n+20>>>2>>>0]=s.getYear(),n=s.getTime(),BigInt(isNaN(n)?-1:n/1e3)}function Oi(n,s,c,a,f,h,b){return i?Pe(16,1,n,s,c,a,f,h,b):-52}function zi(n,s,c,a,f,h){if(i)return Pe(17,1,n,s,c,a,f,h)}var nr={},kg=()=>performance.timeOrigin+performance.now();function Di(n,s){if(i)return Pe(18,1,n,s);if(nr[n]&&(clearTimeout(nr[n].id),delete nr[n]),!s)return 0;var c=setTimeout(()=>{delete nr[n],Sr(()=>Zi(n,performance.timeOrigin+performance.now()))},s);return nr[n]={id:c,rk:s},0}function Eg(n,s,c,a){n>>>=0,s>>>=0,c>>>=0,a>>>=0;var f=new Date().getFullYear(),h=new Date(f,0,1).getTimezoneOffset();f=new Date(f,6,1).getTimezoneOffset();var b=Math.max(h,f);(T(),Y)[n>>>2>>>0]=60*b,(T(),G)[s>>>2>>>0]=+(h!=f),n=(s=_=>{var x=Math.abs(_);return`UTC${0<=_?"-":"+"}${String(Math.floor(x/60)).padStart(2,"0")}${String(x%60).padStart(2,"0")}`})(h),s=s(f),f<h?(It(n,c,17),It(s,a,17)):(It(n,a,17),It(s,c,17))}var Pg=()=>Date.now(),Og=1;function zg(n,s,c){if(c>>>=0,!(0<=n&&3>=n))return 28;if(n===0)n=Date.now();else{if(!Og)return 52;n=performance.timeOrigin+performance.now()}return n=Math.round(1e6*n),(T(),ie)[c>>>3>>>0]=BigInt(n),0}var Ln=[],Bi=(n,s)=>{Ln.length=0;for(var c;c=(T(),oe)[n++>>>0];){var a=c!=105;s+=(a&=c!=112)&&s%8?4:0,Ln.push(c==112?(T(),Y)[s>>>2>>>0]:c==106?(T(),ie)[s>>>3>>>0]:c==105?(T(),G)[s>>>2>>>0]:(T(),se)[s>>>3>>>0]),s+=a?8:4}return Ln};function Dg(n,s,c){return n>>>=0,s=Bi(s>>>0,c>>>0),Zn[n](...s)}function Bg(n,s,c){return n>>>=0,s=Bi(s>>>0,c>>>0),Zn[n](...s)}var Mg=()=>{};function Rg(n,s){return M(Be(n>>>0,s>>>0))}var Ug=()=>{throw Ze+=1,"unwind"};function Ng(){return 4294901760}var Vg=()=>navigator.hardwareConcurrency,Rt={},kr=n=>{var s;return(s=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(n))?+s[1]:(s=/:(\d+):\d+(?:\)|$)/.exec(n))?2147483648|+s[1]:0},Mi=n=>{for(var s of n)(n=kr(s))&&(Rt[n]=s)};function Lg(){var n=Error().stack.toString().split(`
`);return n[0]=="Error"&&n.shift(),Mi(n),Rt.Mj=kr(n[3]),Rt.ek=n,Rt.Mj}function Er(n){if(!(n=Rt[n>>>0]))return 0;var s;if(s=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(n))n=s[1];else if(s=/^\s+at (.*) \(.*\)$/.exec(n))n=s[1];else{if(!(s=/^(.+?)@/.exec(n)))return 0;n=s[1]}ct(Er.Nj??0),s=xr(n)+1;var c=or(s);return c&&It(n,c,s),Er.Nj=c,Er.Nj}function Wg(n){n>>>=0;var s=(T(),oe).length;if(n<=s||4294901760<n)return!1;for(var c=1;4>=c;c*=2){var a=s*(1+.2/c);a=Math.min(a,n+100663296);e:{a=(Math.min(4294901760,65536*Math.ceil(Math.max(n,a)/65536))-Tt.buffer.byteLength+65535)/65536|0;try{Tt.grow(a),Fe();var f=1;break e}catch{}f=void 0}if(f)return!0}return!1}function Gg(n,s,c){if(n>>>=0,s>>>=0,Rt.Mj==n)var a=Rt.ek;else(a=Error().stack.toString().split(`
`))[0]=="Error"&&a.shift(),Mi(a);for(var f=3;a[f]&&kr(a[f])!=n;)++f;for(n=0;n<c&&a[n+f];++n)(T(),G)[s+4*n>>>2>>>0]=kr(a[n+f]);return n}var Wn,Gn={},Ri=()=>{if(!Wn){var n,s={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(n in Gn)Gn[n]===void 0?delete s[n]:s[n]=Gn[n];var c=[];for(n in s)c.push(`${n}=${s[n]}`);Wn=c}return Wn};function Ui(n,s){if(i)return Pe(19,1,n,s);n>>>=0,s>>>=0;var c,a=0,f=0;for(c of Ri()){var h=s+a;(T(),Y)[n+f>>>2>>>0]=h,a+=It(c,h,1/0)+1,f+=4}return 0}function Ni(n,s){if(i)return Pe(20,1,n,s);n>>>=0,s>>>=0;var c=Ri();for(var a of((T(),Y)[n>>>2>>>0]=c.length,n=0,c))n+=xr(a)+1;return(T(),Y)[s>>>2>>>0]=n,0}function Vi(n){return i?Pe(21,1,n):52}function Li(n,s,c,a){return i?Pe(22,1,n,s,c,a):52}function Wi(n,s,c,a){return i?Pe(23,1,n,s,c,a):70}var Hg=[null,[],[]];function Gi(n,s,c,a){if(i)return Pe(24,1,n,s,c,a);s>>>=0,c>>>=0,a>>>=0;for(var f=0,h=0;h<c;h++){var b=(T(),Y)[s>>>2>>>0],_=(T(),Y)[s+4>>>2>>>0];s+=8;for(var x=0;x<_;x++){var A=n,O=(T(),oe)[b+x>>>0],U=Hg[A];O===0||O===10?((A===1?P:M)(si(U)),U.length=0):U.push(O)}f+=_}return(T(),Y)[a>>>2>>>0]=f,0}function Fg(n){return n>>>0}i||function(){for(var n=e.numThreads-1;n--;)ei();Ve.push(async()=>{var s=async function(){if(!i)return Promise.all(St.map(Jo))}();xe++,await s,--xe==0&&Oe&&(s=Oe,Oe=null,s())})}(),i||(Tt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Fe()),e.wasmBinary&&(w=e.wasmBinary),e.stackSave=()=>D(),e.stackRestore=n=>z(n),e.stackAlloc=n=>qn(n),e.setValue=function(n,s,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":(T(),Z)[n>>>0]=s;break;case"i16":(T(),te)[n>>>1>>>0]=s;break;case"i32":(T(),G)[n>>>2>>>0]=s;break;case"i64":(T(),ie)[n>>>3>>>0]=BigInt(s);break;case"float":(T(),ae)[n>>>2>>>0]=s;break;case"double":(T(),se)[n>>>3>>>0]=s;break;case"*":(T(),Y)[n>>>2>>>0]=s;break;default:q(`invalid type for setValue: ${c}`)}},e.getValue=function(n,s="i8"){switch(s.endsWith("*")&&(s="*"),s){case"i1":case"i8":return(T(),Z)[n>>>0];case"i16":return(T(),te)[n>>>1>>>0];case"i32":return(T(),G)[n>>>2>>>0];case"i64":return(T(),ie)[n>>>3>>>0];case"float":return(T(),ae)[n>>>2>>>0];case"double":return(T(),se)[n>>>3>>>0];case"*":return(T(),Y)[n>>>2>>>0];default:q(`invalid type for getValue: ${s}`)}},e.UTF8ToString=Be,e.stringToUTF8=It,e.lengthBytesUTF8=xr;var Hi,Fi,Pr,ct,or,Hn,qi,ji,Ki,Fn,Zi,Qi,B,ir,Yi,z,qn,D,Xi,jn,Ji,ea,ta,Kn,ra,na,oa,ia,aa,sa,ua,da,ca,la,pa,fa,ma,ha,ga,ya,ba,wa,_a,va,$a,xa,Sa,Ta,Ia,Ca,Aa,ka,Ea,Pa,Oa,za,Da,Ba,Ma,Ra,Ua,Na,Va,La,Wa,Ga,Ha,Fa,qa,ja,Ka,Za,Qa,Ya,Xa,Ja,es,ts,rs,ns,os,is,as,ss,us,ds,cs,ls,ps,fs,ms,hs,gs,ys,bs,ws,_s,vs,$s,xs,Ss,Ts,Is,Cs,As,ks,Es,Ps,Os,zs,Ds,Bs,Ms,Rs,Us,Ns,Vs,Ls,Ws,Gs,Hs,Fs,qs,js,Ks,Zs,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,du,cu,lu,pu,fu,mu,hu,gu,yu,bu,wu,_u,vu,$u,xu,Su,Tu,Iu,Cu,Au,ku,Eu,Pu,Ou,zu,Du,Bu,Mu,Ru,Uu,Nu,Vu,Lu,Wu,Gu,Hu,Fu,qu,ju,Ku,Zu,Qu,Yu,Xu,Ju,ed,td,rd,nd,od,id,ad,sd,ud,dd,cd,ld,pd,fd,md,hd,gd,yd,bd,wd,_d,vd,$d,xd,Sd,Td,Id,Cd,Ad,kd,Ed,Pd,Od,zd,Dd,Bd,Md,Rd,Ud,Nd,Vd,Ld,Wd,Gd,Hd,Fd,qd,jd,Kd,Zd,_t,qg=[wr,Zo,ni,ui,di,ci,li,pi,fi,mi,hi,gi,yi,bi,wi,_i,Oi,zi,Di,Ui,Ni,Vi,Li,Wi,Gi],Zn={1589140:(n,s,c,a,f)=>{if(e===void 0||!e.zj)return 1;if((n=Be(Number(n>>>0))).startsWith("./")&&(n=n.substring(2)),!(n=e.zj.get(n)))return 2;if(s=Number(s>>>0),c=Number(c>>>0),a=Number(a>>>0),s+c>n.byteLength)return 3;try{let h=n.subarray(s,s+c);switch(f){case 0:(T(),oe).set(h,a>>>0);break;case 1:e.lk?e.lk(a,h):e.dk(a,h);break;default:return 4}return 0}catch{return 4}},1589964:(n,s,c)=>{e.Qj(n,(T(),oe).subarray(s>>>0,s+c>>>0))},1590028:()=>e.nk(),1590070:n=>{e.Pj(n)},1590107:()=>{e.Xj()},1590138:()=>{e.Yj()},1590167:()=>{e.bk()},1590192:n=>e.Wj(n),1590225:n=>e.$j(n),1590257:(n,s,c)=>{e.Lj(Number(n),Number(s),Number(c),!0)},1590320:(n,s,c)=>{e.Lj(Number(n),Number(s),Number(c))},1590377:()=>typeof wasmOffsetConverter<"u",1590434:n=>{e.kf("Abs",n,void 0)},1590485:n=>{e.kf("Neg",n,void 0)},1590536:n=>{e.kf("Floor",n,void 0)},1590589:n=>{e.kf("Ceil",n,void 0)},1590641:n=>{e.kf("Reciprocal",n,void 0)},1590699:n=>{e.kf("Sqrt",n,void 0)},1590751:n=>{e.kf("Exp",n,void 0)},1590802:n=>{e.kf("Erf",n,void 0)},1590853:n=>{e.kf("Sigmoid",n,void 0)},1590908:(n,s,c)=>{e.kf("HardSigmoid",n,{alpha:s,beta:c})},1590987:n=>{e.kf("Log",n,void 0)},1591038:n=>{e.kf("Sin",n,void 0)},1591089:n=>{e.kf("Cos",n,void 0)},1591140:n=>{e.kf("Tan",n,void 0)},1591191:n=>{e.kf("Asin",n,void 0)},1591243:n=>{e.kf("Acos",n,void 0)},1591295:n=>{e.kf("Atan",n,void 0)},1591347:n=>{e.kf("Sinh",n,void 0)},1591399:n=>{e.kf("Cosh",n,void 0)},1591451:n=>{e.kf("Asinh",n,void 0)},1591504:n=>{e.kf("Acosh",n,void 0)},1591557:n=>{e.kf("Atanh",n,void 0)},1591610:n=>{e.kf("Tanh",n,void 0)},1591662:n=>{e.kf("Not",n,void 0)},1591713:(n,s,c)=>{e.kf("Clip",n,{min:s,max:c})},1591782:n=>{e.kf("Clip",n,void 0)},1591834:(n,s)=>{e.kf("Elu",n,{alpha:s})},1591892:n=>{e.kf("Gelu",n,void 0)},1591944:n=>{e.kf("Relu",n,void 0)},1591996:(n,s)=>{e.kf("LeakyRelu",n,{alpha:s})},1592060:(n,s)=>{e.kf("ThresholdedRelu",n,{alpha:s})},1592130:(n,s)=>{e.kf("Cast",n,{to:s})},1592188:n=>{e.kf("Add",n,void 0)},1592239:n=>{e.kf("Sub",n,void 0)},1592290:n=>{e.kf("Mul",n,void 0)},1592341:n=>{e.kf("Div",n,void 0)},1592392:n=>{e.kf("Pow",n,void 0)},1592443:n=>{e.kf("Equal",n,void 0)},1592496:n=>{e.kf("Greater",n,void 0)},1592551:n=>{e.kf("GreaterOrEqual",n,void 0)},1592613:n=>{e.kf("Less",n,void 0)},1592665:n=>{e.kf("LessOrEqual",n,void 0)},1592724:(n,s,c,a,f)=>{e.kf("ReduceMean",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1592899:(n,s,c,a,f)=>{e.kf("ReduceMax",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593073:(n,s,c,a,f)=>{e.kf("ReduceMin",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593247:(n,s,c,a,f)=>{e.kf("ReduceProd",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593422:(n,s,c,a,f)=>{e.kf("ReduceSum",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593596:(n,s,c,a,f)=>{e.kf("ReduceL1",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593769:(n,s,c,a,f)=>{e.kf("ReduceL2",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1593942:(n,s,c,a,f)=>{e.kf("ReduceLogSum",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1594119:(n,s,c,a,f)=>{e.kf("ReduceSumSquare",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1594299:(n,s,c,a,f)=>{e.kf("ReduceLogSumExp",n,{keepDims:!!s,noopWithEmptyAxes:!!c,axes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1594479:n=>{e.kf("Where",n,void 0)},1594532:(n,s,c)=>{e.kf("Transpose",n,{perm:s?Array.from((T(),G).subarray(Number(s)>>>0,Number(c)>>>0)):[]})},1594656:(n,s,c,a)=>{e.kf("DepthToSpace",n,{blocksize:s,mode:Be(c),format:a?"NHWC":"NCHW"})},1594789:(n,s,c,a)=>{e.kf("DepthToSpace",n,{blocksize:s,mode:Be(c),format:a?"NHWC":"NCHW"})},1594922:(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)=>{e.kf("ConvTranspose",n,{format:x?"NHWC":"NCHW",autoPad:s,dilations:[c],group:a,kernelShape:[f],pads:[h,b],strides:[_],wIsConst:()=>!!(T(),Z)[A>>>0],outputPadding:O?Array.from((T(),G).subarray(Number(O)>>>0,Number(U)>>>0)):[],outputShape:V?Array.from((T(),G).subarray(Number(V)>>>0,Number(H)>>>0)):[],activation:Be(F)})},1595355:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("ConvTranspose",n,{format:_?"NHWC":"NCHW",autoPad:s,dilations:Array.from((T(),G).subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:a,kernelShape:Array.from((T(),G).subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from((T(),G).subarray(Number(h)>>>0,4+(Number(h)>>>0)>>>0)),strides:Array.from((T(),G).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),wIsConst:()=>!!(T(),Z)[x>>>0],outputPadding:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],outputShape:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[],activation:Be(H)})},1596016:(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)=>{e.kf("ConvTranspose",n,{format:x?"NHWC":"NCHW",autoPad:s,dilations:[c],group:a,kernelShape:[f],pads:[h,b],strides:[_],wIsConst:()=>!!(T(),Z)[A>>>0],outputPadding:O?Array.from((T(),G).subarray(Number(O)>>>0,Number(U)>>>0)):[],outputShape:V?Array.from((T(),G).subarray(Number(V)>>>0,Number(H)>>>0)):[],activation:Be(F)})},1596449:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("ConvTranspose",n,{format:_?"NHWC":"NCHW",autoPad:s,dilations:Array.from((T(),G).subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:a,kernelShape:Array.from((T(),G).subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from((T(),G).subarray(Number(h)>>>0,4+(Number(h)>>>0)>>>0)),strides:Array.from((T(),G).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),wIsConst:()=>!!(T(),Z)[x>>>0],outputPadding:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],outputShape:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[],activation:Be(H)})},1597110:(n,s)=>{e.kf("GlobalAveragePool",n,{format:s?"NHWC":"NCHW"})},1597201:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("AveragePool",n,{format:H?"NHWC":"NCHW",auto_pad:s,ceil_mode:c,count_include_pad:a,storage_order:f,dilations:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[],kernel_shape:_?Array.from((T(),G).subarray(Number(_)>>>0,Number(x)>>>0)):[],pads:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],strides:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[]})},1597680:(n,s)=>{e.kf("GlobalAveragePool",n,{format:s?"NHWC":"NCHW"})},1597771:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("AveragePool",n,{format:H?"NHWC":"NCHW",auto_pad:s,ceil_mode:c,count_include_pad:a,storage_order:f,dilations:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[],kernel_shape:_?Array.from((T(),G).subarray(Number(_)>>>0,Number(x)>>>0)):[],pads:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],strides:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[]})},1598250:(n,s)=>{e.kf("GlobalMaxPool",n,{format:s?"NHWC":"NCHW"})},1598337:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("MaxPool",n,{format:H?"NHWC":"NCHW",auto_pad:s,ceil_mode:c,count_include_pad:a,storage_order:f,dilations:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[],kernel_shape:_?Array.from((T(),G).subarray(Number(_)>>>0,Number(x)>>>0)):[],pads:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],strides:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[]})},1598812:(n,s)=>{e.kf("GlobalMaxPool",n,{format:s?"NHWC":"NCHW"})},1598899:(n,s,c,a,f,h,b,_,x,A,O,U,V,H)=>{e.kf("MaxPool",n,{format:H?"NHWC":"NCHW",auto_pad:s,ceil_mode:c,count_include_pad:a,storage_order:f,dilations:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[],kernel_shape:_?Array.from((T(),G).subarray(Number(_)>>>0,Number(x)>>>0)):[],pads:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],strides:U?Array.from((T(),G).subarray(Number(U)>>>0,Number(V)>>>0)):[]})},1599374:(n,s,c,a,f)=>{e.kf("Gemm",n,{alpha:s,beta:c,transA:a,transB:f})},1599478:n=>{e.kf("MatMul",n,void 0)},1599532:(n,s,c,a)=>{e.kf("ArgMax",n,{keepDims:!!s,selectLastIndex:!!c,axis:a})},1599640:(n,s,c,a)=>{e.kf("ArgMin",n,{keepDims:!!s,selectLastIndex:!!c,axis:a})},1599748:(n,s)=>{e.kf("Softmax",n,{axis:s})},1599811:(n,s)=>{e.kf("Concat",n,{axis:s})},1599871:(n,s,c,a,f)=>{e.kf("Split",n,{axis:s,numOutputs:c,splitSizes:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1600027:n=>{e.kf("Expand",n,void 0)},1600081:(n,s)=>{e.kf("Gather",n,{axis:Number(s)})},1600152:(n,s)=>{e.kf("GatherElements",n,{axis:Number(s)})},1600231:(n,s)=>{e.kf("GatherND",n,{batch_dims:Number(s)})},1600310:(n,s,c,a,f,h,b,_,x,A,O)=>{e.kf("Resize",n,{antialias:s,axes:c?Array.from((T(),G).subarray(Number(c)>>>0,Number(a)>>>0)):[],coordinateTransformMode:Be(f),cubicCoeffA:h,excludeOutside:b,extrapolationValue:_,keepAspectRatioPolicy:Be(x),mode:Be(A),nearestMode:Be(O)})},1600672:(n,s,c,a,f,h,b)=>{e.kf("Slice",n,{starts:s?Array.from((T(),G).subarray(Number(s)>>>0,Number(c)>>>0)):[],ends:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[],axes:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1600936:n=>{e.kf("Tile",n,void 0)},1600988:(n,s,c)=>{e.kf("InstanceNormalization",n,{epsilon:s,format:c?"NHWC":"NCHW"})},1601102:(n,s,c)=>{e.kf("InstanceNormalization",n,{epsilon:s,format:c?"NHWC":"NCHW"})},1601216:n=>{e.kf("Range",n,void 0)},1601269:(n,s)=>{e.kf("Einsum",n,{equation:Be(s)})},1601350:(n,s,c,a,f)=>{e.kf("Pad",n,{mode:s,value:c,pads:a?Array.from((T(),G).subarray(Number(a)>>>0,Number(f)>>>0)):[]})},1601493:(n,s,c,a,f,h)=>{e.kf("BatchNormalization",n,{epsilon:s,momentum:c,spatial:!!f,trainingMode:!!a,format:h?"NHWC":"NCHW"})},1601662:(n,s,c,a,f,h)=>{e.kf("BatchNormalization",n,{epsilon:s,momentum:c,spatial:!!f,trainingMode:!!a,format:h?"NHWC":"NCHW"})},1601831:(n,s,c)=>{e.kf("CumSum",n,{exclusive:Number(s),reverse:Number(c)})},1601928:(n,s,c)=>{e.kf("DequantizeLinear",n,{axis:s,blockSize:c})},1602018:(n,s,c,a,f)=>{e.kf("GridSample",n,{align_corners:s,mode:Be(c),padding_mode:Be(a),format:f?"NHWC":"NCHW"})},1602188:(n,s,c,a,f)=>{e.kf("GridSample",n,{align_corners:s,mode:Be(c),padding_mode:Be(a),format:f?"NHWC":"NCHW"})},1602358:(n,s)=>{e.kf("ScatterND",n,{reduction:Be(s)})},1602443:(n,s,c,a,f,h,b,_,x)=>{e.kf("Attention",n,{numHeads:s,isUnidirectional:c,maskFilterValue:a,scale:f,doRotary:h,qkvHiddenSizes:b?Array.from((T(),G).subarray(Number(_)>>>0,Number(_)+b>>>0)):[],pastPresentShareBuffer:!!x})},1602715:n=>{e.kf("BiasAdd",n,void 0)},1602770:n=>{e.kf("BiasSplitGelu",n,void 0)},1602831:n=>{e.kf("FastGelu",n,void 0)},1602887:(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)=>{e.kf("Conv",n,{format:U?"NHWC":"NCHW",auto_pad:s,dilations:c?Array.from((T(),G).subarray(Number(c)>>>0,Number(a)>>>0)):[],group:f,kernel_shape:h?Array.from((T(),G).subarray(Number(h)>>>0,Number(b)>>>0)):[],pads:_?Array.from((T(),G).subarray(Number(_)>>>0,Number(x)>>>0)):[],strides:A?Array.from((T(),G).subarray(Number(A)>>>0,Number(O)>>>0)):[],w_is_const:()=>!!(T(),Z)[Number(V)>>>0],activation:Be(H),activation_params:F?Array.from((T(),ae).subarray(Number(F)>>>0,Number(ee)>>>0)):[]})},1603471:n=>{e.kf("Gelu",n,void 0)},1603523:(n,s,c,a,f,h,b,_,x)=>{e.kf("GroupQueryAttention",n,{numHeads:s,kvNumHeads:c,scale:a,softcap:f,doRotary:h,rotaryInterleaved:b,smoothSoftmax:_,localWindowSize:x})},1603740:(n,s,c,a)=>{e.kf("LayerNormalization",n,{axis:s,epsilon:c,simplified:!!a})},1603851:(n,s,c,a)=>{e.kf("LayerNormalization",n,{axis:s,epsilon:c,simplified:!!a})},1603962:(n,s,c,a,f,h)=>{e.kf("MatMulNBits",n,{k:s,n:c,accuracyLevel:a,bits:f,blockSize:h})},1604089:(n,s,c,a,f,h)=>{e.kf("MultiHeadAttention",n,{numHeads:s,isUnidirectional:c,maskFilterValue:a,scale:f,doRotary:h})},1604248:(n,s)=>{e.kf("QuickGelu",n,{alpha:s})},1604312:(n,s,c,a,f)=>{e.kf("RotaryEmbedding",n,{interleaved:!!s,numHeads:c,rotaryEmbeddingDim:a,scale:f})},1604451:(n,s,c)=>{e.kf("SkipLayerNormalization",n,{epsilon:s,simplified:!!c})},1604553:(n,s,c)=>{e.kf("SkipLayerNormalization",n,{epsilon:s,simplified:!!c})},1604655:(n,s,c,a)=>{e.kf("GatherBlockQuantized",n,{gatherAxis:s,quantizeAxis:c,blockSize:a})},1604776:n=>{e.ak(n)},1604810:(n,s)=>e.ck(Number(n),Number(s),e.Cj.fk,e.Cj.errors)};function jg(n,s,c){return Ci(async()=>{await e.Zj(Number(n),Number(s),Number(c))})}function Kg(){return typeof wasmOffsetConverter<"u"}function Zg(n,s,c,a){var f=D();try{return oa(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Qg(n,s,c){var a=D();try{return ra(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Yg(n,s,c){var a=D();try{na(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Xg(n,s){var c=D();try{return Kn(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function Jg(n){var s=D();try{ta(n)}catch(c){if(z(s),c!==c+0)throw c;B(1,0)}}function ey(n,s,c,a,f,h,b){var _=D();try{return aa(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function ty(n,s){var c=D();try{ca(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function ry(n,s,c,a,f,h){var b=D();try{ua(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function ny(n,s,c,a){var f=D();try{sa(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function oy(n,s,c,a,f){var h=D();try{ia(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function iy(n,s,c,a,f,h,b){var _=D();try{pa(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function ay(n,s,c,a,f,h,b){var _=D();try{fa(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function sy(n,s,c,a,f){var h=D();try{return la(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function uy(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{ma(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function dy(n,s,c,a,f,h){var b=D();try{return ya(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function cy(n,s,c){var a=D();try{return xa(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;return B(1,0),0n}}function ly(n,s,c,a,f,h,b,_,x){var A=D();try{da(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function py(n){var s=D();try{return Sa(n)}catch(c){if(z(s),c!==c+0)throw c;B(1,0)}}function fy(n,s,c){var a=D();try{return _a(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function my(n,s){var c=D();try{return Ea(n,s)}catch(a){if(z(c),a!==a+0)throw a;return B(1,0),0n}}function hy(n,s,c,a,f){var h=D();try{Ta(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function gy(n,s,c,a,f){var h=D();try{ba(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function yy(n,s,c){var a=D();try{wa(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function by(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{Aa(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function wy(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{Pa(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function _y(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{return Oa(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function vy(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{za(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function $y(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee){var ne=D();try{Da(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)}catch(de){if(z(ne),de!==de+0)throw de;B(1,0)}}function xy(n,s,c,a,f,h,b,_){var x=D();try{Ia(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Sy(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{return Ra(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Ty(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{return Ua(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Iy(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{Va(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Cy(n,s,c,a){var f=D();try{va(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Ay(n,s,c,a,f){var h=D();try{Wa(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function ky(n,s,c,a,f,h,b,_,x,A){var O=D();try{ka(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Ey(n,s,c,a,f){var h=D();try{Ma(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function Py(n,s,c,a,f,h,b,_,x){var A=D();try{return Ga(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Oy(n,s,c,a,f,h,b,_,x){var A=D();try{return ha(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function zy(n,s){var c=D();try{return Fa(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function Dy(n,s){var c=D();try{return ja(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function By(n,s,c,a){var f=D();try{Za(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function My(n,s,c,a,f,h,b){var _=D();try{Ld(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Ry(n,s,c,a,f,h,b){var _=D();try{Ha(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Uy(n,s,c,a,f,h,b,_){var x=D();try{Lu(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Ny(n,s,c,a,f,h,b,_,x,A){var O=D();try{Na(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Vy(n,s,c,a){var f=D();try{La(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Ly(n,s,c,a,f,h,b,_,x){var A=D();try{return Ba(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Wy(n,s,c,a,f,h,b,_){var x=D();try{return ga(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Gy(n,s,c,a,f,h){var b=D();try{vs(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Hy(n,s,c){var a=D();try{return Qa(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;return B(1,0),0n}}function Fy(n,s,c,a,f){var h=D();try{Ya(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function qy(n,s,c,a,f){var h=D();try{return Xa(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function jy(n,s,c,a){var f=D();try{Ja(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Ky(n,s,c){var a=D();try{es(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Zy(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{ts(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Qy(n,s,c,a,f,h){var b=D();try{ou(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Yy(n,s,c,a,f,h,b,_,x){var A=D();try{$a(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Xy(n,s){var c=D();try{return ss(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function Jy(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de){var be=D();try{Wd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de)}catch(we){if(z(be),we!==we+0)throw we;B(1,0)}}function eb(n,s,c,a){var f=D();try{ps(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function tb(n,s,c,a,f,h,b,_){var x=D();try{fs(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function rb(n,s,c,a,f,h,b){var _=D();try{ms(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function nb(n,s,c,a,f){var h=D();try{hs(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function ob(n,s,c){var a=D();try{ds(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function ib(n,s,c,a){var f=D();try{return ls(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function ab(n,s,c,a){var f=D();try{return cs(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function sb(n,s,c,a){var f=D();try{us(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function ub(n,s,c,a,f,h,b,_){var x=D();try{gs(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function db(n,s,c,a){var f=D();try{return Nd(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function cb(n,s,c,a,f){var h=D();try{ys(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function lb(n,s,c,a,f,h){var b=D();try{return os(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function pb(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne){var de=D();try{is(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne)}catch(be){if(z(de),be!==be+0)throw be;B(1,0)}}function fb(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{return bs(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function mb(n,s,c,a){var f=D();try{return Is(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;return B(1,0),0n}}function hb(n,s,c,a,f,h){var b=D();try{return as(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function gb(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{return $s(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function yb(n,s,c,a,f,h,b,_){var x=D();try{xs(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function bb(n,s,c,a){var f=D();try{return Ss(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;return B(1,0),0n}}function wb(n,s,c,a,f,h,b,_,x){var A=D();try{Ts(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function _b(n,s,c,a,f,h,b){var _=D();try{ws(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function vb(n,s,c,a,f,h){var b=D();try{return _s(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function $b(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{return Cs(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function xb(n,s,c,a,f,h,b){var _=D();try{return As(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Sb(n,s,c,a,f,h){var b=D();try{return ks(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Tb(n,s){var c=D();try{return rs(n,s)}catch(a){if(z(c),a!==a+0)throw a;return B(1,0),0n}}function Ib(n,s,c,a,f,h){var b=D();try{return ns(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Cb(n,s,c,a,f,h,b,_){var x=D();try{return Es(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Ab(n,s,c,a,f,h,b,_,x){var A=D();try{Ps(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function kb(n,s,c,a,f,h){var b=D();try{return Os(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Eb(n,s,c){var a=D();try{return zs(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Pb(n,s,c,a,f,h,b,_){var x=D();try{return Ds(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Ob(n,s,c,a,f,h,b){var _=D();try{return Bs(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function zb(n,s,c,a,f,h){var b=D();try{return Ms(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Db(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{return Rs(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function Bb(n,s,c,a,f,h,b,_){var x=D();try{return Us(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Mb(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{return Ns(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Rb(n,s,c,a,f,h,b){var _=D();try{return Vs(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Ub(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{return Ls(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function Nb(n,s,c,a,f,h,b){var _=D();try{return Ws(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Vb(n,s,c,a,f,h,b,_){var x=D();try{Gs(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Lb(n,s,c,a,f,h,b){var _=D();try{return Hs(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Wb(n,s,c){var a=D();try{return Fs(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;return B(1,0),0n}}function Gb(n,s,c,a){var f=D();try{return qs(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Hb(n,s,c,a,f,h,b){var _=D();try{js(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Fb(n,s,c,a,f,h,b,_,x){var A=D();try{Ks(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function qb(n,s,c,a,f,h,b){var _=D();try{Zs(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function jb(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{Qs(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Kb(n,s,c,a,f,h,b,_,x){var A=D();try{Xs(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Zb(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne){var de=D();try{Js(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne)}catch(be){if(z(de),be!==be+0)throw be;B(1,0)}}function Qb(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{eu(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function Yb(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{ru(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Xb(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee){var ne=D();try{nu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)}catch(de){if(z(ne),de!==de+0)throw de;B(1,0)}}function Jb(n,s,c,a,f,h,b,_,x){var A=D();try{iu(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function ew(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{return au(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function tw(n,s,c,a,f,h,b,_,x,A){var O=D();try{return su(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function rw(n,s){var c=D();try{uu(n,s)}catch(a){if(z(c),a!==a+0)throw a;B(1,0)}}function nw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee){var ne=D();try{fu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)}catch(de){if(z(ne),de!==de+0)throw de;B(1,0)}}function ow(n,s,c,a,f){var h=D();try{du(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function iw(n,s,c,a,f,h,b){var _=D();try{cu(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function aw(n,s,c,a,f){var h=D();try{pu(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function sw(n,s,c,a,f,h,b,_){var x=D();try{lu(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function uw(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{mu(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function dw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de){var be=D();try{return hu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de)}catch(we){if(z(be),we!==we+0)throw we;B(1,0)}}function cw(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{gu(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function lw(n,s,c,a,f){var h=D();try{return Gd(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function pw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re){var ar=D();try{return yu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re)}catch(vt){if(z(ar),vt!==vt+0)throw vt;B(1,0)}}function fw(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{bu(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function mw(n,s,c,a,f,h,b){var _=D();try{return wu(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function hw(n,s,c,a,f,h){var b=D();try{vu(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function gw(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{$u(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function yw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de){var be=D();try{xu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de)}catch(we){if(z(be),we!==we+0)throw we;B(1,0)}}function bw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne){var de=D();try{Su(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne)}catch(be){if(z(de),be!==be+0)throw be;B(1,0)}}function ww(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee){var ne=D();try{Tu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)}catch(de){if(z(ne),de!==de+0)throw de;B(1,0)}}function _w(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{Iu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function vw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze){var Me=D();try{Cu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze)}catch(Re){if(z(Me),Re!==Re+0)throw Re;B(1,0)}}function $w(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be){var we=D();try{Au(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be)}catch(ze){if(z(we),ze!==ze+0)throw ze;B(1,0)}}function xw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de){var be=D();try{ku(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de)}catch(we){if(z(be),we!==we+0)throw we;B(1,0)}}function Sw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze){var Me=D();try{Eu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze)}catch(Re){if(z(Me),Re!==Re+0)throw Re;B(1,0)}}function Tw(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{Pu(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function Iw(n,s,c,a,f,h,b,_,x,A){var O=D();try{Ou(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Cw(n,s,c,a,f,h,b,_){var x=D();try{return zu(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;return B(1,0),0n}}function Aw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{Du(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function kw(n,s,c,a,f,h,b,_,x,A){var O=D();try{Bu(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Ew(n,s,c,a,f,h,b,_,x){var A=D();try{Mu(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Pw(n,s,c,a,f,h,b){var _=D();try{return _u(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function Ow(n,s,c){var a=D();try{return Hd(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;return B(1,0),0n}}function zw(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{Ru(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function Dw(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{Nu(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function Bw(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{Vu(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function Mw(n,s,c,a,f,h){var b=D();try{Uu(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Rw(n,s,c,a,f,h,b,_){var x=D();try{Wu(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Uw(n,s,c,a,f,h,b,_,x,A){var O=D();try{Gu(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Nw(n,s,c,a){var f=D();try{return tu(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Vw(n,s,c,a,f,h,b,_,x,A){var O=D();try{Hu(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function Lw(n,s,c,a,f,h){var b=D();try{Fu(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Ww(n,s,c){var a=D();try{return qu(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Gw(n,s,c,a,f,h,b,_){var x=D();try{return Ku(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function Hw(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{Zu(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function Fw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{Qu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function qw(n,s,c,a,f,h,b,_){var x=D();try{Yu(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function jw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze){var Me=D();try{Xu(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze)}catch(Re){if(z(Me),Re!==Re+0)throw Re;B(1,0)}}function Kw(n,s,c,a){var f=D();try{return Ju(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function Zw(n,s,c){var a=D();try{return Ka(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Qw(n,s,c,a,f,h,b,_,x){var A=D();try{ed(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function Yw(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{td(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function Xw(n,s,c,a,f,h){var b=D();try{rd(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function Jw(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee){var ne=D();try{return nd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee)}catch(de){if(z(ne),de!==de+0)throw de;B(1,0)}}function e0(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{od(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function t0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re,ar){var vt=D();try{id(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re,ar)}catch(Qn){if(z(vt),Qn!==Qn+0)throw Qn;B(1,0)}}function r0(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{ad(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function n0(n,s,c,a,f,h,b,_,x,A){var O=D();try{sd(n,s,c,a,f,h,b,_,x,A)}catch(U){if(z(O),U!==U+0)throw U;B(1,0)}}function o0(n,s,c,a,f,h,b,_,x,A,O,U,V,H){var F=D();try{ud(n,s,c,a,f,h,b,_,x,A,O,U,V,H)}catch(ee){if(z(F),ee!==ee+0)throw ee;B(1,0)}}function i0(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{dd(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function a0(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{cd(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function s0(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{ld(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function u0(n,s,c,a,f,h,b){var _=D();try{pd(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function d0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we){var ze=D();try{gd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we)}catch(Me){if(z(ze),Me!==Me+0)throw Me;B(1,0)}}function c0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze){var Me=D();try{Fd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze)}catch(Re){if(z(Me),Re!==Re+0)throw Re;B(1,0)}}function l0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we){var ze=D();try{hd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we)}catch(Me){if(z(ze),Me!==Me+0)throw Me;B(1,0)}}function p0(n,s,c,a,f,h,b,_,x,A,O,U,V){var H=D();try{fd(n,s,c,a,f,h,b,_,x,A,O,U,V)}catch(F){if(z(H),F!==F+0)throw F;B(1,0)}}function f0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be){var we=D();try{md(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be)}catch(ze){if(z(we),ze!==ze+0)throw ze;B(1,0)}}function m0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{ju(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function h0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de){var be=D();try{yd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de)}catch(we){if(z(be),we!==we+0)throw we;B(1,0)}}function g0(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{bd(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function y0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re){var ar=D();try{return wd(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F,ee,ne,de,be,we,ze,Me,Re)}catch(vt){if(z(ar),vt!==vt+0)throw vt;B(1,0)}}function b0(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F){var ee=D();try{_d(n,s,c,a,f,h,b,_,x,A,O,U,V,H,F)}catch(ne){if(z(ee),ne!==ne+0)throw ne;B(1,0)}}function w0(n,s,c,a,f,h,b){var _=D();try{vd(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function _0(n,s,c,a,f){var h=D();try{$d(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function v0(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{xd(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function $0(n,s,c,a,f,h,b){var _=D();try{Sd(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function x0(n,s,c,a,f){var h=D();try{Td(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function S0(n,s,c,a,f,h,b,_,x,A,O,U){var V=D();try{Ys(n,s,c,a,f,h,b,_,x,A,O,U)}catch(H){if(z(V),H!==H+0)throw H;B(1,0)}}function T0(n,s,c,a,f,h){var b=D();try{return Id(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function I0(n,s,c,a,f){var h=D();try{return Cd(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function C0(n,s,c,a,f,h,b,_){var x=D();try{return Ad(n,s,c,a,f,h,b,_)}catch(A){if(z(x),A!==A+0)throw A;B(1,0)}}function A0(n,s,c,a,f,h,b,_,x,A,O){var U=D();try{kd(n,s,c,a,f,h,b,_,x,A,O)}catch(V){if(z(U),V!==V+0)throw V;B(1,0)}}function k0(n,s,c,a,f,h){var b=D();try{return Ed(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function E0(n,s,c,a,f){var h=D();try{return Od(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function P0(n,s,c,a,f,h,b,_,x){var A=D();try{Pd(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function O0(n,s,c,a,f,h){var b=D();try{return zd(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;return B(1,0),0n}}function z0(n,s,c,a,f,h,b){var _=D();try{return Dd(n,s,c,a,f,h,b)}catch(x){if(z(_),x!==x+0)throw x;B(1,0)}}function D0(n,s,c,a,f,h,b,_,x){var A=D();try{return Bd(n,s,c,a,f,h,b,_,x)}catch(O){if(z(A),O!==O+0)throw O;B(1,0)}}function B0(n,s,c,a,f){var h=D();try{return Md(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;B(1,0)}}function M0(n){var s=D();try{return Ca(n)}catch(c){if(z(s),c!==c+0)throw c;return B(1,0),0n}}function R0(n,s,c,a,f,h){var b=D();try{return Rd(n,s,c,a,f,h)}catch(_){if(z(b),_!==_+0)throw _;B(1,0)}}function U0(n,s,c,a,f){var h=D();try{return Ud(n,s,c,a,f)}catch(b){if(z(h),b!==b+0)throw b;return B(1,0),0n}}function N0(n,s,c,a){var f=D();try{return Vd(n,s,c,a)}catch(h){if(z(f),h!==h+0)throw h;B(1,0)}}function V0(n,s,c){var a=D();try{return qa(n,s,c)}catch(f){if(z(a),f!==f+0)throw f;B(1,0)}}function Or(){if(0<xe)Oe=Or;else if(i)S?.(e),ke();else{for(var n=Ve;0<n.length;)n.shift()(e);0<xe?Oe=Or:(e.calledRun=!0,R||(ke(),S?.(e)))}}return i||(_t=await Te(),Or()),e.PTR_SIZE=4,_e?e:new Promise((n,s)=>{S=n,k=s})}var K0,Z0,Pc=Q(()=>{"use strict";K0=kc,Z0=globalThis.self?.name?.startsWith("em-pthread");Z0&&kc()});var Dc,so,Q0,Xe,Bc,ao,Y0,X0,Mc,J0,Oc,Rc,zc,Uc,Ur=Q(()=>{"use strict";Rr();Dc=typeof location>"u"?void 0:location.origin,so=import.meta.url>"file:"&&import.meta.url<"file;",Q0=()=>{if(!!1){if(so){let t=URL;return new URL(new t("ort.bundle.min.mjs",import.meta.url).href,Dc).href}return import.meta.url}},Xe=Q0(),Bc=()=>{if(Xe&&!Xe.startsWith("blob:"))return Xe.substring(0,Xe.lastIndexOf("/")+1)},ao=(t,e)=>{try{let r=e??Xe;return(r?new URL(t,r):new URL(t)).origin===Dc}catch{return!1}},Y0=(t,e)=>{let r=e??Xe;try{return(r?new URL(t,r):new URL(t)).href}catch{return}},X0=(t,e)=>`${e??"./"}${t}`,Mc=async t=>{let r=await(await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},J0=async t=>(await import(/*webpackIgnore:true*/ /*@vite-ignore*/t)).default,Oc=(Ac(),sr(Cc)).default,Rc=async()=>{if(!Xe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(ao(Xe))return[void 0,Oc()];let t=await Mc(Xe);return[t,Oc(t)]},zc=(Pc(),sr(Ec)).default,Uc=async(t,e,r,o)=>{let i=zc&&!(t||e);if(i)if(Xe)i=ao(Xe)||o&&!r;else if(o&&!r)i=!0;else throw new Error("cannot determine the script source URL.");if(i)return[void 0,zc];{let u="ort-wasm-simd-threaded.jsep.mjs",d=t??Y0(u,e),l=!!1&&r&&d&&!ao(d,e),p=l?await Mc(d):d??X0(u,e);return[l?p:void 0,await J0(p)]}}});var uo,co,jr,Nc,e_,t_,r_,Nr,Ie,Et=Q(()=>{"use strict";Ur();co=!1,jr=!1,Nc=!1,e_=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},t_=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},r_=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Nr=async t=>{if(co)return Promise.resolve();if(jr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Nc)throw new Error("previous call to 'initializeWebAssembly()' failed.");jr=!0;let e=t.initTimeout,r=t.numThreads;if(t.simd!==!1){if(t.simd==="relaxed"){if(!r_())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!t_())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let o=e_();r>1&&!o&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=r=1);let i=t.wasmPaths,u=typeof i=="string"?i:void 0,d=i?.mjs,l=d?.href??d,p=i?.wasm,m=p?.href??p,g=t.wasmBinary,[y,w]=await Uc(l,u,r>1,!!g||!!m),$=!1,v=[];if(e>0&&v.push(new Promise(S=>{setTimeout(()=>{$=!0,S()},e)})),v.push(new Promise((S,k)=>{let C={numThreads:r};if(g)C.wasmBinary=g,C.locateFile=I=>I;else if(m||u)C.locateFile=I=>m??u+I;else if(l&&l.indexOf("blob:")!==0)C.locateFile=I=>new URL(I,l).href;else if(y){let I=Bc();I&&(C.locateFile=E=>I+E)}w(C).then(I=>{jr=!1,co=!0,uo=I,S(),y&&URL.revokeObjectURL(y)},I=>{jr=!1,Nc=!0,k(I)})})),await Promise.race(v),$)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ie=()=>{if(co&&uo)return uo;throw new Error("WebAssembly is not initialized yet.")}});var qe,cr,ve,Kr=Q(()=>{"use strict";Et();qe=(t,e)=>{let r=Ie(),o=r.lengthBytesUTF8(t)+1,i=r._malloc(o);return r.stringToUTF8(t,i,o),e.push(i),i},cr=(t,e,r,o)=>{if(typeof t=="object"&&t!==null){if(r.has(t))throw new Error("Circular reference in options");r.add(t)}Object.entries(t).forEach(([i,u])=>{let d=e?e+i:i;if(typeof u=="object")cr(u,d+".",r,o);else if(typeof u=="string"||typeof u=="number")o(d,u.toString());else if(typeof u=="boolean")o(d,u?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof u}`)})},ve=t=>{let e=Ie(),r=e.stackSave();try{let o=e.PTR_SIZE,i=e.stackAlloc(2*o);e._OrtGetLastError(i,i+o);let u=Number(e.getValue(i,o===4?"i32":"i64")),d=e.getValue(i+o,"*"),l=d?e.UTF8ToString(d):"";throw new Error(`${t} ERROR_CODE: ${u}, ERROR_MESSAGE: ${l}`)}finally{e.stackRestore(r)}}});var Vc,Lc=Q(()=>{"use strict";Et();Kr();Vc=t=>{let e=Ie(),r=0,o=[],i=t||{};try{if(t?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof t.logSeverityLevel!="number"||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof t.logVerbosityLevel!="number"||!Number.isInteger(t.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(i.terminate=!1);let u=0;return t?.tag!==void 0&&(u=qe(t.tag,o)),r=e._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,u),r===0&&ve("Can't create run options."),t?.extra!==void 0&&cr(t.extra,"",new WeakSet,(d,l)=>{let p=qe(d,o),m=qe(l,o);e._OrtAddRunConfigEntry(r,p,m)!==0&&ve(`Can't set a run config entry: ${d} - ${l}.`)}),[r,o]}catch(u){throw r!==0&&e._OrtReleaseRunOptions(r),o.forEach(d=>e._free(d)),u}}});var n_,o_,i_,Zr,a_,s_,u_,Wc,Gc=Q(()=>{"use strict";Et();Kr();n_=t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${t}`)}},o_=t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${t}`)}},i_=t=>{t.extra||(t.extra={}),t.extra.session||(t.extra.session={});let e=t.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(t.enableMemPattern=!1)},Zr=(t,e,r,o)=>{let i=qe(e,o),u=qe(r,o);Ie()._OrtAddSessionConfigEntry(t,i,u)!==0&&ve(`Can't set a session config entry: ${e} - ${r}.`)},a_=(t,e,r,o)=>{let i=qe(e,o),u=qe(r,o);t.push([i,u])},s_=t=>{if(!t)return"";let e=[];for(let[r,o]of Object.entries(t)){if(!r)throw new Error("WebNN freeDimensionBounds dimension name must not be empty.");if(r.includes(":")||r.includes(";"))throw new Error(`WebNN freeDimensionBounds dimension name must not include ':' or ';': ${r}`);let i=o?.minSize??1,u=o?.maxSize;if(!Number.isInteger(i)||i<1)throw new Error(`WebNN freeDimensionBounds minSize must be an integer >= 1 for dimension: ${r}`);if(!Number.isInteger(u)||u<1)throw new Error(`WebNN freeDimensionBounds maxSize must be an integer >= 1 for dimension: ${r}`);if(u<i)throw new Error(`WebNN freeDimensionBounds maxSize must be >= minSize for dimension: ${r}`);e.push(`${r}:${i}:${u}`)}return e.join(";")},u_=async(t,e,r)=>{let o=e.executionProviders;for(let i of o){let u=typeof i=="string"?i:i.name,d=[];switch(u){case"webnn":if(u="WEBNN",typeof i!="string"){let y=i,w=y?.deviceType,$=y?.freeDimensionBounds;if(w&&Zr(t,"deviceType",w,r),$){let v=s_($);v&&a_(d,"FreeDimensionBounds",v,r)}}break;case"webgpu":if(u="JS",typeof i!="string"){let y=i;if(y?.preferredLayout){if(y.preferredLayout!=="NCHW"&&y.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${y.preferredLayout}`);Zr(t,"preferredLayout",y.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${u}`)}let l=qe(u,r),p=d.length,m=0,g=0;if(p>0){m=Ie()._malloc(p*Ie().PTR_SIZE),r.push(m),g=Ie()._malloc(p*Ie().PTR_SIZE),r.push(g);for(let y=0;y<p;y++)Ie().setValue(m+y*Ie().PTR_SIZE,d[y][0],"*"),Ie().setValue(g+y*Ie().PTR_SIZE,d[y][1],"*")}await Ie()._OrtAppendExecutionProvider(t,l,m,g,p)!==0&&ve(`Can't append execution provider: ${u}.`)}},Wc=async t=>{let e=Ie(),r=0,o=[],i=t||{};i_(i);try{let u=n_(i.graphOptimizationLevel??"all"),d=o_(i.executionMode??"sequential"),l=typeof i.logId=="string"?qe(i.logId,o):0,p=i.logSeverityLevel??2;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log severity level is not valid: ${p}`);let m=i.logVerbosityLevel??0;if(!Number.isInteger(m)||m<0||m>4)throw new Error(`log verbosity level is not valid: ${m}`);let g=typeof i.optimizedModelFilePath=="string"?qe(i.optimizedModelFilePath,o):0;if(r=e._OrtCreateSessionOptions(u,!!i.enableCpuMemArena,!!i.enableMemPattern,d,!!i.enableProfiling,0,l,p,m,g),r===0&&ve("Can't create session options."),i.executionProviders&&await u_(r,i,o),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Zr(r,"enableGraphCapture",i.enableGraphCapture.toString(),o)}if(i.freeDimensionOverrides)for(let[y,w]of Object.entries(i.freeDimensionOverrides)){if(typeof y!="string")throw new Error(`free dimension override name must be a string: ${y}`);if(typeof w!="number"||!Number.isInteger(w)||w<0)throw new Error(`free dimension override value must be a non-negative integer: ${w}`);let $=qe(y,o);e._OrtAddFreeDimensionOverride(r,$,w)!==0&&ve(`Can't set a free dimension override: ${y} - ${w}.`)}return i.extra!==void 0&&cr(i.extra,"",new WeakSet,(y,w)=>{Zr(r,y,w,o)}),[r,o]}catch(u){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&ve("Can't release session options."),o.forEach(d=>e._free(d)),u}}});var Pt,lt,Ot,Qt,lr,Qr,Yr,lo,ce=Q(()=>{"use strict";Pt=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${t}`)}},lt=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${t}`)}},Ot=(t,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],o=typeof e=="number"?e:e.reduce((i,u)=>i*u,1);return r>0?Math.ceil(o*r):void 0},Qt=t=>{switch(t){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${t}`)}},lr=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${t}`)}},Qr=t=>t==="float32"||t==="float16"||t==="int32"||t==="int64"||t==="uint32"||t==="uint8"||t==="bool"||t==="uint4"||t==="int4",Yr=t=>t==="float32"||t==="float16"||t==="int32"||t==="int64"||t==="uint32"||t==="uint64"||t==="int8"||t==="uint8"||t==="bool"||t==="uint4"||t==="int4",lo=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${t}`)}}});var pr,po=Q(()=>{"use strict";Rr();pr=async t=>{if(typeof t=="string")if(!1)try{let{readFile:e}=Xn("node:fs/promises");return new Uint8Array(await e(t))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Xn("node:fs"),o=r(t),i=[];for await(let u of o)i.push(u);return new Uint8Array(Buffer.concat(i))}throw e}else{let e=await fetch(t);if(!e.ok)throw new Error(`failed to load external data file: ${t}`);let r=e.headers.get("Content-Length"),o=r?parseInt(r,10):0;if(o<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${t}, no response body.`);let i=e.body.getReader(),u;try{u=new ArrayBuffer(o)}catch(l){if(l instanceof RangeError){let p=Math.ceil(o/65536);u=new WebAssembly.Memory({initial:p,maximum:p}).buffer}else throw l}let d=0;for(;;){let{done:l,value:p}=await i.read();if(l)break;let m=p.byteLength;new Uint8Array(u,d,m).set(p),d+=m}return new Uint8Array(u,0,o)}}else return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t)}});var d_,c_,Hc,Fc,Xr,l_,ge,pt=Q(()=>{"use strict";ce();d_=["V","I","W","E","F"],c_=(t,e)=>{console.log(`[${d_[t]},${new Date().toISOString()}]${e}`)},Xr=(t,e)=>{Hc=t,Fc=e},l_=(t,e)=>{let r=lr(t),o=lr(Hc);r>=o&&c_(r,typeof e=="function"?e():e)},ge=(...t)=>{Fc&&l_(...t)}});var fo,ft,N,Wt,Jr,qc,jc,fe=Q(()=>{"use strict";fo=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},ft=class{static calcShape(e,r,o=!1){let i=e.length,u=r.length;if(i===0)return r;if(u===0)return e;let d=Math.max(e.length,r.length),l=new Array(d);if(o){if(i<2||u<2)return;let p=fo.calcMatMulShape([e[i-2],e[i-1]],[r[u-2],r[u-1]]);if(p===void 0)return;[l[d-2],l[d-1]]=p}for(let p=o?3:1;p<=d;p++){let m=i-p<0?1:e[i-p],g=u-p<0?1:r[u-p];if(m!==g&&m>1&&g>1)return;let y=Math.max(m,g);if(m&&g)l[d-p]=Math.max(m,g);else{if(y>1)return;l[d-p]=0}}return l}static isValidBroadcast(e,r){let o=e.length,i=r.length;if(o>i)return!1;for(let u=1;u<=o;u++)if(e[o-u]!==1&&e[o-u]!==r[i-u])return!1;return!0}},N=class t{static size(e){return t.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let o=e.length;if(o===0)return[];let i=new Array(o),u=o-1;for(;u>=0;){if(e[u]%r===0){i[u]=e[u]/r;break}if(r%e[u]!==0)throw new Error("cannot convert shape");i[u]=1,r/=e[u],u--}for(u--;u>=0;u--)i[u]=e[u];return i}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return t.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return t.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,o){let i=1;for(let u=r;u<o;u++){if(e[u]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(e[u])}return i}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let o=new Array(r);o[r-1]=1,o[r-2]=e[r-1];for(let i=r-3;i>=0;--i)o[i]=o[i+1]*e[i+1];return o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(o=>this.normalizeAxis(o,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(o=>e[o]):e.slice().reverse()}static padShape(e,r){let o=e.length;return e.map((i,u)=>i+r[u]+r[u+o])}static areEqual(e,r){return e.length!==r.length?!1:e.every((o,i)=>o===r[i])}},Wt=class t{static adjustPoolAttributes(e,r,o,i,u,d){if(!e&&o.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let l=0;l<r.length-2;l++)l>=o.length?o.push(r[l+2]):o[l]=r[l+2];for(let l=0;l<o.length;l++)if(l<i.length){if(i[l]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let l=0;l<o.length;l++)if(l<u.length){if(u[l]<0)throw new Error("dilations should be greater than or equal to 1")}else u.push(1);for(let l=0;l<o.length*2;l++)if(l<d.length){if(d[l]<0)throw new Error("pad should be greater than or equal to 1")}else d.push(0);for(let l=0;l<o.length;l++){if(o[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(d[l]>=o[l]||d[l+o.length]>=o[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,o,i,u,d,l){if(l){if(u.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let p=0;p<e.length-2;p++)t.adjustPadAndReturnShape(e[p+(d?1:2)],r[p],o[p],i[p],u,p,p+e.length-2,l)}}static computePoolOutputShape(e,r,o,i,u,d,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return t.computeShapeHelper(e,r,p,o,i,u,d,l),p}static computeConvOutputShape(e,r,o,i,u,d,l){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let p=[e[0],r[0]];return t.computeShapeHelper(!1,e,p,o,i,u,d,l),p}static computeShapeHelper(e,r,o,i,u,d,l,p){if(e)for(let m=0;m<r.length-2;m++)o.push(1);else for(let m=0;m<r.length-2;m++)o.push(t.adjustPadAndReturnShape(r[m+2],i[m],u[m],d[m],l,m,m+r.length-2,p))}static adjustPadAndReturnShape(e,r,o,i,u,d,l,p){let m=o*(i-1)+1;if(p&&p!=="NOTSET")switch(p){case"VALID":return u[d]=0,u[l]=0,Math.floor((e-m)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(o!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let y=((e+r-1)/r-1)*r+i-e;return u[d]=Math.floor(p==="SAME_LOWER"?(y+1)/2:y/2),u[l]=y-u[d],Math.floor((e+y-i)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+u[d]+u[l]-m)/r+1)}},Jr=class{static getShapeOfGemmResult(e,r,o,i,u){if(e.length!==2||o.length!==2)throw new Error("shape need to be of size 2");let d,l,p;r?(d=e[1],l=e[0]):(d=e[0],l=e[1]);let m=-1;if(i?(p=o[0],m=1):(p=o[1],m=0),o[m]!==l)throw new Error("dimension mismatch");if(d<=0||p<=0||l<=0)throw new Error("invalid shape specified");if(u&&!ft.isValidBroadcast(u,[d,p]))throw new Error("gemm: invalid bias shape for broadcast");return[d,p,l]}},qc=-34028234663852886e22,jc=34028234663852886e22});var en,mo=Q(()=>{"use strict";ce();en=(t,e)=>new(Qt(e))(t)});var Zc,go,Qc,p_,Kc,f_,Yc,tn,rn,ho,Xc,Jc=Q(()=>{"use strict";ce();pt();Zc=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),go=(t,e)=>{if(e==="int32")return t;let r=Zc.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);let o=r/8;if(t.byteLength%o!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${o}.`);let i=t.byteLength/o,u=new(Qt(e))(t.buffer,t.byteOffset,i);switch(e){case"int64":case"uint64":{let d=new Int32Array(i);for(let l=0;l<i;l++){let p=u[l];if(p>2147483647n||p<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");d[l]=Number(p)}return new Uint8Array(d.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&u.some(l=>l>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let d=Int32Array.from(u,Number);return new Uint8Array(d.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},Qc=(t,e)=>{if(e==="int32")return t;if(t.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=t.byteLength/4,o=new Int32Array(t.buffer,t.byteOffset,r);switch(e){case"int64":{let i=BigInt64Array.from(o,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(o.some(u=>u<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(o,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(o.some(u=>u<-128||u>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(o,Number);return new Uint8Array(i.buffer)}case"uint8":{if(o.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(o,Number)}case"uint32":{if(o.some(u=>u<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(o,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},p_=1,Kc=()=>p_++,f_=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Yc=(t,e)=>{let r=Zc.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);return e.length>0?Math.ceil(e.reduce((o,i)=>o*i)*r/8):0},tn=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:o,tensor:i,dataType:u,shape:d,fallbackDataType:l}=e;this.sessionId=r,this.mlContext=o,this.mlTensor=i,this.dataType=u,this.tensorShape=d,this.fallbackDataType=l}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Yc(this.dataType,this.tensorShape)}destroy(){ge("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),o=Qc(new Uint8Array(r),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(o);return}else return o.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,o){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===o.length&&this.tensorShape.every((i,u)=>i===o[u])}setIsDataConverted(e){this.isDataConverted=e}},rn=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,o,i){let u=this.tensorManager.getMLContext(e),d=this.tensorManager.getMLOpSupportLimits(e),l;if(!d?.input.dataTypes.includes(r)){if(l=f_.get(r),!l||d?.input.dataTypes.includes(l))throw new Error(`WebNN backend does not support data type: ${r}`);ge("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${l}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(u,r,o))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Yc(r,o))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let p=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,o,p,!0,!0,l),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=go(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else ge("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?Qc(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},ho=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Kc();return this.tensorTrackersById.set(e,new rn(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,o,i,u){ge("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${o}, shape: ${i}, copyOld: ${u}}`);let d=this.tensorTrackersById.get(r);if(!d)throw new Error("Tensor not found.");return d.ensureTensor(e,o,i,u)}upload(e,r){let o=this.tensorTrackersById.get(e);if(!o)throw new Error("Tensor not found.");o.upload(r)}async download(e,r){ge("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let o=this.tensorTrackersById.get(e);if(!o)throw new Error("Tensor not found.");return o.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,o,i){let u=this.getMLContext(e),d=Kc(),l=new tn({sessionId:e,context:u,tensor:r,dataType:o,shape:i});return this.tensorTrackersById.set(d,new rn(this,l)),this.externalTensors.add(l),d}async getCachedTensor(e,r,o,i,u,d,l){let p=this.getMLContext(e);for(let[g,y]of this.freeTensors.entries())if(y.canReuseTensor(p,r,o)){ge("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${l?`fallbackDataType: ${l},`:""} shape: ${o}`);let w=this.freeTensors.splice(g,1)[0];return w.sessionId=e,w}ge("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${l?`fallbackDataType: ${l},`:""} shape: ${o}}`);let m=await p.createTensor({dataType:l??r,shape:o,dimensions:o,usage:i,writable:u,readable:d});return new tn({sessionId:e,context:p,tensor:m,dataType:r,shape:o,fallbackDataType:l})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Xc=(...t)=>new ho(...t)});var nn,m_,on,el=Q(()=>{"use strict";ce();Et();mo();Jc();pt();nn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),m_=(t,e)=>{if(t===e)return!0;if(t===void 0||e===void 0)return!1;let r=Object.keys(t).sort(),o=Object.keys(e).sort();return r.length===o.length&&r.every((i,u)=>i===o[u]&&t[i]===e[i])},on=class{constructor(e){this.tensorManager=Xc(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Xr(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ge("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ge("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let o of r)ge("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${o}}`),this.tensorManager.releaseTensorId(o);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let o=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(o!==-1)return this.mlContextCache[o].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let o=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(o!==-1)return this.mlContextCache[o].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let r=this.mlContextCache.findIndex(o=>m_(o.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:o}),o}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let o=this.sessionIdsByMLContext.get(r);o||(o=new Set,this.sessionIdsByMLContext.set(r,o)),o.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let o=this.sessionIdsByMLContext.get(r);if(o.delete(e),o.size===0){this.sessionIdsByMLContext.delete(r);let i=this.mlContextCache.findIndex(u=>u.mlContext===r);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ge("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,o,i,u){let d=nn.get(o);if(!d)throw new Error(`Unsupported ONNX data type: ${o}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,d,i,u)}async createTemporaryTensor(e,r,o){ge("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${o}}`);let i=nn.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);let u=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,u,i,o,!1);let d=this.temporarySessionTensorIds.get(e);return d?d.push(u):this.temporarySessionTensorIds.set(e,[u]),u}uploadTensor(e,r){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ge("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let o=await this.tensorManager.download(e);return en(o,r)}}registerMLTensor(e,r,o,i){let u=nn.get(o);if(!u)throw new Error(`Unsupported ONNX data type: ${o}`);let d=this.tensorManager.registerTensor(e,r,u,i);return ge("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${u}, dimensions: ${i}} -> {tensorId: ${d}}`),d}registerMLConstant(e,r,o,i,u,d,l=!1){if(!d)throw new Error("External mounted files are not available.");let p=e;e.startsWith("./")&&(p=e.substring(2));let m=d.get(p);if(!m)throw new Error(`File with name ${p} not found in preloaded files.`);if(r+o>m.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let g=m.slice(r,r+o).buffer,y;switch(u.dataType){case"float32":y=new Float32Array(g);break;case"float16":y=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(g):new Uint16Array(g);break;case"int32":y=new Int32Array(g);break;case"uint32":y=new Uint32Array(g);break;case"int64":if(l){let w=go(new Uint8Array(g),"int64");y=new Int32Array(w.buffer),u.dataType="int32"}else y=new BigInt64Array(g);break;case"uint64":y=new BigUint64Array(g);break;case"int8":y=new Int8Array(g);break;case"int4":case"uint4":case"uint8":y=new Uint8Array(g);break;default:throw new Error(`Unsupported data type: ${u.dataType} in creating WebNN Constant from external data.`)}return ge("verbose",()=>`[WebNN] registerMLConstant {dataType: ${u.dataType}, shape: ${u.shape}}} ${l?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(u,y)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let o=this.sessionGraphInputs.get(e);return o?o.includes(r):!1}isGraphOutput(e,r){let o=this.sessionGraphOutputs.get(e);return o?o.includes(r):!1}isGraphInputOutputTypeSupported(e,r,o=!0){let i=nn.get(Pt(r)),u=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:o?!!u?.input.dataTypes.includes(i):!!u?.output.dataTypes.includes(i)}flush(){}}});var an=Q(()=>{"use strict"});var tl,yo,bo,h_,g_,rl,_o,wo,ol,il=Q(()=>{"use strict";pt();an();tl=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),yo=[],bo=t=>Math.ceil(Number(t)/16)*16,h_=t=>{for(let e=0;e<yo.length;e++){let r=yo[e];if(t<=r)return r}return Math.ceil(t/16)*16},g_=1,rl=()=>g_++,_o=async(t,e,r,o)=>{let i=bo(r),u=t.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let d=t.getCommandEncoder();t.endComputePass(),d.copyBufferToBuffer(e,0,u,0,i),t.flush(),await u.mapAsync(GPUMapMode.READ);let l=u.getMappedRange();if(o){let p=o();return p.set(new Uint8Array(l,0,r)),p}else return new Uint8Array(l.slice(0,r))}finally{u.destroy()}},wo=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of tl)yo.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let o=r.buffer,i=r.byteOffset,u=r.byteLength,d=bo(u),l=this.storageCache.get(e);if(!l)throw new Error("gpu data for uploading does not exist");if(Number(l.originalSize)!==u)throw new Error(`inconsistent data size. gpu data size=${l.originalSize}, data size=${u}`);let p=this.backend.device.createBuffer({mappedAtCreation:!0,size:d,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),m=p.getMappedRange();new Uint8Array(m).set(new Uint8Array(o,i,u)),p.unmap();let g=this.backend.device.createCommandEncoder();g.copyBufferToBuffer(p,0,l.gpuData.buffer,0,d),this.backend.device.queue.submit([g.finish()]),p.destroy(),ge("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let o=this.storageCache.get(e);if(!o)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(r);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(o.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let u=bo(o.originalSize),d=this.backend.getCommandEncoder();this.backend.endComputePass(),d.copyBufferToBuffer(o.gpuData.buffer,0,i.gpuData.buffer,0,u)}registerExternalBuffer(e,r,o){let i;if(o){if(i=o[0],e===o[1])return ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=rl();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:r}),ge("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ge("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let o=h_(e),i,u=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,d=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(u||d){let m=(u?this.freeBuffers:this.freeUniformBuffers).get(o);m?m.length>0?i=m.pop():i=this.backend.device.createBuffer({size:o,usage:r}):i=this.backend.device.createBuffer({size:o,usage:r})}else i=this.backend.device.createBuffer({size:o,usage:r});let l={id:rl(),type:0,buffer:i};return this.storageCache.set(l.id,{gpuData:l,originalSize:Number(e)}),ge("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${l.id}`),l}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,o=this.storageCache.get(r);if(!o){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ge("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${o.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(o.gpuData.buffer),o.originalSize}async download(e,r){let o=this.storageCache.get(Number(e));if(!o)throw new Error("data does not exist");await _o(this.backend,o.gpuData.buffer,o.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=tl.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let o=this.freeBuffers.get(e.size)||[];r===void 0||o.length>=r?e.destroy():o.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let o=this.freeUniformBuffers.get(e.size)||[];r===void 0||o.length>=r?e.destroy():o.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(o=>{o.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ge("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(o=>{o.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ol=(...t)=>new wo(...t)});var vo,le,De=Q(()=>{"use strict";vo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=t=>new vo(t)});var Gt,xo,Ae,We,X,$e,So,Ht,ot,re,sn,L,K,al,un,$o,sl,he=Q(()=>{"use strict";ce();fe();Gt=64,xo=(t,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(t)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${t}`)}},Ae=(t,e=1)=>{let r=xo(t,e);return typeof r=="string"?r:r[0]},We=(t,e=1)=>{let r=xo(t,e);return typeof r=="string"?r:r[1]},X=(...t)=>{let e=[];return t.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:N.computeStrides(r)})}),e},$e=t=>t%4===0?4:t%2===0?2:1,So=(t="f32",e,r="0")=>!e||e===1?`${t}(${r})`:`vec${e}<${t}>(${r})`,Ht=(t,e,r)=>t==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,ot=(t,e)=>e===4?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:e===2?`(${t}.x + ${t}.y)`:e===3?`(${t}.x + ${t}.y + ${t}.z)`:t,re=(t,e,r,o)=>t.startsWith("uniforms.")&&r>4?typeof e=="string"?o==="f16"?`${t}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${t}[(${e}) / 4][(${e}) % 4]`:o==="f16"?`${t}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${t}[${Math.floor(e/4)}][${e%4}]`:r>1?`${t}[${e}]`:t,sn=(t,e,r,o,i)=>{let u=typeof r=="number",d=u?r:r.length,l=[...new Array(d).keys()],p=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,m=xo(e,i),g=typeof m=="string"?m:m[1],y=typeof m=="string"?m:m[0],w={indices:p,value:g,storage:y,tensor:e},$=q=>typeof q=="string"?q:`${q}u`,v={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},S=u?"uniforms.":"",k=`${S}${t}_shape`,C=`${S}${t}_strides`,I="";for(let q=0;q<d-1;q++)I+=`
    let dim${q} = current / ${re(C,q,d)};
    let rest${q} = current % ${re(C,q,d)};
    indices[${q}] = dim${q};
    current = rest${q};
    `;I+=`indices[${d-1}] = current;`;let E=d<2?"":`
  fn o2i_${t}(offset: u32) -> ${w.indices} {
    var indices: ${w.indices};
    var current = offset;
    ${I}
    return indices;
  }`,P=q=>(v.offsetToIndices=!0,d<2?q:`o2i_${t}(${q})`),M=[];if(d>=2)for(let q=d-1;q>=0;q--)M.push(`${re(C,q,d)} * (indices[${q}])`);let R=d<2?"":`
  fn i2o_${t}(indices: ${w.indices}) -> u32 {
    return ${M.join("+")};
  }`,W=q=>(v.indicesToOffset=!0,d<2?q:`i2o_${t}(${q})`),T=(...q)=>d===0?"0u":`${w.indices}(${q.map($).join(",")})`,j=(q,J)=>d<2?`${q}`:`${re(q,J,d)}`,Z=(q,J,Te)=>d<2?`${q}=${Te};`:`${re(q,J,d)}=${Te};`,oe={},te=(q,J)=>{v.broadcastedIndicesToOffset=!0;let Te=`${J.name}broadcastedIndicesTo${t}Offset`;if(Te in oe)return`${Te}(${q})`;let Ue=[];for(let Ee=d-1;Ee>=0;Ee--){let Ve=J.indicesGet("outputIndices",Ee+J.rank-d);Ue.push(`${j(C,Ee)} * (${Ve} % ${j(k,Ee)})`)}return oe[Te]=`fn ${Te}(outputIndices: ${J.type.indices}) -> u32 {
             return ${Ue.length>0?Ue.join("+"):"0u"};
           }`,`${Te}(${q})`},ue=(q,J)=>(()=>{if(w.storage===w.value)return`${t}[${q}]=${J};`;if(w.storage==="vec2<u32>"&&w.value==="i32")return`${t}[${q}]=vec2<u32>(u32(${J}), select(0u, 0xFFFFFFFFu, ${J} < 0));`;if(w.storage==="vec2<u32>"&&w.value==="u32")return`${t}[${q}]=vec2<u32>(u32(${J}), 0u);`;if(w.storage==="u32"&&w.value==="vec4<bool>")return`${t}[${q}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${J}));`;throw new Error(`not supported combination of storage type ${w.storage} and value type ${w.value} yet`)})(),G=q=>(()=>{if(w.storage===w.value)return`${t}[${q}]`;if(w.storage==="vec2<u32>"&&w.value==="i32")return`i32(${t}[${q}].x)`;if(w.storage==="vec2<u32>"&&w.value==="u32")return`u32(${t}[${q}].x)`;if(w.storage==="u32"&&w.value==="vec4<bool>")return`vec4<bool>(bool(${t}[${q}] & 0xFFu), bool(${t}[${q}] & 0xFF00u), bool(${t}[${q}] & 0xFF0000u), bool(${t}[${q}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${w.storage} and value type ${w.value} yet`)})(),Y=d<2?"":`
  fn get_${t}ByIndices(indices: ${w.indices}) -> ${g} {
    return ${G(`i2o_${t}(indices)`)};
  }`,ae=d<2?"":(()=>{let q=l.map(Te=>`d${Te}: u32`).join(", "),J=l.map(Te=>`d${Te}`).join(", ");return`
  fn get_${t}(${q}) -> ${g} {
    return get_${t}ByIndices(${T(J)});
  }`})(),se=(...q)=>{if(q.length!==d)throw new Error(`indices length must be ${d}`);let J=q.map($).join(",");return d===0?G("0u"):d===1?G(J[0]):(v.get=!0,v.getByIndices=!0,v.indicesToOffset=!0,`get_${t}(${J})`)},ie=q=>d<2?G(q):(v.getByIndices=!0,v.indicesToOffset=!0,`get_${t}ByIndices(${q})`),pe=d<2?"":`
  fn set_${t}ByIndices(indices: ${w.indices}, value: ${g}) {
    ${ue(`i2o_${t}(indices)`,"value")}
  }`,ye=d<2?"":(()=>{let q=l.map(Te=>`d${Te}: u32`).join(", "),J=l.map(Te=>`d${Te}`).join(", ");return`
  fn set_${t}(${q}, value: ${g}) {
    set_${t}ByIndices(${T(J)}, value);
  }`})();return{impl:()=>{let q=[],J=!1;return v.offsetToIndices&&(q.push(E),J=!0),v.indicesToOffset&&(q.push(R),J=!0),v.broadcastedIndicesToOffset&&(Object.values(oe).forEach(Te=>q.push(Te)),J=!0),v.set&&(q.push(ye),J=!0),v.setByIndices&&(q.push(pe),J=!0),v.get&&(q.push(ae),J=!0),v.getByIndices&&(q.push(Y),J=!0),!u&&J&&q.unshift(`const ${k} = ${w.indices}(${r.join(",")});`,`const ${C} = ${w.indices}(${N.computeStrides(r).join(",")});`),q.join(`
`)},type:w,offsetToIndices:P,indicesToOffset:W,broadcastedIndicesToOffset:te,indices:T,indicesGet:j,indicesSet:Z,set:(...q)=>{if(q.length!==d+1)throw new Error(`indices length must be ${d}`);let J=q[d];if(typeof J!="string")throw new Error("value must be string");let Te=q.slice(0,d).map($).join(",");return d===0?ue("0u",J):d===1?ue(Te[0],J):(v.set=!0,v.setByIndices=!0,v.indicesToOffset=!0,`set_${t}(${Te}, ${J})`)},setByOffset:ue,setByIndices:(q,J)=>d<2?ue(q,J):(v.setByIndices=!0,v.indicesToOffset=!0,`set_${t}ByIndices(${q}, ${J});`),get:se,getByOffset:G,getByIndices:ie,usage:o,name:t,strides:C,shape:k,rank:d}},L=(t,e,r,o=1)=>sn(t,e,r,"input",o),K=(t,e,r,o=1)=>sn(t,e,r,"output",o),al=(t,e,r)=>sn(t,e,r,"atomicOutput",1),un=(t,e,r,o=1)=>sn(t,e,r,"internal",o),$o=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Gt){let r=typeof e=="number"?e:e[0],o=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||o>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${o}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*o*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${o}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let u=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,d=u?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,l=u?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*o*i}u + local_idx;`;return`@compute @workgroup_size(${r}, ${o}, ${i})
  fn main(${d}) {
    ${l}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let o=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${o}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,o=1){return this.uniforms.push({name:e,type:r,length:o}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:o,length:i}of this.uniforms)if(i&&i>4)o==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${o}>, ${Math.ceil(i/8)}>`):e.push(`${r}:array<vec4<${o}>, ${Math.ceil(i/4)}>`);else{let u=i==null||i===1?o:`vec${i}<${o}>`;e.push(`${r}:${u}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},sl=(t,e)=>new $o(t,e)});var y_,ul,b_,w_,__,v_,Ge,dl,cl,$t=Q(()=>{"use strict";ce();fe();De();he();y_=(t,e)=>{if(!t||t.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==t[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${t[0].dims.length}`)},ul=(t,e)=>e.length!==0?e:[...new Array(t).keys()].reverse(),b_=(t,e)=>N.sortBasedOnPerm(t,ul(t.length,e)),w_=(t,e,r,o)=>{let i=`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let u=0;u<e;++u)i+=`a[${t[u]}]=i[${u}];`;return i+="return a;}"},__=(t,e)=>{let r=[],o=[];for(let i=0;i<t.length;++i)t[i]!==1&&r.push(t[i]),t[e[i]]!==1&&o.push(e[i]);return{newShape:r,newPerm:o}},v_=(t,e)=>{let r=0;for(let o=0;o<t.length;++o)if(e[t[o]]!==1){if(t[o]<r)return!1;r=t[o]}return!0},Ge=(t,e)=>{let r=t.dataType,o=t.dims.length,i=ul(o,e),u=b_(t.dims,i),d=t.dims,l=u,p=o<2||v_(i,t.dims),m;if(p)return m=S=>{let k=L("input",r,d,4),C=K("output",r,l,4);return`
  ${S.registerUniform("output_size","u32").declareVariables(k,C)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=N.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(S/64/4)},programUniforms:[{type:12,data:Math.ceil(S/4)}]}},getShaderSource:m};let{newShape:g,newPerm:y}=__(t.dims,i),w=N.areEqual(y,[2,3,1]),$=N.areEqual(y,[3,1,2]);if(g.length===2||w||$){d=w?[g[0],g[1]*g[2]]:$?[g[0]*g[1],g[2]]:g,l=[d[1],d[0]];let S=16;return m=k=>{let C=L("a",r,d.length),I=K("output",r,l.length);return`
  ${k.registerUniform("output_size","u32").declareVariables(C,I)}
  var<workgroup> tile : array<array<${I.type.value}, ${S+1}>, ${S}>;
  ${k.mainStart([S,S,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${S} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${S}u + local_id.x;
    let input_row = workgroup_id_x * ${S}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${C.getByIndices(`${C.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${S}u + local_id.x;
    let output_row = workgroup_id_y * ${S}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${I.setByIndices(`${I.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let k=N.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(l[1]/S),y:Math.ceil(l[0]/S)},programUniforms:[{type:12,data:k},...X(d,l)]}},getShaderSource:m}}return m=S=>{let k=L("a",r,d.length),C=K("output",r,l.length);return`
  ${S.registerUniform("output_size","u32").declareVariables(k,C)}

  ${w_(i,o,k,C)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${C.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${C.setByOffset("global_idx",k.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let S=N.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...X(d,l)]}},getShaderSource:m}},dl=(t,e)=>{y_(t.inputs,e.perm),t.compute(Ge(t.inputs[0],e.perm))},cl=t=>le({perm:t.perm})});var $_,x_,S_,T_,I_,C_,A_,k_,E_,P_,mt,ll,pl,fl,ml,hl,gl,yl,bl,wl,_l,vl=Q(()=>{"use strict";ce();fe();he();dn();$t();$_={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},x_={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},S_={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},T_={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},I_=(t,e)=>{let r=[];for(let o=e-t;o<e;++o)r.push(o);return r},C_=(t,e)=>{let r=[],o=t.length;for(let u=0;u<o;u++)e.indexOf(u)===-1&&r.push(t[u]);let i=e.map(u=>t[u]);return[r,i]},A_=(t,e)=>{let r=t.length+e.length,o=[],i=0;for(let u=0;u<r;u++)e.indexOf(u)===-1?o.push(t[i++]):o.push(1);return o},k_=(t,e)=>{for(let r=0;r<t.length;++r)if(t[t.length-r-1]!==e-1-r)return!1;return!0},E_=(t,e)=>{let r=[];if(!k_(t,e)){for(let o=0;o<e;++o)t.indexOf(o)===-1&&r.push(o);t.forEach(o=>r.push(o))}return r},P_=(t,e,r,o,i,u,d)=>{let l=r[0].dims,p=N.size(u),m=N.size(d),g=L("_A",r[0].dataType,l),y=K("output",i,u),w=64;p===1&&(w=256);let $=`
          var<workgroup> aBestValues : array<f32, ${w}>;
       `,v=S=>`
        ${S.registerUniform("reduceSize","u32").declareVariables(g,y)}
        ${$}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${S.mainStart(w)}

          let outputIndex = global_idx / ${w};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${S_[o]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${w}) {
           let candidate = f32(${g.getByOffset("offset + k")});
           bestValue = ${$_[o]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${w}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${x_[o]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${y.setByOffset("outputIndex",`${o==="mean"?`${y.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${y.type.storage}(${T_[o]})`}`)};
         }
        }`;return{name:t,shaderCache:{hint:`${e};${w}`,inputDependencies:["type"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:p},programUniforms:[{type:12,data:m}]})}},mt=(t,e,r,o)=>{let i=t.inputs.length===1?r:To(t.inputs,r),u=i.axes;u.length===0&&!i.noopWithEmptyAxes&&(u=t.inputs[0].dims.map(($,v)=>v));let d=N.normalizeAxes(u,t.inputs[0].dims.length),l=d,p=t.inputs[0],m=E_(l,t.inputs[0].dims.length);m.length>0&&(p=t.compute(Ge(t.inputs[0],m),{inputs:[0],outputs:[-1]})[0],l=I_(l.length,p.dims.length));let[g,y]=C_(p.dims,l),w=g;i.keepDims&&(w=A_(g,d)),t.compute(P_(e,i.cacheKey,[p],o,t.inputs[0].dataType,w,y),{inputs:[p]})},ll=(t,e)=>{mt(t,"ReduceMeanShared",e,"mean")},pl=(t,e)=>{mt(t,"ReduceL1Shared",e,"l1")},fl=(t,e)=>{mt(t,"ReduceL2Shared",e,"l2")},ml=(t,e)=>{mt(t,"ReduceLogSumExpShared",e,"logSumExp")},hl=(t,e)=>{mt(t,"ReduceMaxShared",e,"max")},gl=(t,e)=>{mt(t,"ReduceMinShared",e,"min")},yl=(t,e)=>{mt(t,"ReduceProdShared",e,"prod")},bl=(t,e)=>{mt(t,"ReduceSumShared",e,"sum")},wl=(t,e)=>{mt(t,"ReduceSumSquareShared",e,"sumSquare")},_l=(t,e)=>{mt(t,"ReduceLogSumShared",e,"logSum")}});var ht,O_,cn,To,gt,z_,D_,B_,M_,R_,U_,N_,V_,L_,W_,yt,$l,xl,Sl,Tl,Il,Cl,Al,kl,El,Pl,dn=Q(()=>{"use strict";ce();fe();De();he();vl();ht=t=>{if(!t||t.length===0||t.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(t.length===2&&t[1].dims.length!==1)throw new Error("Invalid axes input dims.")},O_=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],cn=(t,e,r,o,i,u,d=!1,l=!1)=>{let p=[],m=r[0].dims,g=m.length,y=N.normalizeAxes(i,g),w=!l&&y.length===0;m.forEach((k,C)=>{w||y.indexOf(C)>=0?d&&p.push(1):p.push(k)});let $=p.length,v=N.size(p);return{name:t,shaderCache:e,getShaderSource:k=>{let C=[],I=L("_A",r[0].dataType,g),E=K("output",u,$),P=o(I,E,y),M=P[2];for(let R=0,W=0;R<g;R++)w||y.indexOf(R)>=0?(d&&W++,M=`for(var j${R}: u32 = 0; j${R} < ${m[R]}; j${R}++) {
                  ${P[2].includes("last_index")?`let last_index = j${R};`:""}
                  ${I.indicesSet("input_indices",R,`j${R}`)}
                  ${M}
                }`):(C.push(`${I.indicesSet("input_indices",R,E.indicesGet("output_indices",W))};`),W++);return`

        ${k.registerUniform("output_size","u32").declareVariables(I,E)}

        ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${I.type.indices};
          let output_indices = ${E.offsetToIndices("global_idx")};

          ${C.join(`
`)}
          ${P[0]}       // init ops for reduce max/min
          ${P[1]}
          ${M}
          ${P[3]}
          ${P.length===4?E.setByOffset("global_idx","value"):P.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:p,dataType:u}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...X(m,p)]})}},To=(t,e)=>{let r=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(o=>r.push(Number(o))),le({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},gt=(t,e,r,o)=>{let i=t.inputs,u=i.length===1?r:To(i,r);t.compute(cn(e,{hint:u.cacheKey,inputDependencies:["rank"]},[i[0]],u.noopWithEmptyAxes&&u.axes.length===0?O_:o,u.axes,i[0].dataType,u.keepDims,u.noopWithEmptyAxes),{inputs:[0]})},z_=(t,e)=>{ht(t.inputs),gt(t,"ReduceLogSum",e,(o,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,"value = log(value);"])},D_=(t,e)=>{ht(t.inputs),gt(t,"ReduceL1",e,(o,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${o.getByIndices("input_indices")});`,""])},B_=(t,e)=>{ht(t.inputs),gt(t,"ReduceL2",e,(o,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},M_=(t,e)=>{ht(t.inputs),gt(t,"ReduceLogSumExp",e,(o,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${o.getByIndices("input_indices")});`,"value = log(value);"])},R_=(t,e)=>{ht(t.inputs),gt(t,"ReduceMax",e,(o,i,u)=>{let d=[];for(let l=0;l<o.rank;l++)(u.indexOf(l)>=0||u.length===0)&&d.push(o.indicesSet("input_indices",l,0));return[`${d.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = max(value, ${o.getByIndices("input_indices")});`,""]})},U_=(t,e)=>{ht(t.inputs),gt(t,"ReduceMean",e,(o,i,u)=>{let d=1;for(let l=0;l<o.rank;l++)(u.indexOf(l)>=0||u.length===0)&&(d*=t.inputs[0].dims[l]);return["var sum = f32(0);","",`sum += f32(${o.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${d});`]})},N_=(t,e)=>{ht(t.inputs),gt(t,"ReduceMin",e,(o,i,u)=>{let d=[];for(let l=0;l<o.rank;l++)(u.indexOf(l)>=0||u.length===0)&&d.push(`input_indices[${l}] = 0;`);return[`${d.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};`,`value = min(value, ${o.getByIndices("input_indices")});`,""]})},V_=(t,e)=>{ht(t.inputs),gt(t,"ReduceProd",e,(o,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${o.getByIndices("input_indices")};`,""])},L_=(t,e)=>{ht(t.inputs),gt(t,"ReduceSum",e,(o,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${o.getByIndices("input_indices")};`,""])},W_=(t,e)=>{ht(t.inputs),gt(t,"ReduceSumSquare",e,(o,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${o.getByIndices("input_indices")}; value += t * t;`,""])},yt=(t,e,r)=>{if(e.length===0)return r;let o=1,i=1;for(let u=0;u<e.length;u++)e.indexOf(u)===-1?o*=t[u]:i*=t[u];return i<32&&o>1024},$l=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?U_(t,e):ll(t,e)},xl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?D_(t,e):pl(t,e)},Sl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?B_(t,e):fl(t,e)},Tl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?M_(t,e):ml(t,e)},Il=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?R_(t,e):hl(t,e)},Cl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?N_(t,e):gl(t,e)},Al=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?V_(t,e):yl(t,e)},kl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?L_(t,e):bl(t,e)},El=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?W_(t,e):wl(t,e)},Pl=(t,e)=>{yt(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?z_(t,e):_l(t,e)}});var Ol,zl,Dl,Io,Bl=Q(()=>{"use strict";ce();De();dn();Ol=t=>{if(!t||t.length===0||t.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(t[0].dataType!==1)throw new Error("Invalid input type.")},zl=(t,e)=>{Ol(t.inputs);let r=(o,i,u)=>{let d=[];for(let l=0;l<o.rank;l++)(u.indexOf(l)>=0||u.length===0)&&d.push(`input_indices[${l}] = 0;`);return[`${d.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};t.compute(cn("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},Dl=(t,e)=>{Ol(t.inputs);let r=(o,i,u)=>{let d=[];for(let l=0;l<o.rank;l++)(u.indexOf(l)>=0||u.length===0)&&d.push(`input_indices[${l}] = 0;`);return[`${d.join(`
`)}`,`var value = ${o.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${o.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${o.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};t.compute(cn("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},Io=t=>le(t)});var G_,Co,H_,F_,q_,Yt,j_,Ml,ln=Q(()=>{"use strict";ce();fe();an();he();G_=(t,e)=>{let r=t[0],o=t[1],i=t[2],u=t[3],d=t[4],l=t[5];if(d&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let p=r.dims[0],m=r.dims[1],g=r.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(o.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(o.dims[0]!==g)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==o.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let y=i.dims[0]/3,w=y,$=w;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let E of e.qkvHiddenSizes)if(E%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");y=e.qkvHiddenSizes[0],w=e.qkvHiddenSizes[1],$=e.qkvHiddenSizes[2]}let v=m;if(y!==w)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==y+w+$)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let S=0;if(d){if(w!==$)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(d.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(d.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(d.dims[1]!==p)throw new Error('Input "past" second dimension must be batch_size');if(d.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(d.dims[4]!==w/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(S=d.dims[3])}let k=v+S,C=-1,I=0;if(u)throw new Error("Mask not supported");if(d)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==e.numHeads||l.dims[2]!==m||l.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:m,pastSequenceLength:S,kvSequenceLength:v,totalSequenceLength:k,maxSequenceLength:C,inputHiddenSize:g,hiddenSize:y,vHiddenSize:$,headSize:Math.floor(y/e.numHeads),vHeadSize:Math.floor($/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Co=(t,e,r)=>e&&t?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${t?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,H_=(t,e,r,o,i,u,d,l)=>{let p=$e(d?1:u),m=64,g=u/p;g<m&&(m=32);let y=Math.ceil(u/p/m),w=[{type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:i},{type:12,data:g},{type:12,data:y}],$=Ae(t.dataType,p),v=We(1,p),S=["type"];d&&S.push("type"),l&&S.push("type");let k=C=>{let I=K("x",t.dataType,t.dims,p),E=[I],P=d?L("seq_lens",d.dataType,d.dims):void 0;P&&E.push(P);let M=l?L("total_sequence_length_input",l.dataType,l.dims):void 0;M&&E.push(M);let R=We(t.dataType),W=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${m}>;
  var<workgroup> thread_sum: array<f32, ${m}>;
  ${C.registerUniforms(W).declareVariables(...E)}
  ${C.mainStart([m,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Co(P,M,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${m}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${d?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${v}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${v}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(p){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${m}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${v}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${v}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(p){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${m}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${I.type.value}(${R}(1.0) / ${R}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${v}(x[offset + i]);
        x[offset + i] = ${I.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${d?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${I.type.value}(${R}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${m};${$};${p}`,inputDependencies:S},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:e*r},programUniforms:w})}},F_=(t,e,r,o,i,u,d,l,p)=>{let m=d+u.kvSequenceLength,g=[u.batchSize,u.numHeads,u.sequenceLength,m],y=t>1&&o,w=u.kvNumHeads?u.kvNumHeads:u.numHeads,$=y?[u.batchSize,w,m,u.headSize]:void 0,v=u.nReps?u.nReps:1,S=u.scale===0?1/Math.sqrt(u.headSize):u.scale,k=$e(u.headSize),C=u.headSize/k,I=12,E={x:Math.ceil(m/I),y:Math.ceil(u.sequenceLength/I),z:u.batchSize*u.numHeads},P=[{type:12,data:u.sequenceLength},{type:12,data:C},{type:12,data:m},{type:12,data:u.numHeads},{type:12,data:u.headSize},{type:1,data:S},{type:12,data:d},{type:12,data:u.kvSequenceLength},{type:12,data:v}],M=y&&o&&N.size(o.dims)>0,R=["type","type"];M&&R.push("type"),i&&R.push("type"),l&&R.push("type"),p&&R.push("type");let W=[{dims:g,dataType:e.dataType,gpuDataType:0}];y&&W.push({dims:$,dataType:e.dataType,gpuDataType:0});let T=j=>{let Z=L("q",e.dataType,e.dims,k),oe=L("key",r.dataType,r.dims,k),te=[Z,oe];if(M){let pe=L("past_key",o.dataType,o.dims,k);te.push(pe)}i&&te.push(L("attention_bias",i.dataType,i.dims));let ue=l?L("seq_lens",l.dataType,l.dims):void 0;ue&&te.push(ue);let G=p?L("total_sequence_length_input",p.dataType,p.dims):void 0;G&&te.push(G);let Y=K("output",e.dataType,g),ae=[Y];y&&ae.push(K("present_key",e.dataType,$,k));let se=We(1,k),ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${I}u;

  var<workgroup> tileQ: array<${Z.type.storage}, ${I*I}>;
  var<workgroup> tileK: array<${Z.type.storage}, ${I*I}>;
  ${j.registerUniforms(ie).declareVariables(...te,...ae)}
  ${j.mainStart([I,I,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${v===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${v===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Co(ue,G,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${M&&y?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${y?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${se}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${M&&y?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${y?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${se}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${Y.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${i!==void 0};${o!==void 0};${t}`,inputDependencies:R},getRunData:()=>({outputs:W,dispatchGroup:E,programUniforms:P}),getShaderSource:T}},q_=(t,e,r,o,i,u,d=void 0,l=void 0)=>{let p=u+i.kvSequenceLength,m=i.nReps?i.nReps:1,g=i.vHiddenSize*m,y=t>1&&o,w=i.kvNumHeads?i.kvNumHeads:i.numHeads,$=y?[i.batchSize,w,p,i.headSize]:void 0,v=[i.batchSize,i.sequenceLength,g],S=12,k={x:Math.ceil(i.vHeadSize/S),y:Math.ceil(i.sequenceLength/S),z:i.batchSize*i.numHeads},C=[{type:12,data:i.sequenceLength},{type:12,data:p},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:g},{type:12,data:u},{type:12,data:i.kvSequenceLength},{type:12,data:m}],I=y&&o&&N.size(o.dims)>0,E=["type","type"];I&&E.push("type"),d&&E.push("type"),l&&E.push("type");let P=[{dims:v,dataType:e.dataType,gpuDataType:0}];y&&P.push({dims:$,dataType:e.dataType,gpuDataType:0});let M=R=>{let W=L("probs",e.dataType,e.dims),T=L("v",r.dataType,r.dims),j=[W,T];I&&j.push(L("past_value",o.dataType,o.dims));let Z=d?L("seq_lens",d.dataType,d.dims):void 0;d&&j.push(Z);let oe=l?L("total_sequence_length_input",l.dataType,l.dims):void 0;l&&j.push(oe);let ue=[K("output",e.dataType,v)];y&&ue.push(K("present_value",e.dataType,$));let G=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${S}u;
  var<workgroup> tileQ: array<${W.type.value}, ${S*S}>;
  var<workgroup> tileV: array<${W.type.value}, ${S*S}>;
  ${R.registerUniforms(G).declareVariables(...j,...ue)}
  ${R.mainStart([S,S,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Co(Z,oe,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${I&&y?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${y?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${W.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${I&&y?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${y?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${o!==void 0};${t}`,inputDependencies:E},getRunData:()=>({outputs:P,dispatchGroup:k,programUniforms:C}),getShaderSource:M}},Yt=(t,e,r,o,i,u,d,l,p,m,g=void 0,y=void 0)=>{let w=Math.min(t.outputCount,1+(d?1:0)+(l?1:0)),$=w>1?m.pastSequenceLength:0,v=$+m.kvSequenceLength,S=p&&N.size(p.dims)>0?p:void 0,k=[e,r];w>1&&d&&N.size(d.dims)>0&&k.push(d),S&&k.push(S),g&&k.push(g),y&&k.push(y);let C=t.compute(F_(w,e,r,d,S,m,$,g,y),{inputs:k,outputs:w>1?[-1,1]:[-1]})[0];t.compute(H_(C,m.batchSize,m.numHeads,$,m.sequenceLength,v,g,y),{inputs:g&&y?[C,g,y]:[C],outputs:[]});let I=[C,o];w>1&&l&&N.size(l.dims)>0&&I.push(l),g&&I.push(g),y&&I.push(y),t.compute(q_(w,C,o,l,m,$,g,y),{inputs:I,outputs:w>1?[0,2]:[0]})},j_=(t,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],o=e.sequenceLength,i=e.inputHiddenSize,u=e.headSize,d=12,l={x:Math.ceil(e.headSize/d),y:Math.ceil(e.sequenceLength/d),z:e.batchSize*e.numHeads},p=[t.inputs[0],t.inputs[1],t.inputs[2]],m=[{type:12,data:o},{type:12,data:i},{type:12,data:u},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],g=y=>{let w=K("output_q",p[0].dataType,r),$=K("output_k",p[0].dataType,r),v=K("output_v",p[0].dataType,r),S=L("input",p[0].dataType,p[0].dims),k=L("weight",p[1].dataType,p[1].dims),C=L("bias",p[2].dataType,p[2].dims),I=S.type.storage,E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${d}u;
  var<workgroup> tileInput: array<${I}, ${d*d}>;
  var<workgroup> tileWeightQ: array<${I}, ${d*d}>;
  var<workgroup> tileWeightK: array<${I}, ${d*d}>;
  var<workgroup> tileWeightV: array<${I}, ${d*d}>;
  ${y.registerUniforms(E).declareVariables(S,k,C,w,$,v)}
  ${y.mainStart([d,d,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${I}(0);
    var valueK = ${I}(0);
    var valueV = ${I}(0);
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
  }`};return t.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:m}),getShaderSource:g},{inputs:p,outputs:[-1,-1,-1]})},Ml=(t,e)=>{let r=G_(t.inputs,e),[o,i,u]=j_(t,r);return Yt(t,o,i,u,t.inputs[4],void 0,void 0,void 0,t.inputs[5],r)}});var K_,Z_,Q_,Rl,Ul=Q(()=>{"use strict";Ye();ce();fe();De();he();K_=(t,e)=>{if(!t||t.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(o,i,u)=>{let d=i.length;if(d!==o.length)throw new Error(`${u}: num dimensions != ${d}`);i.forEach((l,p)=>{if(l!==o[p])throw new Error(`${u}: dim[${p}] do not match`)})};if(t[0].dims.length>1){let o=e.format==="NHWC"?e.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,e.spatial?2:void 0);r(t[1].dims,o,"Invalid input scale"),r(t[2].dims,o,"Invalid input B"),r(t[3].dims,o,"Invalid input mean"),r(t[4].dims,o,"Invalid input var")}else r(t[1].dims,[1],"Invalid input scale"),r(t[2].dims,[1],"Invalid input B"),r(t[3].dims,[1],"Invalid input mean"),r(t[4].dims,[1],"Invalid input var")},Z_=(t,e)=>{let{epsilon:r,spatial:o,format:i}=e,u=t[0].dims,d=o?$e(u[u.length-1]):1,l=i==="NHWC"&&u.length>1?d:1,p=N.size(u)/d,m=o,g=m?u.length:u,y=L("x",t[0].dataType,t[0].dims,d),w=L("scale",t[1].dataType,t[1].dims,l),$=L("bias",t[2].dataType,t[2].dims,l),v=L("inputMean",t[3].dataType,t[3].dims,l),S=L("inputVar",t[4].dataType,t[4].dims,l),k=K("y",t[0].dataType,g,d),C=()=>{let E="";if(o)E=`let cOffset = ${u.length===1?"0u":i==="NHWC"?`outputIndices[${u.length-1}] / ${d}`:"outputIndices[1]"};`;else if(i==="NCHW")E=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{E=`var cIndices = ${w.type.indices}(0);
                       cIndices[0] = outputIndices[${u.length-1}];`;for(let P=1;P<w.rank;P++)E+=`cIndices[${P}] = outputIndices[${P}];`;E+=`let cOffset = ${w.indicesToOffset("cIndices")};`}return E},I=E=>`
  const epsilon = ${r};
  ${E.registerUniform("outputSize","u32").declareVariables(y,w,$,v,S,k)}
  ${E.mainStart()}
  ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${d}`)};
    ${C()}
    let scale = ${w.getByOffset("cOffset")};
    let bias = ${$.getByOffset("cOffset")};
    let inputMean = ${v.getByOffset("cOffset")};
    let inputVar = ${S.getByOffset("cOffset")};
    let x = ${y.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${o}_${d}`,inputDependencies:m?["rank","type","type","type","type"]:void 0},getShaderSource:I,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m?[{type:12,data:p},...X(u)]:[{type:12,data:p}]})}},Q_=t=>le(t),Rl=(t,e)=>{let{inputs:r,outputCount:o}=t,i=Q_({...e,outputCount:o});if(Ce.webgpu.validateInputContent&&K_(r,i),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");t.compute(Z_(r,i))}});var Y_,X_,Nl,Vl=Q(()=>{"use strict";fe();he();Y_=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},X_=t=>{let e=t[0].dims,r=t[0].dims[2],o=N.size(e)/4,i=t[0].dataType,u=L("input",i,e,4),d=L("bias",i,[r],4),l=L("residual",i,e,4),p=K("output",i,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:g=>`
  const channels = ${r}u / 4;
  ${g.declareVariables(u,d,l,p)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let value = ${u.getByOffset("global_idx")}
      + ${d.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${p.setByOffset("global_idx","value")}
  }`}},Nl=t=>{Y_(t.inputs),t.compute(X_(t.inputs))}});var J_,Se,Ll,Wl,Gl,Hl,Fl,ql,jl,Kl,Zl,ev,Ql,Yl,Xl,Jl,fr,ep,pn,tp,rp,np,op,ip,ap,sp,up,dp,cp,lp,pp,fp,mp,hp,gp,yp,bp,Ao,ko,wp,_p,vp,tv,rv,$p,fn=Q(()=>{"use strict";ce();fe();De();he();J_=(t,e,r,o,i,u,d)=>{let l=Math.ceil(e/4),p="";typeof i=="string"?p=`${i}(a)`:p=i("a");let m=L("inputData",r,[l],4),g=K("outputData",o,[l],4),y=[{name:"vec_size",type:"u32"}];return d&&y.push(...d),`
      ${t.registerUniforms(y).declareVariables(m,g)}

  ${u??""}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${m.getByOffset("global_idx")};
    ${g.setByOffset("global_idx",p)}
  }`},Se=(t,e,r,o,i,u=t.dataType,d,l)=>{let p=[{type:12,data:Math.ceil(N.size(t.dims)/4)}];return d&&p.push(...d),{name:e,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:m=>J_(m,N.size(t.dims),t.dataType,u,r,o,l),getRunData:m=>({outputs:[{dims:t.dims,dataType:u}],dispatchGroup:{x:Math.ceil(N.size(m[0].dims)/64/4)},programUniforms:p})}},Ll=t=>{t.compute(Se(t.inputs[0],"Abs","abs"))},Wl=t=>{t.compute(Se(t.inputs[0],"Acos","acos"))},Gl=t=>{t.compute(Se(t.inputs[0],"Acosh","acosh"))},Hl=t=>{t.compute(Se(t.inputs[0],"Asin","asin"))},Fl=t=>{t.compute(Se(t.inputs[0],"Asinh","asinh"))},ql=t=>{t.compute(Se(t.inputs[0],"Atan","atan"))},jl=t=>{t.compute(Se(t.inputs[0],"Atanh","atanh"))},Kl=t=>le(t),Zl=(t,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}t.compute(Se(t.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},ev=t=>{let e,r,o=t.length>=2&&t[1].data!==0,i=t.length>=3&&t[2].data!==0;switch(t[0].dataType){case 1:e=o?t[1].getFloat32Array()[0]:-34028234663852886e22,r=i?t[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=o?t[1].getUint16Array()[0]:64511,r=i?t[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return le({min:e,max:r})},Ql=(t,e)=>{let r=e||ev(t.inputs),o=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"Clip",i=>`clamp(${i}, vec4<${o}>(uniforms.min), vec4<${o}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:t.inputs[0].dataType,data:r.min},{type:t.inputs[0].dataType,data:r.max}],[{name:"min",type:o},{name:"max",type:o}]),{inputs:[0]})},Yl=t=>{t.compute(Se(t.inputs[0],"Ceil","ceil"))},Xl=t=>{t.compute(Se(t.inputs[0],"Cos","cos"))},Jl=t=>{t.compute(Se(t.inputs[0],"Cosh","cosh"))},fr=t=>le(t),ep=(t,e)=>{let r=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"Elu",o=>`elu_vf32(${o})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},pn=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,tp=t=>{let e=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"Erf",r=>`erf_vf32(${r})`,pn(e)))},rp=t=>{t.compute(Se(t.inputs[0],"Exp","exp"))},np=t=>{t.compute(Se(t.inputs[0],"Floor","floor"))},op=t=>{let e=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,pn(e)))},ip=(t,e)=>{let r=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"LeakyRelu",o=>`select(leaky_relu_alpha_ * ${o}, ${o}, ${o} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},ap=t=>{t.compute(Se(t.inputs[0],"Not",e=>`!${e}`))},sp=t=>{t.compute(Se(t.inputs[0],"Neg",e=>`-${e}`))},up=t=>{t.compute(Se(t.inputs[0],"Reciprocal",e=>`1.0/${e}`))},dp=t=>{let e=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},cp=t=>{t.compute(Se(t.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},lp=t=>le(t),pp=(t,e)=>{let r=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"HardSigmoid",o=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${o} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},fp=t=>{t.compute(Se(t.inputs[0],"Sin","sin"))},mp=t=>{t.compute(Se(t.inputs[0],"Sinh","sinh"))},hp=t=>{t.compute(Se(t.inputs[0],"Sqrt","sqrt"))},gp=t=>{t.compute(Se(t.inputs[0],"Tan","tan"))},yp=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,bp=t=>{t.compute(Se(t.inputs[0],"Tanh",yp))},Ao=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${yp("v")};
}
`,ko=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,wp=t=>{let e=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"FastGelu",ko,Ao(e),void 0,t.inputs[0].dataType))},_p=(t,e)=>{let r=We(t.inputs[0].dataType);return t.compute(Se(t.inputs[0],"ThresholdedRelu",o=>`select(vec4<${r}>(0.0), ${o}, ${o} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},vp=t=>{t.compute(Se(t.inputs[0],"Log","log"))},tv=(t,e)=>`
const alpha = vec4<${t}>(${e});
const one = ${t}(1.0);
const zero = ${t}(0.0);

fn quick_gelu_impl(x: vec4<${t}>) -> vec4<${t}> {
  let v = x *alpha;
  var x1 : vec4<${t}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,rv=t=>`quick_gelu_impl(${t})`,$p=(t,e)=>{let r=We(t.inputs[0].dataType);t.compute(Se(t.inputs[0],"QuickGelu",rv,tv(r,e.alpha),e.cacheKey,t.inputs[0].dataType))}});var nv,ov,Sp,Tp=Q(()=>{"use strict";fe();he();fn();nv=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},ov=t=>{let e=t[0].dims.slice();e[2]=e[2]/2;let r=L("input",t[0].dataType,t[0].dims,4),o=L("bias",t[0].dataType,[t[0].dims[2]],4),i=K("output",t[0].dataType,e,4),u=N.size(e)/4,d=Ae(t[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)}}),getShaderSource:p=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${p.declareVariables(r,o,i)}

  ${pn(d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(u)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Sp=t=>{nv(t.inputs),t.compute(ov(t.inputs))}});var iv,av,bt,Ip,Cp,Ap,kp,Ep,Pp,Op,zp,Dp,Bp,Mp=Q(()=>{"use strict";ce();fe();he();iv=(t,e,r,o,i,u,d,l,p,m,g,y)=>{let w,$;typeof l=="string"?w=$=(I,E)=>`${l}((${I}),(${E}))`:typeof l=="function"?w=$=l:(w=l.scalar,$=l.vector);let v=K("outputData",g,o.length,4),S=L("aData",p,e.length,4),k=L("bData",m,r.length,4),C;if(i)if(u){let I=N.size(e)===1,E=N.size(r)===1,P=e.length>0&&e[e.length-1]%4===0,M=r.length>0&&r[r.length-1]%4===0;I||E?C=v.setByOffset("global_idx",$(I?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"),E?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):C=`
            let outputIndices = ${v.offsetToIndices("global_idx * 4u")};
            let offsetA = ${S.broadcastedIndicesToOffset("outputIndices",v)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",v)};
            ${v.setByOffset("global_idx",$(d||P?S.getByOffset("offsetA / 4u"):`${S.type.value}(${S.getByOffset("offsetA / 4u")}[offsetA % 4u])`,d||M?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else C=v.setByOffset("global_idx",$(S.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!u)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let I=(E,P,M="")=>{let R=`aData[indexA${P}][componentA${P}]`,W=`bData[indexB${P}][componentB${P}]`;return`
            let outputIndices${P} = ${v.offsetToIndices(`global_idx * 4u + ${P}u`)};
            let offsetA${P} = ${S.broadcastedIndicesToOffset(`outputIndices${P}`,v)};
            let offsetB${P} = ${k.broadcastedIndicesToOffset(`outputIndices${P}`,v)};
            let indexA${P} = offsetA${P} / 4u;
            let indexB${P} = offsetB${P} / 4u;
            let componentA${P} = offsetA${P} % 4u;
            let componentB${P} = offsetB${P} % 4u;
            ${E}[${P}] = ${M}(${w(R,W)});
          `};g===9?C=`
            var data = vec4<u32>(0);
            ${I("data",0,"u32")}
            ${I("data",1,"u32")}
            ${I("data",2,"u32")}
            ${I("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:C=`
            ${I("outputData[global_idx]",0)}
            ${I("outputData[global_idx]",1)}
            ${I("outputData[global_idx]",2)}
            ${I("outputData[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(S,k,v)}

        ${y??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${C}
      }`},av=(t,e,r,o,i,u,d=r.dataType)=>{let l=r.dims.map(Number),p=o.dims.map(Number),m=!N.areEqual(l,p),g=l,y=N.size(l),w=!1,$=!1,v=[m];if(m){let S=ft.calcShape(l,p,!1);if(!S)throw new Error("Can't perform binary op on the given tensors");g=S.slice(),y=N.size(g);let k=N.size(l)===1,C=N.size(p)===1,I=l.length>0&&l[l.length-1]%4===0,E=p.length>0&&p[p.length-1]%4===0;v.push(k),v.push(C),v.push(I),v.push(E);let P=1;for(let M=1;M<g.length;M++){let R=l[l.length-M],W=p[p.length-M];if(R===W)P*=R;else break}P%4===0?($=!0,w=!0):(k||C||I||E)&&(w=!0)}else w=!0;return v.push(w),{name:t,shaderCache:{hint:e+v.map(S=>S.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:S=>iv(S,l,p,g,w,m,$,i,r.dataType,o.dataType,d,u),getRunData:()=>({outputs:[{dims:g,dataType:d}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(N.size(g)/4)},...X(l,p,g)]})}},bt=(t,e,r,o,i,u)=>{t.compute(av(e,i??"",t.inputs[0],t.inputs[1],r,o,u))},Ip=t=>{bt(t,"Add",(e,r)=>`${e}+${r}`)},Cp=t=>{bt(t,"Div",(e,r)=>`${e}/${r}`)},Ap=t=>{bt(t,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},kp=t=>{bt(t,"Mul",(e,r)=>`${e}*${r}`)},Ep=t=>{let e=L("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;bt(t,"Pow",{scalar:(o,i)=>`pow_custom(${o},${i})`,vector:(o,i)=>`pow_vector_custom(${o},${i})`},`
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
      `)},Pp=t=>{bt(t,"Sub",(e,r)=>`${e}-${r}`)},Op=t=>{bt(t,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},zp=t=>{bt(t,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},Dp=t=>{bt(t,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},Bp=t=>{bt(t,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var uv,dv,cv,lv,Rp,Up,Np=Q(()=>{"use strict";ce();fe();De();he();uv=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");let r=0,o=t[r],i=o.dataType,u=o.dims.length;t.forEach((d,l)=>{if(l!==r){if(d.dataType!==i)throw new Error("input tensors should be one type");if(d.dims.length!==u)throw new Error("input tensors should have the same shape");d.dims.forEach((p,m)=>{if(m!==e&&p!==o.dims[m])throw new Error("non concat dimensions must match")})}})},dv=(t,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${t}u>(${e});
    for (var i: u32 = 0u; i < ${t}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${t}u;
  }`,cv=(t,e)=>{let r=t.length,o=[];for(let i=0;i<r;++i){let u=e.setByOffset("global_idx",t[i].getByIndices("indices"));r===1?o.push(u):i===0?o.push(`if (inputIndex == ${i}u) { ${u} }`):i===r-1?o.push(`else { ${u} }`):o.push(`else if (inputIndex == ${i}) { ${u} }`)}return o.join(`
`)},lv=(t,e,r,o)=>{let i=N.size(r),u=new Array(t.length),d=new Array(t.length),l=0,p=[],m=[],g=[{type:12,data:i}];for(let S=0;S<t.length;++S)l+=t[S].dims[e],u[S]=l,m.push(t[S].dims.length),d[S]=L(`input${S}`,o,m[S]),p.push("rank"),g.push({type:12,data:u[S]});for(let S=0;S<t.length;++S)g.push(...X(t[S].dims));g.push(...X(r));let y=K("output",o,r.length),w=y.indicesGet("indices",e),$=Array.from(Array(u.length).keys()).map(S=>`uniforms.sizeInConcatAxis${S}`).join(","),v=S=>`

  ${(()=>{S.registerUniform("outputSize","u32");for(let k=0;k<t.length;k++)S.registerUniform(`sizeInConcatAxis${k}`,"u32");return S.declareVariables(...d,y)})()}

  ${dv(u.length,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${y.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${w});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${u.length}u>(${$});
      ${w} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${cv(d,y)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:r,dataType:o}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g}),getShaderSource:v}},Rp=(t,e)=>{let r=t.inputs,o=r[0].dims,i=N.normalizeAxis(e.axis,o.length);uv(r,i);let u=o.slice();u[i]=r.reduce((l,p)=>l+(p.dims.length>i?p.dims[i]:0),0);let d=r.filter(l=>N.size(l.dims)>0);t.compute(lv(d,i,u,r[0].dataType),{inputs:d})},Up=t=>le({axis:t.axis})});var it,at,st,mn,zt=Q(()=>{"use strict";ce();fe();it=(t,e,r="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${t.activation}`)}},at=(t,e)=>{t.activation==="Clip"?e.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):t.activation==="HardSigmoid"?e.push({type:1,data:t.alpha},{type:1,data:t.beta}):t.activation==="LeakyRelu"&&e.push({type:1,data:t.alpha})},st=(t,e)=>{t.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):t.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):t.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},mn=t=>{let e=t?.activation||"";if(e==="HardSigmoid"){let[r,o]=t?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:o}}else if(e==="Clip"){let[r,o]=t?.activation_params||[qc,jc];return{activation:e,clipMax:o,clipMin:r}}else if(e==="LeakyRelu"){let[r]=t?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var Ne,Vp,hn=Q(()=>{"use strict";Ne=(t,e)=>{switch(t){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${t}-component is not supported.`)}},Vp=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Lp,Wp=Q(()=>{"use strict";Lp=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`});var mr,gn,yn=Q(()=>{"use strict";ce();fe();he();zt();mr=(t,e,r,o,i)=>{let u=o-r;return`
      ${Array.from({length:r}).map((d,l)=>`
      if (${re(e.shape,l,e.rank)} != 1) {
        ${e.indicesSet(t,l,re(i,l+u,o))}
      } else {
        ${e.indicesSet(t,l,0)}
      }`).join("")}
`},gn=(t,e,r,o,i=!1,u)=>{let d=t[0].dims,l=t[1].dims,p=d[d.length-2],m=l[l.length-1],g=d[d.length-1],y=$e(m),w=$e(g),$=$e(p),v=N.size(r)/y/$,S=t.length>2,k=o?o.slice(0,-2):r.slice(0,-2),I=[N.size(k),p,m],E=[{type:12,data:v},{type:12,data:p},{type:12,data:m},{type:12,data:g}];at(e,E),E.push(...X(k,d,l)),S&&E.push(...X(t[2].dims)),E.push(...X(I));let P=M=>{let R=un("batch_dims",t[0].dataType,k.length),W=L("a",t[0].dataType,d.length,w),T=L("b",t[1].dataType,l.length,y),j=K("output",t[0].dataType,I.length,y),Z=Ae(j.type.tensor),oe=it(e,j.type.value,Z),te=[W,T],ue="";if(S){let ae=i?y:1;te.push(L("bias",t[2].dataType,t[2].dims.length,ae)),ue=`${i?`value += bias[col / ${ae}];`:`value += ${j.type.value}(bias[row + i]);`}`}let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];st(e,G);let Y=()=>{let ae=`var a_data: ${W.type.value};`;for(let se=0;se<w;se++)ae+=`
              let b_data${se} = b[(b_offset + (k + ${se}) * uniforms.N + col) / ${y}];`;for(let se=0;se<$;se++){ae+=`a_data = a[(a_offset + (row + ${se}) * uniforms.K + k) / ${w}];`;for(let ie=0;ie<w;ie++)ae+=`
            values[${se}] = fma(${T.type.value}(a_data${w===1?"":`[${ie}]`}), b_data${ie}, values[${se}]);
`}return ae};return`
  ${M.registerUniforms(G).registerInternalVariables(R).declareVariables(...te,j)}
  ${M.mainStart()}
    ${M.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${y})) * ${y};
    var index1 = global_idx / (uniforms.N / ${y});
    let stride1 = uniforms.M / ${$};
    let row = (index1 % stride1) * ${$};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${R.offsetToIndices("batch")};`}

    var a_indices: ${W.type.indices};
    ${mr("a_indices",W,W.rank-2,R.rank,"batch_indices")}
    ${W.indicesSet("a_indices",W.rank-2,0)}
    ${W.indicesSet("a_indices",W.rank-1,0)}
    let a_offset = ${W.indicesToOffset("a_indices")};

    var b_indices: ${T.type.indices};
    ${mr("b_indices",T,T.rank-2,R.rank,"batch_indices")}
    ${T.indicesSet("b_indices",T.rank-2,0)}
    ${T.indicesSet("b_indices",T.rank-1,0)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${j.type.value}, ${$}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${w}) {
      ${Y()}
    }
    for (var i = 0u; i < ${$}u; i++) {
      var value = values[i];
      ${ue}
      ${oe}
      let cur_indices = ${j.type.indices}(batch, row + i, col);
      let offset = ${j.indicesToOffset("cur_indices")};
      ${j.setByOffset(`offset / ${y}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${y};${w};${$};${i}`,inputDependencies:S?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:E}),getShaderSource:P}}});var pv,fv,Eo,Gp,mv,Po,hv,hr,bn=Q(()=>{"use strict";ce();fe();he();zt();yn();hn();pv=(t,e)=>t?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,fv=(t,e)=>t?`
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
        }`,Eo=(t,e,r="f32",o,i=!1,u=32,d=!1,l=32)=>{let p=e[1]*t[1],m=e[0]*t[0],g=i?p:u,y=i?u:p,w=g/e[0],$=u/e[1];if(!((i&&w===4&&t[1]===4||!i&&(w===3||w===4))&&g%e[0]===0&&u%e[1]===0&&t[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${w} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${w} must be 3 or 4.
  tileAWidth ${g} must be divisible by workgroupSize[0]${e[0]}. tileInner ${u} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${w}<${r}>, ${g/w}>, ${y}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${m/t[0]}>, ${u}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
const innerElementSize = ${w};
const tileInner = ${u};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${d?"0":"i32(globalId.z)"};
  ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${p};

  let num_tiles = ${d?`${Math.ceil(l/u)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${d?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${$};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${pv(i,o)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${o?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${w===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${fv(i,w)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Gp=(t,e)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,mv=t=>t?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Po=(t,e,r="f32",o,i=!1,u=32,d=!1,l=32,p=!1)=>{let m=t[1]*e[1],g=t[0]*e[0],y=i?m:u,w=i?u:m;if(!(w%e[1]===0&&y%e[0]===0&&u%e[1]===0))throw new Error(`tileAHight ${w} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${y} must be divisible by workgroupSize[0]${e[0]}, tileInner ${u} must be divisible by workgroupSize[1]${e[1]}`);let $=w/e[1],v=y/e[0],S=u/e[1],k=p?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${m};
    let globalColStart = i32(workgroupId.x) * ${g};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${w}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${y}; inputCol = inputCol + ${e[0]}) {
          ${Gp(i,o)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${u}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${g}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${o?", batchIndices":""});
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
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
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
let globalRowStart = i32(workgroupId.y) * ${m};

let tileRowA = i32(localId.y) * ${$};
let tileColA = i32(localId.x) * ${v};
let tileRowB = i32(localId.y) * ${S};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${v}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Gp(i,o)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${S}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${o?", batchIndices":""});
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
      ${mv(i)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${y}>, ${w}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${g}>, ${u}>;
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${u};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${d?"0":"i32(globalId.z)"};
    ${o?`let batchIndices = ${o.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${d?`${Math.ceil(l/u)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${d?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${k}
  }
`},hv=(t,e,r,o,i=!1)=>{let[u,d,l,p]=o,m=Ae(o[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${Ne(t,m)} {
      var value = ${Ne(t,m)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${d.type.indices};
        ${mr("aIndices",d,d.rank-2,u.rank,"batchIndices")}
        ${d.indicesSet("aIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("aIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${Ne(t,m)} {
      var value = ${Ne(t,m)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${mr("bIndices",l,l.rank-2,u.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ne(t,m)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${i?"bias[colIn]":`${Ne(t,m)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},hr=(t,e,r,o,i=!1,u)=>{let d=t[0].dims,l=t[1].dims,p=d.slice(0,-2),m=l.slice(0,-2),g=o?o.slice(0,-2):r.slice(0,-2),y=N.size(g),w=d[d.length-2],$=d[d.length-1],v=l[l.length-1],S=$%4===0&&v%4===0,k=w<=8?[4,1,1]:[4,4,1],C=[8,8,1],I=[Math.ceil(v/C[0]/k[0]),Math.ceil(w/C[1]/k[1]),Math.ceil(y/C[2]/k[2])],E=S?4:1,P=[...p,w,$/E],M=P.length,R=[...m,$,v/E],W=R.length,T=[y,w,v/E],j=[{type:6,data:w},{type:6,data:v},{type:6,data:$}];at(e,j),j.push(...X(g,P,R));let Z=["rank","rank"],oe=t.length>2;oe&&(j.push(...X(t[2].dims)),Z.push("rank")),j.push(...X(T));let te=ue=>{let G=g.length,Y=un("batchDims",t[0].dataType,G,1),ae=Ae(t[0].dataType),se=L("a",t[0].dataType,M,E),ie=L("b",t[1].dataType,W,E),pe=K("result",t[0].dataType,T.length,E),ye=[se,ie];if(oe){let J=i?E:1;ye.push(L("bias",t[2].dataType,t[2].dims.length,J))}let _e=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];st(e,_e);let Fe=Ae(pe.type.tensor),ke=it(e,pe.type.value,Fe),q=hv(E,oe,ke,[Y,se,ie,pe],i);return`
  ${ue.registerUniforms(_e).registerInternalVariables(Y).declareVariables(...ye,pe)}
  ${q}
  ${S?Eo(k,C,ae,Y):Po(k,C,ae,Y)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${e.activation};${S};${i}`,inputDependencies:Z},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:t[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:j}),getShaderSource:te}}});var gv,Hp,Fp=Q(()=>{"use strict";ce();pt();he();zt();hn();Wp();bn();gv=(t,e,r,o,i=!1,u,d=4,l=4,p=4,m="f32")=>{let g=Z=>{switch(Z){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${m}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${Z} is not supported.`)}},y=Z=>{switch(Z){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${Z} is not supported.`)}},w=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,$=t?`
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
    `,v=t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",S=t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=t?"row":"col",C=t?"col":"row",I=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${C} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${C} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${C} % inChannels;
    var resData = ${Ne(d,m)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${v} && xCol >= 0 && xCol < ${S}) {
      ${w}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${g(d)}
    }
    return resData;`,E=t?e&&o?`
    let col = colIn * ${d};
    ${I}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${I}
    }
    return ${Ne(d,m)}(0.0);`:o&&r?`
    let col = colIn * ${d};
    ${I}`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${I}
    }
    return ${Ne(d,m)}(0.0);`,P=t?o&&r?y(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${y(l)}
    }
    return ${Ne(l,m)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${y(l)}
    }
    return ${Ne(l,m)}(0.0);`,M=Ne(p,m),R=t?Ne(d,m):Ne(l,m),W=t?Ne(l,m):Ne(d,m),T=it(u,M,m);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${t?E:P}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${W} {
      ${t?P:E}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${M}) {
      let col = colIn * ${p};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${$}
      ${Vp(i)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Hp=(t,e,r,o,i,u,d,l,p)=>{let m=e.format==="NHWC",g=m?t[0].dims[3]:t[0].dims[1],y=r[0],w=m?r[2]:r[3],$=m?r[1]:r[2],v=m?r[3]:r[1],S=m&&(g%4===0||g%3===0)&&v%4===0,k=m?v:w*$,C=m?w*$:v,I=[8,8,1],E=o<=8?[4,1,1]:[4,4,1],P=[Math.ceil(k/I[0]/E[0]),Math.ceil(C/I[1]/E[1]),Math.ceil(y/I[2]/E[2])];ge("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${P}`);let M=S?m&&g%4!==0?3:4:1,R=I[1]*E[1],W=I[0]*E[0],T=Math.max(I[0]*M,I[1]),j=o%R===0,Z=i%W===0,oe=u%T===0,te=S?[M,4,4]:[1,1,1],ue=[{type:6,data:o},{type:6,data:i},{type:6,data:u},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];at(e,ue),ue.push(...X(t[0].dims,t[1].dims));let G=["rank","rank"];d&&(ue.push(...X(t[2].dims)),G.push("rank")),ue.push(...X(r));let Y=ae=>{let se=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];st(e,se);let ie=S?4:1,pe=Ae(t[0].dataType),ye=`
      fn setOutputAtIndex(flatIndex : i32, value : ${S?`vec4<${pe}>`:pe}) {
        result[flatIndex] = ${S?`vec4<${pe}>`:pe}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${S?`vec4<${pe}>`:pe}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${S?"/ 4":""}, value);
      }`,_e=L("x",t[0].dataType,t[0].dims.length,M===3?1:M),Fe=L("w",t[1].dataType,t[1].dims.length,ie),ke=[_e,Fe],q=K("result",t[0].dataType,r.length,ie);if(d){let J=L("bias",t[2].dataType,t[2].dims.length,ie);ke.push(J),ye+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${S?`vec4<${pe}>`:pe} {
          return bias[coords.${m?"w":"y"}${S?"/ 4":""}];
        }`}return`
        ${Lp("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${ae.registerUniforms(se).declareVariables(...ke,q)}
        ${ye}
        ${gv(m,j,Z,oe,d,e,te[0],te[1],te[2],pe)}
        ${S?Eo(E,I,pe,void 0,!m,T):Po(E,I,pe,void 0,!m,T,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${M};${S};${j};${Z};${oe};${R};${W};${T}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:p?p(r):r,dataType:t[0].dataType}],dispatchGroup:{x:P[0],y:P[1],z:P[2]},programUniforms:ue}),getShaderSource:Y}}});var yv,qp,wn,bv,jp,wv,Kp,Zp,Qp=Q(()=>{"use strict";ce();pt();fe();he();zt();hn();yv=t=>{let e=1;for(let r=0;r<t.length;r++)e*=t[r];return e},qp=t=>typeof t=="number"?[t,t,t]:t,wn=(t,e)=>e<=1?t:t+(t-1)*(e-1),bv=(t,e,r,o=1)=>{let i=wn(e,o);return Math.floor((t[0]*(r-1)-r+i)/2)},jp=(t,e,r,o,i)=>{i==null&&(i=bv(t,e[0],o[0]));let u=[0,0,0,r];for(let d=0;d<3;d++)t[d]+2*i>=e[d]&&(u[d]=Math.trunc((t[d]-e[d]+2*i)/o[d]+1));return u},wv=(t,e,r,o,i,u,d,l,p,m)=>{let g,y,w,$;if(t==="VALID"&&(t=0),typeof t=="number"){g={top:t,bottom:t,left:t,right:t,front:t,back:t};let v=jp([e,r,o,1],[l,p,m],1,[i,u,d],t);y=v[0],w=v[1],$=v[2]}else if(Array.isArray(t)){if(!t.every((S,k,C)=>S===C[0]))throw Error(`Unsupported padding parameter: ${t}`);g={top:t[0],bottom:t[1],left:t[2],right:t[3],front:t[4],back:t[5]};let v=jp([e,r,o,1],[l,p,m],1,[i,u,d],t[0]);y=v[0],w=v[1],$=v[2]}else if(t==="SAME_UPPER"){y=Math.ceil(e/i),w=Math.ceil(r/u),$=Math.ceil(o/d);let v=(y-1)*i+l-e,S=(w-1)*u+p-r,k=($-1)*d+m-o,C=Math.floor(v/2),I=v-C,E=Math.floor(S/2),P=S-E,M=Math.floor(k/2),R=k-M;g={top:E,bottom:P,left:M,right:R,front:C,back:I}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:g,outDepth:y,outHeight:w,outWidth:$}},Kp=(t,e,r,o,i,u=!1,d="channelsLast")=>{let l,p,m,g,y;if(d==="channelsLast")[l,p,m,g,y]=t;else if(d==="channelsFirst")[l,y,p,m,g]=t;else throw new Error(`Unknown dataFormat ${d}`);let[w,,$,v,S]=e,[k,C,I]=qp(r),[E,P,M]=qp(o),R=wn($,E),W=wn(v,P),T=wn(S,M),{padInfo:j,outDepth:Z,outHeight:oe,outWidth:te}=wv(i,p,m,g,k,C,I,R,W,T),ue=u?w*y:w,G=[0,0,0,0,0];return d==="channelsFirst"?G=[l,ue,Z,oe,te]:d==="channelsLast"&&(G=[l,Z,oe,te,ue]),{batchSize:l,dataFormat:d,inDepth:p,inHeight:m,inWidth:g,inChannels:y,outDepth:Z,outHeight:oe,outWidth:te,outChannels:ue,padInfo:j,strideDepth:k,strideHeight:C,strideWidth:I,filterDepth:$,filterHeight:v,filterWidth:S,effectiveFilterDepth:R,effectiveFilterHeight:W,effectiveFilterWidth:T,dilationDepth:E,dilationHeight:P,dilationWidth:M,inShape:t,outShape:G,filterShape:e}},Zp=(t,e,r,o,i,u)=>{let d=u==="channelsLast",l=d?t[0].dims[3]:t[0].dims[1],p=!1,m=[64,1,1],g={x:r.map((I,E)=>E)},y=[Math.ceil(yv(g.x.map(I=>r[I]))/m[0]),1,1];ge("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${y}`);let w=p?d&&l%4!==0?3:4:1,$=N.size(r),v=[{type:12,data:$},{type:12,data:o},{type:12,data:i},{type:12,data:e.strides},{type:12,data:e.dilations}];at(e,v),v.push(...X(t[0].dims,t[1].dims));let S=["rank","rank"],k=t.length===3;k&&(v.push(...X(t[2].dims)),S.push("rank")),v.push(...X(r));let C=I=>{let E=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:o.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];st(e,E);let P=p?4:1,M=Ae(t[0].dataType),R=L("x",t[0].dataType,t[0].dims.length,w===3?1:w),W=L("W",t[1].dataType,t[1].dims.length,P),T=[R,W],j=K("result",t[0].dataType,r.length,P),Z="";if(k){let ue=L("bias",t[2].dataType,t[2].dims.length,P);T.push(ue),Z+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${p?`vec4<${M}>`:M} {
          return bias[${d?re("coords",4,5):re("coords",1,5)}${p?"/ 4":""}];
        }`}let oe=Ne(w,M),te=it(e,oe,M);return`
            ${Z}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${W.getByIndices("aIndices")};
            }
          ${I.registerUniforms(E).declareVariables(...T,j)}
          ${I.mainStart()}
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${j.offsetToIndices("global_idx")};
              let batch = ${re("coords",0,R.rank)};
              let d2 = ${d?re("coords",R.rank-1,R.rank):re("coords",1,R.rank)};
              let xFRCCorner = vec3<u32>(${d?re("coords",1,R.rank):re("coords",2,R.rank)},
              ${d?re("coords",2,R.rank):re("coords",3,R.rank)},
              ${d?re("coords",3,R.rank):re("coords",4,R.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${d?re("uniforms.x_shape",1,R.rank):re("uniforms.x_shape",2,R.rank)};
              let xShapeZ = ${d?re("uniforms.x_shape",2,R.rank):re("uniforms.x_shape",3,R.rank)};
              let xShapeW = ${d?re("uniforms.x_shape",3,R.rank):re("uniforms.x_shape",4,R.rank)};
              let xShapeU = ${d?re("uniforms.x_shape",4,R.rank):re("uniforms.x_shape",1,R.rank)};
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
                      ${d?`let xValues = vec4<f32>(
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
                        ${d?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${d?`let xValues = vec2<f32>(
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
                      ${d?`let xValues = vec3<f32>(
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
              ${k?"value = value + getBiasByOutputCoords(coords)":""};
              ${te}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${d};${w};${k}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:v}),getShaderSource:C}}});var Yp,Xp,Jp=Q(()=>{"use strict";ce();fe();he();zt();Yp=(t,e,r,o)=>{let i=t.length>2,u=i?"value += b[output_channel];":"",d=t[0].dims,l=t[1].dims,p=e.format==="NHWC",m=p?r[3]:r[1],g=m/e.group,y=p&&g>=4?$e(m):1,w=N.size(r)/y,$=[{type:12,data:w},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:g}];at(e,$),$.push(...X(d,[l[0],l[1],l[2],l[3]/y]));let v=i?["rank","rank","rank"]:["rank","rank"];$.push(...X([r[0],r[1],r[2],r[3]/y]));let S=k=>{let C=K("output",t[0].dataType,r.length,y),I=Ae(C.type.tensor),E=it(e,C.type.value,I),P=L("x",t[0].dataType,d.length),M=L("w",t[1].dataType,l.length,y),R=[P,M];i&&R.push(L("b",t[2].dataType,t[2].dims,y));let W=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];st(e,W);let T=p?`
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
            let xVal = ${P.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${M.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${P.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${M.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(W).declareVariables(...R,C)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${C.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${p?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${p?1:2}], outputIndices[${p?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${y} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${p?2:1}];

    var value: ${C.type.value} = ${C.type.value}(0);
    ${T}
    ${u}
    ${E}
    ${C.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${y}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:S}},Xp=(t,e,r,o)=>{let i=t.length>2,u=$e(r[3]),d=$e(r[2]),l=N.size(r)/u/d,p=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/u],m=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/u],g=[r[0],r[1],r[2],r[3]/u],y=[{type:12,data:l},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];at(e,y),y.push(...X(p,m,g));let w=(d-1)*e.strides[1]+m[1],$=v=>{let S=K("output",t[0].dataType,g.length,u),k=Ae(S.type.tensor),C=it(e,S.type.value,k),I=L("x",t[0].dataType,p.length,u),E=L("w",t[1].dataType,m.length,u),P=[I,E];i&&P.push(L("b",t[2].dataType,t[2].dims,u));let M=i?"value += b[output_channel];":"",R=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return st(e,R),`
  ${v.registerUniforms(R).declareVariables(...P,S)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${d}u;
    let col = (index1 % width1) * ${d}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${I.type.value}, ${w}>;
    var values: array<${S.type.value}, ${d}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${m[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${w}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${I.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${I.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${m[1]}; w_width++) {
          let w_val = ${E.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${d}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${d}u; i++) {
      var value = values[i];
      ${M}
      ${C}
      ${S.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${u};${d};${w};${m[0]};${m[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:$}}});var _v,Oo,vv,zo,Do,ef,$v,xv,Bo,tf=Q(()=>{"use strict";fe();Fp();Qp();bn();Jp();zt();yn();$t();_v=(t,e,r,o,i,u)=>{let d=t[0],l=t.slice(u?1:2,u?3:4),p=l.length,m=e[0],y=e.slice(2).map((v,S)=>v+(v-1)*(r[S]-1)),$=l.map((v,S)=>v+o[S]+o[S+p]).map((v,S)=>Math.floor((v-y[S]+i[S])/i[S]));return $.splice(0,0,d),$.splice(u?3:1,0,m),$},Oo=[2,3,1,0],vv=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length>5)throw new Error("greater than 5D is not supported");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],o=t[1].dims[1]*e.group;if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(t.length===3&&(t[2].dims.length!==1||t[1].dims[0]!==t[2].dims[0]))throw new Error("invalid bias");let i=t[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape")},zo=(t,e)=>{let r=t.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let u=2;u<e[1].dims.length;++u)r[u-2]===0&&(r[u-2]=e[1].dims[u]);let o=t.pads.slice();Wt.adjustPadsBasedOnAutoPad(e[0].dims,t.strides,t.dilations,r,o,t.format==="NHWC",t.autoPad);let i=Object.assign({},t);return Object.assign(i,{kernelShape:r,pads:o}),i},Do=t=>{let e=mn(t),r=t.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],i=t.dilations,u=t.group,d=t.kernel_shape,l=t.pads,p=t.strides,m=t.w_is_const();return{autoPad:o,format:r,dilations:i,group:u,kernelShape:d,pads:l,strides:p,wIsConst:m,...e,cacheKey:`${t.format};${e.activation};`}},ef=(t,e,r,o)=>{let i=r.format==="NHWC",u=_v(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,i);if(r.group!==1){let R=[e[0]];if(i){let T=t.kernelCustomData.wT??t.compute(Ge(e[1],Oo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=T),R.push(T)}else R.push(e[1]);e.length===3&&R.push(e[2]),!t.adapterInfo.isArchitecture("ampere")&&i&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?t.compute(Xp(R,r,u,o),{inputs:R}):t.compute(Yp(R,r,u,o),{inputs:R});return}let d=e.length===3,l=e[0].dims[i?1:2],p=e[0].dims[i?2:3],m=e[0].dims[i?3:1],g=e[1].dims[2],y=e[1].dims[3],w=u[i?1:2],$=u[i?2:3],v=u[i?3:1],S=i&&g===l&&y===p&&r.pads[0]===0&&r.pads[1]===0;if(S||g===1&&y===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let R=u[0],W,T,j,Z=[];if(i){let ue=t.kernelCustomData.wT??t.compute(Ge(e[1],Oo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=ue),S){let G=l*p*m;W=e[0].reshape([1,R,G]),T=ue.reshape([1,G,v]),j=[1,R,v]}else W=e[0].reshape([R,l*p,m]),T=ue.reshape([1,m,v]),j=[R,w*$,v];Z.push(W),Z.push(T)}else W=e[0].reshape([R,m,l*p]),T=e[1].reshape([1,v,m]),j=[R,v,w*$],Z.push(T),Z.push(W);d&&Z.push(e[2]);let oe=j[2],te=Z[0].dims[Z[0].dims.length-1];oe<8&&te<8?t.compute(gn(Z,r,u,j,i,o),{inputs:Z}):t.compute(hr(Z,r,u,j,i,o),{inputs:Z});return}let k=!0,C=t.kernelCustomData.wT??t.compute(Ge(e[1],Oo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=C);let I=[e[0],C];d&&I.push(e[2]);let E=i?w*$:v,P=i?v:w*$,M=g*y*m;t.compute(Hp(I,r,u,E,P,M,d,k,o),{inputs:I})},$v=(t,e)=>{let r=e.format==="NHWC",o=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&o.push(t.inputs[2]);let i=[0,e.pads[0],0,e.pads[1]],u=[1].concat(e.strides),d=[1].concat(e.dilations),l=[1].concat(e.kernelShape),p=zo({...e,pads:i,strides:u,dilations:d,kernelShape:l},o);ef(t,o,p,m=>r?[m[0],m[2],m[3]]:[m[0],m[1],m[3]])},xv=(t,e,r)=>{let o=r.format==="NHWC"?"channelsLast":"channelsFirst",i=zo(r,e),u=r.autoPad==="NOTSET"?r.pads:r.autoPad,d=Kp(e[0].dims,e[1].dims,r.strides,r.dilations,u,!1,o);t.compute(Zp(e,i,d.outShape,[d.filterDepth,d.filterHeight,d.filterWidth],[d.padInfo.front,d.padInfo.top,d.padInfo.left],o))},Bo=(t,e)=>{if(vv(t.inputs,e),t.inputs[0].dims.length===3)$v(t,e);else if(t.inputs[0].dims.length===5)xv(t,t.inputs,e);else{let r=zo(e,t.inputs);ef(t,t.inputs,r)}}});var rf,nf=Q(()=>{"use strict";ce();pt();fe();he();rf=(t,e,r)=>{let o=t.length>2,i=e.outputShape,u=e.format==="NHWC",d=e.group,l=t[1].dims,p=l[2]/d,m=l[3],g=u?$e(p):1,y=u&&m===1&&p>=4,w=y?Math.floor(p/4)*4:Math.floor(p/g)*g,$=p-w,v=u?$e(m):1,S=u?m===1?g:v:1,k=N.size(i)/v,C=[Math.ceil(k/64),1,1];ge("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${C}`);let I=["rank","rank"],E=[e.strides[0],e.strides[1]],P=[e.kernelShape[u?1:2],e.kernelShape[u?2:3]],M=[e.dilations[0],e.dilations[1]],R=[P[0]+(e.dilations[0]<=1?0:(e.kernelShape[u?1:2]-1)*(e.dilations[0]-1)),P[1]+(e.dilations[1]<=1?0:(e.kernelShape[u?2:3]-1)*(e.dilations[1]-1))],W=[R[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),R[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],T=[{type:12,data:k},{type:12,data:E},{type:12,data:P},{type:12,data:M},{type:12,data:R},{type:6,data:W},{type:12,data:w},{type:12,data:p},{type:12,data:m},...X(t[0].dims,t[1].dims)];o&&(T.push(...X(t[2].dims)),I.push("rank")),T.push(...X(i));let j=Z=>{let oe=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:E.length},{name:"filter_dims",type:"u32",length:P.length},{name:"dilations",type:"u32",length:P.length},{name:"effective_filter_dims",type:"u32",length:R.length},{name:"pads",type:"i32",length:W.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],te=Ae(t[0].dataType),ue=u?1:2,G=u?2:3,Y=u?3:1,ae=L("W",t[1].dataType,t[1].dims.length,S),se=L("Dy",t[0].dataType,t[0].dims.length,g),ie=[se,ae];o&&ie.push(L("bias",t[2].dataType,[i[Y]].length,v));let pe=K("result",t[0].dataType,i.length,v),ye=()=>{let ke="";if(y)g===4?ke+=`
        let xValue = ${se.getByOffset("x_offset")};
        let wValue = ${ae.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:g===2?ke+=`
          dotProd = dotProd + dot(vec4<${te}>(${se.getByOffset("x_offset")}, ${se.getByOffset("x_offset + 1u")}), vec4<${te}>(${ae.getByOffset("w_offset")}, ${ae.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:g===1&&(ke+=`
          dotProd = dotProd + dot(vec4<${te}>(${se.getByOffset("x_offset")}, ${se.getByOffset("x_offset + 1u")}, ${se.getByOffset("x_offset + 2u")}, ${se.getByOffset("x_offset + 3u")}), vec4<${te}>(${ae.getByOffset("w_offset")}, ${ae.getByOffset("w_offset + 1u")}, ${ae.getByOffset("w_offset + 2u")}, ${ae.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ke+=`
                  let xValue = ${u?se.getByOffset(`${se.indicesToOffset(`${se.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${g}`):se.get("batch","inputChannel","idyR","idyC")};
        `,g===1)ke+=`
          let w_offset = ${ae.indicesToOffset(`${ae.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${ae.getByOffset(`w_offset / ${S}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let q=0;q<g;q++)ke+=`
            let wValue${q} = ${ae.getByOffset(`${ae.indicesToOffset(`${ae.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${q}, wOutChannel)`)} / ${S}`)};
            dotProd = dotProd + xValue[${q}] * wValue${q};`;return ke},_e=()=>{if($===0)return"";if(!y)throw new Error(`packInputAs4 ${y} is not true.`);let ke="";if(g===1){ke+="dotProd = dotProd";for(let q=0;q<$;q++)ke+=`
            + ${se.getByOffset(`x_offset + ${q}`)} * ${ae.getByOffset(`w_offset + ${q}`)}`;ke+=";"}else if(g===2){if($!==2)throw new Error(`Invalid inputChannelsRemainder ${$}.`);ke+=`
          let xValue = ${se.getByOffset("x_offset")};
          let wValue = ${ae.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ke},Fe=`
            let outputIndices = ${pe.offsetToIndices(`global_idx * ${v}`)};
            let batch = ${pe.indicesGet("outputIndices",0)};
            let d1 = ${pe.indicesGet("outputIndices",Y)};
            let r = ${pe.indicesGet("outputIndices",ue)};
            let c = ${pe.indicesGet("outputIndices",G)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${pe.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${te}(dyRCorner) + ${te}(wR)) / ${te}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${te}(uniforms.Dy_shape[${ue}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${te}(dyCCorner) + ${te}(wC)) / ${te}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${te}(uniforms.Dy_shape[${G}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${y?`
                var x_offset = ${se.indicesToOffset(`${se.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${g};
                var w_offset = ${ae.indicesToOffset(`${ae.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${S};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${y?4:g}) {
                  ${ye()}
                  inputChannel = inputChannel + ${y?4:g};
                }
                ${_e()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${o?` + bias[d1 / ${v}]`:""};
            ${pe.setByOffset("global_idx","value")};
          `;return`
    ${Z.registerUniforms(oe).declareVariables(...ie,pe)}
      ${Z.mainStart()}
      ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Fe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${g}${S}${v}${y}${$}`,inputDependencies:I},getRunData:()=>({dispatchGroup:{x:C[0],y:C[1],z:C[2]},outputs:[{dims:r?r(i):i,dataType:t[0].dataType}],programUniforms:T}),getShaderSource:j}}});var Sv,Tv,Iv,of,af,Cv,sf,Av,uf,df=Q(()=>{"use strict";nf();zt();$t();Sv=(t,e,r,o,i,u)=>(t-1)*e+r+(o-1)*i+1-u,Tv=(t,e,r,o,i)=>{let u=Math.floor(t/2);e==="SAME_UPPER"?(r[o]=u,r[i]=t-u):e==="SAME_LOWER"&&(r[o]=t-u,r[i]=u)},Iv=(t,e,r,o,i,u,d,l,p,m)=>{let g=t.length-2,y=m.length===0;p.length<g&&p.push(...Array(g-p.length).fill(0));let w=t[0],$=e[l?3:1]*i;for(let v=0,S=t.length-g-(l?1:0);v<g;++v,++S){let k=t[S],C=y?k*d[v]:m[v],I=Sv(k,d[v],u[v],e[S],r[v],C);Tv(I,o,u,v,v+g),y&&m.push(d[v]*(k-1)+p[v]+(e[S]-1)*r[v]+1-u[v]-u[v+g])}m.splice(0,0,w),m.splice(l?3:1,0,$)},of=(t,e)=>{let r=t.kernelShape.slice();if(t.kernelShape.length===0||t.kernelShape.reduce((y,w)=>y*w,1)===0){r.length=0;for(let y=2;y<e[1].dims.length;++y)r.push(e[1].dims[y])}let o=t.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(o?3:1,0,e[1].dims[1]);let i=t.pads.slice(),u=t.outputShape.slice(),d=t.outputPadding.slice(),l=e[0].dims,p=t.dilations.slice();if(p.reduce((y,w)=>y+w,0)===0){let y=e[0].dims.length-2;p=new Array(y).fill(1)}let m=t.strides.slice();if(m.reduce((y,w)=>y+w,0)===0){let y=e[0].dims.length-2;m=new Array(y).fill(1)}Iv(l,r,p,t.autoPad,t.group,i,m,o,d,u);let g=Object.assign({},t);return Object.assign(g,{kernelShape:r,pads:i,outputPadding:d,outputShape:u,dilations:p,strides:m}),g},af=t=>{let e=mn(t),r=t.format,o=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],i=t.dilations,u=t.group??1,d=t.kernelShape,l=t.pads,p=t.strides,m=t.wIsConst(),g=t.outputPadding,y=t.outputShape;return{autoPad:o,format:r,dilations:i,group:u,kernelShape:d,outputPadding:g,outputShape:y,pads:l,strides:p,wIsConst:m,...e,cacheKey:`${t.format};${e.activation};`}},Cv=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length!==4&&t[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],o=t[1].dims[0];if(r!==o)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=t[1].dims[1]*e.group;if(t.length===3&&(t[2].dims.length!==1||t[2].dims[0]!==i))throw new Error("invalid bias");let u=t[0].dims.length-2;if(e.dilations.reduce((g,y)=>g+y,0)>0&&e.dilations.length!==u)throw new Error(`dilations should be ${u}D`);if(e.strides.reduce((g,y)=>g+y,0)>0&&e.strides.length!==u)throw new Error(`strides should be ${u}D`);if(e.pads.reduce((g,y)=>g+y,0)>0&&e.pads.length!==u*2)throw new Error(`pads should be ${u*2}D`);if(e.outputPadding.length!==u&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${u}D`);if(e.kernelShape.reduce((g,y)=>g+y,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==t[0].dims.length-2)throw new Error("invalid output shape")},sf=(t,e,r,o)=>{let i=t.kernelCustomData.wT??t.compute(Ge(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=i);let u=[e[0],i];e.length===3&&u.push(e[2]),t.compute(rf(u,r,o),{inputs:u})},Av=(t,e)=>{let r=e.format==="NHWC",o=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&o.push(t.inputs[2]);let i=e.kernelShape;(i.length===0||i[0]===0)&&(i=[t.inputs[1].dims[2]]);let u=e.dilations;(u.length===0||u[0]===0)&&(u=[1]);let d=e.strides;(d.length===0||d[0]===0)&&(d=[1]);let l=e.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],d=[1].concat(d),u=[1].concat(u),i=[1].concat(i);let p=e.outputPadding;p=[0].concat(p);let m=of({...e,pads:l,strides:d,dilations:u,kernelShape:i,outputPadding:p},o);sf(t,o,m,g=>r?[g[0],g[2],g[3]]:[g[0],g[1],g[3]])},uf=(t,e)=>{if(Cv(t.inputs,e),t.inputs[0].dims.length===3)Av(t,e);else{let r=of(e,t.inputs);sf(t,t.inputs,r)}}});var kv,cf,lf,pf=Q(()=>{"use strict";ce();fe();De();he();kv=(t,e,r,o)=>{let i=N.size(e),u=e.length,d=L("input",t,u),l=K("output",t,u),p=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),m=N.normalizeAxis(p,u),g=y=>{let w=` i32(${d.indicesGet("inputIndices","uniforms.axis")}) `,$=re("uniforms.input_shape","uniforms.axis",u),v=o.reverse?w+(o.exclusive?" + 1":""):"0",S=o.reverse?$:w+(o.exclusive?"":" + 1");return`
                ${y.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(d,l)}
                ${y.mainStart()}
                  ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${v};
                  let last : i32 = ${S};
                  for (var i : i32 = first; i < last; i++) {
                    ${d.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${d.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:o.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:m},...X(e,e)]}),getShaderSource:g}},cf=(t,e)=>{let r=t.inputs[0].dims,o=t.inputs[0].dataType,i=t.inputs[1];t.compute(kv(o,r,i,e),{inputs:[0]})},lf=t=>{let e=t.exclusive===1,r=t.reverse===1;return le({exclusive:e,reverse:r})}});var Ev,Pv,Ov,ff,mf,hf=Q(()=>{"use strict";ce();fe();De();he();Ev=t=>{if(!t||t.length!==1)throw new Error("DepthToSpace requires 1 input.");if(t[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Pv=(t,e,r,o)=>{let i=[];i.push(`fn perm(i: ${o.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let u=0;u<e;++u)i.push(r.indicesSet("a",t[u],`i[${u}]`));return i.push("return a;}"),i.join(`
`)},Ov=(t,e)=>{let r,o,i,u,d,l,p=e.format==="NHWC",m=e.blocksize,g=e.mode==="DCR";p?([r,o,i,u]=t.dims,d=g?[r,o,i,m,m,u/m**2]:[r,o,i,u/m**2,m,m],l=g?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,o,i,u]=[t.dims[0],t.dims[2],t.dims[3],t.dims[1]],d=g?[r,m,m,u/m**2,o,i]:[r,u/m**2,m,m,o,i],l=g?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let y=t.reshape(d),w=y.dims.length,$=t.dataType,v=L("a",$,w),S=K("output",$,w),k=C=>`
  ${C.registerUniform("output_size","u32").declareVariables(v,S)}

  ${Pv(l,w,v,S)}

  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${t.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:C=>{let I=p?[r,o*m,i*m,u/m**2]:[r,u/m**2,o*m,i*m],E=N.size(I),P=y.dims,M=N.sortBasedOnPerm(P,l);return{outputs:[{dims:I,dataType:C[0].dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},...X(P,M)]}},getShaderSource:k}},ff=(t,e)=>{Ev(t.inputs),t.compute(Ov(t.inputs[0],e))},mf=t=>le({blocksize:t.blocksize,mode:t.mode,format:t.format})});var Mo,_n,gf,zv,Dv,Ro,Uo,yf,Bv,bf,wf,_f=Q(()=>{"use strict";ce();fe();De();he();Mo="[a-zA-Z]|\\.\\.\\.",_n="("+Mo+")+",gf="^"+_n+"$",zv="("+_n+",)*"+_n,Dv="^"+zv+"$",Ro=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let o=this.symbolToIndices.get(e);o===void 0?o=[r]:o.push(r),this.symbolToIndices.set(e,o)}},Uo=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[o,i]=r.includes("->")?r.split("->",2):[r,""];if(!o.match(RegExp(Dv)))throw new Error("Invalid LHS term");if(o.split(",").forEach((l,p)=>{let m=e[p].dims.slice();if(!l.match(RegExp(gf)))throw new Error("Invalid LHS term");let g=this.processTerm(l,!0,m,p);this.lhs.push(g)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([l,p])=>p.count===1||l==="...").map(([l])=>l).join("");else if(!i.match(RegExp(_n)))throw new Error("Invalid RHS");i.match(RegExp(Mo,"g"))?.forEach(l=>{if(l==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let p=this.symbolToInfo.get(l);if(p===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(p.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,r,o){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==r&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(o)}else i={count:1,dimValue:r,inputIndices:[o]};this.symbolToInfo.set(e,i)}processTerm(e,r,o,i=-1){let u=o.length,d=!1,l=[],p=0;if(!e.match(RegExp(gf))&&!r&&e!=="")throw new Error("Invalid LHS term");let m=e.match(RegExp(Mo,"g")),g=new Ro(i);return m?.forEach((y,w)=>{if(y==="..."){if(d)throw new Error("Only one ellipsis is allowed per input term");d=!0;let $=u-m.length+1;if($<0)throw new Error("Ellipsis out of bounds");if(l=o.slice(p,p+$),this.hasEllipsis){if(this.ellipsisDims.length!==l.length||this.ellipsisDims.toString()!==l.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=l;else throw new Error("Ellipsis must be specified in the LHS");for(let v=0;v<l.length;v++){let S=String.fromCharCode(48+v);g.addSymbol(S,w+v),this.addSymbol(S,o[p++],i)}}else g.addSymbol(y,w+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(y,o[p++],i)}),g}},yf=t=>t+"_max",Bv=(t,e,r,o)=>{let u=t.map(g=>g.length).map((g,y)=>L(`input${y}`,e,g)),d=N.size(o),l=K("output",e,o.length),p=[...r.symbolToInfo.keys()].filter(g=>!r.rhs.symbolToIndices.has(g)),m=g=>{let y=[],w="var prod = 1.0;",$="var sum = 0.0;",v="sum += prod;",S=[],k=[],C=[],I=[],E=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((M,R)=>{if(r.rhs.symbolToIndices.has(R)){let W=r.rhs.symbolToIndices.get(R)?.[0];W!==void 0&&r.lhs.forEach((T,j)=>{if(M.inputIndices.includes(j)){let Z=T.symbolToIndices.get(R);if(Z===void 0)throw new Error("Invalid symbol error");Z.forEach(oe=>{y.push(`${u[j].indicesSet(`input${j}Indices`,oe,l.indicesGet("outputIndices",W))}`)})}})}else r.lhs.forEach((W,T)=>{if(M.inputIndices.includes(T)){let j=W.symbolToIndices.get(R);if(j===void 0)throw new Error("Invalid symbol error");j.forEach(Z=>{S.push(`${u[T].indicesSet(`input${T}Indices`,Z,`${R}`)}`)}),I.push(`prod *= ${u[T].getByIndices(`input${T}Indices`)};`)}}),k.push(`for(var ${R}: u32 = 0; ${R} < uniforms.${yf(R)}; ${R}++) {`),C.push("}")});let P=E?[...y,`let sum = ${u.map((M,R)=>M.getByIndices(`input${R}Indices`)).join(" * ")};`]:[...y,$,...k,...S,w,...I,v,...C];return`
            ${g.registerUniforms(p.map(M=>({name:`${yf(M)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...u,l)}

            ${g.mainStart()}
            ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${u.map((M,R)=>`var input${R}Indices: ${u[R].type.indices};`).join(`
`)}
            ${P.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:t.map(()=>"rank")},getRunData:()=>{let g=p.filter(w=>r.symbolToInfo.has(w)).map(w=>({type:12,data:r.symbolToInfo.get(w)?.dimValue||0}));g.push({type:12,data:d});let y=t.map((w,$)=>[...X(w)]).reduce((w,$)=>w.concat($),g);return y.push(...X(o)),{outputs:[{dims:o,dataType:e}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:y}},getShaderSource:m}},bf=(t,e)=>{let r=new Uo(t.inputs,e.equation),o=r.outputDims,i=t.inputs.map((u,d)=>u.dims);t.compute(Bv(i,t.inputs[0].dataType,r,o))},wf=t=>{let e=t.equation.replace(/\s+/g,"");return le({equation:e})}});var Mv,vf,Rv,Uv,$f,xf=Q(()=>{"use strict";ce();fe();he();Mv=t=>{if(!t||t.length!==2)throw new Error("Expand requires 2 input.");let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),o=r.length<e.length?0:r.length-e.length,i=e.length<r.length?0:e.length-r.length;for(;o<r.length&&i<e.length;++o,++i)if(r[o]!==e[i]&&r[o]!==1&&e[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},vf=(t,e)=>{let r=t.length-e.length,o=[];for(let i=0;i<r;++i)o.push(t[i]);for(let i=0;i<e.length;++i)o.push(e[i]===1?t[i+r]:e[i]);return o},Rv=(t,e)=>t.length>e.length?vf(t,e):vf(e,t),Uv=t=>{let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),o=Rv(e,r),i=t[0].dataType,u=i===9||N.size(e)===1,d=i===9||e.length>0&&e[e.length-1]%4===0?4:1,l=u||o.length>0&&o[o.length-1]%4===0?4:1,p=Math.ceil(N.size(o)/l),m=y=>{let w=L("input",i,e.length,d),$=K("output",i,o.length,l),v;if(i===9){let S=(k,C,I="")=>`
          let outputIndices${C} = ${$.offsetToIndices(`outputOffset + ${C}u`)};
          let offset${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,$)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${k}[${C}] = ${I}(${w.getByOffset(`index${C}`)}[component${C}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${S("data",0,"u32")}
        ${S("data",1,"u32")}
        ${S("data",2,"u32")}
        ${S("data",3,"u32")}
        ${$.setByOffset("global_idx","data")}
      }`}else v=`
        let outputIndices = ${$.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${w.broadcastedIndicesToOffset("outputIndices",$)};
        let data = ${$.type.value}(${w.getByOffset(`inputOffset / ${d}`)});
        ${$.setByOffset("global_idx","data")}
      }`;return`
    ${y.registerUniform("vec_size","u32").declareVariables(w,$)}
    ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${v}`},g=[{type:12,data:p},...X(e,o)];return{name:"Expand",shaderCache:{hint:`${o.length};${d}${l}`,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:g})}},$f=t=>{Mv(t.inputs),t.compute(Uv(t.inputs),{inputs:[0]})}});var Nv,Sf,Tf=Q(()=>{"use strict";ce();fe();he();fn();Nv=t=>{let e=t[0].dataType,r=N.size(t[0].dims),o=N.size(t[1].dims),i=o%4===0,u=d=>{let l=L("x",e,[1],4),p=L("bias",e,[1],4),m=K("y",e,[1],4),g=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],y=$=>`
      let bias${$}_offset: u32 = (global_idx * 4 + ${$}) % uniforms.bias_size;
      let bias${$} = ${p.getByOffset(`bias${$}_offset / 4`)}[bias${$}_offset % 4];`,w=i?`
      let bias = ${p.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${y(0)}${y(1)}${y(2)}${y(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${d.registerUniforms(g).declareVariables(l,p,m)}

    ${Ao(We(e))}

    ${d.mainStart(Gt)}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${w}
      let x_in = x + bias;
      ${m.setByOffset("global_idx",ko("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:u,getRunData:d=>({outputs:[{dims:d[0].dims,dataType:d[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:o}],dispatchGroup:{x:Math.ceil(r/Gt/4)}})}},Sf=t=>{t.inputs.length<2||N.size(t.inputs[1].dims)===0?wp(t):t.compute(Nv(t.inputs))}});var Vv,Lv,If,Cf,Af=Q(()=>{"use strict";ce();fe();De();he();Vv=t=>{if(!t||t.length!==2)throw new Error("Gather requires 2 inputs.")},Lv=(t,e)=>{let r=t[0].dims,o=t[1].dims,i=r.length,u=N.normalizeAxis(e.axis,i),d=r.slice(0);d.splice(u,1,...o);let l=r[u],p=t[0].dataType===9?4:1,m=Math.ceil(N.size(d)/p),g=[{type:12,data:m},{type:6,data:l},{type:12,data:u},...X(t[0].dims,t[1].dims,d)],y=w=>{let $=L("data",t[0].dataType,t[0].dims.length,p),v=L("inputIndices",t[1].dataType,t[1].dims.length),S=K("output",t[0].dataType,d.length,p),k=I=>{let E=o.length,P=`var indicesIndices${I}  = ${v.type.indices}(0);`;for(let M=0;M<E;M++)P+=`${E>1?`indicesIndices${I}[${M}]`:`indicesIndices${I}`} = ${d.length>1?`outputIndices${I}[uniforms.axis + ${M}]`:`outputIndices${I}`};`;P+=`
          var idx${I} = ${v.getByIndices(`indicesIndices${I}`)};
          if (idx${I} < 0) {
            idx${I} = idx${I} + uniforms.axisDimLimit;
          }
          var dataIndices${I} : ${$.type.indices};
        `;for(let M=0,R=0;M<i;M++)M===u?(P+=`${i>1?`dataIndices${I}[${M}]`:`dataIndices${I}`} = u32(idx${I});`,R+=E):(P+=`${i>1?`dataIndices${I}[${M}]`:`dataIndices${I}`} = ${d.length>1?`outputIndices${I}[${R}]`:`outputIndices${I}`};`,R++);return P},C;if(t[0].dataType===9){let I=(E,P,M="")=>`
          let outputIndices${P} = ${S.offsetToIndices(`outputOffset + ${P}u`)};
          ${k(P)};
          let offset${P} = ${$.indicesToOffset(`dataIndices${P}`)};
          let index${P} = offset${P} / 4u;
          let component${P} = offset${P} % 4u;
          ${E}[${P}] = ${M}(${$.getByOffset(`index${P}`)}[component${P}]);
        `;C=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${I("value",0,"u32")}
        ${I("value",1,"u32")}
        ${I("value",2,"u32")}
        ${I("value",3,"u32")}
        ${S.setByOffset("global_idx","value")}
      `}else C=`
      let outputIndices = ${S.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${$.getByIndices("dataIndices")};
      ${S.setByOffset("global_idx","value")};
      `;return`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables($,v,S)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${C}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:y}},If=t=>le({axis:t.axis}),Cf=(t,e)=>{let r=t.inputs;Vv(r),t.compute(Lv(t.inputs,e))}});var Wv,kf,Ef,Pf=Q(()=>{"use strict";ce();fe();he();Wv=(t,e,r,o,i,u,d,l,p)=>{let m=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:r},{type:12,data:d},{type:12,data:l},{type:12,data:p}],g=[u];m.push(...X(e.dims,g));let y=w=>{let $=L("indices_data",e.dataType,e.dims.length),v=K("input_slice_offsets_data",12,1,1),S=[$,v],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${w.registerUniforms(k).declareVariables(...S)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return t.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:g,dataType:t.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:y},{inputs:[e],outputs:[-1]})[0]},kf=(t,e)=>{let r=t.inputs,o=r[0].dims,i=r[0].dataType,u=r[1].dims,d=u[u.length-1],l=N.sizeToDimension(u,u.length-1),p=N.sizeFromDimension(o,e.batchDims+d),m=N.sizeToDimension(o,e.batchDims),g=N.sizeFromDimension(o,e.batchDims),y=l/m,w=new Array(d),$=p;for(let P=0;P<d;++P)w[d-1-P]=$,$*=o[e.batchDims+d-1-P];let v=Wv(t,r[1],w,e.batchDims,o,l,y,g,d),S=e.batchDims+d;if(S>o.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=u.slice(0,-1).concat(o.slice(S)),C=N.size(k),I=[{type:12,data:C},{type:12,data:p},...X(r[0].dims,v.dims,k)],E=P=>{let M=L("data",r[0].dataType,r[0].dims.length),R=L("slice_offsets",12,v.dims.length),W=K("output",r[0].dataType,k.length);return`
          ${P.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(M,R,W)}
            ${P.mainStart()}
            ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};t.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:i}],dispatchGroup:{x:Math.ceil(C/64)},programUniforms:I}),getShaderSource:E},{inputs:[r[0],v]})},Ef=t=>({batchDims:t.batch_dims,cacheKey:""})});var Gv,Hv,Of,zf,Df=Q(()=>{"use strict";ce();fe();De();he();Gv=(t,e)=>{if(t.length<3||t.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=N.normalizeAxis(e.quantizeAxis,t[0].dims.length),o=e.blockSize,i=t[0],u=t[2],d=t.length===4?t[3]:void 0;if(u.dims.length!==i.dims.length||!i.dims.map((l,p)=>p===r?Math.ceil(l/o)===u.dims[p]:l===u.dims[p]).reduce((l,p)=>l&&p,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(d){if(d.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(d.dims.length!==u.dims.length||!d.dims.map((l,p)=>l===u.dims[p]).reduce((l,p)=>l&&p,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Hv=(t,e)=>{let r=t[0].dims,o=t[1].dims,i=r.length,u=N.normalizeAxis(e.gatherAxis,i),d=N.normalizeAxis(e.quantizeAxis,i),l=r.slice(0);l.splice(u,1,...o);let p=N.size(l),m=t[2].dataType,y=t[0].dataType===22,w=[{type:12,data:p},{type:12,data:d},{type:12,data:u},{type:12,data:e.blockSize},...X(...t.map((v,S)=>v.dims),l)],$=v=>{let S=L("data",t[0].dataType,t[0].dims.length),k=L("inputIndices",t[1].dataType,t[1].dims.length),C=L("scales",t[2].dataType,t[2].dims.length),I=t.length>3?L("zeroPoint",t[3].dataType,t[3].dims.length):void 0,E=K("output",m,l.length),P=[S,k,C];I&&P.push(I);let M=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${v.registerUniforms(M).declareVariables(...P,E)}
        ${v.mainStart()}
        let output_indices = ${E.offsetToIndices("global_idx")};
        var indices_indices = ${k.type.indices}(0);
        ${o.length>1?`
          for (var i: u32 = 0; i < ${o.length}; i++) {
            let index = ${E.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${k.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${E.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${S.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${E.indicesGet("output_indices","i")};
          ${S.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${k.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[u]};
        }
        ${S.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${E.indicesGet("output_indices",`i + ${o.length} - 1`)};
          ${S.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${S.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${S.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${y?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${C.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${C.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${C.getByIndices("scale_indices")};
        ${I?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${I.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${I.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${y?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${We(m)}(quantized_data - zero_point) * scale;
        ${E.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${t.filter((v,S)=>S!==1).map(v=>v.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:t.length},(v,S)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:m}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:w}),getShaderSource:$}},Of=(t,e)=>{let r=t.inputs;Gv(r,e),t.compute(Hv(t.inputs,e))},zf=t=>le({blockSize:t.blockSize,gatherAxis:t.gatherAxis,quantizeAxis:t.quantizeAxis})});var Fv,qv,Bf,Mf,Rf=Q(()=>{"use strict";ce();fe();De();he();Fv=t=>{if(!t||t.length!==2)throw new Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},qv=(t,e)=>{let r=t[0].dims,o=t[0].dataType,i=r.length,u=t[1].dims,d=t[1].dataType,l=N.normalizeAxis(e.axis,i),p=r[l],m=u.slice(0),g=N.size(m),y=L("input",o,i),w=L("indicesInput",d,u.length),$=K("output",o,m.length),v=[{type:12,data:g},{type:6,data:p},{type:12,data:l}];return v.push(...X(r,u,m)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:m,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:v}),getShaderSource:C=>`
      ${C.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,w,$)}
      ${C.mainStart()}
      ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${$.offsetToIndices("global_idx")};

      var idx = ${w.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${y.type.indices}(outputIndices);
      ${y.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${y.getByIndices("inputIndices")};

      ${$.setByOffset("global_idx","value")};
  }`}},Bf=t=>le({axis:t.axis}),Mf=(t,e)=>{let r=t.inputs;Fv(r),t.compute(qv(t.inputs,e))}});var jv,Kv,Uf,Nf,Vf=Q(()=>{"use strict";ce();fe();he();jv=t=>{if(!t)throw new Error("Input is missing");if(t.length<2||t.length>3)throw new Error("Invaid input number.");if(t.length===3&&t[2].dims.length>2)throw new Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||t.length===3&&t[0].dataType!==t[2].dataType)throw new Error("Input types are mismatched")},Kv=(t,e)=>{let r=t[0].dims.slice(),o=t[1].dims.slice(),[i,u,d]=Jr.getShapeOfGemmResult(r,e.transA,o,e.transB,t.length===3?t[2].dims:void 0),l=[i,u];if(!l)throw new Error("Can't use gemm on the given tensors");let p=16,m=Math.ceil(u/p),g=Math.ceil(i/p),y=!0,w=N.size(l),$=[{type:12,data:y?m:w},{type:12,data:i},{type:12,data:u},{type:12,data:d},{type:1,data:e.alpha},{type:1,data:e.beta}],v=["type","type"];t.length===3&&($.push(...X(t[2].dims)),v.push("rank")),$.push(...X(l));let S=C=>{let I="";e.transA&&e.transB?I="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?I="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?I="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(I="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let E=e.alpha===1?"":"value *= uniforms.alpha;",P=L("a",t[0].dataType,t[0].dims),M=L("b",t[1].dataType,t[1].dims),R=P.type.value,W=null,T=[P,M];t.length===3&&(W=L("c",t[2].dataType,t[2].dims.length),T.push(W));let j=K("output",t[0].dataType,l.length);T.push(j);let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${C.registerUniforms(Z).declareVariables(...T)}

  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${R}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${I}
    }

    ${E}
    ${W!=null?`let cOffset = ${W.broadcastedIndicesToOffset("vec2(m, n)",j)}; value += ${R}(uniforms.beta) * ${W.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=C=>{let I=L("a",t[0].dataType,t[0].dims),E=L("b",t[1].dataType,t[1].dims),P=null,M=[I,E];t.length===3&&(P=L("c",t[2].dataType,t[2].dims.length),M.push(P));let R=K("output",t[0].dataType,l.length);M.push(R);let W=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],T="",j="";e.transA&&e.transB?(j=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${I.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(j=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${I.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,T="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(j=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${I.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(j=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${I.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,T="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let Z=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${C.registerUniforms(W).declareVariables(...M)}
  var<workgroup> tile_a: array<array<${I.type.storage}, ${p}>, ${p}>;
  var<workgroup> tile_b: array<array<${E.type.storage}, ${p}>, ${p}>;
  ${C.mainStart([p,p,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${p};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${p};
    let num_tiles = (uniforms.K - 1) / ${p} + 1;
    var k_start = 0u;
    var value = ${R.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${j}
      k_start = k_start + ${p};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${p}; k++) {
        ${T}
      }
      workgroupBarrier();
    }

    ${Z}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${R.type.value}(uniforms.beta) * ${P.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return y?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:m*g},programUniforms:$}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:S}},Uf=t=>{let e=t.transA,r=t.transB,o=t.alpha,i=t.beta;return{transA:e,transB:r,alpha:o,beta:i,cacheKey:`${t.transA};${t.transB};${t.alpha===1}`}},Nf=(t,e)=>{jv(t.inputs),t.compute(Kv(t.inputs,e))}});var xt,Dt,Xt,Jt,Zv,Qv,Yv,Xv,Jv,e$,t$,r$,Lf,Wf,Gf=Q(()=>{"use strict";ce();fe();De();he();[xt,Dt,Xt,Jt]=[0,1,2,3],Zv=t=>{if(t[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(t[0].dims.length!==t[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(t[0].dims.length-2!==t[1].dims[t[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${t[0].dims.length-2}`);if(t[0].dims[0]!==t[1].dims[0])throw new Error("grid batch size must match input batch size")},Qv=`
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
`,Yv=t=>`
  fn gs_bicubic_interpolate(p: mat4x4<${t}>, x: f32, y: f32) -> ${t} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${t}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Xv=t=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${t.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Jv=t=>`
  ${t.paddingMode==="reflection"?`
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
`,e$=(t,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${xt}] = batch;
     indices[${Dt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Xt}] = u32(r);
            indices[${Jt}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${Xt}] = u32(clamp(r, 0, H - 1));
          indices[${Jt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Xt}] = gs_reflect(r, border[1], border[3]);
          indices[${Jt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${t.getByIndices("indices")};
  }
`,t$=(t,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${xt}], indices[${Dt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${xt}], indices[${Dt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${xt}], indices[${Dt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${xt}], indices[${Dt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${xt}], indices[${Dt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${xt}], indices[${Dt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${t.setByOffset("global_idx","result")}`,r$=(t,e)=>{let r=L("x",t[0].dataType,t[0].dims.length),o=[t[1].dims[0],t[1].dims[1],t[1].dims[2]],i=L("grid",t[1].dataType,o.length,2),u=[t[0].dims[0],t[0].dims[1],t[1].dims[1],t[1].dims[2]];e.format==="NHWC"&&(u=[t[0].dims[0],t[1].dims[1],t[1].dims[2],t[0].dims[3]],[xt,Dt,Xt,Jt]=[0,3,1,2]);let d=K("output",t[0].dataType,u.length),l=r.type.value,p=N.size(u),m=[{type:12,data:p},...X(t[0].dims,o,u)],g=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(r,i,d)}
  ${Qv}
  ${Yv(l)}
  ${Xv(e)}
  ${Jv(e)}
  ${e$(r,l,e)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Xt}]);
      let W_in = i32(uniforms.x_shape[${Jt}]);

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

      let indices = ${d.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${xt}], indices[${Xt}], indices[${Jt}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${t$(d,l,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:y=>{let w=N.size(u);return{outputs:[{dims:u,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:m}},getShaderSource:g}},Lf=(t,e)=>{Zv(t.inputs),t.compute(r$(t.inputs,e))},Wf=t=>le({alignCorners:t.align_corners,mode:t.mode,paddingMode:t.padding_mode,format:t.format})});var Ke,i$,Ff,Hf,a$,gr,qf,No=Q(()=>{"use strict";ce();fe();De();an();ln();he();$t();Ke=(t,e)=>t.length>e&&t[e].dims.length>0?t[e]:void 0,i$=(t,e)=>{let r=t[0],o=Ke(t,1),i=Ke(t,2),u=Ke(t,3),d=Ke(t,4),l=Ke(t,5),p=Ke(t,6),m=Ke(t,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let g=r.dims[0],y=r.dims[1],w=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],$=y,v=0,S=0,k=Math.floor(w/e.numHeads);if(p&&m&&N.size(p.dims)&&N.size(m.dims)){if(p.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(p.dims[0]!==g||p.dims[1]!==e.numHeads||p.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(m.dims[0]!==g||m.dims[1]!==e.numHeads||m.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[2]!==m.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(m.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');v=p.dims[2],S=p.dims[2]}else if(p&&N.size(p.dims)||m&&N.size(m.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let C;if(o&&N.size(o.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(o.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');C=2,$=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==e.numHeads||o.dims[3]!==2||o.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');C=5,$=o.dims[1]}else{if(o.dims[1]!==e.numHeads||o.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');C=0,$=o.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');C=3}if(u&&N.size(u.dims)>0){if(u.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(o&&o.dims.length===5&&o.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let I=v+$,E=0;if(d&&N.size(d.dims)>0){E=8;let W=d.dims;throw W.length===1?W[0]===g?E=1:W[0]===3*g+2&&(E=3):W.length===2&&W[0]===g&&W[1]===I&&(E=5),E===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let P=!1,M=w;if(i&&N.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if($!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');M=i.dims[2]}else{if($!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');M=i.dims[1]*i.dims[3],P=!0}}let R=!1;if(d&&N.size(d.dims)>0)throw new Error("Key padding mask is not supported");if(l&&N.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==g||l.dims[1]!==e.numHeads||l.dims[2]!==y||l.dims[3]!==I)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:g,sequenceLength:y,pastSequenceLength:v,kvSequenceLength:$,totalSequenceLength:I,maxSequenceLength:S,inputHiddenSize:0,hiddenSize:w,vHiddenSize:M,headSize:k,vHeadSize:Math.floor(M/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:E,scale:e.scale,broadcastResPosBias:R,passPastInKv:P,qkvFormat:C}},Ff=t=>le({...t}),Hf=le({perm:[0,2,1,3]}),a$=(t,e,r,o,i,u,d)=>{let l=[o,i,u],p=N.size(l),m=[{type:12,data:p},{type:12,data:d},{type:12,data:u}],g=y=>{let w=K("qkv_with_bias",e.dataType,l),$=L("qkv",e.dataType,l),v=L("bias",r.dataType,l),S=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${y.registerUniforms(S).declareVariables($,v,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return t.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:g},{inputs:[e,r],outputs:[-1]})[0]},gr=(t,e,r,o,i,u,d,l)=>{let p=u;if(d&&N.size(d.dims)>0){if(o===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return p=a$(t,u,d,e,o,r*i,l),p=p.reshape([e,o,r,i]),r===1||o===1?p:t.compute(Ge(p,Hf.perm),{inputs:[p],outputs:[-1]})[0]}else return u.dims.length===3&&(p=u.reshape([e,o,r,i])),r===1||o===1?p:t.compute(Ge(p,Hf.perm),{inputs:[p],outputs:[-1]})[0]},qf=(t,e)=>{let r=i$(t.inputs,e),o=t.inputs[0],i=Ke(t.inputs,1),u=Ke(t.inputs,2),d=Ke(t.inputs,3),l=Ke(t.inputs,4),p=Ke(t.inputs,5),m=Ke(t.inputs,6),g=Ke(t.inputs,7);if(o.dims.length===5)throw new Error("Packed QKV is not implemented");if(i?.dims.length===5)throw new Error("Packed KV is not implemented");let y=i&&u&&i.dims.length===4&&u.dims.length===4,w=gr(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,o,d,0);if(y)return Yt(t,w,i,u,l,void 0,m,g,p,r);if(!i||!u)throw new Error("key and value must be provided");let $=gr(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,d,r.hiddenSize),v=gr(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,u,d,2*r.hiddenSize);Yt(t,w,$,v,l,void 0,m,g,p,r)}});var s$,u$,d$,c$,Vo,jf,Kf,Lo=Q(()=>{"use strict";ce();fe();De();he();s$=t=>{if(!t||t.length<1)throw new Error("too few inputs")},u$=(t,e)=>{let r=[],o=e.numOutputs;return t[1].dims[0]>0&&(t[1].getBigInt64Array().forEach(i=>r.push(Number(i))),o=r.length),le({numOutputs:o,axis:e.axis,splitSizes:r})},d$=t=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${re("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`,c$=t=>{let e=t.length,r=[];for(let o=0;o<e;++o){let i=t[o].setByIndices("indices","input[global_idx]");e===1?r.push(i):o===0?r.push(`if (output_number == ${o}u) { ${i} }`):o===e-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${o}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Vo=(t,e)=>{let r=t[0].dims,o=N.size(r),i=t[0].dataType,u=N.normalizeAxis(e.axis,r.length),d=new Array(e.numOutputs),l=L("input",i,r.length),p=new Array(e.numOutputs),m=[],g=[],y=0,w=[{type:12,data:o}];for(let v=0;v<e.numOutputs;v++){y+=e.splitSizes[v],p[v]=y;let S=r.slice();S[u]=e.splitSizes[v],g.push(S),d[v]=K(`output${v}`,i,S.length),m.push({dims:g[v],dataType:t[0].dataType})}w.push({type:12,data:p},...X(r,...g));let $=v=>`
  ${v.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",p.length).declareVariables(l,...d)}
  ${d$(p.length)}
  ${c$(d)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",u)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${re("uniforms.size_in_split_axis","output_number - 1u",p.length)};
      ${l.indicesSet("indices",u,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:m,dispatchGroup:{x:Math.ceil(o/64)},programUniforms:w})}},jf=(t,e)=>{s$(t.inputs);let r=t.inputs.length===1?e:u$(t.inputs,e);t.compute(Vo(t.inputs,r),{inputs:[0]})},Kf=t=>{let e=t.axis,r=t.splitSizes,o=t.numOutputs<0?r.length:t.numOutputs;if(o!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return le({axis:e,numOutputs:o,splitSizes:r})}});var l$,vn,Zf,Wo=Q(()=>{"use strict";ce();fe();De();he();l$=(t,e)=>{let[r,o,i,u]=t,{numHeads:d,rotaryEmbeddingDim:l}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!N.areEqual(o.dims,[])&&!N.areEqual(o.dims,[1])&&o.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(u.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${u.dims.length}`);if(!N.areEqual(i.dims,u.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&d===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let p=r.dims[0],m=r.dims[r.dims.length-2],g=i.dims[0],y=N.sizeFromDimension(r.dims,1)/m,w=l===0?i.dims[1]*2:y/d;if(l>w)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(o.dims.length===2){if(p!==o.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${o.dims[0]}`);if(m!==o.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${o.dims[1]}`)}if(w/2!==i.dims[1]&&l/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(m>g)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},vn=(t,e)=>{let{interleaved:r,numHeads:o,rotaryEmbeddingDim:i,scale:u}=e,d=t[0].dims[0],l=N.sizeFromDimension(t[0].dims,1),p=t[0].dims[t[0].dims.length-2],m=l/p,g=t[2].dims[1],y=i===0?g*2:m/o,w=new Array(d,p,m/y,y-g),$=N.computeStrides(w),v=[{type:1,data:u},{type:12,data:w},{type:12,data:$},...t[0].dims.length===3?new Array({type:12,data:[l,m,y,1]}):[],...t[0].dims.length===4?new Array({type:12,data:[l,y,p*y,1]}):[],...X(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)],S=k=>{let C=L("input",t[0].dataType,t[0].dims.length),I=L("position_ids",t[1].dataType,t[1].dims.length),E=L("cos_cache",t[2].dataType,t[2].dims.length),P=L("sin_cache",t[3].dataType,t[3].dims.length),M=K("output",t[0].dataType,t[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:w.length},{name:"global_strides",type:"u32",length:$.length},{name:"input_output_strides",type:"u32",length:$.length}]),`
        ${k.declareVariables(C,I,E,P,M)}

        ${k.mainStart(Gt)}
          let half_rotary_emb_dim = uniforms.${E.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${I.broadcastedIndicesToOffset("bsnh.xy",K("",I.type.tensor,2))};
            let position_id =
                u32(${I.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${C.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} -
                ${C.getByOffset("j")} * ${P.get("position_id","bsnh[3]")};
            ${M.setByOffset("i","re")}
            let im = ${C.getByOffset("i")} * ${P.get("position_id","bsnh[3]")} +
                ${C.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${M.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${M.setByOffset("k",C.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:S,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(N.size(w)/Gt)},programUniforms:v})}},Zf=(t,e)=>{l$(t.inputs,e),t.compute(vn(t.inputs,e))}});var p$,f$,Qf,m$,Yf,Xf=Q(()=>{"use strict";De();ce();ln();No();Lo();$t();Wo();he();p$=(t,e)=>{if(e.doRotary&&t.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=t[0],o=t[1],i=t[2],u=t[3],d=t[4];if(e.doRotary!==0&&t.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,p=r.dims[0],m=r.dims[1],g=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],y=m,w=0,$=!o||o.dims.length===0,v=Math.floor($?g/(e.numHeads+2*e.kvNumHeads):g/e.numHeads);$&&(g=v*e.numHeads);let S=u&&u.dims.length!==0,k=d&&d.dims.length!==0;if(S&&u.dims.length===4&&u.dims[0]===p&&u.dims[1]!==e.kvNumHeads&&u.dims[2]===e.kvNumHeads&&u.dims[3]===v)throw new Error("BSNH pastKey/pastValue is not supported");if(S&&k){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=u.dims[2]}else if(S||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let I=1;if(o&&o.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(o.dims.length===3){if(r.dims[2]%o.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');y=o.dims[1]}else if(o.dims.length===5){if(o.dims[2]!==e.numHeads||o.dims[3]!==2||o.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');y=o.dims[1]}else{if(o.dims[1]!==e.numHeads||o.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=o.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');I=3}let E=0,P=!1,M=e.kvNumHeads?v*e.kvNumHeads:g;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(y!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');M=i.dims[2]}else{if(y!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');M=i.dims[1]*i.dims[3],P=!0}}let R=t.length>4?t[5]:void 0;if(R&&R.dims.length!==1&&R.dims[0]!==p)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:p,sequenceLength:m,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:g,vHiddenSize:M,headSize:v,vHeadSize:Math.floor(M/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:E,scale:e.scale,broadcastResPosBias:!1,passPastInKv:P,qkvFormat:I}},f$=le({perm:[0,2,1,3]}),Qf=(t,e,r)=>{let o=e,i=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(o=e.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),o=t.compute(Ge(o,f$.perm),{inputs:[o],outputs:[-1]})[0]),o},m$=(t,e,r,o)=>{let i=7,u=["type","type"],d=[t*e],l=t*e,p=[{type:12,data:l},{type:12,data:e},{type:12,data:t}],m=g=>{let y=L("seq_lens",r.dataType,r.dims),w=L("total_seq_lens",o.dataType,o.dims),$=K("pos_ids",i,d),v=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${g.registerUniforms(v).declareVariables(y,w,$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${w.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${y.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${$.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${$.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${$.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${t};${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:m}},Yf=(t,e)=>{let r=p$(t.inputs,e);if(t.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let o=t.inputs[0],i=t.inputs[1]&&t.inputs[1].dims.length>0?t.inputs[1]:void 0,u=t.inputs[2]&&t.inputs[2].dims.length>0?t.inputs[2]:void 0,d=t.inputs[3]&&t.inputs[3].dims.length!==0?t.inputs[3]:void 0,l=t.inputs[4]&&t.inputs[4].dims.length!==0?t.inputs[4]:void 0,p=t.inputs.length>4?t.inputs[5]:void 0,m=t.inputs.length>5?t.inputs[6]:void 0,g=r.kvNumHeads?r.kvNumHeads:r.numHeads,y=le({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,g*r.headSize,g*r.headSize]}),[w,$,v]=!i&&!u?t.compute(Vo([o],y),{inputs:[o],outputs:[-1,-1,-1]}):[o,i,u],S,k;if(e.doRotary){let P=t.compute(m$(r.batchSize,r.sequenceLength,p,m),{inputs:[p,m],outputs:[-1]})[0],M=t.inputs[7],R=t.inputs[8],W=le({interleaved:e.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),T=[w,P,M,R],j=[-1];S=t.compute(vn(T,W),{inputs:T,outputs:j})[0],T.splice(0,1,$);let Z=le({interleaved:e.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});k=t.compute(vn(T,Z),{inputs:T,outputs:j})[0]}let C=gr(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.doRotary?S:w,void 0,0),I=Qf(t,e.doRotary?k:$,r),E=Qf(t,v,r);Yt(t,C,I,E,void 0,void 0,d,l,void 0,r,p,m)}});var Jf,h$,g$,em,tm=Q(()=>{"use strict";ce();fe();$t();he();Jf=(t,e,r,o,i,u,d,l)=>{let p=$e(u),m=p===1?"f32":`vec${p}f`,g=p===1?"vec2f":`mat2x${p}f`,y=i*d,w=64;y===1&&(w=256);let $=[i,d,u/p],v=[i,d,2],S=["rank","type","type"],k=[];k.push(...X($,v));let C=I=>{let E=L("x",e.dataType,3,p),P=L("scale",r.dataType,r.dims),M=L("bias",o.dataType,o.dims),R=K("output",1,3,2),W=[E,P,M,R];return`
  var<workgroup> workgroup_shared : array<${g}, ${w}>;
  const workgroup_size = ${w}u;
  ${I.declareVariables(...W)}
  ${I.mainStart(w)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${m}(0);
    var squared_sum = ${m}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${m}(${E.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${g}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ot("workgroup_shared[0][0]",p)} / f32(hight * ${p});
      let squared_sum_final = ${ot("workgroup_shared[0][1]",p)} / f32(hight * ${p});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${p};${l};${w}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:v,dataType:1}],dispatchGroup:{x:y},programUniforms:k}),getShaderSource:C},{inputs:[e,r,o],outputs:[-1]})[0]},h$=(t,e,r)=>{let o=e[0].dims,i=o,u=2,d=o[0],l=o[1],p=N.sizeFromDimension(o,u),m=$e(p),g=N.size(i)/m,y=Jf(t,e[0],e[1],e[2],d,p,l,r.epsilon),w=[d,l,p/m],$=[d,l],v=["type","none"],S=k=>{let C=L("x",e[0].dataType,w.length,m),I=L("scale_shift",1,$.length,2),E=K("output",e[0].dataType,w.length,m),P=[C,I,E];return`
  ${k.registerUniform("output_size","u32").declareVariables(...P)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${E.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${I.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${C.getByOffset("global_idx")} * ${E.type.value}(scale_shift.x) + ${E.type.value}(scale_shift.y);
      ${E.setByOffset("global_idx","value")};
  }`};t.compute({name:"InstanceNormalization",shaderCache:{hint:`${m}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...X(w,$,w)]}),getShaderSource:S},{inputs:[e[0],y]})},g$=(t,e,r)=>{let o=e[0].dims,i=o,u=o[0],d=o[o.length-1],l=N.sizeFromDimension(o,1)/d,p=$e(d),m=N.size(i)/p,g=[{type:12,data:l},{type:12,data:Math.floor(d/p)}],y=["type","type"],w=!1,$=[0,o.length-1];for(let C=0;C<o.length-2;C++)w=w||o[C+1]!==1,$.push(C+1);w=w&&o[o.length-1]!==1;let v=w?t.compute(Ge(t.inputs[0],$),{inputs:[t.inputs[0]],outputs:[-1]})[0]:t.inputs[0].reshape(Array.from({length:o.length},(C,I)=>o[$[I]])),S=Jf(t,v,e[1],e[2],u,l,d,r.epsilon),k=C=>{let I=Ae(e[0].dataType),E=p===1?"vec2f":`mat${p}x2f`,P=W=>{let T=W===0?"x":"y",j=p===1?"f32":`vec${p}f`;switch(p){case 1:return`${I}(${j}(scale.${T}))`;case 2:return`vec2<${I}>(${j}(scale[0].${T}, scale[1].${T}))`;case 4:return`vec4<${I}>(${j}(scale[0].${T}, scale[1].${T}, scale[2].${T}, scale[3].${T}))`;default:throw new Error(`Not supported compoents ${p}`)}},M=L("input",e[0].dataType,e[0].dims,p),R=K("output",e[0].dataType,i,p);return`
  @group(0) @binding(0) var<storage, read> input : array<${M.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${E}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${R.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${C.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${P(0)}, ${P(1)});
  }`};t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:k},{inputs:[e[0],S]})},em=(t,e)=>{e.format==="NHWC"?g$(t,t.inputs,e):h$(t,t.inputs,e)}});var y$,b$,rm,nm=Q(()=>{"use strict";ce();fe();he();y$=t=>{if(!t||t.length<2)throw new Error("layerNorm requires at least 2 inputs.")},b$=(t,e,r)=>{let o=e.simplified,i=t[0].dims,u=t[1],d=!o&&t[2],l=i,p=N.normalizeAxis(e.axis,i.length),m=N.sizeToDimension(i,p),g=N.sizeFromDimension(i,p),y=N.size(u.dims),w=d?N.size(d.dims):0;if(y!==g||d&&w!==g)throw new Error(`Size of X.shape()[axis:] == ${g}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${y} and bias size of ${w}`);let $=[];for(let M=0;M<i.length;++M)M<p?$.push(i[M]):$.push(1);let v=$e(g),S=["type","type"],k=[{type:12,data:m},{type:1,data:g},{type:12,data:Math.floor(g/v)},{type:1,data:e.epsilon}];d&&S.push("type");let C=r>1,I=r>2,E=M=>{let R=Ae(t[0].dataType),W=[L("x",t[0].dataType,t[0].dims,v),L("scale",u.dataType,u.dims,v)];d&&W.push(L("bias",d.dataType,d.dims,v)),W.push(K("output",t[0].dataType,l,v)),C&&W.push(K("mean_data_output",1,$)),I&&W.push(K("inv_std_output",1,$));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${M.registerUniforms(T).declareVariables(...W)}
  ${M.mainStart()}
    ${M.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${So("f32",v)};
    var mean_square_vector = ${So("f32",v)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ht(R,v,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ot("mean_vector",v)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ot("mean_square_vector",v)} / uniforms.norm_size ${o?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ht(R,v,"x[j + offset]")};
      let f32scale = ${Ht(R,v,"scale[j]")};
      output[j + offset] = ${W[0].type.value}((f32input ${o?"":"- mean"}) * inv_std_dev * f32scale
        ${d?`+ ${Ht(R,v,"bias[j]")}`:""}
      );
    }

    ${C?"mean_data_output[global_idx] = mean":""};
    ${I?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},P=[{dims:l,dataType:t[0].dataType}];return C&&P.push({dims:$,dataType:1}),I&&P.push({dims:$,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${v};${r};${o}`,inputDependencies:S},getRunData:()=>({outputs:P,dispatchGroup:{x:Math.ceil(m/64)},programUniforms:k}),getShaderSource:E}},rm=(t,e)=>{y$(t.inputs),t.compute(b$(t.inputs,e,t.outputCount))}});var w$,om,im=Q(()=>{"use strict";fe();yn();bn();w$=t=>{if(!t||t.length!==2)throw new Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw new Error("shared dimension does not match.")},om=t=>{w$(t.inputs);let e=ft.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],o=t.inputs[0].dims[t.inputs[0].dims.length-1];if(r<8&&o<8)t.compute(gn(t.inputs,{activation:""},e));else{let i=e[e.length-2],u=N.size(t.inputs[0].dims.slice(0,-2)),d=N.size(t.inputs[1].dims.slice(0,-2));if(u!==1&&i===1&&d===1){let l=t.inputs[0].reshape([1,u,o]),p=t.inputs[1].reshape([1,o,r]),m=[1,u,r],g=[l,p];t.compute(hr(g,{activation:""},e,m),{inputs:g})}else t.compute(hr(t.inputs,{activation:""},e))}}});var _$,v$,$$,am,sm,um=Q(()=>{"use strict";ce();fe();De();he();_$=(t,e)=>{if(t.length<3||t.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=t[0],o=r.dims.length;if(r.dims[o-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((e.k+e.blockSize-1)/e.blockSize),u=e.blockSize/8*e.bits,d=t[1];if(!N.areEqual(d.dims,[e.n,i,u]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let p=t[2].dims;if(N.size(p)!==e.n*i)throw new Error("scales input size error.");if(t.length===4){let g=t[3].dims,y=e.n*(e.bits===8?i:Math.floor((i*e.bits+7)/8));if(N.size(g)!==y)throw new Error("zeroPoints input size error.")}},v$=(t,e)=>{let r=t[0].dims,o=r.length,i=r[o-2],u=e.k,d=e.n,l=r.slice(0,o-2),p=N.size(l),g=t[1].dims[2]/4,y=t[0].dataType,w=$e(e.k),$=$e(g),v=$e(d),S=l.concat([i,d]),k=i>1&&d/v%2===0?2:1,C=N.size(S)/v/k,I=64,E=[],P=[p,i,u/w],M=N.convertShape(t[1].dims).slice();M.splice(-1,1,g/$),E.push(...X(P)),E.push(...X(M)),E.push(...X(t[2].dims)),t.length===4&&E.push(...X(N.convertShape(t[3].dims)));let R=[p,i,d/v];E.push(...X(R));let W=T=>{let j=P.length,Z=L("a",t[0].dataType,j,w),oe=L("b",12,M.length,$),te=L("scales",t[2].dataType,t[2].dims.length),ue=[Z,oe,te],G=t.length===4?L("zero_points",12,t[3].dims.length):void 0;G&&ue.push(G);let Y=R.length,ae=K("output",t[0].dataType,Y,v),se=Ae(t[0].dataType),ie=(()=>{switch(w){case 1:return`array<${se}, 8>`;case 2:return`mat4x2<${se}>`;case 4:return`mat2x4<${se}>`;default:throw new Error(`${w}-component is not supported.`)}})(),pe=Math.floor(32/e.bits),ye=Math.floor(pe/8),_e=()=>{let q="";for(let J=0;J<ye;J++){let Te=J*e.bits*4,Ue=Te+e.bits;q+=`
          // reuse a data (pass ${J})
            var input_offset${J>0?J:""} = ${J===0?Z.indicesToOffset(`${Z.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${J>0?J:""}: ${ie};
            for (var j${J>0?J:""}: u32 = 0; j${J>0?J:""} < ${8/w}; j${J>0?J:""}++) {
              a_data${J>0?J:""}[j${J>0?J:""}] = ${Z.getByOffset(`input_offset${J>0?J:""}`)};
              input_offset${J>0?J:""}++;
            }
          `;for(let Ee=0;Ee<v*k;Ee++)q+=`
            b_value = ${$===1?`b${Ee}_data`:`b${Ee}_data[i]`};
            ${e.bits===2?`{
              let half_word = b_value >> ${J*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Te}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ue}u) & b_mask);`}
            b_quantized_values = ${ie}(${Array.from({length:4},(Ve,xe)=>`${se}(b_value_lower[${xe}]), ${se}(b_value_upper[${xe}])`).join(", ")});
            b_dequantized_values = ${w===1?`${ie}(${Array.from({length:8},(Ve,xe)=>`(b_quantized_values[${xe}] - ${G?`zero_point${Ee}`:"zero_point"}) * scale${Ee}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${G?`zero_point${Ee}`:"zero_point"}`).join(",")})) * scale${Ee};`};
            workgroup_shared[local_id.x * ${k} + ${Math.floor(Ee/v)}]${v>1?`[${Ee%v}]`:""} += ${Array.from({length:8/w},(Ve,xe)=>`${w===1?`a_data${J>0?J:""}[${xe}] * b_dequantized_values[${xe}]`:`dot(a_data${J>0?J:""}[${xe}], b_dequantized_values[${xe}])`}`).join(" + ")};
          `}return q},Fe=()=>{let q=`
            var col_index = col * ${v};
            ${G?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${se}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            `;for(let J=0;J<v*k;J++)q+=`
            let scale${J} = ${te.getByOffset("col_index * nBlocksPerCol + block")};
            ${G?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${J} = ${se}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return q},ke=()=>{let q=`col_index = col * ${v};`;for(let J=0;J<v*k;J++)q+=`
            let b${J}_data = ${oe.getByIndices(`${oe.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return q+=`
            var b_value: u32;
            let b_mask: u32 = ${e.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,q};return`
        var<workgroup> workgroup_shared: array<${ae.type.value}, ${k*I}>;
        ${T.declareVariables(...ue,ae)}
        ${T.mainStart([I,1,1])}
          let output_indices = ${ae.offsetToIndices(`(global_idx / ${I}) * ${k}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${I}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/w};
            ${Fe()}
            for (var word: u32 = 0; word < ${g}; word += ${$}) {
              ${ke()}
              for (var i: u32 = 0; i < ${$}; i++) {
                ${_e()}
                word_offset += ${pe/w};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${k}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${I}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${k};
            }
            ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${w};${$};${v};${k};${I}`,inputDependencies:Array(t.length).fill("rank")},getRunData:()=>({outputs:[{dims:S,dataType:y}],dispatchGroup:{x:C},programUniforms:E}),getShaderSource:W}},$$=(t,e)=>{let r=t[0].dims,o=r.length,i=r[o-2],u=e.k,d=e.n,l=r.slice(0,o-2),p=N.size(l),g=t[1].dims[2]/4,y=t[0].dataType,w=$e(e.k),$=$e(g),v=l.concat([i,d]),S=128,k=d%8===0?8:d%4===0?4:1,C=S/k,I=Math.floor(32/e.bits),E=C*$*I,P=E/w,M=E/e.blockSize,R=N.size(v)/k,W=[],T=[p,i,u/w],j=N.convertShape(t[1].dims).slice();j.splice(-1,1,g/$),W.push(...X(T)),W.push(...X(j)),W.push(...X(t[2].dims)),t.length===4&&W.push(...X(N.convertShape(t[3].dims)));let Z=[p,i,d];W.push(...X(Z));let oe=te=>{let ue=T.length,G=L("a",t[0].dataType,ue,w),Y=L("b",12,j.length,$),ae=L("scales",t[2].dataType,t[2].dims.length),se=[G,Y,ae],ie=t.length===4?L("zero_points",12,t[3].dims.length):void 0;ie&&se.push(ie);let pe=Z.length,ye=K("output",t[0].dataType,pe),_e=Ae(t[0].dataType),Fe=()=>{switch(w){case 1:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${w}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${P}>;
        var<workgroup> inter_results: array<array<${ye.type.value}, ${C}>, ${k}>;
        ${te.declareVariables(...se,ye)}
        ${te.mainStart([C,k,1])}
          let output_indices = ${ye.offsetToIndices(`workgroup_index * ${k}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${M} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${P};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${P}; a_offset += ${S})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${G.getByIndices(`${G.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${G.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${M} + local_id.x;
            ${ie?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            let zero_point_word = ${ie.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${_e}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${_e}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            let scale = ${ae.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/w};
            for (var i: u32 = 0; i < ${$}; i++) {
              let b_value = ${$===1?"b_data":"b_data[i]"};
              ${(()=>{let ke=Math.floor(I/8),q="";for(let J=0;J<ke;J++){let Te=J*e.bits*4,Ue=Te+e.bits;q+=`
              ${Fe()}
              {${e.bits===2?`
                let half_word = b_value >> ${J*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Te}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ue}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${_e}>(${Array.from({length:4},(Ee,Ve)=>`${_e}(b_value_lower[${Ve}]), ${_e}(b_value_upper[${Ve}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${_e}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ee,Ve)=>`${`dot(a_data${Ve}, b_dequantized_values[${Ve}])`}`).join(" + ")};
              }
              word_offset += ${8/w};`}return q})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${k}) {
            var output_value: ${ye.type.value} = ${ye.type.value}(0);
            for (var b = 0u; b < ${C}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ye.setByIndices(`${ye.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${w};${$};${C};${k}`,inputDependencies:Array(t.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:y}],dispatchGroup:{x:R},programUniforms:W}),getShaderSource:oe}},am=(t,e)=>{_$(t.inputs,e),e.blockSize===32&&t.adapterInfo.isVendor("intel")&&t.adapterInfo.isArchitecture("gen-12lp")?t.compute($$(t.inputs,e)):t.compute(v$(t.inputs,e))},sm=t=>le(t)});var x$,S$,T$,I$,C$,A$,k$,E$,dm,cm=Q(()=>{"use strict";ce();fe();he();x$=t=>{if(!t||t.length<1)throw new Error("Too few inputs");if(t[0].dataType!==1&&t[0].dataType!==10)throw new Error("Input type must be float or float16.");if(t.length>=2){let e=t[0].dims.length*2===t[1].dims[0];if(t.length===4&&(e=t[3].dims[0]*2===t[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},S$=(t,e,r)=>{let o="";for(let i=e-1;i>=0;--i)o+=`
            k = i32(${t.indicesGet("indices",i)}) - ${re("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${re("uniforms.x_shape",i,e)})) {
              break;
            }
            offset += k * i32(${re("uniforms.x_strides",i,e)});
        `;return`
          value = ${t.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `},T$=(t,e,r)=>{let o="";for(let i=e-1;i>=0;--i)o+=`
                k = i32(${t.indicesGet("indices",i)}) - ${re("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${re("uniforms.x_shape",i,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${re("uniforms.x_shape",i,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${re("uniforms.x_strides",i,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},I$=(t,e,r)=>{let o="";for(let i=e-1;i>=0;--i)o+=`
                k = i32(${t.indicesGet("indices",i)}) - ${re("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${re("uniforms.x_shape",i,e)})) {
                  k = i32(${re("uniforms.x_shape",i,e)}) - 1;
                }
                offset += k * i32(${re("uniforms.x_strides",i,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},C$=(t,e,r)=>{let o="";for(let i=e-1;i>=0;--i)o+=`
                k = i32(${t.indicesGet("indices",i)}) - ${re("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${re("uniforms.x_shape",i,e)}]);
                }
                if (k >= i32(${re("uniforms.x_shape",i,e)})) {
                  k -= i32(${re("uniforms.x_shape",i,e)});
                }
                offset += k * i32(${re("uniforms.x_strides",i,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${o}
              value = x[offset];
          `},A$=(t,e,r)=>{switch(r.mode){case 0:return S$(t,e,r.pads.length);case 1:return T$(t,e,r.pads.length);case 2:return I$(t,e,r.pads.length);case 3:return C$(t,e,r.pads.length);default:throw new Error("Invalid mode")}},k$=(t,e)=>{let r=N.padShape(t[0].dims.slice(),e.pads),o=t[0].dims,i=N.size(r),u=[{type:12,data:i},{type:6,data:e.pads}],d=t.length>=3&&t[2].data;e.mode===0&&u.push({type:d?t[2].dataType:1,data:e.value}),u.push(...X(t[0].dims,r));let l=["rank"],p=m=>{let g=K("output",t[0].dataType,r.length),y=L("x",t[0].dataType,o.length),w=y.type.value,$=A$(g,o.length,e),v=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&v.push({name:"constant_value",type:d?w:"f32"}),`
            ${m.registerUniforms(v).declareVariables(y,g)}
            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${g.offsetToIndices("global_idx")};

            var value = ${w}(0);
            ${$}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(N.size(r)/64)},programUniforms:u}),getShaderSource:p}},E$=(t,e)=>{if(t.length>1){let r=t[1].getBigInt64Array(),o=t.length>=3&&t[2].data?t[2].dataType===10?t[2].getUint16Array()[0]:t[2].getFloat32Array()[0]:0,i=t[0].dims.length,u=new Int32Array(2*i).fill(0);if(t.length>=4){let l=t[3].getBigInt64Array();for(let p=0;p<l.length;p++)u[Number(l[p])]=Number(r[p]),u[Number(l[p])+i]=Number(r[p+l.length])}else r.forEach((l,p)=>u[Number(p)]=Number(l));let d=[];return u.forEach(l=>d.push(l)),{mode:e.mode,value:o,pads:d}}else return e},dm=(t,e)=>{x$(t.inputs);let r=E$(t.inputs,e);t.compute(k$(t.inputs,r),{inputs:[0]})}});var $n,lm,pm,fm,mm,P$,O$,hm,gm,ym,bm,wm,_m,vm,$m,xm,Sm,Tm,Im,Cm=Q(()=>{"use strict";Ye();ce();fe();he();$n=t=>{if(Ce.webgpu.validateInputContent&&(!t||t.length!==1))throw new Error("Pool ops requires 1 input.")},lm=(t,e,r)=>{let o=e.format==="NHWC",i=t.dims.slice();o&&i.splice(1,0,i.pop());let u=Object.hasOwnProperty.call(e,"dilations"),d=e.kernelShape.slice(),l=e.strides.slice(),p=u?e.dilations.slice():[],m=e.pads.slice();Wt.adjustPoolAttributes(r,i,d,l,p,m);let g=Wt.computePoolOutputShape(r,i,l,p,d,m,e.autoPad),y=Object.assign({},e);u?Object.assign(y,{kernelShape:d,strides:l,pads:m,dilations:p,cacheKey:e.cacheKey}):Object.assign(y,{kernelShape:d,strides:l,pads:m,cacheKey:e.cacheKey});let w=g.slice();return w.push(w.splice(1,1)[0]),[y,o?w:g]},pm=(t,e)=>{let r=e.format==="NHWC",o=N.size(t),i=N.size(e.kernelShape),u=[{type:12,data:o},{type:12,data:i}],d=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let l=e.kernelShape[e.kernelShape.length-1],p=e.strides[e.strides.length-1],m=e.pads[e.pads.length/2-1],g=e.pads[e.pads.length-1],y=!!(m+g);u.push({type:12,data:l},{type:12,data:p},{type:12,data:m},{type:12,data:g}),d.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let w=!1;if(e.kernelShape.length===2){let $=e.kernelShape[e.kernelShape.length-2],v=e.strides[e.strides.length-2],S=e.pads[e.pads.length/2-2],k=e.pads[e.pads.length-2];w=!!(S+k),u.push({type:12,data:$},{type:12,data:v},{type:12,data:S},{type:12,data:k}),d.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[u,d,!0,y,w]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=N.computeStrides(e.kernelShape);u.push({type:12,data:l},{type:12,data:e.pads},{type:12,data:e.strides}),d.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let p=e.pads.reduce((m,g)=>m+g);return[u,d,!!p,!1,!1]}},fm=(t,e,r,o,i,u,d,l,p,m,g,y)=>{let w=i.format==="NHWC",$=e.type.value,v=K("output",e.type.tensor,o);if(i.kernelShape.length<=2){let S="",k="",C="",I=r-(w?2:1);if(g?S=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${I}] < 0 || xIndices[${I}]
                      >= uniforms.x_shape[${I}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${u}
                }`:S=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${u}
                }`,i.kernelShape.length===2){let P=r-(w?3:2);y?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${P}] = indices[${P}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${P}] < 0 || xIndices[${P}] >= uniforms.x_shape[${P}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${P}] = indices[${P}] * uniforms.sh - uniforms.phStart + j;
                `,C=`
              }
            `}return`
            ${t.registerUniforms(p).declareVariables(e,v)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var value = ${$}(${l});
              var pad = 0;
              ${k}
              ${S}
              ${C}
              ${d}

              output[global_idx] = value;
            }`}else{if(w)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let S=i.kernelShape.length,k=i.pads.length,C="";return m?C=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${u}
              }`:C=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${u}
            `,`
            ${t.registerUniforms(p).declareVariables(e,v)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var offsets: array<u32, ${S}>;

              var value = ${$}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${S-1}u; j++) {
                  offsets[j] = offset / ${re("uniforms.kernelStrides","j",S)};
                  offset -= offsets[j] * ${re("uniforms.kernelStrides","j",S)};
                }
                offsets[${S-1}] = offset;

                isPad = false;
                for (var j = ${r-S}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${re("uniforms.strides",`j - ${r-S}u`,S)}
                    + offsets[j - ${r-S}u] - ${re("uniforms.pads","j - 2u",k)};
                  ${C}
              }
              ${d}

              output[global_idx] = value;
            }`}},mm=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,P$=t=>`${mm(t)};${t.countIncludePad}`,O$=t=>`${mm(t)};${t.storageOrder};${t.dilations}`,hm=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),gm=(t,e,r,o)=>{let[i,u]=lm(e,o,r),d=L("x",e.dataType,e.dims.length),l=d.type.value,p="value += x_val;",m="";i.countIncludePad?m+=`value /= ${l}(uniforms.kernelSize);`:m+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[g,y,w,$,v]=pm(u,i);g.push(...X(e.dims,u));let S=["rank"];return{name:t,shaderCache:{hint:`${o.cacheKey};${w};${$};${v}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(N.size(u)/64)},programUniforms:g}),getShaderSource:k=>fm(k,d,e.dims.length,u.length,i,p,m,0,y,w,$,v)}},ym=t=>{let e=t.count_include_pad!==0,r=hm(t);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let o={countIncludePad:e,...r,cacheKey:""};return{...o,cacheKey:P$(o)}},bm=(t,e)=>{$n(t.inputs),t.compute(gm("AveragePool",t.inputs[0],!1,e))},wm={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},_m=t=>{let e=t.format;return{format:e,...wm,cacheKey:e}},vm=(t,e)=>{$n(t.inputs),t.compute(gm("GlobalAveragePool",t.inputs[0],!0,e))},$m=(t,e,r,o)=>{let[i,u]=lm(e,o,r),d=`
      value = max(x_val, value);
    `,l="",p=L("x",e.dataType,e.dims.length),m=["rank"],[g,y,w,$,v]=pm(u,i);return g.push(...X(e.dims,u)),{name:t,shaderCache:{hint:`${o.cacheKey};${w};${$};${v}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(N.size(u)/64)},programUniforms:g}),getShaderSource:S=>fm(S,p,e.dims.length,u.length,i,d,l,e.dataType===10?-65504:-1e5,y,w,$,v)}},xm=(t,e)=>{$n(t.inputs),t.compute($m("MaxPool",t.inputs[0],!1,e))},Sm=t=>{let e=t.storage_order,r=t.dilations,o=hm(t);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(o.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:e,dilations:r,...o,cacheKey:""};return{...i,cacheKey:O$(i)}},Tm=t=>{let e=t.format;return{format:e,...wm,cacheKey:e}},Im=(t,e)=>{$n(t.inputs),t.compute($m("GlobalMaxPool",t.inputs[0],!0,e))}});var D$,B$,Am,km,Em=Q(()=>{"use strict";ce();fe();De();he();D$=(t,e)=>{if(t.length<2||t.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(t.length===3&&t[1].dims===t[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(t.length===3&&t[0].dataType!==t[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(t[0].dataType===6&&t.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(t[1].dims.length!==0&&t[1].dims.length!==1&&t[1].dims.length!==t[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(t.length>2){if(t[0].dataType!==t[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(t[1].dims.length!==t[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!t[1].dims.map((r,o)=>r===t[2].dims[o]).reduce((r,o)=>r&&o,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(t[1].dims.length===0||t[1].dims.length===1&&t[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!t[1].dims.map((i,u)=>u===e.axis||i===t[0].dims[u]).reduce((i,u)=>i&&u,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(t[1].dims.length!==t[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=t[0].dims[e.axis],o=t[1].dims[e.axis];if(e.blockSize<Math.ceil(r/o)||e.blockSize>Math.ceil(r/(o-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},B$=(t,e)=>{let r=N.normalizeAxis(e.axis,t[0].dims.length),o=t[0].dataType,i=o===3,u=t[0].dims,d=t[1].dataType,l=N.size(u),p=o===3||o===2,m=p?[Math.ceil(N.size(t[0].dims)/4)]:t[0].dims,g=t[1].dims,y=t.length>2?t[2]:void 0,w=y?p?[Math.ceil(N.size(y.dims)/4)]:y.dims:void 0,$=g.length===0||g.length===1&&g[0]===1,v=$===!1&&g.length===1,S=$e(l),k=$&&(!p||S===4),C=k?S:1,I=k&&!p?S:1,E=L("input",p?12:o,m.length,I),P=L("scale",d,g.length),M=y?L("zero_point",p?12:o,w.length):void 0,R=K("output",d,u.length,C),W=[E,P];M&&W.push(M);let T=[m,g];y&&T.push(w);let j=[{type:12,data:l/C},{type:12,data:r},{type:12,data:e.blockSize},...X(...T,u)],Z=oe=>{let te=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${oe.registerUniforms(te).declareVariables(...W,R)}
      ${oe.mainStart()}
          ${oe.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${R.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${E.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${C===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${E.getByOffset("global_idx")};`};

          // Set scale input
          ${$?`let scale_value= ${P.getByOffset("0")}`:v?`
            let scale_index = ${R.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${P.getByOffset("scale_index")};`:`
            var scale_indices: ${P.type.indices} = output_indices;
            let index = ${P.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${P.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${P.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${M?$?p?`
                let zero_point_input = ${M.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${M.getByOffset("0")}`:v?p?`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${M.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${R.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${M.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${P.indicesToOffset("scale_indices")};
                let zero_point_input = ${M.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${M.getByIndices("scale_indices")};`:`let zero_point_value = ${p?i?"i32":"u32":E.type.value}(0);`};
      // Compute and write output
      ${R.setByOffset("global_idx",`${R.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:M?["rank","rank","rank"]:["rank","rank"]},getShaderSource:Z,getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/C/64),y:1,z:1},programUniforms:j})}},Am=(t,e)=>{D$(t.inputs,e),t.compute(B$(t.inputs,e))},km=t=>le({axis:t.axis,blockSize:t.blockSize})});var M$,R$,Pm,Om=Q(()=>{"use strict";Ye();ce();he();M$=(t,e,r)=>{let o=t===e,i=t<e&&r<0,u=t>e&&r>0;if(o||i||u)throw new Error("Range these inputs' contents are invalid.")},R$=(t,e,r,o)=>{let i=Math.abs(Math.ceil((e-t)/r)),u=[i],d=i,l=[{type:12,data:d},{type:o,data:t},{type:o,data:r},...X(u)],p=m=>{let g=K("output",o,u.length),y=g.type.value,w=[{name:"outputSize",type:"u32"},{name:"start",type:y},{name:"delta",type:y}];return`
        ${m.registerUniforms(w).declareVariables(g)}
        ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${y}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${o}`},getShaderSource:p,getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l})}},Pm=t=>{let e=0,r=0,o=0;t.inputs[0].dataType===6?(e=t.inputs[0].getInt32Array()[0],r=t.inputs[1].getInt32Array()[0],o=t.inputs[2].getInt32Array()[0]):t.inputs[0].dataType===1&&(e=t.inputs[0].getFloat32Array()[0],r=t.inputs[1].getFloat32Array()[0],o=t.inputs[2].getFloat32Array()[0]),Ce.webgpu.validateInputContent&&M$(e,r,o),t.compute(R$(e,r,o,t.inputs[0].dataType),{inputs:[]})}});var U$,N$,zm,Dm,Bm=Q(()=>{"use strict";ce();fe();De();he();U$=(t,e,r,o)=>{if(t!=="none"&&o!=="i32"&&o!=="u32"&&o!=="f32")throw new Error(`Input ${o} is not supported with reduction ${t}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,u=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(t){case"none":return`${e}=${r};`;case"add":return o==="i32"||o==="u32"?`atomicAdd(&${e}, bitcast<${o}>(${r}));`:`
              ${i}bitcast<${o}>(oldValue) + (${r})${u}`;case"max":return o==="i32"||o==="u32"?`atomicMax(&${e}, bitcast<${o}>(${r}));`:`
                ${i}max(bitcast<f32>(oldValue), (${r}))${u}`;case"min":return o==="i32"||o==="u32"?`atomicMin(&${e}, bitcast<${o}>(${r}));`:`${i}min(bitcast<${o}>(oldValue), (${r}))${u}`;case"mul":return`${i}(bitcast<${o}>(oldValue) * (${r}))${u}`;default:throw new Error(`Reduction ${t} is not supported.`)}},N$=(t,e)=>{let r=t[0].dims,o=t[1].dims,i=r,u=1,d=Math.ceil(N.sizeToDimension(o,o.length-1)/u),l=o[o.length-1],p=N.sizeFromDimension(r,l),m=[{type:12,data:d},{type:12,data:l},{type:12,data:p},...X(t[1].dims,t[2].dims,i)],g=y=>{let w=L("indices",t[1].dataType,t[1].dims.length),$=L("updates",t[2].dataType,t[2].dims.length,u),v=e.reduction!=="none"&&e.reduction!==""?al("output",t[0].dataType,i.length):K("output",t[0].dataType,i.length,u);return`
      ${y.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(w,$,v)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${t[0].dims.length===1?`
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
    ${U$(e.reduction,"output[data_offset + i]","value",v.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:g}},zm=t=>le({reduction:t.reduction}),Dm=(t,e)=>{t.compute(N$(t.inputs,e),{inputs:[t.inputs[1],t.inputs[2]],outputs:[]})}});var V$,L$,W$,Mm,G$,H$,F$,q$,j$,K$,Z$,Q$,Rm,Y$,X$,J$,ex,tx,Um,Nm,Vm=Q(()=>{"use strict";ce();fe();De();he();V$=(t,e)=>{if(t.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),t.length>0){if(e.mode==="linear"){if(!(t.length===2||t.length===3||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1||t.length===5&&t[0]===1&&t[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(t.length===2||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},L$=(t,e,r)=>{e.every(i=>i>=0&&i<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let o=new Array(r).fill(1);return e.forEach((i,u)=>o[i]=t[u]),o},W$=(t,e,r,o,i,u)=>{let[d,l,p]=r>10?[1,2,3]:[-1,t.length>1?1:-1,-1],m=t[0].dims.length;if(d>0&&t.length>d&&t[d].dims.length>0)t[d].getFloat32Array().forEach(g=>u.push(g));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&t.length>l&&t[l].dims.length===1&&t[l].dims[0]>0){if(t[l].getFloat32Array().forEach(g=>o.push(g)),o.length!==0&&o.length!==m&&r>=18&&o.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");V$(o,e),e.axes.length>0&&L$(o,e.axes,m).forEach((g,y)=>o[y]=g)}if(p>0&&t.length>p&&t[p].dims.length===1&&t[p].dims[0]>0&&(t[p].getBigInt64Array().forEach(g=>i.push(Number(g))),i.length!==0&&i.length!==m&&r>=18&&i.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof o<"u"&&typeof i<"u"&&o.length>0&&i.length>m)throw new Error("Resize requires only of scales or sizes to be specified")},Mm=(t,e,r,o)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${t}) * (${e});
  let whole = ${o}(big / (${r}));
  let fract = ${o}(big % (${r})) / ${o}(${r});
  return whole + fract;
`,G$=(t,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(t){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${Mm("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Mm("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${t} is not supported`)}})()+"}",H$=(t,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(t){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${t} is not supported`)}})()+"}",F$=(t,e,r)=>{let o=new Array(r).fill(0).concat(new Array(r).fill(1)),i=t.length===0?o:t.slice();return e.length>0?(e.forEach((u,d)=>{o[u]=i[d],o[d+r]=i[e.length+d]}),o):i},q$=(t,e,r,o)=>{let i=[];if(r.length>0)if(o.length>0){if(t.forEach(u=>i.push(u)),Math.max(...o)>t.length)throw new Error("axes is out of bound");o.forEach((u,d)=>i[u]=r[d])}else r.forEach(u=>i.push(u));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");i=t.map((u,d)=>Math.round(u*e[d]))}return i},j$=(t,e,r)=>{let o=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(u=>e[u]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(u=>e[u]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let i=t.slice();return r.axes.length>0?(r.axes.forEach(u=>e[u]=o),r.axes.forEach(u=>i[u]=Math.round(t[u]*e[u]))):(e.fill(o,0,e.length),i.forEach((u,d)=>i[d]=Math.round(u*e[d]))),i},K$=(t,e,r,o,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> array<${t.type.value}, ${r.length}> {
      var original_indices: array<${t.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var scale = ${re("uniforms.scales","i",o)};
        var roi_low = ${re("uniforms.roi","i",i)};
        var roi_hi = ${re("uniforms.roi",`i + ${e.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${t.type.value}(output_index);
        } else {
          var input_shape_i = ${re("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Z$=(t,e,r,o,i,u,d)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
      var input_indices: ${t.type.indices};
      for (var i:u32 = 0; i < ${o.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${re("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${re("uniforms.roi","i",u)};
          var roi_hi = ${re("uniforms.roi",`i + ${r.length}`,u)};
          var input_shape_i = ${re("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${re("uniforms.output_shape","i",o.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${d} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
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
        ${t.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Q$=(t,e)=>`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${re("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Rm=(t,e,r,o)=>t.rank>o?`
    ${t.indicesSet("input_indices",e,"channel")};
    ${t.indicesSet("input_indices",r,"batch")};
`:"",Y$=(t,e,r,o,i)=>{let[d,l,p,m]=r.length===2?[-1,0,1,-1]:[0,2,3,1],g=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${g} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",l,`max(0, min(row, ${r[l]} - 1))`)};
      ${t.indicesSet("input_indices",p,`max(0, min(col, ${r[p]} - 1))`)};
      ${Rm(t,m,d,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${g} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${g} = originalIndices[${l}];
      var col:${g} = originalIndices[${p}];
      ${o?`if (row < 0 || row > (${r[l]} - 1) || col < 0 || col > (${r[p]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[l]} - 1));
      col = max(0, min(col, ${r[p]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var x11: ${g} = getInputValue(batch, channel, row1, col1);
      var x12: ${g} = getInputValue(batch, channel, row1, col2);
      var x21: ${g} = getInputValue(batch, channel, row2, col1);
      var x22: ${g} = getInputValue(batch, channel, row2, col2);
      var dx1: ${g} = abs(row - ${g}(row1));
      var dx2: ${g} = abs(${g}(row2) - row);
      var dy1: ${g} = abs(col - ${g}(col1));
      var dy2: ${g} = abs(${g}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},X$=(t,e,r,o,i,u,d,l,p,m)=>{let g=r.length===2,y=!0,[w,$]=g?[0,1]:y?[2,3]:[1,2],v=t.type.value,S=k=>{let C=k===w?"row":"col";return`
      fn ${C}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${e.type.indices}) -> ${v} {
        var output_index = ${e.indicesGet("output_indices",k)};
        var originalIdx: ${v} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[k]},
        ${o[k]}, ${r[k]}, ${u[k]}, ${u[k]} + ${r.length});
        var fractOriginalIdx: ${v} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[k]} - 1))) {
          return ${p};
        }
        var data: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${C}: ${v} = originalIdx + ${v}(i);
          if (${C} < 0 || ${C} >= ${r[k]}) {
            ${m?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${p};`:`${C} = max(0, min(${C}, ${r[k]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",k,`u32(${C})`)};
          data[i + 1] = ${k===w?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${S(w)};
    ${S($)};
  fn getCubicInterpolationCoefs(s: ${v}) -> array<${v}, 4> {
    var absS = abs(s);
    var coeffs: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${v} = 1.0 - absS;
    var twoMinusAbsS: ${v} = 2.0 - absS;
    var onePlusAbsS: ${v} = 1.0 + absS;
    coeffs[0] = ((${d} * onePlusAbsS - 5 * ${d}) * onePlusAbsS + 8 * ${d}) * onePlusAbsS - 4 * ${d};
    coeffs[1] = ((${d} + 2) * absS - (${d} + 3)) * absS * absS + 1;
    coeffs[2] = ((${d} + 2) * oneMinusAbsS - (${d} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${d} * twoMinusAbsS - 5 * ${d}) * twoMinusAbsS + 8 * ${d}) * twoMinusAbsS - 4 * ${d};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${v}, 4>, coefs: array<${v}, 4>) -> ${v} {
    var coefsSum: ${v} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${v} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},J$=(t,e,r,o,i)=>{let[d,l,p,m,g]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],y=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${y} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",l,`max(0, min(depth, ${r[l]} - 1))`)};
      ${t.indicesSet("input_indices",p,`max(0, min(height, ${r[p]} - 1))`)};
      ${t.indicesSet("input_indices",m,`max(0, min(width, ${r[m]} - 1))`)};
      ${Rm(t,g,d,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${y} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${y} = originalIndices[${l}];
      var height:${y} = originalIndices[${p}];
      var width:${y} = originalIndices[${m}];
      ${o?`if (depth < 0 || depth > (${r[l]} - 1) || height < 0 || height > (${r[p]} - 1) || width < 0 || (width > ${r[m]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[l]} - 1));
      height = max(0, min(height, ${r[p]} - 1));
      width = max(0, min(width, ${r[m]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${g}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${d}])`:"0"};

      var x111: ${y} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${y} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${y} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${y} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${y} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${y} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${y} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${y} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${y} = abs(depth - ${y}(depth1));
      var dx2: ${y} = abs(${y}(depth2) - depth);
      var dy1: ${y} = abs(height - ${y}(height1));
      var dy2: ${y} = abs(${y}(height2) - height);
      var dz1: ${y} = abs(width - ${y}(width1));
      var dz2: ${y} = abs(${y}(width2) - width);
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
    }`},ex=(t,e,r,o,i,u)=>{let d=t.dims,l=F$(u,e.axes,d.length),p=q$(d,o,i,e.axes),m=o.slice();o.length===0&&(m=d.map((I,E)=>I===0?1:p[E]/I),e.keepAspectRatioPolicy!=="stretch"&&(p=j$(d,m,e)));let g=K("output",t.dataType,p.length),y=L("input",t.dataType,d.length),w=N.size(p),$=d.length===p.length&&d.every((I,E)=>I===p[E]),v=e.coordinateTransformMode==="tf_crop_and_resize",S=e.extrapolationValue,k=y.type.value,C=I=>`
      ${$?"":`
      ${G$(e.coordinateTransformMode,k)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${Q$(y,d)};
              ${H$(e.nearestMode,r,k)};
              ${Z$(y,g,d,p,m.length,l.length,v)};
              `;case"linear":return`
              ${K$(g,d,p,m.length,l.length)};
              ${(()=>{if(d.length===2||d.length===4)return`${Y$(y,g,d,v,S)}`;if(d.length===3||d.length===5)return`${J$(y,g,d,v,S)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(d.length===2||d.length===4)return`${X$(y,g,d,p,m,l,e.cubicCoeffA,v,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${I.registerUniform("output_size","u32").registerUniform("scales","f32",m.length).registerUniform("roi","f32",l.length).declareVariables(y,g)}
      ${I.mainStart()}
        ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${$?"output[global_idx] = input[global_idx];":`
        let output_indices = ${g.offsetToIndices("global_idx")};
        var input_indices: ${y.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${y.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${d.length===2||d.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${m.length>0?e.mode==="cubic"?m:m.length:""}|${i.length>0?i:""}|${l.length>0?l:""}|${$}|${e.mode==="nearest"?d.length:d}`,inputDependencies:["rank"]},getShaderSource:C,getRunData:()=>({outputs:[{dims:p,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},{type:1,data:m},{type:1,data:l},...X(d,p)]})}},tx=t=>{let e=t.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},Um=(t,e)=>{let r=[],o=[],i=[],u=tx(t);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");W$(t.inputs,e,u,r,o,i),t.compute(ex(t.inputs[0],e,u,r,o,i),{inputs:[0]})},Nm=t=>{let e=t.antialias,r=t.axes,o=t.coordinateTransformMode,i=t.cubicCoeffA,u=t.excludeOutside!==0,d=t.extrapolationValue,l=t.keepAspectRatioPolicy,p=t.mode,m=t.nearestMode===""?"simple":t.nearestMode;return le({antialias:e,axes:r,coordinateTransformMode:o,cubicCoeffA:i,excludeOutside:u,extrapolationValue:d,keepAspectRatioPolicy:l,mode:p,nearestMode:m})}});var rx,nx,Lm,Wm=Q(()=>{"use strict";ce();fe();he();rx=t=>{if(!t||t.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=t[0],r=t[1],o=t[2];if(e.dataType!==r.dataType||e.dataType!==o.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=e.dims[e.dims.length-1],u=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==u)throw new Error("Skip must have the same sequence length as input");if(o.dims.length!==1)throw new Error("Gamma must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(t.length>3){let d=t[3];if(d.dims.length!==1)throw new Error("Beta must be 1D");if(d.dims[d.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(t.length>4){let d=t[4];if(d.dims.length!==1)throw new Error("Bias must be 1D");if(d.dims[d.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},nx=(t,e,r,o)=>{let i=e.simplified,u=t[0].dims,d=N.size(u),l=u,p=d,m=u.slice(-1)[0],g=o?u.slice(0,-1).concat(1):[],y=!i&&t.length>3,w=t.length>4,$=o&&r>1,v=o&&r>2,S=r>3,k=64,C=$e(m),I=[{type:12,data:p},{type:12,data:C},{type:12,data:m},{type:1,data:e.epsilon}],E=M=>{let R=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],W=[L("x",t[0].dataType,t[0].dims,C),L("skip",t[1].dataType,t[1].dims,C),L("gamma",t[2].dataType,t[2].dims,C)];y&&W.push(L("beta",t[3].dataType,t[3].dims,C)),w&&W.push(L("bias",t[4].dataType,t[4].dims,C)),W.push(K("output",t[0].dataType,l,C)),$&&W.push(K("mean_output",1,g)),v&&W.push(K("inv_std_output",1,g)),S&&W.push(K("input_skip_bias_sum",t[0].dataType,l,C));let T=Ae(t[0].dataType),j=Ae(1,C);return`

      ${M.registerUniforms(R).declareVariables(...W)}
      var<workgroup> sum_shared : array<${j}, ${k}>;
      var<workgroup> sum_squared_shared : array<${j}, ${k}>;

      ${M.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${w?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${S?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ht(T,C,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
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
        let mean = ${ot("sum",C)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ot("square_sum",C)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${$?"mean_output[global_idx] = mean;":""}
        ${v?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${y?"+ beta[offset1d + i]":""};
        }
      }`},P=[{dims:l,dataType:t[0].dataType}];return r>1&&P.push({dims:g,dataType:1}),r>2&&P.push({dims:g,dataType:1}),r>3&&P.push({dims:u,dataType:t[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${C};${$};${v};${S}`,inputDependencies:t.map((M,R)=>"type")},getShaderSource:E,getRunData:()=>({outputs:P,dispatchGroup:{x:Math.ceil(p/m)},programUniforms:I})}},Lm=(t,e)=>{rx(t.inputs);let o=[0];t.outputCount>1&&o.push(-3),t.outputCount>2&&o.push(-3),t.outputCount>3&&o.push(3),t.compute(nx(t.inputs,e,t.outputCount,!1),{outputs:o})}});var ox,xn,ix,Gm,ax,sx,Hm,Fm,qm=Q(()=>{"use strict";ce();fe();De();he();ox=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");t.slice(1).forEach((r,o)=>{if(t[o+1].dataType!==6&&t[o+1].dataType!==7)throw new Error(`Input ${o} must be an array of int32 or int64`)})},xn=(t,e)=>{let r=[];if(t.length>e)if(t[e].dataType===7)t[e].getBigInt64Array().forEach(o=>r.push(Number(o)));else if(t[e].dataType===6)t[e].getInt32Array().forEach(o=>r.push(Number(o)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},ix=(t,e)=>{if(t.length>1){let r=xn(t,1),o=xn(t,2),i=xn(t,3);return i.length===0&&(i=[...Array(t[0].dims.length).keys()]),le({starts:r,ends:o,axes:i})}else return e},Gm=(t,e,r,o,i)=>{let u=t;return t<0&&(u+=r[o[e]]),i[e]<0?Math.max(0,Math.min(u,r[o[e]]-1)):Math.max(0,Math.min(u,r[o[e]]))},ax=(t,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${re("uniforms.input_shape","i",r.length)};
            let steps_i = ${re("uniforms.steps","i",r.length)};
            let signs_i = ${re("uniforms.signs","i",r.length)};
            let starts_i = ${re("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${t.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,sx=(t,e)=>{let r=t[0].dims,o=N.size(r),i=e.axes.length>0?N.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],u=xn(t,4);u.forEach(C=>C!==0||(()=>{throw new Error("step cannot be 0")})),u.length===0&&(u=Array(i.length).fill(1));let d=e.starts.map((C,I)=>Gm(C,I,r,i,u)),l=e.ends.map((C,I)=>Gm(C,I,r,i,u));if(i.length!==d.length||i.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let C=0;C<r.length;++C)i.includes(C)||(d.splice(C,0,0),l.splice(C,0,r[C]),u.splice(C,0,1));let p=u.map(C=>Math.sign(C));u.forEach((C,I,E)=>{if(C<0){let P=(l[I]-d[I])/C,M=d[I],R=M+P*u[I];d[I]=R,l[I]=M,E[I]=-C}});let m=r.slice(0);i.forEach((C,I)=>{m[C]=Math.ceil((l[C]-d[C])/u[C])});let g={dims:m,dataType:t[0].dataType},y=K("output",t[0].dataType,m.length),w=L("input",t[0].dataType,t[0].dims.length),$=N.size(m),v=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:d.length},{name:"signs",type:"i32",length:p.length},{name:"steps",type:"u32",length:u.length}],S=[{type:12,data:$},{type:12,data:d},{type:6,data:p},{type:12,data:u},...X(t[0].dims,m)],k=C=>`
      ${C.registerUniforms(v).declareVariables(w,y)}
        ${ax(w,y,r)}
        ${C.mainStart()}
          ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${y.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${y.setByOffset("global_idx",w.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${p.length}_${d.length}_${u.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[g],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:S})}},Hm=(t,e)=>{ox(t.inputs,e);let r=ix(t.inputs,e);t.compute(sx(t.inputs,r),{inputs:[0]})},Fm=t=>{let e=t.starts,r=t.ends,o=t.axes;return le({starts:e,ends:r,axes:o})}});var ux,dx,jm,Km,Zm=Q(()=>{"use strict";ce();fe();De();$t();he();ux=t=>{if(!t||t.length!==1)throw new Error("Softmax op requires 1 input.")},dx=(t,e)=>{let r=t.inputs[0],o=r.dims,i=N.size(o),u=o.length,d=N.normalizeAxis(e.axis,u),l=d<o.length-1,p,m=[];l?(m=Array.from({length:u},(W,T)=>T),m[d]=u-1,m[u-1]=d,p=t.compute(Ge(r,m),{inputs:[r],outputs:[-1]})[0]):p=r;let g=p.dims,y=g[u-1],w=i/y,$=$e(y),v=y/$,S=64;w===1&&(S=256);let k=(W,T)=>T===4?`max(max(${W}.x, ${W}.y), max(${W}.z, ${W}.w))`:T===2?`max(${W}.x, ${W}.y)`:T===3?`max(max(${W}.x, ${W}.y), ${W}.z)`:W,C=L("x",p.dataType,p.dims,$),I=K("result",p.dataType,p.dims,$),E=C.type.value,P=Ae(p.dataType)==="f32"?`var threadMax = ${E}(-3.4028234663852886e+38f);`:`var threadMax = ${E}(-65504.0h);`,M=W=>`
      var<workgroup> rowMaxShared : ${E};
      var<workgroup> rowSumShared : ${E};
      var<workgroup> threadShared : array<${E}, ${S}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${E} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${E}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${W.registerUniform("packedCols","i32").declareVariables(C,I)}
      ${W.mainStart(S)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${S};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${P}
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
          rowMaxShared = ${E}(${k("threadShared[0]",$)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${E}(0.0);
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
          rowSumShared = ${E}(${ot("threadShared[0]",$)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${E}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,R=t.compute({name:"Softmax",shaderCache:{hint:`${$};${S}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:g,dataType:p.dataType}],dispatchGroup:{x:w},programUniforms:[{type:6,data:v}]}),getShaderSource:M},{inputs:[p],outputs:[l?-1:0]})[0];l&&t.compute(Ge(R,m),{inputs:[R]})},jm=(t,e)=>{ux(t.inputs),dx(t,e)},Km=t=>le({axis:t.axis})});var Qm,cx,lx,px,Ym,Xm=Q(()=>{"use strict";ce();fe();he();Qm=t=>Array.from(t.getBigInt64Array(),Number),cx=t=>{if(!t||t.length!==2)throw new Error("Tile requires 2 inputs.");if(t[0].dataType!==1&&t[0].dataType!==10&&t[0].dataType!==6&&t[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(t[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(t[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Qm(t[1]).length!==t[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},lx=(t,e)=>{let r=[];for(let o=0;o<t.length;++o)r.push(t[o]*e[o]);return r},px=(t,e)=>{let r=t[0].dims,o=e??Qm(t[1]),i=lx(r,o),u=N.size(i),d=t[0].dataType,l=L("input",d,r.length),p=K("output",d,i.length),m=g=>`
      const inputShape = ${l.indices(...r)};
      ${g.registerUniform("output_size","u32").declareVariables(l,p)}
      ${g.mainStart()}
      ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${p.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${p.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${p.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${o}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},...X(t[0].dims,i)]}),getShaderSource:m}},Ym=t=>{cx(t.inputs),t.compute(px(t.inputs),{inputs:[0]})}});var fx,mx,Jm,eh=Q(()=>{"use strict";ce();fe();he();fx=(t,e,r,o,i)=>{let u=K("output_data",i,r.length,4),d=L("a_data",e[1].dataType,e[1].dims.length,4),l=L("b_data",e[2].dataType,e[2].dims.length,4),p=L("c_data",e[0].dataType,e[0].dims.length,4),m,g=(y,w,$)=>`select(${w}, ${y}, ${$})`;if(!o)m=u.setByOffset("global_idx",g(d.getByOffset("global_idx"),l.getByOffset("global_idx"),p.getByOffset("global_idx")));else{let y=(w,$,v="")=>{let S=`a_data[index_a${$}][component_a${$}]`,k=`b_data[index_b${$}][component_b${$}]`,C=`bool(c_data[index_c${$}] & (0xffu << (component_c${$} * 8)))`;return`
            let output_indices${$} = ${u.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offset_a${$} = ${d.broadcastedIndicesToOffset(`output_indices${$}`,u)};
            let offset_b${$} = ${l.broadcastedIndicesToOffset(`output_indices${$}`,u)};
            let offset_c${$} = ${p.broadcastedIndicesToOffset(`output_indices${$}`,u)};
            let index_a${$} = offset_a${$} / 4u;
            let index_b${$} = offset_b${$} / 4u;
            let index_c${$} = offset_c${$} / 4u;
            let component_a${$} = offset_a${$} % 4u;
            let component_b${$} = offset_b${$} % 4u;
            let component_c${$} = offset_c${$} % 4u;
            ${w}[${$}] = ${v}(${g(S,k,C)});
          `};i===9?m=`
            var data = vec4<u32>(0);
            ${y("data",0,"u32")}
            ${y("data",1,"u32")}
            ${y("data",2,"u32")}
            ${y("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:m=`
            ${y("output_data[global_idx]",0)}
            ${y("output_data[global_idx]",1)}
            ${y("output_data[global_idx]",2)}
            ${y("output_data[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(p,d,l,u)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${m}
      }`},mx=t=>{let e=t[1].dims,r=t[2].dims,o=t[0].dims,i=t[1].dataType,u=!(N.areEqual(e,r)&&N.areEqual(r,o)),d=e,l=N.size(e);if(u){let m=ft.calcShape(ft.calcShape(e,r,!1),o,!1);if(!m)throw new Error("Can't perform where op on the given tensors");d=m,l=N.size(d)}let p=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:m=>fx(m,t,d,u,i),getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:p},...X(o,e,r,d)]})}},Jm=t=>{t.compute(mx(t.inputs))}});var th,rh=Q(()=>{"use strict";Bl();ln();Ul();Vl();Tp();Mp();Np();tf();df();pf();hf();_f();xf();Tf();Af();Pf();Df();Rf();Vf();Gf();Xf();tm();nm();im();um();No();cm();Cm();Em();Om();Bm();dn();Vm();Wo();Wm();qm();Zm();Lo();Xm();$t();fn();eh();th=new Map([["Abs",[Ll]],["Acos",[Wl]],["Acosh",[Gl]],["Add",[Ip]],["ArgMax",[Dl,Io]],["ArgMin",[zl,Io]],["Asin",[Hl]],["Asinh",[Fl]],["Atan",[ql]],["Atanh",[jl]],["Attention",[Ml]],["AveragePool",[bm,ym]],["BatchNormalization",[Rl]],["BiasAdd",[Nl]],["BiasSplitGelu",[Sp]],["Cast",[Zl,Kl]],["Ceil",[Yl]],["Clip",[Ql]],["Concat",[Rp,Up]],["Conv",[Bo,Do]],["ConvTranspose",[uf,af]],["Cos",[Xl]],["Cosh",[Jl]],["CumSum",[cf,lf]],["DepthToSpace",[ff,mf]],["DequantizeLinear",[Am,km]],["Div",[Cp]],["Einsum",[bf,wf]],["Elu",[ep,fr]],["Equal",[Ap]],["Erf",[tp]],["Exp",[rp]],["Expand",[$f]],["FastGelu",[Sf]],["Floor",[np]],["FusedConv",[Bo,Do]],["Gather",[Cf,If]],["GatherElements",[Mf,Bf]],["GatherBlockQuantized",[Of,zf]],["GatherND",[kf,Ef]],["Gelu",[op]],["Gemm",[Nf,Uf]],["GlobalAveragePool",[vm,_m]],["GlobalMaxPool",[Im,Tm]],["Greater",[Op]],["GreaterOrEqual",[Dp]],["GridSample",[Lf,Wf]],["GroupQueryAttention",[Yf]],["HardSigmoid",[pp,lp]],["InstanceNormalization",[em]],["LayerNormalization",[rm]],["LeakyRelu",[ip,fr]],["Less",[zp]],["LessOrEqual",[Bp]],["Log",[vp]],["MatMul",[om]],["MatMulNBits",[am,sm]],["MaxPool",[xm,Sm]],["Mul",[kp]],["MultiHeadAttention",[qf,Ff]],["Neg",[sp]],["Not",[ap]],["Pad",[dm]],["Pow",[Ep]],["QuickGelu",[$p,fr]],["Range",[Pm]],["Reciprocal",[up]],["ReduceMin",[Cl]],["ReduceMean",[$l]],["ReduceMax",[Il]],["ReduceSum",[kl]],["ReduceProd",[Al]],["ReduceL1",[xl]],["ReduceL2",[Sl]],["ReduceLogSum",[Pl]],["ReduceLogSumExp",[Tl]],["ReduceSumSquare",[El]],["Relu",[dp]],["Resize",[Um,Nm]],["RotaryEmbedding",[Zf]],["ScatterND",[Dm,zm]],["Sigmoid",[cp]],["Sin",[fp]],["Sinh",[mp]],["Slice",[Hm,Fm]],["SkipLayerNormalization",[Lm]],["Split",[jf,Kf]],["Sqrt",[hp]],["Softmax",[jm,Km]],["Sub",[Pp]],["Tan",[gp]],["Tanh",[bp]],["ThresholdedRelu",[_p,fr]],["Tile",[Ym]],["Transpose",[dl,cl]],["Where",[Jm]]])});var Sn,nh=Q(()=>{"use strict";Ye();pt();he();Sn=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,o,i,u){Qe(e.programInfo.name);let d=this.backend.device,l=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let p=[];for(let g of r)p.push({binding:p.length,resource:{buffer:g.buffer}});for(let g of o)p.push({binding:p.length,resource:{buffer:g.buffer}});u&&p.push({binding:p.length,resource:u});let m=d.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:p,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let g={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:m,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(g)}l.setPipeline(e.computePipeline),l.setBindGroup(0,m),l.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),je(e.programInfo.name)}dispose(){}build(e,r){Qe(e.name);let o=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(y=>{o.features.has(y.feature)&&i.push(`enable ${y.extension};`)});let d=sl(r,this.backend.device.limits),l=e.getShaderSource(d),p=`${i.join(`
`)}
${d.additionalImplementations}
${l}`,m=o.createShaderModule({code:p,label:e.name});ge("verbose",()=>`[WebGPU] ${e.name} shader code: ${p}`);let g=o.createComputePipeline({compute:{module:m,entryPoint:"main"},layout:"auto",label:e.name});return je(e.name),{programInfo:e,computePipeline:g,uniformVariablesInfo:d.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,o=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,u=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=u&&o<=u&&i<=u)return[r,o,i];let d=r*o*i,l=Math.ceil(Math.sqrt(d));if(l>u){if(l=Math.ceil(Math.cbrt(d)),l>u)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[l,l,l]}else return[l,l,1]}}});var oh={};Zt(oh,{WebGpuBackend:()=>Ho});var hx,gx,Go,Ho,ih=Q(()=>{"use strict";Ye();ce();pt();mo();il();rh();nh();hx=(t,e)=>{if(e.length!==t.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${t.length}.`);let r=[];for(let o=0;o<t.length;++o){let i=t[o].dataType;switch(e[o]){case"none":{r.push("");break}case"type":{r.push(`${i}`);break}case"rank":{let u=t[o].dims.length;r.push(`${i};${u}`);break}case"dims":{let u=t[o].dims.join(",");r.push(`${i};${u}`);break}default:throw new Error(`unsupported input dependency: ${e[o]}`)}}return r.join("|")},gx=(t,e,r)=>{let o=t.name;return t.shaderCache?.hint&&(o+="["+t.shaderCache.hint+"]"),o+=":"+r+`:${hx(e,t.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,o},Go=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ho=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let o=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:o},u=d=>r.features.has(d)&&o.push(d)&&!0;u("chromium-experimental-timestamp-query-inside-passes")||u("timestamp-query"),u("shader-f16"),u("subgroups"),this.device=await r.requestDevice(i),this.adapterInfo=new Go(r.info||await r.requestAdapterInfo()),this.gpuDataManager=ol(this),this.programManager=new Sn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Xr(e.logLevel,!!e.debug),this.device.onuncapturederror=d=>{d.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${d.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Qe(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),o=this.pendingQueries.get(e);for(let i=0;i<r.length/2;i++){let u=o[i],d=u.kernelId,l=this.kernels.get(d),p=l.kernelType,m=l.kernelName,g=u.programName,y=u.inputTensorViews,w=u.outputTensorViews,$=r[i*2],v=r[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=$);let S=Number($-this.queryTimeBase),k=Number(v-this.queryTimeBase);if(!Number.isSafeInteger(S)||!Number.isSafeInteger(k))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:y.map(C=>({dims:C.dims,dataType:lt(C.dataType)})),outputsMetadata:w.map(C=>({dims:C.dims,dataType:lt(C.dataType)})),kernelId:d,kernelType:p,kernelName:m,programName:g,startTime:S,endTime:k});else{let C="";y.forEach((E,P)=>{C+=`input[${P}]: [${E.dims}] | ${lt(E.dataType)}, `});let I="";w.forEach((E,P)=>{I+=`output[${P}]: [${E.dims}] | ${lt(E.dataType)}, `}),console.log(`[profiling] kernel "${d}|${p}|${m}|${g}" ${C}${I}start time: ${S} ns, execution time: ${k-S} ns`)}Br("GPU",`${g}::${$}::${v}`)}e.unmap(),this.pendingQueries.delete(e)}),je()}run(e,r,o,i,u,d){Qe(e.name);let l=[];for(let E=0;E<r.length;++E){let P=r[E].data;if(P===0)continue;let M=this.gpuDataManager.get(P);if(!M)throw new Error(`no GPU data for input: ${P}`);l.push(M)}let{outputs:p,dispatchGroup:m,programUniforms:g}=e.getRunData(r),y=o.length===0?p.map((E,P)=>P):o;if(y.length!==p.length)throw new Error(`Output size ${y.length} must be equal to ${p.length}.`);let w=[],$=[];for(let E=0;E<p.length;++E){if(!Number.isInteger(y[E])||y[E]<-3||y[E]>=d)throw new Error(`Invalid output index: ${y[E]}`);if(y[E]===-3)continue;let P=y[E]===-1,M=y[E]===-2,R=P||M?u(p[E].dataType,p[E].dims):i(y[E],p[E].dataType,p[E].dims);if(w.push(R),R.data===0)continue;let W=this.gpuDataManager.get(R.data);if(!W)throw new Error(`no GPU data for output: ${R.data}`);if(P&&this.temporaryData.push(W),M){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(W)}$.push(W)}if(l.length!==r.length||$.length!==w.length){if($.length===0)return je(e.name),w;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let v;if(g){let E=0,P=[];g.forEach(T=>{let j=typeof T.data=="number"?[T.data]:T.data;if(j.length===0)return;let Z=T.type===10?2:4,oe,te;T.type===10?(te=j.length>4?16:j.length>2?8:j.length*Z,oe=j.length>4?16:Z*j.length):(te=j.length<=2?j.length*Z:16,oe=16),E=Math.ceil(E/te)*te,P.push(E);let ue=T.type===10?8:4;E+=j.length>4?Math.ceil(j.length/ue)*oe:j.length*Z});let M=16;E=Math.ceil(E/M)*M;let R=new ArrayBuffer(E);g.forEach((T,j)=>{let Z=P[j],oe=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(R,Z,oe.length).set(oe);else if(T.type===12)new Uint32Array(R,Z,oe.length).set(oe);else if(T.type===10)new Uint16Array(R,Z,oe.length).set(oe);else if(T.type===1)new Float32Array(R,Z,oe.length).set(oe);else throw new Error(`Unsupported uniform type: ${lt(T.type)}`)});let W=this.gpuDataManager.create(E,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(W.buffer,0,R,0,E),this.gpuDataManager.release(W.id),v={offset:0,size:E,buffer:W.buffer}}let S=this.programManager.normalizeDispatchGroupSize(m),k=S[1]===1&&S[2]===1,C=gx(e,r,k),I=this.programManager.getArtifact(C);if(I||(I=this.programManager.build(e,S),this.programManager.setArtifact(C,I),ge("info",()=>`[artifact] key: ${C}, programName: ${e.name}`)),g&&I.uniformVariablesInfo){if(g.length!==I.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${I.uniformVariablesInfo.length}, got ${g.length} in program "${I.programInfo.name}".`);for(let E=0;E<g.length;E++){let P=g[E],M=P.type,R=typeof P.data=="number"?1:P.data.length,[W,T]=I.uniformVariablesInfo[E];if(M!==W||R!==T)throw new Error(`Uniform variable ${E} mismatch: expect type ${W} with size ${T}, got type ${M} with size ${R} in program "${I.programInfo.name}".`)}}if(ge("info",()=>`[ProgramManager] run "${e.name}" (key=${C}) with ${S[0]}x${S[1]}x${S[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let E={kernelId:this.currentKernelId,programName:I.programInfo.name,inputTensorViews:r,outputTensorViews:w};this.pendingKernels.push(E),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(E)}return this.programManager.run(I,l,$,S,v),je(e.name),w}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,o,i){let u=th.get(e);if(!u)throw new Error(`kernel not implemented: ${e}`);let d={kernelType:e,kernelName:i,kernelEntry:u[0],attributes:[u[1],o]};this.kernels.set(r,d)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let o of r)this.gpuDataManager.release(o.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,o){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let u=i.kernelType,d=i.kernelName,l=i.kernelEntry,p=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${u}] ${d}" is not allowed to be called recursively`);this.currentKernelId=e,p[0]&&(p[1]=p[0](p[1]),p[0]=void 0),ge("info",()=>`[WebGPU] Start to run kernel "[${u}] ${d}"...`);let m=this.env.debug;this.temporaryData=[];try{return m&&this.device.pushErrorScope("validation"),l(r,p[1]),0}catch(g){return o.push(Promise.resolve(`[WebGPU] Kernel "[${u}] ${d}" failed. ${g}`)),1}finally{m&&o.push(this.device.popErrorScope().then(g=>g?`GPU validation error for kernel "[${u}] ${d}": ${g.message}`:null));for(let g of this.temporaryData)this.gpuDataManager.release(g.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,o,i){let u=this.sessionExternalDataMapping.get(e);u||(u=new Map,this.sessionExternalDataMapping.set(e,u));let d=u.get(r),l=this.gpuDataManager.registerExternalBuffer(o,i,d);return u.set(r,[l,o]),l}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(o=>this.gpuDataManager.unregisterExternalBuffer(o[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,o){return async()=>{let i=await _o(this,e,r);return en(i.buffer,o)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ge("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ge("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ge("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),o=e.length;this.pendingKernels=[];for(let i=0;i<o;i++){let u=this.getComputePassEncoder(),d=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),u.setPipeline(d.computePipeline),u.setBindGroup(0,d.bindGroup),u.dispatchWorkgroups(...d.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var ah={};Zt(ah,{init:()=>yx});var yr,Fo,yx,sh=Q(()=>{"use strict";ce();pt();fe();el();yr=class t{constructor(e,r,o,i){this.module=e;this.dataType=r;this.data=o;this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=N.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=N.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=N.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=N.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(N.size(e)!==N.size(this.dims))throw new Error("Invalid new shape");return new t(this.module,this.dataType,this.data,e)}},Fo=class{constructor(e,r,o){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let i=e.PTR_SIZE,u=o/e.PTR_SIZE,d=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*u++,d));let l=Number(e.getValue(i*u++,d));this.outputCount=Number(e.getValue(i*u++,d)),this.customDataOffset=Number(e.getValue(i*u++,"*")),this.customDataSize=Number(e.getValue(i*u++,d));let p=[];for(let m=0;m<l;m++){let g=Number(e.getValue(i*u++,d)),y=Number(e.getValue(i*u++,"*")),w=Number(e.getValue(i*u++,d)),$=[];for(let v=0;v<w;v++)$.push(Number(e.getValue(i*u++,d)));p.push(new yr(e,g,y,$))}this.inputs=p}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let o=r?.inputs?.map(l=>typeof l=="number"?this.inputs[l]:l)??this.inputs,i=r?.outputs??[],u=(l,p,m)=>new yr(this.module,p,this.output(l,m),m),d=(l,p)=>{let m=Ot(l,p);if(!m)throw new Error(`Unsupported data type: ${l}`);let g=m>0?this.backend.gpuDataManager.create(m).id:0;return new yr(this.module,l,g,p)};return this.backend.run(e,o,i,u,d,this.outputCount)}output(e,r){let o=this.module.stackSave();try{let i=this.module.PTR_SIZE,u=i===4?"i32":"i64",d=this.module.stackAlloc((1+r.length)*i);this.module.setValue(d,r.length,u);for(let l=0;l<r.length;l++)this.module.setValue(d+i*(l+1),r[l],u);return this.module._JsepOutput(this.opKernelContext,e,d)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(o)}}},yx=async(t,e,r,o)=>{let i=e.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(t==="webgpu"){let u=(ih(),sr(oh)).WebGpuBackend,d=new u;await d.initialize(r,o),i("webgpu",[d,l=>d.alloc(Number(l)),l=>d.free(l),(l,p,m,g=!1)=>{if(g)ge("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(l)}, dst=${Number(p)}, size=${Number(m)}`),d.memcpy(Number(l),Number(p));else{ge("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(l)}, gpuDataId=${Number(p)}, size=${Number(m)}`);let y=e.HEAPU8.subarray(Number(l>>>0),Number(l>>>0)+Number(m));d.upload(Number(p),y)}},async(l,p,m)=>{ge("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${l}, dataOffset=${p}, size=${m}`),await d.download(Number(l),()=>e.HEAPU8.subarray(Number(p)>>>0,Number(p+m)>>>0))},(l,p,m)=>d.createKernel(l,Number(p),m,e.UTF8ToString(e._JsepGetNodeName(Number(p)))),l=>d.releaseKernel(l),(l,p,m,g)=>{ge("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${m}, kernel=${l}, contextDataOffset=${p}`);let y=new Fo(e,d,Number(p));return d.computeKernel(Number(l),y,g)},()=>d.captureBegin(),()=>d.captureEnd(),()=>d.replay()])}else{let u=new on(r);i("webnn",[u,()=>u.reserveTensorId(),d=>u.releaseTensorId(d),async(d,l,p,m,g)=>u.ensureTensor(d,l,p,m,g),(d,l)=>{u.uploadTensor(d,l)},async(d,l)=>u.downloadTensor(d,l),(d,l)=>u.registerMLContext(d,l),!!r.trace])}}});var bx,Vr,Lr,Ft,wx,uh,dr,Wr,Gr,dh,Hr,Fr,qr,io=Q(()=>{"use strict";Ye();Lc();Gc();ce();Et();Kr();po();bx=(t,e)=>{Ie()._OrtInit(t,e)!==0&&ve("Can't initialize onnxruntime.")},Vr=async t=>{bx(t.wasm.numThreads,lr(t.logLevel))},Lr=async(t,e)=>{Ie().asyncInit?.();let r=t.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=t.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=t.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let o=(sh(),sr(ah)).init;e==="webgpu"&&await o("webgpu",Ie(),t,r),e==="webnn"&&await o("webnn",Ie(),t)}},Ft=new Map,wx=t=>{let e=Ie(),r=e.stackSave();try{let o=e.PTR_SIZE,i=e.stackAlloc(2*o);e._OrtGetInputOutputCount(t,i,i+o)!==0&&ve("Can't get session input/output count.");let d=o===4?"i32":"i64";return[Number(e.getValue(i,d)),Number(e.getValue(i+o,d))]}finally{e.stackRestore(r)}},uh=(t,e)=>{let r=Ie(),o=r.stackSave(),i=0;try{let u=r.PTR_SIZE,d=r.stackAlloc(2*u);r._OrtGetInputOutputMetadata(t,e,d,d+u)!==0&&ve("Can't get session input/output metadata.");let p=Number(r.getValue(d,"*"));i=Number(r.getValue(d+u,"*"));let m=r.HEAP32[i/4];if(m===0)return[p,0];let g=r.HEAPU32[i/4+1],y=[];for(let w=0;w<g;w++){let $=Number(r.getValue(i+8+w*u,"*"));y.push($!==0?r.UTF8ToString($):Number(r.getValue(i+8+(w+g)*u,"*")))}return[p,m,y]}finally{r.stackRestore(o),i!==0&&r._OrtFree(i)}},dr=t=>{let e=Ie(),r=e._malloc(t.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return e.HEAPU8.set(t,r),[r,t.byteLength]},Wr=async(t,e)=>{let r,o,i=Ie();Array.isArray(t)?[r,o]=t:t.buffer===i.HEAPU8.buffer?[r,o]=[t.byteOffset,t.byteLength]:[r,o]=dr(t);let u=0,d=0,l=0,p=[],m=[],g=[];try{if([d,p]=await Wc(e),e?.externalData&&i.mountExternalData){let P=[];for(let M of e.externalData){let R=typeof M=="string"?M:M.path;P.push(pr(typeof M=="string"?M:M.data).then(W=>{i.mountExternalData(R,W)}))}await Promise.all(P)}for(let P of e?.executionProviders??[])if((typeof P=="string"?P:P.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof P!="string"){let R=P,W=R?.context,T=R?.gpuDevice,j=R?.deviceType,Z=R?.powerPreference;W?i.currentContext=W:T?i.currentContext=await i.webnnCreateMLContext(T):i.currentContext=await i.webnnCreateMLContext({deviceType:j,powerPreference:Z})}else i.currentContext=await i.webnnCreateMLContext();break}u=await i._OrtCreateSession(r,o,d),i.webgpuOnCreateSession?.(u),u===0&&ve("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(u,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[y,w]=wx(u),$=!!e?.enableGraphCapture,v=[],S=[],k=[],C=[],I=[];for(let P=0;P<y;P++){let[M,R,W]=uh(u,P);M===0&&ve("Can't get an input name."),m.push(M);let T=i.UTF8ToString(M);v.push(T),k.push(R===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:lt(R),shape:W})}for(let P=0;P<w;P++){let[M,R,W]=uh(u,P+y);M===0&&ve("Can't get an output name."),g.push(M);let T=i.UTF8ToString(M);S.push(T),C.push(R===0?{name:T,isTensor:!1}:{name:T,isTensor:!0,type:lt(R),shape:W});{if($&&e?.preferredOutputLocation===void 0){I.push("gpu-buffer");continue}let j=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[T]??"cpu",Z=i.webnnIsGraphOutput;if(j==="cpu"&&Z&&Z(u,T)){I.push("ml-tensor-cpu-output");continue}if(j!=="cpu"&&j!=="cpu-pinned"&&j!=="gpu-buffer"&&j!=="ml-tensor")throw new Error(`Not supported preferred output location: ${j}.`);if($&&j!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${j}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);I.push(j)}}let E=null;return I.some(P=>P==="gpu-buffer"||P==="ml-tensor"||P==="ml-tensor-cpu-output")&&(l=i._OrtCreateBinding(u),l===0&&ve("Can't create IO binding."),E={handle:l,outputPreferredLocations:I,outputPreferredLocationsEncoded:I.map(P=>P==="ml-tensor-cpu-output"?"ml-tensor":P).map(P=>lo(P))}),Ft.set(u,[u,m,g,E,$,!1]),[u,v,S,k,C]}catch(y){throw m.forEach(w=>i._OrtFree(w)),g.forEach(w=>i._OrtFree(w)),l!==0&&i._OrtReleaseBinding(l)!==0&&ve("Can't release IO binding."),u!==0&&i._OrtReleaseSession(u)!==0&&ve("Can't release session."),y}finally{i._free(r),d!==0&&i._OrtReleaseSessionOptions(d)!==0&&ve("Can't release session options."),p.forEach(y=>i._free(y)),i.unmountExternalData?.()}},Gr=t=>{let e=Ie(),r=Ft.get(t);if(!r)throw new Error(`cannot release session. invalid session id: ${t}`);let[o,i,u,d,l]=r;d&&(l&&e._OrtClearBoundOutputs(d.handle)!==0&&ve("Can't clear bound outputs."),e._OrtReleaseBinding(d.handle)!==0&&ve("Can't release IO binding.")),e.jsepOnReleaseSession?.(t),e.webnnOnReleaseSession?.(t),e.webgpuOnReleaseSession?.(t),i.forEach(p=>e._OrtFree(p)),u.forEach(p=>e._OrtFree(p)),e._OrtReleaseSession(o)!==0&&ve("Can't release session."),Ft.delete(t)},dh=async(t,e,r,o,i,u,d=!1)=>{if(!t){e.push(0);return}let l=Ie(),p=l.PTR_SIZE,m=t[0],g=t[1],y=t[3],w=y,$,v;if(m==="string"&&(y==="gpu-buffer"||y==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(d&&y!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${u} when enableGraphCapture is true.`);if(y==="gpu-buffer"){let C=t[2].gpuBuffer;v=Ot(Pt(m),g);{let I=l.jsepRegisterBuffer;if(!I)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');$=I(o,u,C,v)}}else if(y==="ml-tensor"){let C=t[2].mlTensor;v=Ot(Pt(m),g);let I=l.webnnRegisterMLTensor;if(!I)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');$=I(o,C,Pt(m),g)}else{let C=t[2];if(Array.isArray(C)){v=p*C.length,$=l._malloc(v),r.push($);for(let I=0;I<C.length;I++){if(typeof C[I]!="string")throw new TypeError(`tensor data at index ${I} is not a string`);l.setValue($+I*p,qe(C[I],r),"*")}}else{let I=l.webnnIsGraphInput,E=l.webnnIsGraphOutput;if(m!=="string"&&I&&E){let P=l.UTF8ToString(i);if(I(o,P)||E(o,P)){let M=Pt(m);v=Ot(M,g),w="ml-tensor";let R=l.webnnCreateTemporaryTensor,W=l.webnnUploadTensor;if(!R||!W)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let T=await R(o,M,g);W(T,new Uint8Array(C.buffer,C.byteOffset,C.byteLength)),$=T}else v=C.byteLength,$=l._malloc(v),r.push($),l.HEAPU8.set(new Uint8Array(C.buffer,C.byteOffset,v),$)}else v=C.byteLength,$=l._malloc(v),r.push($),l.HEAPU8.set(new Uint8Array(C.buffer,C.byteOffset,v),$)}}let S=l.stackSave(),k=l.stackAlloc(4*g.length);try{g.forEach((I,E)=>l.setValue(k+E*p,I,p===4?"i32":"i64"));let C=l._OrtCreateTensor(Pt(m),$,v,k,g.length,lo(w));C===0&&ve(`Can't create tensor for input/output. session=${o}, index=${u}.`),e.push(C)}finally{l.stackRestore(S)}},Hr=async(t,e,r,o,i,u)=>{let d=Ie(),l=d.PTR_SIZE,p=Ft.get(t);if(!p)throw new Error(`cannot run inference. invalid session id: ${t}`);let m=p[0],g=p[1],y=p[2],w=p[3],$=p[4],v=p[5],S=e.length,k=o.length,C=0,I=[],E=[],P=[],M=[],R=[],W=d.stackSave(),T=d.stackAlloc(S*l),j=d.stackAlloc(S*l),Z=d.stackAlloc(k*l),oe=d.stackAlloc(k*l);try{[C,I]=Vc(u),At("wasm prepareInputOutputTensor");for(let Y=0;Y<S;Y++)await dh(r[Y],E,M,t,g[e[Y]],e[Y],$);for(let Y=0;Y<k;Y++)await dh(i[Y],P,M,t,y[o[Y]],S+o[Y],$);kt("wasm prepareInputOutputTensor");for(let Y=0;Y<S;Y++)d.setValue(T+Y*l,E[Y],"*"),d.setValue(j+Y*l,g[e[Y]],"*");for(let Y=0;Y<k;Y++)d.setValue(Z+Y*l,P[Y],"*"),d.setValue(oe+Y*l,y[o[Y]],"*");if(w&&!v){let{handle:Y,outputPreferredLocations:ae,outputPreferredLocationsEncoded:se}=w;if(g.length!==S)throw new Error(`input count from feeds (${S}) is expected to be always equal to model's input count (${g.length}).`);At("wasm bindInputsOutputs");for(let ie=0;ie<S;ie++){let pe=e[ie];await d._OrtBindInput(Y,g[pe],E[ie])!==0&&ve(`Can't bind input[${ie}] for session=${t}.`)}for(let ie=0;ie<k;ie++){let pe=o[ie];i[ie]?.[3]?(R.push(P[ie]),d._OrtBindOutput(Y,y[pe],P[ie],0)!==0&&ve(`Can't bind pre-allocated output[${ie}] for session=${t}.`)):d._OrtBindOutput(Y,y[pe],0,se[pe])!==0&&ve(`Can't bind output[${ie}] to ${ae[ie]} for session=${t}.`)}kt("wasm bindInputsOutputs"),Ft.set(t,[m,g,y,w,$,!0])}d.jsepOnRunStart?.(m),d.webnnOnRunStart?.(m);let te;w?te=await d._OrtRunWithBinding(m,w.handle,k,Z,C):te=await d._OrtRun(m,j,T,S,oe,k,Z,C),te!==0&&ve("failed to call OrtRun().");let ue=[],G=[];At("wasm ProcessOutputTensor");for(let Y=0;Y<k;Y++){let ae=Number(d.getValue(Z+Y*l,"*"));if(ae===P[Y]||R.includes(P[Y])){ue.push(i[Y]),ae!==P[Y]&&d._OrtReleaseTensor(ae)!==0&&ve("Can't release tensor.");continue}let se=d.stackSave(),ie=d.stackAlloc(4*l),pe=!1,ye,_e=0;try{d._OrtGetTensorData(ae,ie,ie+l,ie+2*l,ie+3*l)!==0&&ve(`Can't access output tensor data on index ${Y}.`);let ke=l===4?"i32":"i64",q=Number(d.getValue(ie,ke));_e=d.getValue(ie+l,"*");let J=d.getValue(ie+l*2,"*"),Te=Number(d.getValue(ie+l*3,ke)),Ue=[];for(let xe=0;xe<Te;xe++)Ue.push(Number(d.getValue(J+xe*l,ke)));d._OrtFree(J)!==0&&ve("Can't free memory for tensor dims.");let Ee=Ue.reduce((xe,Oe)=>xe*Oe,1);ye=lt(q);let Ve=w?.outputPreferredLocations[o[Y]];if(ye==="string"){if(Ve==="gpu-buffer"||Ve==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let Oe=0;Oe<Ee;Oe++){let tt=d.getValue(_e+Oe*l,"*"),Ze=d.getValue(_e+(Oe+1)*l,"*"),Pe=Oe===Ee-1?void 0:Ze-tt;xe.push(d.UTF8ToString(tt,Pe))}ue.push([ye,Ue,xe,"cpu"])}else if(Ve==="gpu-buffer"&&Ee>0){let xe=d.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Oe=xe(_e),tt=Ot(q,Ee);if(tt===void 0||!Qr(ye))throw new Error(`Unsupported data type: ${ye}`);pe=!0,ue.push([ye,Ue,{gpuBuffer:Oe,download:d.jsepCreateDownloader(Oe,tt,ye),dispose:()=>{d._OrtReleaseTensor(ae)!==0&&ve("Can't release tensor.")}},"gpu-buffer"])}else if(Ve==="ml-tensor"&&Ee>0){let xe=d.webnnEnsureTensor,Oe=d.webnnIsGraphInputOutputTypeSupported;if(!xe||!Oe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ot(q,Ee)===void 0||!Yr(ye))throw new Error(`Unsupported data type: ${ye}`);if(!Oe(t,ye,!1))throw new Error(`preferredLocation "ml-tensor" for ${ye} output is not supported by current WebNN Context.`);let Ze=await xe(t,_e,q,Ue,!1);pe=!0,ue.push([ye,Ue,{mlTensor:Ze,download:d.webnnCreateMLTensorDownloader(_e,ye),dispose:()=>{d.webnnReleaseTensorId(_e),d._OrtReleaseTensor(ae)}},"ml-tensor"])}else if(Ve==="ml-tensor-cpu-output"&&Ee>0){let xe=d.webnnCreateMLTensorDownloader(_e,ye)(),Oe=ue.length;pe=!0,G.push((async()=>{let tt=[Oe,await xe];return d.webnnReleaseTensorId(_e),d._OrtReleaseTensor(ae),tt})()),ue.push([ye,Ue,[],"cpu"])}else{let xe=Qt(ye),Oe=new xe(Ee);new Uint8Array(Oe.buffer,Oe.byteOffset,Oe.byteLength).set(d.HEAPU8.subarray(_e,_e+Oe.byteLength)),ue.push([ye,Ue,Oe,"cpu"])}}finally{d.stackRestore(se),ye==="string"&&_e&&d._free(_e),pe||d._OrtReleaseTensor(ae)}}w&&!$&&(d._OrtClearBoundOutputs(w.handle)!==0&&ve("Can't clear bound outputs."),Ft.set(t,[m,g,y,w,$,!1]));for(let[Y,ae]of await Promise.all(G))ue[Y][2]=ae;return kt("wasm ProcessOutputTensor"),ue}finally{d.webnnOnRunEnd?.(m),d.stackRestore(W),E.forEach(te=>d._OrtReleaseTensor(te)),P.forEach(te=>d._OrtReleaseTensor(te)),M.forEach(te=>d._free(te)),C!==0&&d._OrtReleaseRunOptions(C),I.forEach(te=>d._free(te))}},Fr=t=>{let e=Ie(),r=Ft.get(t);if(!r)throw new Error("invalid session id");let o=r[0],i=e._OrtEndProfiling(o);i===0&&ve("Can't get an profile file name."),e._OrtFree(i)},qr=t=>{let e=[];for(let r of t){let o=r[2];!Array.isArray(o)&&"buffer"in o&&e.push(o.buffer)}return e}});var qt,et,br,In,Cn,Tn,qo,jo,er,tr,vx,ch,lh,ph,fh,mh,hh,gh,Ko=Q(()=>{"use strict";Ye();io();Et();Ur();qt=()=>!!Ce.wasm.proxy&&typeof document<"u",br=!1,In=!1,Cn=!1,jo=new Map,er=(t,e)=>{let r=jo.get(t);r?r.push(e):jo.set(t,[e])},tr=()=>{if(br||!In||Cn||!et)throw new Error("worker not ready")},vx=t=>{switch(t.data.type){case"init-wasm":br=!1,t.data.err?(Cn=!0,qo[1](t.data.err)):(In=!0,qo[0]()),Tn&&(URL.revokeObjectURL(Tn),Tn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=jo.get(t.data.type);t.data.err?e.shift()[1](t.data.err):e.shift()[0](t.data.out);break}default:}},ch=async()=>{if(!In){if(br)throw new Error("multiple calls to 'initWasm()' detected.");if(Cn)throw new Error("previous call to 'initWasm()' failed.");if(br=!0,qt())return new Promise((t,e)=>{et?.terminate(),Rc().then(([r,o])=>{try{et=o,et.onerror=u=>e(u),et.onmessage=vx,qo=[t,e];let i={type:"init-wasm",in:Ce};!i.in.wasm.wasmPaths&&(r||so)&&(i.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),et.postMessage(i),Tn=r}catch(i){e(i)}},e)});try{await Nr(Ce.wasm),await Vr(Ce),In=!0}catch(t){throw Cn=!0,t}finally{br=!1}}},lh=async t=>{if(qt())return tr(),new Promise((e,r)=>{er("init-ep",[e,r]);let o={type:"init-ep",in:{epName:t,env:Ce}};et.postMessage(o)});await Lr(Ce,t)},ph=async t=>qt()?(tr(),new Promise((e,r)=>{er("copy-from",[e,r]);let o={type:"copy-from",in:{buffer:t}};et.postMessage(o,[t.buffer])})):dr(t),fh=async(t,e)=>{if(qt()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return tr(),new Promise((r,o)=>{er("create",[r,o]);let i={type:"create",in:{model:t,options:{...e}}},u=[];t instanceof Uint8Array&&u.push(t.buffer),et.postMessage(i,u)})}else return Wr(t,e)},mh=async t=>{if(qt())return tr(),new Promise((e,r)=>{er("release",[e,r]);let o={type:"release",in:t};et.postMessage(o)});Gr(t)},hh=async(t,e,r,o,i,u)=>{if(qt()){if(r.some(d=>d[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(d=>d))throw new Error("pre-allocated output tensor is not supported for proxy.");return tr(),new Promise((d,l)=>{er("run",[d,l]);let p=r,m={type:"run",in:{sessionId:t,inputIndices:e,inputs:p,outputIndices:o,options:u}};et.postMessage(m,qr(p))})}else return Hr(t,e,r,o,i,u)},gh=async t=>{if(qt())return tr(),new Promise((e,r)=>{er("end-profiling",[e,r]);let o={type:"end-profiling",in:t};et.postMessage(o)});Fr(t)}});var yh,$x,An,bh=Q(()=>{"use strict";Ye();Ko();ce();Rr();po();yh=(t,e)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${t.location} for ${e()}`)}},$x=t=>{switch(t[3]){case"cpu":return new nt(t[0],t[2],t[1]);case"gpu-buffer":{let e=t[0];if(!Qr(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:o,dispose:i}=t[2];return nt.fromGpuBuffer(r,{dataType:e,dims:t[1],download:o,dispose:i})}case"ml-tensor":{let e=t[0];if(!Yr(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:o,dispose:i}=t[2];return nt.fromMLTensor(r,{dataType:e,dims:t[1],download:o,dispose:i})}default:throw new Error(`invalid data location: ${t[3]}`)}},An=class{async fetchModelAndCopyToWasmMemory(e){return ph(await pr(e))}async loadModel(e,r){Qe();let o;typeof e=="string"?o=await this.fetchModelAndCopyToWasmMemory(e):o=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await fh(o,r),je()}async dispose(){return mh(this.sessionId)}async run(e,r,o){Qe();let i=[],u=[];Object.entries(e).forEach(w=>{let $=w[0],v=w[1],S=this.inputNames.indexOf($);if(S===-1)throw new Error(`invalid input '${$}'`);i.push(v),u.push(S)});let d=[],l=[];Object.entries(r).forEach(w=>{let $=w[0],v=w[1],S=this.outputNames.indexOf($);if(S===-1)throw new Error(`invalid output '${$}'`);d.push(v),l.push(S)});let p=i.map((w,$)=>yh(w,()=>`input "${this.inputNames[u[$]]}"`)),m=d.map((w,$)=>w?yh(w,()=>`output "${this.outputNames[l[$]]}"`):null),g=await hh(this.sessionId,u,p,l,m,o),y={};for(let w=0;w<g.length;w++)y[this.outputNames[l[w]]]=d[w]??$x(g[w]);return je(),y}startProfiling(){}endProfiling(){gh(this.sessionId)}}});var _h={};Zt(_h,{OnnxruntimeWebAssemblyBackend:()=>kn,initializeFlags:()=>wh,wasmBackend:()=>xx});var wh,kn,xx,vh=Q(()=>{"use strict";Ye();Ko();bh();wh=()=>{(typeof Ce.wasm.initTimeout!="number"||Ce.wasm.initTimeout<0)&&(Ce.wasm.initTimeout=0);let t=Ce.wasm.simd;if(typeof t!="boolean"&&t!==void 0&&t!=="fixed"&&t!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),Ce.wasm.simd=!1),typeof Ce.wasm.proxy!="boolean"&&(Ce.wasm.proxy=!1),typeof Ce.wasm.trace!="boolean"&&(Ce.wasm.trace=!1),typeof Ce.wasm.numThreads!="number"||!Number.isInteger(Ce.wasm.numThreads)||Ce.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Ce.wasm.numThreads=1;else{let e=typeof navigator>"u"?Xn("node:os").cpus().length:navigator.hardwareConcurrency;Ce.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},kn=class{async init(e){wh(),await ch(),await lh(e)}async createInferenceSessionHandler(e,r){let o=new An;return await o.loadModel(e,r),o}},xx=new kn});Ye();Ye();Ye();var Sc="1.25.0";var DE=oo;{let t=(vh(),sr(_h)).wasmBackend;Nt("webgpu",t,5),Nt("webnn",t,5),Nt("cpu",t,10),Nt("wasm",t,10)}Object.defineProperty(Ce.versions,"web",{value:Sc,enumerable:!0});export{q0 as InferenceSession,Br as TRACE,At as TRACE_EVENT_BEGIN,kt as TRACE_EVENT_END,Qe as TRACE_FUNC_BEGIN,je as TRACE_FUNC_END,nt as Tensor,DE as default,Ce as env,Nt as registerBackend};
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
//# sourceMappingURL=ort.bundle.min.mjs.map

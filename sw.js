if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let o={};const u=s=>i(s,n),t={module:{uri:n},exports:o,require:u};e[n]=Promise.all(l.map((s=>t[s]||u(s)))).then((s=>(r(...s),o)))}}define(["./workbox-56a10583"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/@vueuse/core-da140a8a.js",revision:null},{url:"assets/audiobuffer-slice-6dad15f5.js",revision:null},{url:"assets/chroma-js-ae162340.js",revision:null},{url:"assets/colormap-2e589d35.js",revision:null},{url:"assets/comlink-007aa999.js",revision:null},{url:"assets/dayjs-ce2aff6b.js",revision:null},{url:"assets/h5wasm-4ed993c7.js",revision:null},{url:"assets/html2canvas-a81bcda4.js",revision:null},{url:"assets/index-d0601b1b.js",revision:null},{url:"assets/index-f9a9d1aa.css",revision:null},{url:"assets/speed-to-percentage-586531f3.js",revision:null},{url:"assets/speed-to-semitones-bc2fd9fa.js",revision:null},{url:"assets/vue-cc4d2482.js",revision:null},{url:"assets/wav-file-encoder-f0c0bf58.js",revision:null},{url:"assets/wavesurfer.js-f0716fec.js",revision:null},{url:"index.html",revision:"6970d5426254babf25e9f6c780ae5a9b"},{url:"registerSW.js",revision:"650ed6688ebf6fe2b4e52d74862af3f8"},{url:"logo.svg",revision:"f682f43c6f308d1e9b2ebc16ad256e79"},{url:"manifest.webmanifest",revision:"7b7826d566c455701b1acb86503c1b76"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));

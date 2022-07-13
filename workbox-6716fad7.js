define(["exports"],function(e){"use strict";try{self["workbox:core:6.5.2"]&&_()}catch(e){}class l extends Error{constructor(e,t){super(((e,t)=>{let s=e;return 0<t.length&&(s+=" :: "+JSON.stringify(t)),s})(e,[t])),this.name=e,this.details=t}}try{self["workbox:routing:6.5.2"]&&_()}catch(e){}const a=e=>e&&"object"==typeof e?e:{handle:e};class r{constructor(e,t,s="GET"){this.handler=a(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=a(e)}}class n extends r{constructor(s,e,t){super(({url:e})=>{const t=s.exec(e.href);if(t&&(e.origin===location.origin||0===t.index))return t.slice(1)},e,t)}}class i{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{var t=e["request"],t=this.handleRequest({request:t,event:e});t&&e.respondWith(t)})}addCacheListener(){self.addEventListener("message",t=>{if(t.data&&"CACHE_URLS"===t.data.type){const e=t.data["payload"],s=Promise.all(e.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);e=new Request(...e);return this.handleRequest({request:e,event:t})}));t.waitUntil(s),t.ports&&t.ports[0]&&s.then(()=>t.ports[0].postMessage(!0))}})}handleRequest({request:s,event:a}){const r=new URL(s.url,location.href);if(r.protocol.startsWith("http")){const n=r.origin===location.origin,{params:i,route:c}=this.findMatchingRoute({event:a,request:s,sameOrigin:n,url:r});let t=c&&c.handler;var e=s.method;if(t=!t&&this.i.has(e)?this.i.get(e):t){let e;try{e=t.handle({url:r,request:s,event:a,params:i})}catch(s){e=Promise.reject(s)}const o=c&&c.catchHandler;return e=e instanceof Promise&&(this.o||o)?e.catch(async t=>{if(o)try{return await o.handle({url:r,request:s,event:a,params:i})}catch(e){e instanceof Error&&(t=e)}if(this.o)return this.o.handle({url:r,request:s,event:a});throw t}):e}}}findMatchingRoute({url:t,sameOrigin:s,request:a,event:r}){for(const i of this.t.get(a.method)||[]){let e;var n=i.match({url:t,sameOrigin:s,request:a,event:r});if(n)return e=n,(Array.isArray(e)&&0===e.length||n.constructor===Object&&0===Object.keys(n).length||"boolean"==typeof n)&&(e=void 0),{route:i,params:e}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,a(e))}setCatchHandler(e){this.o=a(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});var t=this.t.get(e.method).indexOf(e);if(!(-1<t))throw new l("unregister-route-route-not-registered");this.t.get(e.method).splice(t,1)}}let c;const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},s=e=>[t.prefix,e,t.suffix].filter(e=>e&&0<e.length).join("-"),o=e=>e||s(t.precache);function h(e,t){t=t();return e.waitUntil(t),t}try{self["workbox:precaching:6.5.2"]&&_()}catch(e){}class u{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;(s?this.notUpdatedURLs:this.updatedURLs).push(e)}return s}}}class f{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{t=(null==t?void 0:t.cacheKey)||this.h.getCacheKeyForURL(e.url);return t?new Request(t,{headers:e.headers}):e},this.h=e}}let d;function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class w{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const g=new Set;try{self["workbox:strategies:6.5.2"]&&_()}catch(e){}function y(e){return"string"==typeof e?new Request(e):e}class m{constructor(e,t){this.u={},Object.assign(this,t),this.event=t.event,this.l=e,this.p=new w,this.g=[],this.R=[...e.plugins],this.m=new Map;for(const e of this.R)this.m.set(e,{});this.event.waitUntil(this.p.promise)}async fetch(e){var t=this["event"];let s=y(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const r=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this.l.fetchOptions);for(const l of this.iterateCallbacks("fetchDidSucceed"))e=await l({event:t,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:a.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){e=y(e);let t;var{cacheName:s,matchOptions:a}=this.l,r=await this.getCacheKey(e,"read"),e=Object.assign(Object.assign({},a),{cacheName:s});t=await caches.match(r,e);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))t=await e({cacheName:s,matchOptions:a,cachedResponse:t,request:r,event:this.event})||void 0;return t}async cachePut(e,t){var s=y(e);await new Promise(e=>setTimeout(e,0));const a=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:(s=a.url,new URL(String(s),location.href).href.replace(new RegExp("^"+location.origin),""))});const r=await this.v(t);if(!r)return!1;const{cacheName:n,matchOptions:i}=this.l,c=await self.caches.open(n),o=this.hasCallback("cacheDidUpdate"),h=o?await async function(e,t,s,a){var r=p(t.url,s);if(t.url===r)return e.match(t,a);var n=Object.assign(Object.assign({},a),{ignoreSearch:!0}),n=await e.keys(t,n);for(const t of n)if(r===p(t.url,s))return e.match(t,a)}(c,a.clone(),["__WB_REVISION__"],i):null;try{await c.put(a,o?r.clone():r)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:n,oldResponse:h,newResponse:r.clone(),request:a,event:this.event});return!0}async getCacheKey(t,s){var a=t.url+" | "+s;if(!this.u[a]){let e=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))e=y(await t({mode:s,request:e,event:this.event,params:this.params}));this.u[a]=e}return this.u[a]}hasCallback(e){for(const t of this.l.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(t){for(const s of this.l.plugins)if("function"==typeof s[t]){const a=this.m.get(s);yield e=>{e=Object.assign(Object.assign({},e),{state:a});return s[t](e)}}}waitUntil(e){return this.g.push(e),e}async doneWaiting(){for(var e;e=this.g.shift();)await e}destroy(){this.p.resolve(null)}async v(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class v extends class{constructor(e={}){this.cacheName=e.cacheName||s(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){var[e]=this.handleAll(e);return e}handleAll(e){var t=(e=e instanceof FetchEvent?{event:e,request:e.request}:e).event,s="string"==typeof e.request?new Request(e.request):e.request,e="params"in e?e.params:void 0,e=new m(this,{event:t,request:s,params:e}),a=this.q(e,s,t);return[a,this.U(a,e,s,t)]}async q(t,s,a){let r;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(!(r=await this.L(s,t))||"error"===r.type)throw new l("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const n of t.iterateCallbacks("handlerDidError"))if(r=await n({error:e,event:a,request:s}),r)break;if(!r)throw e}for(const l of t.iterateCallbacks("handlerWillRespond"))r=await l({event:a,request:s,response:r});return r}async U(e,t,s,a){let r,n;try{r=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:r,error:n}),t.destroy(),n)throw n}}{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async L(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this.C(e,t):await this.O(e,t))}async O(e,t){let s;var a=t.params||{};if(!this._)throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const l=a.integrity,r=e.integrity,n=!r||r===l;s=await t.fetch(new Request(e,{integrity:r||l})),l&&n&&(this.N(),await t.cachePut(e,s.clone()))}return s}async C(e,t){this.N();const s=await t.fetch(e);if(await t.cachePut(e,s.clone()))return s;throw new l("bad-precaching-response",{url:e.url,status:s.status})}N(){let e=null,t=0;for(var[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):1<t&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||400<=e.status?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await async function(e,t){let s=null;if((s=e.url?new URL(e.url).origin:s)!==self.location.origin)throw new l("cross-origin-copy-response",{origin:s});const a=e.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},n=t?t(r):r,i=function(){if(void 0===d){var e=new Response("");if("body"in e)try{new Response(e.body),d=!0}catch(e){d=!1}d=!1}return d}()?a.body:await a.blob();return new Response(i,n)}(e):e};class R{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.k=new Map,this.K=new Map,this.T=new Map,this.l=new v({cacheName:o(e),plugins:[...t,new f({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.l}precache(e){this.addToCacheList(e),this.W||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.W=!0)}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:a}=function(e){if(!e)throw new l("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(s,location.href),r=new URL(s,location.href);return a.searchParams.set("__WB_REVISION__",t),{cacheKey:a.href,url:r.href}}(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this.k.has(a)&&this.k.get(a)!==e)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this.k.get(a),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this.T.has(e)&&this.T.get(e)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:a});this.T.set(e,s.integrity)}if(this.k.set(a,e),this.K.set(a,r),0<t.length){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(n){return h(n,async()=>{const e=new u;this.strategy.plugins.push(e);for(const[e,t]of this.k){const s=this.T.get(t),a=this.K.get(e),r=new Request(e,{integrity:s,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:t},request:r,event:n}))}const{updatedURLs:t,notUpdatedURLs:s}=e;return{updatedURLs:t,notUpdatedURLs:s}})}activate(e){return h(e,async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.k.values()),a=[];for(const r of t)s.has(r.url)||(await e.delete(r),a.push(r.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this.k}getCachedURLs(){return[...this.k.keys()]}getCacheKeyForURL(e){e=new URL(e,location.href);return this.k.get(e.href)}getIntegrityForCacheKey(e){return this.T.get(e)}async matchPrecache(e){e=e instanceof Request?e.url:e,e=this.getCacheKeyForURL(e);if(e)return(await self.caches.open(this.strategy.cacheName)).match(e)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(s)return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e));throw new l("non-precached-url",{url:t})}}let b;const q=()=>b=b||new R;class U extends r{constructor(a,r){super(({request:e})=>{const t=a.getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:r}={}){const n=new URL(e,location.href),i=(n.hash="",yield n.href,function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(n,t));if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:n});for(const t of e)yield t.href}}(e.url,r)){const r=t.get(s);if(r)return{cacheKey:r,integrity:a.getIntegrityForCacheKey(r)}}},a.strategy)}}e.clientsClaim=function(){self.addEventListener("activate",()=>self.clients.claim())},e.precacheAndRoute=function(t,s){t=t,q().precache(t);t=s,s=q();{s=new U(s,t);var a=t=void 0;let e;if("string"==typeof s){const l=new URL(s,location.href);e=new r(({url:e})=>e.href===l.href,t,a)}else if(s instanceof RegExp)e=new n(s,t,a);else if("function"==typeof s)e=new r(s,t,a);else{if(!(s instanceof r))throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});e=s}c||((c=new i).addFetchListener(),c.addCacheListener()),c.registerRoute(e)}}});
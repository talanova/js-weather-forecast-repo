(()=>{"use strict";var e,r,t,n,o,i,a,c={444:()=>{function e(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function r(e,r,t,n){return e.replace(/{{([^}]+)}}/gi,((e,o)=>{const i=o.split(".").map((e=>e.trim())),a=i[0],c=2===i.length?i[1]:null;return c?t&&a===t?c in n?n[c]:"":a in r&&c in r[a]?r[a][c]:"":t&&a===t?n||"":a in r?r[a]:""}))}function t(e,n,o=-1,i=-1,a="",c={}){let s=function(e,r){return e.replace(/{{for ([^}]+)}}((?:\s|\S)+){{endfor}}/gim,((e,n,o)=>{const i=n.split("as").map((e=>e.trim())),a=i[0],c=2===i.length?i[1]:"";return a in r?r[a].map(((e,n)=>t(o,r,n,r[a].length,c,e))).join(""):""}))}(e,n);return s=function(e,r,n=-1,o=-1,i,a){return e.replace(/{{if ([^}]+)}}((?:\s|\S)+){{endif}}/gim,((e,c,s)=>{const d=s.split("{{else}}"),l=d[0],u=2===d.length?d[1]:"";if("isLastElement"===c)return n===o-1?t(l,r,n,o,i,a):u?t(u,r,n,o,i,a):"";if("notIsLastElement"===c)return n!==o-1?t(l,r,n,o,i,a):u?t(u,r,n,o,i,a):"";const f=c.split(".").map((e=>e.trim())),p=f[0],h=2===f.length?f[1]:null;if(!h){if(i&&p===i){if(a)return t(l,r,n,o,i,a);if(u)return t(u,r,n,o,i,a)}if(p in r){if(r[p])return t(l,r,n,o,i,a);if(u)return t(u,r,n,o,i,a)}return""}if(i&&p===i)return h in a[p]?a[p][h]?t(l,r,n,o,i,a):u?t(u,r,n,o,i,a):"":h in r[p]?r[p][h]?t(l,r,n,o,i,a):u?t(u,r,n,o,i,a):"":"";if(p in r){if(h in r[p]){if(r[p][h])return t(l,r,n,o,i,a);if(u)return t(u,r,n,o,i,a)}return""}return""}))}(s,n,o,i,a,c),r(s,n,a,c)}function n(){const e=localStorage.getItem("cities");return null==e?[]:JSON.parse(e)}async function o(e){const r=`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=48594e0287f39a8f2307182407fc5b7e`;try{const e=await fetch(r),n=await e.json();return 200!==n.cod?{cod:Number(n.cod),message:n.message}:{cod:n.cod,city:n.name,temp:`${t=Number(n.main.temp),(t-273.15).toFixed(1)}°C`,icon:n.weather[0].icon,latitude:n.coord.lat,longitude:n.coord.lon}}catch(e){return console.log("Error: ",e.message),{cod:void 0,message:e.message}}var t}function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class a extends class{constructor(r,t){this.el=r,e(this,"state",{}),e(this,"events",{}),setTimeout((()=>this.setState(t)),0),this.onMount(r)}subscribeToEvents(){Object.keys(this.events).forEach((e=>{const[r,t]=e.split("@");this.el.querySelector(t).addEventListener(r,this.events[e])}))}setState(e){this.state={...this.state,...e},this.el.innerHTML=this.render(),this.subscribeToEvents()}onMount(e){}render(){return""}}{constructor(...e){super(...e),i(this,"tpl",'\n<form class="input-field">\n  <input/>\n  <button>Get weather</button>\n</form>\n<div class="list-field">\n  <ul>{{for cities as item}}\n    <li><span>{{item}}</span></li>{{endfor}}\n  </ul>\n</div>\n<div class="weather-field">\n  {{if weather.city}}\n    <p>{{weather.city}} {{weather.temp}}</p>\n    <img src="http://openweathermap.org/img/wn/{{weather.icon}}@2x.png"/>\n  {{endif}}\n</div>\n<div class="map-field">\n  {{if weather.city}}\n    <img src="https://maps.googleapis.com/maps/api/staticmap?center={{weather.latitude}},{{weather.longitude}}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w"/>\n  {{endif}}\n</div>\n'),i(this,"onSubmit",(async e=>{e.preventDefault();const r=e.target.querySelector("input"),t=r.value;if(r.value="",!t)return;const i=await o(t);if(200!==i.cod)return;const a=n();a.push(i.city),function(e){for(;e.length>10;)e.shift();localStorage.setItem("cities",JSON.stringify(e))}(a),this.setState({weather:i,cities:a})})),i(this,"onSelectCity",(async e=>{const r=e.target;if("SPAN"===r.tagName){const e=r.innerText,t=await o(e);if(200!==t.cod)return;this.setState({weather:t})}})),i(this,"events",{"submit@form":this.onSubmit,"click@ul":this.onSelectCity})}render(){return r(t(this.tpl,e=this.state),e);var e}}const c=document.getElementById("app");!async function(){if(!c)return;const e=n(),r=await async function(){try{const e=await fetch("https://get.geojs.io/v1/ip/geo.json");return(await e.json()).city}catch(e){return console.log("Error: ",e.message),""}}(),t=await o(r);new a(c,{weather:t,cities:e})}()}},s={};function d(e){var r=s[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var t=s[e]={exports:{}};try{var n={id:e,module:t,factory:c[e],require:d};d.i.forEach((function(e){e(n)})),t=n.module,n.factory.call(t.exports,t,t.exports,n.require)}catch(e){throw t.error=e,e}return t.exports}d.m=c,d.c=s,d.i=[],d.hu=e=>e+"."+d.h()+".hot-update.js",d.miniCssF=e=>{},d.hmrF=()=>"main."+d.h()+".hot-update.json",d.h=()=>"ed85a77cae7ca5ba595a",d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),d.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="js-weather-forecast-repo:",d.l=(t,n,o,i)=>{if(e[t])e[t].push(n);else{var a,c;if(void 0!==o)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var u=s[l];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==r+o){a=u;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,d.nc&&a.setAttribute("nonce",d.nc),a.setAttribute("data-webpack",r+o),a.src=t),e[t]=[n];var f=(r,n)=>{a.onerror=a.onload=null,clearTimeout(p);var o=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(n))),r)return r(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),c&&document.head.appendChild(a)}},(()=>{var e,r,t,n,o={},i=d.c,a=[],c=[],s="idle";function l(e){s=e;for(var r=0;r<c.length;r++)c[r].call(null,e)}function u(e){if(0===r.length)return e();var t=r;return r=[],Promise.all(t).then((function(){return u(e)}))}function f(e){if("idle"!==s)throw new Error("check() is only allowed in idle status");return l("check"),d.hmrM().then((function(n){if(!n)return l(m()?"ready":"idle"),null;l("prepare");var o=[];return r=[],t=[],Promise.all(Object.keys(d.hmrC).reduce((function(e,r){return d.hmrC[r](n.c,n.r,n.m,e,t,o),e}),[])).then((function(){return u((function(){return e?h(e):(l("ready"),o)}))}))}))}function p(e){return"ready"!==s?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},m();var r=t.map((function(r){return r(e)}));t=void 0;var o,i=r.map((function(e){return e.error})).filter(Boolean);if(i.length>0)return l("abort"),Promise.resolve().then((function(){throw i[0]}));l("dispose"),r.forEach((function(e){e.dispose&&e.dispose()})),l("apply");var a=function(e){o||(o=e)},c=[];return r.forEach((function(e){if(e.apply){var r=e.apply(a);if(r)for(var t=0;t<r.length;t++)c.push(r[t])}})),o?(l("fail"),Promise.resolve().then((function(){throw o}))):n?h(e).then((function(e){return c.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):(l("idle"),Promise.resolve(c))}function m(){if(n)return t||(t=[]),Object.keys(d.hmrI).forEach((function(e){n.forEach((function(r){d.hmrI[e](r,t)}))})),n=void 0,!0}d.hmrD=o,d.i.push((function(h){var m,v,g,y=h.module,w=function(t,n){var o=i[n];if(!o)return t;var c=function(r){if(o.hot.active){if(i[r]){var c=i[r].parents;-1===c.indexOf(n)&&c.push(n)}else a=[n],e=r;-1===o.children.indexOf(r)&&o.children.push(r)}else console.warn("[HMR] unexpected require("+r+") from disposed module "+n),a=[];return t(r)},d=function(e){return{configurable:!0,enumerable:!0,get:function(){return t[e]},set:function(r){t[e]=r}}};for(var f in t)Object.prototype.hasOwnProperty.call(t,f)&&"e"!==f&&Object.defineProperty(c,f,d(f));return c.e=function(e){return function(e){switch(s){case"ready":return l("prepare"),r.push(e),u((function(){l("ready")})),e;case"prepare":return r.push(e),e;default:return e}}(t.e(e))},c}(h.require,h.id);y.hot=(m=h.id,v=y,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:e!==m,_requireSelf:function(){a=v.parents.slice(),e=m,d(m)},active:!0,accept:function(e,r,t){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var n=0;n<e.length;n++)g._acceptedDependencies[e[n]]=r||function(){},g._acceptedErrorHandlers[e[n]]=t;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=t},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,s){case"idle":t=[],Object.keys(d.hmrI).forEach((function(e){d.hmrI[e](m,t)})),l("ready");break;case"ready":Object.keys(d.hmrI).forEach((function(e){d.hmrI[e](m,t)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(m)}},check:f,apply:p,status:function(e){if(!e)return s;c.push(e)},addStatusHandler:function(e){c.push(e)},removeStatusHandler:function(e){var r=c.indexOf(e);r>=0&&c.splice(r,1)},data:o[m]},e=void 0,g),y.parents=a,y.children=[],a=[],h.require=w})),d.hmrC={},d.hmrI={}})(),(()=>{var e;d.g.importScripts&&(e=d.g.location+"");var r=d.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),d.p=e})(),t=(e,r,t,n)=>{var o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=i=>{if(o.onerror=o.onload=null,"load"===i.type)t();else{var a=i&&("load"===i.type?"missing":i.type),c=i&&i.target&&i.target.href||r,s=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=c,o.parentNode.removeChild(o),n(s)}},o.href=r,document.head.appendChild(o),o},n=(e,r)=>{for(var t=document.getElementsByTagName("link"),n=0;n<t.length;n++){var o=(a=t[n]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===r))return a}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){var a;if((o=(a=i[n]).getAttribute("data-href"))===e||o===r)return a}},o=[],i=[],a=e=>({dispose:()=>{for(var e=0;e<o.length;e++){var r=o[e];r.parentNode&&r.parentNode.removeChild(r)}o.length=0},apply:()=>{for(var e=0;e<i.length;e++)i[e].rel="stylesheet";i.length=0}}),d.hmrC.miniCss=(e,r,c,s,l,u)=>{l.push(a),e.forEach((e=>{var r=d.miniCssF(e),a=d.p+r;const c=n(r,a);c&&s.push(new Promise(((r,n)=>{var s=t(e,a,(()=>{s.as="style",s.rel="preload",r()}),n);o.push(c),i.push(s)})))}))},(()=>{var e,r,t,n,o={179:0},i={};function a(e){return new Promise(((r,t)=>{i[e]=r;var n=d.p+d.hu(e),o=new Error;d.l(n,(r=>{if(i[e]){i[e]=void 0;var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading hot update chunk "+e+" failed.\n("+n+": "+a+")",o.name="ChunkLoadError",o.type=n,o.request=a,t(o)}}))}))}function c(i){function a(e){for(var r=[e],t={},n=r.map((function(e){return{chain:[e],id:e}}));n.length>0;){var o=n.pop(),i=o.id,a=o.chain,s=d.c[i];if(s&&(!s.hot._selfAccepted||s.hot._selfInvalidated)){if(s.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(s.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var l=0;l<s.parents.length;l++){var u=s.parents[l],f=d.c[u];if(f){if(f.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([u]),moduleId:i,parentId:u};-1===r.indexOf(u)&&(f.hot._acceptedDependencies[i]?(t[u]||(t[u]=[]),c(t[u],[i])):(delete t[u],r.push(u),n.push({chain:a.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:t}}function c(e,r){for(var t=0;t<r.length;t++){var n=r[t];-1===e.indexOf(n)&&e.push(n)}}d.f&&delete d.f.jsonpHmr,e=void 0;var s={},l=[],u={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in r)if(d.o(r,p)){var h,m=r[p],v=!1,g=!1,y=!1,w="";switch((h=m?a(p):{type:"disposed",moduleId:p}).chain&&(w="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of self decline: "+h.moduleId+w));break;case"declined":i.onDeclined&&i.onDeclined(h),i.ignoreDeclined||(v=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+w));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(h),i.ignoreUnaccepted||(v=new Error("Aborted because "+p+" is not accepted"+w));break;case"accepted":i.onAccepted&&i.onAccepted(h),g=!0;break;case"disposed":i.onDisposed&&i.onDisposed(h),y=!0;break;default:throw new Error("Unexception type "+h.type)}if(v)return{error:v};if(g)for(p in u[p]=m,c(l,h.outdatedModules),h.outdatedDependencies)d.o(h.outdatedDependencies,p)&&(s[p]||(s[p]=[]),c(s[p],h.outdatedDependencies[p]));y&&(c(l,[h.moduleId]),u[p]=f)}r=void 0;for(var b,E=[],_=0;_<l.length;_++){var I=l[_],D=d.c[I];D&&D.hot._selfAccepted&&u[I]!==f&&!D.hot._selfInvalidated&&E.push({module:I,require:D.hot._requireSelf,errorHandler:D.hot._selfAccepted})}return{dispose:function(){var e;t.forEach((function(e){delete o[e]})),t=void 0;for(var r,n=l.slice();n.length>0;){var i=n.pop(),a=d.c[i];if(a){var c={},u=a.hot._disposeHandlers;for(_=0;_<u.length;_++)u[_].call(null,c);for(d.hmrD[i]=c,a.hot.active=!1,delete d.c[i],delete s[i],_=0;_<a.children.length;_++){var f=d.c[a.children[_]];f&&(e=f.parents.indexOf(i))>=0&&f.parents.splice(e,1)}}}for(var p in s)if(d.o(s,p)&&(a=d.c[p]))for(b=s[p],_=0;_<b.length;_++)r=b[_],(e=a.children.indexOf(r))>=0&&a.children.splice(e,1)},apply:function(e){for(var r in u)d.o(u,r)&&(d.m[r]=u[r]);for(var t=0;t<n.length;t++)n[t](d);for(var o in s)if(d.o(s,o)){var a=d.c[o];if(a){b=s[o];for(var c=[],f=[],p=[],h=0;h<b.length;h++){var m=b[h],v=a.hot._acceptedDependencies[m],g=a.hot._acceptedErrorHandlers[m];if(v){if(-1!==c.indexOf(v))continue;c.push(v),f.push(g),p.push(m)}}for(var y=0;y<c.length;y++)try{c[y].call(null,b)}catch(r){if("function"==typeof f[y])try{f[y](r,{moduleId:o,dependencyId:p[y]})}catch(t){i.onErrored&&i.onErrored({type:"accept-error-handler-errored",moduleId:o,dependencyId:p[y],error:t,originalError:r}),i.ignoreErrored||(e(t),e(r))}else i.onErrored&&i.onErrored({type:"accept-errored",moduleId:o,dependencyId:p[y],error:r}),i.ignoreErrored||e(r)}}}for(var w=0;w<E.length;w++){var _=E[w],I=_.module;try{_.require(I)}catch(r){if("function"==typeof _.errorHandler)try{_.errorHandler(r,{moduleId:I,module:d.c[I]})}catch(t){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:I,error:t,originalError:r}),i.ignoreErrored||(e(t),e(r))}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:I,error:r}),i.ignoreErrored||e(r)}}return l}}}self.webpackHotUpdatejs_weather_forecast_repo=(e,t,o)=>{for(var a in t)d.o(t,a)&&(r[a]=t[a]);o&&n.push(o),i[e]&&(i[e](),i[e]=void 0)},d.hmrI.jsonp=function(e,o){r||(r={},n=[],t=[],o.push(c)),d.o(r,e)||(r[e]=d.m[e])},d.hmrC.jsonp=function(i,s,l,u,f,p){f.push(c),e={},t=s,r=l.reduce((function(e,r){return e[r]=!1,e}),{}),n=[],i.forEach((function(r){d.o(o,r)&&void 0!==o[r]&&(u.push(a(r)),e[r]=!0)})),d.f&&(d.f.jsonpHmr=function(r,t){e&&!d.o(e,r)&&d.o(o,r)&&void 0!==o[r]&&(t.push(a(r)),e[r]=!0)})},d.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(d.p+d.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})(),d(444)})();
(()=>{"use strict";async function e(e){const t=`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=48594e0287f39a8f2307182407fc5b7e`,n=await fetch(t);return(await n).json()}function t(e,t){for(;e.hasChildNodes();)e.removeChild(e.lastChild);const n=document.createElement("p");var a;n.innerText=`${t.name} ${a=Number(t.main.temp),(a-273.15).toFixed(1)}°C`,e.appendChild(n);const o=document.createElement("img");o.src=`http://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png`,e.appendChild(o)}function n(e,t,n){for(;e.hasChildNodes();)e.removeChild(e.lastChild);const a=document.createElement("img");a.src=`https://maps.googleapis.com/maps/api/staticmap?center=${t},${n}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w`,e.appendChild(a)}function a(){const e=localStorage.getItem("cities");return null==e?[]:JSON.parse(e)}async function o(a,o){for(;a.hasChildNodes();)a.removeChild(a.lastChild);const i=document.createElement("lo");o.forEach((a=>{const o=document.createElement("li"),c=document.createElement("a");c.innerText=a,c.className="btn",c.href="",c.addEventListener("click",(function(o){o.preventDefault(),async function(a){const o=await e(a);t(document.querySelector("#weather-field"),o),n(document.querySelector("#map-field"),o.coord.lat,o.coord.lon)}(a)})),o.appendChild(c),i.appendChild(o)})),a.appendChild(i)}const i=document.getElementById("app");!async function(){await async function(i){const c=document.createElement("form");c.id="input-field";const d=document.createElement("input"),l=document.createElement("button");l.innerText="Get weather",c.appendChild(d),c.appendChild(l),i.appendChild(c);const r=document.createElement("div");r.id="weather-field",i.appendChild(r);const s=document.createElement("div");s.id="list-field",i.appendChild(s);const p=document.createElement("div");p.id="map-field",i.appendChild(p),c.addEventListener("submit",(async function(i){i.preventDefault();const c=d.value;d.value="";const l=await e(c);if("404"===l.cod)return;const m=await a();for(m.push(c);m.length>10;)m.shift();n(p,l.coord.lat,l.coord.lon),t(r,l),await o(s,m),await function(e){localStorage.setItem("cities",JSON.stringify(e))}(m)}))}(i);const c=await a(),d=await async function(){return(await fetch("https://get.geojs.io/v1/ip/geo.json")).json()}(),l=await e(d.city);n(i.querySelector("#map-field"),l.coord.lat,l.coord.lon),t(i.querySelector("#weather-field"),l);const r=i.querySelector("#list-field");await o(r,c)}()})();
import { getWeather, updateWeather } from "./weather";
import { updateMap } from "./map";

export function readList() {
  const json = localStorage.getItem("cities");
  if (json == null) {
    return [];
  }
  return JSON.parse(json);
}

export function saveList(list) {
  localStorage.setItem("cities", JSON.stringify(list));
}

async function onListItemClick(city) {
  const weather = await getWeather(city);
  const weatherField = document.querySelector("#weather-field");
  updateWeather(weatherField, weather);

  const mapField = document.querySelector("#map-field");
  updateMap(mapField, weather.coord.lat, weather.coord.lon);
}

export function drawList(el) {
  const ol = document.createElement("ol");
  el.appendChild(ol);

  el.addEventListener("click", async (e) => {
    if (e.target.tagName === "SPAN") {
      await onListItemClick(e.target.innerText);
    }
  });
}

export function updateList(el, list) {
  const ol = el.querySelector("ol");
  ol.innerHTML = "";

  list.forEach((element) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = element;
    li.appendChild(span);
    ol.appendChild(li);
  });
}

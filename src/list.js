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
  const lo = document.createElement("lo");
  el.appendChild(lo);

  el.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.matches("li")) {
      await onListItemClick(e.target.textContent);
    }
  });
}

export function updateList(el, list) {
  const lo = el.querySelector("lo");
  lo.innerHTML = "";

  list.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    lo.appendChild(li);
  });
}

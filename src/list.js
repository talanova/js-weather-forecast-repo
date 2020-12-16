import { drawWeather, getWeather } from "./weather";
import { drawMap } from "./map";

export async function readList() {
  const json = localStorage.getItem("cities");
  if (json == null) {
    return [];
  }
  return JSON.parse(json);
}

export async function saveList(list) {
  localStorage.setItem("cities", JSON.stringify(list));
}

async function onListItemClick(city) {
  const weather = await getWeather(city);

  const weatherField = document.querySelector("#weather-field");
  drawWeather(weatherField, weather);

  const mapField = document.querySelector("#map-field");
  drawMap(mapField, weather.coord.lat, weather.coord.lon);
}

export async function drawList(el, list) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }

  const lo = document.createElement("lo");
  list.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="btn" href="">${element}</a>`;
    // eslint-disable-next-line func-names
    li.addEventListener("click", function (e) {
      e.preventDefault();
      onListItemClick(element);
    });
    lo.appendChild(li);
  });
  el.appendChild(lo);
}

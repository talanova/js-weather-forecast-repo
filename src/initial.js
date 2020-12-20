import { readList, saveList, drawList } from "./list";
import { getWeather, drawWeather } from "./weather";
import { drawMap } from "./map";

export async function getCurrentCity() {
  const url = "https://get.geojs.io/v1/ip/geo.json";
  const response = await global.fetch(url);
  return response.json();
}

export function draw(el) {
  const inputField = document.createElement("form");
  inputField.id = "input-field";
  const input = document.createElement("input");
  const button = document.createElement("button");
  button.innerText = "Get weather";
  inputField.appendChild(input);
  inputField.appendChild(button);
  el.appendChild(inputField);

  const weatherField = document.createElement("div");
  weatherField.id = "weather-field";
  el.appendChild(weatherField);

  const listField = document.createElement("div");
  listField.id = "list-field";
  el.appendChild(listField);

  const mapField = document.createElement("div");
  mapField.id = "map-field";
  el.appendChild(mapField);

  async function onSubmit(e) {
    e.preventDefault();

    const city = input.value;
    input.value = "";

    const weather = await getWeather(city);
    if (weather.cod === "404") {
      return;
    }

    const list = readList();
    list.push(city);
    while (list.length > 10) {
      list.shift();
    }

    drawMap(mapField, weather.coord.lat, weather.coord.lon);
    drawWeather(weatherField, weather);
    drawList(listField, list);
    saveList(list);
  }

  inputField.addEventListener("submit", onSubmit);
}

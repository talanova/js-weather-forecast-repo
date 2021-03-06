import { draw, getCurrentCity } from "./initial";
import { readList, updateList } from "./list";
import { getWeather, updateWeather } from "./weather";
import { updateMap } from "./map";

const appElement = document.getElementById("app");
// eslint-disable-next-line func-names
(async function () {
  draw(appElement);

  const list = readList();
  const data = await getCurrentCity();
  const weather = await getWeather(data.city);

  const mapField = appElement.querySelector("#map-field");
  updateMap(mapField, weather.coord.lat, weather.coord.lon);

  const weatherField = appElement.querySelector("#weather-field");
  updateWeather(weatherField, weather);

  const listField = appElement.querySelector("#list-field");
  updateList(listField, list);
})();

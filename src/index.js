import { draw, getCurrentCity } from "./initial";
import { readList, drawList } from "./list";
import { getWeather, drawWeather } from "./weather";
import { drawMap } from "./map";

const appElement = document.getElementById("app");
// eslint-disable-next-line func-names
(async function () {
  await draw(appElement);
  const list = await readList();
  const data = await getCurrentCity();
  const weather = await getWeather(data.city);

  const mapField = appElement.querySelector("#map-field");
  drawMap(mapField, weather.coord.lat, weather.coord.lon);

  const weatherField = appElement.querySelector("#weather-field");
  drawWeather(weatherField, weather);

  const listField = appElement.querySelector("#list-field");
  await drawList(listField, list);
})();

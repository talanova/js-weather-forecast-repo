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
  drawMap(weather.coord.lat, weather.coord.lon);
  drawWeather(weather);
  await drawList(list);
})();

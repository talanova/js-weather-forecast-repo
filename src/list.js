import { drawWeather, getWeather } from "./weather";
import { drawMap } from "./map";

export async function readList() {
  const list = JSON.parse(localStorage.getItem("cities"));
  if (list == null) {
    return [];
  }
  return list;
}

export async function saveList(list) {
  localStorage.setItem("cities", JSON.stringify(list));
}

async function onListItemClick(city) {
  const weather = await getWeather(city);
  drawWeather(weather);
  drawMap(weather.coord.lat, weather.coord.lon);
}

export async function drawList(list) {
  const div = document.getElementById("list-field");
  while (div.hasChildNodes()) {
    div.removeChild(div.lastChild);
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
  div.appendChild(lo);
}

export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;
  const response = await fetch(url);
  return (await response).json();
}

export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

export function drawWeather(el, data) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }

  const p = document.createElement("p");
  p.innerText = `${data.name} ${convertKelvinToCelsius(
    Number(data.main.temp)
  )}°C`;
  el.appendChild(p);

  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  el.appendChild(img);
}

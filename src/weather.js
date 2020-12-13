export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;
  const response = await fetch(url);
  return (await response).json();
}

function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

export function drawWeather(data) {
  const div = document.getElementById("weather-field");
  while (div.hasChildNodes()) {
    div.removeChild(div.lastChild);
  }
  const p = document.createElement("p");
  p.innerText = `${data.name} ${convertKelvinToCelsius(
    Number(data.main.temp)
  )}°C`;
  div.appendChild(p);

  const img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  div.appendChild(img);
}

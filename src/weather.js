export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;
  return global
    .fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod !== 200) {
        return { cod: data.cod };
      }
      return {
        cod: data.cod,
        temp: `${convertKelvinToCelsius(Number(data.main.temp))}°C`,
        icon: data.weather[0].icon,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      };
    });
}

export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

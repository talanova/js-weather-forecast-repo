export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;

  const data = await await global
    .fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  if (data.cod !== 200) {
    return { cod: Number(data.cod), city: data.message };
  }

  return {
    cod: data.cod,
    city: data.name,
    temp: `${convertKelvinToCelsius(Number(data.main.temp))}°C`,
    icon: data.weather[0].icon,
    latitude: data.coord.lat,
    longitude: data.coord.lon,
  };
}

export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

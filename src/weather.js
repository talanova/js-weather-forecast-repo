export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return { cod: Number(data.cod), message: data.message };
    }

    return {
      cod: data.cod,
      city: data.name,
      temp: `${convertKelvinToCelsius(Number(data.main.temp))}°C`,
      icon: data.weather[0].icon,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };
  } catch (error) {
    console.log("Error: ", error.message);
    return { cod: undefined, message: error.message };
  }
}

export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

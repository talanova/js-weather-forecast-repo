import { Weather } from "./types";

export async function getWeather(city: string): Promise<Weather> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48594e0287f39a8f2307182407fc5b7e`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error has occured: ${response.status}`);
    }

    const data = await response.json();
    if (data.cod !== 200) {
      return { cod: Number(data.cod), message: data.message, city: "" };
    }

    return {
      cod: data.cod,
      message: "",
      city: data.name,
      temp: `${convertKelvinToCelsius(Number(data.main.temp))}°C`,
      icon: data.weather[0].icon,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };
  } catch (error) {
    console.log("Error: ", error.message);
    throw error;
  }
}

export function convertKelvinToCelsius(kelvin: number): string {
  return (kelvin - 273.15).toFixed(1);
}

import { Weather } from "./types";
import { getCurrentCity } from "./initial";
import { readList } from "./list";
import { getWeather } from "./weather";
import { WeatherForecastComponent } from "./weatherForecastComponent";

const appElement = document.getElementById("app") as HTMLElement;

// eslint-disable-next-line func-names
(async function () {
  if (!appElement) {
    return;
  }

  const cities: string[] = readList();
  const city: string = await getCurrentCity();
  const weather: Weather = await getWeather(city);

  const component = new WeatherForecastComponent(appElement, {
    weather,
    cities,
  });
})();

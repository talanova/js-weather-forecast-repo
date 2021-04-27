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

  const component = new WeatherForecastComponent(appElement);
  const cities: string[] = readList();
  try {
    const city: string = await getCurrentCity();
    const weather = await getWeather(city);
    component.setState({ weather, cities });
  } catch (err) {
    console.log("Error: ", err.message);
    component.setState({ cities });
  }
})();

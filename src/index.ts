import { Component } from "./component";
import { template } from "./template";

import { getCurrentCity } from "./initial";
import { readList, saveList } from "./list";
import { getWeather } from "./weather";

type Weather = {
  cod: number;
  message: string;
  city: string;
  temp?: string | null;
  icon?: string | null;
  latitude?: string | null;
  longitude?: string | null;
};

type WeatherForecastState = {
  weather: Weather;
  cities: string[];
};

class WeatherForecastComponent extends Component<WeatherForecastState> {
  private tpl: string = `
<form class="input-field">
  <input/>
  <button>Get weather</button>
</form>
<div class="list-field">
  <ul>{{for cities as item}}
    <li><span>{{item}}</span></li>{{endfor}}
  </ul>
</div>
<div class="weather-field">
  {{if weather.city}}
    <p>{{weather.city}} {{weather.temp}}</p>
    <img src="http://openweathermap.org/img/wn/{{weather.icon}}@2x.png"/>
  {{endif}}
</div>
<div class="map-field">
  {{if weather.city}}
    <img src="https://maps.googleapis.com/maps/api/staticmap?center={{weather.latitude}},{{weather.longitude}}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w"/>
  {{endif}}
</div>
`;

  onSubmit = async (ev: Event) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const input = target.querySelector("input") as HTMLInputElement;
    const city = input.value;
    input.value = "";
    if (!city) {
      return;
    }

    const weather: Weather = await getWeather(city);
    if (weather.cod !== 200) {
      return;
    }

    const cities: string[] = readList();
    cities.push(weather.city);
    saveList(cities);

    this.setState({ weather, cities });
  };

  onSelectCity = async (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target.tagName === "SPAN") {
      const city = target.innerText as string;

      const weather: Weather = await getWeather(city);
      if (weather.cod !== 200) {
        return;
      }

      this.setState({ weather });
    }
  };

  events = {
    "submit@form": this.onSubmit,
    "click@ul": this.onSelectCity,
  };

  render(): string {
    return template(this.tpl, this.state);
  }
}

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

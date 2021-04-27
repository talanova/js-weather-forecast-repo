import { Component } from "./component";
import { WeatherForecastState, Weather } from "./types";

import { readList, saveList } from "./list";
import { getWeather } from "./weather";

export class WeatherForecastComponent extends Component<WeatherForecastState> {
  constructor(el: HTMLElement, initialState?: Partial<WeatherForecastState>) {
    super(
      el,
      `
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
        `,
      initialState
    );
  }

  onSubmit: (ev: Event) => void = async (ev: Event) => {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const input = target.querySelector("input") as HTMLInputElement;
    const city = input.value;
    input.value = "";
    if (!city) {
      return;
    }

    try {
      const weather: Weather = await getWeather(city);
      if (weather.cod !== 200) {
        return;
      }

      const cities: string[] = readList();
      cities.push(weather.city);
      saveList(cities);

      this.setState({ weather, cities });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  onSelectCity: (ev: Event) => void = async (ev: Event) => {
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
}

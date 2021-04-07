import { Component } from "./component";
import { template } from "./template";

import { getCurrentCity } from "./initial";
import { readList, saveList } from "./list";
import { getWeather } from "./weather";

type Weather = {
  cod: number;
  message?: string | null;
  city?: string | null;
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
<div class="weather-field">
  {{if weather.city}}
    <p>{{weather.city}} {{weather.temp}}</p>
    <img src="http://openweathermap.org/img/wn/{{weather.icon}}@2x.png"/>
  {{else}}
    <p>{{weather.message}}</p>
  {{endif}}
</div>
<div class="list-field">
  <ul>{{for cities as item}}
    <li><span>{{item}}</span></li>{{endfor}}
  </ul>
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

    let currentWeather: Weather = { cod: 400, message: "" };
    await getWeather(city)
      .then((obj: Partial<Weather>) => {
        currentWeather = { ...currentWeather, ...obj };
      })
      .catch((error: Error) => {
        console.log("Error: ", error.message);
      });
    if (currentWeather.cod !== 200) {
      return;
    }

    const list: string[] = readList();
    if (currentWeather.city) {
      list.push(currentWeather.city);
      while (list.length > 10) {
        list.shift();
      }
      saveList(list);
    }

    this.setState({
      weather: currentWeather,
      cities: list,
    });
  };

  onSelectCity = async (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target.tagName === "SPAN") {
      const currentCity = target.innerText as string;

      let currentWeather: Weather = { cod: 400, message: "" };
      await getWeather(currentCity)
        .then((obj: Partial<Weather>) => {
          currentWeather = { ...currentWeather, ...obj };
        })
        .catch((error: Error) => {
          console.log("Error: ", error.message);
        });
      if (currentWeather.cod !== 200) {
        return;
      }

      this.setState({
        weather: currentWeather,
      });
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

  let city: string = "";
  await getCurrentCity()
    .then((value: string) => {
      city = value;
    })
    .catch((error: Error) => {
      console.log("Error: ", error.message);
    });

  let weather: Weather = { cod: 400, message: "" };
  await getWeather(weather)
    .then((obj: Partial<Weather>) => {
      weather = { ...weather, ...obj };
    })
    .catch((error: Error) => {
      console.log("Error: ", error.message);
    });

  console.log("weather: " + JSON.stringify(weather));

  const component = new WeatherForecastComponent(appElement, {
    weather,
    cities,
  });
})();

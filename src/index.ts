import { Component } from "./component";
import { template } from "./template";

import { getCurrentCity } from "./initial";
import { readList, saveList } from "./list";
import { getWeather } from "./weather";

type Weather = {
  cod: number;
  temp?: string;
  icon?: string;
  latitude?: string;
  longitude?: string;
};

type WeatherForecastState = {
  city: string;
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
  <p>{{city}} {{weather.temp}}</p>
  <img src="http://openweathermap.org/img/wn/{{weather.icon}}@2x.png"/>
</div>
<div class="list-field">
  <ul>{{for cities as item}}
    <li><span>{{item}}</span></li>{{endfor}}
  </ul>
</div>
<div class="map-field">
  <img src="https://maps.googleapis.com/maps/api/staticmap?center={{weather.latitude}},{{weather.longitude}}&zoom=14&size=600x600&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w"/>
</div>
`;

  onSubmit = (ev: Event) => {
    ev.preventDefault();

    const currentCity = (ev.target as HTMLInputElement).value;

    let curremtWeather: Weather = { cod: 404 };
    getWeather(currentCity)
      .then(
        (
          cod: number,
          temp: string,
          icon: string,
          latitude: string,
          longitude: string
        ) => {
          curremtWeather = { cod, temp, icon, latitude, longitude };
        }
      )
      .catch((error: Error) => {
        /* show error message */
      });

    if (curremtWeather.cod !== 200) {
      return;
    }

    const list: string[] = readList();
    list.push(currentCity);
    while (list.length > 10) {
      list.shift();
    }
    saveList(list);

    this.setState({
      city: currentCity,
      weather: curremtWeather,
      cities: list,
    });
  };

  onSelectCity = (ev: Event) => {
    const target = ev.target as HTMLElement;
    if (target.tagName === "SPAN") {
      const currentCity = target.innerText as string;

      let currentWeather: Weather = { cod: 404 };
      getWeather(currentCity)
        .then(
          (
            cod: number,
            temp: string,
            icon: string,
            latitude: string,
            longitude: string
          ) => {
            currentWeather = { cod, temp, icon, latitude, longitude };
          }
        )
        .catch((error: Error) => {
          /* show error message */
        });

      this.setState({
        city: currentCity,
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
  getCurrentCity()
    .then((value: string) => {
      city = value;
    })
    .catch((error: Error) => {
      /* show error message */
    });

  let weather: Weather = { cod: 404 };
  getWeather(city)
    .then(
      (
        cod: number,
        temp: string,
        icon: string,
        latitude: string,
        longitude: string
      ) => {
        weather = { cod, temp, icon, latitude, longitude };
      }
    )
    .catch((error: Error) => {
      /* show error message */
    });

  const component = new WeatherForecastComponent(appElement, {
    city,
    weather,
    cities,
  });
})();

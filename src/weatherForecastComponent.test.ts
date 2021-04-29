import { WeatherForecastComponent } from "./weatherForecastComponent";
import { Component } from "./component";
import { Weather } from "./types";
import * as testConstants from "./constants";
import * as weatherModule from "./weather";
import * as listModule from "./list";

const sleep = (x = 10) => new Promise((resolve) => setTimeout(resolve, x));

describe("WeatherForecastComponent", () => {
  let el: HTMLDivElement;
  let weather: Weather;
  let cities: string[];

  jest.spyOn(weatherModule, "getWeather").mockImplementation(() => {
    return Promise.resolve(weather);
  });

  jest.spyOn(listModule, "readList").mockImplementation(() => {
    return cities;
  });

  jest.spyOn(listModule, "saveList").mockImplementation();

  beforeEach(() => {
    el = document.createElement("div");

    weather = {
      cod: testConstants.TEST_WEATHER.cod,
      message: "",
      city: testConstants.TEST_WEATHER.name,
      temp: testConstants.TEST_WEATHER.main.temp,
      icon: testConstants.TEST_WEATHER.main.icon,
      latitude: testConstants.TEST_WEATHER.coord.lat,
      longitude: testConstants.TEST_WEATHER.coord.lon,
    };

    cities = testConstants.TEST_LIST;
  });

  it("is a class", () => {
    expect(typeof WeatherForecastComponent).toBe("function");
  });

  it("it extends class Component", () => {
    expect(WeatherForecastComponent.prototype instanceof Component).toBe(true);
  });

  it("constructor works as expected", async () => {
    const state = {
      weather,
      cities,
    };
    class Child extends WeatherForecastComponent {
      getState() {
        return this.state;
      }
    }
    const component = new Child(el, state);
    await sleep();
    expect(component.getState()).toEqual(state);
  });

  it("raise onSubmit", async () => {
    const component = new WeatherForecastComponent(el);
    await sleep();

    const field: HTMLFormElement | null = el.querySelector(".input-field");
    expect(field).not.toBe(null);
    const input: HTMLInputElement | null = (field as HTMLFormElement).querySelector(
      "input"
    );
    expect(input).not.toBe(null);

    (input as HTMLInputElement).value = "Moscow";
    expect(input?.value).toBe("Moscow");
    (field as HTMLFormElement).dispatchEvent(new window.Event("submit"));
    expect(input?.value).toBe("");
    await sleep();

    expect(weatherModule.getWeather).toHaveBeenCalledTimes(1);
    expect(weatherModule.getWeather).toHaveBeenCalledWith("Moscow");
    expect(listModule.readList).toHaveBeenCalledTimes(1);
    expect(listModule.saveList).toHaveBeenCalledTimes(1);
  });

  it("raise onSelectCity", async () => {
    const state = {
      weather,
      cities,
    };
    const component = new WeatherForecastComponent(el, state);
    await sleep();

    const field: HTMLDivElement | null = el.querySelector(".list-field");
    expect(field).not.toBe(null);

    const listField: HTMLElement | null = (field as HTMLDivElement).querySelector(
      "ul"
    );
    expect(listField).not.toBe(null);

    const li: HTMLElement | null = (listField as HTMLElement).querySelector(
      "li"
    );
    expect(li).not.toBe(null);

    const span: HTMLElement | null = (li as HTMLElement).querySelector("span");
    expect(span).not.toBe(null);

    document.body.innerHTML = el.innerHTML;

    (span as HTMLElement).dispatchEvent(
      new window.Event("click", { bubbles: true })
    );
    await sleep();

    expect(weatherModule.getWeather).toHaveBeenCalledTimes(1);
    expect(weatherModule.getWeather).toHaveBeenCalledWith(span?.innerText);
    expect(listModule.readList).toHaveBeenCalledTimes(0);
    expect(listModule.saveList).toHaveBeenCalledTimes(0);
  });
});

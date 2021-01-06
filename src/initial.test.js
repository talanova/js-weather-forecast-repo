import { draw, getCurrentCity } from "./initial";
import * as module from "./weather";
import * as testConstants from "./constants";

describe("draw", () => {
  let el;

  beforeEach(() => {
    jest.disableAutomock();

    el = document.createElement("div");
  });

  it("creates basic markup", () => {
    draw(el);

    const inputField = el.querySelector("#input-field");
    const input = el.querySelector("input");
    const button = el.querySelector("button");
    const weatherField = el.querySelector("#weather-field");
    const listField = el.querySelector("#list-field");
    const mapField = el.querySelector("#map-field");

    expect(inputField).not.toBe(null);
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(weatherField).not.toBe(null);
    expect(listField).not.toBe(null);
    expect(mapField).not.toBe(null);
  });
});

describe("submit event", () => {
  let el;

  beforeEach(() => {
    jest.autoMockOff();

    el = document.createElement("div");
  });

  it("clean input and get weather on submit", () => {
    draw(el);

    const inputField = el.querySelector("#input-field");
    const input = el.querySelector("input");

    jest
      .spyOn(module, "getWeather")
      .mockImplementation(() => Promise.resolve(testConstants.testWeather));
    const city = testConstants.testList[0];

    input.value = city;
    inputField.dispatchEvent(new window.Event("submit"));
    expect(input.value).toBe("");

    expect(module.getWeather).toHaveBeenCalledWith(city);
  });
});

describe("getCurrentCity", () => {
  it("returns current city info", async () => {
    const city = testConstants.testList[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city }),
      })
    );

    const data = await getCurrentCity();
    expect(data.city).toEqual(city);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

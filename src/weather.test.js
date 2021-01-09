import { draw } from "./initial";
import { getWeather, updateWeather, convertKelvinToCelsius } from "./weather";

import * as testConstants from "./constants";

describe("getWeather", () => {
  it("returns weather info", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.TEST_WEATHER),
      })
    );

    const result = await getWeather("Moscow");
    expect(result.main.temp).toEqual(268.64);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("convertKelvinToCelsius", () => {
  it("returns -273.1 for 0", () => {
    expect(convertKelvinToCelsius(0)).toBe("-273.1");
  });
});

describe("updateWeather", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("returns basic markup", () => {
    draw(el);
    const weatherField = el.querySelector("#weather-field");
    updateWeather(weatherField, testConstants.TEST_WEATHER);

    const p = weatherField.querySelector("p");
    const img = weatherField.querySelector("img");

    expect(p).not.toBe(null);
    expect(p.innerText).not.toBe("");

    expect(img).not.toBe(null);
    expect(img.src).not.toBe("");
  });
});

import { getWeather, convertKelvinToCelsius } from "./weather";

import * as testConstants from "./constants";

describe("getWeather", () => {
  it("returns weather info", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.TEST_WEATHER),
      })
    );

    const result = await getWeather("Moscow");
    expect(result.temp).toEqual("-4.5°C");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns 404", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.TEST_WEATHER_404),
      })
    );

    const result = await getWeather("Moscow");
    expect(result.cod).toEqual(404);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("api is down", async () => {
    const testCity = testConstants.TEST_LIST[0];

    global.fetch = jest.fn(() => () =>
      Promise.reject(new Error("API is down"))
    );

    const result = await getWeather("Moscow");
    expect(result.cod).toEqual(undefined);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("convertKelvinToCelsius", () => {
  it("returns -273.1 for 0", () => {
    expect(convertKelvinToCelsius(0)).toBe("-273.1");
  });
});

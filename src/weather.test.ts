import fetchMock from "jest-fetch-mock";
import { getWeather, convertKelvinToCelsius } from "./weather";
import { Weather } from "./types";
import * as testConstants from "./constants";

describe("getWeather", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  it("returns weather info", async () => {
    const city = "Moscow";
    const temp = "-4.5°C";
    const code = 200;
    const weather: Weather = testConstants.TEST_WEATHER;
    const status = 200;

    fetchMock.mockResponse(JSON.stringify(weather), { status });

    const result: Weather = await getWeather(city);

    expect(result.cod).toEqual(code);
    expect(result.city).toEqual(city);
    expect(result.temp).toEqual(temp);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns 404", async () => {
    const city = "Moscow";
    const code = 404;
    const weather: Weather = testConstants.TEST_WEATHER_404;
    const status = 200;

    fetchMock.mockResponse(JSON.stringify(weather), { status });

    const result: Weather = await getWeather(city);
    expect(result.cod).toEqual(code);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns unsuccessful response status", async () => {
    const city = "Moscow";
    const weather: Weather = testConstants.TEST_WEATHER;
    const status = 500;

    fetchMock.mockResponse(JSON.stringify(weather), { status });

    await expect(getWeather(city)).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("api is down", async () => {
    const city = "Moscow";
    const error = new Error("API is down");

    fetchMock.mockReturnValue(Promise.reject(error));

    await expect(getWeather(city)).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("convertKelvinToCelsius", () => {
  it("returns -273.1 for 0", () => {
    expect(convertKelvinToCelsius(0)).toBe("-273.1");
  });
});

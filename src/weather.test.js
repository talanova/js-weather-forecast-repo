import { getWeather, drawWeather, convertKelvinToCelsius } from "./weather";
import { draw } from "./initial";

const data = {
  coord: { lon: 37.62, lat: 55.75 },
  weather: [{ id: 600, main: "Snow", description: "light snow", icon: "13n" }],
  base: "stations",
  main: {
    temp: 268.64,
    feels_like: 263.68,
    temp_min: 268.15,
    temp_max: 269.15,
    pressure: 1026,
    humidity: 79,
  },
  visibility: 10000,
  wind: { speed: 3, deg: 140 },
  snow: { "1h": 0.21 },
  clouds: { all: 90 },
  dt: 1607879136,
  sys: {
    type: 1,
    id: 9029,
    country: "RU",
    sunrise: 1607838694,
    sunset: 1607864176,
  },
  timezone: 10800,
  id: 524901,
  name: "Moscow",
  cod: 200,
};

describe("getWeather", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  it("returns weather info", async () => {
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

describe("drawWeather", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("returns basic markup", () => {
    draw(el);
    drawWeather(data);

    const p = el.querySelector("p");
    const img = el.querySelector("img");

    expect(p).not.toBe(null);
    expect(p.innerText).not.toBe("");

    expect(img).not.toBe(null);
    expect(img.src).not.toBe("");
  });
});

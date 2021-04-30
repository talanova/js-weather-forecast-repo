export const TEST_LIST = ["moscow", "new york"];

export const TEST_WEATHER = {
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

export const TEST_WEATHER_404 = {
  cod: 404,
  message: "city not found",
};

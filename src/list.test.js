import { readList, saveList, drawList } from "./list";
import { draw } from "./initial";

describe("mock localStorage", () => {
  const data = ["moscow", "new york"];

  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    // you could also reset all mocks, but this could impact your other mocks
    jest.resetAllMocks();
    // or individually reset a mock used
    localStorage.setItem.mockClear();
  });

  it("should save to localStorage", async () => {
    const key = "cities";
    const list = [];
    const value = JSON.stringify(list);
    await saveList(list);
    expect(global.localStorage.setItem).toHaveBeenLastCalledWith(key, value);
  });

  it("should get [] from empty localStorage", async () => {
    const key = "cities";
    const list = await readList();
    expect(global.localStorage.getItem).toHaveBeenLastCalledWith(key);
    expect(list).toStrictEqual([]);
  });

  it("should get json from localStorage", async () => {
    await saveList(data);
    const list = await readList();
    expect(list).toStrictEqual(data);
  });
});

describe("drawList", () => {
  let el;
  const data = ["moscow", "new york"];
  const weather = {
    coord: { lon: 37.62, lat: 55.75 },
    weather: [
      { id: 600, main: "Snow", description: "light snow", icon: "13n" },
    ],
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

  /* jest.mock('./weather', () => {
        // Require the original module to not be mocked...
        const originalModule = jest.requireActual('./weather');

        return {
            __esModule: true, // Use it when dealing with esModules
            ...originalModule,
            getWeather: jest.fn().mockReturnValue(weather),
        };
    }); */

  const utils = jest.createMockFromModule("./weather");
  utils.getWeather = jest.fn((city) => {
    console.log(`in mock city is ${city}`);
    return city === "moscow" ? weather : null;
  });

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("returns basic markup", () => {
    draw(el);
    const listField = el.querySelector("#list-field");
    drawList(listField, data);

    const lo = el.querySelector("lo");
    expect(lo).not.toBe(null);

    const li = lo.querySelectorAll("li");
    expect(li).not.toBe(null);
    expect(li.length).toBe(data.length);

    expect(li[0].querySelector("a").innerText).toBe(data[0]);
    expect(li[1].querySelector("a").innerText).toBe(data[1]);
  });

  it("raise getWeather on city click", () => {
    draw(el);
    const listField = el.querySelector("#list-field");
    drawList(listField, data);

    const li = el.querySelectorAll("li");
    const a = li[0].querySelector("a");

    a.dispatchEvent(new window.Event("click"));
    expect(utils.getWeather.mock).toBeTruthy();
    expect(utils.getWeather).toHaveBeenCalledWith(data[0]);
  });
});

import { draw, getCurrentCity } from "./initial";

describe("draw", () => {
  let el;

  beforeEach(() => {
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

describe("getCurrentCity", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ city: "Moscow" }),
    })
  );

  it("returns current city info", async () => {
    const data = await getCurrentCity();
    expect(data.city).toEqual("Moscow");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

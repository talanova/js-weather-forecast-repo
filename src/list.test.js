import { readList, saveList, updateList } from "./list";
import { draw } from "./initial";
import { getWeather } from "./weather";

import * as testConstants from "./constants";

describe("mock localStorage", () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    // you could also reset all mocks, but this could impact your other mocks
    // jest.resetAllMocks();
    // or individually reset a mock used
    localStorage.setItem.mockClear();
  });

  it("should save to localStorage", () => {
    const key = "cities";
    const list = [];
    const value = JSON.stringify(list);
    saveList(list);
    expect(global.localStorage.setItem).toHaveBeenLastCalledWith(key, value);
  });

  it("should get [] from empty localStorage", () => {
    const key = "cities";
    const list = readList();
    expect(global.localStorage.getItem).toHaveBeenLastCalledWith(key);
    expect(list).toStrictEqual([]);
  });

  it("should get json from localStorage", () => {
    saveList(testConstants.testList);
    const list = readList();
    expect(list).toStrictEqual(testConstants.testList);
  });
});

describe("drawList", () => {
  let el;
  let mockWeather;
  jest.mock("./weather", () => ({
    getWeather: jest.fn((city) => {
      console.log(`in mock city is ${city}`);
      return city === "moscow" ? mockWeather : null;
    }),
  }));

  beforeEach(() => {
    el = document.createElement("div");
    mockWeather = testConstants.testWeather;
  });

  it("returns basic markup", () => {
    draw(el);
    const listField = el.querySelector("#list-field");
    updateList(listField, testConstants.testList);

    const ol = listField.querySelector("ol");
    expect(ol).not.toBe(null);

    const li = ol.querySelectorAll("li");
    expect(li).not.toBe(null);
    expect(li.length).toBe(testConstants.testList.length);

    const span = ol.querySelectorAll("span");
    expect(span).not.toBe(null);
    expect(span.length).toBe(testConstants.testList.length);
    expect(span[0].innerText).toBe(testConstants.testList[0]);
    expect(span[1].innerText).toBe(testConstants.testList[1]);
  });

  it("get weather on city click", () => {
    draw(el);
    const listField = el.querySelector("#list-field");
    updateList(listField, testConstants.testList);

    const li = listField.querySelectorAll("li");
    const span = li[0].querySelector("span");
    expect(span).not.toBe(null);

    document.body.innerHTML = el.innerHTML;
    const city = testConstants.testList[0];

    span.dispatchEvent(new window.Event("click", { bubbles: true }));
    expect(getWeather.mock).toBeTruthy();
    expect(getWeather).toHaveBeenCalledWith(city);
  });
});

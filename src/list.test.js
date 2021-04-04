import { readList, saveList } from "./list";

import * as testConstants from "./constants";

describe("mock localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
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
    saveList(testConstants.TEST_LIST);
    const list = readList();
    expect(list).toStrictEqual(testConstants.TEST_LIST);
  });
});

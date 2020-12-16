import { readList, saveList } from "./list";

describe("try mock localStorage", () => {
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

  it("should get from localStorage", async () => {
    const key = "cities";
    const list = await readList();
    expect(global.localStorage.getItem).toHaveBeenLastCalledWith(key);
    expect(list).toStrictEqual([]);
  });
});

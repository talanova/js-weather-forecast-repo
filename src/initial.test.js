import { getCurrentCity } from "./initial";

import * as testConstants from "./constants";

let el;

beforeEach(() => {
  el = document.createElement("div");
});

describe("getCurrentCity", () => {
  it("returns current city info", async () => {
    const testCity = testConstants.TEST_LIST[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city: testCity }),
      })
    );

    const data = await getCurrentCity();
    expect(data).toEqual(testCity);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("api is down", async () => {
    const testCity = testConstants.TEST_LIST[0];

    global.fetch = jest.fn(() => () =>
      Promise.reject(new Error("API is down"))
    );

    const data = await getCurrentCity();
    expect(data).toEqual("");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

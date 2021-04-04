import { getCurrentCity } from "./initial";

import * as testConstants from "./constants";

let el;

beforeEach(() => {
  el = document.createElement("div");
});

describe("getCurrentCity", () => {
  it("returns current city info", async () => {
    const city = testConstants.TEST_LIST[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city }),
      })
    );

    const data = await getCurrentCity();
    expect(data).toEqual(city);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

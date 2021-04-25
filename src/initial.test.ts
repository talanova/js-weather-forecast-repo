import fetchMock from "jest-fetch-mock";
import { getCurrentCity } from "./initial";
import * as testConstants from "./constants";

describe("getCurrentCity", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  it("returns current city info", async () => {
    const testCity = testConstants.TEST_LIST[0];
    const status = 200;

    fetchMock.mockResponse(JSON.stringify({ city: testCity }), { status });

    const data: string = await getCurrentCity();
    expect(data).toEqual(testCity);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns unsuccessful response status", async () => {
    const testCity = testConstants.TEST_LIST[0];
    const status = 500;

    fetchMock.mockResponse(JSON.stringify({ city: testCity }), { status });

    await expect(getCurrentCity()).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("api is down", async () => {
    const error = new Error("API is down");

    fetchMock.mockReturnValue(Promise.reject(error));

    await expect(getCurrentCity()).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

import { sayHello } from "./sayHello";

describe("sayHello", () => {
  it("is a function", () => {
    expect(typeof sayHello).toBe("function");
  });
});

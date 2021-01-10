import { sayHello } from "./sayHello";

describe("sayHello", () => {
  it("is a function", () => {
    expect(typeof sayHello).toBe("function");
  });

  it("says hello", () => {
    global.alert = jest.fn();
    jest.spyOn(global, "alert");
    sayHello();
    expect(global.alert).toHaveBeenCalledWith("Hello!");
  });
});

import { draw } from "./initial";
import { updateMap } from "./map";

describe("updateMap", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("returns basic markup", () => {
    draw(el);
    const mapField = el.querySelector("#map-field");
    updateMap(mapField, 1, 2);

    const img = mapField.querySelector("img");
    expect(img).not.toBe(null);
    expect(img.src).not.toBe("");
  });
});

import { draw } from "./initial";
import { drawMap } from "./map";

describe("drawMap", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("returns basic markup", () => {
    draw(el);
    const mapField = el.querySelector("#map-field");
    drawMap(mapField, 1, 2);

    const img = el.querySelector("img");
    expect(img).not.toBe(null);
    expect(img.src).not.toBe("");
  });
});

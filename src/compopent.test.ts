import { Component } from "./component";

const sleep = (x: number = 10) =>
  new Promise((resolve) => setTimeout(resolve, x));

describe("Component", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a class", () => {
    expect(typeof Component).toBe("function");
    expect(new Component(el, "") instanceof Component).toBe(true);
  });

  it("renders result of render() to passed element", async () => {
    class Child extends Component<unknown> {}
    const component = new Child(el, "Hola");
    await sleep();
    expect(el.innerHTML).toBe("Hola");
  });

  it("renders with data from state", async () => {
    const obj = { value: Math.random() };
    class Child extends Component<{ value: number }> {}
    const component = new Child(el, "Hi, {{value}}", obj);
    await sleep();
    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
  });

  it("updates presentation on setState", async () => {
    const obj = { value: Math.random() };
    class Child extends Component<{ value: number }> {}
    const component = new Child(el, "Hi, {{value}}", obj);
    await sleep();
    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
    obj.value = Math.random();
    component.setState(obj);
    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
  });

  it("supports partial update", async () => {
    const obj = { a: "a", b: "b" };
    class Child extends Component<{ a: string; b: string }> {}
    const component = new Child(el, "{{a}} + {{b}}", obj);
    await sleep();
    expect(el.innerHTML).toBe(`a + b`);
    component.setState({ b: "c" });
    expect(el.innerHTML).toBe(`a + c`);
  });

  it("supports passing partial state to constructor", async () => {
    const obj = { a: "a" };
    class Child extends Component<{ a: string; b: string }> {}
    const component = new Child(el, "{{a}} + {{b}}", obj);
    await sleep();
    expect(el.innerHTML).toBe(`a + `);
  });

  it("supports events handler definitions", async () => {
    const obj = { value: 1 };
    class Child extends Component<{ value: number }> {
      inc = () => {
        this.setState({ value: this.state.value + 1 });
      };

      dec = () => {
        this.setState({ value: this.state.value - 1 });
      };

      events = {
        "click@button.inc": this.inc,
        "click@button.dec": this.dec,
      };

      getState() {
        return this.state;
      }
    }
    const component = new Child(
      el,
      `<button class="dec">-</button>{{value}}<button class="inc">+</button>`,
      obj
    );
    await sleep();
    expect(component.getState().value).toBe(1);
    const event = new window.Event("click", { bubbles: true });
    el.querySelector("button.dec").dispatchEvent(event);
    expect(component.getState().value).toBe(0);
  });
});

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
    expect(new Component(el) instanceof Component).toBe(true);
  });

  it("renders result of render() to passed element", async () => {
    class Child extends Component<unknown> {
      // eslint-disable-next-line class-methods-use-this
      render() {
        return "Hola";
      }
    }
    const component = new Child(el);
    await sleep();
    expect(el.innerHTML).toBe("Hola");
  });

  it("renders with data from state", async () => {
    const value = Math.random();
    class Child extends Component<{ value: number }> {
      state = { value };

      render() {
        return `Hi, ${this.state.value}`;
      }
    }
    const component = new Child(el);
    await sleep();
    expect(el.innerHTML).toBe(`Hi, ${value}`);
  });

  it("updates presentation on setState", async () => {
    const value = Math.random();
    class Child extends Component<{ value: number }> {
      state = { value };

      render() {
        return `Hi, ${this.state.value}`;
      }
    }
    const component = new Child(el);
    await sleep();
    expect(el.innerHTML).toBe(`Hi, ${value}`);
    component.setState({ value: 3 });
    expect(el.innerHTML).toBe(`Hi, 3`);
  });

  it("supports partial update", async () => {
    class Child extends Component<{ a: string; b: string }> {
      state = {
        a: "a",
        b: "b",
      };

      render() {
        return `${this.state.a} + ${this.state.b}`;
      }
    }
    const component = new Child(el);
    await sleep();
    expect(el.innerHTML).toBe(`a + b`);
    component.setState({ b: "c" });
    expect(el.innerHTML).toBe(`a + c`);
  });

  it("supports passing partial state to constructor", async () => {
    class Child extends Component<{ a: string; b: string }> {
      state = {
        a: "a",
        b: "b",
      };

      render() {
        return `${this.state.a} + ${this.state.b}`;
      }
    }
    const component = new Child(el, {
      b: "c",
    });
    await sleep();
    expect(el.innerHTML).toBe(`a + c`);
  });

  it("supports events handler definitions", async () => {
    class Child extends Component<{ value: number }> {
      state = {
        value: 1,
      };

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

      render() {
        return `<button class="dec">-</button>${this.state.value}<button class="inc">+</button>`;
      }
    }
    const component = new Child(el);
    await sleep();
    expect(component.state.value).toBe(1);
    const event = new window.Event("click", { bubbles: true });
    el.querySelector("button.dec").dispatchEvent(event);
    expect(component.state.value).toBe(0);
  });
});

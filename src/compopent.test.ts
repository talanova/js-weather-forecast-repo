import { Component } from "./component";

const sleep = (x = 10) => new Promise((resolve) => setTimeout(resolve, x));

describe("Component", () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a class", () => {
    expect(typeof Component).toBe("function");
    expect(new Component(el) instanceof Component).toBe(true);
  });

  it("renders result of render() to passed element", async () => {
    class Child extends Component<unknown> {
      public tpl = "Hola";

      render(): string {
        return this.tpl;
      }
    }

    const component = new Child(el);
    await sleep();

    expect(el.innerHTML).toBe(component.tpl);
  });

  it("renders with data from state", async () => {
    const obj = { value: Math.random() };

    class Child extends Component<{ value: number }> {
      private tpl = "Hi, {{value}}";

      render(): string {
        return this.tpl;
      }
    }

    const component = new Child(el, obj);
    await sleep();

    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
  });

  it("updates presentation on setState", async () => {
    const obj = { value: Math.random() };

    class Child extends Component<{ value: number }> {
      private tpl = "Hi, {{value}}";

      render(): string {
        return this.tpl;
      }
    }
    const component = new Child(el, obj);
    await sleep();

    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
    obj.value = Math.random();
    component.setState(obj);
    expect(el.innerHTML).toBe(`Hi, ${obj.value}`);
  });

  it("supports partial update", async () => {
    const obj = { a: "a", b: "b" };

    class Child extends Component<{ a: string; b: string }> {
      private tpl = "{{a}} + {{b}}";

      render(): string {
        return this.tpl;
      }
    }

    const component = new Child(el, obj);
    await sleep();

    expect(el.innerHTML).toBe(`a + b`);
    component.setState({ b: "c" });
    expect(el.innerHTML).toBe(`a + c`);
  });

  it("supports passing partial state to constructor", async () => {
    const obj = { a: "a" };

    class Child extends Component<{ a: string; b: string }> {
      private tpl = "{{a}} + {{b}}";

      render(): string {
        return this.tpl;
      }
    }

    const component = new Child(el, obj);
    await sleep();

    expect(el.innerHTML).toBe(`a + `);
  });

  it("supports events handler definitions", async () => {
    const obj = { value: 1 };

    class Child extends Component<{ value: number }> {
      private tpl = `<button class="dec">-</button>{{value}}<button class="inc">+</button>`;

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

      render(): string {
        return this.tpl;
      }
    }

    const component = new Child(el, obj);
    await sleep();

    expect(component.getState().value).toBe(1);
    const event = new window.Event("click", { bubbles: true });
    const btn = el.querySelector("button.dec");
    expect(btn).not.toBe(null);
    btn?.dispatchEvent(event);
    expect(component.getState().value).toBe(0);
  });
});

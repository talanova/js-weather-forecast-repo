import { template } from "./template";

export class Component<State> {
  protected state: State = {} as State;

  protected events: Record<string, (ev: Event) => void> = {};

  private mount = false;

  constructor(
    private el: HTMLElement,
    private tpl: string,
    initialState?: Partial<State>
  ) {
    setTimeout(() => this.setState(initialState), 0);
    this.onMount(el);
  }

  protected subscribeToEvents(): void {
    Object.keys(this.events).forEach((item) => {
      const [event, selector] = item.split("@");
      const ul = this.el.querySelector(selector);
      if (ul) {
        ul.addEventListener(event, this.events[item]);
      }
    });
  }

  setState(newValue?: Partial<State>): void {
    this.state = {
      ...this.state,
      ...newValue,
    };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMount(el: HTMLElement): void {
    this.mount = true;
  }

  render(): string {
    return template(this.tpl, this.state);
  }
}

export class Component<State> {
  state: State = {} as State;

  events: {
    [key: string]: (ev: Event) => void;
  } = {};

  constructor(private el: HTMLElement, initialState?: Partial<State>) {
    setTimeout(() => this.setState(initialState), 0);
    this.onMount(el);
  }

  protected subscribeToEvents(): void {
    Object.keys(this.events).forEach((item) => {
      const [event, selector] = item.split("@");
      this.el
        .querySelector(selector)!
        .addEventListener(event, this.events[item]);
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

  // eslint-disable-next-line class-methods-use-this
  onMount(el: HTMLElement): void {}

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return "";
  }
}

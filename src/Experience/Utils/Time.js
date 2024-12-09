import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Set up
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    // Trigger animation
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    // Update params
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    // Send the 'tick' signal
    this.trigger("tick");

    // Animate
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

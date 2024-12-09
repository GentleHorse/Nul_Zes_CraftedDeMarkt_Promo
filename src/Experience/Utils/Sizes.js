import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    // Set up
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger("resize"); // Send the signal to outsize the component
    });
  }
}

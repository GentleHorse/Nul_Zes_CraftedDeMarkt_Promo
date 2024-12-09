import Experience from "../Experience.js";
import Environment from "./Environment.js";
import TestScene from "./TestScene.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Set up
      this.testScene = new TestScene();

      // Should be the last
      this.environment = new Environment();
    });
  }

  resize() {}

  update() {
    if (this.testScene) {
      this.testScene.update();
    }
  }
}

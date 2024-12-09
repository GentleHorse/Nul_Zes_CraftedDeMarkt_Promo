import Experience from "../Experience.js";
import MorphingObjects from "./MorphingObjects.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      this.morphingObjects = new MorphingObjects();
    });
  }

  resize() {
    if (this.morphingObjects) {
      this.morphingObjects.resize();
    }
  }

  update() {
    if (this.morphingObjects) {
      this.morphingObjects.update();
    }
  }
}

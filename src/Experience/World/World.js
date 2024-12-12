import Experience from "../Experience.js";
import MorphingObjects from "./MorphingObjects.js";
import FireFlies from "./Fireflies.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      this.morphingObjects = new MorphingObjects();
      this.fireflies = new FireFlies();
    });
  }

  resize() {
    if (this.morphingObjects) {
      this.morphingObjects.resize();
    }

    if (this.fireflies){
      this.fireflies.resize();
    }
  }

  update() {
    if (this.morphingObjects) {
      this.morphingObjects.update();
    }

    if (this.fireflies){
      this.fireflies.update();
    }
  }
}

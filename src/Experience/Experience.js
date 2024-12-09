import * as THREE from "three";
import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import World from "./World/World.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options for canvas
    this.canvas = canvas;

    // Set up
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Update
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.world.resize();

    // Renderer should be the last
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();

    // Renderer should be the last
    this.renderer.update();
  }
}

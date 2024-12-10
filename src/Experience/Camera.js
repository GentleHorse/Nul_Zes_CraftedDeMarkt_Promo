import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(10.0, 8.5, 15.2);
    this.scene.add(this.instance);

    if (this.debug.active) {
      this.debugFolder
        .add(this.instance.position, "x")
        .min(-30)
        .max(30)
        .step(0.001);
      this.debugFolder
        .add(this.instance.position, "y")
        .min(-30)
        .max(30)
        .step(0.001)
        .onChange(() => {
          this.instance.aspect = this.sizes.width / this.sizes.height;
        });
      this.debugFolder
        .add(this.instance.position, "z")
        .min(-30)
        .max(30)
        .step(0.001);
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}

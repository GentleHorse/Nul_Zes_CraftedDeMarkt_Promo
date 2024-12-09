import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("renderer");
    }

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    const rendererParameters = {};
    rendererParameters.clearColor = "#160920";

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .addColor(rendererParameters, "clearColor")
        .onChange(() => {
          this.instance.setClearColor(rendererParameters.clearColor);
        });
    }

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.setClearColor(rendererParameters.clearColor);
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}

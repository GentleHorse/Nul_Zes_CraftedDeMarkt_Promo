import * as THREE from "three";
import Experience from "../Experience.js";

import firefliesVertexShader from "../../shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "../../shaders/fireflies/fragment.glsl";

export default class FireFlies {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fireflies");
    }

    this.setInstance();
  }

  setInstance() {
    this.count = 100;
    this.area = 30;

    this.setGeometry();
    this.setMaterial();
    this.setFireflies();
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(this.count * 3);
    const scaleArray = new Float32Array(this.count);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      positionArray[i3 + 0] = (Math.random() - 0.5) * this.area;
      positionArray[i3 + 1] = (Math.random() - 0.5) * this.area;
      positionArray[i3 + 2] = (Math.random() - 0.5) * this.area;

      scaleArray[i] = Math.random();
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );
    this.geometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)
    );
  }

  setMaterial() {
    this.materialParameters = {};
    this.materialParameters.color = "#FFF5D5";

    this.material = new THREE.ShaderMaterial({
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uResolution: new THREE.Uniform(
          new THREE.Vector2(
            this.sizes.width * this.sizes.pixelRatio,
            this.sizes.height * this.sizes.pixelRatio
          )
        ),
        uSize: new THREE.Uniform(0.75),
        uColor: new THREE.Uniform(
          new THREE.Color(this.materialParameters.color)
        ),
        uSpeed: new THREE.Uniform(0.3),
        uAmplitude: new THREE.Uniform(0.45),
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.material.uniforms.uSize, "value")
        .min(0.01)
        .max(5.0)
        .step(0.001)
        .name("uSize");
      this.debugFolder
        .addColor(this.materialParameters, "color")
        .onChange(() => {
          this.material.uniforms.uColor.value.set(
            this.materialParameters.color
          );
        });
      this.debugFolder
        .add(this.material.uniforms.uSpeed, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uSpeed");

      this.debugFolder
        .add(this.material.uniforms.uAmplitude, "value")
        .min(0)
        .max(5)
        .step(0.001)
        .name("uAmplitude");
    }
  }

  setFireflies() {
    this.fireflies = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.fireflies);
  }

  resize() {
    this.material.uniforms.uResolution.value.set(
      this.sizes.width * this.sizes.pixelRatio,
      this.sizes.height * this.sizes.pixelRatio
    );
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed / 1000;
  }
}

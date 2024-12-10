import * as THREE from "three";
import gsap from "gsap";

import Experience from "../Experience.js";
import particlesVertexShader from "../../shaders/particles/vertex.glsl";
import particlesFragmentShader from "../../shaders/particles/fragment.glsl";

export default class MorphingObjects {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("morphing models");
    }

    this.setInstance();
  }

  setInstance() {
    this.setPositions();
    this.setSizes();
    this.setGeometry();
    this.setMaterial();
    this.setPoints();
    this.setMorphFunc();
  }

  setPositions() {
    // Load models
    this.models = this.resources.items.morphingModels;

    // Current model index
    this.index = 0;

    // Position array of models
    const positions = this.models.scene.children.map((child) => {
      return child.geometry.attributes.position;
    });

    // Maxium vertices number among models
    this.maxCount = 0;
    for (const position of positions) {
      if (position.count > this.maxCount) {
        this.maxCount = position.count;
      }
    }

    // New position array with the same number of vertices
    this.positions = [];

    for (const position of positions) {
      const originalArray = position.array;
      const newArray = new Float32Array(this.maxCount * 3);

      for (let i = 0; i < this.maxCount; i++) {
        const i3 = i * 3;

        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0];
          newArray[i3 + 1] = originalArray[i3 + 1];
          newArray[i3 + 2] = originalArray[i3 + 2];
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3;

          newArray[i3 + 0] = originalArray[randomIndex + 0];
          newArray[i3 + 1] = originalArray[randomIndex + 1];
          newArray[i3 + 2] = originalArray[randomIndex + 2];
        }
      }

      this.positions.push(new THREE.Float32BufferAttribute(newArray, 3));
    }
  }

  setSizes() {
    const randomPointSizesArray = new Float32Array(this.maxCount);
    for (let i = 0; i < this.maxCount; i++) {
      randomPointSizesArray[i] = Math.random();
    }

    this.sizesArray = new THREE.Float32BufferAttribute(
      randomPointSizesArray,
      1
    );
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", this.positions[this.index]);
    this.geometry.setAttribute("aPositionTarget", this.positions[3]);
    this.geometry.setAttribute("aSize", this.sizesArray);
  }

  setMaterial() {
    this.materialParameters = {};
    this.materialParameters.colorA = "#FF7300";
    this.materialParameters.colorB = "#0091FF";

    this.material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(0.3),
        uResolution: new THREE.Uniform(
          new THREE.Vector2(
            this.sizes.width * this.sizes.pixelRatio,
            this.sizes.height * this.sizes.pixelRatio
          )
        ),
        uProgress: new THREE.Uniform(0),
        uMorphingDuration: new THREE.Uniform(0.4),
        uMorphingFrequency: new THREE.Uniform(0.2),
        uAnimationDuration: new THREE.Uniform(3.0),
        uColorA: new THREE.Uniform(
          new THREE.Color(this.materialParameters.colorA)
        ),
        uColorB: new THREE.Uniform(
          new THREE.Color(this.materialParameters.colorB)
        ),
      },
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Debug GUI
    if (this.debug.active) {
      this.debugFolder
        .add(this.material.uniforms.uSize, "value")
        .min(0)
        .max(0.7)
        .step(0.001)
        .name("uSize");
      this.debugFolder
        .add(this.material.uniforms.uProgress, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uProgress")
        .listen();
      this.debugFolder
        .add(this.material.uniforms.uMorphingDuration, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uMorphingDuration");
      this.debugFolder
        .add(this.material.uniforms.uMorphingFrequency, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uMorphingFrequency");
      this.debugFolder
        .add(this.material.uniforms.uAnimationDuration, "value")
        .min(1)
        .max(10)
        .step(0.01)
        .name("uAnimationDuration");
      this.debugFolder
        .addColor(this.materialParameters, "colorA")
        .onChange(() => {
          this.material.uniforms.uColorA.value.set(
            this.materialParameters.colorA
          );
        });
      this.debugFolder
        .addColor(this.materialParameters, "colorB")
        .onChange(() => {
          this.material.uniforms.uColorB.value.set(
            this.materialParameters.colorB
          );
        });
    }
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  setMorphFunc() {
    this.morph0 = () => {
      this.morph(0);
    };
    this.morph1 = () => {
      this.morph(1);
    };
    this.morph2 = () => {
      this.morph(2);
    };
    this.morph3 = () => {
      this.morph(3);
    };
    this.morph4 = () => {
      this.morph(4);
    };
    this.morph5 = () => {
      this.morph(5);
    };

    // Debug GUI
    if (this.debug.active) {
      this.debugFolder.add(this, "morph0").name("Glass Flower Vase");
      this.debugFolder.add(this, "morph1").name("Hokkori");
      this.debugFolder.add(this, "morph2").name("Ceramic Pourer A");
      this.debugFolder.add(this, "morph3").name("Ceramic Pourer B");
      this.debugFolder.add(this, "morph4").name("Ceramic Pourer C");
      this.debugFolder.add(this, "morph5").name("Ambience of Light");
    }
  }

  morph(index) {
    // Update attributes
    this.geometry.attributes.position = this.positions[this.index];
    this.geometry.attributes.aPositionTarget = this.positions[index];

    // Animate uProgress
    gsap.fromTo(
      this.material.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: this.material.uniforms.uAnimationDuration.value,
        ease: "linear",
      }
    );

    // Save index
    this.index = index;
  }

  resize() {
    this.material.uniforms.uResolution.value.set(
      this.sizes.width * this.sizes.pixelRatio,
      this.sizes.height * this.sizes.pixelRatio
    );
  }

  update() {}
}

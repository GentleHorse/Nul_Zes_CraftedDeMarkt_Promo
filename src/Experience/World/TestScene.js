import * as THREE from "three";
import Experience from "../Experience.js";

export default class TestScene {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.setInstance();
  }

  setInstance() {
    // Test cube
    this.testCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: "#C1C1C1" })
    );
    this.testCube.position.set(-1.5, 1.0, 0);
    this.testCube.castShadow = true;
    this.scene.add(this.testCube);

    // Test suzanne
    this.testSuzanne = this.resources.items.suzanneModel.scene;
    this.testSuzanne.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "#C1C1C1" });
        child.castShadow = true;
      }
    });
    this.testSuzanne.scale.set(0.5, 0.5, 0.5);
    this.testSuzanne.position.set(1.5, 0.75, 0);
    this.scene.add(this.testSuzanne);

    // Test ground
    this.testFloor = new Floor();
  }

  update() {
    // Test cube
    this.testCube.rotation.x = (this.time.current / 1000) * 0.4;
    this.testCube.rotation.y = (this.time.current / 1000) * 0.6;

    // Test suzanne
    this.testSuzanne.rotation.x = (this.time.current / 1000) * 0.4;
    this.testSuzanne.rotation.y = (this.time.current / 1000) * 0.6;
  }
}

class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.setScene();
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.floorColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.floorNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}

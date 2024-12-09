export default [
  {
    name: "suzanneModel",
    type: "gltfModel",
    path: "models/suzanne.glb",
  },
  {
    name: "morphingModels",
    type: "gltfModel",
    path: "models/models.glb",
  },
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "floorColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "floorNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },
];

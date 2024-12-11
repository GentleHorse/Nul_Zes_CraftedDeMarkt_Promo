import Experience from "../Experience/Experience.js";
import elementFromHtml from "../Experience/elementFromHtml.js";

export default class Interface {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("interface");
    }

    this.setInstance();
  }

  setInstance() {
    this.instance = elementFromHtml(`
        <div class="interface">
            <h1 class="title">Interface</h1>
        </div>
    `);
    document.body.appendChild(this.instance);

    this.interface = document.querySelector(".interface");
    this.interface.style.position = "fixed";
    this.interface.style.zIndex = 10;
    this.interface.style.top = `${this.sizes.height / 2}px`;
    this.interface.style.left = `${this.sizes.width / 2}px`;

    this.setMyIcon();
    this.setDragMouseIcon();
  }

  setMyIcon() {
    this.myIcon = elementFromHtml(`
        <a href="https://toshihito-endo.com/" class="fixed w-14 ml-7 mt-7 ">
           <img src="./images/icons/my-icon-white.svg" />
        </a>
    `);
    document.body.appendChild(this.myIcon);
  }

  setDragMouseIcon() {
    this.dragMouseIcon = elementFromHtml(`
        <div class="mouse fixed w-[250px]">
           <img src="./images/icons/drag-mouse.svg" />
           <p class="text-[#F5F5F5] w-full text-center mt-4 font-josefin-sans">
              Drag to rotate the model
           </p>
        </div>
    `)
    document.body.appendChild(this.dragMouseIcon);

    this.dragMouseIconContainer = document.querySelector(".mouse");
    this.dragMouseIconContainer.style.bottom = "40px"; 
  }

  setDragFingersIcon() {

  }

  resize() {
    this.interface.style.top = `${this.sizes.height / 2}px`;
    this.interface.style.left = `${this.sizes.width / 2}px`;
  }

  update() {}
}

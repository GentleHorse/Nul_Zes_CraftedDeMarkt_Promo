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
    this.setMyIcon();

    if (this.sizes.width > 768) {
      this.setDragMouseIcon();
    } else {
      this.setDragFingersIcon();
    }
  }

  setMyIcon() {
    this.myIcon = elementFromHtml(`
        <a href="https://toshihito-endo.com/" class="fixed z-10 w-14 ml-7 mt-7 ">
           <img src="./images/icons/my-icon-white.svg" />
        </a>
    `);
    document.body.appendChild(this.myIcon);
  }

  setDragMouseIcon() {
    this.dragMouseIcon = elementFromHtml(`
        <div class="mouse fixed z-10 w-[200px]">
           <img src="./images/icons/drag-mouse.svg" />
           <p class="text-[#F5F5F5] w-full text-center mt-2 font-inria-sans-regular text-md">
              Drag to rotate the model
           </p>
        </div>
    `);
    document.body.appendChild(this.dragMouseIcon);

    this.dragMouseIconContainer = document.querySelector(".mouse");
    this.dragMouseIconContainer.style.bottom = "40px";
    this.dragMouseIconContainer.style.left = `${this.sizes.width / 2 - 100}px`;
  }

  removeDragMouseIcon() {
    if (!document.querySelector(".mouse")) return;

    this.dragMouseIcon.remove();
  }

  setDragFingersIcon() {
    this.dragFingersIcon = elementFromHtml(`
      <div class="fingers fixed z-10 w-[160px]">
         <img src="./images/icons/drag-fingers.svg" />
         <p class="text-[#F5F5F5] w-full text-center mt-2 font-inria-sans-regular text-sm">
            Drag to rotate the model
         </p>
      </div>
  `);
    document.body.appendChild(this.dragFingersIcon);

    this.dragFingersIconContainer = document.querySelector(".fingers");
    this.dragFingersIconContainer.style.bottom = "40px";
    this.dragFingersIconContainer.style.left = `${this.sizes.width / 2 - 80}px`;
  }

  removeDragFingersIcon() {
    if (!document.querySelector(".fingers")) return;

    this.dragFingersIcon.remove();
  }

  resize() {
    // Responsive design, switch icons depending on screen width
    if (this.sizes.width > 768 && document.querySelector(".fingers")) {
      this.removeDragFingersIcon();
      this.setDragMouseIcon();
    }
    if (this.sizes.width <= 768 && document.querySelector(".mouse")) {
      this.removeDragMouseIcon();
      this.setDragFingersIcon();
    }

    // Re-position the icon to the center
    if (this.dragMouseIcon) {
      this.dragMouseIconContainer.style.left = `${
        this.sizes.width / 2 - 100
      }px`;
    }
    if (this.dragFingersIcon) {
      this.dragFingersIconContainer.style.left = `${
        this.sizes.width / 2 - 80
      }px`;
    }
  }

  update() {}
}

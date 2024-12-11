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

  /**
   * INSTANTIATE
   */
  setInstance() {
    this.setMyIcon();
    this.setMarketInfo();

    if (this.sizes.width > 768) {
      this.setDragMouseIcon();
    } else {
      this.setDragFingersIcon();
    }
  }

  /**
   * ICON - MY DESIGN STUDIO
   */
  setMyIcon() {
    this.myIcon = elementFromHtml(`
        <a href="https://toshihito-endo.com/" class="fixed z-10 w-14 ml-7 mt-7 ">
           <img src="./images/icons/my-icon-white.svg" />
        </a>
    `);
    document.body.appendChild(this.myIcon);
  }

  /**
   * ICON - MOUSE
   */
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

  /**
   * ICON - FINGERS
   */
  setDragFingersIcon() {
    this.dragFingersIcon = elementFromHtml(`
      <div class="fingers fixed z-10 w-[160px]">
         <img src="./images/icons/drag-fingers-v2.svg" class="w-5/6" />
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

  /**
   * MARKET INFO
   */
  setMarketInfo() {
    this.marketInfo = elementFromHtml(`
      <div class="marketinfo fixed text-left text-[#F5F5F5] font-josefin-sans text-xl bottom-[40px] left-[40px]">
        <p>Gasfabriek 3a CP, 5613 CP Eindhoven</p>
        <p>December 14th (Sat)</p>
        <p>14:00 - 23:00</p>
      </div>
    `);
    document.body.appendChild(this.marketInfo);

    this.marketInfoContainer = document.querySelector(".marketinfo");
  }

  /**
   * RESIZE
   */
  resize() {
    // Switch the drag icons depending on screen width
    if (this.sizes.width > 768 && document.querySelector(".fingers")) {
      this.removeDragFingersIcon();
      this.setDragMouseIcon();
    }
    if (this.sizes.width <= 768 && document.querySelector(".mouse")) {
      this.removeDragMouseIcon();
      this.setDragFingersIcon();
    }

    // Re-position the drag icon to the center
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

    // Re-position the market info text
    if (this.sizes.width > 768) {
      this.marketInfoContainer.style["text-align"] = "left";
      this.marketInfoContainer.style["font-size"] = "20px";
      this.marketInfoContainer.style.bottom = "40px";
      this.marketInfoContainer.style.left = "40px";
    } else {
      this.marketInfoContainer.style["text-align"] = "right";
      this.marketInfoContainer.style["font-size"] = "16px";
      this.marketInfoContainer.style.bottom = `${this.sizes.height * 0.8}px`;
      this.marketInfoContainer.style.left = `${this.sizes.width * 0.25}px`;
    }
  }

  /**
   * UPDATE
   */
  update() {}
}

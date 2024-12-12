import Experience from "../Experience.js";
import elementFromHtml from "../elementFromHtml.js";
import gsap from "gsap";

export default class UserInterface {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.productsList = [
      "Glass Flower Vase",
      "Hokkori",
      "Ceramic Pourer A",
      "Ceramic Pourer B",
      "Ceramic Pourer C",
      "Ambience of Light",
    ];

    this.setInstance();
  }

  /**
   * INSTANTIATE
   */
  setInstance() {
    this.setMyIcon();
    this.setMarketInfo();
    this.setArrows();

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
      <div class="marketinfo fixed text-left text-[#F5F5F5] font-josefin-sans">
        <p>“Crafted de Markt”</p>
        <p>Gasfabriek 3a CP, 5613 CP Eindhoven</p>
        <p>December 14th (Sat)</p>
        <p>14:00 - 23:00</p>
      </div>
    `);
    document.body.appendChild(this.marketInfo);

    // Styling
    this.marketInfoContainer = document.querySelector(".marketinfo");

    if (this.sizes.width > 768) {
      this.marketInfoContainer.style["text-align"] = "left";
      this.marketInfoContainer.style["font-size"] = "20px";
      this.marketInfoContainer.style.bottom = "40px";
      this.marketInfoContainer.style.left = "40px";
    } else {
      this.marketInfoContainer.style["text-align"] = "right";
      this.marketInfoContainer.style["font-size"] = "16px";
      this.marketInfoContainer.style.bottom = `${this.sizes.height * 0.7}px`;
      this.marketInfoContainer.style.left = `${this.sizes.width * 0.25}px`;
    }
  }

  /**
   * ARROWS
   */
  setArrows() {
    // Add arrows to DOM
    this.leftArrow = elementFromHtml(`
      <button class="leftarrow fixed">
        <img src="./images/icons/left-arrow.svg" class="opacity-75" />
      </button>
    `);
    this.rightArrow = elementFromHtml(`
      <button class="rightarrow fixed">
        <img src="./images/icons/right-arrow.svg" class="opacity-75" />
      </button>
    `);

    document.body.appendChild(this.leftArrow);
    document.body.appendChild(this.rightArrow);

    // Styling
    this.leftArrowButton = document.querySelector("button.leftarrow");
    this.leftArrowButton.style.width = `${this.sizes.height * 0.1}px`;
    this.leftArrowButton.style.height = `${this.sizes.height * 0.1}px`;

    this.rightArrowButton = document.querySelector("button.rightarrow");
    this.rightArrowButton.style.width = `${this.sizes.height * 0.1}px`;
    this.rightArrowButton.style.height = `${this.sizes.height * 0.1}px`;

    if (this.sizes.width > 768) {
      this.leftArrowButton.style.left = "85px";
      this.rightArrowButton.style.right = "85px";
      this.leftArrowButton.style.top = `${this.sizes.height / 2 - 36}px`;
      this.rightArrowButton.style.top = `${this.sizes.height / 2 - 36}px`;
    } else {
      this.leftArrowButton.style.left = "5px";
      this.rightArrowButton.style.right = "5px";
      this.leftArrowButton.style.top = `${this.sizes.height * 0.46}px`;
      this.rightArrowButton.style.top = `${this.sizes.height * 0.46}px`;
    }
  }

  /**
   * PRODUCT TITLE
   */
  setProductTitle(title) {
    this.title = elementFromHtml(`
      <h1 class="title select-none fixed font-playfair text-center">${title}</h1>  
    `);
    document.body.appendChild(this.title);

    this.productTitle = document.querySelector("h1.title");
    this.productTitle.style.color = "#DD2255";

    if (this.sizes.width > 768) {
      this.productTitle.style.fontSize = "72px";
      this.productTitle.style.top = `${this.sizes.height / 2 - 36}px`;
      this.productTitle.style.width = "50%";
      this.productTitle.style["margin-left"] = `${this.sizes.width * 0.25}px`;
      this.productTitle.style["margin-right"] = `${this.sizes.width * 0.25}px`;
    } else {
      this.productTitle.style.fontSize = "20px";
      this.productTitle.style.top = `${this.sizes.height / 2 - 12.5}px`;
      this.productTitle.style.width = "60%";
      this.productTitle.style["margin-left"] = `${this.sizes.width * 0.2}px`;
      this.productTitle.style["margin-right"] = `${this.sizes.width * 0.2}px`;
    }
  }

  changeProductTitle(title) {
    if (!document.querySelector(".title")) return;

    const fadingSeconds = 1.0;
    const tl = gsap.timeline();

    tl.fromTo(
      this.productTitle,
      { opacity: 1 },
      { opacity: 0, duration: fadingSeconds, ease: "power1.inOut" }
    );

    setTimeout(() => {
      this.productTitle.innerHTML = title;
    }, fadingSeconds * 1000);

    tl.fromTo(
      this.productTitle,
      { opacity: 0 },
      { opacity: 1, duration: fadingSeconds, ease: "power1.inOut" }
    );
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

    // Re-position the arrows
    if (this.sizes.width > 768) {
      this.leftArrowButton.style.left = "85px";
      this.rightArrowButton.style.right = "85px";
      this.leftArrowButton.style.top = `${this.sizes.height / 2 - 36}px`;
      this.rightArrowButton.style.top = `${this.sizes.height / 2 - 36}px`;
    } else {
      this.leftArrowButton.style.left = "5px";
      this.rightArrowButton.style.right = "5px";
      this.leftArrowButton.style.top = `${this.sizes.height * 0.46}px`;
      this.rightArrowButton.style.top = `${this.sizes.height * 0.46}px`;
    }

    // Re-size the arrows
    this.leftArrowButton.style.width = `${this.sizes.height * 0.1}px`;
    this.leftArrowButton.style.height = `${this.sizes.height * 0.1}px`;
    this.rightArrowButton.style.width = `${this.sizes.height * 0.1}px`;
    this.rightArrowButton.style.height = `${this.sizes.height * 0.1}px`;

    // Re-position the market info text
    if (this.sizes.width > 768) {
      this.marketInfoContainer.style["text-align"] = "left";
      this.marketInfoContainer.style["font-size"] = "20px";
      this.marketInfoContainer.style.bottom = "40px";
      this.marketInfoContainer.style.left = "40px";
    } else {
      this.marketInfoContainer.style["text-align"] = "right";
      this.marketInfoContainer.style["font-size"] = "16px";
      this.marketInfoContainer.style.bottom = `${this.sizes.height * 0.7}px`;
      this.marketInfoContainer.style.left = `${this.sizes.width * 0.25}px`;
    }

    // Re-position & resize the product title
    if (this.sizes.width > 768) {
      this.productTitle.style.fontSize = "72px";
      this.productTitle.style.top = `${this.sizes.height / 2 - 36}px`;
      this.productTitle.style.width = "50%";
      this.productTitle.style["margin-left"] = `${this.sizes.width * 0.25}px`;
      this.productTitle.style["margin-right"] = `${this.sizes.width * 0.25}px`;
    } else {
      this.productTitle.style.fontSize = "25px";
      this.productTitle.style.top = `${this.sizes.height / 2 - 12.5}px`;
      this.productTitle.style.width = "60%";
      this.productTitle.style["margin-left"] = `${this.sizes.width * 0.2}px`;
      this.productTitle.style["margin-right"] = `${this.sizes.width * 0.2}px`;
    }
  }

  /**
   * UPDATE
   */
  update() {}
}

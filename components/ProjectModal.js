import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");

let slides = {
    0: ['/assets/slides/skyPondSlide1.jpg'],
    1: ['/assets/slides/colonialSlideShot.jpg'],
    2: ['/assets/slides/apexSlide1.jpg'],
    3: []
};
            

export const ProjectModal = {

  isOpen: false,
  modalBox: BetterElement("div", "projectModal"),
  innerModalDiv: BetterElement("div", "innerModalDiv"),

  descriptionDiv: BetterElement("div", "descriptionDiv"),
  descriptionText: BetterElement("h3", "descriptionText"),

  slideDiv: BetterElement("div", "slideDiv"),
  slideImageDiv: BetterElement('div', 'slideImageDiv'),

  slideButtonLeft: BetterElement("button", "carouselButtons", "arrow-left"),
  slideButtonRight: BetterElement("button", "carouselButtons", "arrow-right"),

  open: function (projectIndex) {
    let xOut = BetterElement("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", () => {
      this.close();
    });
    this.modalBox.appendChild(xOut);

    this.descriptionText.innerText = projectIndex;

    this.descriptionDiv.appendChild(this.descriptionText);
    this.innerModalDiv.appendChild(this.descriptionDiv);

    this.slideDiv.appendChild(this.slideButtonLeft);
    this.slideDiv.appendChild(this.slideButtonRight);

    this.slideImageDiv.style.backgroundImage = `url(${slides[projectIndex][0]})`;
    this.slideDiv.appendChild(this.slideImageDiv);

    this.innerModalDiv.appendChild(this.slideDiv);
    this.modalBox.appendChild(this.innerModalDiv);

    app.appendChild(this.modalBox);
    waitAndThen(() => {
      this.modalBox.rollout("translateX(0vw)");
    }, 100);

    waitAndThen(() => {
      this.modalBox.classList.add("opened");
    }, 800);

    this.isOpen = true;
  },

  close: function () {
    if (this.isOpen) {
      this.modalBox.rollout("translateX(100vw)");
      this.modalBox.classList.remove("opened");
      waitAndThen(() => {
        this.modalBox.eraseAllKids();
        this.modalBox.parentElement.removeChild(this.modalBox);
      }, 500);
      this.isOpen = false;
    }
  },
};

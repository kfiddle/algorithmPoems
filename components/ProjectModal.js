import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById('app');

export const ProjectModal = {
  isOpen: false,
  modalBox: BetterElement("div", "projectModal"),
  innerModalDiv: BetterElement('div', 'innerModalDiv'),
  descriptionDiv: BetterElement('div', 'descriptionDiv'),
  slideDiv: BetterElement('div', 'slideDiv'),
  slideButtonLeft: BetterElement('button', 'carouselButtons', 'arrow-left'),
  slideButtonRight: BetterElement('button', 'carouselButtons', 'arrow-right'),

  open: function () {
    let xOut = BetterElement("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", () => {
      this.close();
    });
    this.modalBox.appendChild(xOut);
    this.innerModalDiv.appendChild(this.descriptionDiv);

    this.slideDiv.appendChild(this.slideButtonLeft);
    this.slideDiv.appendChild(this.slideButtonRight);

    this.innerModalDiv.appendChild(this.slideDiv);
    this.modalBox.appendChild(this.innerModalDiv);

    app.appendChild(this.modalBox);
    waitAndThen(() => {
      this.modalBox.rollout("translateX(0vw)");
    }, 100);

    waitAndThen(() => { this.modalBox.classList.add('opened') }, 800);

    this.isOpen = true;
  },

  close: function () {
    if (this.isOpen) {
      this.modalBox.rollout("translateX(70vw)");
      this.modalBox.classList.remove('opened');
      waitAndThen(() => {
        this.modalBox.eraseAllKids();
        this.modalBox.parentElement.removeChild(this.modalBox);
      }, 500);
      this.isOpen = false;
    }
  },
};

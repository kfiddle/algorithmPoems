import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById('app');

export const ProjectModal = {
  isOpen: false,
  modalBox: BetterElement("div", "projectModal"),

  open: function () {
    let xOut = BetterElement("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", () => {
      this.close();
    });
    this.modalBox.appendChild(xOut);

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

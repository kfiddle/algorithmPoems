import { BetterElement, waitAndThen } from "./betterElement.js";

export const ProjectModal = {
  isOpen: false,
  modalBox: BetterElement("div", "projectModal"),

  open: function () {
    let projectsDiv = document.querySelector(".projectsPanel");
    let xOut = BetterElement("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", () => {
      this.close();
    });
    this.modalBox.appendChild(xOut);

    projectsDiv.appendChild(this.modalBox);
    waitAndThen(() => {
      this.modalBox.rollout("translateY(-100vh)");
    }, 200);

    this.isOpen = true;
  },

  close: function () {
    if (this.isOpen) {
      this.modalBox.rollout("translateY(0vh)");
      waitAndThen(() => {
        this.modalBox.eraseAllKids();
        this.modalBox.parentElement.removeChild(this.modalBox);
      }, 500);
      this.isOpen = false;
    }
  },
};

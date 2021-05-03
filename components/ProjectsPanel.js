import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");

export const ProjectComponents = {
  projectsContainer: BetterElement("div", "projectsPanel"),
  projectBoxes: {
    1: BetterElement("div", "projectBox", "first"),
    2: BetterElement("div", "projectBox", "second"),
    3: BetterElement("div", "projectBox", "third"),
    4: BetterElement("div", "projectBox", "fourth"),
  },

  isOpen: false,

  open: function () {
    for (let box in this.projectBoxes) {
      this.projectsContainer.appendChild(this.projectBoxes[box]);
      waitAndThen(() => {
        this.projectBoxes[box].rollout("translateY(-100vh)");
      }, 200);
    }

    app.appendChild(this.projectsContainer);

    this.isOpen = true;
  },

  close: function () {
    for (let box in this.projectBoxes) {
      this.projectBoxes[box].rollout("translateY(100vh)");
    }

    waitAndThen(() => {
      app.removeChild(this.projectsContainer);
    }, 200);

    this.isOpen = false;
  },
};

import { BetterElement, waitAndThen } from "./betterElement.js";
import { ProjectModal } from './ProjectModal.js';

let app = document.getElementById("app");

class ProjectBox {
  constructor(tag, ...classList) {
    this.box = BetterElement(tag, ...classList);

    this.box.addEventListener("mouseover", () => {
      this.highlightProject("hover");
    });
    this.box.addEventListener("mouseout", () => {
      this.highlightProject("hoverOut");
    });
    this.box.addEventListener("click", () => {
      ProjectModal.open(classList[1]);
    });
  }

  highlightProject(mouseAction) {
    if (mouseAction === "hover") {
      this.box.style.filter =
        "brightness(80%) hue-rotate(200deg) saturate(60%) invert(20%)";
      let innerProjectHeader = BetterElement("h2", "innerProjectHeader");
      let clickForDeets = "click for details";
      let lettersIndex = 0;

      function oneLetter() {
        function changeALetter(timestamp) {
          if (lettersIndex < clickForDeets.length + 1) {
            innerProjectHeader.innerText = clickForDeets.substr(
              0,
              lettersIndex
            );
            lettersIndex++;
          }
          requestAnimationFrame(oneLetter);
        }
        requestAnimationFrame(changeALetter);
      }

      oneLetter();

      this.box.appendChild(innerProjectHeader);
    } else {
      this.box.removeChild(this.box.lastChild);
      this.box.style.filter = "";
    }
  }
}

export const ProjectComponents = {
  projectsContainer: BetterElement("div", "projectsPanel"),
  projectBoxes: {
    1: new ProjectBox("div", "projectBox", "first"), 
    2: new ProjectBox("div", "projectBox", "second"),
    3: new ProjectBox("div", "projectBox", "third"), 
    4: new ProjectBox("div", "projectBox", "fourth"),
  },

  rollTheBoxes: function (direction) {
    for (let project in this.projectBoxes) {
      direction === "in"
        ? this.projectBoxes[project].box.rollout("translateY(-100vh)")
        : this.projectBoxes[project].box.rollout("translateY(100vh)");
    }
  },

  isOpen: false,

  open: function () {
    for (let project in this.projectBoxes) {
      this.projectsContainer.appendChild(this.projectBoxes[project].box);
      waitAndThen(() => {
        this.rollTheBoxes("in");
      }, 200);
    }

    app.appendChild(this.projectsContainer);

    this.isOpen = true;
  },

  close: function () {
    this.rollTheBoxes("out");
    ProjectModal.close();

    waitAndThen(() => {
      this.projectsContainer.eraseAllKids();
      app.removeChild(this.projectsContainer);
    }, 400);

    this.isOpen = false;
  }

};

function closeModal() {
  let modal = document.querySelector(".projectModal");
  modal.rollout("translateY(0vh)");
  waitAndThen(()=> { modal.parentElement.removeChild(modal) }, 500);
}


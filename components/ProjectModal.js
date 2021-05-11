import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");

let boxes = ["first", "second", "third", "fourth"];


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

    this.descriptionText.innerText =
      "2] Sed ut perspiciatis, i dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia anim erspiciatis, i dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provi ";
    this.descriptionText.innerText = projectIndex;

    this.descriptionDiv.appendChild(this.descriptionText);
    this.innerModalDiv.appendChild(this.descriptionDiv);

    this.slideDiv.appendChild(this.slideButtonLeft);
    this.slideDiv.appendChild(this.slideButtonRight);
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

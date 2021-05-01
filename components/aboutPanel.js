import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");

export const aboutCurtains = {
  leftCurtain: BetterElement("div", "headShotDiv"),
  rightCurtain: BetterElement("div", "story"),

  open: function () {
    




    app.appendChild(this.leftCurtain);
    app.appendChild(this.rightCurtain);
    this.isOpen = true;
  },

  close: function () {
    console.log("macaroooooon");
    app.removeChild(this.leftCurtain);
    app.removeChild(this.rightCurtain);
    this.isOpen = false;
  },
};

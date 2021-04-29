import { BetterElement } from "./betterElement.js";
console.log("were here");

export const MakeHiddenSideDiv = () => {
  let hidingPanel = BetterElement("div", "hiddenSideDiv");
  document.getElementById("app").appendChild(hidingPanel);

  setTimeout(() => {
    hidingPanel.rollout("translateX(0vw)");
  }, 20);

  setTimeout(()=> {
      hidingPanel.style.background = '#cbd1d2';
  }, 600)
};

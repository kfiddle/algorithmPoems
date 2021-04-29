import { HtmlElement } from "./HtmlElement.js";
import { BetterElement } from "./betterElement.js";
import { MakeHiddenSideDiv } from './hiddenSideDiv.js';


let sideBarOpen = false;

const menuItems = [
  "beautiful recursion",
  "another item of note",
  "smoke and mirrors",
  "projects",
  "about me",
  "contact",
];

export const SideBar = BetterElement("div", "sideBar");
document.getElementById("app").appendChild(SideBar);

SideBar.slideIn = () => {
  if (!sideBarOpen) {
    SideBar.rollout("translateX(12vw)");
    MakeHiddenSideDiv();
    let menuItemIndex = 0;
    setTimeout(() => {
      SideBar.menuAppears(menuItemIndex);
    }, 650);
    sideBarOpen = true;
    
  } else {
    SideBar.rollout("translateX(-25vw)");
    SideBar.eraseAllKids();
    sideBarOpen = false;
  }
};

const newMenuItemChange = (menuItemElement) => {
  menuItemElement.element.classList.remove("bigAndGlowing");
};

SideBar.menuAppears = (menuItemIndex) => {
  function menuItemPopOut(timestamp) {
    setTimeout(() => {
      if (menuItemIndex < menuItems.length) {
        let itemToAdd = new HtmlElement("h2", "sideBarItem", "bigAndGlowing");
        itemToAdd.element.innerText = menuItems[menuItemIndex];
        SideBar.appendChild(itemToAdd.element);
        setTimeout(() => {
          newMenuItemChange(itemToAdd);
        }, 200);
        menuItemIndex++;
      }
      requestAnimationFrame(() => {
        SideBar.menuAppears(menuItemIndex);
      });
    }, 80);
  }
  
  requestAnimationFrame(menuItemPopOut);
};

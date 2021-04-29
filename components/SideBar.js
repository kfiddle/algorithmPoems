import { HtmlElement } from "./HtmlElement.js";
import { BetterElement } from "./betterElement.js";
import { MakeHiddenSideDiv } from "./hiddenSideDiv.js";
import { OpenADoor } from "./openADoor.js";

let sideBarOpen = false;

const menuItems = [
  "beautiful recursion",
  "another item of note",
  "smoke and mirrors",
  "projects",
  "about",
  "contact",
];

export const SideBar = BetterElement("div", "sideBar", "closed");
document.getElementById("app").appendChild(SideBar);

SideBar.close = () => {
  SideBar.rollout("translateX(-25vw)");
  SideBar.eraseAllKids();
  SideBar.classList.add("closed");
  sideBarOpen = false;
};

SideBar.slideIn = () => {
  if (!sideBarOpen) {
    SideBar.rollout("translateX(12vw)");
    MakeHiddenSideDiv();
    let menuItemIndex = 0;
    setTimeout(() => {
      SideBar.menuAppears(menuItemIndex);
    }, 650);
    sideBarOpen = true;

    setTimeout(() => {
      SideBar.classList.remove("closed");
    }, 600);
  } else {
    SideBar.close();
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
        itemToAdd.element.addEventListener("click", () => {
          OpenADoor(menuItemIndex - 1);
          setTimeout(()=> {
            SideBar.close();
          }, 600);
        });

        SideBar.appendChild(itemToAdd.element);
        setTimeout(() => {
          newMenuItemChange(itemToAdd);
        }, 100);
        menuItemIndex++;
      }
      requestAnimationFrame(() => {
        SideBar.menuAppears(menuItemIndex);
      });
    }, 80);
  }

  requestAnimationFrame(menuItemPopOut);
};

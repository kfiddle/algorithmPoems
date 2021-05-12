import { HtmlElement } from "./HtmlElement.js";
import { BetterElement, waitAndThen } from "./betterElement.js";
import { MakeHiddenSideDiv } from "./hiddenSideDiv.js";
import { AllPanelsList } from "./openADoor.js";

let app = document.getElementById('app');

let sideBarIsOpen = false;
let onOffSwitch = true;

const menuItems = [
  // "beautiful recursion",
  // "another item of note",
  // "smoke and mirrors",
  "current projects",
  "about",
  "contact",
];

export const SideBar = BetterElement("div", "sideBar", "closed");
app.appendChild(SideBar);

SideBar.close = () => {
  SideBar.rollout("translateX(-25vw)");
  SideBar.eraseAllKids();
  SideBar.classList.add("closed");
  app.removeChild(app.querySelector('.hiddenSideDiv'));
  sideBarIsOpen = false;
};

SideBar.open = () => {
  SideBar.rollout("translateX(12vw)");
  MakeHiddenSideDiv();
  sideBarIsOpen = true;
  let menuItemIndex = 0;
  setTimeout(() => {
    SideBar.menuAppears(menuItemIndex);
  }, 650);
  setTimeout(() => {
    SideBar.classList.remove("closed");
  }, 600);
};

SideBar.isClicked = () => {
  if (!sideBarIsOpen) {
    AllPanelsList.closeAnyPanelIfOpen();
    SideBar.open();
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
          AllPanelsList.panels[menuItemIndex - 1].open();
          AllPanelsList.createGlow(onOffSwitch);

          setTimeout(() => {
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
    }, 150);
  }

  requestAnimationFrame(menuItemPopOut);

}

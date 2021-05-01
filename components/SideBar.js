import { HtmlElement } from "./HtmlElement.js";
import { BetterElement, waitAndThen } from "./betterElement.js";
import { MakeHiddenSideDiv } from "./hiddenSideDiv.js";
import { AllPanelsList } from "./openADoor.js";

let sideBarIsOpen = false;

const menuItems = [
  // "beautiful recursion",
  // "another item of note",
  // "smoke and mirrors",
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
          glowingBars();

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
    }, 80);
  }

  requestAnimationFrame(menuItemPopOut);

  function glowingBars() {
    let barsToGlow = document.querySelector(".bars").childNodes;
    barsToGlow.forEach((stripe) => (stripe.style.opacity = ".2"));
    barsToGlow.forEach(
      (stripe) => (stripe.style.backgroundColor = "gold")
    );
    let barIndex = 0;
    animateGlowingStripes(barsToGlow, barIndex);
  }

  function animateGlowingStripes(barsToGlow, barIndex) {
    function highlightAStripe(timestamp) {
      setTimeout(() => {
        if (barIndex > 2) {
          barIndex = 0;
        }

        for (let i = 0; i < barsToGlow.length; i++) {
          i != barIndex ? barsToGlow[i].style.opacity = '.2' : barsToGlow[i].style.opacity = '1';
        }
    
        barIndex++;
        requestAnimationFrame(() => {
          animateGlowingStripes(barsToGlow, barIndex);
        });
      }, 300);
    }
    requestAnimationFrame(highlightAStripe);
  }
};

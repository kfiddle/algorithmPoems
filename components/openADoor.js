import { ContactBox } from "./ContactForm.js";
import { aboutCurtains } from './aboutPanel.js';
import { ProjectComponents } from './ProjectsPanel.js';

const aFunction = {
  open: function () {
    console.log("yamminy open");
  },
  close: function () {
    console.log("yamminy close");
  },
};

const aSecondFunction = {
  donuts: "donut eater",

  open: function () {
    console.log("beano open");
  },
  close: function () {
    console.log("beano close");
  },

  print: function () {
    console.log(donuts);
  },
};

export const AllPanelsList = {
  panels: [ProjectComponents, aboutCurtains, ContactBox],

  closeAnyPanelIfOpen: function () {
    for (let panel of this.panels) {
      if (panel.isOpen) {
        panel.close();
      }
    }
  },

  createGlow: function () {
    let barsToGlow = document.querySelector(".bars").childNodes;
    barsToGlow.forEach((stripe) => (stripe.style.opacity = ".2"));
    barsToGlow.forEach((stripe) => (stripe.style.backgroundColor = "gold"));
    let barIndex = 0;
    animateGlowingStripes(barsToGlow, barIndex);

    function animateGlowingStripes(barsToGlow, barIndex) {
      let barsBoxClicker = document.querySelector(".bars");
      barsBoxClicker.addEventListener("click", () => {
        barIndex = 5;
      });

      function highlightAStripe(timestamp) {
        setTimeout(() => {
          if (barIndex === 3) {
            barIndex = 0;
          }

          for (let i = 0; i < barsToGlow.length; i++) {
            i != barIndex
              ? (barsToGlow[i].style.opacity = ".2")
              : (barsToGlow[i].style.opacity = "1");
          }
          barIndex++;
          requestAnimationFrame(() => {
            animateGlowingStripes(barsToGlow, barIndex);
          });
        }, 300);
      }
      if (barIndex < 4) {
        requestAnimationFrame(highlightAStripe);
      }
    }
  },
};

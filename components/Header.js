import { HtmlElement } from "./HtmlElement.js";
import { SideBar } from "./SideBar.js";

export const makeHeaderAndInnerComponents = () => {
  const header = new HtmlElement("header", "header");
  const outerBarsBox = new HtmlElement("div", "outerNavDiv");
  const innerStripesBox = new HtmlElement("div", "bars");
  addWarrantOfficerStripes();

  header.element.innerHTML = `<div class="titleDiv">
    <h1 class="mainTitle">KEN JOHNSTON SOFTWARE</h1>
    <h2>FULL STACK DEVELOPER</h2> 
                                            </div>`;

  outerBarsBox.element.id = "outerNavDiv";
  setTimeout(() => {
    header.rollout("translateY(0vh)");
  }, 400);

  function addWarrantOfficerStripes() {
    for (let i = 0; i < 3; i++) {
      let bar = new HtmlElement("span", "bar");
      bar.element.style.top = i * 8 + 15 + "px";
      innerStripesBox.element.appendChild(bar.element);
    }
  }

  outerBarsBox.element.addEventListener("mouseover", () => {
    scrollingBars(resetBar.bind("up"));
  });

  outerBarsBox.element.addEventListener("mouseout", () => {
    scrollingBars(resetBar.bind("down"));
  });

  outerBarsBox.element.addEventListener("click", () => {
    spinningBars();
    SideBar.slideIn();
  });

  outerBarsBox.element.appendChild(innerStripesBox.element);
  header.element.appendChild(outerBarsBox.element);
  header.attachById("app");

  function scrollingBars(callBackToResetBar) {
    for (let j = 0; j < 3; j++) {
      setTimeout(callBackToResetBar, j * 100, j);
    }
  }

  function resetBar(j) {
    if (this === "up") {
      innerStripesBox.element.childNodes[j].style.opacity = "0.5";
      innerStripesBox.element.childNodes[j].style.transform =
        "translateY(-8px)";
      innerStripesBox.element.childNodes[j].style.backgroundColor = "darkBlue";
    } else if (this === "down") {
      innerStripesBox.element.childNodes[j].style.opacity = "1";
      innerStripesBox.element.childNodes[j].style.transform = "translateY(0px)";
      innerStripesBox.element.childNodes[j].style.backgroundColor = "#5a1616";
    }
  }

  function spinningBars() {
    for (let j = 0; j < 3; j++) {
      setTimeout(() => {
        innerStripesBox.element.childNodes[j].style.transform =
          "rotate(0.5turn)";
      }, j * 70);
    }
  }
};

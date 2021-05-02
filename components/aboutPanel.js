import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");

export const aboutCurtains = {
  headShotCurtain: BetterElement("div", "headShotCurtain"),
  rightCurtain: BetterElement("div", "story"),
  isOpen: false,
  headShot: BetterElement("img", "actualHeadShot"),

  openLeft: function () {
    this.headShot.src = "/assets/headShot.JPG";
    this.headShotCurtain.appendChild(this.headShot);
    app.appendChild(this.headShotCurtain);

    waitAndThen(() => {
      this.headShotCurtain.rollout("translateX(0vw)");
    }, 200),
      waitAndThen(() => {
        this.headShotCurtain.style.opacity = "1";
      }, 200);
    waitAndThen(() => {
      this.headShotCurtain.style.background = "#708090";
      this.headShot.style.filter = "brightness(90%)";
    }, 700);
    this.isOpen = true;
  },

  openRight: function () {
    waitAndThen(() => {
      this.rightCurtain.rollout("translateX(0vw)");
    }, 400);

    let storyBlocks = {
      top: BetterElement("div", "topThirdStory", "storyBlock"),
      middle: BetterElement("div", "middleThirdStory", "storyBlock"),
      bottom: BetterElement("div", "bottomThirdStory", "storyBlock"),
    };

    storyBlocks.top.innerHTML = `<h2>Until recently, I spent each day as a professional violin player immersed in a centuries-old world. I spent thousands of hours with a piece of technology built around the year 1800, and with it I explored a world of language and ideas stretching back even further. I used to joke that my analog brain couldn't function without pencil and paper.</h2>`;
    storyBlocks.middle.innerHTML = `<h2>These days, I design websites from scratch. I love building
                                    my own front-end components and also connecting them to a back-end in Java... 
    </h2>`;
    storyBlocks.bottom.innerHTML = `<h2>...and although like all the cool kids these days, 
    I'm exploring as much as I can in libraries like React, let's not forget that front-end skill is still based 
    in plain, old, vanilla Javascript.
    </h2>`;

    for (let block in storyBlocks) {
        this.rightCurtain.appendChild(storyBlocks[block]);
        waitAndThen(()=> { storyBlocks[block].style.transform = 'translateX(-10vw)' }, 800);
    }


    app.appendChild(this.rightCurtain);
  },

  open: function () {
    this.openLeft();
    this.openRight();
  },

  close: function () {
    this.headShotCurtain.rollout("translateX(-52vw");
    this.rightCurtain.rollout("translateX(52vw");

    waitAndThen(() => {
      this.headShotCurtain.eraseAllKids();
      this.rightCurtain.eraseAllKids();

      app.removeChild(this.headShotCurtain);
      app.removeChild(this.rightCurtain);
    }, 500);

    this.isOpen = false;
  },
};

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
    }, 400),
      waitAndThen(() => {
        this.headShotCurtain.style.opacity = "1";
      }, 850);
    waitAndThen(() => {
      this.headShotCurtain.style.background = "#708090";
      this.headShot.style.filter = "brightness(90%)";
    }, 900);
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

    storyBlocks.top.innerHTML = "it's howdy doody time";
    storyBlocks.middle.innerHTML = "gracie has a double chin";
    storyBlocks.bottom.innerHTML = "I will be huge in a few years";

    for (let block in storyBlocks) {
        this.rightCurtain.appendChild(storyBlocks[block]);
        waitAndThen(()=> { storyBlocks[block].style.transform = 'translateX(0vw)' }, 800);
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

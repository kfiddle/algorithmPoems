import { BetterElement, waitAndThen } from "./betterElement.js";

let app = document.getElementById("app");
let carouselIndex = 0;

let projectInfo = [
  {
    description:
      "A collaboration with my friend Karin Samoviski. All animations and components are vanilla Javascript, and the back-end modeling and database are built in Java and Spring Boot. ",
    carousel: [
      "/assets/slides/skyPondSlide1.jpg",
      "/assets/slides/skyPondSlide2.jpg",
      "/assets/slides/skyPondPhoneFormatter.jpg",
    ],
  },
  {
    description:
      "An app designed for genealogists. Perhaps your ancestor inherited land in 1750? Or was paid by the Continental Army per mile of marching? This app will help you do a few necessary calculations with an unfamiliar currency.",
    carousel: [
      "/assets/slides/colonialCurrencySlide1.jpg",
      "/assets/slides/colonialSlide2.jpg",
    ],
  },
  {
    description:
      "A business simulation. In this case, a generic employee survey form populates an independent spreadsheet, and a relational database of companies and their employees is managed through the administrative pages. Java Spring Boot and Javascript.",
    carousel: ["/assets/slides/apexSlide1.jpg"],
  },
  {
    description: "a super DUPER cool thing",
    carousel: ["/assets/slides/apexSlide1.jpg"],
  },
];

export const ProjectModal = {
  open: function (projectIndex) {
    this.isOpen = true;
    this.modalBox = BetterElement("div", "projectModal");
    this.innerModalDiv = BetterElement("div", "innerModalDiv");

    this.descriptionDiv = BetterElement("div", "descriptionDiv");
    this.descriptionText = BetterElement("h3", "descriptionText");

    this.slideDiv = BetterElement("div", "slideDiv");
    this.slideImageDiv = BetterElement("div", "slideImageDiv");

    this.slideButtons = [
      BetterElement("button", "carouselButtons", "arrow-left"),
      BetterElement("button", "carouselButtons", "arrow-right"),
    ];

    let xOut = BetterElement("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", () => {
      this.close();
    });
    this.modalBox.appendChild(xOut);

    this.descriptionText.innerText = projectInfo[projectIndex].description;

    this.descriptionDiv.appendChild(this.descriptionText);
    this.innerModalDiv.appendChild(this.descriptionDiv);

    this.slideImageDiv.id = "slideImageDiv";
    this.slideImageDiv.style.backgroundImage = `url(${projectInfo[projectIndex].carousel[carouselIndex]})`;
    this.slideDiv.appendChild(this.slideImageDiv);

    this.slideButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        moveSlides(index, projectIndex);
      });
      this.slideDiv.appendChild(button);
    });

    this.innerModalDiv.appendChild(this.slideDiv);
    this.modalBox.appendChild(this.innerModalDiv);

    app.appendChild(this.modalBox);
    waitAndThen(() => {
      this.modalBox.rollout("translateX(0vw)");
    }, 100);

    waitAndThen(() => {
      this.modalBox.classList.add("opened");
    }, 800);

    this.isOpen = true;
    carouselIndex = 0;
  },

  close: function () {
    if (this.isOpen) {
      this.modalBox.rollout("translateX(100vw)");
      this.modalBox.classList.remove("opened");
      this.slideButtons.forEach((button) =>
        button.removeEventListener("click", () => {
          moveSlides(index, projectIndex);
        })
      );
      waitAndThen(() => {
        this.modalBox.eraseAllKids();
        this.modalBox.parentElement.removeChild(this.modalBox);
        console.log(document.getElementById("app"));
      }, 500);
      this.isOpen = false;

      carouselIndex = 0;
    }
  },
};

function moveSlides(leftOrRightButton, projectIndex) {
  let slideImageDiv = document.getElementById("slideImageDiv");
  let listLength = projectInfo[projectIndex].carousel.length;

  if (leftOrRightButton === 1) {
    if (carouselIndex === listLength - 1) {
      carouselIndex = -1;
    }
    carouselIndex++;
  } else {
    if (carouselIndex === 0) {
      carouselIndex = listLength;
    }
    carouselIndex--;
  }
  slideImageDiv.style.backgroundImage = `url(${projectInfo[projectIndex].carousel[carouselIndex]})`;
  console.log(carouselIndex);
}

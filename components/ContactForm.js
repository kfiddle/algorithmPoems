import { BetterElement, waitAndThen } from "./betterElement.js";
let app = document.getElementById('app');

export const ContactBox = {
  contactBox: BetterElement("div", "contactBox"),
  isOpen: false,

  open: function () {
    const inputsBox = BetterElement("div");
    const contactBoxHeader = BetterElement("div");
    const header = BetterElement("h2");
    header.innerHTML =
      "Feel free to share as much information as you'd like here";
    const myContactInfoBox = BetterElement("div", "myContactInfo");
    const myContactInfoSentence = BetterElement("h2");
    myContactInfoSentence.innerHTML = "Or simply write me at...";
    const myEmail = BetterElement("h1", "myEmail");
    myEmail.innerHTML = "@SuperDuperEmail";

    const inputs = {
      nameInput: BetterElement("input"),
      emailInput: BetterElement("input"),
      phoneInput: BetterElement("input"),
    };

    const submitButton = BetterElement("button", "submitButton");
    submitButton.innerText = "Submit";

    contactBoxHeader.id = "contactBoxHeader";
    inputs.nameInput.id = "nameInput";
    inputs.phoneInput.id = "phoneInput";
    inputs.emailInput.id = "emailInput";

    inputs.nameInput.placeholder = "Name";
    inputs.phoneInput.placeholder = "Phone Number";
    inputs.emailInput.placeholder = "Email";

    for (let input in inputs) {
      inputsBox.appendChild(inputs[input]);
    }

    myContactInfoBox.appendChild(myContactInfoSentence);
    this.contactBox.appendChild(submitButton);

    this.contactBox.appendChild(myContactInfoBox).appendChild(myEmail);
    this.contactBox.appendChild(contactBoxHeader).appendChild(header);
    app
      .appendChild(this.contactBox)
      .appendChild(inputsBox);

    waitAndThen(() => {
      this.contactBox.style.transform = "translateY(-110vh)";
    }, 100);

    for (let key in inputs) {
      waitAndThen(() => {
        inputs[key].rollout("translateX(0vw)");
      }, 1000);
    }

    waitAndThen(() => {
      myContactInfoBox.style.transform = "translateY(45vh)";
    }, 1000);

    this.isOpen = true;
  },

  close: function () {
    this.contactBox.style.transform = "translateY(100vh)";
    this.contactBox.eraseAllKids();
    waitAndThen(() => {
      app.removeChild(this.contactBox);
    }, 200);

    this.isOpen = false;
  },
};

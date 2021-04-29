import { BetterElement, waitAndThen } from "./betterElement.js";


export const openContactBox = () => {
  const contactBox = BetterElement("div", "contactBox");
  const inputsBox = BetterElement('div');
  const contactBoxHeader = BetterElement('div');
  const header = BetterElement('h2');
  header.innerHTML = "Feel free to share as much information as you'd like here";
  const myContactInfoBox =  BetterElement('div', 'myContactInfo');
  const myContactInfoSentence = BetterElement('h2');
  myContactInfoSentence.innerHTML = 'Or simply write me at...';

  const inputs = {
    nameInput : BetterElement('input'),
    emailInput: BetterElement('input'),
    phoneInput: BetterElement('input')
  }
  
  contactBoxHeader.id = 'contactBoxHeader';
  inputs.nameInput.id = 'nameInput';
  inputs.phoneInput.id = 'phoneInput';
  inputs.emailInput.id = 'emailInput';

  inputs.nameInput.placeholder = 'Name';
  inputs.phoneInput.placeholder = 'Phone Number';
  inputs.emailInput.placeholder = 'Email';

  for (let input in inputs) {
    inputsBox.appendChild(inputs[input]);
  }
  
  contactBox.appendChild(myContactInfoBox).appendChild(myContactInfoSentence);
  contactBox.appendChild(contactBoxHeader).appendChild(header);
  document.getElementById("app").appendChild(contactBox).appendChild(inputsBox);

  waitAndThen(()=> { contactBox.style.transform = 'translateY(-110vh'}, 100);

  for (let key in inputs) {
      waitAndThen(() => { inputs[key].rollout('translateX(0vw)'); }, 1000);
  }


};


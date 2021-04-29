
export class HtmlElement {
    constructor(tag, ...classList) {
      this.element = document.createElement(tag);
      if (classList) {
        classList.forEach((className) => this.element.classList.add(className));
      }
    }
  
    attachById(parentElementId) {
      document.getElementById(parentElementId).appendChild(this.element);
    }
  
    attachToByClass(elementClass) {
      document.querySelector(`.${elementClass}`).appendChild(this.element);
    }
  
    rollout(translateParam) {
      this.element.style.transform = translateParam;
    }
  } 
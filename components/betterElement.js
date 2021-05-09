
export const BetterElement = (tag, ...classList) => {
    let elementToReturn = document.createElement(tag);
    
    if (classList) {
        classList.forEach((className) => elementToReturn.classList.add(className));
    }

    elementToReturn.rollout = (translationParameter) => {
        elementToReturn.style.transform = translationParameter;
    }

    elementToReturn.eraseAllKids = () => {
        while(elementToReturn.lastChild) {
            elementToReturn.removeChild(elementToReturn.lastChild);
        }
    }

    return elementToReturn;
}

export const waitAndThen = (callback, time) => {
    setTimeout(() => {  callback() }, time);
}




export const PennyFarthing = (leftSpot, bigRotator, smallRotator) => {
  
  let bigwheel = document.getElementById("Bigwheel");
  let smallwheel = document.getElementById("Smallwheel");
  let pennyFrame = document.getElementById('PennyFrame');

  function placeTheWheel() {
    bigwheel.style.left = leftSpot + "px";
    bigwheel.style.transform = `rotate(${bigRotator}deg)`;

    smallwheel.style.left = leftSpot + 'px';
    smallwheel.style.transform = `rotate(${smallRotator}deg)`;
    pennyFrame.style.left = (leftSpot - 20)  + 'px';

    leftSpot += 5;
    bigRotator += 3;
    smallRotator += 12;

    if (leftSpot < window.innerWidth + 100) {
        requestAnimationFrame(() => {
            PennyFarthing(leftSpot, bigRotator, smallRotator);
        });
    }
  }

  requestAnimationFrame(placeTheWheel);
};

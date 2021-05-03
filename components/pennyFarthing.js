let bigwheel = document.getElementById("Bigwheel");
let smallwheel = document.getElementById("Smallwheel");
let pennyFrame = document.getElementById('PennyFrame');


export const oldBike = (leftSpot, bigRotator, smallRotator) => {
  function placeTheWheel(timestamp) {
    bigwheel.style.left = leftSpot + "px";
    bigwheel.style.transform = `rotate(${bigRotator}deg)`;

    smallwheel.style.left = leftSpot + 'px';
    smallwheel.style.transform = `rotate(${smallRotator}deg)`;
    pennyFrame.style.left = (leftSpot - 20)  + 'px';

    leftSpot += 5;
    bigRotator += 3;
    smallRotator += 12;

    if (leftSpot < window.innerWidth + 200) {

        requestAnimationFrame(() => {
            oldBike(leftSpot, bigRotator, smallRotator);
        });
    }
  }

  requestAnimationFrame(placeTheWheel);
};

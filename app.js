import { makeHeaderAndInnerComponents } from "./components/Header.js";

import { oldBike } from './components/pennyFarthing.js';

const app = document.getElementById("app");

let [leftSpot, bigRotator, smallRotator] = [0, 0, 0];


class App {
  static renderBasicPage() {
    makeHeaderAndInnerComponents();
    oldBike(leftSpot, bigRotator, smallRotator);

  }
}

App.renderBasicPage();


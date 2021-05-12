import { makeHeaderAndInnerComponents } from "./components/Header.js";

import { PennyFarthing } from './components/pennyFarthing.js';

const app = document.getElementById("app");

let [leftSpot, bigRotator, smallRotator] = [0, 0, 0];


class App {
  static renderBasicPage() {
    makeHeaderAndInnerComponents();
    PennyFarthing(leftSpot, bigRotator, smallRotator);

  }
}

App.renderBasicPage();


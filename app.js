import { makeHeaderAndInnerComponents } from "./components/Header.js";

const app = document.getElementById("app");

class App {
  static renderBasicPage() {
    makeHeaderAndInnerComponents();

  }
}

App.renderBasicPage();

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"components/betterElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitAndThen = exports.BetterElement = void 0;

var BetterElement = function BetterElement(tag) {
  var elementToReturn = document.createElement(tag);

  for (var _len = arguments.length, classList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classList[_key - 1] = arguments[_key];
  }

  if (classList) {
    classList.forEach(function (className) {
      return elementToReturn.classList.add(className);
    });
  }

  elementToReturn.rollout = function (translationParameter) {
    elementToReturn.style.transform = translationParameter;
  };

  elementToReturn.eraseAllKids = function () {
    while (elementToReturn.lastChild) {
      elementToReturn.removeChild(elementToReturn.lastChild);
    }
  };

  return elementToReturn;
};

exports.BetterElement = BetterElement;

var waitAndThen = function waitAndThen(callback, time) {
  setTimeout(function () {
    callback();
  }, time);
};

exports.waitAndThen = waitAndThen;
},{}],"components/HtmlElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HtmlElement = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HtmlElement = /*#__PURE__*/function () {
  function HtmlElement(tag) {
    var _this = this;

    _classCallCheck(this, HtmlElement);

    this.element = document.createElement(tag);

    for (var _len = arguments.length, classList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classList[_key - 1] = arguments[_key];
    }

    if (classList) {
      classList.forEach(function (className) {
        return _this.element.classList.add(className);
      });
    }
  }

  _createClass(HtmlElement, [{
    key: "attachById",
    value: function attachById(parentElementId) {
      document.getElementById(parentElementId).appendChild(this.element);
    }
  }, {
    key: "attachToByClass",
    value: function attachToByClass(elementClass) {
      document.querySelector(".".concat(elementClass)).appendChild(this.element);
    }
  }, {
    key: "rollout",
    value: function rollout(translateParam) {
      this.element.style.transform = translateParam;
    }
  }]);

  return HtmlElement;
}();

exports.HtmlElement = HtmlElement;
},{}],"components/hiddenSideDiv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeHiddenSideDiv = void 0;

var _betterElement = require("./betterElement.js");

var MakeHiddenSideDiv = function MakeHiddenSideDiv() {
  var hidingPanel = (0, _betterElement.BetterElement)("div", "hiddenSideDiv");
  document.getElementById("app").appendChild(hidingPanel);
  setTimeout(function () {
    hidingPanel.rollout("translateX(0vw)");
  }, 20);
  setTimeout(function () {
    hidingPanel.style.background = '#cbd1d2';
  }, 600);
};

exports.MakeHiddenSideDiv = MakeHiddenSideDiv;
},{"./betterElement.js":"components/betterElement.js"}],"components/ContactForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactBox = void 0;

var _betterElement = require("./betterElement.js");

var app = document.getElementById("app");
var ContactBox = {
  contactBox: (0, _betterElement.BetterElement)("div", "contactBox"),
  isOpen: false,
  submitContactInfo: function submitContactInfo() {
    var contactInfo = {
      fullName: document.querySelector(".nameInput").value,
      phoneNumber: document.querySelector(".phoneInput").value,
      emailAddress: document.querySelector(".emailInput").value,
      message: document.querySelector(".messageInput").value
    };
    fetch("https://agile-basin-20718.herokuapp.com/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactInfo)
    });
  },
  open: function open() {
    var _this = this;

    var inputsBox = (0, _betterElement.BetterElement)("div");
    var contactBoxHeader = (0, _betterElement.BetterElement)("div");
    var header = (0, _betterElement.BetterElement)("h2");
    header.innerText = "Feel free to share as much information as you'd like here";
    var myContactInfoBox = (0, _betterElement.BetterElement)("div", "myContactInfo");
    var myContactInfoSentence = (0, _betterElement.BetterElement)("h2");
    myContactInfoSentence.innerText = "Or simply write me at...";
    var myEmail = (0, _betterElement.BetterElement)("h1", "myEmail");
    myEmail.innerText = "kenjsoftware@gmail.com";
    var messageInput = (0, _betterElement.BetterElement)("textArea", "messageInput");
    messageInput.setAttribute("cols", "60");
    messageInput.setAttribute("rows", "10");
    var inputs = {
      nameInput: (0, _betterElement.BetterElement)("input", "nameInput"),
      emailInput: (0, _betterElement.BetterElement)("input", "emailInput"),
      phoneInput: (0, _betterElement.BetterElement)("input", "phoneInput")
    };
    var submitButton = (0, _betterElement.BetterElement)("button", "submitButton");
    submitButton.innerHTML = "<h2>Submit</h2>";
    submitButton.addEventListener("click", this.submitContactInfo);
    contactBoxHeader.id = "contactBoxHeader";
    inputs.nameInput.id = "nameInput";
    inputs.phoneInput.id = "phoneInput";
    inputs.emailInput.id = "emailInput";
    inputs.nameInput.placeholder = "Name";
    inputs.phoneInput.placeholder = "Phone Number";
    inputs.emailInput.placeholder = "Email";

    for (var input in inputs) {
      inputsBox.appendChild(inputs[input]);
    }

    myContactInfoBox.appendChild(myContactInfoSentence);
    this.contactBox.appendChild(myContactInfoBox).appendChild(myEmail);
    this.contactBox.appendChild(contactBoxHeader).appendChild(header);
    app.appendChild(this.contactBox).appendChild(inputsBox);
    this.contactBox.appendChild(messageInput);
    this.contactBox.appendChild(submitButton);
    (0, _betterElement.waitAndThen)(function () {
      _this.contactBox.style.transform = "translateY(-110vh)";
    }, 100);

    var _loop = function _loop(key) {
      (0, _betterElement.waitAndThen)(function () {
        inputs[key].rollout("translateX(0vw)");
      }, 1000);
    };

    for (var key in inputs) {
      _loop(key);
    }

    (0, _betterElement.waitAndThen)(function () {
      myContactInfoBox.style.transform = "translateY(70vh)";
    }, 1000);
    this.isOpen = true;
  },
  close: function close() {
    var _this2 = this;

    this.contactBox.style.transform = "translateY(100vh)";
    this.contactBox.eraseAllKids();
    (0, _betterElement.waitAndThen)(function () {
      app.removeChild(_this2.contactBox);
    }, 200);
    this.isOpen = false;
  }
};
exports.ContactBox = ContactBox;
},{"./betterElement.js":"components/betterElement.js"}],"components/aboutPanel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aboutCurtains = void 0;

var _betterElement = require("./betterElement.js");

var app = document.getElementById("app");
var aboutCurtains = {
  headShotCurtain: (0, _betterElement.BetterElement)("div", "headShotCurtain"),
  rightCurtain: (0, _betterElement.BetterElement)("div", "story"),
  isOpen: false,
  headShot: (0, _betterElement.BetterElement)("img", "actualHeadShot"),
  openLeft: function openLeft() {
    var _this = this;

    this.headShot.src = "/assets/headShot.JPG";
    this.headShotCurtain.appendChild(this.headShot);
    app.appendChild(this.headShotCurtain);
    (0, _betterElement.waitAndThen)(function () {
      _this.headShotCurtain.rollout("translateX(0vw)");
    }, 200), (0, _betterElement.waitAndThen)(function () {
      _this.headShotCurtain.style.opacity = "1";
    }, 200);
    (0, _betterElement.waitAndThen)(function () {
      _this.headShotCurtain.style.background = "#708090";
      _this.headShot.style.filter = "brightness(90%)";
    }, 700);
    this.isOpen = true;
  },
  openRight: function openRight() {
    var _this2 = this;

    (0, _betterElement.waitAndThen)(function () {
      _this2.rightCurtain.rollout("translateX(0vw)");
    }, 400);
    var storyBlocks = {
      top: (0, _betterElement.BetterElement)("div", "topThirdStory", "storyBlock"),
      middle: (0, _betterElement.BetterElement)("div", "middleThirdStory", "storyBlock"),
      bottom: (0, _betterElement.BetterElement)("div", "bottomThirdStory", "storyBlock")
    };
    storyBlocks.top.innerHTML = "<h2>Until recently, I spent each day as a professional violin player immersed in a centuries-old world. I spent thousands of hours with a piece of technology built around the year 1800, and with it I explored a world of language and ideas stretching back even further. I used to joke that my analog brain couldn't function without pencil and paper.</h2>";
    storyBlocks.middle.innerHTML = "<h2>These days, I design websites from scratch. I love building\n                                    my own front-end components and also connecting them to a back-end in Java... \n    </h2>";
    storyBlocks.bottom.innerHTML = "<h2>...and although like all the cool kids these days, \n    I'm exploring as much as I can in libraries like React, let's not forget that front-end skill is still based \n    in plain, old, vanilla Javascript.\n    </h2>";

    var _loop = function _loop(block) {
      _this2.rightCurtain.appendChild(storyBlocks[block]);

      (0, _betterElement.waitAndThen)(function () {
        storyBlocks[block].style.transform = 'translateX(-10vw)';
      }, 800);
    };

    for (var block in storyBlocks) {
      _loop(block);
    }

    app.appendChild(this.rightCurtain);
  },
  open: function open() {
    this.openLeft();
    this.openRight();
  },
  close: function close() {
    var _this3 = this;

    this.headShotCurtain.rollout("translateX(-52vw");
    this.rightCurtain.rollout("translateX(52vw");
    (0, _betterElement.waitAndThen)(function () {
      _this3.headShotCurtain.eraseAllKids();

      _this3.rightCurtain.eraseAllKids();

      app.removeChild(_this3.headShotCurtain);
      app.removeChild(_this3.rightCurtain);
    }, 500);
    this.isOpen = false;
  }
};
exports.aboutCurtains = aboutCurtains;
},{"./betterElement.js":"components/betterElement.js"}],"components/ProjectModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectModal = void 0;

var _betterElement = require("./betterElement.js");

var app = document.getElementById("app");
var carouselIndex = 0;
var projectInfo = [{
  description: "A collaboration with my friend Karin Samoviski. All animations and components are vanilla Javascript, and the back-end modeling and database are built in Java and Spring Boot. ",
  carousel: ["/assets/slides/skyPondSlide1.jpg", "/assets/slides/skyPondSlide2.jpg", "/assets/slides/skyPondPhoneFormatter.jpg"]
}, {
  description: "An app designed for genealogists. Perhaps your ancestor inherited land in 1750? Or was paid by the Continental Army per mile of marching? This app will help you do a few necessary calculations with an unfamiliar currency.",
  carousel: ["/assets/slides/colonialCurrencySlide1.jpg", "/assets/slides/colonialSlide2.jpg"]
}, {
  description: "A business simulation. In this case, a generic employee survey form populates an independent spreadsheet, and a relational database of companies and their employees is managed through the administrative pages. Java Spring Boot and Javascript.",
  carousel: ["/assets/slides/apexSlide1.jpg"]
}, {
  description: "a super DUPER cool thing",
  carousel: ["/assets/slides/apexSlide1.jpg"]
}];
var ProjectModal = {
  open: function open(projectIndex) {
    var _this = this;

    this.isOpen = true;
    this.modalBox = (0, _betterElement.BetterElement)("div", "projectModal");
    this.innerModalDiv = (0, _betterElement.BetterElement)("div", "innerModalDiv");
    this.descriptionDiv = (0, _betterElement.BetterElement)("div", "descriptionDiv");
    this.descriptionText = (0, _betterElement.BetterElement)("h3", "descriptionText");
    this.slideDiv = (0, _betterElement.BetterElement)("div", "slideDiv");
    this.slideImageDiv = (0, _betterElement.BetterElement)("div", "slideImageDiv");
    this.slideButtons = [(0, _betterElement.BetterElement)("button", "carouselButtons", "arrow-left"), (0, _betterElement.BetterElement)("button", "carouselButtons", "arrow-right")];
    var xOut = (0, _betterElement.BetterElement)("h1", "xOut");
    xOut.innerText = "X";
    xOut.addEventListener("click", function () {
      _this.close();
    });
    this.modalBox.appendChild(xOut);
    this.descriptionText.innerText = projectInfo[projectIndex].description;
    this.descriptionDiv.appendChild(this.descriptionText);
    this.innerModalDiv.appendChild(this.descriptionDiv);
    this.slideImageDiv.id = "slideImageDiv";
    this.slideImageDiv.style.backgroundImage = "url(".concat(projectInfo[projectIndex].carousel[carouselIndex], ")");
    this.slideDiv.appendChild(this.slideImageDiv);
    this.slideButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        moveSlides(index, projectIndex);
      });

      _this.slideDiv.appendChild(button);
    });
    this.innerModalDiv.appendChild(this.slideDiv);
    this.modalBox.appendChild(this.innerModalDiv);
    app.appendChild(this.modalBox);
    (0, _betterElement.waitAndThen)(function () {
      _this.modalBox.rollout("translateX(0vw)");
    }, 100);
    (0, _betterElement.waitAndThen)(function () {
      _this.modalBox.classList.add("opened");
    }, 800);
    this.isOpen = true;
    carouselIndex = 0;
  },
  close: function close() {
    var _this2 = this;

    if (this.isOpen) {
      this.modalBox.rollout("translateX(100vw)");
      this.modalBox.classList.remove("opened");
      this.slideButtons.forEach(function (button) {
        return button.removeEventListener("click", function () {
          moveSlides(index, projectIndex);
        });
      });
      (0, _betterElement.waitAndThen)(function () {
        _this2.modalBox.eraseAllKids();

        _this2.modalBox.parentElement.removeChild(_this2.modalBox);

        console.log(document.getElementById("app"));
      }, 500);
      this.isOpen = false;
      carouselIndex = 0;
    }
  }
};
exports.ProjectModal = ProjectModal;

function moveSlides(leftOrRightButton, projectIndex) {
  var slideImageDiv = document.getElementById("slideImageDiv");
  var listLength = projectInfo[projectIndex].carousel.length;

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

  slideImageDiv.style.backgroundImage = "url(".concat(projectInfo[projectIndex].carousel[carouselIndex], ")");
  console.log(carouselIndex);
}
},{"./betterElement.js":"components/betterElement.js"}],"components/ProjectsPanel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectComponents = void 0;

var _betterElement = require("./betterElement.js");

var _ProjectModal = require("./ProjectModal.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = document.getElementById("app");

var ProjectBox = /*#__PURE__*/function () {
  function ProjectBox(element, projectIndex) {
    var _this = this;

    _classCallCheck(this, ProjectBox);

    this.box = element;
    this.box.addEventListener("mouseover", function () {
      _this.highlightProject("hover");
    });
    this.box.addEventListener("mouseout", function () {
      _this.highlightProject("hoverOut");
    });
    this.box.addEventListener("click", function () {
      _ProjectModal.ProjectModal.open(projectIndex);
    });
  }

  _createClass(ProjectBox, [{
    key: "highlightProject",
    value: function highlightProject(mouseAction) {
      if (mouseAction === "hover") {
        this.box.style.filter = "brightness(80%) hue-rotate(200deg) saturate(60%) invert(20%)";
        var innerProjectHeader = (0, _betterElement.BetterElement)("h2", "innerProjectHeader");
        var clickForDeets = "click for details";
        var lettersIndex = 0;

        function oneLetter() {
          function changeALetter(timestamp) {
            if (lettersIndex < clickForDeets.length + 1) {
              innerProjectHeader.innerText = clickForDeets.substr(0, lettersIndex);
              lettersIndex++;
            }

            requestAnimationFrame(oneLetter);
          }

          requestAnimationFrame(changeALetter);
        }

        oneLetter();
        this.box.appendChild(innerProjectHeader);
      } else {
        this.box.removeChild(this.box.lastChild);
        this.box.style.filter = "";
      }
    }
  }]);

  return ProjectBox;
}();

var ProjectComponents = {
  projectsContainer: (0, _betterElement.BetterElement)("div", "projectsPanel"),
  projectBoxes: {
    1: new ProjectBox((0, _betterElement.BetterElement)('div', 'projectBox', 'first'), 0),
    2: new ProjectBox((0, _betterElement.BetterElement)('div', 'projectBox', 'second'), 1),
    3: new ProjectBox((0, _betterElement.BetterElement)('div', 'projectBox', 'third'), 2),
    4: new ProjectBox((0, _betterElement.BetterElement)('div', 'projectBox', 'fourth'), 3)
  },
  rollTheBoxes: function rollTheBoxes(direction) {
    for (var project in this.projectBoxes) {
      direction === "in" ? this.projectBoxes[project].box.rollout("translateY(-100vh)") : this.projectBoxes[project].box.rollout("translateY(100vh)");
    }
  },
  isOpen: false,
  open: function open() {
    var _this2 = this;

    for (var project in this.projectBoxes) {
      this.projectsContainer.appendChild(this.projectBoxes[project].box);
      (0, _betterElement.waitAndThen)(function () {
        _this2.rollTheBoxes("in");
      }, 200);
    }

    app.appendChild(this.projectsContainer);
    this.isOpen = true;
  },
  close: function close() {
    var _this3 = this;

    this.rollTheBoxes("out");

    _ProjectModal.ProjectModal.close();

    (0, _betterElement.waitAndThen)(function () {
      _this3.projectsContainer.eraseAllKids();

      app.removeChild(_this3.projectsContainer);
    }, 400);
    this.isOpen = false;
  }
};
exports.ProjectComponents = ProjectComponents;

function closeModal() {
  var modal = document.querySelector(".projectModal");
  modal.rollout("translateY(0vh)");
  (0, _betterElement.waitAndThen)(function () {
    modal.parentElement.removeChild(modal);
  }, 500);
}
},{"./betterElement.js":"components/betterElement.js","./ProjectModal.js":"components/ProjectModal.js"}],"components/openADoor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllPanelsList = void 0;

var _ContactForm = require("./ContactForm.js");

var _aboutPanel = require("./aboutPanel.js");

var _ProjectsPanel = require("./ProjectsPanel.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var AllPanelsList = {
  panels: [_ProjectsPanel.ProjectComponents, _aboutPanel.aboutCurtains, _ContactForm.ContactBox],
  closeAnyPanelIfOpen: function closeAnyPanelIfOpen() {
    var _iterator = _createForOfIteratorHelper(this.panels),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var panel = _step.value;

        if (panel.isOpen) {
          panel.close();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  createGlow: function createGlow() {
    var barsToGlow = document.querySelector(".bars").childNodes;
    barsToGlow.forEach(function (stripe) {
      return stripe.style.opacity = ".2";
    });
    barsToGlow.forEach(function (stripe) {
      return stripe.style.backgroundColor = "gold";
    });
    var barIndex = 0;
    animateGlowingStripes(barsToGlow, barIndex);

    function animateGlowingStripes(barsToGlow, barIndex) {
      var barsBoxClicker = document.querySelector(".bars");
      barsBoxClicker.addEventListener("click", function () {
        barIndex = 5;
      });

      function highlightAStripe(timestamp) {
        setTimeout(function () {
          if (barIndex === 3) {
            barIndex = 0;
          }

          for (var i = 0; i < barsToGlow.length; i++) {
            i != barIndex ? barsToGlow[i].style.opacity = ".2" : barsToGlow[i].style.opacity = "1";
          }

          barIndex++;
          requestAnimationFrame(function () {
            animateGlowingStripes(barsToGlow, barIndex);
          });
        }, 300);
      }

      if (barIndex < 4) {
        requestAnimationFrame(highlightAStripe);
      }
    }
  }
};
exports.AllPanelsList = AllPanelsList;
},{"./ContactForm.js":"components/ContactForm.js","./aboutPanel.js":"components/aboutPanel.js","./ProjectsPanel.js":"components/ProjectsPanel.js"}],"components/SideBar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBar = void 0;

var _HtmlElement = require("./HtmlElement.js");

var _betterElement = require("./betterElement.js");

var _hiddenSideDiv = require("./hiddenSideDiv.js");

var _openADoor = require("./openADoor.js");

var app = document.getElementById('app');
var sideBarIsOpen = false;
var onOffSwitch = true;
var menuItems = [// "beautiful recursion",
// "another item of note",
// "smoke and mirrors",
"current projects", "about", "contact"];
var SideBar = (0, _betterElement.BetterElement)("div", "sideBar", "closed");
exports.SideBar = SideBar;
app.appendChild(SideBar);

SideBar.close = function () {
  SideBar.rollout("translateX(-25vw)");
  SideBar.eraseAllKids();
  SideBar.classList.add("closed");
  app.removeChild(app.querySelector('.hiddenSideDiv'));
  sideBarIsOpen = false;
};

SideBar.open = function () {
  SideBar.rollout("translateX(12vw)");
  (0, _hiddenSideDiv.MakeHiddenSideDiv)();
  sideBarIsOpen = true;
  var menuItemIndex = 0;
  setTimeout(function () {
    SideBar.menuAppears(menuItemIndex);
  }, 650);
  setTimeout(function () {
    SideBar.classList.remove("closed");
  }, 600);
};

SideBar.isClicked = function () {
  if (!sideBarIsOpen) {
    _openADoor.AllPanelsList.closeAnyPanelIfOpen();

    SideBar.open();
  } else {
    SideBar.close();
  }
};

var newMenuItemChange = function newMenuItemChange(menuItemElement) {
  menuItemElement.element.classList.remove("bigAndGlowing");
};

SideBar.menuAppears = function (menuItemIndex) {
  function menuItemPopOut(timestamp) {
    setTimeout(function () {
      if (menuItemIndex < menuItems.length) {
        var itemToAdd = new _HtmlElement.HtmlElement("h2", "sideBarItem", "bigAndGlowing");
        itemToAdd.element.innerText = menuItems[menuItemIndex];
        itemToAdd.element.addEventListener("click", function () {
          _openADoor.AllPanelsList.panels[menuItemIndex - 1].open();

          _openADoor.AllPanelsList.createGlow(onOffSwitch);

          setTimeout(function () {
            SideBar.close();
          }, 600);
        });
        SideBar.appendChild(itemToAdd.element);
        setTimeout(function () {
          newMenuItemChange(itemToAdd);
        }, 100);
        menuItemIndex++;
      }

      requestAnimationFrame(function () {
        SideBar.menuAppears(menuItemIndex);
      });
    }, 150);
  }

  requestAnimationFrame(menuItemPopOut);
};
},{"./HtmlElement.js":"components/HtmlElement.js","./betterElement.js":"components/betterElement.js","./hiddenSideDiv.js":"components/hiddenSideDiv.js","./openADoor.js":"components/openADoor.js"}],"components/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHeaderAndInnerComponents = void 0;

var _HtmlElement = require("./HtmlElement.js");

var _SideBar = require("./SideBar.js");

var makeHeaderAndInnerComponents = function makeHeaderAndInnerComponents() {
  var header = new _HtmlElement.HtmlElement("header", "header");
  var outerBarsBox = new _HtmlElement.HtmlElement("div", "outerNavDiv");
  outerBarsBox.element.id = 'barsBox';
  var innerStripesBox = new _HtmlElement.HtmlElement("div", "bars");
  addWarrantOfficerStripes();
  header.element.innerHTML = "<div class=\"titleDiv\">\n    <h1 class=\"mainTitle\">KEN JOHNSTON SOFTWARE</h1>\n    <h2>FULL STACK DEVELOPER</h2> \n                                            </div>";
  outerBarsBox.element.id = "outerNavDiv";
  setTimeout(function () {
    header.rollout("translateY(0vh)");
  }, 400);

  function addWarrantOfficerStripes() {
    for (var i = 0; i < 3; i++) {
      var bar = new _HtmlElement.HtmlElement("span", "bar");
      bar.element.style.top = i * 8 + 15 + "px";
      innerStripesBox.element.appendChild(bar.element);
    }
  }

  outerBarsBox.element.addEventListener("mouseover", function () {
    scrollingBars(resetBar.bind("up"));
  });
  outerBarsBox.element.addEventListener("mouseout", function () {
    scrollingBars(resetBar.bind("down"));
  });
  outerBarsBox.element.addEventListener("click", function () {
    spinningBars();

    _SideBar.SideBar.isClicked();
  });
  outerBarsBox.element.appendChild(innerStripesBox.element);
  header.element.appendChild(outerBarsBox.element);
  header.attachById("app");

  function scrollingBars(callBackToResetBar) {
    for (var j = 0; j < 3; j++) {
      setTimeout(callBackToResetBar, j * 100, j);
    }
  }

  function resetBar(j) {
    if (this === "up") {
      innerStripesBox.element.childNodes[j].style.opacity = "0.5";
      innerStripesBox.element.childNodes[j].style.transform = "translateY(-8px)";
      innerStripesBox.element.childNodes[j].style.backgroundColor = "darkBlue";
    } else if (this === "down") {
      innerStripesBox.element.childNodes[j].style.opacity = "1";
      innerStripesBox.element.childNodes[j].style.transform = "translateY(0px)";
      innerStripesBox.element.childNodes[j].style.backgroundColor = "#5a1616";
    }
  }

  function spinningBars() {
    var _loop = function _loop(j) {
      setTimeout(function () {
        innerStripesBox.element.childNodes[j].style.transform = "rotate(0.5turn)";
      }, j * 70);
    };

    for (var j = 0; j < 3; j++) {
      _loop(j);
    }
  }
};

exports.makeHeaderAndInnerComponents = makeHeaderAndInnerComponents;
},{"./HtmlElement.js":"components/HtmlElement.js","./SideBar.js":"components/SideBar.js"}],"components/pennyFarthing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PennyFarthing = void 0;

var PennyFarthing = function PennyFarthing(leftSpot, bigRotator, smallRotator) {
  var bigwheel = document.getElementById("Bigwheel");
  var smallwheel = document.getElementById("Smallwheel");
  var pennyFrame = document.getElementById('PennyFrame');

  function placeTheWheel() {
    bigwheel.style.left = leftSpot + "px";
    bigwheel.style.transform = "rotate(".concat(bigRotator, "deg)");
    smallwheel.style.left = leftSpot + 'px';
    smallwheel.style.transform = "rotate(".concat(smallRotator, "deg)");
    pennyFrame.style.left = leftSpot - 20 + 'px';
    leftSpot += 5;
    bigRotator += 3;
    smallRotator += 12;

    if (leftSpot < window.innerWidth + 100) {
      requestAnimationFrame(function () {
        PennyFarthing(leftSpot, bigRotator, smallRotator);
      });
    }
  }

  requestAnimationFrame(placeTheWheel);
};

exports.PennyFarthing = PennyFarthing;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _betterElement = require("./components/betterElement.js");

var _Header = require("./components/Header.js");

var _pennyFarthing = require("./components/pennyFarthing.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = document.getElementById("app");
var leftSpot = 0,
    bigRotator = 0,
    smallRotator = 0;

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, [{
    key: "renderBasicPage",
    value: function renderBasicPage() {
      (0, _Header.makeHeaderAndInnerComponents)();
      (0, _pennyFarthing.PennyFarthing)(leftSpot, bigRotator, smallRotator);
      codeSnippetFloatUp();
    }
  }]);

  return App;
}();

App.renderBasicPage();

function codeSnippetFloatUp() {
  var snippetDiv = document.getElementById('pennyFarthingDiv');
  (0, _betterElement.waitAndThen)(function () {
    snippetDiv.style.transform = 'translateY(15vh)';
  }, 4000);
}
},{"./components/betterElement.js":"components/betterElement.js","./components/Header.js":"components/Header.js","./components/pennyFarthing.js":"components/pennyFarthing.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60532" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calc": () => (/* binding */ calc)
/* harmony export */ });
function calc() {
  // Calculator

  const calcResult = document.querySelector(".calculating__result span"),
    calcHeight = document.querySelector("#height"),
    calcWeight = document.querySelector("#weight"),
    calcAge = document.querySelector("#age"),
    gender = document.querySelector("#gender"),
    activity = document.querySelector(".calculating__choose_big");

  let sex, weight, height, ratio, age;

  loadLocalParams();

  function getStaticParams(parentElement) {
    parentElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("calculating__choose-item")) {
        [...parentElement.children].forEach((item) =>
          item.classList.remove("calculating__choose-item_active")
        );
        e.target.classList.add("calculating__choose-item_active");

        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
        } else {
          sex = e.target.id;
        }

        calcTotal();
      }
    });
  }

  getStaticParams(activity);
  getStaticParams(gender);

  getDynamicParams(calcWeight);
  getDynamicParams(calcAge);
  getDynamicParams(calcHeight);

  function getDynamicParams(input) {
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.id) {
        case "age":
          age = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "height":
          height = +input.value;
          break;
      }
      calcTotal();
    });
  }

  calcTotal();

  function calcTotal() {
    if (!sex || !weight || !height || !ratio || !age) {
      calcResult.textContent = "____";
    } else {
      if (sex == "male") {
        calcResult.textContent = Math.round(
          (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
        );
      } else {
        calcResult.textContent = Math.round(
          (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
        );
      }
    }
    saveLocally();
  }

  function saveLocally() {
    localStorage.setItem(
      "calc",
      JSON.stringify({
        sex: sex,
        ratio: ratio,
        age: age,
        weight: weight,
        height: height,
      })
    );
  }

  function loadLocalParams() {
    if (localStorage.getItem("calc")) {
      const saved = JSON.parse(localStorage.getItem("calc"));
      sex = saved.sex;
      ratio = saved.ratio;
      age = saved.age;
      weight = saved.weight;
      height = saved.height;

      calcHeight.value = height;
      calcWeight.value = weight;
      calcAge.value = age;

      [...gender.children].forEach((item) => {
        item.classList.remove("calculating__choose-item_active");
        if (item.id === sex) {
          item.classList.add("calculating__choose-item_active");
        }
      });

      [...activity.children].forEach((item) => {
        item.classList.remove("calculating__choose-item_active");
        if (+item.getAttribute("data-ratio") === ratio) {
          item.classList.add("calculating__choose-item_active");
        }
      });
    } else {
      sex = "female";
      ratio = 1.375;
    }
  }
}


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  // Menu cards with class

  class MenuCard {
    constructor(
      { img, altimg, title, descr, price },
      parentSelector,
      ...classes
    ) {
      (this.img = img),
        (this.altimg = altimg),
        (this.title = title),
        (this.descr = descr),
        (this.price = price),
        (this.transfer = 27);
      this.parentSelector = parentSelector;
      this.classes = classes;
    }

    changeToUA() {
      this.price = this.price * this.transfer;
    }

    makeCard() {
      this.changeToUA();
      let div = document.createElement("div");
      // div.classList.add("menu__item");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        div.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => div.classList.add(className));
      }

      div.innerHTML = `
      <img src="${this.img}" alt=${this.altimg}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parentSelector.append(div);
      // return div;
    }
  }

  const cards = document.querySelector(".menu__field .container");

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)("http://localhost:3000/menu").then((data) => {
    data.forEach((item) => new MenuCard(item, cards).makeCard());
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forms": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(modalSelector, modalTimerId) {
  // Forms

  const forms = document.querySelectorAll("form"),
    modal = document.querySelector(modalSelector);

  const messages = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((formItem) => bindPostData(formItem));

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      // console.log(obj);

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", JSON.stringify(obj))
        .then((request) => {
          console.log(request);
          showThanksModal(messages.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(messages.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector, modalTimerId);
    modal.classList.add("show"); // класс использует toggle, поэтому при открытии окна show добавляется, а при отправке снимается. Добавляем принудительно

    const newModal = document.createElement("div");
    newModal.classList.add("modal__dialog");
    newModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${msg}</div>
      </div>
    `;

    modal.append(newModal);

    setTimeout(() => {
      newModal.remove();
      // prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      // modal.classList.add("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
      modal.classList.remove("show"); // если закрыть окно до истечения 4сек, то из-за toggle класс show добавляется на предыдущем шаге, поэтому удаляем его принудительно
    }, 4000);
  }
}


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal
  const modalBtns = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    // modalClose = document.querySelector("[data-close]"),
    modalContent = document.querySelector(".modal__content");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // modal.classList.add("show");
      // modal.classList.remove("hide");
      // modal.classList.toggle("show");
      // // modal.style.display = "block";
      // document.body.style.overflow = "hidden";
      showModal(modalSelector, modalTimerId);
    });
  });

  // modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    // console.dir(e.target);
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      // modal.classList.toggle("show");
      // document.body.style.overflow = "visible";
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  const doc = document.documentElement;

  function showModalOnBottom() {
    let scrollBottom = doc.scrollHeight - doc.scrollTop - doc.clientHeight;
    if (scrollBottom < 1) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalOnBottom);
    }
  }

  window.addEventListener("scroll", showModalOnBottom);
}

function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle("show");
  document.body.style.overflow = "hidden";
  hideScroll();
  // window.innerWidth - document.documentElement.offsetWidth + "px";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.toggle("show");
  showScroll();
}

function hideScroll() {
  const div = document.createElement("div");
  div.style.cssText = `
    overflow: scroll;
    width: 50px;
    height: 50px;
  `;
  document.body.append(div);

  document.body.style.paddingRight = div.offsetWidth - div.clientWidth + "px";

  div.remove();
}

function showScroll() {
  document.body.style.paddingRight = "";
  document.body.style.overflow = "visible";
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slider": () => (/* binding */ slider)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // Slider

  let slideIndex = 0;

  const nextSlide = document.querySelector(nextArrow),
    prevSlide = document.querySelector(prevArrow),
    sliderImages = document.querySelectorAll(slide),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWraper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    slider = document.querySelector(container),
    slidesWidth = window.getComputedStyle(slidesWraper).width;

  let offset = 0;

  total.textContent =
    sliderImages.length < 10
      ? `0${sliderImages.length}`
      : `${sliderImages.length}`;

  slidesField.style.width = 100 * sliderImages.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWraper.style.overflow = "hidden";

  sliderImages.forEach((slide) => {
    slide.style.width = slidesWidth;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add(".carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < sliderImages.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == slideIndex) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  changeCurrent();

  nextSlide.addEventListener("click", () => {
    if (offset == parseInt(slidesWidth) * (sliderImages.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    ++slideIndex === sliderImages.length ? (slideIndex = 0) : slideIndex;
    changeCurrent();
  });

  prevSlide.addEventListener("click", () => {
    if (offset == 0) {
      offset = parseInt(slidesWidth) * (sliderImages.length - 1);
    } else {
      offset -= parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    --slideIndex === -1 ? (slideIndex = sliderImages.length - 1) : slideIndex;
    changeCurrent();
  });

  function changeCurrent() {
    current.textContent =
      slideIndex < 9 ? `0${slideIndex + 1}` : `${slideIndex + 1}`;

    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[slideIndex].style.opacity = 1;
  }

  indicators.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      slideIndex = +e.target.dataset.slideTo - 1;

      changeCurrent();

      offset = parseInt(slidesWidth) * (+e.target.dataset.slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
    }
  });
}


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  // Tabs
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      //   item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = "block";
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");

    tabs[i].classList.add(activeClass);
  }

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (e.target.tagName == "DIV") {
      // if (e.target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (tab == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(promoDate) {
  // Timer
  const today = new Date();
  // const promoDate = new Date("2021-01-29T19:35:00");
  // const promoDate = today.getTime() + 95100;
  // const promoDate = "2020-03-17";

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  function setPromotionDescription(t) {
    const descr = document.querySelector(".promotion__descr"),
      date = new Date(t);

    descr.childNodes[5].textContent = `Акция закончится ${date.getDate()} ${
      months[date.getMonth()]
    } в ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
  }

  setPromotionDescription(promoDate);

  function getTimeRemaining(t) {
    const diffTime = t - new Date();

    const date = Math.floor(diffTime / (1000 * 60 * 60 * 24)),
      hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24),
      minuts = Math.floor((diffTime / 1000 / 60) % 60),
      seconds = Math.floor((diffTime / 1000) % 60);

    // const date = new Date(diffTime).getDate(),
    //   hours = new Date(diffTime).getHours(),
    //   minuts = new Date(diffTime).getMinutes(),
    //   seconds = new Date(diffTime).getSeconds();

    return {
      total: diffTime,
      days: date,
      hours: hours,
      minuts: minuts,
      seconds: seconds,
    };
  }

  function startTimer(t) {
    const days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    const date = new Date(t);

    if (date.getTime() - new Date() < 0) {
      updateClock(1);
      return;
    }

    updateClock();

    function updateClock(off = 0) {
      if (off) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
      }
      const promoEndTime = getTimeRemaining(date);

      if (promoEndTime.total <= 0) {
        clearInterval(timeInterval);
        return;
      }

      days.textContent = getZero(promoEndTime.days);
      hours.textContent = getZero(promoEndTime.hours);
      minutes.textContent = getZero(promoEndTime.minuts);
      seconds.textContent = getZero(promoEndTime.seconds);
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  startTimer(promoDate);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









document.addEventListener("DOMContentLoaded", () => {
  let modalTimerId;
  modalTimerId = setTimeout(() => {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.showModal)(".modal", modalTimerId);
  }, 5000);

  const today = new Date();

  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.calc)();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.forms)(".modal", modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)("[data-modal]", ".modal", modalTimerId);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__.default)(today.getTime() + 95100);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.slider)({
    container: ".offer__slider",
    currentCounter: "#current",
    field: ".offer__slider-inner",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    wrapper: ".offer__slider-wrapper",
  });
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourse": () => (/* binding */ getResourse)
/* harmony export */ });
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-type": "application/json" },
  });

  return await res.json();
}

async function getResourse(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch, status: ${res.status}`);
  }

  return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map
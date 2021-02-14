import { calc as calculator } from "./modules/calc";
import cards from "./modules/cards";
import modal from "./modules/modal";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { forms } from "./modules/forms";
import { slider } from "./modules/slider";
import { showModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
  let modalTimerId;
  modalTimerId = setTimeout(() => {
    showModal(".modal", modalTimerId);
  }, 5000);

  const today = new Date();

  calculator();
  cards();
  forms(".modal", modalTimerId);
  modal("[data-modal]", ".modal", modalTimerId);
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(today.getTime() + 95100);
  slider({
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

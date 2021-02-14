import { getResourse } from "../services/services";

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

  getResourse("http://localhost:3000/menu").then((data) => {
    data.forEach((item) => new MenuCard(item, cards).makeCard());
  });
}

export default cards;

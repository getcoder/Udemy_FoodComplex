document.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      //   item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = "block";
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");

    tabs[i].classList.add("tabheader__item_active");
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

  // Timer
  const today = new Date();
  // const promoDate = new Date("2021-01-29T19:35:00");
  const promoDate = today.getTime() + 95100;
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

  // Modal
  const modalBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]"),
    modalContent = document.querySelector(".modal__content");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // modal.classList.add("show");
      // modal.classList.remove("hide");
      // modal.classList.toggle("show");
      // // modal.style.display = "block";
      // document.body.style.overflow = "hidden";
      showModal();
    });
  });

  function showModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";

    document.body.style.paddingRight =
      modalContent.offsetWidth - modalContent.clientWidth + "px";

    if (modalTimerId) {
      clearInterval(modalTimerId);
    }
  }

  function closeModal() {
    document.body.style.paddingRight = "";
    modal.classList.toggle("show");
    document.body.style.overflow = "visible";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      // modal.classList.toggle("show");
      // document.body.style.overflow = "visible";
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  let modalTimerId;
  modalTimerId = setTimeout(showModal, 5000);

  const doc = document.documentElement;

  function showModalOnBottom() {
    let scrollBottom = doc.scrollHeight - doc.scrollTop - doc.clientHeight;
    if (scrollBottom < 1) {
      showModal();
      window.removeEventListener("scroll", showModalOnBottom);
    }
  }

  window.addEventListener("scroll", showModalOnBottom);

  // Menu cards with class

  class MenuCard {
    constructor(card, parentSelector, ...classes) {
      (this.img = card.img),
        (this.alt = card.alt),
        (this.title = card.title),
        (this.text = card.text),
        (this.price = card.price),
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
      <img src="${this.img}" alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.text}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.parentSelector.append(div);
      // return div;
    }
  }

  cardVegy = {
    img: "img/tabs/vegy.jpg",
    alt: "vegy",
    title: 'Меню "Фитнес"',
    text:
      "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    price: 9,
  };

  cardElite = {
    img: "img/tabs/elite.jpg",
    alt: "elite",
    title: "Меню “Премиум”",
    text:
      "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    price: 21,
  };

  cardPost = {
    img: "img/tabs/post.jpg",
    alt: "post",
    title: 'Меню "Постное"',
    text:
      "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    price: 14,
  };

  const cards = document.querySelector(".menu__field .container");

  const newCard = new MenuCard(cardVegy, cards, "menu__item", "big");
  newCard.makeCard();

  new MenuCard(cardElite, cards, "menu__item").makeCard();

  new MenuCard(cardPost, cards).makeCard();

  // Forms

  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((formItem) => postData(formItem));

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = messages.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      // Первый вариант без JSON:
      // request.setRequestHeader("Content-type", "multipart/form-data"); // в связке XMLHttpRequest и POST заголовки устанавливать не нужно
      //  const formData = new FormData(form);
      // request.send(formData);

      // Второй вариант с JSON:
      request.setRequestHeader("Content-type", "application/json");

      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      // console.log(obj);
      const json = JSON.stringify(obj);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status >= 200 && request.status < 300) {
          console.log(request.response);
          statusMessage.textContent = messages.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = messages.failure;
        }
      });
    });
  }

  console.log();
});

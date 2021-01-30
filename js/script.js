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

    updateClock();

    function updateClock() {
      const promoEndTime = getTimeRemaining(t);

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

  console.log();
});

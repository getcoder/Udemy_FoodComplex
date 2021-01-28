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
  const promoDate = today.getTime() + 95000;

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

    const date = Math.round(diffTime / (1000 * 60 * 60 * 24)),
      hours = Math.round((diffTime / (1000 * 60 * 60)) % 24),
      minuts = Math.round((diffTime / 1000 / 60) % 60),
      seconds = Math.round((diffTime / 1000) % 60);

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

      days.textContent = getZero(promoEndTime.days);
      hours.textContent = getZero(promoEndTime.hours);
      minutes.textContent = getZero(promoEndTime.minuts);
      seconds.textContent = getZero(promoEndTime.seconds);

      if (promoEndTime.total <= 0) {
        clearInterval(timeInterval);
      }
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
    modalClose = document.querySelector("[data-close]");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // modal.classList.add("show");
      // modal.classList.remove("hide");
      modal.classList.toggle("show");
      // modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
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

  console.log();
});

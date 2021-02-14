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

export default timer;

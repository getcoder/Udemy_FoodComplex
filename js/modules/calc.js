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

module.exports = calc;

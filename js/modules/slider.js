function slider() {
  // Slider

  const sliderImages = document.querySelectorAll(".offer__slide");

  let slideIndex = 0;

  const nextSlide = document.querySelector(".offer__slider-next"),
    prevSlide = document.querySelector(".offer__slider-prev"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWraper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    slider = document.querySelector(".offer__slider"),
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

module.exports = slider;

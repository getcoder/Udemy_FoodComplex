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

export function showModal(modalSelector, modalTimerId) {
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

export default modal;

export { closeModal };

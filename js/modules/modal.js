function modal() {
  // Modal
  const modalBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    // modalClose = document.querySelector("[data-close]"),
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
    hideScroll();
    // window.innerWidth - document.documentElement.offsetWidth + "px";

    if (modalTimerId) {
      clearInterval(modalTimerId);
    }
  }

  function closeModal() {
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

  // modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    // console.dir(e.target);
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
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
}

module.exports = modal;

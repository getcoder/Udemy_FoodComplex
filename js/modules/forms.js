function forms() {
  // Forms

  const forms = document.querySelectorAll("form");

  const messages = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((formItem) => bindPostData(formItem));

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json" },
    });

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      // console.log(obj);

      postData("http://localhost:3000/requests", JSON.stringify(obj))
        .then((request) => {
          console.log(request);
          showThanksModal(messages.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(messages.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(msg) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");

    showModal();
    modal.classList.add("show"); // класс использует toggle, поэтому при открытии окна show добавляется, а при отправке снимается. Добавляем принудительно

    const newModal = document.createElement("div");
    newModal.classList.add("modal__dialog");
    newModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${msg}</div>
    </div>
    `;

    modal.append(newModal);

    setTimeout(() => {
      newModal.remove();
      // prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      // modal.classList.add("hide");
      closeModal();
      modal.classList.remove("show"); // если закрыть окно до истечения 4сек, то из-за toggle класс show добавляется на предыдущем шаге, поэтому удаляем его принудительно
    }, 4000);
  }
}

module.exports = forms;

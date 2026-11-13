// Находим окно, кнопки и скрытое поле товара.
const orderDialog = document.getElementById("order-dialog");
const orderButtons = document.querySelectorAll(".product-card__button");
const closeDialogButton = document.getElementById("close-order-dialog");
const selectedProductInput = document.getElementById("selected-product");

// При нажатии записываем товар и открываем форму.
orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    selectedProductInput.value = productName;
    orderDialog.showModal();
  });
});

if (closeDialogButton) {
  closeDialogButton.addEventListener("click", () => {
    orderDialog.close();
  });
}

const orderForm = document.getElementById("order-form");
const successMessage = document.getElementById("success-message");

orderForm.addEventListener("submit", (event) => {
  // Отменяем отправку на сервер, так как backend пока нет.
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);

  // Убираем отметки ошибок от прошлой проверки.
  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute("aria-invalid");
    }
  });

  // Проверяем ограничения, указанные в HTML.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute("aria-invalid", "true");
      }
    });

    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение, очищаем форму и закрываем окно.
  successMessage.hidden = false;
  orderForm.reset();
  if (orderDialog) {
    orderDialog.close();
  }
});

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

const formErrors = document.getElementById("form-errors");
const formErrorsList = document.getElementById("form-errors-list");

// Показываем понятный список ошибок со ссылками на поля.
function updateFormErrors() {
  formErrorsList.replaceChildren();
  Array.from(orderForm.elements).forEach((field) => {
    if (!field.willValidate) return;
    field.removeAttribute("aria-invalid");
    if (!field.validity.valid) {
      field.setAttribute("aria-invalid", "true");
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + field.id;
      link.textContent = field.labels[0].textContent.trim() + ": " + field.validationMessage;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        field.focus();
      });
      item.append(link);
      formErrorsList.append(item);
    }
  });
  formErrors.hidden = formErrorsList.children.length === 0;
  return formErrors.hidden;
}

// После первой проверки убираем исправленные ошибки при вводе.
orderForm.addEventListener("input", () => {
  if (!formErrors.hidden) updateFormErrors();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.hidden = true;
  if (!updateFormErrors()) {
    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;
  orderForm.reset();
  if (orderDialog) {
    orderDialog.close();
  }
});

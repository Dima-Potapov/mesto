// Данные для валидации формы редактирвоания профиля
const dataForValidProfileFormObject = {
  formSelector: '#edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
};

// Данные для валидации формы добавления карточки
const dataForValidAddCartFormObject = {
  formSelector: '#add',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
};

// Запуск валидации формы
function enableValidation(formData) {
  const listInput = getInputList(formData);

  listInput.forEach((input) => {
    input.addEventListener('input', () => {
      let validStatus = validateAndManageErrorInput(input, formData);

      if (!validStatus) {
        disableButton(formData);
      } else {
        const isValid = validateForm(listInput, formData);

        if (isValid) {
          enableButton(formData);
        }
      }
    })
  })
}

// Валидация формы полностью
function validateForm(listInput, formData) {
  let isValid = listInput.reduce((isValidForm, input) => {
    if (!input.validity.valid) {
      isValidForm = false;
    }

    return isValidForm;
  }, true);

  return isValid;
}

// Валидирует полем ввода и управляет ошибкой
function validateAndManageErrorInput(element, formData) {
  const errorElement = getErrorElement(element.id);

  if(!element.validity.valid){
    showError(errorElement, element, formData.inputErrorClass);

    return false;
  }

  clearError(errorElement, element, formData.inputErrorClass);

  return true;
}

// Показывает ошибку
function showError(errorElement, element, inputErrorClass) {
  errorElement.textContent = element.validationMessage;
  element.classList.add(inputErrorClass);
}

// Очищает ошибку
function clearError(errorElement, element, inputErrorClass) {
  errorElement.textContent = '';
  element.classList.remove(inputErrorClass);
}

// Перезугрузка ошибок и формы
function resetErrorsAndForm(formData) {
  const form = getForm(formData.formSelector);
  const listInput = getInputList(formData);

  form.reset();

  listInput.forEach((input) => {
    clearError(getErrorElement(input.id), input, formData.inputErrorClass);
  })
}

// Блокирует кнопку submit
function disableButton(formData) {
  const form = getForm(formData.formSelector);
  const submitButton = getSubmitButton(form, formData.submitButtonSelector);

  submitButton.classList.add(formData.inactiveButtonClass);
  submitButton.disabled = true;
}

// Активация кнопки submit
function enableButton(formData) {
  const form = getForm(formData.formSelector);
  const submitButton = getSubmitButton(form, formData.submitButtonSelector);

  submitButton.classList.remove(formData.inactiveButtonClass);
  submitButton.disabled = false;
}

// Получение элемента ошибки
function getErrorElement(idInput) {
  const errorElement = document.querySelector(`#${idInput}-error`);

  return errorElement;
}

// Получение массива с полями ввода конкретной формы
function getInputList(formData) {
  const form = getForm(formData.formSelector);
  const listInput = Array.from(form.querySelectorAll(formData.inputSelector));

  return listInput;
}

// Запуск валидции форм
enableValidation(dataForValidProfileFormObject);
enableValidation(dataForValidAddCartFormObject);

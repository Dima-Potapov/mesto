// Данные для валидации формы редактирвоания профиля
const validConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
};

// Запуск валидации формы
function enableValidation(validConfig) {
  const arrayForms = Array.from(document.querySelectorAll(validConfig.formSelector));

  arrayForms.forEach((form) => {
    const listInput = getInputList(form, validConfig);

    listInput.forEach((input) => {
      input.addEventListener('input', () => {
        let validStatus = validateAndManageErrorInput(input, validConfig);

        if (!validStatus) {
          disableButton(form, validConfig);
        } else {
          const isValid = validateForm(listInput);

          if (isValid) {
            enableButton(form, validConfig);
          }
        }
      })
    })
  })
}

// Валидация формы полностью
function validateForm(listInput) {
  let isValid = listInput.reduce((isValidForm, input) => {
    if (!input.validity.valid) {
      isValidForm = false;
    }

    return isValidForm;
  }, true);

  return isValid;
}

// Валидирует полем ввода и управляет ошибкой
function validateAndManageErrorInput(element, validConfig) {
  const errorElement = getErrorElement(element.id);

  if(!element.validity.valid){
    showError(errorElement, element, validConfig);

    return false;
  }

  clearError(errorElement, element, validConfig.inputErrorClass);

  return true;
}

// Показывает ошибку
function showError(errorElement, element, validConfig) {
  errorElement.textContent = element.validationMessage;
  element.classList.add(validConfig.inputErrorClass);
}

// Очищает ошибку
function clearError(errorElement, element, inputErrorClass) {
  errorElement.textContent = '';
  element.classList.remove(inputErrorClass);
}

// Перезугрузка ошибок и формы
function resetErrorsAndForm(form, validConfig) {
  const listInput = getInputList(form, validConfig);

  form.reset();

  listInput.forEach((input) => {
    clearError(getErrorElement(input.id), input, validConfig.inputErrorClass);
  })
}

// Блокирует кнопку submit
function disableButton(form, validConfig) {
  const submitButton = getSubmitButton(form, validConfig.submitButtonSelector);

  submitButton.classList.add(validConfig.inactiveButtonClass);
  submitButton.disabled = true;
}

// Активация кнопки submit
function enableButton(form, validConfig) {
  const submitButton = getSubmitButton(form, validConfig.submitButtonSelector);

  submitButton.classList.remove(validConfig.inactiveButtonClass);
  submitButton.disabled = false;
}

// Получение элемента ошибки
function getErrorElement(idInput) {
  const errorElement = document.querySelector(`#${idInput}-error`);

  return errorElement;
}

// Получение массива с полями ввода конкретной формы
function getInputList(form, validConfig) {
  const listInput = Array.from(form.querySelectorAll(validConfig.inputSelector));

  return listInput;
}

// Запуск валидции форм
enableValidation(validConfig);

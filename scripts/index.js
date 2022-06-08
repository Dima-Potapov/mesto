import {Card} from "./Card.js";
import {initialCards} from "./data.js";
import {FormValidator} from "./FormValidator.js";

const buttonOpenEditProfile = document.querySelector('.profile__edit');
const buttonOpenAddCard = document.querySelector('.profile__button');

const popupEditProfile = document.querySelector('#edit-profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');

const popupEditProfileCloseButton = document.querySelector('#close-edit-profile');
const popupAddCardCloseButton = document.querySelector('#close-add-card');
const popupShowImageCloseButton = document.querySelector('#close-show-image');

const popupEditProfileForm = document.querySelector('#edit');
const popupAddCardForm = document.querySelector('#add');
const cardsContainer = document.querySelector('.elements');

const nameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

const imageNameInput = document.querySelector('#new-image-name');
const imageLinkInput = document.querySelector('#new-image-link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const arrayForms = [
  popupEditProfileForm,
  popupAddCardForm,
]

const validConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
};


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

// Отображение формы изменения профиля
function openPopup (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', handleKeydownClosePopup);
  popup.addEventListener('click', handleClosePopupFormOverlay);
}

// Скрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  const form = popup.querySelector('form');

  if (form && form.id === 'edit') {
    resetErrorsAndForm(form, validConfig);
  }

  document.removeEventListener('keydown', handleKeydownClosePopup);
  popup.removeEventListener('click', handleClosePopupFormOverlay);
}

// Изменяет данные профиля и закрывает форму
function handleProfileFormSubmit() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
}

// Добоавляет карточку, чистит и закрывает форму
function handleAddCardFormSubmit () {
  const cardObject = new Card(
      imageNameInput.value,
      imageLinkInput.value,
      '#template-card'
  )

  cardsContainer.append(cardObject.generateCard());
}

// Получение submit по селектору и формы
function getSubmitButton(form, submitButtonSelector) {
  const submitButton = form.querySelector(submitButtonSelector);

  return submitButton;
}

// Получение открытых popup форм
function getOpenPopup() {
  const formPopup = document.querySelector('.popup_opened');

  return formPopup;
}

function getForm(formSelector) {
  const form = document.querySelector(formSelector);

  return form;
}


const handleKeydownClosePopup = (event) => {
  if (event.code === 'Escape') {
    const openPopup = getOpenPopup();

    closePopup(openPopup);
  }
}

// Закрывает popup форму
const handleClosePopupFormOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

// Слушатели для отображения форм
buttonOpenEditProfile.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);
});

buttonOpenAddCard.addEventListener('click', (event) => {
  const form = getForm('#add');
  const inputList = getInputList(form, validConfig)

  if (!validateForm(inputList)) {
    disableButton(form, validConfig);
  }
  
   openPopup(popupAddCard);
});


// Слушатели для скрытия форм
popupEditProfileCloseButton.addEventListener('click', (event) => {
  event.stopPropagation();

  const form = getForm('#edit');

  closePopup(popupEditProfile);
  resetErrorsAndForm(form, validConfig);
});

popupAddCardCloseButton.addEventListener('click', (event) => {
  event.stopPropagation();

  closePopup(popupAddCard);
});


// Слушатели на изменение данных профиля
popupEditProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleProfileFormSubmit();

  closePopup(popupEditProfile);
  resetErrorsAndForm(event.currentTarget, validConfig);
  enableButton(event.currentTarget, validConfig);
});

// Слушатели на добавление карточки
popupAddCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleAddCardFormSubmit();

  closePopup(popupAddCard);
  resetErrorsAndForm(event.currentTarget, validConfig);
  disableButton(event.currentTarget, validConfig);
});


// Проходит по массиву и добавляет карточки при первом выполнении скрипта
initialCards.forEach((item) => {
  const cardObject = new Card(
      item.name,
      item.link,
      '#template-card'
      )

  cardsContainer.append(cardObject.generateCard());
});

// Запуск валидции форм
arrayForms.forEach((item) => {
  const formValidate = new FormValidator(
      validConfig,
      item
  )

  formValidate.enableValidation();
})



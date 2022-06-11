import { Card } from "./Card.js";
import { initialCards } from "./data.js";
import { FormValidator } from "./FormValidator.js";

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
const popupShowCard = document.querySelector('#show-image-popup');

const nameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

const imageNameInput = document.querySelector('#new-image-name');
const imageLinkInput = document.querySelector('#new-image-link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const validConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorElementSelector: '.popup__form-error',
};

let formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    let validator;
    const formName = formElement.getAttribute('name');

    if (formElement.getAttribute('name') === 'add') {
      validator = new FormValidator(config, formElement, false);
    } else {
      validator = new FormValidator(config, formElement);
    }

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validConfig);

// Отображение формы изменения профиля
function openPopup (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', handleKeydownClosePopup);
  popup.addEventListener('click', handleClosePopupFormOverlay);
}

// Скрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');

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
  const cardObject = createCard(
      imageNameInput.value,
      imageLinkInput.value
  )

  cardsContainer.prepend(cardObject);
}

// Получение открытых popup форм
function getOpenPopup() {
  const formPopup = document.querySelector('.popup_opened');

  return formPopup;
}

function handleCardClick(name, link) {
  const imagePopup = popupShowCard.querySelector('img');
  const figcaptionPopup = popupShowCard.querySelector('figcaption');

  imagePopup.src = link;
  imagePopup.alt = name;
  figcaptionPopup.textContent = name;

  openPopup(popupShowCard);
}

function createCard(name, link){
  const cardObject = new Card(
      name,
      link,
      '#template-card',
      handleCardClick
  )

  return cardObject.generateCard();
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

  formValidators[popupEditProfileForm.getAttribute('name')].resetValidation();

  openPopup(popupEditProfile);
});

buttonOpenAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();

  formValidators[popupAddCardForm.getAttribute('name')].resetValidation();
  
   openPopup(popupAddCard);
});


// Слушатели для скрытия форм
popupEditProfileCloseButton.addEventListener('click', (event) => {
  event.stopPropagation();

  closePopup(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', (event) => {
  event.stopPropagation();

  closePopup(popupAddCard);
});

popupShowImageCloseButton.addEventListener('click', (event) => {
  event.stopPropagation();

  closePopup(popupShowCard);
});

// Слушатели на изменение данных профиля
popupEditProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleProfileFormSubmit();

  closePopup(popupEditProfile);
});

// Слушатели на добавление карточки
popupAddCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleAddCardFormSubmit();

  closePopup(popupAddCard);
});


// Проходит по массиву и добавляет карточки при первом выполнении скрипта
initialCards.forEach((item) => {
  const cardObject = createCard(item.name, item.link);

  cardsContainer.prepend(cardObject);
});
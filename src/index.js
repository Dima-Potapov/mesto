import { Card } from "./scripts/Card.js";
import { initialCards } from "./scripts/data.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import './pages/index.css';

const buttonOpenEditProfile = document.querySelector('.profile__edit');
const buttonOpenAddCard = document.querySelector('.profile__button');

const popupEditProfileForm = document.querySelector('#edit');
const popupAddCardForm = document.querySelector('#add');

const nameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

const imageNameInput = document.querySelector('#new-image-name');
const imageLinkInput = document.querySelector('#new-image-link');

const validConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorElementSelector: '.popup__form-error',
};

const formValidators = {};

function createCard({
    name,
    link
}){
  const cardObject = new Card(
      name,
      link,
      '#template-card',
      handleCardClick
  )

  return cardObject.generateCard();
}

const sectionObject = new Section({
      items: initialCards,
      renderer: createCard
    },
    '.elements'
)

sectionObject.renderElements();


const popupImageObject = new PopupWithImage('#show-image-popup');
popupImageObject.setEventListeners();


const popupEditProfileObject = new PopupWithForm(
    '#edit-profile-popup',
    handleProfileFormSubmit
)
popupEditProfileObject.setEventListeners();


const popupAddCardObject = new PopupWithForm(
    '#add-card-popup',
    handleAddCardFormSubmit
)
popupAddCardObject.setEventListeners();

const userInfoObject = new UserInfo({
    nameSelector: '.profile__title',
    descriptionSelector: '.profile__subtitle'
});

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const formName = formElement.getAttribute('name'),
        validator = new FormValidator(config, formElement);

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validConfig);

// Изменяет данные профиля и закрывает форму
function handleProfileFormSubmit() {
  const data = popupEditProfileObject._getInputValues();

  userInfoObject.setUserInfo({
      name: data.name,
      description: data.description
  })
}

// Добоавляет карточку, чистит и закрывает форму
function handleAddCardFormSubmit () {
  const cardObject = createCard(
      {
        name: imageNameInput.value,
        link: imageLinkInput.value
      }
  )

  sectionObject.addItem(cardObject)
}

function handleCardClick(name, link) {
  popupImageObject.open(link, name);
}

// Слушатели для отображения форм
buttonOpenEditProfile.addEventListener('click',() => {
  const userInfo = userInfoObject.getUserInfo();

  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;

  formValidators[popupEditProfileForm.getAttribute('name')].resetValidation();

  popupEditProfileObject.open();
});

buttonOpenAddCard.addEventListener('click', () => {
  popupAddCardForm.reset();

  formValidators[popupAddCardForm.getAttribute('name')].resetValidation();

  popupAddCardObject.open();
});
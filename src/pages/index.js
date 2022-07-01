import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import {
  buttonOpenEditProfile, 
  buttonOpenAddCard,
  popupEditProfileForm,
  popupAddCardForm,
  nameInput,
  descriptionInput,
  imageNameInput,
  imageLinkInput,
  validConfig,
  formValidators,
  sectionObject,
  popupImageObject,
  popupEditProfileObject,
  popupAddCardObject,
  userInfoObject
} from "../utils/constants.js";

import './pages/index.css';


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


sectionObject.renderElements();
popupImageObject.setEventListeners();
popupEditProfileObject.setEventListeners();
popupAddCardObject.setEventListeners();

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
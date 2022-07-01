import { Card } from "../components/Card.js";

import {
  buttonOpenEditProfile, 
  buttonOpenAddCard,
  popupEditProfileForm,
  popupAddCardForm,
  nameInput,
  descriptionInput,
  validConfig,
  formValidators,
  sectionObject,
  popupImageObject,
  popupEditProfileObject,
  popupAddCardObject,
  userInfoObject,
  enableValidation
} from "../utils/constants.js";

import './index.css';


sectionObject.renderElements();
popupImageObject.setEventListeners();
popupEditProfileObject.setEventListeners();
popupAddCardObject.setEventListeners();

enableValidation(validConfig);

// Слушатели для отображения форм
buttonOpenEditProfile.addEventListener('click',() => {
  const userInfo = userInfoObject.getUserInfo();

  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;

  formValidators[popupEditProfileForm.getAttribute('name')].resetValidation();

  popupEditProfileObject.open();
});

buttonOpenAddCard.addEventListener('click', () => {
  formValidators[popupAddCardForm.getAttribute('name')].resetValidation();

  popupAddCardObject.open();
});
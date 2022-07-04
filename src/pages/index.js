import { Card } from "../components/Card.js";

import {
  buttonOpenEditProfile, 
  buttonOpenAddCard,
  popupEditProfileForm,
  popupAddCardForm,
  nameInput,
  descriptionInput,
  validConfig,
  formValidators
} from "../utils/constants.js";

import './index.css';
import { Section } from "../components/Section";
import { initialCards } from "../utils/data";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";

const handleCardClick = (name, link) => {
      popupImageObject.open(link, name);
    },

    popupImageObject = new PopupWithImage('#show-image-popup'),

    createCard = ({
                name,
                link
              }) => {
      const cardObject = new Card(
          name,
          link,
          '#template-card',
          handleCardClick
      );

      return cardObject.generateCard();
    },

    sectionObject = new Section({
          items: initialCards,
          renderer: createCard
        },
        '.elements'
    ),    

    handleProfileFormSubmit = () => {
      const data = popupEditProfileObject.getInputValues();

      userInfoObject.setUserInfo({
        name: data.name,
        description: data.description
      })
    },

    popupEditProfileObject = new PopupWithForm(
        '#edit-profile-popup',
        handleProfileFormSubmit
    ),

    handleAddCardFormSubmit = () => {
      const data = popupAddCardObject.getInputValues();

      sectionObject.addItem({
          name: data.name,
          link: data.link
      })
    },

    popupAddCardObject = new PopupWithForm(
        '#add-card-popup',
        handleAddCardFormSubmit
    ),

    userInfoObject = new UserInfo({
      nameSelector: '.profile__title',
      descriptionSelector: '.profile__subtitle'
    }),

    enableValidation = (config) => {
      const formList = Array.from(document.querySelectorAll(config.formSelector));

      formList.forEach((formElement) => {
        const formName = formElement.getAttribute('name'),
            validator = new FormValidator(config, formElement);

        formValidators[formName] = validator;
        validator.enableValidation();
      });
    };

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
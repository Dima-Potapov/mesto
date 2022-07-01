import { initialCards } from "./data.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";

export const buttonOpenEditProfile = document.querySelector('.profile__edit'),
    buttonOpenAddCard = document.querySelector('.profile__button'),

    popupEditProfileForm = document.querySelector('#edit'),
    popupAddCardForm = document.querySelector('#add'),

    nameInput = document.querySelector('#username'),
    descriptionInput = document.querySelector('#description'),

    imageNameInput = document.querySelector('#new-image-name'),
    imageLinkInput = document.querySelector('#new-image-link'),

    validConfig = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_inactive',
        inputErrorClass: 'popup__input_error',
        errorElementSelector: '.popup__form-error',
    },

    formValidators = {},

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

    popupImageObject = new PopupWithImage('#show-image-popup'),

    handleProfileFormSubmit = () => {
        const data = popupEditProfileObject.listInputValues();
      
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
        const data = popupAddCardForm.listInputValues();
        const cardObject = createCard(
            {
              name: data.name,
              link: data.link
            }
        )
      
        sectionObject.addItem(cardObject)
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
    },

    handleCardClick = (name, link) => {
        popupImageObject.open(link, name);
    };
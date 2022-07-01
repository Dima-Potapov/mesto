import { initialCards } from "../components/data.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

    sectionObject = new Section({
        items: initialCards,
        renderer: createCard
      },
      '.elements'
    ),

    popupImageObject = new PopupWithImage('#show-image-popup'),

    popupEditProfileObject = new PopupWithForm(
        '#edit-profile-popup',
        handleProfileFormSubmit
    ),

    popupAddCardObject = new PopupWithForm(
        '#add-card-popup',
        handleAddCardFormSubmit
    ),

    userInfoObject = new UserInfo({
        nameSelector: '.profile__title',
        descriptionSelector: '.profile__subtitle'
    });
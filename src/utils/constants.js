export const buttonOpenEditProfile = document.querySelector('.profile__edit'),
    buttonOpenAddCard = document.querySelector('.profile__button'),
    buttonOpenEditAvatar = document.querySelector('.profile__photo-edit'),

    popupEditProfileForm = document.querySelector('#edit'),
    popupAddCardForm = document.querySelector('#add'),
    popupWithConfirmationForm = document.querySelector('#question'),
    popupEditAvatarForm = document.querySelector('#edit-image'),

    nameInput = document.querySelector('#username'),
    aboutInput = document.querySelector('#about'),

    validConfig = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_inactive',
        inputErrorClass: 'popup__input_error',
        errorElementSelector: '.popup__form-error',
    },

    formValidators = {};

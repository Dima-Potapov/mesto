export const buttonOpenEditProfile = document.querySelector('.profile__edit'),
    buttonOpenAddCard = document.querySelector('.profile__button'),

    popupEditProfileForm = document.querySelector('#edit'),
    popupAddCardForm = document.querySelector('#add'),

    nameInput = document.querySelector('#username'),
    descriptionInput = document.querySelector('#description'),

    validConfig = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_inactive',
        inputErrorClass: 'popup__input_error',
        errorElementSelector: '.popup__form-error',
    },

    formValidators = {};
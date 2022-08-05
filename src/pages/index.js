import { Card } from "../components/Card";

import {
    buttonOpenEditProfile,
    buttonOpenAddCard,
    popupEditProfileForm,
    popupAddCardForm,
    nameInput,
    aboutInput,
    validConfig,
    formValidators,
    popupWithConfirmationForm,
    popupEditAvatarForm,
    buttonOpenEditAvatar
} from "../utils/constants";

import './index.css';
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";
import { Api } from "../components/Api";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";

const handleCardClick = (name, link) => {
      popupImageObject.open(link, name);
    },

    api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
        headers: {
            authorization: 'ddc5064b-058d-444c-8673-a2e9659c5a78'
        }
    }),

    handleAddLikeCard = (event) => {
        const heartElement = event.target;
        const likeElement = heartElement.nextElementSibling
        const classListArray = Array.from(heartElement.classList);
        const idCard = heartElement.closest('.card').id;

        if (classListArray.includes('card__heart_active')) {
            api.deleteLikeCard(idCard)
                .then(res => {
                    heartElement.classList.toggle('card__heart_active');

                    likeElement.textContent = res.likes.length;
                });
        } else {
            api.addLikeCard(idCard)
                .then(res => {
                    heartElement.classList.toggle('card__heart_active');

                    likeElement.textContent = res.likes.length;
                });
        }
    },

    handleProfileFormSubmit = () => {
        const data = popupEditProfileObject.getInputValues();
        const submitButton = popupEditProfileForm.querySelector('.popup__button-save');

        submitButton.textContent = 'Сохранение...';

        api.editUserData(data)
            .then(newUserData => {
                userInfoObject.setUserInfo({
                    name: newUserData.name,
                    about: newUserData.about,
                })

                submitButton.textContent = 'Сохранить';

                popupEditProfileObject.close();
            })
    },

    handleAvatarFormSubmit = () => {
        const data = popupEditAvatarObject.getInputValues();
        const submitButton = popupEditAvatarForm.querySelector('.popup__button-save');

        submitButton.textContent = 'Сохранение...';

        api.editUserAvatar(data.link)
            .then(newAvatar => {
                const userAvatar = document.querySelector('.profile__photo-image');

                userAvatar.src = newAvatar.avatar;
                submitButton.textContent = 'Сохранить';

                popupEditAvatarObject.close();
            })
    },

    handleDeleteCard = () => {
        const idCard = popupWithConfirmationForm.id;
        api.deleteCard(idCard)
            .then(res => {
                document.getElementById(idCard).remove();

                popupWithConfirmationObject.close();
        });
    },

    handleConfirmationDeleteCard = (event) => {
        popupWithConfirmationObject.open();

        popupWithConfirmationForm.id = event.target.closest('.card').id;
    },

    popupImageObject = new PopupWithImage('#show-image-popup'),

    popupEditProfileObject = new PopupWithForm(
        '#edit-profile-popup',
        handleProfileFormSubmit
    ),

    popupEditAvatarObject = new PopupWithForm(
        '#edit-profile-image',
        handleAvatarFormSubmit
    ),

    popupWithConfirmationObject = new PopupWithConfirmation(
        '#question-delete-card-popup',
        handleDeleteCard
    );

let sectionObject;
let userInfoObject;
let createCard;

api.getUserData()
    .then(userData => {
        userInfoObject = new UserInfo({
            nameSelector: '.profile__title',
            aboutSelector: '.profile__subtitle',
            avatar: '.profile__photo-image',
            id: userData._id
        })

        userInfoObject.setUserInfo({
            name: userData.name,
            about: userData.about,
        })

        createCard = (item) => {
            const cardObject = new Card(
                item,
                '#template-card',
                handleCardClick,
                handleConfirmationDeleteCard,
                handleAddLikeCard
            );

            const userInfo = userInfoObject.getUserInfo();

            return cardObject.generateCard(userInfo.id);
        };

        userInfoObject.setAvatar(userData.avatar);
    })
    .then(() => {
        api.getInitCards()
            .then(items => {
                sectionObject = new Section({
                        items: items.reverse(),
                        renderer: createCard
                    },
                    '.elements'
                );

                sectionObject.renderElements();
            });
    })

const handleAddCardFormSubmit = () => {
      const data = popupAddCardObject.getInputValues();
      const submitButton = popupAddCardForm.querySelector('.popup__button-save');

      submitButton.textContent = 'Сохранение...';

      api.addCard(data)
          .then(dataNewCard => {
              sectionObject.addItem(dataNewCard)

              submitButton.textContent = 'Сохраненить';

              popupAddCardObject.close();
          })
    },

    popupAddCardObject = new PopupWithForm(
        '#add-card-popup',
        handleAddCardFormSubmit
    ),

    enableValidation = (config) => {
      const formList = Array.from(document.querySelectorAll(config.formSelector));

      formList.forEach((formElement) => {
        const formName = formElement.getAttribute('name'),
            validator = new FormValidator(config, formElement);

        formValidators[formName] = validator;
        validator.enableValidation();
      });
    };

popupWithConfirmationObject.setEventListeners();
popupImageObject.setEventListeners();
popupEditProfileObject.setEventListeners();
popupAddCardObject.setEventListeners();
popupEditAvatarObject.setEventListeners();

enableValidation(validConfig);

// Слушатели для отображения форм
buttonOpenEditProfile.addEventListener('click',() => {
  const userInfo = userInfoObject.getUserInfo();

  nameInput.value = userInfo.name;
  aboutInput.value = userInfo.about;

  formValidators[popupEditProfileForm.getAttribute('name')].resetValidation();

  popupEditProfileObject.open();
});

// Слушатели для отображения форм
buttonOpenEditAvatar.addEventListener('click',() => {
  formValidators[popupEditAvatarForm.getAttribute('name')].resetValidation();

  popupEditAvatarObject.open();
});

buttonOpenAddCard.addEventListener('click', () => {
  formValidators[popupAddCardForm.getAttribute('name')].resetValidation();

  popupAddCardObject.open();
});

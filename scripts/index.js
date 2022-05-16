const openEditNameDescription = document.querySelector('.profile__edit');
const openAddCard = document.querySelector('.profile__button');

const popupEditProfile = document.querySelector('#edit-profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupShowImage = document.querySelector('#show-image-popup');

const popupEditProfileCloseButton = document.querySelector('#close-edit-profile');
const popupAddCardCloseButton = document.querySelector('#close-add-card');
const popupShowImageCloseButton = document.querySelector('#close-show-image');

const popupEditProfileForm = document.querySelector('#edit');
const popupAddCardForm = document.querySelector('#add');
const cardsContainer = document.querySelector('.elements');

const nameInput = document.querySelector('#username');
const descriptionInput = document.querySelector('#description');

const imageNameInput = document.querySelector('#new-image-name');
const imageLinkInput = document.querySelector('#new-image-link');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const imagePopup = popupShowImage.querySelector('img');
const figcaptionPopup = popupShowImage.querySelector('figcaption');

// Отображение формы изменения профиля
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// Скрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Изменяет данные профиля и закрывает форму
function handleProfileFormSubmit() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
}

// Добоавляет карточку, чистит и закрывает форму
function handleAddCardFormSubmit () {
  cardsContainer.prepend(createCard({
      name: imageNameInput.value,
      link: imageLinkInput.value
  }));
}

// Перезугрузка ошибок и формы
function resetErrorsAndForm(formData) {
  const form = getForm(formData.formSelector);
  const listInput = getInputList(formData);

  form.reset();

  listInput.forEach((input) => {
    clearError(getErrorElement(input.id), input, formData.inputErrorClass);
  })
}

// Закрытие и перезагрузка форм
function closeAndReset(formPopup) {
  if (formPopup.id === 'add-card-popup') {
    closeResetAddCartForm();
  } else if(formPopup.id === 'show-image-popup') {
    closePopup(popupShowImage);
  } else {
    closeResetEditProfileForm();
  }
}

// Закрытие и перезагрузка формы
function closeResetEditProfileForm() {
  closePopup(popupEditProfile);
  resetErrorsAndForm(dataForValidProfileFormObject);
  enableButton(dataForValidProfileFormObject);
}

// Закрытие и перезагрузка формы
function closeResetAddCartForm() {
  closePopup(popupAddCard);
  resetErrorsAndForm(dataForValidAddCartFormObject);
  disableButton(dataForValidAddCartFormObject);
}

// Получение формы по селектору
function getForm(formSelector) {
  const form = document.querySelector(formSelector)

  return form;
}

// Получение submit по селектору и формы
function getSubmitButton(form, submitButtonSelector) {
  const submitButton = form.querySelector(submitButtonSelector);

  return submitButton;
}

// Получение открытых popup форм
function getOpenPopup() {
  const formPopup = document.querySelector('.popup_opened');

  return formPopup;
}


const handleKeydownClosePopup = (event) => {
  const openPopup = getOpenPopup();

  if (event.code === 'Escape') {
    closeAndReset(openPopup);
    document.removeEventListener('keydown', handleKeydownClosePopup);
  }
}

// Удаление элемента
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Раскрывает изображения
const handleImageActiveCard = (event) => {
  document.addEventListener('keydown', handleKeydownClosePopup);

  imagePopup.src = event.target.src;
  imagePopup.alt = event.target.alt;
  figcaptionPopup.textContent = event.target.alt;

  openPopup(popupShowImage);
};

// Изменение состояния сердечки
const handleHeartActiveCard = (event) => {
  event.target.classList.toggle('card__heart_active');
};

// Создаёт карточку
const createCard = (item) => {
  const cardTemplate = document.querySelector('#template-card');
  const template = cardTemplate.content.cloneNode(true);
  const title = template.querySelector('.card__title');
  const image = template.querySelector('.card__image');
  const deleteButton = template.querySelector('.card__button-delete');
  const likeButton = template.querySelector('.card__heart');

  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleHeartActiveCard);
  image.addEventListener('click', handleImageActiveCard);

  return template;
};




// Слушатели для отображения форм
openEditNameDescription.addEventListener('click',() => {
  document.addEventListener('keydown', handleKeydownClosePopup);

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);
});

openAddCard.addEventListener('click', () => {
  document.addEventListener('keydown', handleKeydownClosePopup);

  disableButton(dataForValidAddCartFormObject);
  openPopup(popupAddCard);
});


// Слушатели для скрытия форм
popupEditProfileCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', handleKeydownClosePopup);

  closeAndReset(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', handleKeydownClosePopup);
  closeAndReset(popupAddCard)
});

popupShowImageCloseButton.addEventListener('click', () => {
  document.removeEventListener('keydown', handleKeydownClosePopup);

  closePopup(popupShowImage);
});

document.body.addEventListener('click', (event) => {
  const formPopup = getOpenPopup();

  if (!formPopup) {
    return;
  }

  const classList = Array.from(event.target.classList);

  if (classList.includes('popup')) {
    closeAndReset(formPopup);

    document.removeEventListener('keydown', handleKeydownClosePopup);
  }
});


// Слушатели на изменение данных профиля
popupEditProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleProfileFormSubmit();
  closeAndReset(popupEditProfile);
  document.removeEventListener('keydown', handleKeydownClosePopup);
});

// Слушатели на добавление карточки
popupAddCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  handleAddCardFormSubmit();
  closeAndReset(popupAddCard);
});


// Проходит по массиву и добавляет карточки при первом выполнении скрипта
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

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

const imageNameInput = document.querySelector('#newImageName');
const imageLinkInput = document.querySelector('#newImageLink');

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
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}

// Добоавляет карточку, чистит и закрывает форму
function handleAddCardFormSubmit (event) {
  event.preventDefault();

  cardsContainer.prepend(createCard({
      name: imageNameInput.value,
      link: imageLinkInput.value
  }));

  closePopup(popupAddCard);

  resetPopupForm(popupAddCardForm);
}

function resetPopupForm (form) {
  form.reset();
}

// Слушатели для отображения форм
openEditNameDescription.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  
  openPopup(popupEditProfile);
});
openAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// Слушатели для скрытия форм
popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);

  resetPopupForm(popupAddCardForm);
});
popupShowImageCloseButton.addEventListener('click', () => {
  closePopup(popupShowImage);
});

// Слушатели на изменение данных профиля
popupEditProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Слушатели на добавление карточки
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);


// Удаление элемента
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Раскрывает изображения
const handleImageActiveCard = (event) => {

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

// Проходит по массиву и добавляет карточки при первом выполнении скрипта
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});
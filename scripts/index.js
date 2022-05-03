const openEditNameDescription = document.querySelector('.profile__edit');
const openAddCard = document.querySelector('.profile__button');

const popupEditProfile = document.querySelector('#edit-profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupShowImage = document.querySelector('#show-image-popup');

const popupEditProfileCloseButton = document.querySelector('#close-edit-profile');
const popupAddCardCloseButton = document.querySelector('#close-add-card');
const popupShowImageCloseButton = document.querySelector('#close-show-image');

const popupEditProfileContainer = document.querySelector('#edit');
const popupAddCardContainer = document.querySelector('#add');
const cardsContainer = document.querySelector('.elements');

let nameInput = document.querySelector('#username');
let descriptionInput = document.querySelector('#description');

let imageNameInput = document.querySelector('#newImageName');
let imageLinkInput = document.querySelector('#newImageLink');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Отображение формы изменения профиля
function openPopup() {
  popupEditProfile.classList.add('popup_opened')
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
}

// Скрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// Изменяет данные профиля и закрывает форму
function formSubmitHandlerEditProfile (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closePopup(popupEditProfile)
}

// Добоавляет карточку, чистит и закрывает форму
function formSubmitHandlerAddCard (event) {
  event.preventDefault();

  cardsContainer.prepend(formCardTemplate({
      name: imageNameInput.value,
      link: imageLinkInput.value
  }));

  closePopup(popupAddCard);

  imageNameInput.value = '';
  imageLinkInput.value = '';
}


// Слушатели для отображения форм
openEditNameDescription.addEventListener('click', openPopup)
openAddCard.addEventListener('click', () => {
  popupAddCard.classList.add('popup_opened');
})

// Слушатели для скрытия форм
popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
})
popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);

  imageNameInput.value = '';
  imageLinkInput.value = '';
})
popupShowImageCloseButton.addEventListener('click', () => {
  closePopup(popupShowImage);

  let imagePopup = popupShowImage.querySelector('img');
  let figcaptionPopup = popupShowImage.querySelector('figcaption');

  imagePopup.src = '';
  imagePopup.alt = '';
  figcaptionPopup.textContent = '';
})

// Слушатели на изменение данных профиля
popupEditProfileContainer.addEventListener('submit', formSubmitHandlerEditProfile);

// Слушатели на добавление карточки
popupAddCardContainer.addEventListener('submit', formSubmitHandlerAddCard);


// Удаление элемента
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Раскрывает изображения
const handleImageActiveCard = (event) => {
  let imagePopup = popupShowImage.querySelector('img');
  let figcaptionPopup = popupShowImage.querySelector('figcaption');
  const imageCard = event.target.closest('img');
  const altImage = imageCard.getAttribute('alt');

  imagePopup.src = imageCard.getAttribute('src');
  imagePopup.alt = altImage;
  figcaptionPopup.textContent = altImage;

  popupShowImage.classList.add('popup_opened');
};

// Изменение состояния сердечки
const handleHeartActiveCard = (event) => {
  event.target.closest('.card__heart').classList.toggle('card__heart_active');
};

// Создаёт карточку
const formCardTemplate = (item) => {
  const cardTemplate = document.querySelector('#template-card');
  const template = cardTemplate.content.cloneNode(true);
  const title = template.querySelector('.card__title');
  const image = template.querySelector('.card__image');
  const deleteButton = template.querySelector('.card__button-delete');
  const likeButton = template.querySelector('.card__heart');

  title.textContent = item.name
  image.src = item.link
  image.alt = item.name

  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleHeartActiveCard);
  image.addEventListener('click', handleImageActiveCard);

  return template
}


// Проходит по массиву и добавляет карточки при первом выполнении скрипта
initialCards.forEach((item) => {
  cardsContainer.append(formCardTemplate(item));
});



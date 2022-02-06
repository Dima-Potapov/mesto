const openEditNameDescription = document.querySelector('.profile__edit')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__button-close')
const popupContainer = document.querySelector('.popup__container')


function openPopup() {
  popup.classList.add('popup_opened')
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

openEditNameDescription.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)


popup.addEventListener('click', function(event) {
  if(!event.defaultPrevented) {
    closePopup()
  }
})
popupContainer.addEventListener('click', function(e) {
  e.preventDefault()
})




let nameInput = document.querySelector('#username')
let descriptionInput = document.querySelector('#description')

let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

let clickButton = document.querySelector('.popup__button-save')


function formSubmitHandler (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = descriptionInput.value;
    closePopup()
}

popupContainer.addEventListener('submit', formSubmitHandler);
export class Card {
    constructor(
        name,
        link,
        templateSelector
    ) {
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
    }

    _getPopupImage() {
        const popupShowImage = document.querySelector('#show-image-popup');

        return popupShowImage;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector).content.cloneNode(true);

        return cardTemplate;
    }

    _setEventListeners() {
        this._element.querySelector('.card__button-delete').addEventListener('click', event => {
            this._handleDeleteCard(event);
        });
        this._element.querySelector('.card__heart').addEventListener('click', event => {
            this._handleHeartActiveCard(event);
        });
        this._element.querySelector('.card__image').addEventListener('click', event => {
            this._handleImageActiveCard(event);
        });
        document.querySelector('#close-show-image').addEventListener('click', (event) => {
            event.stopPropagation();

            this._closePopup(this._getPopupImage());
        });
    }

    _handleDeleteCard(event) {
        event.target.closest('.card').remove();
    }

    _handleHeartActiveCard(event) {
        event.target.classList.toggle('card__heart_active');
    }

    _openPopup(popup) {
        popup.classList.add('popup_opened');

        document.addEventListener('keydown', event => {
            this._handleKeydownClosePopup(event);
        });

        popup.addEventListener('click', event => {
            this._handleClosePopupFormOverlay(event);
        });
    }
    
    _handleImageActiveCard(event) {
        const popupShowImage = this._getPopupImage();
        const imagePopup = popupShowImage.querySelector('img');
        const figcaptionPopup = popupShowImage.querySelector('figcaption');

        imagePopup.src = event.target.src;
        imagePopup.alt = event.target.alt;
        figcaptionPopup.textContent = event.target.alt;

        this._openPopup(popupShowImage);
    }

    _handleKeydownClosePopup(event) {
        if (event.code === 'Escape') {
            const openPopup = document.querySelector('.popup_opened');

            this._closePopup(openPopup);
        }
    }

    _handleClosePopupFormOverlay(event) {
        if (event.target === event.currentTarget) {
            this._closePopup(event.target);
        }
    }

    _closePopup(popup) {
        popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', event => {
            this._handleKeydownClosePopup(event);
        });

        popup.removeEventListener('click', event => {
            this._handleClosePopupFormOverlay(event);
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.card__title').textContent = this.name;
        this._element.querySelector('.card__image').src = this.link;
        this._element.querySelector('.card__image').alt = this.name;

        this._setEventListeners();

        return this._element;
    }
}
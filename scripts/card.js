export class Card {
    constructor(
        name,
        link,
        templateSelector,
        handleCardClick
    ) {
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        this._element.querySelector('.card__button-delete').addEventListener('click', event => {
            this._handleDeleteCard(event);
        });
        this._element.querySelector('.card__heart').addEventListener('click', event => {
            this._handleHeartActiveCard(event);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this.name, this.link)
        });
    }

    _handleDeleteCard(event) {
        event.target.closest('.card').remove();
    }

    _handleHeartActiveCard(event) {
        event.target.classList.toggle('card__heart_active');
    }

    generateCard() {
        this._element = document.querySelector(this.templateSelector).content.cloneNode(true);
        this._cardImage = this._element.querySelector('.card__image')

        this._element.querySelector('.card__title').textContent = this.name;
        this._cardImage.src = this.link;
        this._cardImage.alt = this.name;

        this._setEventListeners();

        return this._element;
    }
}
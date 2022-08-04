export class Card {
    constructor(
        item,
        templateSelector,
        handleCardClick,
        handleDeleteCard,
        handleAddLike
    ) {
        this.item = item;
        this.templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleAddLike = handleAddLike;
    }

    _setEventListeners() {
        this._element.querySelector('.card__button-delete').addEventListener('click', event => {
            this._handleDeleteCard(event);
        });
        this._element.querySelector('.card__heart').addEventListener('click', event => {
            this._handleAddLike(event)
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this.item.name, this.item.link)
        });
    }

    generateCard(id) {
        this._element = document.querySelector(this.templateSelector).content.cloneNode(true);
        this._cardImage = this._element.querySelector('.card__image')
        const likes = this.item.likes;

        this._element.querySelector('.card__title').textContent = this.item.name;
        this._element.querySelector('.card__likes').textContent = likes.length;
        this._element.querySelector('.card').id = this.item._id;
        this._cardImage.src = this.item.link;
        this._cardImage.alt = this.item.name;

        if (id === this.item.owner._id) {
            this._element.querySelector('.card__button-delete').style.display = "block";
            this._element.querySelector('.card__likes').textContent = likes.length;
        }

        likes.forEach(userData => {
            if (userData._id === id) {
                this._element.querySelector('.card__heart').classList.add('card__heart_active');
            }
        })

        this._setEventListeners();

        return this._element;
    }
}

export class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this._escClose = this._handleEscClose.bind(this);
        this._overlayClose = this._handleOverlayClose.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._escClose);
    }

    close() {
        this.popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._escClose);
    }

    _handleEscClose(event) {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener('click', this._overlayClose);

        this.popup.querySelector('.popup__button-close').addEventListener('click', (event) => {
            event.stopPropagation();

            this.close();
        })
    }
}
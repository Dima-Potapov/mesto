export class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
    }

    open() {
        this._escClose = this._handleEscClose;
        this._overlayClose = this._handleOverlayClose;

        this.popup.classList.add('popup_opened');

        document.addEventListener('keydown', (event) => {
            this._escClose(event);
        });
        this.popup.addEventListener('click', (event) => {
            this._overlayClose(event);
        });
    }

    close() {
        this.popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._escClose);
        this.popup.removeEventListener('click', this._overlayClose);
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
        this.popup.querySelector('.popup__button-close').addEventListener('click', (event) => {
            event.stopPropagation();

            this.close();
        })
    }
}
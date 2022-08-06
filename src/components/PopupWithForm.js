import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(
        popupSelector,
        submitCallback
    ) {
        super(popupSelector);

        this.submitCallback = submitCallback;
        this.inputValues = {};
        this.submitButton = this.popup.querySelector('.popup__button-save');
        this.inputElements = this.popup.querySelectorAll('.popup__input')
    }

    getInputValues() {
        this.inputElements.forEach(input => {
            this.inputValues[input.name] = input.value;
        })

        return this.inputValues;
    }

    close() {
        super.close();

        this.form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this.form = this.popup.querySelector('form');

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.submitCallback();
        });
    }

    renderLoading(isLoading, buttonText) {
        if (isLoading) {
            this.submitButton.textContent = buttonText ?? 'Сохранение...';
        } else {
            this.submitButton.textContent = buttonText ?? 'Сохранить';
        }
    }

}

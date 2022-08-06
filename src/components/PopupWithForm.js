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
    }
    // Данные с инпутов форм должны обновляться, так как данные на странице должны мы изменяем формами.
    // Поэтому они достаются при каждом вызове этого метода (при срабатывании submit).
    getInputValues() {
        this.popup.querySelectorAll('.popup__input').forEach(input => {
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

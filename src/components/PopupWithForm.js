import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(
        popupSelector,
        submitCallback
    ) {
        super(popupSelector);
        this.submitCallback = submitCallback;
    }

    // Данные с инпутов форм должны обновляться, так как данные на странице должны мы изменяем формами.
    // Поэтому они достаются при каждом вызове этого метода (при срабатывании submit).
    getInputValues() {
        const inputValues = {};

        this.popup.querySelectorAll('.popup__input').forEach(input => {
            inputValues[input.name] = input.value;
        })

        return inputValues;
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

            this.close();
        });
    }
}
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(
        popupSelector,
        callbackConfirmation
    ) {
        super(popupSelector);

        this.callbackConfirmation = callbackConfirmation;
        this.form = this.popup.querySelector('form');
    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.callbackConfirmation();
        });
    }
}

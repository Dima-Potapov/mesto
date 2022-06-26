import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this.imagePopupWithImage = this.popup.querySelector('img');
        this.figcaptionPopupWithImage = this.popup.querySelector('figcaption');
    }

    open(
        link,
        name
    ) {
        this.imagePopupWithImage.src = link;
        this.imagePopupWithImage.alt = name;
        this.figcaptionPopupWithImage.textContent = name;

        super.open();
    }
}
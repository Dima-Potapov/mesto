export class FormValidator {
    constructor(
        validConfig,
        form
    ) {
        this.validConfig = validConfig
        this.form = form
    }

    _getInputList() {
        const listInput = Array.from(this.form.querySelectorAll(this.validConfig.inputSelector));

        return listInput;
    }

    _getErrorElement(idInput) {
        const errorElement = document.querySelector(`#${idInput}-error`);

        return errorElement;
    }

    _showError(errorElement, element) {
        errorElement.textContent = element.validationMessage;
        element.classList.add(this.validConfig.inputErrorClass);
    }

    _validateAndManageErrorInput(element) {
        const errorElement = this._getErrorElement(element.id);

        if(!element.validity.valid){
            this._showError(errorElement, element);

            return false;
        }

        this._clearError(errorElement, element, this.validConfig.inputErrorClass);

        return true;
    }

    _clearError(errorElement, element, inputErrorClass) {
        errorElement.textContent = '';
        element.classList.remove(inputErrorClass);
    }

    _getSubmitButton() {
        const submitButton = this.form.querySelector(this.validConfig.submitButtonSelector);

        return submitButton;
    }

    _disableButton() {
        const submitButton = this._getSubmitButton();

        submitButton.classList.add(validConfig.inactiveButtonClass);
        submitButton.disabled = true;
    }

    _validateForm(listInput) {
        let isValid = listInput.reduce((isValidForm, input) => {
            if (!input.validity.valid) {
                isValidForm = false;
            }

            return isValidForm;
        }, true);

        return isValid;
    }

    _enableButton() {
        const submitButton = this._getSubmitButton();

        submitButton.classList.remove(this.validConfig.inactiveButtonClass);
        submitButton.disabled = false;
    }

    enableValidation() {
        const listInput = this._getInputList();

        listInput.forEach((input) => {
            input.addEventListener('input', () => {
                let validStatus = this._validateAndManageErrorInput(input);

                if (!validStatus) {
                    this._disableButton();
                } else {
                    const isValid = this._validateForm(listInput);

                    if (isValid) {
                        this._enableButton();
                    }
                }
            })
        })
    }
}
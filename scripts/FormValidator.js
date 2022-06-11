export class FormValidator {
    constructor(
        validConfig,
        form,
        isDefaultEnableSubmit = true
    ) {
        this.validConfig = validConfig;
        this.form = form;
        this.isDefaultEnableSubmit = isDefaultEnableSubmit;
    }

    _getErrorElement(idInput) {
        const errorElement = document.querySelector(`#${idInput}-error`);

        return errorElement;
    }

    _showError(element) {
        const errorElement = this._getErrorElement(element.id)

        errorElement.textContent = element.validationMessage;
        element.classList.add(this.validConfig.inputErrorClass);
    }

    _validateAndManageErrorInput(element) {
        if(!element.validity.valid){
            this._showError(element);

            return false;
        }

        this._clearError(element);

        return true;
    }

    _clearError(element) {
        const errorElement = this._getErrorElement(element.id)

        errorElement.textContent = '';
        element.classList.remove(this.validConfig.inputErrorClass);
    }

    _disableButton() {
        this._submitButton.classList.add(this.validConfig.inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    _validateForm() {
        let isValid = this._inputList.reduce((isValidForm, input) => {
            if (!input.validity.valid) {
                isValidForm = false;
            }

            return isValidForm;
        }, true);

        return isValid;
    }

    _enableButton() {
        this._submitButton.classList.remove(this.validConfig.inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    resetValidation() {
        this._inputList.forEach(item => {
            this._clearError(item);

            if (this.isDefaultEnableSubmit) {
                this._enableButton();
            } else {
                this._disableButton();
            }
        })
    }

    enableValidation() {
        this._inputList = Array.from(this.form.querySelectorAll(this.validConfig.inputSelector));
        this._submitButton = this.form.querySelector(this.validConfig.submitButtonSelector);

        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                let validStatus = this._validateAndManageErrorInput(input);

                if (!validStatus) {
                    this._disableButton();
                } else {
                    const isValid = this._validateForm();

                    if (isValid) {
                        this._enableButton();
                    }
                }
            })
        })
    }
}
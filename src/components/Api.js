export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            async: true,
            headers: {
                authorization: this.authorization
            },
        })
            .then(this._checkResponse);
    }

    editUserData({
         name,
         about
    }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkResponse);
    }

    editUserAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkResponse);
    }

    getInitCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.authorization
            },
        })
            .then(this._checkResponse);
    }

    addCard({name, link}) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(this._checkResponse);
    }

    addLikeCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(this._checkResponse);
    }

    deleteLikeCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(this._checkResponse);
    }
}

export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.authorization = options.headers.authorization;
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            async: true,
            headers: {
                authorization: this.authorization
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
    }

    getInitCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.authorization
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
    }

    deleteCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
    }

    addLikeCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
    }

    deleteLikeCard(cartId) {
        return fetch(`${this.baseUrl}/cards/${cartId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Error: ${res.status}`);
            });
    }
}

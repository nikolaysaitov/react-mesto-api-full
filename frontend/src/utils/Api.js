class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl; // тело конструктора
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }
  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  deleteLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  addLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: "https://saitovkmsapi.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

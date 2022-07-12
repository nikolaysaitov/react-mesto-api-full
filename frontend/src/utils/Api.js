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

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
      
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
      
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._getResponseData)
    
  }
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(this._getResponseData)
    
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData)
      
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData)
      
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._getResponseData)
    
  }

  
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._getResponseData)
    
  }
  

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "083f1856-1d24-41b5-bab8-7705d2d18558",
    "Content-Type": "application/json",
  },
});
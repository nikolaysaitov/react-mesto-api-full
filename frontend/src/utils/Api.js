class Api {
  constructor(options) {
    this._serverUrl = options.serverUrl; 
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  getProfile() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
      
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
      
  }

  editProfile(name, about) {
    return fetch(`${this._serverUrl}/users/me`, {
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
    return fetch(`${this._serverUrl}/cards`, {
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
    return fetch(`${this._serverUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData)
      
  }

  deleteLike(id) {
    return fetch(`${this._serverUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._getResponseData)
      
  }

  addLike(id) {
    return fetch(`${this._serverUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then(this._getResponseData)
    
  }

  
  updateAvatar(avatar) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
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
  serverUrl: "http://saitovkmsapi.nomoredomains.xyz",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
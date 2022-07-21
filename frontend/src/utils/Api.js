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
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
      .then(this._getResponseData)
      
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._getResponseData)
      
  }

  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._getResponseData)
    
  }
  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(this._getResponseData)
    
  }
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._getResponseData)
      
  }

  deleteLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._getResponseData)
      
  }

  addLike(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._getResponseData)
    
  }

  
  updateAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._getResponseData)
    
  }
  

  // другие методы работы с API
}

// // export const api = new Api({
// //   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
// //   headers: {
// //     authorization: "083f1856-1d24-41b5-bab8-7705d2d18558",
// //     "Content-Type": "application/json",
// //   },
// // });


export const api = new Api({
  baseUrl: "http://localhost:3000/",
  // headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // }
});
// let baseUrl = '';
// const { NODE_ENV } = process.env;
// console.log(NODE_ENV)
// if (NODE_ENV === 'production') {
//   baseUrl = 'https://saitovkmsapi.nomoredomains.xyz/';
// } else {
//   baseUrl = 'http://localhost:3000'
// }


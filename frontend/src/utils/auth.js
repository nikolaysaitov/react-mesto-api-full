// export const BASE_URL = 'https://auth.nomoreparties.co';

// // export const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;


// function checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(res.status);
// }

// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     }).then(checkResponse);
// };

// export const authorize = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     }).then(checkResponse);
// };

// export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
//     .then(checkResponse);
// // }

// export const BASE_URL = 'https://saitovkmsapi.nomoredomains.xyz/';

// let BASE_URL = '';
// const { NODE_ENV } = process.env;
// if ( NODE_ENV === 'production' ) {
//     BASE_URL = 'https://saitovkmsapi.nomoredomains.xyz/';
// } else {
//     BASE_URL = 'http://localhost:3000'
// }


   
// function checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(res.status);
// }

// export const register = (email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     }).then(checkResponse);
// };

// export const authorize = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     }).then(checkResponse);
// };

// export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
//     .then(checkResponse);
// }
let baseUrl = '';
const { NODE_ENV } = process.env;
if ( NODE_ENV === 'production' ) {
  baseUrl = 'https://apims.nomoredomains.xyz';
} else {
  baseUrl = 'http://localhost:3000'
}


export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}
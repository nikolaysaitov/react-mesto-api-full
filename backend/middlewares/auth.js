

const { checkToken } = require('../jwt/jwt');
const AuthorisationError = require('../errors/authorisation_error_401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorisationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  

  try {
    payload = checkToken(token);
  } catch (err) {
    throw new AuthorisationError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
// const jwt = require('jsonwebtoken');
// const AuthorisationError = require('../errors/authorisation_error_401');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   const { JWT_SECRET = 'some-secret-key' } = process.env;

//   if (!authorization || !authorization.startsWith('Bearer')) {
//     return next(new AuthorisationError('Необходима авторизация'));
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;
  

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new AuthorisationError('Необходима авторизация');
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса

//   return next(); // пропускаем запрос дальше
// };

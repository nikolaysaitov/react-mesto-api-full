const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation_error_401');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer')) {
//     return next(new AuthorisationError('Необходима авторизация'));
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     throw new AuthorisationError('Необходима авторизация');
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса

//   return next(); // пропускаем запрос дальше
// };
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
  return true;
};
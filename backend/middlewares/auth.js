const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation_error_401');

module.exports = (req, res, next) => {
  const { JWT_SECRET = 'some-secret-key' } = process.env;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new AuthorisationError('Необходима авторизация'));
  }
  const token = authorization.replace(/^\S+/, '').trim();

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorisationError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
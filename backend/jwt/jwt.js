const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = 'very-secret';
const checkToken = (token) => jwt.verify(token, NODE_ENV ? JWT_SECRET : SECRET_KEY);

module.exports = { checkToken };
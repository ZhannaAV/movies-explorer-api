const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new LoginError('Необходима авторизация');

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
  } catch (err) {
    throw new LoginError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

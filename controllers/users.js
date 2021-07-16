const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateEmailError = require('../errors/DuplicateEmailError');

module.exports.getMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => {
        user.password = '';
        res.status(200).send(user);
      })
      .catch(next));
};

module.exports.changeUser = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new DuplicateEmailError('Пользователь с таким email уже существует');
      } else {
        return User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
          .orFail(() => new NotFoundError('Пользователь не найден'))
          .then((user) => res.status(200).send(user));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByEmail(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

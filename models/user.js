const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LoginError = require('../errors/LoginError');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Новый пользователь',
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\.[a-z]{2,5}$/.test(v);
      },
      message: 'Укажите почту в формате name@email.domen',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByEmail = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new LoginError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) throw new LoginError('Неправильные почта или пароль');
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);

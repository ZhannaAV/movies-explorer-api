const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LoginError = require('../errors/LoginError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\.[a-z]{2,5}$/.test(v);
      },
      message: 'Укажите почту в формате name@email.domen',
    },
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
});

userSchema.statics.findUserByEmail = (email, password) => this.findOne({ email }).select('+password')
  .orFail(() => new LoginError('Неправильные почта или пароль'))
  .then((user) => bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) throw new LoginError('Неправильные почта или пароль');
      return user;
    }));

module.exports = mongoose.model('user', userSchema);

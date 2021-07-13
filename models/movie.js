const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}[a-zA-Z0-9-.~:/?#@!$&'()+,;=[]]/gi.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}[a-zA-Z0-9-.~:/?#@!$&'()+,;=[]]/gi.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}[a-zA-Z0-9-.~:/?#@!$&'()+,;=[]]/gi.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-яёА-ЯЁ1-9 !?,-]+$/.test(v);
      },
      message: 'Укажите корректное название',
    },
    required: true,
  },
  nameEN: {
    type: String,
    validate: {
      validator(v) {
        return /^[a-zA-Z1-9 !?,-]+$/.test(v);
      },
      message: 'Укажите корректное название',
    },
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);

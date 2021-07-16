const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const methodUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const methodEmail = (value) => {
  const result = validator.isEmail(value);
  if (result) {
    return value;
  }
  throw new Error('Email validation err');
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().custom(methodEmail),
    password: Joi.string().required(),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(methodEmail),
    password: Joi.string().required(),
  }),
});

const validateUserChange = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom(methodEmail),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(methodUrl),
    trailer: Joi.string().required().custom(methodUrl),
    thumbnail: Joi.string().required().custom(methodUrl),
    movieId: Joi.string().length(24).hex().required(),
    nameRU: Joi.string().required().pattern(new RegExp(/^[a-яёА-ЯЁ1-9 !?,-]+$/)),
    nameEN: Joi.string().required().pattern(new RegExp(/^[a-zA-Z1-9 !?,-]+$/)),
  }),
});

const validateMovieParam = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateMovieBody, validateMovieParam, validateUserBody, validateAuth, validateUserChange,
};

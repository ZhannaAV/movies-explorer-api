const { celebrate, Joi } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
    password: Joi.string().required(),
  }),
})

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
    password: Joi.string().required(),
  }),
})

const validateUserChange =  celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
  }),
})


const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    trailer: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    thumbnail: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(new RegExp(/^[a-яёА-ЯЁ1-9 !?,-]+$/)),
    nameEN: Joi.string().required().pattern(new RegExp(/^[a-zA-Z1-9 !?,-]+$/)),
  })
})

const validateMovieParam = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
})

module.exports ={validateMovieBody, validateMovieParam, validateUserBody, validateAuth, validateUserChange}


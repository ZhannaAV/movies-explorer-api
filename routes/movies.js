const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.number(),
    description: Joi.string(),
    image: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    trailer: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    thumbnail: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/[A-za-z0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}$/)),
    movieId: Joi.number(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),

  }),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteMovie);



module.exports = router;

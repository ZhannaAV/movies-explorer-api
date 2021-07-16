const router = require('express').Router();
const { validateMovieBody, validateMovieParam } = require('../middlewares/validations');

const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovieBody, addMovie);

router.delete('/:movieId', validateMovieParam, deleteMovie);

module.exports = router;

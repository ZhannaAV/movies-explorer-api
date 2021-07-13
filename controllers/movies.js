const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NoRulesError = require('../errors/NoRulesError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN } = req.body;
  const userId = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN, owner: userId })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (String(movie.owner) !== userId) {
        throw new NoRulesError('Нет прав для удаления фильма');
      }
      return movie._id;
    })
    .then((id) => Movie.findByIdAndRemove(id)
      .then(() => res.status(200).send({ message: 'Фильм удалён' })))
    .catch(next);
};
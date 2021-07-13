const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth)

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

// router.get('/', (req, res, next) => {
//   if (req) throw new NotFoundError('Запрашиваемый ресурс не найден');
//   next();
// });
//
// router.post('/', (req, res, next) => {
//   if (req) throw new NotFoundError('Запрашиваемый ресурс не найден');
//   next();
// });
//
// router.get('/:path', (req, res, next) => {
//   if (req.params.path) throw new NotFoundError('Запрашиваемый ресурс не найден');
//   next();
// });
//
// router.post('/:path', (req, res, next) => {
//   if (req.params.path) throw new NotFoundError('Запрашиваемый ресурс не найден');
//   next();
// });

module.exports = router
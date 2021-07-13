const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const {validateUserBody, validateAuth} = require('../middlewares/validations')
const { createUser, login } = require('../controllers/users');

router.post('/signup',validateUserBody, createUser);

router.post('/signin',validateAuth, login);

router.use(auth)

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);


module.exports = router
const router = require('express').Router();
const {celebrate, Joi} = require('celebrate');

const {
  changeUser, getMe,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(new RegExp('^[a-z0-9-_.]{1,20}@[a-z0-9-_.]{1,20}\\.[a-z]{2,5}$')),
  }),
}), changeUser);



module.exports = router;

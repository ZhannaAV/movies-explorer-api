const router = require('express').Router();
const {validateUserChange} = require('../middlewares/validations');

const {
  changeUser, getMe,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', validateUserChange, changeUser);

module.exports = router;

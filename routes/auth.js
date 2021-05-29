/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const { verifiedFunction: ensureAuth } = require('./verifyJwtToken');

const {
  registerUser,
  loginUser,
  changePassword
} = require('../controllers/authControllers');

//Описание функций, выполняющихся при получении запроса на указанный путь 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', ensureAuth, changePassword);

module.exports = router;

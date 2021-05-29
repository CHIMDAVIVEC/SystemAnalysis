const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  registerValidation,
  loginValidation,
  passwordChangeValidation
} = require('../utils/validation');
const passwordEncrypt = require('../utils/passwordEncrypt');
const { getUser } = require('../services/user.services');

const validation = {
  register: registerValidation,
  login: loginValidation,
  passwordChange: passwordChangeValidation
};

//Проверка правильности данных
const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

//Регистрация пользователя
const registerUser = async (req, res) => {
  try {
    await handleValidation(req.body, res, 'register');
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error_msg: 'Такой E-mail уже занят' });
    }

    const user = new User(req.body);
    const EncryptedPassword = await passwordEncrypt(req.body.password);
    user.password = EncryptedPassword;
    const savedUser = await user.save();
    return res.status(201).json({ data: savedUser });
  } catch (err) {
    console.log({ err });
    return res.status(400).json({ error_msg: err.message });
  }
};

//Авторизация пользователя
const loginUser = async (req, res) => {
  try {
    await handleValidation(req.body, res, 'login');
    const user = await getUser({ email: req.body.email });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ error_msg: 'Неправильный пароль' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET
    );
    return res.status(200).json({ access_token: token });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Изменение пароля
const changePassword = async (req, res) => {
  try {
    const { newPassword, _id } = req.body;
    const user = await getUser({ _id: _id });
    const oldPassword = user.password;
    handleValidation(req.body, res, 'passwordChange');
    const EncryptedPassword = await passwordEncrypt(newPassword);

    if (oldPassword === EncryptedPassword) {
      return res.status(400).json({
        error_msg: 'Новый и старый пароли совпадают'
      });
    }

    user.password = EncryptedPassword;
    await user.save();
    return res.json('Success');
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword
};

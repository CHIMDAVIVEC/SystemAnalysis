const User = require('../models/User');
//Функции для взаимодействия с базой данных пользователей
//Получение данных конкретного пользователя при авторизации
const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    if (!user) {
      throw Error('Такой пользователь не найден');
    }

    return user;
  } catch (err) {
    throw Error(err);
  }
};

//Получение и изменение данных конкретного пользователя
const getAndEditUser = async (query, newData) => {
  try {
    const user = await User.findOneAndUpdate(query, newData, {
      new: true,
      runValidators: true
    });

    return user;
  } catch (err) {
    throw Error(err);
  }
};

//Получение данных конкретного пользователя
const getSingleUserService = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    return user;
  } catch (err) {
    throw Error(err);
  }
};

//Получение списка пользователей с ролями аналитик и эксперт
const getUsers = async (query) => {
  try {
    const users = await User.find(query).find({ role: ['analyst', 'expert'] });
    return users;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  getSingleUserService,
  getAndEditUser
};

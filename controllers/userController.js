const mongoose = require('mongoose');
const {
  getUsers,
  getSingleUserService,
  getAndEditUser
} = require('../services/user.services');

const { userEditValidation } = require('../utils/validation');

const validation = {
  editUser: userEditValidation
};
const User = require('../models/User');
const Problem = require('../models/Problem');

//Проверка корректности данных
const handleValidation = (body, res, type) => {
  const { error } = validation[type](body);

  if (error) {
    throw Error(error.details[0].message);
  }
};

//Получение списка пользователей
const getAllUsers = async (req, res) => {
  try {
    const totalUsers = await getUsers({});

    return res.status(200).json({ data: totalUsers });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Получение данных конкретного пользователя
const getSingleUser = async (req, res) => {
  try {
    const user = await getSingleUserService({ _id: req.params.id });
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Получение данных текущего пользователя
const getLoggedInUser = async (req, res) => {
  try {
    const user = await getSingleUserService({ _id: req.user._id });
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Изменение данных пользователя
const editUserAction = async (req, res) => {
  try {
    handleValidation(req.body, res, 'editUser');
    const { _id } = req.body;
    const user = await getAndEditUser({ _id }, req.body);
    return res.json({ data: user });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

//Удаление пользователя
const deleteUserAction = async (req, res) => {
  try {
    const user = await getSingleUserService({ _id: req.params.id });
    const userId = user.Id;
    const Counters = mongoose.connection.db.collection('identitycounters');
    await user.remove();
    await User.updateMany({ Id: { $gt: userId } }, { $inc: { Id: -1 } });
    await Counters.updateOne({ model: 'User' }, { $inc: { count: -1 } });

    if (user.role === 'expert') {
      await Problem.updateMany(
        {},
        { $pull: { experts: { id: req.params.id } } }
      );
    }

    if (user.role === 'analyst') {
      const problemsToDelete = await Problem.find({
        analyst: req.params.id
      }).sort({ Id: -1 });
      for (let i = 0; i < problemsToDelete.length; i += 1) {
        const problem = problemsToDelete[i];
        const problemId = problemsToDelete[i].Id;
        await problem.remove();
        await Problem.deleteOne(problemsToDelete[i]);
        await Problem.updateMany({ Id: { $gt: problemId } }, { $inc: { Id: -1 } });
        await Counters.updateOne({ model: 'Problem' }, { $inc: { count: -1 } });
      }
    }
    return res.json({ data: 'Успешно' });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

module.exports = {
  getAllUsers,
  getLoggedInUser,
  getSingleUser,
  editUserAction,
  deleteUserAction
};

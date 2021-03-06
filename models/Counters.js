const mongoose = require('mongoose');

//Схема базы данных для работы с автоинкрементом при добавлении нового пользователя или проблемы
const countersSchema = new mongoose.Schema({
  count: {
    type: Number,
    min: 1
  },
  field: {
    type: String
  },
  model: {
    type: String
  }
});

module.exports = mongoose.model('Counters', countersSchema);

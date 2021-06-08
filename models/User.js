const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize();

//Схема пользователя в базе данных
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 1024,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    max: 1024,
    trim: true
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'analyst', 'expert']
  },
  profession: {
    type: String,
    max: 1024,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Id: {
    type: Number,
    unique: true,
    default: 1
  }
});

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'Id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('User', userSchema);

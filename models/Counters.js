const mongoose = require('mongoose');

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

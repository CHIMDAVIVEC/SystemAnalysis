const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize();

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 1024,
    trim: true
  },
  formulation: {
    type: String,
    required: true,
    max: 1024,
    trim: true
  },
  experts: [
    {
      id: {
        required: true,
        type: mongoose.Types.ObjectId
      },
      Ra: {
        type: Number,
        default: 0.0
      },
      Ru: {
        type: Number,
        default: 0.0
      },
      solutions: {
        method1: {
          values: [
            [
              {
                type: Number,
                min: 0,
                default: null
              }
            ]
          ],
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: null
          }
        },
        method2: {
          values: [
            {
              type: Number,
              min: 0,
              max: 1,
              default: null
            }
          ],
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: null
          }
        },
        method3: {
          values: [
            {
              type: Number,
              min: 1,
              default: null
            }
          ],
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: null
          }
        },
        method4: {
          values: [
            {
              type: Number,
              min: 0,
              max: 10,
              default: null
            }
          ],
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: null
          }
        },
        method5: {
          values: [
            [
              {
                type: Number,
                min: 0,
                default: null
              }
            ]
          ],
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: null
          }
        }
      }
    }
  ],
  analyst: {
    type: mongoose.Types.ObjectId
  },
  alternatives: [
    {
      id: {
        type: Number,
        required: true,
        default: 0
      },
      formulation: {
        type: String,
        required: true,
        max: 1024,
        trim: true
      },
      result: {
        method1: {
          type: Number,
          default: null
        },
        method2: {
          type: Number,
          default: null
        },
        method3: {
          type: Number,
          default: null
        },
        method4: {
          type: Number,
          default: null
        },
        method5: {
          type: Number,
          default: null
        },
        method6: {
          type: Number,
          default: null
        }
      }
    }
  ],
  status: {
    type: String,
    enum: ['Открыта', 'Решается', 'Решена'],
    default: 'Открыта'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  Id: {
    type: Number,
    unique: true,
    default: 1
  }
});

problemSchema.plugin(autoIncrement.plugin, {
  model: 'Problem',
  field: 'Id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Problem', problemSchema);

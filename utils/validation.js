//Описание валидации данных при работе с пользователями
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().required().min(6),
    role: Joi.string().required(),
    rating: Joi.number().min(0).max(12),
    profession: Joi.string()
  });

  return schema.validate(data);
};

const userEditValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    surname: Joi.string().min(2),
    email: Joi.string().min(6).email(),
    role: Joi.string(),
    _id: Joi.string().required(),
    rating: Joi.number().min(0).max(12),
    profession: Joi.string()
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
};

const passwordChangeValidation = (data) => {
  const schema = Joi.object({
    confirmPassword: Joi.string().required().min(6),
    newPassword: Joi.string().required().min(6),
    _id: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation,
  passwordChangeValidation,
  userEditValidation
};

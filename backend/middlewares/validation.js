const { celebrate, Joi } = require("celebrate");

const registerValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      "any.required": "Имя должно состоять из 2 - 30 символов",
    }),
    about: Joi.string().min(2).max(30).messages({
      "any.required": "Информация должна состоять из 2 - 30 символов",
    }),
    avatar: Joi.string(),
    email: Joi.string().required().messages({
      "any.required": "Обязательное поле",
    }),
    password: Joi.string().required().messages({
      "any.required": "Обязательное поле",
    }),
  },
});

module.exports = registerValidator;

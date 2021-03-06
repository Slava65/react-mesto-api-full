const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/badRequestError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[а-яa-z0-9-: ]{2,30}$/i;
        return regex.test(v);
      },
      message: 'Имя введено неверно',
    },
  },
  about: {
    type: String,
    required: true,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[а-яa-z0-9-:,;. ]{2,30}$/i;
        return regex.test(v);
      },
      message: 'Информация введена неверно',
    },
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,6}([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?(#?)$/i;
        return regex.test(v);
      },
      message: 'URL введен неверно',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        const regex = /[a-z0-9]+/i;
        return regex.test(v);
      },
      message: 'пароль содержит недопустимые символы',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new BadRequestError('Неправильные почта или пароль'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new BadRequestError('Неправильные почта или пароль'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[а-яa-z0-9-: ]{2,30}$/i;
        return regex.test(v);
      },
      message: "Имя введено неверно",
    },
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[а-яa-z0-9-:,;. ]{2,30}$/i;
        return regex.test(v);
      },
      message: "Информация введена неверно",
    },
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,6}([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?(#?)$/i;
        return regex.test(v);
      },
      message: "URL введен неверно",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "e-mail введен неверно",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);

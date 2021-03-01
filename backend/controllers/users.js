const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../errors/notFoundError");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      return res.send({ data: user });
    })
    .catch((err) => {
      console.log(err)
      if (err.name === "ValidationError") {
        return next(new NotFoundError("Пользователь не найден"));
      }
      return next(err);
    });
};

const getCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return res.send({ data: user });
    })
    .catch((err) => {
      console.log(err)
      if (err.name === "ValidationError") {
        return next(new NotFoundError("Пользователь не найден"));
      }
      return next(err);
    });
}

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const { name, about, avatar, email } = req.body;
      const password = hash;
      return User.create({ name, about, avatar, email, password });
    })
    .then((user) => {
      const { _id, email } = user;
      userData = { _id, email };
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные в метод создания пользователя"
          )
        );
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные в метод обновления пользователя"
          )
        );
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError(
            "Переданы некорректные данные в метод обновления аватара"
          )
        );
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "AuthorizationError") {
        return next(new UnAuthorizeError("Ошибка авторизации"));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentProfile
};

const userRouter = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentProfile
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentProfile);

userRouter.get('/:id', getUser);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;

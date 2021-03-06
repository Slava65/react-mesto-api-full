const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { isCelebrateError } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const registerValidator = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');
require('dotenv').config();

const { PORT } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', registerValidator, createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    return next({
      status: 400,
      message: err.message,
    });
  }
  return next(err);
});
app.use('*', (next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

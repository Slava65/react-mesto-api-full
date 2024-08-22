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

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/api/signin', login);
app.post('/api/signup', registerValidator, createUser);
app.use('/api/users', auth, userRouter);
app.use('/api/cards', auth, cardRouter);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    return next({
      status: 400,
      message: err.message,
    });
  }
  return next(err);
});
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

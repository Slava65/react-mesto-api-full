const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const registerValidator = require("./middlewares/validation");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

const {
  createUser,
  login
} = require('./controllers/users');
const { PORT = 3000 } = process.env;
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
app.use('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorLogger);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

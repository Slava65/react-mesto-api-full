const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'на сервере произошла ошибка1' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;

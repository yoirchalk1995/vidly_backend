const logger = require("../utils/loggers");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  const statusCode = err.status || 500;
  res.status(statusCode).send({ message: err.message });
};

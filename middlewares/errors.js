module.exports = function (err, res, req, next) {
  res.status(500).send(err.message);
};

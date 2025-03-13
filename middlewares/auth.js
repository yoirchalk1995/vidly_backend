const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("user has not provided authentication token");
  try {
    const payload = jwt.verify(token, "12345");
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

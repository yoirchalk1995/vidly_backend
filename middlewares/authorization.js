const jwt = require("jsonwebtoken");

function authorize(webToken, requiredLevel) {
  const verify = jwt.verify(webToken, "12345");

  return true;
}

module.exports = authorize;

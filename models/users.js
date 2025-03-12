const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const PasswordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(this._id, "12345");
};
const User = mongoose.model("user", userSchema);

const complexityOptions = {
  min: 8, // Minimum length
  max: 30, // Maximum length
  lowerCase: 1, // At least one lowercase letter
  upperCase: 1, // At least one uppercase letter
  numeric: 1, // At least one number
  symbol: 1, // At least one special character
  requirementCount: 3, // The number of complexity requirements that must be met
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    password: PasswordComplexity(complexityOptions).required(),
  });

  return schema.validate(user);
}

function validateAuthentication(authentication) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: PasswordComplexity(complexityOptions).required(),
  });

  return schema.validate(authentication);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateAuthentication = validateAuthentication;

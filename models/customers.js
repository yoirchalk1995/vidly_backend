const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "customer",
  mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, min: 5, max: 25 },
    number: { type: String, required: true, min: 10, max: 10 },
  })
);

function validateBody(body) {
  schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(25),
    number: Joi.string().min(10).max(10),
  });

  return schema.validate(body);
}

module.exports.validator = validateBody;
module.exports.Customer = Customer;

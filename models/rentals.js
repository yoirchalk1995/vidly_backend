const Joi = require("joi");
const joiObjectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
  customer: {
    type: {
      customerId: mongoose.Schema.Types.ObjectId,
      name: String,
      isGold: Boolean,
      phone: String,
    },
    required: true,
  },
  movie: {
    type: {
      movieId: mongoose.Schema.Types.ObjectId,
      name: String,
      dailyRentalRate: Number,
    },
    required: true,
  },
  rentalDate: { type: Date, required: true, default: Date.now() },
  returnDate: Date,
  rentalFee: Number,
});

function validateRental(rental) {
  const schema = Joi.object({
    customerId: joiObjectId().required(),
    movieId: joiObjectId().required(),
    rentalDate: Joi.date(),
    returnDate: Joi.date(),
  });

  return schema.validate(rental);
}

const Rental = mongoose.model("rental", rentalSchema);

module.exports.Rental = Rental;
module.exports.validator = validateRental;

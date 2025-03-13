const express = require("express");
const { validator } = require("../models/rentals");
const { Rental } = require("../models/rentals");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movies");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("customer not found");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("movie not found");

  if (movie.numberInStock === 0)
    return res.status(400).send("movie not in stock");
  movie.set({ numberInStock: movie.numberInStock - 1 });

  await movie.save(); //dont want this to excecute if save rental fails...

  let rental = new Rental({
    customer: {
      customerId: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.number,
    },
    movie: {
      movieId: movie._id,
      name: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    rentalDate: req.body.rentalDate,
    returnDate: req.body.returnDate,
  });

  rental = await rental.save();
  res.send(rental);
});

router.get("/", async (req, res, next) => {
  try {
    const rentals = await Rental.find()
      .sort("name")
      .select("customer rentalDate returnDate");

    res.send(rentals); // Send the rentals if everything works
  } catch (ex) {
    next(ex);
  }
});

router.patch("/:id", [auth, admin], async (req, res) => {
  let rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("rental not found");

  if (rental.returnDate) {
    return res
      .status(400)
      .send("Rental has already been returned and cannot be patched again.");
  }

  const movie = await Movie.findById(rental.movie.movieId);
  if (!movie) return res.status(404).send("movie not found");

  movie.set({ numberInStock: movie.numberInStock + 1 });
  await movie.save();

  const returnDate = new Date();

  rental.rentalFee =
    calculateDays(rental.rentalDate, returnDate) * rental.movie.dailyRentalRate;

  rental.returnDate = returnDate;
  rental = await rental.save();
  res.send(rental);
});

function calculateDays(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Both inputs must be Date objects");
  }

  return Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)) + 1;
}
module.exports = router;

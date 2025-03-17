const express = require("express");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const customers = require("../routes/customers");
const users = require("../routes/users");
const auth = require("../routes/auth");
const errors = require("../middlewares/errors");

const startup = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(errors);
};

module.exports = startup;

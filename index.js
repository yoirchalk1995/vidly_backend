require("express-async-errors");
const express = require("express");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const Joi = require("joi");
const errors = require("./middlewares/errors");
const { initializeDB } = require("./startup/db");
const logger = require("./utils/loggers");

initializeDB().catch(console.dir);

const app = express();

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(errors);

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

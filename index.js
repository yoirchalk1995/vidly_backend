require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { initializeDB } = require("./startup/db");
const logger = require("./utils/loggers");

initializeDB().catch(console.dir);

const app = express();
require("./startup/routes")(app);

process.on("uncaughtException", (ex) => {
  logger.on("finish", () => process.exit(1));
});

process.on("unhandledRejection", (ex) => {
  logger.on("finish", () => process.exit(1));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

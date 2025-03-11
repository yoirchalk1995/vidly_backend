const mongoose = require("mongoose");

module.exports = async function () {
  mongoose
    .connect("mongodb://localhost:27017")
    .then(console.log("conected to db"));
};

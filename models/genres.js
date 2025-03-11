const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genre: { type: String, required: true, minLength: 3, maxLength: 255 },
});

const Genre = mongoose.model("genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().required().min(3).max(255),
  });

  return schema.validate(genre);
}

module.exports.validateGenre = validateGenre;
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;

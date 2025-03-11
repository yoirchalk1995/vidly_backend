const express = require("express");
const mongoose = require("mongoose");
const { validateGenre } = require("../models/genres");
const { Genre } = require("../models/genres");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("genre");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    genre: req.body.genre,
  });
  const result = await genre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const id = isValidObjectId(req.params.id);
  if (!id)
    return res
      .status(400)
      .send(`id param ${req.params.id} is not valid mongoose objectId1`);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    { genre: req.body.genre },
    { new: true }
  );

  if (!genre)
    return res.status(404).send(`genre with id '${req.params.id}' not found`);
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("No genres found");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const id = isValidObjectId(req.params.id);
  if (!id)
    return res.status(400).send("id param is not valid mongoose objectId");
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;

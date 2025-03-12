const express = require("express");
const { User } = require("../models/users");
const { validateUser } = require("../models/users");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const isEmailTaken = await User.findOne({ email: req.body.email });
  if (isEmailTaken) return res.status(400).send("email adress already in use");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    hashedPassword,
  });

  user = await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

module.exports = router;

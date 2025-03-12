const express = require("express");
const { validateAuthentication, User } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateAuthentication(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).send("user with given email adress not found");

  const passwordsMatch = await bcrypt.compare(
    req.body.password,
    user.hashedPassword
  );
  if (!passwordsMatch) return res.status(400).send("password incorrect");

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(user);
});

module.exports = router;

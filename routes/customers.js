const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const validateMongooseId = require("../middlewares/validateMongooseId");
const notFoundHandler = require("../utils/handleNotFound");
const { Customer } = require("../models/customers");
const { validator: validateBody } = require("../models/customers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Customer.find().sort("name");
  if (notFoundHandler(res, result, "customers")) return;
  res.send(result);
});

router.get("/:id", validateMongooseId, async (req, res) => {
  const result = await Customer.findById(req.params.id).sort("name");
  if (!result)
    return res.status(404).send(`customer with id ${req.params.id} not found`);
  res.send(result);
});

router.delete("/:id", [validateMongooseId, auth], async (req, res) => {
  const result = await Customer.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).send(`customer with id ${id} not found`);
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    number: req.body.number,
  });

  customer = await customer.save();
  res.send(customer);
});

module.exports = router;

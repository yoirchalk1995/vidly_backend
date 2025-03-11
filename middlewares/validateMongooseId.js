const { Types } = require("mongoose");

const validateObjectId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send(`id "${req.params.id}" is not a valid mongoose _id`);
  }
  next();
};

module.exports = validateObjectId;

const { Response } = require("express");
/**
 *
 * @param {Response} res - reference to express response argument
 * @param {object} object - the result of the fetch from the db.
 * @param {string} objectName - the name of the object searching for eg. user / order
 * @param {string|number} [id] - only required when fetching a specific user
 * @returns res status 404 with appropriate message if object is not found
 */
const notFoundHandler = (res, object, objectName, id) => {
  const message =
    objectName.slice(-1) === "s"
      ? `${objectName} not found`
      : `${objectName} with id ${id} not found`;
  if (!object || (Array.isArray(object) && object.length === 0)) {
    res.status(404).send(message);
    return true;
  }
};

module.exports = notFoundHandler;

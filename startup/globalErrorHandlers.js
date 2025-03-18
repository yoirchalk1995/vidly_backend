const logger = require("../utils/loggers");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    logger.on("finish", () => process.exit(1));
  });

  process.on("unhandledRejection", (ex) => {
    logger.on("finish", () => process.exit(1));
  });
};

const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/app.log",
    }),
    new winston.transports.Console({ level: "info" }),
  ],
});

module.exports = logger;

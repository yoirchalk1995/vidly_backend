const winston = require("winston");
require("winston-mongodb");

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
    new winston.transports.MongoDB({
      level: "error",
      collection: "logs",
      db: "mongodb+srv://yoirchalk1995:yoirchalk1995@cluster0.b2d72.mongodb.net/vidly?retryWrites=true&w=majority&appName=Cluster0",
    }),
  ],
});
module.exports = logger;

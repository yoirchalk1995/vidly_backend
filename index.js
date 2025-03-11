const express = require("express");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const winston = require("winston");
const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const uri =
  "mongodb+srv://yoirchalk1995:yoirchalk1995@cluster0.b2d72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

// mongoose
//   .connect("mongodb://localhost/vidly")
//   .then(() => console.log("connected to db"))
//   .catch((ex) => console.error("connection failed", ex));

const app = express();

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("hello world");
});

winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtExceptions.log" }),
  new winston.transports.Console("error")
);
winston.rejections.handle(
  new winston.transports.File({ filename: "unhandledRejections.log" }),
  new winston.transports.Console("error")
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://yoirchalk1995:yoirchalk1995@cluster0.b2d72.mongodb.net/vidly?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function initializeDB() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

module.exports = { initializeDB };

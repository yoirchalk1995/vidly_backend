require("express-async-errors");
const express = require("express");
const { initializeDB } = require("./startup/db");

initializeDB().catch(console.dir);

require("./startup/globalErrorHandlers")();
const app = express();
require("./startup/routes")(app);

const p = Promise.reject(new Error("broken stuff"));
p.then(() => {});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

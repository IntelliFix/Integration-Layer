const express = require("express"); // express server
require("dotenv").config(); // use the env variables
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/index.routes"); // used to handle routes

const app = express();
// app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb" }));
app.use(router);
const uri = process.env.MONGODB_CONNECTION_STRING;
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("MongoDB connection successful");
        app.listen(PORT);
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
new Database();

app.use((req, res) => {
  res.status(404).send("Error: routes doesn't exist (-_-)");
});

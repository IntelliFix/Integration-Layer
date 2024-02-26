const express = require("express"); // express server
require("dotenv").config(); // use the env variables
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/index.routes"); // used to handle routes
const cookieParser = require("cookie-parser");

const app = express();

// CORS Policy origin should be Gen AI server url, and deployed frontend url ONLY!
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://arctic-acolyte-414610.uc.r.appspot.com",
    ],
  })
);
const PORT = 8080;
app.use(express.json({ limit: "50mb" }));

//The cookie parser must be ALWAYS called before the router so the browser would be able to verify
//the jwt, then route to the required page
app.use(cookieParser());
app.use(router);

//view engine
app.set("view engine", "ejs");

//Database connection
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

//404 Status
app.use((req, res) => {
  res.status(404).send("Error: routes doesn't exist (-_-)");
});

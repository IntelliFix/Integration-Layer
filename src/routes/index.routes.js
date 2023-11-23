const express = require("express");
const registerUser = require("../controllers/authentication/registerUser");

const router = express.Router();
router.post("/register-user", registerUser);
router.get("/", (req, res) => {
  res.send("Welcome to IntelliFix!");
});

module.exports = router;

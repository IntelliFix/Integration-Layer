const express = require("express");
const registerUser = require("../controllers/authentication/registerUser");

const authController = require('../controllers/authentication/authController');

const router = express.Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);


router.post("/register-user", registerUser);


router.get("/", (req, res) => {
  res.send("Welcome to IntelliFix!");
});

module.exports = router;

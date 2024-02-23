const express = require("express");
const registerUser = require("../controllers/authentication/registerUser");
const codeFixer = require("../controllers/security/codeFixer");
const chatbot = require("../controllers/security/chatbot");

const authController = require('../controllers/authentication/authController');

const router = express.Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);


router.post("/register-user", registerUser);
<<<<<<< HEAD


=======
// Both code-fixer and chatbot routes have to be protected/authenticated routes
router.post("/code-fixer", codeFixer);
router.post("/chatbot", chatbot);
>>>>>>> 9b25fffcfd5f0d29f1ce7bb527164e4d78008977
router.get("/", (req, res) => {
  res.send("Coming Sooon..");
});

module.exports = router;

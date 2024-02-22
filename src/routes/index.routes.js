const express = require("express");
const registerUser = require("../controllers/authentication/registerUser");
const codeFixer = require("../controllers/security/codeFixer");
const chatbot = require("../controllers/security/chatbot");

const router = express.Router();
router.post("/register-user", registerUser);
// Both code-fixer and chatbot routes have to be protected/authenticated routes
router.post("/code-fixer", codeFixer);
router.post("/chatbot", chatbot);
router.get("/", (req, res) => {
  res.send("Coming Sooon..");
});

module.exports = router;

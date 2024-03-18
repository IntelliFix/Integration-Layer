const express = require("express");
const codeFixer = require("../controllers/security/codeFixer");
const chatbot = require("../controllers/security/chatbot");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
} = require("../controllers/authentication/authController");

const router = express.Router();

router.get("*", checkUser); //applying checkuser and entering user data in every GET request

router.get("/", (req, res) => {
  res.send("Coming Sooon..");
});

router.get("/signup", signup_get);
router.post("/signup", signup_post);

router.get("/login", login_get);
router.post("/login", login_post);

// Both code-fixer and chatbot routes have to be protected/authenticated routes
router.post("/code-fixer", requireAuth, checkUser, codeFixer);
router.post("/chatbot", requireAuth, checkUser, chatbot);

router.get("/logout", requireAuth, logout_get);

module.exports = router;

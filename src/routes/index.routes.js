const express = require("express");
const codeFixer = require("../controllers/security/codeFixer");
const chatbot = require("../controllers/security/chatbot");
const {requireAuth, checkUser} = require('../middleware/authMiddleware');
const router = express.Router();

const authController = require('../controllers/authentication/authController');


router.get('*', checkUser); //applying checkuser and entering user data in every GET request

router.get("/", (req, res) => {
  res.send("Coming Sooon..");
});


router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);


// Both code-fixer and chatbot routes have to be protected/authenticated routes
router.post("/code-fixer", requireAuth, codeFixer);
router.post("/chatbot", requireAuth, chatbot);

router.get('/logout', authController.logout_get);

module.exports = router;

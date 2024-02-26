const jwt = require("jsonwebtoken");
const User = require("../models/User");

//To apply Access Control by protecting some routes
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if jwt exists and verify it
  if (token) {
    jwt.verify(token, "thisisoursecret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send({ error: "Invalid or missing token" }).status(401);
  }
};

//check current user and insert user email into the header for example, as a profile button
//applied to every single GET request, in index.routes file
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "thisisoursecret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };

require("dotenv").config();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const body = req.body;

  // validate using email so that for each email, there is only one Intellifix account
  User.findOne({ email: body.email }).then((user) => {
    if (user) {
      res.send("Email Exists");
    } else {
      const newUser = new User({
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
    
      });
    
      bcrypt.hash(
        newUser.password + process.env.PEPPER,
        +process.env.SALT_ROUNDS || "",
        async (err, hash) => {
          newUser.password = hash;
          await newUser.save();
          res.send("New User Saved");
        }
      );
    }

  });
}

module.exports = registerUser;

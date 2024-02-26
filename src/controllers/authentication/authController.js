const User = require("../../models/User");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", name: "", phoneNumber: "", password: "" };

  //incorrect email at login
  if (err.message === "Incorrect Email") {
    errors.email = "This email isn't registered";
  }

  //incorrect password at login
  if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password";
  }

  //duplicates error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "thisisoursecret", {
    expiresIn: maxAge, //The jwt remains valid for 3 days
  });
};

const signup_get = (req, res) => {
  //Render signup view
  res.render("signup");
};

const login_get = (req, res) => {
  //Render singin view
  res.render("login");
};

const signup_post = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;

  try {
    const user = await User.create({ email, password, name, phoneNumber });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//to logout, we should delete jwt from the browser, but that's not possible
//so we just replace it with an empty string
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("Logged Out").status(200);
};

module.exports = { signup_get, signup_post, login_get, login_post, logout_get };

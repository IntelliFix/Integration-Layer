const mongoose = require("mongoose");

// const validateEmail = function (email) {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    // validate: [validateEmail, "invalid email"],
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength:8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

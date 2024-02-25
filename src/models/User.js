const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],  //If user fails to enter email, ask them to enter it
    unique: true,
    lowercase:true,
    validate: [validateEmail, "Please enter a valid email"],  //The input must be a valid email
  },

  name: {
    type: String,
    required: [true, "Please enter name"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Please enter valid phone number"],
  },

  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength:[8, "Minimum password length is 8 characters"],
  },
});

//Hash password before doc is even saved to DB
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})


//Static method to login user
//It searches for the email in the database
//and compares the input password of the user to the one in the database
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if (user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect Email');
}

const User = mongoose.model("User", userSchema);

module.exports = User;


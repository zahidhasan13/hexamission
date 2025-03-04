const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  // Email Validator
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  // Password Validator
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required."
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);

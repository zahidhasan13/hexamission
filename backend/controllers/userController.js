const User = require("../models/userModel");

const login = async (req, res) => {
  res.json({ message: "Login Route" });
};

const signup = async (req, res) => {
  res.json({ message: "Signup Route" });
};

module.exports = {
  login,
  signup,
};

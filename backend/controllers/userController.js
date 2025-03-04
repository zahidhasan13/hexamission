const User = require("../models/userModel");

const login = async (req, res) => {
  res.json({ message: "Login Route" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  login,
  signup,
};

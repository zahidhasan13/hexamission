const express = require("express");
const { signup, login } = require("../controllers/userController");

const router = express.Router();

// Login
router.post("/login", login);

// Sign up
router.post("/signup", signup);

module.exports = router;

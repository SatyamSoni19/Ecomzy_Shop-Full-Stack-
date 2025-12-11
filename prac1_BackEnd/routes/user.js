// Import Express + Routes
const express = require('express');
const router = express.Router();

// Import Controller
const { login, signup, logout } = require("../controllers/Auth");
const { contactUs } = require("../controllers/contactController");
const { auth } = require("../middlewares/auth");

// Define Routes
router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)
router.post("/contact", contactUs)

router.get("/profile", auth, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
        message: "Welcome to your profile"
    });
});

module.exports = router;
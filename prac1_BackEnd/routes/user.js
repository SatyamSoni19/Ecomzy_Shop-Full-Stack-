// Import Express + Routes
const express = require('express');
const router = express.Router();

// Import Controller
const {login, signup} = require("../controllers/Auth");
const {auth} = require("../middlewares/auth");

// Define Routes
router.post("/login", login)
router.post("/signup", signup)

router.get("/profile", auth, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
        message: "Welcome to your profile"
    });
});

module.exports = router;
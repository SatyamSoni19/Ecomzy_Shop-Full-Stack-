// Import Express + Routes
const express = require('express');
const router = express.Router();

// Import Controller
const { login, signup, logout } = require("../controllers/Auth");
const { contactUs } = require("../controllers/contactController");
const { auth } = require("../middlewares/auth");
const { uploadProfileImage } = require('../controllers/fileUpload');

// Define Routes
router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)
router.post("/contact", contactUs)
router.post("/upload-image", auth, uploadProfileImage)

const User = require("../models/User");

router.get("/profile", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user,
            message: "Welcome to your profile"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: error.message
        });
    }
});

module.exports = router;
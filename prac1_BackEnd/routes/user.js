// Import Express + Routes
const express = require('express');
const router = express.Router();

// Import Controller
const { login, signup, logout } = require("../controllers/Auth");
const { contactUs } = require("../controllers/contactController");
const { auth } = require("../middlewares/auth");
const { uploadProfileImage } = require('../controllers/fileUpload');
const { getCart, addToCart, removeFromCart, clearCart, getFavourites, addToFavourites, removeFromFavourites } = require('../controllers/cartLikeController');
const { submitRating, getProductRatings, getUserRating } = require('../controllers/ratingController');

// Define Routes
router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)
router.post("/contact", contactUs)
router.post("/upload-image", auth, uploadProfileImage)

// Cart Routes (protected)
router.get("/cart", auth, getCart)
router.post("/cart/add", auth, addToCart)
router.post("/cart/remove", auth, removeFromCart)
router.post("/cart/clear", auth, clearCart)

// Favourites Routes (protected)
router.get("/favourites", auth, getFavourites)
router.post("/favourites/add", auth, addToFavourites)
router.post("/favourites/remove", auth, removeFromFavourites)

// Rating Routes
router.post("/rating", auth, submitRating)
router.get("/rating/:productId", getProductRatings)       // Public — no auth needed
router.get("/rating/:productId/me", auth, getUserRating)   // Protected — user's own rating

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
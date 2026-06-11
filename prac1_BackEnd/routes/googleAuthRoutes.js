// Google OAuth Routes
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleCallback } = require("../controllers/googleAuthController");

// Route: Redirect user to Google OAuth consent screen
// GET /api/v1/auth/google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Route: Google OAuth callback — Google redirects here after consent
// GET /api/v1/auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login?error=google_auth_failed",
    }),
    googleCallback
);

module.exports = router;

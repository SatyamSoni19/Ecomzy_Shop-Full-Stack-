// Google OAuth Controller — uses the SAME JWT structure as existing Auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Determine frontend URL based on environment
const getFrontendURL = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://ecomzy-shop-full-stack.vercel.app";
    }
    return "http://localhost:5173";
};

// Google OAuth Callback Handler
exports.googleCallback = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.redirect(`${getFrontendURL()}/login?error=auth_failed`);
        }

        // Generate the SAME JWT token structure as existing login system
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        // Set the SAME httpOnly cookie as existing login
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };

        // Set the cookie and redirect to frontend success page
        res.cookie("token", token, options);
        res.redirect(`${getFrontendURL()}/google-success`);

    } catch (error) {
        console.error("Google OAuth Callback Error:", error);
        res.redirect(`${getFrontendURL()}/login?error=server_error`);
    }
};

// Import jwt
const jwt = require("jsonwebtoken");

// ENV variables
require("dotenv").config();

// Middleware for Authentication
exports.auth = async (req, res, next) => {

    try {

        // Extract Token from req (Cookies, Body, or Header)
        const token =
            req?.cookies?.token ||
            req?.body?.token ||
            (req.header("Authorization") &&
                req.header("Authorization").replace("Bearer ", ""));

        // If Token is empty
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify Token
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is Invalid'
            })
        }

        next();

    }
    catch (error) {
        console.error("Auth Middleware Error:", error); // Debug Logging
        return res.status(401).json({
            success: false,
            message: 'Something went Wrong, while verifying token',
            error: error.message // Send error to frontend for visibility,
        })
    }
}

// Middleware for Admin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for admin"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified"
        });
    }
}
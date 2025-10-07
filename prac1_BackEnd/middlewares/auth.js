// Import jwt
const jwt = require("jsonwebtoken");

// ENV variables
require("dotenv").config();

// Middleware for Authentication
exports.auth = async (req, res, next) => {

    try {

        // Extract Token from req
        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");

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
        return res.status(401).json({
            success: false,
            message: 'Something went Wrong, while verifying token'
        })
    }

}
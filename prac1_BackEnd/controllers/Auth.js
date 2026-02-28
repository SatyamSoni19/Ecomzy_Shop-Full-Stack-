// Import Model, bcrypt, jwt, dotenv
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

// SignUp Handler & Export
exports.signup = async (req, res) => {

    try {

        // data from req ki body
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Validate Email Format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Format."
            })

        }

        // Check ki phle se to entry nhi padi db me
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exist',
            })
        }

        // Validate Password Format
        const isRightPassword = validator.isStrongPassword(password, {
            minLength: 6,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })

        if (!isRightPassword) {
            return res.status(400).json({
                success: false,
                message: "Min length: 6, Min UpprCase: 1, Min LowerCase: 1, Min Numbers: 1, Min Symbol: 1, Check Again!!"
            })
        }

        // Secure the Password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Error in Hashing Password',
            })
        }

        // Now create entry in DB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        return res.status(200).json({
            success: true,
            message: 'Signed Up Successfully',
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        })
    }

}

// Login Handler
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check email, password empty to nhi h
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Empty Email or Password',
            })
        }

        // Validate the Email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Format."
            })
        }

        // Check if User ne signup kiya h ki nhi
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'First Sign Up!',
            })
        }

        // Now verify password & generate JWT Token
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3d",
            })

            user = user.toObject();
            // REMOVED: user.token = token; // This is crucial because `localStorage.setItem("user", data.user)` still exists, so adding it to `user` would secretly put the token back in localStorage!
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            }

            return res.cookie("token", token, options).status(200).json({
                success: true,
                // token,
                user,
                message: 'Logged in Successfully'
            });

        }

        else {  // passwords do not matched
            res.status(403).json({
                success: false,
                message: 'Incorrect Password'
            })
        }

    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: error,
        })
    }

}

// Logout Handler
exports.logout = async (req, res) => {

    try {

        // First Check If the User Is Logged In or Already Logged Out
        if (!req.cookies.token) {
            // It means user is already logged out
            return res.status(400).json({
                success: false,
                message: "User Already Logged Out"
            })
        }

        else {
            // Now To Log Out, Clear the Token Inside the Cookie
            res.clearCookie("token", {
                httpOnly: true,
                secure: false
            });

            console.log(`Log Out ke bad ka cookie: ${req.cookies}`)

            return res.status(200).json({
                success: true,
                message: "Logged Out Successfully"
            })

        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }

}
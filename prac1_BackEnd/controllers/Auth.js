// Import Model, bcrypt, jwt, dotenv
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SignUp Handler & Export
exports.signup = async (req, res) => {

    try {

        // data from req ki body
        const { name, email, password } = req.body;

        // Check ki phle se to entry nhi padi db me
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exist',
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
            data: user,
            message: 'Entry Created Successfully',
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
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

        // Check if User ne signup kiya h ki nhi
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Phle signup to krle',
            })
        }

        // Now verify password & generate JWT Token
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success: true,
                token,
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
            message: error.message,
        })
    }

}
// Import Mongoose
const mongoose = require("mongoose");

// ENV variables
require("dotenv").config();

// Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    }

})

// Export
module.exports = mongoose.model("user", userSchema)
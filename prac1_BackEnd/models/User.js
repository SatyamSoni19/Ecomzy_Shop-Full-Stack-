// Import Mongoose
const mongoose = require("mongoose");

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
        required: false,  // Not required for Google OAuth users
    },

    googleId: {
        type: String,
        default: null,
    },

    image: {
        type: String,
        required: true,
        default: "https://api.dicebear.com/5.x/initials/svg?seed=User"  // Default Profile Photo for User
    },

    cart: {
        type: [Number],
        default: [],
    },

    favourites: {
        type: [Number],
        default: [],
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true })

// Export
module.exports = mongoose.model("user", userSchema)
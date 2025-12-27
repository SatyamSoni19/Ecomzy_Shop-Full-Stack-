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
        required: true,
    },

    image: {
        type: String,
        required: true,
        default: "https://api.dicebear.com/5.x/initials/svg?seed=User"  // Default Profile Photo for User
    }

})

// Export
module.exports = mongoose.model("user", userSchema)
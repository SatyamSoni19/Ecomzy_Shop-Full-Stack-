// Rating Model
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productId: {
        type: Number,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Compound unique index — one rating per user per product
ratingSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Rating", ratingSchema);

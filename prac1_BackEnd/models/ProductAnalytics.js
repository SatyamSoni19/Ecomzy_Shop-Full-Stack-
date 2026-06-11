const mongoose = require("mongoose");

const productAnalyticsSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    cartCount: {
        type: Number,
        default: 0,
    },
    viewCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("ProductAnalytics", productAnalyticsSchema);

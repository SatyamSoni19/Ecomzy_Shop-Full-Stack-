const ProductAnalytics = require("../models/ProductAnalytics");

exports.recordView = async (req, res) => {
    try {
        const { productId, title = "Unknown Product", category = "Unknown Category" } = req.body;

        if (productId === undefined || productId === null) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        await ProductAnalytics.findOneAndUpdate(
            { productId },
            { 
                $inc: { viewCount: 1 },
                $setOnInsert: { title, category }
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({ success: true, message: "View recorded" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error recording view", error: error.message });
    }
};

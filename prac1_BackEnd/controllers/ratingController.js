// Rating Controller
const Rating = require("../models/Rating");

// POST /api/v1/rating — Submit or update a rating
exports.submitRating = async (req, res) => {
    try {
        const { productId, stars } = req.body;
        const userId = req.user.id;

        if (!productId || !stars) {
            return res.status(400).json({ success: false, message: "productId and stars are required" });
        }

        if (stars < 1 || stars > 5 || !Number.isInteger(stars)) {
            return res.status(400).json({ success: false, message: "stars must be an integer between 1 and 5" });
        }

        // Upsert — create or update
        const rating = await Rating.findOneAndUpdate(
            { userId, productId },
            { stars },
            { upsert: true, new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            rating,
            message: "Rating submitted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error submitting rating",
            error: error.message,
        });
    }
};

// GET /api/v1/rating/:productId — Get average rating & count for a product (public)
exports.getProductRatings = async (req, res) => {
    try {
        const productId = Number(req.params.productId);

        const result = await Rating.aggregate([
            { $match: { productId } },
            {
                $group: {
                    _id: "$productId",
                    averageRating: { $avg: "$stars" },
                    totalRatings: { $sum: 1 },
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                totalRatings: 0,
            });
        }

        return res.status(200).json({
            success: true,
            averageRating: Math.round(result[0].averageRating * 10) / 10,
            totalRatings: result[0].totalRatings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching ratings",
            error: error.message,
        });
    }
};

// GET /api/v1/rating/:productId/me — Get current user's rating for a product (protected)
exports.getUserRating = async (req, res) => {
    try {
        const productId = Number(req.params.productId);
        const userId = req.user.id;

        const rating = await Rating.findOne({ userId, productId });

        return res.status(200).json({
            success: true,
            userRating: rating ? rating.stars : 0,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user rating",
            error: error.message,
        });
    }
};

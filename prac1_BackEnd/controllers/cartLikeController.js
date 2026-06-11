// Cart & Favourites Controller
const User = require("../models/User");
const ProductAnalytics = require("../models/ProductAnalytics");

// ==================== CART ====================

// GET /api/v1/cart — Fetch user's cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("cart");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
    }
};

// POST /api/v1/cart/add — Add product ID to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, title = "Unknown Product", category = "Unknown Category" } = req.body;

        if (productId === undefined || productId === null) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        for (let i = 0; i < quantity; i++) {
            user.cart.push(productId);
        }
        await user.save();

        await ProductAnalytics.findOneAndUpdate(
            { productId },
            { 
                $inc: { cartCount: quantity },
                $setOnInsert: { title, category }
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({ success: true, cart: user.cart, message: "Added to cart" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
};

// POST /api/v1/cart/remove — Remove product ID from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (productId === undefined || productId === null) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.cart = user.cart.filter((id) => id !== productId);
        await user.save();

        return res.status(200).json({ success: true, cart: user.cart, message: "Removed from cart" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error removing from cart", error: error.message });
    }
};

// POST /api/v1/cart/clear — Clear entire cart (used on checkout)
exports.clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.cart = [];
        await user.save();

        return res.status(200).json({ success: true, cart: user.cart, message: "Cart cleared" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error clearing cart", error: error.message });
    }
};

// ==================== FAVOURITES ====================

// GET /api/v1/favourites — Fetch user's favourites
exports.getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("favourites");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, favourites: user.favourites });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching favourites", error: error.message });
    }
};

// POST /api/v1/favourites/add — Add product ID to favourites
exports.addToFavourites = async (req, res) => {
    try {
        const { productId, title = "Unknown Product", category = "Unknown Category" } = req.body;

        if (productId === undefined || productId === null) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent duplicate
        if (user.favourites.includes(productId)) {
            return res.status(400).json({ success: false, message: "Product already in favourites" });
        }

        user.favourites.push(productId);
        await user.save();

        await ProductAnalytics.findOneAndUpdate(
            { productId },
            { 
                $inc: { likesCount: 1 },
                $setOnInsert: { title, category }
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({ success: true, favourites: user.favourites, message: "Added to favourites" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding to favourites", error: error.message });
    }
};

// POST /api/v1/favourites/remove — Remove product ID from favourites
exports.removeFromFavourites = async (req, res) => {
    try {
        const { productId } = req.body;

        if (productId === undefined || productId === null) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.favourites = user.favourites.filter((id) => id !== productId);
        await user.save();

        return res.status(200).json({ success: true, favourites: user.favourites, message: "Removed from favourites" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error removing from favourites", error: error.message });
    }
};

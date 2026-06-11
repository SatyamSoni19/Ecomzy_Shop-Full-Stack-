const User = require("../models/User");
const ProductAnalytics = require("../models/ProductAnalytics");

exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalAdmins = await User.countDocuments({ role: "admin" });
        
        // Calculate new users this week and month
        const now = new Date();
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const newUsersThisWeek = await User.countDocuments({ role: "user", createdAt: { $gte: oneWeekAgo } });
        const newUsersThisMonth = await User.countDocuments({ role: "user", createdAt: { $gte: oneMonthAgo } });

        const products = await ProductAnalytics.find({});
        const totalProducts = products.length;

        // Sort products for metrics
        const mostAddedToCart = [...products].sort((a, b) => b.cartCount - a.cartCount).slice(0, 5);
        const mostFavorited = [...products].sort((a, b) => b.likesCount - a.likesCount).slice(0, 5);
        const highestViewed = [...products].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

        // Activity totals
        const totalCartAdds = products.reduce((acc, curr) => acc + curr.cartCount, 0);
        const totalFavouriteAdds = products.reduce((acc, curr) => acc + curr.likesCount, 0);

        // Most popular category
        const categoryCounts = products.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.cartCount + curr.likesCount + curr.viewCount;
            return acc;
        }, {});
        
        let mostPopularCategory = "N/A";
        let maxScore = -1;
        for (const [cat, score] of Object.entries(categoryCounts)) {
            if (score > maxScore) {
                maxScore = score;
                mostPopularCategory = cat;
            }
        }

        // Charts Data
        const userGrowthData = await User.aggregate([
            { $match: { role: "user" } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    users: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedUserGrowth = userGrowthData.map(d => ({
            name: d._id ? months[d._id - 1] : "Unknown",
            users: d.users
        }));

        const categoryDistribution = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

        return res.status(200).json({
            success: true,
            dashboard: {
                metrics: {
                    totalUsers,
                    totalAdmins,
                    newUsersThisWeek,
                    newUsersThisMonth,
                    totalProducts,
                    totalCartAdds,
                    totalFavouriteAdds,
                    mostPopularCategory
                },
                mostAddedToCart,
                mostFavorited,
                highestViewed,
                charts: {
                    userGrowth: formattedUserGrowth,
                    categoryDistribution
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching dashboard", error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password -cart -favourites").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductAnalytics.find({}).sort({ viewCount: -1 });
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
};

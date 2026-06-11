import { createContext, useEffect, useState } from "react";
import { products as data } from "../data";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(data);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const BASE_URL = window.location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://ecomzy-shop-full-stack.onrender.com";

    // Compute max product price for slider
    const maxProductPrice = Math.ceil(Math.max(...data.map(p => p.price)) / 100) * 100;

    // Initialize price range with actual max
    useEffect(() => {
        setPriceRange([0, maxProductPrice]);
    }, []);

    // Extract all unique categories from data
    const allCategories = [...new Set(data.map(p => p.category))].sort();

    // Rehydrate user data on mount 
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`${BASE_URL}/api/v1/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else if (data.message === "Token is Invalid" || data.message === "Token missing") {
                    // Session expired or invalid
                    setUser(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchUserProfile();
    }, [BASE_URL]);

    // Persist theme to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle theme function
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    // Enhanced filter logic
    const filteredProducts = products.filter((p) => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
            return false;
        }

        // Size filter — only apply if product has sizes
        if (selectedSizes.length > 0) {
            if (p.sizes && p.sizes.length > 0) {
                const hasMatchingSize = p.sizes.some(s => selectedSizes.includes(s));
                if (!hasMatchingSize) return false;
            }
            // Products without sizes pass through (electronics, etc.)
        }

        // Price filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
            return false;
        }

        // Rating filter (using static data rating)
        if (ratingFilter > 0 && p.rating) {
            if (p.rating.rate < ratingFilter) return false;
        }

        return true;
    });

    const value = {
        loading,
        products: filteredProducts,
        allProducts: data,  // Unfiltered — for ProductDetail page lookup
        allCategories,
        maxProductPrice,
        selectedCategories,
        setSelectedCategories,
        selectedSizes,
        setSelectedSizes,
        priceRange,
        setPriceRange,
        ratingFilter,
        setRatingFilter,
        user,
        setUser,
        theme,
        toggleTheme
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
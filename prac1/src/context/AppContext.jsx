import { createContext, useEffect, useState } from "react";
import { products as data } from "../data";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(data);
    const [selectedCategories, setSelectedCategories] = useState([]);
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

    // Filter logic
    const filteredProducts =
        selectedCategories.length > 0
            ? products.filter((p) => selectedCategories.includes(p.category))
            : products;

    const value = {
        loading,
        products: filteredProducts,
        selectedCategories,
        setSelectedCategories,
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
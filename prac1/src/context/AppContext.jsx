import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // ✅ multiple selected categories
    const [user, setUser] = useState(null); // ✅ user data from backend
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage or default to 'dark'
        return localStorage.getItem('theme') || 'dark';
    });

    // API Fetch Function
    async function fetchProductData() {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error.message);
            setProducts([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    // ✅ Persist theme to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    // ✅ Toggle theme function
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    // ✅ Filter logic
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
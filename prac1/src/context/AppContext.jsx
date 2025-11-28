import { createContext, useEffect, useState } from "react";
import { products as data } from "../data";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(data);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

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
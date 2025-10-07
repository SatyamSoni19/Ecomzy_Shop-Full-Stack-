import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // ✅ multiple selected categories

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

    // ✅ Filter logic
    const filteredProducts =
        selectedCategories.length > 0
            ? products.filter((p) => selectedCategories.includes(p.category))
            : products;

    const value = {
        loading,
        products: filteredProducts,
        selectedCategories,
        setSelectedCategories
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecomzy-shop-full-stack.onrender.com";

// ========== Async Thunks ==========

// Fetch cart from MongoDB
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/cart`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) return data.cart;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add product to cart in MongoDB
export const addToCartAPI = createAsyncThunk("cart/addToCartAPI", async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/cart/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        if (data.success) return data.cart;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Remove product from cart in MongoDB
export const removeFromCartAPI = createAsyncThunk("cart/removeFromCartAPI", async (productId, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/cart/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        if (data.success) return data.cart;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Clear entire cart in MongoDB (used on checkout)
export const clearCartAPI = createAsyncThunk("cart/clearCartAPI", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/cart/clear`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) return data.cart;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// ========== Slice ==========

export const CartSlice = createSlice({
    name: "cart",
    initialState: [], // Starts empty, hydrated from API after login
    reducers: {
        // Clear cart locally (used on logout without API call)
        clearCartLocal: () => {
            return [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                return action.payload; // Replace state with fetched cart IDs
            })
            .addCase(addToCartAPI.fulfilled, (state, action) => {
                return action.payload; // Replace state with updated cart IDs from server
            })
            .addCase(removeFromCartAPI.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(clearCartAPI.fulfilled, (state, action) => {
                return action.payload; // Should be []
            });
    },
});

export const { clearCartLocal } = CartSlice.actions;
export default CartSlice.reducer;
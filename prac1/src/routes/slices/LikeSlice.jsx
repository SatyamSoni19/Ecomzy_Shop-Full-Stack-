import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecomzy-shop-full-stack.onrender.com";

// ========== Async Thunks ==========

// Fetch favourites from MongoDB
export const fetchFavourites = createAsyncThunk("like/fetchFavourites", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/favourites`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) return data.favourites;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Add product to favourites in MongoDB
export const addToFavAPI = createAsyncThunk("like/addToFavAPI", async ({ productId, title, category }, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/favourites/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, title, category }),
        });
        const data = await res.json();
        if (data.success) return data.favourites;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Remove product from favourites in MongoDB
export const removeFromFavAPI = createAsyncThunk("like/removeFromFavAPI", async (productId, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/api/v1/favourites/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        if (data.success) return data.favourites;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// ========== Slice ==========

export const LikeSlice = createSlice({
    name: "like",
    initialState: [], // Starts empty, hydrated from API after login
    reducers: {
        // Clear favourites locally (used on logout without API call)
        clearFavouritesLocal: () => {
            return [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                return action.payload; // Replace state with fetched favourite IDs
            })
            .addCase(addToFavAPI.fulfilled, (state, action) => {
                return action.payload; // Replace state with updated favourites from server
            })
            .addCase(removeFromFavAPI.fulfilled, (state, action) => {
                return action.payload;
            });
    },
});

export const { clearFavouritesLocal } = LikeSlice.actions;
export default LikeSlice.reducer;
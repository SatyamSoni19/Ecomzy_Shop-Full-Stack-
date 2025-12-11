import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage
const loadLikesFromLocalStorage = () => {
    try {
        const savedLikes = localStorage.getItem('favorites');
        return savedLikes ? JSON.parse(savedLikes) : [];
    } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
    }
};

// Save favorites to localStorage
const saveLikesToLocalStorage = (likes) => {
    try {
        localStorage.setItem('favorites', JSON.stringify(likes));
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
    }
};

export const LikeSlice = createSlice({
    name: "like",
    initialState: loadLikesFromLocalStorage(), // Load from localStorage on init
    reducers: {
        addLike: (state, action) => {
            state.push(action.payload);
            saveLikesToLocalStorage(state); // Save after adding
        },
        removeDislike: (state, action) => {
            const newState = state.filter((item) => item.id != action.payload.id);
            saveLikesToLocalStorage(newState); // Save after removing
            return newState;
        }
    }
})

export const { addLike, removeDislike } = LikeSlice.actions;
export default LikeSlice.reducer;
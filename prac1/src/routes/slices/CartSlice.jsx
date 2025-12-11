import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

export const CartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromLocalStorage(), // Load from localStorage on init
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
            saveCartToLocalStorage(state); // Save after adding
        },
        remove: (state, action) => {
            const newState = state.filter((item) => item.id != action.payload.id);
            saveCartToLocalStorage(newState); // Save after removing
            return newState;
        }
    }
})

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
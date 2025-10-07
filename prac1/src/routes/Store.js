import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./slices/CartSlice";
import { LikeSlice } from "./slices/LikeSlice";

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        like: LikeSlice.reducer,
    }
})

export default store;
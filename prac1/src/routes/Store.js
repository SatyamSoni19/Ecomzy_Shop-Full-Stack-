import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./slices/CartSlice";
import { LikeSlice } from "./slices/LikeSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer,
        like: LikeSlice.reducer,
        admin: adminReducer,
    }
})

export default store;
import { createSlice } from "@reduxjs/toolkit";

 export const LikeSlice = createSlice({
    name:"like",
    initialState:[],
    reducers: {
        addLike: (state, action) => {
            state.push(action.payload)
        },
        removeDislike: (state, action) => {
            return state.filter((item) => item.id != action.payload.id)
        }
    }
})

export const {addLike, removeDislike} = LikeSlice.actions;
export default LikeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getAllComment } from "../../apiThunk/ExpertThunk/commentThunk";
const commentSlice = createSlice({
    name: "comment",
    initialState: {
        post: [],
        loading: false,
    },
    extraReducers: {
        [getAllComment.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllComment.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.comment = action.payload;

        },
        [getAllComment.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        
    }
})
export default commentSlice.reducer;
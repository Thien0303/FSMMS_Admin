import { createSlice } from "@reduxjs/toolkit";
import { getAllReview } from "../../apiThunk/SupplierThunk/reviewThunk";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        review: [],
        loading: false,
    },
    extraReducers: {
        [getAllReview.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.review = action.payload;

        },
        [getAllReview.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        
    }
})
export default reviewSlice.reducer;
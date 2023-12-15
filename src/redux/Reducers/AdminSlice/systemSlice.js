import { createSlice } from "@reduxjs/toolkit";
import { getAllPostAdmin, getAllTop10, getAllTopPost, getAllUser } from "../../apiThunk/AdminThunk/systemThunk";
const systemSlice = createSlice({
    name: "getUser",
    initialState: {
        getUser: [],
        getPost: [],
        getSelling: [],
        getTopPost: [],
        loading: false,
    },
    extraReducers: {
        [getAllUser.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getUser = action.payload;

        },
        [getAllUser.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getAllPostAdmin.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllPostAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getPost = action.payload;

        },
        [getAllPostAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getAllTop10.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllTop10.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getSelling = action.payload;

        },
        [getAllTop10.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getAllTopPost.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllTopPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getTopPost = action.payload;

        },
        [getAllTopPost.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})
export default systemSlice.reducer;
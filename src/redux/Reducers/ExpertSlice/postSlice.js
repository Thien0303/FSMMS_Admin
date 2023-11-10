import { createSlice } from "@reduxjs/toolkit";
import { getAllPost, getAllPostDetail } from "../../apiThunk/ExpertThunk/postThunk";
const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        postDetail: [],
        loading: false,
    },
    extraReducers: {
        [getAllPost.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.post = action.payload;

        },
        [getAllPost.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getAllPostDetail.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllPostDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.postDetail = action.payload;

        },
        [getAllPostDetail.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})
export default postSlice.reducer;
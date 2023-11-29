import { createSlice } from "@reduxjs/toolkit";
import { getAllPostAdmin, getAllUser } from "../../apiThunk/AdminThunk/systemThunk";
const systemSlice = createSlice({
    name: "getUser",
    initialState: {
        getUser: [],
        getPost: [],
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
        
    }
})
export default systemSlice.reducer;
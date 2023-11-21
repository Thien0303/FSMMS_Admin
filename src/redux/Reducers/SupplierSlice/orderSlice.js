import { createSlice } from "@reduxjs/toolkit";
import { getAllFarmer } from "../../apiThunk/SupplierThunk/orderThunk";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        farmers: [],
        loading: false,
    },
    extraReducers: {
        [getAllFarmer.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllFarmer.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.farmers = action.payload;

        },
        [getAllFarmer.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        
    }
})
export default orderSlice.reducer;
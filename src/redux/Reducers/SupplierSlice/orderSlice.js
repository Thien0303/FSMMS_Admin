import { createSlice } from "@reduxjs/toolkit";
import { getAllFarmer, getAllOrder } from "../../apiThunk/SupplierThunk/orderThunk";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        farmers: [],
        order:[],
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
        [getAllOrder.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.order = action.payload;

        },
        [getAllOrder.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})
export default orderSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getAllFruitHistory } from "../../apiThunk/ExpertThunk/fruitHistoryThunk";
const fruitHistorySlice = createSlice({
    name: "fruitHistory",
    initialState: {
        fruitHistory: [],
        loading: false,
    },
    extraReducers: {
        [getAllFruitHistory.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllFruitHistory.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.weather = action.payload;

        },
        [getAllFruitHistory.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        
    }
})
export default fruitHistorySlice.reducer;
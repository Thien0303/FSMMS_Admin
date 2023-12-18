import { createSlice } from "@reduxjs/toolkit";
import { getAllCropVarietyStages, getAllCropVarities } from "../../apiThunk/AdminThunk/growthThunk";
const growthSlice = createSlice({
    name: "getUser",
    initialState: {
        getCropVarities: [],
        getCropVarityTask: [],
        loading: false,
    },
    extraReducers: {
        [getAllCropVarities.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllCropVarities.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getCropVarities = action.payload;

        },
        [getAllCropVarities.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getAllCropVarietyStages.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllCropVarietyStages.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.getCropVarityTask = action.payload;

        },
        [getAllCropVarietyStages.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})
export default growthSlice.reducer;
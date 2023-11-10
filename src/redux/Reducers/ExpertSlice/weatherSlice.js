import { createSlice } from "@reduxjs/toolkit";
import { getAllWeather, createAllWeather } from "../../apiThunk/ExpertThunk/weatherThunk";
const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weather: [],
        loading: false,
    },
    extraReducers: {
        [getAllWeather.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllWeather.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.weather = action.payload;

        },
        [getAllWeather.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        
    }
})
export default weatherSlice.reducer;
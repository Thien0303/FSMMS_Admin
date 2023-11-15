import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, createWeather } from "../../../api/Expert/weather";
export const getAllWeather = createAsyncThunk(
    "weather/getAllWeather",
    async ({ location, createdDate, userId}, thunkAPI) => {
        try {
            const response = await getWeather(location, createdDate, userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllWeather = createAsyncThunk(
    "weather/createWeather",
    async ({userId}, thunkAPI) => {
        try {
            const response = await createWeather(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
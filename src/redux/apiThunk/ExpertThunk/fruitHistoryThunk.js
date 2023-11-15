import { createAsyncThunk } from "@reduxjs/toolkit";
import {getFruitHistory, createFruitHistory } from "../../../api/Expert/fruitHistory";
export const getAllFruitHistory = createAsyncThunk(
    "fruitHistory/getAllFruitHistory",
    async ({ location, createdDate, userId }, thunkAPI) => {
        try {
            const response = await getFruitHistory(location, createdDate, userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllFruitHistory = createAsyncThunk(
    "fruitHistory/createAllFruitHistory",
    async ({userId}, thunkAPI) => {
        try {
            const response = await createFruitHistory(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalCustomer, getTotalOrder, getTotalPost, getTotalScales } from "../../../api/Admin/dashboard";
export const getAllTotalOrder = createAsyncThunk(
    "dashboard/getAllTotalOrder",
    async ({startDate, endDate}, thunkAPI) => {
        try {
            const response = await getTotalOrder(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalPost = createAsyncThunk(
    "dashboard/getAll",
    async ({startDate, endDate}, thunkAPI) => {
        try {
            const response = await getTotalPost(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalScales = createAsyncThunk(
    "dashboard/getAll",
    async ({startDate, endDate}, thunkAPI) => {
        try {
            const response = await getTotalScales(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalUser = createAsyncThunk(
    "dashboard/getAllTotalUser",
    async ({startDate, endDate}, thunkAPI) => {
        try {
            const response = await getTotalCustomer(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
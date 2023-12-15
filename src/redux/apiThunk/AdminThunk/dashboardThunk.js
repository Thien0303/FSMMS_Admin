import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderStatus,getTotalGarden, getTotalOrder, getTotalPost, getTotalScales } from "../../../api/Admin/dashboard";
export const getAllTotalOrder = createAsyncThunk(
    "dashboard/getAllTotalOrder",
    async (thunkAPI) => {
        try {
            const response = await getTotalOrder();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalPost = createAsyncThunk(
    "dashboard/getAll",
    async ( thunkAPI) => {
        try {
            const response = await getTotalPost();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalScales = createAsyncThunk(
    "dashboard/getAll",
    async ( thunkAPI) => {
        try {
            const response = await getTotalScales();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalGarden = createAsyncThunk(
    "dashboard/getAllTotalUser",
    async ( thunkAPI) => {
        try {
            const response = await getTotalGarden();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTotalOrderStatus = createAsyncThunk(
    "dashboard/getAllTotalOrderStatus",
    async ( thunkAPI) => {
        try {
            const response = await getOrderStatus();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

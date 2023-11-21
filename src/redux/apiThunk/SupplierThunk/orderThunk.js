import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getFarmer } from "../../../api/Supplier/Order";
export const createAllOrder = createAsyncThunk(
    "order/createAllOrder",
    async (data, thunkAPI) => {
        console.log("abc: ", data);
        try {
            const response = await createOrder(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllFarmer = createAsyncThunk(
    "farmer/getAllFarmer",
    async ({ fullName, roleName}, thunkAPI) => {
        try {
            const response = await getFarmer(fullName, roleName);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
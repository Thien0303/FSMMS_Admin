import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getFarmer, getOrder, updateOrder } from "../../../api/Supplier/Order";
import { toast } from "react-toastify";
export const createAllOrder = createAsyncThunk(
    "order/createAllOrder",
    async (data, thunkAPI) => {
        console.log("abc: ", data);
        try {
            const response = await createOrder(data);
            toast.success("Đặt hàng thành công, Chủ vườn sẽ liên hệ lại với bạn sau");
            return response;
        } catch (error) {
            toast.error("Tạo đơn hàng thất bại")
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
export const getAllOrder = createAsyncThunk(
    "order/getAllOrder",
    async ({ buyerUserId, sellerUserId, status}, thunkAPI) => {
        try {
            const response = await getOrder(buyerUserId, sellerUserId, status);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateAllOrder = createAsyncThunk(
    "order/updateAllOrder",
    async ({id, action}, thunkAPI) => {
        try {
            const response = await updateOrder(id, action);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
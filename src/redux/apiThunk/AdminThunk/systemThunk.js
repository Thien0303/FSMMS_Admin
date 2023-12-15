import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPostAdmin, getSellingProducts, getTopPost, getUser, updatePost } from "../../../api/Admin/system";
export const getAllUser = createAsyncThunk(
    "system/getAllUser",
    async (thunkAPI) => {
        try {
            const response = await getUser();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllPostAdmin = createAsyncThunk(
    "system/getAllPostAdmin",
    async ({postTitle}, thunkAPI) => {
        try {
            const response = await getPostAdmin(postTitle);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTop10 = createAsyncThunk(
    "system/getAllTop10",
    async (thunkAPI) => {
        try {
            const response = await getSellingProducts();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateAllPost = createAsyncThunk(
    "system/updateAllPost",
    async ({id, action}, thunkAPI) => {
        try {
            console.log("action", action);
            const response = await updatePost(id, action);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllTopPost = createAsyncThunk(
    "dashboard/getAllTopPost",
    async ( thunkAPI) => {
        try {
            const response = await getTopPost();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
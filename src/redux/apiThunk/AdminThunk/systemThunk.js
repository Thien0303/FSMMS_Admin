import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPostAdmin, getUser, updatePost } from "../../../api/Admin/system";
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
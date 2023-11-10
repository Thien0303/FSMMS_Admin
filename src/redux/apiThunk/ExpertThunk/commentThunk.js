import { createAsyncThunk } from "@reduxjs/toolkit";
import { createComment, getComment, removeComment } from "../../../api/Expert/comment"; 
export const getAllComment = createAsyncThunk(
    "comment/getAllComment",
    async ( thunkAPI) => {
        try {
            const response = await getComment();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllComment = createAsyncThunk(
    "comment/createAllComment",
    async ({data}, thunkAPI) => {
        try {
            const response = await createComment(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const removeAllComment = createAsyncThunk(
    "comment/deleteComment",
    async ({ id }, thunkAPI) => {
        try {
            const response = await removeComment(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
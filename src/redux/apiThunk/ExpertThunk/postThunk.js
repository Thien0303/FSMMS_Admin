import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPost, getPostDetail, createPost, updatePost } from "../../../api/Expert/Post";
export const getAllPost = createAsyncThunk(
    "post/getAllPost",
    async ({ postTitle}, thunkAPI) => {
        try {
            const response = await getPost(postTitle);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllPost = createAsyncThunk(
    "post/createAllPost",
    async ({data}, thunkAPI) => {
        try {
            const response = await createPost(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllPostDetail = createAsyncThunk(
    "post/getAllPostDetail",
    async ({ id}, thunkAPI) => {
        try {
            const response = await getPostDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateAllPost = createAsyncThunk(
    "post/updateAllpost",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updatePost(id, data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



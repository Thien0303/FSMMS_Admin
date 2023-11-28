import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReviewFruit, deleteReviewAPI, getReviewFruit } from "../../../api/Supplier/reviewFruit";
export const getAllReview = createAsyncThunk(
    "review/getAllReview",
    async ( {fruitId}, thunkAPI) => {
        try {
            const response = await getReviewFruit(fruitId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllReview = createAsyncThunk(
    "review/createAllReview",
    async ({data}, thunkAPI) => {
        try {
            const response = await createReviewFruit(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteReview = createAsyncThunk(
    "review/deleteReview",
    async ({ id }, thunkAPI) => {
        try {
            const response = await deleteReviewAPI(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
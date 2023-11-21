import { createAsyncThunk} from "@reduxjs/toolkit";
import { getFruit, getFruitDetail } from "../../../api/Supplier/Product";
export const getAllFruit = createAsyncThunk(
    "fruit/getAllFruit",
    async ({ fruitName, minPrice, maxPrice,newestDate}, thunkAPI) => {
        try {
            const response = await getFruit(fruitName, minPrice, maxPrice,newestDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllFruitDetail = createAsyncThunk(
    "fruit/getAllFruitDetail",
    async ({ id}, thunkAPI) => {
        try {
            const response = await getFruitDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
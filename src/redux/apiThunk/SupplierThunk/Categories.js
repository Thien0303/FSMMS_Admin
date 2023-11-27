import { createAsyncThunk} from "@reduxjs/toolkit";
import { createCategory, getCategories } from "../../../api/Supplier/categories";
export const getAllCategories = createAsyncThunk(
    "fruit/getAllFruit",
    async ({categoryName}, thunkAPI) => {
        try {
            const response = await getCategories(categoryName);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllCategory = createAsyncThunk(
    "category/createAllCategory",
    async (data, thunkAPI) => {
        console.log("abc: ", data);
        try {
            const response = await createCategory(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
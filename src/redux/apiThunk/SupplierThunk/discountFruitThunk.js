import { createAsyncThunk} from "@reduxjs/toolkit";
import { createFruitDiscount, getDiscountFruit, getDiscountSupplier } from "../../../api/Supplier/fruitDiscount";
export const getAllDiscountFruit = createAsyncThunk(
    "discountFruit/getAllDiscountFruit",
    async ({ discountName, discountExpiryDate}, thunkAPI) => {
        try {
            const response = await getDiscountFruit(discountName, discountExpiryDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllDiscoutSupplier = createAsyncThunk(
    "discountFruit/getAllDiscoutSupplier",
    async ({discountName, discountExpiryDate,  userId, fruitId}, thunkAPI) => {
        try {
            const response = await getDiscountSupplier(discountName, discountExpiryDate, userId, fruitId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllFruitDiscount = createAsyncThunk(
    "discountFruit/createAllFruitDiscount",
    async (data, thunkAPI) => {
        try {
            const response = await createFruitDiscount(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

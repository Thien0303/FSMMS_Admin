import { createAsyncThunk} from "@reduxjs/toolkit";
import { createFruit, createFruitImage, getFruit, getFruitDetail, getFruitSupplier, getFruitSupplierDetail, updateFruitSupplier } from "../../../api/Supplier/Product";
import { toast } from "react-toastify";
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
export const createAllFruit = createAsyncThunk(
    "fruit/createAllFruit",
    async (data, thunkAPI) => {
        try {
            const response = await createFruit(data);
            toast.success("Tạo sản phẩm thành công");
            return response;
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi tạo sản phẩm");
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateFruitAllSupplier = createAsyncThunk(
    "fruit/updateAllFruit",
    async ({id, data}, thunkAPI) => {
        try {
            const response = await updateFruitSupplier(id, data);
            toast.success("Cập nhật thành công");
            return response;
        } catch (error) {
            toast.error("Cập nhật thất bại");
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllFruitSupplier = createAsyncThunk(
    "fruit/getAllFruitSupplier",
    async ({fruitName, minPrice, maxPrice, newestDate, createdDate, userId}, thunkAPI) => {
        try {
            const response = await getFruitSupplier(fruitName, minPrice, maxPrice, newestDate, createdDate, userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllFruitSupplierDetail = createAsyncThunk(
    "fruit/getAllFruitSupplierDetail",
    async ({ id}, thunkAPI) => {
        try {
            const response = await getFruitSupplierDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllFruitImage = createAsyncThunk(
    "fruit/createAllFruitImage",
    async (data, thunkAPI) => {
        try {
            const response = await createFruitImage(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
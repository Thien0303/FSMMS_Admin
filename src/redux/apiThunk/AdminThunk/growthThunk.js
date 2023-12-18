import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCropVarietyGrowthTasks, createCropVarietyStages, createCropVarities, getCropVarietyStages, getCropVarities } from "../../../api/Admin/growthTask";
import { toast } from "react-toastify";
export const createAllCropVarities = createAsyncThunk(
    "growth/createAllCropVarities",
    async ({data}, thunkAPI) => {
        try {
            const response = await createCropVarities(data);
            toast.success("Tạo loại cây trồng thành công !")
            return response;
        } catch (error) {
            toast.error("Tạo loại cây trồng thất bại !")
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllCropVarietyStages = createAsyncThunk(
    "growth/createAllCropVarietyStages",
    async (data, thunkAPI) => {
        try {
            const response = await createCropVarietyStages(data);
            toast.success("Tạo giai đoạn cây trồng thành công !")
            return response;
        } catch (error) {
            toast.error("Tạo giai đoạn cây trồng thất bại !")
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createAllCropVarietyGrowthTasks = createAsyncThunk(
    "growth/createAllCropVarietyGrowthTasks",
    async (data, thunkAPI) => {
        try {
            const response = await createCropVarietyGrowthTasks(data);
            toast.success("Tạo công việc cho cây trồng thành công !")
            return response;
        } catch (error) {
            toast.error("Tạo công việc cho cây trồng thất bại !")
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllCropVarities = createAsyncThunk(
    "dashboard/getAllCropVarities",
    async ( thunkAPI) => {
        try {
            const response = await getCropVarities();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllCropVarietyStages = createAsyncThunk(
    "dashboard/getAllCropVarietyStages",
    async ( thunkAPI) => {
        try {
            const response = await getCropVarietyStages();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

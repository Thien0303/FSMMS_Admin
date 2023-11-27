import {
  getAllFruit,
  getAllFruitDetail,
  getAllFruitSupplier,
  getAllFruitSupplierDetail,
} from "../../apiThunk/SupplierThunk/fruitThunk";
import { addToCart as addToCartInCartSlice } from "./cartSlice";
import { createSlice } from "@reduxjs/toolkit";

const fruitSlice = createSlice({
  name: "products",
  initialState: {
    fruit: [],
    fruitDetail: [],
    fruitSupplier: [],
    fruitSupplierDetail: [],
    loading: false,
  },
  extraReducers: {
    [getAllFruit.pending]: (state, action) => {
      state.loading = true;
      state.loadingStatus = "loading";
    },
    [getAllFruit.fulfilled]: (state, action) => {
      state.loading = false;
      state.loadingStatus = "succeeded";
      state.fruit = action.payload;
    },
    [addToCartInCartSlice]: (state, action) => {},
    [getAllFruitDetail.pending]: (state, action) => {
      state.loading = true;
      state.loading = "loading";
    },
    [getAllFruitDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.loading = "succeeded";
      state.fruitDetail = action.payload;
    },
    [getAllFruitDetail.rejected]: (state, action) => {
      state.loading = false;
      state.loading = "failed";
    },
    [getAllFruitSupplier.pending]: (state, action) => {
      state.loading = true;
      state.loading = "loading";
    },
    [getAllFruitSupplier.fulfilled]: (state, action) => {
      state.loading = false;
      state.loading = "succeeded";
      state.fruitSupplier = action.payload;
    },
    [getAllFruitSupplier.rejected]: (state, action) => {
      state.loading = false;
      state.loading = "failed";
    },
    [getAllFruitSupplierDetail.pending]: (state, action) => {
      state.loading = true;
      state.loading = "loading";
    },
    [getAllFruitSupplierDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.loading = "succeeded";
      state.fruitSupplierDetail = action.payload;
    },
    [getAllFruitSupplierDetail.rejected]: (state, action) => {
      state.loading = false;
      state.loading = "failed";
    },
  },
});

export default fruitSlice.reducer;

import { getAllDiscountFruit } from "../../apiThunk/SupplierThunk/discountFruitThunk";
import { createSlice } from "@reduxjs/toolkit";

const discountFruitSlice = createSlice({
  name: "discountFruit",
  initialState: {
    discountFruit: [],
    loading: false,
  },
  extraReducers: {
    [getAllDiscountFruit.pending]: (state, action) => {
      state.loading = true;
      state.loadingStatus = "loading";
    },
    [getAllDiscountFruit.fulfilled]: (state, action) => {
      state.loading = false;
      state.loadingStatus = "succeeded";
      state.discountFruit = action.payload;
    },
  },
});

export default discountFruitSlice.reducer;

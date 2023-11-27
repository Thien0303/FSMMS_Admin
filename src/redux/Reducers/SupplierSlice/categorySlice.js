import { getAllCategories } from "../../apiThunk/SupplierThunk/Categories";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
  },
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.loading = true;
      state.loadingStatus = "loading";
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.loadingStatus = "succeeded";
      state.category = action.payload;
    },
  },
});

export default categorySlice.reducer;

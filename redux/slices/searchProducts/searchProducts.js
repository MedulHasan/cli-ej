import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    searchProducts: [],
    loading: true,
};

export const getsearchProducts = createAsyncThunk(
    "items/getsearchProducts",
    async (URL) => {
        const products = await fetchGetItem(URL);
        return products?.response;
    }
);

const searchProductsSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [getsearchProducts.pending]: (state) => {
            state.loading = true;
        },
        [getsearchProducts.fulfilled]: (state, action) => {
            state.searchProducts = action.payload;
            state.loading = false;
        },
        [getsearchProducts.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default searchProductsSlice.reducer;

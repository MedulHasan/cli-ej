import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    popularProducts: [],
    loading: true,
};

export const getpopularProducts = createAsyncThunk(
    "items/getpopularProducts",
    async (URL) => {
        const data = await fetchGetItem(URL);
        return data?.response?.records?.data;
    }
);

const popularProductsSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [getpopularProducts.pending]: (state) => {
            state.loading = true;
        },
        [getpopularProducts.fulfilled]: (state, action) => {
            state.popularProducts = action.payload;
            state.loading = false;
        },
        [getpopularProducts.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default popularProductsSlice.reducer;

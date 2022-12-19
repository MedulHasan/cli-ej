import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    bestSellers: [],
    loading: true,
};

export const getbestSellers = createAsyncThunk(
    "items/getbestSellers",
    async (URL) => {
        const data = await fetchGetItem(URL);
        return data?.response?.records?.data;
    }
);

const bestSellersSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [getbestSellers.pending]: (state) => {
            state.loading = true;
        },
        [getbestSellers.fulfilled]: (state, action) => {
            state.bestSellers = action.payload;
            state.loading = false;
        },
        [getbestSellers.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default bestSellersSlice.reducer;

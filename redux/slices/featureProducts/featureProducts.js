import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    featureProducts: [],
    loading: true,
    nextPageUrl: "",
    loadMore: true,
};

export const getFeatureProducts = createAsyncThunk(
    "items/getFeatureProducts",
    async (URL) => {
        const response = await fetchGetItem(URL);
        const { data, pagination: { next_page_url } = {} } =
            response?.response?.records;
        return { data, next_page_url };
    }
);

const featureProductsSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [getFeatureProducts.pending]: (state) => {
            if (state.nextPageUrl === "" && state.nextPageUrl !== null) {
                state.loading = true;
            } else if (state.nextPageUrl) {
                state.loadMore = true;
            }
        },
        [getFeatureProducts.fulfilled]: (state, action) => {
            state.featureProducts = [
                ...state.featureProducts,
                ...action.payload.data,
            ];
            state.nextPageUrl = action.payload.next_page_url;
            state.loading = false;
            state.loadMore = false;
        },
        [getFeatureProducts.rejected]: (state) => {
            state.loading = false;
            state.loadMore = false;
        },
    },
});

export default featureProductsSlice.reducer;

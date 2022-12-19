import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    topCategory: [],
    loading: true,
};

const URL = `${config.BASE_API_URL}/user/categories/top`;

export const getTopCategory = createAsyncThunk(
    "items/getTopCategory",
    async () => {
        const data = await fetchGetItem(URL);
        return data?.response?.records?.data;
    }
);

const topCategorySlice = createSlice({
    name: "items",
    initialState,
    extraReducers: {
        [getTopCategory.pending]: (state) => {
            state.loading = true;
        },
        [getTopCategory.fulfilled]: (state, action) => {
            state.topCategory = action.payload;
            state.loading = false;
        },
        [getTopCategory.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default topCategorySlice.reducer;

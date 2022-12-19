import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetItem } from "../../util/fetchGetItem";

const initialState = {
    Reviews: [],
    loading: true,
    isRefresh: false,
};

export const getReviews = createAsyncThunk(
    "product/getReviews",
    async (URL) => {
        const data = await fetchGetItem(URL);
        return data?.response?.records?.data;
    }
);

const getReviewsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchReviewStart: (state) => {
            state.isRefresh = true;
        },
        getReviewsSuccree: (state, { payload }) => {
            state.Reviews = payload;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getReviews.pending]: (state) => {
            state.loading = true;
        },
        [getReviews.fulfilled]: (state, { payload }) => {
            state.Reviews = payload;
            state.loading = false;
        },
        [getReviews.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchReviewStart, getReviewsSuccree } = getReviewsSlice.actions;
export default getReviewsSlice.reducer;

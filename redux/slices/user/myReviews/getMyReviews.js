import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../util/fetchUserInfo";

const initialState = {
    myReviews: [],
    loading: true,
    isRefresh: false,
};

export const getMyReviews = createAsyncThunk(
    "user/getMyReviews",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);

const getMyReviewsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchReviewStart: (state) => {
            state.isRefresh = true;
        },
        getMyReviewsSuccree: (state, { payload }) => {
            state.myReviews = payload;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyReviews.pending]: (state) => {
            state.loading = true;
        },
        [getMyReviews.fulfilled]: (state, { payload }) => {
            state.myReviews = payload;
            state.loading = false;
        },
        [getMyReviews.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchReviewStart, getMyReviewsSuccree } =
    getMyReviewsSlice.actions;
export default getMyReviewsSlice.reducer;

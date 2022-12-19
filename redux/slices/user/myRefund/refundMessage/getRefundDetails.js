import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../util/fetchUserInfo";

const initialState = {
    refundDetails: {},
    loading: true,
    isRefresh: false,
};

export const getRefundDetails = createAsyncThunk(
    "user/getRefundDetails",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);
export const getRefundMessage = createAsyncThunk(
    "user/getMyRefundsMessage",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);

const getRefundDetailsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchRefundMessageStart: (state) => {
            state.isRefresh = true;
        },
        getRefundMessageSuccree: (state, { payload }) => {
            state.refundDetails = payload;
            state.loading = false;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getRefundDetails.pending]: (state) => {
            state.loading = true;
        },
        [getRefundDetails.fulfilled]: (state, { payload }) => {
            state.refundDetails = payload;
            state.loading = false;
        },
        [getRefundDetails.rejected]: (state) => {
            state.loading = false;
        },
        [getRefundMessage.pending]: (state) => {
            state.loading = false;
        },
        [getRefundMessage.fulfilled]: (state, { payload }) => {
            state.refundDetails.chat.data = payload;
            state.loading = false;
        },
        [getRefundMessage.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchRefundMessageStart, getRefundMessageSuccree } =
    getRefundDetailsSlice.actions;
export default getRefundDetailsSlice.reducer;

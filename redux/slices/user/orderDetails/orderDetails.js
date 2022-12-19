import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../util/fetchUserInfo";

const initialState = {
    orderDetails: {},
    loading: false,
};

export const getOrderDetails = createAsyncThunk(
    "user/getOrderDetails",
    async (obj) => {
        const { access_token, URL } = obj;
        return await getUserInfo(access_token, URL);
    }
);

const getOrderDetailsSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [getOrderDetails.pending]: (state) => {
            state.loading = true;
        },
        [getOrderDetails.fulfilled]: (state, { payload }) => {
            state.orderDetails = payload;
            state.loading = false;
        },
        [getOrderDetails.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default getOrderDetailsSlice.reducer;

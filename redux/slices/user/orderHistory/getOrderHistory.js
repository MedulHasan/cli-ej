import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../util/fetchUserInfo";

const initialState = {
    myOrders: [],
    loading: true,
    isRefresh: false,
};

export const getMyOrders = createAsyncThunk(
    "user/getMyOrders",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        const res = await getUserInfo(access_token, URL);
        return res;
    }
);

const getMyOrdersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchOrderStart: (state) => {
            state.isRefresh = true;
        },
        getOrderSuccrss: (state, { payload }) => {
            state.myOrders = payload;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyOrders.pending]: (state) => {
            state.loading = true;
        },
        [getMyOrders.fulfilled]: (state, { payload }) => {
            state.myOrders = payload;
            state.loading = false;
        },
        [getMyOrders.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchOrderStart, getOrderSuccrss } = getMyOrdersSlice.actions;

export default getMyOrdersSlice.reducer;

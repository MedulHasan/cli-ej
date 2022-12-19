import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../user/util/fetchUserInfo";

const initialState = {
    orderLoading: false,
    message: "",
    orderDetails: {},
};

export const postOrders = createAsyncThunk("orders/postOrders", async (obj) => {
    const { access_token, orderPostUrl, orderData } = obj;
    try {
        const res = await postUserInfo(
            access_token,
            orderPostUrl,
            "POST",
            orderData
        );
        const { status: { code, message } = {}, records } = res;
        if (code === 200) {
            return { message, records };
        }
    } catch (err) {}
});

const postOrdersSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: {
        [postOrders.pending]: (state) => {
            state.orderLoading = true;
        },
        [postOrders.fulfilled]: (state, { message, records }) => {
            state.orderLoading = false;
            state.message = message;
            state.orderDetails = records?.data;
            // state.totalProduct = payload.totalProduct;
        },
        [postOrders.rejected]: (state) => {
            state.orderLoading = false;
        },
    },
});

export default postOrdersSlice.reducer;

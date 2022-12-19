import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../user/util/fetchUserInfo";

const initialState = {
    data: {},
    cartLoading: false,
    message: "",
    totalProduct: 0,
};

export const storeItemInCart = createAsyncThunk(
    "cart/storeItemInCart",
    async (obj) => {
        const { access_token, storeItemInCartUrl, cartData } = obj;
        try {
            const res = await postUserInfo(
                access_token,
                storeItemInCartUrl,
                "POST",
                cartData
            );
            const {
                status: { code } = {},
                records: { data: { message, totalProduct } = {} } = {},
            } = res;
            if (code === 200) {
                return { message, totalProduct };
            } else {
                return {
                    message: "Something went wrong!",
                    totalProduct: initialState.totalProduct,
                };
            }
        } catch (err) {
            return {
                message: "Something went wrong!",
                totalProduct: initialState.totalProduct,
            };
        }
    }
);

const storeItemInCartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [storeItemInCart.pending]: (state) => {
            state.cartLoading = true;
        },
        [storeItemInCart.fulfilled]: (state, { payload }) => {
            state.cartLoading = false;
            state.message = payload.message;
            state.totalProduct = payload.totalProduct;
        },
        [storeItemInCart.rejected]: (state) => {
            state.cartLoading = false;
        },
    },
});

export default storeItemInCartSlice.reducer;

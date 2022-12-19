import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../user/util/fetchUserInfo";

const initialState = {
    cart_Data: {},
    cartDataLength: 0,
    cartLoading: true,
    isError: false,
    error: "",
};

export const getCartProduct = createAsyncThunk(
    "cart/getCartProduct",
    async (obj) => {
        const { access_token, CARTURL } = obj;
        const response = await getUserInfo(access_token, CARTURL);
        return response;
    }
);

const cartProductSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        deleteItemFromCart: (state, { payload }) => {
            const restData = state.cart_Data?.cartData.filter(
                (data) => data.index != payload
            );
            state.cart_Data = {
                ...state.cart_Data,
                cartData: restData,
            };
        },
        deleteGroupItemsFromCart: (state, { payload }) => {
            const restData = state.cart_Data?.cartData.filter(
                (data) => !payload.includes(data.index)
            );
            state.cart_Data = {
                ...state.cart_Data,
                cartData: restData,
            };
        },
    },
    extraReducers: {
        [getCartProduct.pending]: (state) => {
            state.cartLoading = true;
        },
        [getCartProduct.fulfilled]: (state, { payload }) => {
            state.cart_Data = payload;
            state.cartDataLength = payload?.cartData?.length;
            state.cartLoading = false;
            state.isError = false;
        },
        [getCartProduct.rejected]: (state, { payload }) => {
            state.cartLoading = false;
            state.isError = true;
            state.error = payload;
        },
    },
});

export default cartProductSlice.reducer;
export const { deleteItemFromCart, deleteGroupItemsFromCart } =
    cartProductSlice.actions;

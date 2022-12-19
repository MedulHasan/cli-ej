import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../user/util/fetchUserInfo";

const initialState = {
    data: undefined,
};

export const decrementQtyFromCart = createAsyncThunk(
    "cart/decrementQtyFromCart",
    async (obj) => {
        const { access_token, decrementUrl, method, data } = obj;
        const response = await postUserInfo(
            access_token,
            decrementUrl,
            method,
            data
        );

        const { status: { code } = {}, records: { data: newData } = {} } =
            response;
        if (code === 200) {
            return newData;
        }
    }
);

const decrementQtyFromCartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [decrementQtyFromCart.pending]: (state) => {},
        [decrementQtyFromCart.fulfilled]: (state, { payload }) => {},
        [decrementQtyFromCart.rejected]: (state) => {},
    },
});

export default decrementQtyFromCartSlice.reducer;

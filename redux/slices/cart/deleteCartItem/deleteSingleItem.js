import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../../user/util/fetchUserInfo";

const initialState = {
    message: "",
    totalPrice: 0,
};

export const deleteSingleItem = createAsyncThunk(
    "cart/deleteSingleItem",
    async (obj) => {
        const { access_token, deleteURL, method, data } = obj;
        const response = await postUserInfo(
            access_token,
            deleteURL,
            method,
            data
        );
        const {
            status: { code } = {},
            records: { data: { message, totalPrice } = {} } = {},
        } = response;
        if (code === 200) {
            return { message, totalPrice };
        }
    }
);

const deleteSingleItemSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [deleteSingleItem.pending]: (state) => {},
        [deleteSingleItem.fulfilled]: (state, { payload }) => {},
        [deleteSingleItem.rejected]: (state) => {},
    },
});

export default deleteSingleItemSlice.reducer;

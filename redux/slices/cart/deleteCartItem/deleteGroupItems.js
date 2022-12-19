import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../../user/util/fetchUserInfo";

const initialState = {
    message: "",
    totalPrice: 0,
};

export const deleteGroupItems = createAsyncThunk(
    "cart/deleteGroupItems",
    async (obj) => {
        const { access_token, deleteGroupURL, method, data } = obj;
        const response = await postUserInfo(
            access_token,
            deleteGroupURL,
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

const deleteGroupItemsSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [deleteGroupItems.pending]: (state) => {},
        [deleteGroupItems.fulfilled]: (state, { payload }) => {},
        [deleteGroupItems.rejected]: (state) => {},
    },
});

export default deleteGroupItemsSlice.reducer;

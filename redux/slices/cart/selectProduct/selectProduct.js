import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../../user/util/fetchUserInfo";

const initialState = {
    data: {},
    loading: false,
};

export const postSelectProduct = createAsyncThunk(
    "cart/postSelectProduct",
    async (params) => {
        const { access_token, selectURL, method, data } = params;
        const response = await postUserInfo(
            access_token,
            selectURL,
            method,
            data
        );
        const { records: { data: resData } = {}, status: { code } = {} } =
            response;
        if (code === 200) {
            return resData;
        }
    }
);

const postSelectProductSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: {
        [postSelectProduct.pending]: (state) => {
            state.loading = true;
        },
        [postSelectProduct.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
        },
        [postSelectProduct.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postSelectProductSlice.reducer;

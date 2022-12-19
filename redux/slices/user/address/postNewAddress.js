import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfo } from "../util/fetchUserInfo";

const initialState = {
    newAddress: {},
    loading: false,
};

export const postNewAddress = createAsyncThunk(
    "user/postNewAddress",
    async (obj) => {
        try {
            const { access_token, URL, method, address } = obj;
            const data = await postUserInfo(access_token, URL, method, address);
            return data;
        } catch (err) {
            return;
        }
    }
);

const postNewAddressSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [postNewAddress.pending]: (state) => {
            state.loading = true;
        },
        [postNewAddress.fulfilled]: (state, { payload }) => {
            state.newAddress = payload;
            state.loading = false;
        },
        [postNewAddress.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postNewAddressSlice.reducer;

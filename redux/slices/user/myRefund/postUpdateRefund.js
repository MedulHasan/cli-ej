import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfoWithFormData } from "../util/fetchUserInfo";

const initialState = {
    newRefund: {},
    loading: false,
};

export const postNewRefund = createAsyncThunk(
    "user/postNewRefund",
    async (obj) => {
        try {
            const { access_token, urlPost, method, formData } = obj;
            // console.log(urlPost, method, newRefundInfo);
            const data = await postUserInfoWithFormData(
                access_token,
                urlPost,
                method,
                formData
            );

            return data;
        } catch (err) {
            return;
        }
    }
);

const postNewRefundSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [postNewRefund.pending]: (state) => {
            state.loading = true;
        },
        [postNewRefund.fulfilled]: (state, { payload }) => {
            state.newRefund = payload;
            state.loading = false;
        },
        [postNewRefund.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postNewRefundSlice.reducer;

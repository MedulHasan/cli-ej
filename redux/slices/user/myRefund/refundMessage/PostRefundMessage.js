import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfoWithFormData } from "../../util/fetchUserInfo";

const initialState = {
    newRefundMessage: {},
    loading: false,
};

export const postRefundMessage = createAsyncThunk(
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

const postRefundMessageSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [postRefundMessage.pending]: (state) => {
            state.loading = true;
        },
        [postRefundMessage.fulfilled]: (state, { payload }) => {
            state.newRefundMessage = payload;
            state.loading = false;
        },
        [postRefundMessage.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postRefundMessageSlice.reducer;

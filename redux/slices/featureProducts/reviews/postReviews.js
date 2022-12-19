import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserInfoWithFormData } from "../../user/util/fetchUserInfo";

const initialState = {
    newReview: {},
    loading: false,
};

export const postReview = createAsyncThunk("user/postReview", async (obj) => {
    try {
        const { access_token, URL, method, formData } = obj;
        const data = await postUserInfoWithFormData(
            access_token,
            URL,
            method,
            formData
        );
        return data;
    } catch (err) {
        return;
    }
});

const postReviewSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [postReview.pending]: (state) => {
            state.loading = true;
        },
        [postReview.fulfilled]: (state, { payload }) => {
            state.newReview = payload;
            state.loading = false;
        },
        [postReview.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postReviewSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../../config";
import { postUserInfoWithFormData } from "../util/fetchUserInfo";

const URL = `${config.BASE_API_URL}/user/profile/update`;

const initialState = {
    postUserInfo: null,
    loading: false,
};

export const postUpdateUserProfile = createAsyncThunk(
    "user/postUpdateUserProfile",
    async (obj) => {
        try {
            const { access_token, formData } = obj;
            const data = await postUserInfoWithFormData(
                access_token,
                URL,
                "POST",
                formData
            );
            return data;
        } catch (err) {
            return;
        }
    }
);

const postUpdateUserProfileSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [postUpdateUserProfile.pending]: (state) => {
            state.loading = true;
        },
        [postUpdateUserProfile.fulfilled]: (state, { payload }) => {
            state.postUserInfo = payload;
            state.loading = false;
        },
        [postUpdateUserProfile.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default postUpdateUserProfileSlice.reducer;

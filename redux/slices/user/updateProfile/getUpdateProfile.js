import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../../config";
import { getUserInfo } from "../util/fetchUserInfo";

const URL = `${config.BASE_API_URL}/user/profile`;

const initialState = {
    userInfo: null,
    loading: true,
    isRefresh: false,
};

export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (access_token) => {
        let usetInfo = await getUserInfo(access_token, URL);
        return usetInfo;
    }
);

const updateUserProfileSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUpdateUserInfoStart: (state) => {
            state.isRefresh = true;
        },
        getUpdateUserInfo: (state) => {
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [updateUserProfile.pending]: (state) => {
            state.loading = true;
        },
        [updateUserProfile.fulfilled]: (state, { payload }) => {
            state.userInfo = payload;
            state.loading = false;
        },
        [updateUserProfile.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchUpdateUserInfoStart, getUpdateUserInfo } =
    updateUserProfileSlice.actions;

export default updateUserProfileSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../../config";
import { getUserInfo } from "../util/fetchUserInfo";

const URL = `${config.BASE_API_URL}/user/addresses`;

const initialState = {
    myAddresses: [],
    loading: true,
    isRefresh: false,
};

export const getMyAddress = createAsyncThunk(
    "user/getMyAddress",
    async (access_token) => {
        return await getUserInfo(access_token, URL);
    }
);

const getMyAddressSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchAddressStart: (state) => {
            state.isRefresh = true;
        },
        getMyAddressWithoutLoading: (state, { payload }) => {
            state.myAddresses = payload;
            state.loading = false;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyAddress.pending]: (state) => {
            state.loading = true;
        },
        [getMyAddress.fulfilled]: (state, { payload }) => {
            state.myAddresses = payload;
            state.loading = false;
        },
        [getMyAddress.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchAddressStart, getMyAddressWithoutLoading } =
    getMyAddressSlice.actions;

export default getMyAddressSlice.reducer;

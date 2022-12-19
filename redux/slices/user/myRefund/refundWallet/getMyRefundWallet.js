import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../util/fetchUserInfo";

const initialState = {
    myRefundsWallet: [],
    loading: true,
    isRefresh: false,
};

export const getMyRefundWallet = createAsyncThunk(
    "user/getMyRefundWallet",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);

const getMyRefundWalletSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchRefundStart: (state) => {
            state.isRefresh = true;
        },
        getMyRefundWalletSuccree: (state, { payload }) => {
            state.myRefundsWallet = payload;
            state.loading = false;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyRefundWallet.pending]: (state) => {
            state.loading = true;
        },
        [getMyRefundWallet.fulfilled]: (state, { payload }) => {
            state.myRefundsWallet = payload;
            state.loading = false;
        },
        [getMyRefundWallet.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchRefundStart, getMyRefundWalletSuccree } =
    getMyRefundWalletSlice.actions;
export default getMyRefundWalletSlice.reducer;

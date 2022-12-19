import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../util/fetchUserInfo";

const initialState = {
    myRefunds: [],
    loading: true,
    isRefresh: false,
};

export const getMyRefunds = createAsyncThunk(
    "user/getMyRefunds",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);

const getMyRefundsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchRefundStart: (state) => {
            state.isRefresh = true;
        },
        getMyRefundsSuccree: (state, { payload }) => {
            state.myRefunds = payload;
            state.loading = false;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyRefunds.pending]: (state) => {
            state.loading = true;
        },
        [getMyRefunds.fulfilled]: (state, { payload }) => {
            state.myRefunds = payload;
            state.loading = false;
        },
        [getMyRefunds.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchRefundStart, getMyRefundsSuccree } =
    getMyRefundsSlice.actions;
export default getMyRefundsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../util/fetchUserInfo";

const initialState = {
    myFilterRefunds: {},
    loading: true,
    isRefresh: false,
};

export const getFilterRefunds = createAsyncThunk(
    "user/getMyRefunds",
    async (dataObj) => {
        const { access_token, URL } = dataObj;
        return await getUserInfo(access_token, URL);
    }
);

const getFilterRefundsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchFilterRefundStart: (state) => {
            state.isRefresh = true;
        },
        getFilterRefundsSuccree: (state, { payload }) => {
            state.myFilterRefunds = payload;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getFilterRefunds.pending]: (state) => {
            state.loading = true;
        },
        [getFilterRefunds.fulfilled]: (state, { payload }) => {
            state.myFilterRefunds = payload;
            state.loading = false;
        },
        [getFilterRefunds.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchFilterRefundStart, getFilterRefundsSuccree } =
    getFilterRefundsSlice.actions;
export default getFilterRefundsSlice.reducer;

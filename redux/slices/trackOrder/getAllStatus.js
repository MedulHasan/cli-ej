import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    allStatus: {},
    loading: false,
};

export const getAllOrderStatus = createAsyncThunk(
    "orders/getAllOrderStatus",
    async ({ URL }) => {
        const result = await fetchGetItem(URL);
        return result?.response;
    }
);

const getAllOrderStatusSlice = createSlice({
    name: "allOrderStatus",
    initialState,
    extraReducers: {
        [getAllOrderStatus.pending]: (state) => {
            state.loading = true;
        },
        [getAllOrderStatus.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.allStatus = payload;
        },
        [getAllOrderStatus.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default getAllOrderStatusSlice.reducer;

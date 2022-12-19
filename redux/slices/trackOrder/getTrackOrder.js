import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetItem } from "../util/fetchGetItem";

const initialState = {
    myTrackOrders: {},
    loading: false,
};

export const getTrackOrders = createAsyncThunk(
    "orders/getTrackOrders",
    async ({ URL }) => {
        const result = await fetchGetItem(URL);
        return result?.response;
    }
);

const getTrackOrdersSlice = createSlice({
    name: "trackOrders",
    initialState,
    extraReducers: {
        [getTrackOrders.pending]: (state) => {
            state.loading = true;
        },
        [getTrackOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myTrackOrders = payload;
        },
        [getTrackOrders.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default getTrackOrdersSlice.reducer;

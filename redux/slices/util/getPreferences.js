import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config";
import { fetchGetItem } from "./fetchGetItem";

const initialState = {
    allPreferences: {},
    loading: false,
};

export const getPreferences = createAsyncThunk("getPreferences", async () => {
    const URL = `${config.BASE_API_URL}/preferences`;
    const result = await fetchGetItem(URL);
    if (result?.response?.status?.code === 200) {
        return result?.response?.records?.data;
    }
});

const getAllPreferences = createSlice({
    name: "getPreferences",
    initialState,
    extraReducers: {
        [getPreferences.pending]: (state) => {
            state.loading = true;
        },
        [getPreferences.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.allPreferences = payload;
        },
        [getPreferences.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export default getAllPreferences.reducer;

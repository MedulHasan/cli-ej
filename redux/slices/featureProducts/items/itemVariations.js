import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const variationSlice = createSlice({
    name: "itemVariation",
    initialState,
    reducers: {
        variation: (state, { payload }) => {
            state[payload?.key] = payload?.value;
        },
    },
});

export const { variation } = variationSlice.actions;

export default variationSlice.reducer;

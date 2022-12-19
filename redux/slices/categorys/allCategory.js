import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config";
import { fetchGetItem } from "../util/fetchGetItem";

const URL = `${config.BASE_API_URL}/user/categories/all`;

const initialState = {
    allCategory: [],
    loading: true,
    isRefresh: false,
};

export const getAllCategory = createAsyncThunk(
    "items/getAllCategory",
    async () => {
        const data = await fetchGetItem(URL);
        return data?.response?.records?.data;
    }
);

const allCategorySlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        fetchCategoryStart: (state) => {
            state.isRefresh = true;
        },
        getAllCategoryWithoutLoading: (state, action) => {
            state.allCategory = action.payload;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getAllCategory.pending]: (state) => {
            state.loading = true;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.allCategory = action.payload;
            state.loading = false;
        },
        [getAllCategory.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchCategoryStart, getAllCategoryWithoutLoading } =
    allCategorySlice.actions;

export default allCategorySlice.reducer;

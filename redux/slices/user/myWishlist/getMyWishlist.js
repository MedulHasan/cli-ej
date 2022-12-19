import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../util/fetchUserInfo";

const initialState = {
    myWishlist: [],
    loading: true,
    isRefresh: false,
};

export const getMyWishlist = createAsyncThunk(
    "user/getMyWishlist",
    async ({ access_token, URL }) => {
        return await getUserInfo(access_token, URL);
    }
);

const getMyWishlistSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchWishlistStart: (state) => {
            state.isRefresh = true;
        },
        getMyAllWishlist: (state, { payload }) => {
            state.myWishlist = payload;
            state.loading = false;
            state.isRefresh = false;
        },
    },
    extraReducers: {
        [getMyWishlist.pending]: (state) => {
            state.loading = true;
        },
        [getMyWishlist.fulfilled]: (state, { payload }) => {
            state.myWishlist = payload;
            state.loading = false;
        },
        [getMyWishlist.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const { fetchWishlistStart, getMyAllWishlist } =
    getMyWishlistSlice.actions;

export default getMyWishlistSlice.reducer;

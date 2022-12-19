import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postUserInfoWithFormData } from '../util/fetchUserInfo';

const initialState = {
	newReview: {},
	loading: false,
};

export const postNewReview = createAsyncThunk(
	'user/postNewReview',
	async (obj) => {
		try {
			const { access_token, updateRevUrl, method, formData } = obj;
			const data = await postUserInfoWithFormData(
				access_token,
				updateRevUrl,
				method,
				formData
			);
			return data;
		} catch (err) {
			return;
		}
	}
);

const postNewReviewSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[postNewReview.pending]: (state) => {
			state.loading = true;
		},
		[postNewReview.fulfilled]: (state, { payload }) => {
			state.newReview = payload;
			state.loading = false;
		},
		[postNewReview.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default postNewReviewSlice.reducer;

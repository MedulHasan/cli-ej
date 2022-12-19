import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isItemModalVisible: {
        show: false,
        text: "",
    },
};

export const toastModalSlice = createSlice({
    name: "toastModal",
    initialState,
    reducers: {
        setIsItemModalVisible: (state, { payload }) => {
            state.isItemModalVisible.show = payload.show;
            state.isItemModalVisible.text = payload.text;
        },
    },
});

export const { setQuantity, setIsItemModalVisible } = toastModalSlice.actions;

export default toastModalSlice.reducer;

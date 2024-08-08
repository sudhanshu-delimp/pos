import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: {},
    storeOrderId : ""
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        saveCustomer: (state, action) => {
            state.customer = action.payload;
        },
        saveStoreOrderId: (state, action) => {
            state.storeOrderId = action.payload;
        },
    },
});

export const { saveCustomer , saveStoreOrderId } = appSlice.actions;

export default appSlice.reducer;
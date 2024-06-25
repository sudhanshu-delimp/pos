import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventory: null,
    invoiceId: "",
    quotation: null,
    customerId: "",
    notificationId: "",
    serviceId: "",
    sidebarOpen : true
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        saveInventory: (state, action) => {
            state.inventory = action.payload;
        },
        setSideBar: (state, action) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { saveInventory, saveInvoiceId, saveQuotation, saveCustomerId, saveNotificationId, saveServiceId , setSideBar } =
    appSlice.actions;

export default appSlice.reducer;

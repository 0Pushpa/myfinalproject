import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadNotifications: 0,
  status: "",
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotification: (state, action) => {
      state.notifications = action.payload;
      state.unreadNotifications = 0;
      state.status = "NOTIFICATION_RECEIVED";
    },
    setNotification: (state) => {
      state.unreadNotifications += 1;
      state.status = "NOTIFICATION_UPDATED";
    },
    resetNotification: (state) => {
      state.unreadNotifications = 0;
      state.status = "NOTIFICATION_RESET";
    },
    errorNotification: (state) => {
      state.status = "NOTIFICATION_ERROR";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getNotification,
  setNotification,
  resetNotification,
  errorNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;

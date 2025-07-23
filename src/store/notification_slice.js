import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import notificationService from '../services/notification'; // To be implemented

export const fetchNotifications = createAsyncThunk('notification/fetch', async () => {
  // return await notificationService.getNotifications();
  return { notifications: [] };
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notifications: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.notifications;
      });
  }
});
export default notificationSlice.reducer;
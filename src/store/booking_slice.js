import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import bookingService from '../services/booking'; // To be implemented

export const fetchBookings = createAsyncThunk('booking/fetch', async () => {
  // return await bookingService.getBookings();
  return { bookings: [] };
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { bookings: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.bookings;
      });
  }
});
export default bookingSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth_slice/auth';
import walletReducer from './wallet_slice';
import bookingReducer from './booking_slice';
import notificationReducer from './notification_slice';
import userReducer from './user_slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    booking: bookingReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;

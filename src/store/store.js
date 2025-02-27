import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice/auth";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    status: "idle",
    error: null
};

const authsllice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {

    },
    logout: (state, action) => {

    },
  },
});

export const {login ,logout}=authsllice.actions;
export default authsllice.reducer;

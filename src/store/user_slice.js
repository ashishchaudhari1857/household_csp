import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import userService from '../services/user'; // To be implemented

export const fetchUsers = createAsyncThunk('user/fetch', async () => {
  // return await userService.getUsers();
  return { users: [] };
});

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      });
  }
});
export default userSlice.reducer;
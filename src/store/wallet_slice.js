import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import walletService from '../services/wallet'; // To be implemented

export const fetchWallet = createAsyncThunk('wallet/fetch', async () => {
  // return await walletService.getWallet();
  return { balance: 0, transactions: [] };
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState: { balance: 0, transactions: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions;
      });
  }
});
export default walletSlice.reducer;
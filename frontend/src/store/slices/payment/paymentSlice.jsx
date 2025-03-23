import { createSlice } from "@reduxjs/toolkit";
import { fetchDepositAddress, verifyPayment } from "./paymentThunks";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepositAddress.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(fetchDepositAddress.fulfilled, (state) => {
        state.paymentLoading = false;
      })
      .addCase(fetchDepositAddress.rejected, (state) => {
        state.paymentLoading = false;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.paymentLoading = false;
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.paymentLoading = false;
      });
  },
});

export default paymentSlice.reducer;

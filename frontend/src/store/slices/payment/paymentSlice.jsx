import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./paymentThunks";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default paymentSlice.reducer;

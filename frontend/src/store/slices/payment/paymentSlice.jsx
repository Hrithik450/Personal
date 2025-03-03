import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    emailLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default paymentSlice.reducer;

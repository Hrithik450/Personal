import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./slices/payment/paymentSlice";

const store = configureStore({
  reducer: {
    paymentReducer: paymentReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./slices/payment/paymentSlice";
import feedbackReducer from "./slices/payment/paymentSlice";

const store = configureStore({
  reducer: {
    paymentReducer: paymentReducer,
    feedbackReducer: feedbackReducer,
  },
});

export default store;

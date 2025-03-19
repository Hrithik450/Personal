import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./slices/payment/paymentSlice";
import feedbackReducer from "./slices/feedback/feedbackSlice";
import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    paymentReducer: paymentReducer,
    feedbackReducer: feedbackReducer,
    authReducer: authReducer,
  },
});

export default store;

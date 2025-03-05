import { createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedbackThunks";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbackLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.feedbackLoading = true;
      })
      .addCase(createFeedback.fulfilled, (state) => {
        state.feedbackLoading = false;
      })
      .addCase(createFeedback.rejected, (state) => {
        state.feedbackLoading = false;
      });
  },
});

export default feedbackSlice.reducer;

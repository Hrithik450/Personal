import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authLoading: false,
    isAccOpen: false,
  },
  reducers: {
    toggleAcc: (state) => {
      state.isAccOpen = !state.isAccOpen;
    },
  },
  extraReducers: (builder) => {},
});

export const { toggleAcc } = authSlice.actions;
export default authSlice.reducer;

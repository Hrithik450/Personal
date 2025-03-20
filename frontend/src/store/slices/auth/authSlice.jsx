import { createSlice } from "@reduxjs/toolkit";
import {
  fetchprofile,
  forgetPassword,
  resetPassword,
  login,
  logout,
  Oauth,
  signup,
} from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    authLoading: false,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.authLoading = true;
    };

    const setError = (state) => {
      state.authLoading = false;
    };

    const setUserAuth = (state, action) => {
      state.authLoading = false;
      state.user = action.payload?.user || null;
    };

    builder
      .addCase(login.pending, setLoading)
      .addCase(login.fulfilled, setUserAuth)
      .addCase(login.rejected, setError)
      .addCase(signup.pending, setLoading)
      .addCase(signup.fulfilled, setUserAuth)
      .addCase(signup.rejected, setError)
      .addCase(Oauth.pending, setLoading)
      .addCase(Oauth.fulfilled, setUserAuth)
      .addCase(Oauth.rejected, setError)
      .addCase(fetchprofile.pending, setLoading)
      .addCase(fetchprofile.fulfilled, setUserAuth)
      .addCase(fetchprofile.rejected, setError)
      .addCase(logout.pending, setLoading)
      .addCase(logout.fulfilled, setUserAuth)
      .addCase(logout.rejected, setError)
      .addCase(forgetPassword.pending, setLoading)
      .addCase(forgetPassword.fulfilled, setError)
      .addCase(forgetPassword.rejected, setError)
      .addCase(resetPassword.pending, setLoading)
      .addCase(resetPassword.fulfilled, setError)
      .addCase(resetPassword.rejected, setError);
  },
});

export default authSlice.reducer;

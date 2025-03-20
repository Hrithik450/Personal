import { createAsyncThunk } from "@reduxjs/toolkit";
import { alertObject } from "../../../constants";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        credentials,
        { withCredentials: true }
      );

      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.user?.token)
      );
      localStorage.setItem("isAuthenticated", "true");
      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        userData,
        { withCredentials: true }
      );

      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.user?.token)
      );
      localStorage.setItem("isAuthenticated", "true");
      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/auth/logout`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    toast.success(response?.data?.message, alertObject);
    return response?.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong.";
    toast.error(errorMessage, alertObject);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const Oauth = createAsyncThunk(
  "oauth/cookie",
  async (userID, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/set-cookie`,
        { userID },
        { withCredentials: true }
      );

      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.user?.token)
      );
      localStorage.setItem("isAuthenticated", "true");
      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchprofile = createAsyncThunk(
  "fetch/profile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "forget/password",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/forget-password`,
        credentials,
        {
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset/password",
  async ({ formData, resetToken }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/reset-password/${resetToken}`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

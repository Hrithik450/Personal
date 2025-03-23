import { toast } from "react-toastify";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { alertObject } from "../../../constants";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createOrder = createAsyncThunk(
  "order/create",
  async ({ totalAmount }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/createOrder`,
        { totalAmount },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capture",
  async (
    { formData, orderData, orderID, paymentID, uuid, packageName },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/capturePayment`,
        { formData, orderData, orderID, paymentID, uuid, packageName },
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

export const sendCode = createAsyncThunk(
  "email/sendCode",
  async ({ uuid, email }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/sendCode`,
        { uuid, email },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "email/verifyCode",
  async ({ uuid, code }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/verifyCode`,
        { uuid, code },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message, alertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchDepositAddress = createAsyncThunk(
  "fetch/address",
  async ({ asset, network, totalUSDT, userID }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/payment/crypto/getAddress?asset=${asset}&network=${network}&totalUSDT=${totalUSDT}&userID=${userID}`,
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "verify/payment",
  async ({ txid, coin, userData, subscription }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/crypto/verify`,
        { txid, coin, userData, subscription },
        {
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message, alertObject);
      return response?.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, alertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

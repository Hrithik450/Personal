import { toast } from "react-toastify";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AlertObject } from "../../../components/common/config";
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
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capture",
  async ({ formData, orderData, orderID, paymentID, uuid }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/payment/capturePayment`,
        { formData, orderData, orderID, paymentID, uuid },
        {
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message, AlertObject);
      return response?.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, AlertObject);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

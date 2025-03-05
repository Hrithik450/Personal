import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AlertObject } from "../../../components/common/config";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async ({ feedback, packageName, uuid }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/feedback/createFeedback`,
        { feedback, packageName, uuid },
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

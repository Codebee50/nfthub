import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeApiUrl } from "@/contants/beRoute";
import { BASE_BE_URL } from "@/contants/beRoute";
import Cookies from "js-cookie";

export const userLogin = createAsyncThunk(
  "api/v1/auth/login/",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        makeApiUrl("/api/v1/auth/login/"),
        { email, password },
        config
      );

      console.log('the data', data)
      Cookies.set("userToken", data.data.access_token, { expires: 1 });
      Cookies.set("refreshToken", data.data.refresh_token, { expires: 1 });
      return data;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";
import { userLogin } from "./authActions";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: Cookies.get("userToken") || null,
  error: null,
  success: false,
  isAuthenticated: !!Cookies.get("userToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.isAuthenticated = payload ? true : false;
    },

    setUserImages: (state, {payload})=>{
      state.userInfo.cover_image = payload.cover_image,
      state.userInfo.profile_photo = payload.profile_photo
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.data.access_token;
        state.userInfo = payload.data.user;
        state.isAuthenticated = true;
        state.error = null;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        state.isAuthenticated = false;
      });
  },
});


export const { setCredentials, setUserImages } = authSlice.actions;

export default authSlice.reducer;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_BE_URL } from "@/contants/beRoute";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_BE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      console.log('token', token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/api/v1/auth/me/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;

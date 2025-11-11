import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginData, userData } from "./types";
import { queryPath } from "./endpoint";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authServiceApi = createApi({
  reducerPath: "authService ",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
      // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // cast getState to a known shape so we can safely access auth.accessToken
      const state = getState() as { auth?: { accessToken?: string } } | undefined;
      console.log(state, "state in auth service")
      const token = state?.auth?.accessToken;
      console.log(token, "token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
   }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<userData, userData>({
      query: (body) => ({
        url: queryPath.register,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: builder.mutation<loginData, loginData>({
      query: (body) => ({
        url: queryPath.login,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: queryPath.logout,
        method: "POST",
      }),
    }),
    getProfile: builder.query<userData, void>({
      query: () => ({
        url: queryPath.profile,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutMutation, useGetProfileQuery } = authServiceApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginData, userData, userProfile } from "./types";
import { queryPath } from "./endpoint";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// create a baseQuery with prepareHeaders (reads token from state or sessionStorage)
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { accessToken?: string } } | undefined;
      let token = state?.auth?.accessToken;
    
      if (!token && typeof window !== "undefined") {
        token = sessionStorage.getItem("access_token") ?? sessionStorage.getItem("accessToken") ?? sessionStorage.getItem("token") ?? undefined;
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
});

// wrap baseQuery to handle 401 -> attempt refresh -> retry original request
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result, "base query result");

  if (result?.error && result.error.status === 401) {
    // try to refresh
    const refreshToken = typeof window !== "undefined"
      ? sessionStorage.getItem("refresh_tokens") ?? sessionStorage.getItem("refresh_token") ?? undefined
      : undefined;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: queryPath.refresh,
          method: "POST",
          body: { refresh: refreshToken },
          headers: { "Content-Type": "application/json" },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        // adapt to your refresh response shape
        const data: any = refreshResult.data;
        const newAccess = data.accessToken ?? data.access_token ?? data.token;
        if (newAccess && typeof window !== "undefined") {
          sessionStorage.setItem("access_token", newAccess);
        }
        // retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // refresh failed — clear storage or dispatch logout
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("access_token");
          sessionStorage.removeItem("refresh_tokens");
          sessionStorage.removeItem("refresh_token");
        }
        // optionally: api.dispatch(logoutAction)
      }
    }
  }

  return result;
};

export const authServiceApi = createApi({
  reducerPath: "authService ",
  baseQuery: baseQueryWithReauth,

  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
      // credentials: "include",
  //   prepareHeaders: (headers, { getState }) => {
  //     // cast getState to a known shape so we can safely access auth.accessToken
  //     const state = getState() as { auth?: { accessToken?: string } } | undefined;
  //     let token = state?.auth?.accessToken;
    
  //      if (!token && typeof window !== "undefined") {
  //      token = sessionStorage.getItem("access_token") ?? sessionStorage.getItem("accessToken") ?? sessionStorage.getItem("token") ?? undefined;
       
  //      }
  //      if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   }
  //  }),
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
      query: (body: {refresh?: string}) => ({
        url: queryPath.logout,
        method: "POST",
        body,
         headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getProfile: builder.query<userProfile, void>({
      query: () => ({
        url: queryPath.profile,
        method: "GET",
         headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
      refreshTokens: builder.mutation({
        query: (body: {refresh: string}) => ({
          url: queryPath.refresh,
          method: "POST",
          body,
           headers: {
            "Content-Type": "application/json",
          },
        }),
      })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutMutation, useGetProfileQuery, useRefreshTokensMutation } = authServiceApi;

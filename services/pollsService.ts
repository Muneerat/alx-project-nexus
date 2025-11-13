
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginData, PollTypeResult, userData, userProfile, VotePayload } from "./types";
import { queryPath } from "./endpoint";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const pollServiceApi = createApi({
  reducerPath: "pollService ",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,
      // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // cast getState to a known shape so we can safely access auth.accessToken
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
   }),
  endpoints: (builder) => ({
    voteOnPoll: builder.mutation<any, VotePayload>({
      query: ({pollId, option_id}) => ({
        url: `/api/polls/${pollId}/vote/`,
        method: "POST",
        body: {
      option_id: option_id, 
    },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getActivePoll: builder.query<PollTypeResult, {pollId: string | undefined}>({
      query: ({pollId}) => ({
        url: `/api/polls/${pollId}/`,
        method: "GET",
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
    getActivePolls: builder.query<PollTypeResult, void>({
      query: () => ({
        url: queryPath.activePolls,
        method: "GET",
         headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useVoteOnPollMutation, useGetActivePollQuery, useGetActivePollsQuery } = pollServiceApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const env = import.meta.env
const baseUrl = env.VITE_APP_DEV_API;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          // Login API Fulfilled with Data
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error("Login API Failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;

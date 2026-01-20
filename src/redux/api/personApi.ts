import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Person, AuthResponse } from "../../types/person";

export const personApi = createApi({
  reducerPath: "personApi",
  tagTypes: ["person"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCurrentPerson: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/person/view",
        method: "GET",
      }),
      providesTags: ["person"],
    }),
    personLogin: builder.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      query: (userDetails) => ({
        url: "/auth/login",
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["person"],
    }),
    personRegistration: builder.mutation<AuthResponse, Person>({
      query: (newPerson) => ({
        url: "/auth/registration",
        method: "POST",
        body: newPerson,
      }),
      invalidatesTags: ["person"],
    }),
    personLogout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["person"],
    }),
  }),
});

export const {
  usePersonLoginMutation,
  usePersonRegistrationMutation,
  usePersonLogoutMutation,
  useGetCurrentPersonQuery,
} = personApi;

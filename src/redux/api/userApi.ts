import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserResponse, SingleUserResponse } from "../../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      transformResponse: (response: UserResponse) => response.data,
      providesTags: ["users"],
    }),
    fetchSingleUser: builder.query<User, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (response: SingleUserResponse) => response.data,
      providesTags: ["users"],
    }),
    createUser: builder.mutation<User, User>({
      query: (userData) => ({
        url: "/",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: SingleUserResponse) => response.data,
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: SingleUserResponse) => response.data,
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: SingleUserResponse) => response.data,
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchSingleUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;

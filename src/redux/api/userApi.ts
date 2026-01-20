import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, SingleUserResponse, UserResponse } from "../../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/dashboard",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response: UserResponse) => response.data,
    }),
    fetchSingleUser: builder.query<User, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (response: SingleUserResponse) => response.data,
    }),
    createUser: builder.mutation<User, User>({
      query: (newUser: User) => ({
        url: "/create",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response: SingleUserResponse) => response.data,
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }: { id: string; data: Partial<User> }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response: SingleUserResponse) => response.data,
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
      transformResponse: (response: SingleUserResponse) => response.data,
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

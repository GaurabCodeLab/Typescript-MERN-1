import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserResponse } from "../../types/user";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // Handle different types of errors
    if (result.error.status === "FETCH_ERROR") {
      return {
        error: {
          status: "FETCH_ERROR",
          data: {
            message:
              "Network error. Please check if the server is running on http://localhost:8080",
          },
        },
      };
    }

    if (result.error.status === "PARSING_ERROR") {
      return {
        error: {
          status: "PARSING_ERROR",
          data: { message: "Invalid response format from server" },
        },
      };
    }
  }

  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => ({ url: "/", method: "GET" }),
      transformResponse: (response: User[] | UserResponse) =>
        Array.isArray(response) ? response : response.data || [],
      providesTags: ["user"],
    }),
    fetchSingleUser: builder.query<User, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.user,
      providesTags: ["user"],
    }),
    createUser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

console.log("userApi", userApi);

export const {
  useFetchUsersQuery,
  useFetchSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

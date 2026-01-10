import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserState, User } from "../../types/user";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080");
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  "fetchSingleUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      rejectWithValue(errorMessage);
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (
    { id, data }: { id: string; data: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      rejectWithValue(errorMessage);
    }
  }
);

const initialState: UserState = {
  users: null,
  singleUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

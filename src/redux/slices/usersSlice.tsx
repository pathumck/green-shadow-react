import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios_instance";
import User from "../../modals/User";

const initialState: User[] = [];

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      console.log("Fetching users... axios");
      const response = await axiosInstance.get("/auth");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk<User, User>(
  "users/createUser",
  async (user) => {
    try {
      const response = await axiosInstance.post("/auth/register", user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to create user");
    }
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/auth/${id}`);
      return id;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to delete user");
    }
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (user) => {
    try {
      const response = await axiosInstance.put(`/auth/${user.id}`, user);
      return user;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to update user");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        console.log("Fetching users...");
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        alert("User created successfully");
        state.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(createUser.pending, (state) => {
        console.log("Creating user...");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        alert("User deleted successfully");
        return state.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(deleteUser.pending, (state) => {
        console.log("Deleting user...");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.findIndex((user) => user.id === action.payload.id);
        state[index] = action.payload;
        alert("User updated successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(updateUser.pending, (state) => {
        console.log("Updating user...");
      });
  },
});

export default usersSlice.reducer;

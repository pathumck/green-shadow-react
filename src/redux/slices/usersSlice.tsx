import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios_instance";
import User from "../../modals/User";
import Swal from "sweetalert2";

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
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        Swal.fire(action.error.message, "info");
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const closeBtn = document.querySelector(
          ".user-modal-close"
        ) as HTMLElement;
        closeBtn.click();
        Swal.fire("User created successfully", "", "success");
        state.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        Swal.fire(action.error.message, "", "info");
      })
      .addCase(createUser.pending, (state) => {
        Swal.fire({
          title: "Creating user",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        Swal.fire("User deleted successfully", "", "success");
        return state.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        Swal.fire(action.error.message, "", "info");
      })
      .addCase(deleteUser.pending, (state) => {
        Swal.fire({
          title: "Deleting user",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.findIndex((user) => user.id === action.payload.id);
        state[index] = action.payload;
        const closeBtn = document.querySelector(
          ".user-modal-close"
        ) as HTMLElement;
        closeBtn.click();
        Swal.fire("User updated successfully", "", "success");
      })
      .addCase(updateUser.rejected, (state, action) => {
        Swal.fire(action.error.message, "", "info");
      })
      .addCase(updateUser.pending, (state) => {
        Swal.fire({
          title: "Updating user",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      });
  },
});

export default usersSlice.reducer;

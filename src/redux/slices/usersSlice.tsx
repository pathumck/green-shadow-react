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
      console.log("response", response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to fetch users");
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
        alert("Users fetched successfully");
        return action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        alert(action.error.message);
      });
  },
});

export default usersSlice.reducer;

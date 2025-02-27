import Staff from "../../modals/Staff";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: Staff[] = [];

export const createStaff = createAsyncThunk<Staff, Staff>(
  "staff/createStaff",
  async (staff) => {
    try {
      const response = await axios.post("http://localhost:3000/staff", staff);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create staff");
    }
  }
)

export const fetchStaff = createAsyncThunk("staff/fetchStaffs", async () => {
  try {
    const response = await axios.get("http://localhost:3000/staff");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch staffs");
  }
});

export const updateStaff = createAsyncThunk<Staff, Staff>(
  "staff/updateStaff",
  async (staff) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/staff/${staff.id}`,
        staff
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update staff");
    }
  }
)

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStaff.fulfilled, (state, action) => {
        state.push(action.payload);
        console.log(action.payload);
        alert("Staff created successfully");
        const closeBtn = document.querySelector(
          ".staff-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(createStaff.rejected, (state, action) => {
        console.log("Faild to create staff : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(createStaff.pending, () => {
        console.log("Creating staff...");
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        console.log("Fetched staffs : ", action.payload);
        return action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        console.log("Faild to fetch staffs : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(fetchStaff.pending, () => {
        console.log("Fetching staffs...");
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.findIndex((staff) => staff.id === action.payload.id);
        state[index] = action.payload;
        console.log(action.payload);
        alert("Staff updated successfully");
        const closeBtn = document.querySelector(
          ".staff-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(updateStaff.rejected, (state, action) => {
        console.log("Faild to update staff : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(updateStaff.pending, () => {
        console.log("Updating staff...");
      });
  }
});

export default staffSlice.reducer;


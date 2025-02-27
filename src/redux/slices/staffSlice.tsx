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
      });
  }
});

export default staffSlice.reducer;


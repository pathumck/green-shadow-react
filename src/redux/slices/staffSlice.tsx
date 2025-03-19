import Staff from "../../modals/Staff";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axios_instance";

const initialState: Staff[] = [];

export const createStaff = createAsyncThunk<Staff, Staff>(
  "staff/createStaff",
  async (staff) => {
    try {
      const response = await axiosInstance.post("http://localhost:3000/staff", staff);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create staff");
    }
  }
);

export const fetchStaff = createAsyncThunk("staff/fetchStaffs", async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/staff");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch staffs");
  }
});

export const updateStaff = createAsyncThunk<Staff, Staff>(
  "staff/updateStaff",
  async (staff) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/staff/${staff.id}`,
        staff
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update staff");
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/staff/${id}`);
      return id;
    } catch (error) {
      throw new Error("Failed to delete staff");
    }
  }
);

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStaff.fulfilled, (state, action) => {
        state.push(action.payload);
        Swal.fire("Staff member saved successfully", "", "success");
        const closeBtn = document.querySelector(
          ".staff-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(createStaff.rejected, (state, action) => {
        Swal.fire("Staff member was not saved", "", "info");
      })
      .addCase(createStaff.pending, () => {
        Swal.fire({
          title: "Saving Staff member",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        Swal.fire("Failed to fetch staff", "", "info");
      })
      .addCase(fetchStaff.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.findIndex(
          (staff) => staff.id === action.payload.id
        );
        state[index] = action.payload;
        Swal.fire("Staff member updated successfully", "", "success");
        const closeBtn = document.querySelector(
          ".staff-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(updateStaff.rejected, (state, action) => {
        Swal.fire("Staff member was not updated", "", "info");
      })
      .addCase(updateStaff.pending, () => {
        Swal.fire({
          title: "Updating staff member",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        Swal.fire({
          title: "Deleted!",
          text: "Staff member has been deleted.",
          icon: "success",
        });
        return state.filter((staff) => staff.id !== action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        Swal.fire("Staff member was not deleted", "", "info");
      })
      .addCase(deleteStaff.pending, () => {
        Swal.fire({
          title: "Deleting staff member",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      });
  },
});

export default staffSlice.reducer;

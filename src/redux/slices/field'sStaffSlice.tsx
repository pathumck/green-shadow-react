import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FieldStaff from "../../modals/Field'sStaff";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axios_instance";

const initialState: FieldStaff[] = [];

export const createFieldsStaff = createAsyncThunk<FieldStaff, FieldStaff>(
  "fieldStaff/createField'sStaff",
  async (fieldStaff) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/fieldStaff",
        fieldStaff
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create field's staff");
    }
  }
);

export const fetchFieldsStaff = createAsyncThunk(
  "fieldStaff/fetchField'sStaff",
  async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/fieldStaff");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch field's staff");
    }
  }
);

export const deleteFieldStaff = createAsyncThunk<FieldStaff, FieldStaff>(
  "fieldStaff/deleteField'sStaff",
  async (fieldStaff) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:3000/fieldStaff/${fieldStaff.fieldId}/${fieldStaff.staffId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete field's staff");
    }
  }
);

const fieldStaffSlice = createSlice({
  name: "fieldStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFieldsStaff.fulfilled, (state, action) => {
        state.push(action.payload);
        Swal.fire("Staff member successfully assigned to this field", "", "success");
      })
      .addCase(createFieldsStaff.rejected, (state, action) => {
        Swal.fire("Failed to assign staff to this field", "", "info");
      })
      .addCase(createFieldsStaff.pending, () => {
        Swal.fire({
          title: "Assigning staff to field",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(fetchFieldsStaff.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchFieldsStaff.rejected, (state, action) => {
        Swal.fire("Failed to fetch field's staff", "", "info");
      })
      .addCase(fetchFieldsStaff.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(deleteFieldStaff.fulfilled, (state, action) => {
        Swal.fire(
          "Staff member removed from this field successfully",
          "",
          "success"
        );
        return state.filter(
          (fieldStaff) =>
            !(
              fieldStaff.fieldId === action.payload.fieldId &&
              fieldStaff.staffId === action.payload.staffId
            )
        );
      })
      .addCase(deleteFieldStaff.rejected, (state, action) => {
        Swal.fire("Failed to remove staff member from this field", "", "info");
      })
      .addCase(deleteFieldStaff.pending, () => {
        Swal.fire({
          title: "Removing staff member from field",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      });
  },
});

export default fieldStaffSlice.reducer;

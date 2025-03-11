import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FieldStaff from "../../modals/Field'sStaff";

const initialState: FieldStaff[] = [];

export const createFieldsStaff = createAsyncThunk<FieldStaff, FieldStaff>(
  "fieldStaff/createField'sStaff",
  async (fieldStaff) => {
    try {
      const response = await axios.post(
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
      const response = await axios.get("http://localhost:3000/fieldStaff");
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
      const response = await axios.delete(
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
        alert("Field's staff created successfully");
      })
      .addCase(createFieldsStaff.rejected, (state, action) => {
        alert(action.error.message);
        console.log("Faild to create field's staff : ", action.error.message);
      })
      .addCase(createFieldsStaff.pending, () => {
        console.log("Creating field's staff...");
      })
      .addCase(fetchFieldsStaff.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchFieldsStaff.rejected, (state, action) => {
        alert(action.error.message);
        console.log("Faild to fetch field's staff : ", action.error.message);
      })
      .addCase(fetchFieldsStaff.pending, () => {
        console.log("Fetching field's staff...");
      })
      .addCase(deleteFieldStaff.fulfilled, (state, action) => {
        alert("Field's staff deleted successfully");
        return state.filter(
          (fieldStaff) =>
            !(
              fieldStaff.fieldId === action.payload.fieldId &&
              fieldStaff.staffId === action.payload.staffId
            )
        );
      })
      .addCase(deleteFieldStaff.rejected, (state, action) => {
        alert(action.error.message);
        console.log("Faild to delete field's staff : ", action.error.message);
      })
      .addCase(deleteFieldStaff.pending, () => {
        console.log("Deleting field's staff...");
      });
  },
});

export default fieldStaffSlice.reducer;

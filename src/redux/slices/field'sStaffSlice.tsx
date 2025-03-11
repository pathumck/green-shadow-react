import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FieldStaff from "../../modals/Field'sStaff";


const initialState : FieldStaff[] = []

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
)

const fieldStaffSlice = createSlice({
  name: "fieldStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFieldsStaff.fulfilled, (state, action) => {
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
  },
})


export default fieldStaffSlice.reducer
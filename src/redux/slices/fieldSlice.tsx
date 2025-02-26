import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Field from "../../modals/Field";
import axios from "axios";

const initialState: Field[] = [];

export const createField = createAsyncThunk<Field, Field>(
  "fields/createField",
  async (field) => {
    try {
      const response = await axios.post("http://localhost:3000/field", field);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create field");
    }
  }
);

const fieldSlice = createSlice({
  name: "fileds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createField.fulfilled, (state, action) => {
        state.push(action.payload);
        alert("Field created successfully");
        const closeBtn = document.querySelector(
          ".field-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(createField.rejected, (state, action) => {
        console.log("Faild to create field : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(createField.pending, () => {
        console.log("Creating field...");
      });
  },
});

export default fieldSlice.reducer;

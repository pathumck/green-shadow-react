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

export const fetchFields = createAsyncThunk("fields/fetchFields", async () => {
  try {
    const response = await axios.get("http://localhost:3000/field");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch fields");
  }
});

export const updateField = createAsyncThunk<Field, Field>(
  "fields/updateField",
  async (field) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/field/${field.id}`,
        field
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update field");
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
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        console.log("Fetched fields : ", action.payload);
        return action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        console.log("Faild to fetch fields : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(fetchFields.pending, () => {
        console.log("Fetching fields...");
      })
      .addCase(updateField.fulfilled, (state, action) => {
        const index = state.findIndex(
          (field) => field.id === action.payload.id
        );
        state[index] = action.payload;
        alert("Field updated successfully");
        const closeBtn = document.querySelector(
          ".field-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(updateField.rejected, (state, action) => {
        console.log("Faild to update field : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(updateField.pending, () => {
        console.log("Updating field...");
      });
  },
});

export default fieldSlice.reducer;

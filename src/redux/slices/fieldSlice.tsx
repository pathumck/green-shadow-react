import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Field from "../../modals/Field";
import axios from "axios";
import Swal from "sweetalert2";

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

export const deleteField = createAsyncThunk<string, string>(
  "fields/deleteField",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/field/${id}`);
      return id;
    } catch (error) {
      throw new Error("Failed to delete field");
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
        const closeBtn = document.querySelector(
          ".field-modal-close"
        ) as HTMLElement;
        Swal.fire("Field saved successfully", "", "success");
        closeBtn.click();
      })
      .addCase(createField.rejected, (state, action) => {
        Swal.fire("Field was not saved", "", "info");
      })
      .addCase(createField.pending, () => {
        Swal.fire({
          title: "Saving Field",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        Swal.fire("Failed to fetch fields", "", "info");
      })
      .addCase(fetchFields.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })
      .addCase(updateField.fulfilled, (state, action) => {
        const index = state.findIndex(
          (field) => field.id === action.payload.id
        );
        state[index] = action.payload;
        const closeBtn = document.querySelector(
          ".field-modal-close"
        ) as HTMLElement;
        Swal.fire("Field updated successfully", "", "success");
        closeBtn.click();
      })
      .addCase(updateField.rejected, (state, action) => {
        Swal.fire("Field was not updated", "", "info");
      })
      .addCase(updateField.pending, () => {
        Swal.fire({
          title: "Updating Field",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        Swal.fire({
          title: "Deleted!",
          text: "Field has been deleted.",
          icon: "success"
        });
        return state.filter((field) => field.id !== action.payload);
      })
      .addCase(deleteField.rejected, (state, action) => {
        Swal.fire("Field was not deleted", "", "info");
      })
      .addCase(deleteField.pending, () => {
        Swal.fire({
          title: "Deleting Field",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      });
  },
});

export default fieldSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FieldCrop from "../../modals/Field'sCrop";
import Swal from "sweetalert2";

const initialState: FieldCrop[] = [];
export const fetchFieldsCrops = createAsyncThunk(
  "fieldCrops/fetchField'sCrops",
  async () => {
    try {
      console.log("Fetching fields crops... axios");
      const response = await axios.get("http://localhost:3000/fieldCrops");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch fields crops");
    }
  }
);

export const createFieldCrop = createAsyncThunk<FieldCrop, FieldCrop>(
  "fieldCrops/createField'sCrops",
  async (fieldCrop) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/fieldCrops",
        fieldCrop
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create field crop");
    }
  }
);

export const deleteFieldCrop = createAsyncThunk<FieldCrop, FieldCrop>(
  "fieldCrops/updateField'sCrops",
  async (fieldCrop) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/fieldCrops/${fieldCrop.fieldId}/${fieldCrop.cropId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete field crop");
    }
  }
);

export const fieldsCropsSlice = createSlice({
  name: "fieldsCrops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldsCrops.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchFieldsCrops.rejected, (state, action) => {
        Swal.fire("Failed to fetch fields crops", "", "info");
      })
      .addCase(fetchFieldsCrops.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(createFieldCrop.fulfilled, (state, action) => {
        Swal.fire("Crop added to field successfully", "", "success");
        state.push(action.payload);
      })
      .addCase(createFieldCrop.rejected, (state, action) => {
        Swal.fire("Crop was not added to field", "", "info");
        alert(action.error.message);
      })
      .addCase(createFieldCrop.pending, () => {
        Swal.fire({
          title: "Adding crop to field",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(deleteFieldCrop.fulfilled, (state, action) => {
        Swal.fire("Crop deleted from field successfully", "", "success");
        return state.filter(
          (fieldCrop) =>
            !(
              fieldCrop.fieldId === action.payload.fieldId &&
              fieldCrop.cropId === action.payload.cropId
            )
        );
      })
      .addCase(deleteFieldCrop.rejected, (state, action) => {
        Swal.fire("Crop was not deleted from field", "", "info");
      })
      .addCase(deleteFieldCrop.pending, () => {
        Swal.fire({
          title: "Deleting crop from field",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      });
  },
});

export default fieldsCropsSlice.reducer;

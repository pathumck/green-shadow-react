import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FieldCrop from "../../modals/Field'sCrop";

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

export const fieldsCropsSlice = createSlice({
  name: "fieldsCrops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldsCrops.fulfilled, (state, action) => {
        console.log("Fetched fields crops : ", action.payload);
        return action.payload;
      })
      .addCase(fetchFieldsCrops.rejected, (state, action) => {
        console.log("Faild to fetch fields crops : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(fetchFieldsCrops.pending, () => {
        console.log("Fetching fields crops...");
      })
      .addCase(createFieldCrop.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(createFieldCrop.rejected, (state, action) => {
        console.log("Faild to create field crop : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(createFieldCrop.pending, () => {
        console.log("Creating field crop...");
      });
  },
});

export default fieldsCropsSlice.reducer;

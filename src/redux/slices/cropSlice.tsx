import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Crop from "../../modals/Crop";
import axios from "axios";
import Swal from "sweetalert2";

const initialState : Crop[] = []

export const createCrop = createAsyncThunk<Crop, Crop>(
  "crop/createCrop",
  async (crop) => {
    try {
      const response = await axios.post("http://localhost:3000/crop", crop);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create crop");
    }
  }
)

export const fetchCrops = createAsyncThunk("crop/fetchCrops", async () => {
  try {
    const response = await axios.get("http://localhost:3000/crop");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch crops");
  }
})

export const updateCrop = createAsyncThunk<Crop, Crop>(
  "crop/updateCrop",
  async (crop) => {
    try {
      const response = await axios.put(`http://localhost:3000/crop/${crop.id}`, crop);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update crop");
    }
  }
)

export const deleteCrop = createAsyncThunk<Crop, string>(
  "crop/deleteCrop",
  async (id) => {
    try {
      const response = await axios.delete(`http://localhost:30000/crop/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete crop");
    }
  }
)

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCrop.fulfilled, (state, action) => {
        state.push(action.payload);
        alert("Crop created successfully");
        const closeBtn = document.querySelector(
          ".crop-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(createCrop.rejected, (state, action) => {
        console.log("Faild to create crop : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(createCrop.pending, () => {
        console.log("Creating crop...");
      })
      .addCase(fetchCrops.fulfilled, (state, action) => {
        console.log("Fetched crops : ", action.payload);
        return action.payload;
      })
      .addCase(fetchCrops.rejected, (state, action) => {
        console.log("Faild to fetch crops : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(fetchCrops.pending, () => {
        console.log("Fetching crops...");
      })
      .addCase(updateCrop.fulfilled, (state, action) => {
        const index = state.findIndex(
          (crop) => crop.id === action.payload.id);
        state[index] = action.payload;
        alert("Crop updated successfully");
        const closeBtn = document.querySelector(
          ".crop-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(updateCrop.rejected, (state, action) => {
        console.log("Faild to update crop : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(updateCrop.pending, () => {
        console.log("Updating crop...");
      })
      .addCase(deleteCrop.fulfilled, (state, action) => {
        Swal.fire("Crop deleted successfully", "", "success");
        return state.filter((crop) => crop.id !== action.payload.id);
      })
      .addCase(deleteCrop.rejected, (state, action) => {
        Swal.fire("Crop was not deleted", "", "info");
      })
      .addCase(deleteCrop.pending, () => {
        Swal.fire({
          title: "Deleting Crop",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })

  },
})

export default cropSlice.reducer
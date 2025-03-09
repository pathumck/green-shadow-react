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
      const response = await axios.delete(`http://localhost:3000/crop/${id}`);
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
        Swal.fire("Crop saved successfully", "", "success");
        const closeBtn = document.querySelector(
          ".crop-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(createCrop.rejected, (state, action) => {
        Swal.fire("Crop was not saved", "", "info");
      })
      .addCase(createCrop.pending, () => {
        Swal.fire({
          title: "Saving Crop",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })
      .addCase(fetchCrops.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchCrops.rejected, (state, action) => {
        Swal.fire("Failed to fetch crops", "", "info");
      })
      .addCase(fetchCrops.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
      })
      .addCase(updateCrop.fulfilled, (state, action) => {
        const index = state.findIndex(
          (crop) => crop.id === action.payload.id);
        state[index] = action.payload;
        Swal.fire("Crop updated successfully", "", "success");
        const closeBtn = document.querySelector(
          ".crop-modal-close"
        ) as HTMLElement;
        closeBtn.click();
      })
      .addCase(updateCrop.rejected, (state, action) => {
        Swal.fire("Crop was not updated", "", "info");
      })
      .addCase(updateCrop.pending, () => {
        Swal.fire({
          title: "Updating Crop",
          text : "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        })
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
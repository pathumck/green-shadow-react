import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Vehicle from "../../modals/Vehicle";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axios_instance";

const initialState: Vehicle[] = [];

export const createVehicle = createAsyncThunk<Vehicle, Vehicle>(
  "vehicle/createVehicle",
  async (vehicle) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/vehicle",
        vehicle
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const fetchVehicles = createAsyncThunk<Vehicle[], void>(
  "vehicle/fetchAllVehicles",
  async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/vehicle");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch vehicles");
    }
  }
);

export const updateVehicle = createAsyncThunk<Vehicle, Vehicle>(
  "vehicle/updateVehicle",
  async (vehicle) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/vehicle/${vehicle.id}`,
        vehicle
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update vehicle");
    }
  }
);

export const deleteVehicle = createAsyncThunk<string, string>(
  "vehicle/deleteVehicle",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:3000/vehicle/${id}`
      );
      return id;
    } catch (error) {
      throw new Error("Failed to delete vehicle");
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.push(action.payload);
        const closeBtn = document.querySelector(
          ".vehicle-modal-close"
        ) as HTMLElement;
        closeBtn.click();
        Swal.fire("Vehicle saved successfully", "", "success");
      })
      .addCase(createVehicle.pending, () => {
        Swal.fire({
          title: "Saving Vehicle",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        })
      })
      .addCase(createVehicle.rejected, (state, action) => {
        Swal.fire("Vehicle was not saved", "", "info");
      })

      .addCase(fetchVehicles.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })

      .addCase(fetchVehicles.rejected, (state, action) => {
        Swal.fire("Failed to fetch vehicles", "", "info");
      })
      .addCase(fetchVehicles.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.findIndex(
          (vehicle) => vehicle.id === action.payload.id
        );
        state[index] = action.payload;
        const closeBtn = document.querySelector(
          ".vehicle-modal-close"
        ) as HTMLElement;
        closeBtn.click();
        Swal.fire("Vehicle updated successfully", "", "success");
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        Swal.fire("Vehicle was not updated", "", "info");
      })
      .addCase(updateVehicle.pending, () => {
        Swal.fire({
          title: "Updating Vehicle",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        })
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        Swal.fire("Vehicle deleted successfully", "", "success");
        return state.filter((vehicle) => vehicle.id !== action.payload);
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        Swal.fire("Vehicle was not deleted", "", "info");
      })
      .addCase(deleteVehicle.pending, () => {
        Swal.fire({
          title: "Deleting Vehicle",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        })
      });
  },
});

export default vehicleSlice.reducer;

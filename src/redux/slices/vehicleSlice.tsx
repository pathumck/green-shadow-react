import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Vehicle from "../../modals/Vehicle";

const initialState: Vehicle[] = [];

export const createVehicle = createAsyncThunk<Vehicle, Vehicle>(
  "vehicle/createVehicle",
  async (vehicle) => {
    try {
      const response = await axios.post(
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
      const response = await axios.get("http://localhost:3000/vehicle");
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
      const response = await axios.put(
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
      const response = await axios.delete(
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
        alert("Successfull");
      })
      .addCase(createVehicle.pending, () => {
        console.log("creating vehicle");
      })
      .addCase(createVehicle.rejected, (state, action) => {
        alert(action.error.message);
      })

      .addCase(fetchVehicles.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(fetchVehicles.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(fetchVehicles.pending, () => {
        console.log("fetching vehicles");
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
        alert("Successfull");
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(updateVehicle.pending, () => {
        console.log("updating vehicle");
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        alert("Successfull");
        return state.filter((vehicle) => vehicle.id !== action.payload);
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        alert(action.error.message);
      })
      .addCase(deleteVehicle.pending, () => {
        console.log("deleting vehicle");
      });
  },
});

export default vehicleSlice.reducer;

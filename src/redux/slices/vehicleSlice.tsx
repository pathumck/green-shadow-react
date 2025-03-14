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
    } catch(error:any) {
      throw error.response.data.message
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
)

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createVehicle.fulfilled, (state, action) => {
      state.push(action.payload);
      alert("Successfull");
    }),
      builder.addCase(createVehicle.pending, () => {
        console.log("creating vehicle");
      }),
      builder.addCase(createVehicle.rejected, (state,action) => {
        alert(action.error.message);
      });

    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(fetchVehicles.rejected, (state, action) => {
      alert(action.error.message);
    });
    builder.addCase(fetchVehicles.pending, () => {
      console.log("fetching vehicles");
    })
  },
});

export default vehicleSlice.reducer;

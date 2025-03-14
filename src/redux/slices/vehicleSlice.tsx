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
  },
});

export default vehicleSlice.reducer;

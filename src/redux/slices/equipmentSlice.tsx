import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios_instance";
import Equipment from "../../modals/Equipment";

const initialState: Equipment[] = [];

export const createEquipment = createAsyncThunk<Equipment, Equipment>(
  "equipment/createEquipment",
  async (equipment) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/equipment",
        equipment
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create equipment");
    }
  }
);

export const updateEquipment = createAsyncThunk<Equipment, Equipment>(
  "equipment/updateEquipment",
  async (equipment) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/equipment/${equipment.id}`,
        equipment
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update equipment");
    }
  }
);

export const fetchEquipments = createAsyncThunk<Equipment[], void>(
  "Equipment/fetchEquipments",
  async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/equipment");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch all fields");
    }
  }
);

export const deleteEquipment = createAsyncThunk<Equipment, string>(
  "equipment/deleteEquipment",
  async (id) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:3000/equipment/${id}`
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to delete equipment");
    }
  }
);

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEquipment.fulfilled, (state, action) => {
        state.push(action.payload);
        alert("Equipment saved successfully!");
      })
      .addCase(createEquipment.pending, (state, action) => {
        console.log("Equipment saving...");
      })
      .addCase(createEquipment.rejected, (state, action) => {
        alert("Failed to save equipment!");
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        const index = state.findIndex(
          (equipment) => equipment.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
          alert("Equipment updated successfully!");
        }
      })
      .addCase(updateEquipment.pending, (state, action) => {
        console.log("Updating equipment...");
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        alert("Failed to update equipment!");
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        console.log("Equipment fetched successfully!");
        return action.payload;
      })
      .addCase(fetchEquipments.pending, (state, action) => {
        console.log("Equipments fetching...");
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        alert("Failed to fetch equipments");
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        alert("Equipment deleted successfully!");
        return state.filter((equipment) => equipment.id !== action.payload.id);
      })
      .addCase(deleteEquipment.pending, (state, action) => {
        console.log("Equipment deleting...");
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        alert("Failed to delete equipment!");
      });
  },
});

export default equipmentSlice.reducer;

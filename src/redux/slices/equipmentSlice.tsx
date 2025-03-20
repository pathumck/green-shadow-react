import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios_instance";
import Equipment from "../../modals/Equipment";
import Swal from "sweetalert2";

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
        const closeBtn = document.querySelector(
          ".equipment-modal-close"
        ) as HTMLElement;
        closeBtn.click();
        Swal.fire("Equipment saved successfully", "", "success");
      })
      .addCase(createEquipment.pending, (state, action) => {
        Swal.fire({
          title: "Saving Equipment",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        })
      })
      .addCase(createEquipment.rejected, (state, action) => {
        Swal.fire("Equipment was not saved", "", "info");
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        const index = state.findIndex(
          (equipment) => equipment.id === action.payload.id
        );
        if (index !== -1) {
          state[index] = action.payload;
          const closeBtn = document.querySelector(
            ".equipment-modal-close"
          ) as HTMLElement;
          closeBtn.click();
          Swal.fire("Equipment updated successfully", "", "success");
        }
      })
      .addCase(updateEquipment.pending, (state, action) => {
        Swal.fire({
          title: "Updating Equipment",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          }
        })
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        Swal.fire("Equipment was not updated", "", "info");
      })
      .addCase(fetchEquipments.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchEquipments.pending, (state, action) => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(fetchEquipments.rejected, (state, action) => {
        Swal.fire("Failed to fetch equipments", "", "info");
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        Swal.fire("Equipment deleted successfully", "", "success");
        return state.filter((equipment) => equipment.id !== action.payload.id);
      })
      .addCase(deleteEquipment.pending, (state, action) => {
        Swal.fire({
          title: "Deleting Equipment",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        })
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        Swal.fire("Equipment was not deleted", "", "info");
      });
  },
});

export default equipmentSlice.reducer;

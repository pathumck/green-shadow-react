import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Log from "../../modals/Log";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axios_instance";
const initialState: Log[] = [];

export const createLog = createAsyncThunk<Log, Log>(
  "log/createLog",
  async (log) => {
    try {
      const response = await axiosInstance.post("http://localhost:3000/log", log);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create log");
    }
  }
);

export const fetchLogs = createAsyncThunk("log/fetchLogs", async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/log");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch logs");
  }
});

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLog.fulfilled, (state, action) => {
        state.push(action.payload);
        Swal.fire("Log saved successfully", "", "success");
      })
      .addCase(createLog.rejected, (state, action) => {
        Swal.fire("Log was not saved", "", "info");
      })
      .addCase(createLog.pending, () => {
        Swal.fire({
          title: "Saving Log",
          text: "Please wait",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        Swal.close();
        return action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        Swal.fire("Failed to fetch logs", "", "info");
      })
      .addCase(fetchLogs.pending, () => {
        Swal.fire({
          background: "transparent",
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
      });
  },
});

export default logSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Log from "../../modals/Log";
import axios from "axios";
const initialState:Log[] = []

export const createLog = createAsyncThunk<Log, Log>(
  "log/createLog",
  async (log) => {
    try {
      const response = await axios.post("http://localhost:3000/log", log);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create log");
    }
  }
)

export const fetchLogs = createAsyncThunk("log/fetchLogs", async () => {
  try {
    const response = await axios.get("http://localhost:3000/log");
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
        console.log(action.payload);
        state.push(action.payload);
        alert("Log created successfully");
      })
      .addCase(createLog.rejected, (state, action) => {
        console.log("Faild to create log : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(createLog.pending, () => {
        console.log("Creating log...");
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        console.log("Fetched logs : ", action.payload);
        return action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        console.log("Faild to fetch logs : ", action.error.message);
        alert(action.error.message);
      })
      .addCase(fetchLogs.pending, () => {
        console.log("Fetching logs...");
      });
  },
});

export default logSlice.reducer;
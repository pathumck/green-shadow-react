import Staff from "../../modals/Staff";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Staff[] = [];

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
});

export default staffSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Crop from "../../modals/Crop";
const initialState : Crop[] = []

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
  }
})

export default cropSlice.reducer
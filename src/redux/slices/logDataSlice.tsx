import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logId: "",
  userId: "",
  date: "",
  fieldId: "",
  cropId: "",
  description: "",
  status: "",
  image: "",
}

export const logDataSlice = createSlice({
  name: "logData",
  initialState,
  reducers: {
    updateLogId: (state, action) => {
      state.logId = action.payload
    },
    updateUserId: (state, action) => {
      state.userId = action.payload
    },
    updateDate: (state, action) => {
      state.date = action.payload
    },
    updateFieldId: (state, action) => {
      state.fieldId = action.payload
    },
    updateCropId: (state, action) => {
      state.cropId = action.payload
    },
    updateDescription: (state, action) => {
      state.description = action.payload
    },
    updateStatus: (state, action) => {
      state.status = action.payload
    },
    updateImage: (state, action) => {
      state.image = action.payload
    },
  },
});

export default logDataSlice.reducer;
export const { updateLogId, updateUserId, updateDate, updateFieldId, updateCropId, updateDescription, updateStatus, updateImage } = logDataSlice.actions;


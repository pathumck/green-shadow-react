import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: string = "";
const updateOrDeleteSlice = createSlice({
  name: "updateOrDelete",
  initialState,
  reducers: {
    updateOrDelete: (state: string, action: PayloadAction<string>) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { updateOrDelete } = updateOrDeleteSlice.actions;
export default updateOrDeleteSlice.reducer;

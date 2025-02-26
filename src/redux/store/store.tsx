import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";

const store = configureStore({
  reducer: {
    fileds: fieldReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
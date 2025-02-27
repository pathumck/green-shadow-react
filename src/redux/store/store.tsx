import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";
import updateOrDeleteReducer from "../slices/updateOrDeleteSlice";

const store = configureStore({
  reducer: {
    fields: fieldReducer,
    updateOrDelete: updateOrDeleteReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
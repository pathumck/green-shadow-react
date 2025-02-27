import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";
import updateOrDeleteReducer from "../slices/updateOrDeleteSlice";
import cropReducer from "../slices/cropSlice";
const store = configureStore({
  reducer: {
    fields: fieldReducer,
    crops: cropReducer,
    updateOrDelete: updateOrDeleteReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
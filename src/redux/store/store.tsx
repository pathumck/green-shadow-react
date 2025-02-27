import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";
import updateOrDeleteReducer from "../slices/updateOrDeleteSlice";
import cropReducer from "../slices/cropSlice";
import staffReducer from "../slices/staffSlice";
const store = configureStore({
  reducer: {
    fields: fieldReducer,
    crops: cropReducer,
    staff: staffReducer,
    updateOrDelete: updateOrDeleteReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
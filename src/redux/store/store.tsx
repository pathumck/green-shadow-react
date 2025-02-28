import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";
import updateOrDeleteReducer from "../slices/updateOrDeleteSlice";
import cropReducer from "../slices/cropSlice";
import staffReducer from "../slices/staffSlice";
import logDataReducer from "../slices/logDataSlice";
import logReducer from "../slices/logSlice";
const store = configureStore({
  reducer: {
    fields: fieldReducer,
    crops: cropReducer,
    staff: staffReducer,
    logs: logReducer,
    updateOrDelete: updateOrDeleteReducer,
    logData: logDataReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
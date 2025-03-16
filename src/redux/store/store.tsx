import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../slices/fieldSlice";
import updateOrDeleteReducer from "../slices/updateOrDeleteSlice";
import cropReducer from "../slices/cropSlice";
import staffReducer from "../slices/staffSlice";
import logDataReducer from "../slices/logDataSlice";
import logReducer from "../slices/logSlice";
import fieldCropsReducer from "../slices/field'sCropsSlice";
import fieldStaffReducer from "../slices/field'sStaffSlice";
import vehicleReducer from "../slices/vehicleSlice"
import authReducer from "../slices/authSlice"
import userReducer from "../slices/usersSlice"

const store = configureStore({
  reducer: {
    fields: fieldReducer,
    crops: cropReducer,
    staff: staffReducer,
    logs: logReducer,
    updateOrDelete: updateOrDeleteReducer,
    fieldCrops: fieldCropsReducer,
    fieldStaff: fieldStaffReducer,
    vehicles: vehicleReducer,
    logData: logDataReducer,
    auth : authReducer,
    users : userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export default store;
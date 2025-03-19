import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateLog from "./Pages/CreateLog.tsx";
import Crops from "./Pages/Crops.tsx";
import DashBoard from "./Pages/DashBoard.tsx";
import Equipments from "./Pages/Equipments.tsx";
import FieldCrops from "./Pages/FieldCrops.tsx";
import FieldStaff from "./Pages/FieldStaff.tsx";
import PreviousLogs from "./Pages/PreviousLogs.tsx";
import Staff from "./Pages/Staff.tsx";
import Vehicles from "./Pages/Vehicles.tsx";
import FieldDetails from "./Pages/FieldDetails.tsx";
import Users from "./Pages/Users.tsx";
import Login from "./Pages/Login.tsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFields } from "./redux/slices/fieldSlice";
import { fetchCrops } from "./redux/slices/cropSlice";
import { fetchStaff } from "./redux/slices/staffSlice";
import { fetchLogs } from "./redux/slices/logSlice";
import { fetchVehicles } from "./redux/slices/vehicleSlice";
import { AppDispatch } from "./redux/store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
   if (isAuthenticated) {
    dispatch(fetchFields());
    dispatch(fetchCrops());
    dispatch(fetchStaff());
    dispatch(fetchLogs());
    dispatch(fetchVehicles());
   }
  }, [dispatch, isAuthenticated]);  

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createlog" element={<CreateLog />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/fieldcrops" element={<FieldCrops />} />
        <Route path="/fielddetails" element={<FieldDetails />} />
        <Route path="/fieldstaff" element={<FieldStaff />} />
        <Route path="/previouslogs" element={<PreviousLogs />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;

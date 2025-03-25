import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { fetchEquipments } from "./redux/slices/equipmentSlice.tsx";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null && localStorage.getItem("refresh") === null) {
      setIsAuthenticated(true);
      localStorage.setItem("refresh", "true");
      navigate("/dashboard", { replace: true });
    } else if (localStorage.getItem("refresh") === "true") {
      dispatch(fetchFields());
      dispatch(fetchCrops());
      dispatch(fetchStaff());
      dispatch(fetchLogs());
      dispatch(fetchVehicles());
      dispatch(fetchEquipments())
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFields());
      dispatch(fetchCrops());
      dispatch(fetchStaff());
      dispatch(fetchLogs());
      dispatch(fetchVehicles());
      dispatch(fetchEquipments()) 
    }
  }, [dispatch, isAuthenticated, user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/createlog" element={user ? <CreateLog /> : <Navigate to="/login" replace />} />
        <Route path="/crops" element={user ? <Crops /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to="/login" replace />} />
        <Route path="/equipments" element={user ? <Equipments /> : <Navigate to="/login" replace />} />
        <Route path="/fieldcrops" element={user ? <FieldCrops /> : <Navigate to="/login" replace />} />
        <Route path="/fielddetails" element={user ? <FieldDetails /> : <Navigate to="/login" replace />} />
        <Route path="/fieldstaff" element={user ? <FieldStaff /> : <Navigate to="/login" replace />} />
        <Route path="/previouslogs" element={user ? <PreviousLogs /> : <Navigate to="/login" replace />} />
        <Route path="/staff" element={user ? <Staff /> : <Navigate to="/login" replace />} />
        <Route path="/vehicles" element={user ? <Vehicles /> : <Navigate to="/login" replace />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;

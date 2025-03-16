import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store/store.tsx";
import { fetchFields } from "./redux/slices/fieldSlice.tsx";
import { fetchCrops } from "./redux/slices/cropSlice.tsx";
import { fetchStaff } from "./redux/slices/staffSlice.tsx";
import Login from "./Pages/Login.tsx";
import { fetchLogs } from "./redux/slices/logSlice.tsx";
import { fetchVehicles } from "./redux/slices/vehicleSlice.tsx";
import Signup from "./Pages/SignUp.tsx";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFields());
    dispatch(fetchCrops());
    dispatch(fetchStaff());
    dispatch(fetchLogs());
    dispatch(fetchVehicles())
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

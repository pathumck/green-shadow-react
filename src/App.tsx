import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import CreateLog from './Pages/CreateLog.tsx'
import Crops from './Pages/Crops.tsx'
import DashBoard from './Pages/DashBoard.tsx'
import Equipments from './Pages/Equipments.tsx'
import FieldCrops from './Pages/FieldCrops.tsx'
import FieldStaff from './Pages/FieldStaff.tsx'
import PreviousLogs from './Pages/PreviousLogs.tsx'
import Staff from './Pages/Staff.tsx'
import Vehicles from './Pages/Vehicles.tsx'
import FieldDetails from './Pages/FieldDetails.tsx'
import Users from './Pages/Users.tsx'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/createlog' element={<CreateLog />} />
        <Route path='/crops' element={<Crops />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/equipments' element={<Equipments />} />
        <Route path='/fieldcrops' element={<FieldCrops />} />
        <Route path='/fielddetails' element={<FieldDetails />} />
        <Route path='/fieldstaff' element={<FieldStaff />} />
        <Route path='/previouslogs' element={<PreviousLogs />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </>
  )
}

export default App

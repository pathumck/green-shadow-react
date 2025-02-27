import React, { useState, useEffect } from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaPlantWilt } from 'react-icons/fa6'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import CropDetailsTable from '../Components/CropDetailsTable/CropDetailsTable'
import CropDetailsModal from '../Components/CropDetailsModal/CropDetailsModal'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store/store'
import { fetchCrops } from '../redux/slices/cropSlice'

function Crops() {
  const [showModal, setShowModal] = useState({title: "", btnText: ""});
  const handleShow = (title: string, btnText: string) => setShowModal({title: title, btnText: btnText});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCrops());
  }, []);
  return (
    <>
      <PageTitle title = "Crops" icon = {<FaPlantWilt className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "crop" target = "#crop" setShowModal = {() => handleShow("Add", "Save Crop")} />
      <CropDetailsTable target = "#crop" setShowModal= {()=> handleShow("Update", "Update Crop")} />
      <CropDetailsModal text = {showModal} />
    </>
  )
}

export default Crops
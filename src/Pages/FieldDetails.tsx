import React, { useEffect, useState } from 'react'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaSunPlantWilt } from 'react-icons/fa6'
import FieldDetailsTable from '../Components/FieldDetailsTable/FieldDetailsTable'
import FieldDetailsModal from '../Components/FieldDetailsModal/FieldDetailsModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFields } from '../redux/slices/fieldSlice'
import { AppDispatch } from '../redux/store/store'


function FieldDetails() {
  const [showModal, setShowModal] = useState({title: "", btnText: ""});
  const handleShow = (title: string, btnText: string) => setShowModal({title: title, btnText: btnText});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFields());
  
  }, []);


  return (
    <>
      <PageTitle title = "Field Details" icon = {<FaSunPlantWilt className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "field" target = "#field" setShowModal = {() => handleShow("Add", "Save Field")} />
      <FieldDetailsTable />
      <FieldDetailsModal text = {showModal} />
    </>    
  )
}

export default FieldDetails
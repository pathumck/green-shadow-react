import React, { useState } from 'react'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaSunPlantWilt } from 'react-icons/fa6'
import FieldDetailsTable from '../Components/FieldDetailsTable/FieldDetailsTable'
import FieldDetailsModal from '../Components/FieldDetailsModal/FieldDetailsModal'

function FieldDetails() {
  const [showModal, setShowModal] = useState({title: "", btnText: ""});
  const handleShow = (title: string, btnText: string) => setShowModal({title: title, btnText: btnText});
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
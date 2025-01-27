import React, { useState } from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { GiDigDug } from 'react-icons/gi'
import EquipmentDetailsTable from '../Components/EquipmentDetailsTable/EquipmentDetailsTable'
import EquipmentDetailsModal from '../Components/EquipmentDetailsModal/EquipmentDetailsModal'

function Equipments() {
  const [showModal, setShowModal] = useState({title: "", btnText: ""});
  const handleShow = (title: string, btnText: string) => setShowModal({title: title, btnText: btnText});
  return (
    <>
      <PageTitle title = "Equipments" icon = {<GiDigDug className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "equipment" target = "#equipment" setShowModal = {() => handleShow("Add", "Save Equipment")} />
      <EquipmentDetailsTable />
      <EquipmentDetailsModal text = {showModal} />
    </>
    
  )
}

export default Equipments
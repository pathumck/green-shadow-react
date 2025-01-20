import React from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { GiDigDug } from 'react-icons/gi'
import EquipmentDetailsTable from '../Components/EquipmentDetailsTable/EquipmentDetailsTable'

function Equipments() {
  return (
    <>
      <PageTitle title = "Equipments" icon = {<GiDigDug className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "equipment" />
      <EquipmentDetailsTable />
    </>
    
  )
}

export default Equipments
import React from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { GiFarmTractor } from 'react-icons/gi'
import VehicleDetailsTable from '../Components/VehicleDetailsTable/VehicleDetailsTable'

function Vehicles() {
  return (
    <>
      <PageTitle title = "Vehicles" icon = {<GiFarmTractor className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "vehicle" />
      <VehicleDetailsTable />
    </>
  )
}

export default Vehicles
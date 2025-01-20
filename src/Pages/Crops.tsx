import React from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaPlantWilt } from 'react-icons/fa6'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'

function Crops() {
  return (
    <>
      <PageTitle title = "Crops" icon = {<FaPlantWilt className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "crop" />
    </>
  )
}

export default Crops
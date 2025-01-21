import React from 'react'
import SelectaFieldContainer from '../Components/SelectaFieldContainer/SelectaFieldContainer'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaSunPlantWilt } from 'react-icons/fa6'

function FieldCrops() {
  return (
    <>
      <PageTitle title = "Field's Crops" icon = {<FaSunPlantWilt className='align-baseline' size={22} />} />
      <SelectaFieldContainer />
    </>
    
  )
}

export default FieldCrops
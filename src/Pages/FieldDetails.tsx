import React from 'react'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaSunPlantWilt } from 'react-icons/fa6'

function FieldDetails() {
  return (
    <>
      <PageTitle title = "Field Details" icon = {<FaSunPlantWilt className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "field" />
    </>    
  )
}

export default FieldDetails
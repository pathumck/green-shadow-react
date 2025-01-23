import React from 'react'
import SelectaFieldContainer from '../Components/SelectaFieldContainer/SelectaFieldContainer'
import PageTitle from '../Components/PageTitle/PageTitle'
import { FaSunPlantWilt } from 'react-icons/fa6'
import SelectaCropContainer from '../Components/SelectaCropContainer/SelectaCropContainer'
import './css/FieldCrops.css'
function FieldCrops() {
  return (
    <>
      <PageTitle title = "Field's Crops" icon = {<FaSunPlantWilt className='align-baseline' size={22} />} />
      <div className='row main-wrap-div gap-5'>
        <div className="col-6 col-md-5 col-dev">
        <SelectaFieldContainer />
        </div>
        <div className="col-6 col-md-5 col-dev">
        <SelectaCropContainer />
        </div>
      
      </div>
      
    </>
    
  )
}

export default FieldCrops
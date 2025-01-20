import React from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { GiFarmer } from 'react-icons/gi'
import StaffDetailsTable from '../Components/StaffDetailsTable/StaffDetailsTable'

function Staff() {
  return (
    <>
      <PageTitle title = "Staff" icon = {<GiFarmer className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "staff" />
      <StaffDetailsTable />
    </>
  )
}

export default Staff
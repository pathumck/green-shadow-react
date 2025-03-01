import React from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { FaUserFriends } from 'react-icons/fa'
import NavBar from '../Components/NavBar/NavBar'

function Users() {
  return (
    <>
      <NavBar />
      <PageTitle title = "Users" icon = {<FaUserFriends className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "user" />
    </>
  )
}

export default Users
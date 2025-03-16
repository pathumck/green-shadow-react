import React, { useState } from 'react'
import PageTitle from '../Components/PageTitle/PageTitle'
import AddAndSearch from '../Components/AddAndSearch/AddAndSearch'
import { FaUserFriends } from 'react-icons/fa'
import NavBar from '../Components/NavBar/NavBar'
import UserDetailsModal from '../Components/UserDetailsModal/UserDetailsModal'
import UserDetailsTable from '../Components/UserDetailsTable/UserDetailsTable'

function Users() {
  const [showModal, setShowModal] = useState({title: "", btnText: ""});
    const handleShow = (title: string, btnText: string) => setShowModal({title: title, btnText: btnText});
  return (
    <>
      <NavBar />
      <PageTitle title = "Users" icon = {<FaUserFriends className='align-baseline' size={22} />}/>
      <AddAndSearch btntext = "user" target = "#user" setShowModal = {() => handleShow("Add", "Create User")}/>
      <UserDetailsModal text = {showModal} />
      <UserDetailsTable />
    </>
  )
}

export default Users
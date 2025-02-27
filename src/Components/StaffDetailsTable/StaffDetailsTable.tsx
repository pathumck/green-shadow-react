import React from 'react'

function StaffDetailsTable() {
  return (
    <>
      <div className='container-fluid'>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Staff Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Birth Day</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone</th>
              <th scope="col">E mail</th>
              <th scope="col">Address</th>
              <th scope="col">Designation</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StaffDetailsTable
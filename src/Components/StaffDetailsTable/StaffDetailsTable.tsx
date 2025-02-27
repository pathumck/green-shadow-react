import { AppDispatch, RootState } from '../../redux/store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrDelete } from '../../redux/slices/updateOrDeleteSlice';

function StaffDetailsTable(props: any) {
  const staff = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  }
  return (
    <>
      <div className='container-fluid'>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col" className='text-center'>#</th>
              <th scope="col" className='text-center'>Staff Id</th>
              <th scope="col" className='text-center'>First Name</th>
              <th scope="col" className='text-center'>Last Name</th>
              <th scope="col" className='text-center'>Birth Day</th>
              <th scope="col" className='text-center'>Gender</th>
              <th scope="col" className='text-center'>Phone</th>
              <th scope="col" className='text-center'>E mail</th>
              <th scope="col" className='text-center'>Address</th>
              <th scope="col" className='text-center'>Designation</th>
              <th scope="col" className='text-center'>Role</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff, index) => (
              <tr className='text-center' key={index}>
                <th scope="row">{index + 1}</th>
                <td>{staff.id}</td>
                <td>{staff.firstName}</td>
                <td>{staff.lastName}</td>
                <td>{staff.birthDay}</td>
                <td>{staff.gender}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td>{staff.designation}</td>
                <td>{staff.role}</td>
                <td>
                <button
                    data-bs-toggle="modal"
                    data-bs-target={props.target}
                    onClick={() => {
                      props.setShowModal("Update");
                      handleUpdateOrDelete(staff.id);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StaffDetailsTable
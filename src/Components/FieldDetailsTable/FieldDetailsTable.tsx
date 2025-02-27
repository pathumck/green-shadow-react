import { RootState } from '../../redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

function FieldDetailsTable() {

  const fields = useSelector((state: RootState) => state.fields);

  return (
    <>
      <div className='container-fluid'>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col" className='text-center'>#</th>
              <th scope="col" className='text-center'>FieldCode</th>
              <th scope="col" className='text-center'>Name</th>
              <th scope="col" className='text-center'>Location</th>
              <th scope="col" className='text-center'>Size</th>
              <th scope="col" className='text-center'>Image One</th>
              <th scope="col" className='text-center'>Image Two</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              fields.map((field, index) => (
                <tr className='text-center' key={index}>
                  <th>{index + 1}</th>
                  <td>{field.id}</td>
                  <td>{field.name}</td>
                  <td>{field.location}</td>
                  <td>{field.size}</td>
                  <td>{field.imageOne && <img src={field.imageOne} alt="Image One" style={{ width: '150px', height: '100px' }}/>}</td>
                  <td>{field.imageTwo && <img src={field.imageTwo} alt="Image Two" style={{ width: '150px', height: '100px' }}/>}</td>
                  <td>
                    <button className='btn btn-primary'>Edit</button>
                    <button className='btn btn-danger mx-2 '>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FieldDetailsTable
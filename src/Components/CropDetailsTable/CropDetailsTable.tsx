import { RootState } from '../../redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

function CropDetailsTable() {
  const crops = useSelector((state : RootState) => state.crops)
  return (
    <>
      <div className='container-fluid'>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col" className='text-center'>#</th>
              <th scope="col" className='text-center'>Crop Code</th>
              <th scope="col" className='text-center'>Common Name</th>
              <th scope="col" className='text-center'>Scientific Name</th>
              <th scope="col" className='text-center'>Category</th>
              <th scope="col" className='text-center'>Season</th>
              <th scope="col" className='text-center'>Image</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, index) => (
              <tr className='text-center' key={index}>
                <th scope="row">{index + 1}</th>
                <td>{crop.id}</td>
                <td>{crop.commonName}</td>
                <td>{crop.scientificName}</td>
                <td>{crop.category}</td>
                <td>{crop.season}</td>
                <td>
                  {crop.image && (
                    <img src={crop.image} alt="Crop Image" width="150px" height="100px" />
                  )}
                </td>
                <td>
                  <button type="button" className="btn btn-primary">Edit</button>
                  <button type="button" className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CropDetailsTable
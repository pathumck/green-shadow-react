import { AppDispatch, RootState } from '../../redux/store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrDelete } from '../../redux/slices/updateOrDeleteSlice'
import { deleteCrop } from '../../redux/slices/cropSlice'

function CropDetailsTable(props : any) {
  const crops = useSelector((state : RootState) => state.crops)
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateOrDelete = (id : string) => {
    dispatch(updateOrDelete(id));
  }

  const handleDelete = (id : string) => {
    dispatch(deleteCrop(id));
  }

  return (
    <>
      <div className='container-fluid mt-5' style={{maxHeight: "320px", overflowY: "scroll"}}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark sticky-top">
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
              <tr className='text-center fw-bold' key={index}>
                <td>{index + 1}</td>
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
                <button
                    data-bs-toggle="modal"
                    data-bs-target={props.target}
                    onClick={() => {
                      props.setShowModal("Update");
                      handleUpdateOrDelete(crop.id);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateOrDelete(crop.id);
                      handleDelete(crop.id);
                    }}
                    className="btn btn-danger mx-2 "
                  >
                    Delete
                  </button>
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
import React from 'react'

function SelectLogCropContainer() {
  return (
    <>
          <div className="row">
            <div className="col-12">
              <h6 className="sub-topic">Select a crop</h6>
            </div>
            <div className="col-6 pb-2">
              <label className="">Select a Crop </label>
              <br />
              <select className="form-select" aria-label="Default select example">
                <option selected>Select a crop</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-6">
              <label className="">Selected Crop </label>
              <br />
              <input className="form-control me-2" placeholder="" disabled />
            </div>
            <div className="col-6">
              <label className="">Common Name </label>
              <br />
              <input className="form-control me-2" placeholder="" disabled />
            </div>
            <div className="col-6">
              <label className="">Scientific Name</label>
              <br />
              <input className="form-control me-2" placeholder="" disabled />
            </div>
            <div className="col-6">
              <label className="">Category</label>
              <br />
              <input className="form-control me-2" placeholder="" disabled />
            </div>
            <div className="col-6">
              <label className="">Season</label>
              <br />
              <input className="form-control me-2" placeholder="" disabled />
            </div>
            <div className="col-6 img-container">
              <label className="">Image</label>
              <br />
              <div className="img-wrap">
                <img src="" alt="Image One" />
              </div>
            </div>
           
          </div>
        </>
  )
}

export default SelectLogCropContainer
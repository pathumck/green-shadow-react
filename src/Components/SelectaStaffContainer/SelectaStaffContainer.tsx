import React from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

function SelectaStaffContainer() {
  return (
    <>
            <div className="row">
              <div className="col-12">
                <h6 className="sub-topic">Select staff</h6>
              </div>
              <div className="col-6 pb-2">
                <label className="">Select a Staff </label>
                <br />
                <select className="form-select" aria-label="Default select example">
                  <option selected>Select a Staff</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-6">
                <label className="">Selected Staff </label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6">
                <label className="">First Name </label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6">
                <label className="">Last Name</label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6">
                <label className="">Gender</label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6">
                <label className="">Address</label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6 img-container">
              <label className="">Designation</label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
                <label className="">Role</label>
                <br />
                <input className="form-control me-2" placeholder="" disabled />
              </div>
              <div className="col-6 add-btn-div">
                <button className="btn btn-primary add-btn">Add <MdOutlineAddCircleOutline size={15} /></button>
              </div>
            </div>
    </>
  )
}

export default SelectaStaffContainer
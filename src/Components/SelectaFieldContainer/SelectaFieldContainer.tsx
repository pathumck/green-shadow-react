import React from "react";
import "./SelectaFieldContainer.css";
function SelectaFieldContainer() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className="sub-topic">Select a field</h6>
        </div>
        <div className="col-6 pb-2">
          <label className="">Select a Field </label>
          <br />
          <select className="form-select" aria-label="Default select example">
            <option selected>Select a field</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-6">
          <label className="">Selected Field </label>
          <br />
          <input className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Name </label>
          <br />
          <input className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Location </label>
          <br />
          <input className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Size </label>
          <br />
          <input className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6"></div>
        <div className="col-6 img-container">
          <label className="">Image One </label>
          <br />
          <div className="img-wrap">
            <img
              src=""
              className="img-fluid img-selected-field"
              alt="Image One"
            />
          </div>
        </div>
        <div className="col-6 img-container">
          <label className="">Image One </label>
          <br />
          <div className="img-wrap">
            <img src="" alt="Image Two" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectaFieldContainer;

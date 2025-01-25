import React from "react";
import "./CreateLogBottomComponent.css";

function CreateLogBottomComponent() {
  return (
    <>
      <div>
        <h6 className="sub-topic">Log Note</h6>
        <div className="row">
          <div className="col-12 log-column">
            <label className="mb-2">Observation Image</label>
            <div className="obs-img-wrap">
              <img src="" alt="" />
            </div>
            <input type="file" className="form-control mt-2 w-75" />
            <hr className="w-75" style={{ borderTop: "1px solid black" }} />
          </div>
          <div className="col-12 log-column">
            <label>Description</label>
            <textarea className="form-control mt-2" rows={5}></textarea>
            <hr className="w-75" style={{ borderTop: "1px solid black" }} />
            <label>Status</label>
            <select
              className="form-select mb-4 w-50 mt-2"
              aria-label="Default select example"
            >
              <option selected>Open</option>
              <option value="1">Closed</option>
              <option value="2">Pending</option>
            </select>
            <button type="button" className="btn btn-success mb-2">
              Create Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLogBottomComponent;

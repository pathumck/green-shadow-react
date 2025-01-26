import React from "react";

function VehicleDetailsModal(props: any) {
  return (
    <>
      <div
        className="modal fade"
        id="vehicle"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Vehicle"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ height: "220px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>Number</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label>Category</label>
                  <select className="form-select">
                    <option selected value="1">
                      Heavy
                    </option>
                    <option value="2">Light</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Fuel Type</label>
                  <select className="form-select">
                    <option selected value="1">
                      Diesal
                    </option>
                    <option value="2">Patrol</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Remarks</label>
                  <select className="form-select">
                    <option selected value="1">
                      Available
                    </option>
                    <option value="2">Not Available</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Status</label>
                  <select className="form-select">
                    <option selected value="1">
                      Good Condition
                    </option>
                    <option value="2">Bad Condition</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Staff ID</label>
                  <select className="form-select">
                    <option selected value="1">
                      1
                    </option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                {props.text.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleDetailsModal;

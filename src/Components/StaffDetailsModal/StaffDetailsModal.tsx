import React from "react";

function StaffDetailsModal(props: any) {
  return (
    <>
      <div
        className="modal fade"
        id="staff"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Staff"}
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
              style={{ height: "330px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>First Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                <label>Last Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label>Birth Day</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-6">
                  <label>Gender</label>
                  <select className='form-select'>
                    <option selected value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div className="col-6">
                <label>Phone</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label>E mail</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                  <label>Address</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6">
                <label>Designation</label>
                <select className='form-select'>
                    <option selected value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Role</label>
                  <select className='form-select'>
                    <option selected value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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

export default StaffDetailsModal;

import React from "react";

function UserDetailsModal(props: any) {
  return (
    <>
      <div
        className="modal fade"
        id="user"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "300px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " User"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ height: "220px" }}>
              <div className="row">
                <div className="col-12">
                  <label>User Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12">
                  <label>Password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="col-12">
                  <label>Role</label>
                  <select className="form-control">
                    <option value="" selected disabled>
                      Select a role
                    </option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SCIENTIST">SCIENTIST</option>
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

export default UserDetailsModal;

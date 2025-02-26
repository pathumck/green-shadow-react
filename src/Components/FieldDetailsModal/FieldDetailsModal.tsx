import React, { useState } from "react";
import "./FieldDetailsModal.css";

function FieldDetailsModal(props: any) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  
  
  return (
    <>
      <div
        className="modal fade"
        id="field"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Field"}
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
              style={{ height: "325px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>Name</label>
                  <input 
                    value={name} 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-6">
                  <label>Location</label>
                  <input
                    value={location}
                    type="text"
                    className="form-control"
                    onChange={(e) => setLocation(e.target.value)} 
                  />
                </div>
                <div className="col-6">
                  <label>Size</label>
                  <input 
                    value={size} 
                    type="text" 
                    className="form-control"
                    onChange={(e) => setSize(e.target.value)} 
                  />
                </div>
                <div className="col-6"></div>
                <div className="col-6">
                  <label>Image One</label>
                  <input type="file" className="form-control" />
                  <div className="modal-img-wrap mt-2">
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="col-6">
                  <label>Image Two</label>
                  <input type="file" className="form-control" />
                  <div className="modal-img-wrap mt-2">
                    <img src="" alt="" />
                  </div>
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
export default FieldDetailsModal;

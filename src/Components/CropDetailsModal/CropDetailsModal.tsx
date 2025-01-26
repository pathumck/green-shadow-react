import React from 'react'

function CropDetailsModal(props: any) {
  return (
    <>
      <div
        className="modal fade"
        id="crop"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Crop"}
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
              <div className='row'>
                <div className='col-6'>
                  <label>Common Name</label>
                  <input type="text" className='form-control' />
                </div>
                <div className='col-6'>
                  <label>Scientific Name</label>
                  <input type="text" className='form-control' />
                </div>
                <div className='col-6'>
                  <label>Category</label>
                  <select className='form-select'>
                    <option selected value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className='col-6'>
                  <label>Season</label>
                  <select className='form-select'>
                    <option selected value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-6">
                <label>Image One</label>
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
  )
}

export default CropDetailsModal
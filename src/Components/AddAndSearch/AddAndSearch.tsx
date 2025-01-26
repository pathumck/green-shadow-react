import React from "react";
import "./AddAndSearch.css";

function AddAndSearch(props: any) {
  return (
    <>
      <div className="container-fluid d-flex">
        <button type="button" className="btn btn-success w-25" data-bs-toggle="modal" data-bs-target={props.target} onClick={props.setShowModal}>
          {"Add a " + props.btntext}
        </button>
        <div className="d-flex ms-auto">
          <input
            className="me-2 input-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default AddAndSearch;

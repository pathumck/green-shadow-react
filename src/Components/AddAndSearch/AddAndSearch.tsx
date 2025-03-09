import { useState } from "react";
import "./AddAndSearch.css";

function AddAndSearch(props: any) {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="container-fluid d-flex">
        <button
          type="button"
          className="btn btn-success w-25"
          data-bs-toggle="modal"
          data-bs-target={props.target}
          onClick={props.setShowModal}
        >
          {"Add a " + props.btntext}
        </button>
        <div className="d-flex ms-auto">
          <input
            className="me-2 input-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              props.search(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AddAndSearch;

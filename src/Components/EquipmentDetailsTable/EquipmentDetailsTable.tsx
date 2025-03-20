import React from "react";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";

function EquipmentDetailsTable() {
  const allEquipments = useSelector((state: RootState) => state.equipments);
  return (
    <>
      <div className="container-fluid mt-5" style={{ maxHeight: "320px", minHeight: "320px", overflowY: "scroll" }}>
        <table className="table table-striped table-bordered">
          <thead className="table-dark sticky-top">
            <tr className="text-center fw-bolder">
              <th scope="col">#</th>
              <th scope="col">Equipment Id</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allEquipments.map((equipment, index) => (
              <tr className="text-center fw-bold" key={index}>
                <th scope="row">{index + 1}</th>
                <td>{equipment.id}</td>
                <td>{equipment.name}</td>
                <td>{equipment.brand}</td>
                <td>{equipment.model}</td>
                <td>{equipment.category}</td>
                <td>
                  <button className="btn btn-primary">Update</button>
                  <button className="btn btn-danger ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EquipmentDetailsTable;

import React from "react";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import Swal from "sweetalert2";
import { deleteEquipment } from "../../redux/slices/equipmentSlice";

function EquipmentDetailsTable(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };
  const allEquipments = useSelector((state: RootState) => state.equipments);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure to delete this equipment : " + id + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteEquipment(id));
      }
    });
  };
  return (
    <>
      <div
        className="container-fluid mt-5"
        style={{ maxHeight: "320px", minHeight: "320px", overflowY: "scroll" }}
      >
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
            {allEquipments
              .filter((equipment) => {
                return props.search === ""
                  ? equipment
                  : equipment.id
                      .toLowerCase()
                      .includes(props.search.toLowerCase());
              })
              .map((equipment, index) => (
                <tr className="text-center fw-bold" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{equipment.id}</td>
                  <td>{equipment.name}</td>
                  <td>{equipment.brand}</td>
                  <td>{equipment.model}</td>
                  <td>{equipment.category}</td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target={props.target}
                      className="btn btn-primary"
                      onClick={() => {
                        props.setShowModal();

                        handleUpdateOrDelete(equipment.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(equipment.id)}
                    >
                      Delete
                    </button>
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

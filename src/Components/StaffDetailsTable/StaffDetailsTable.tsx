import { AppDispatch, RootState } from "../../redux/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import { deleteStaff } from "../../redux/slices/staffSlice";

function StaffDetailsTable(props: any) {
  const staff = useSelector((state: RootState) => state.staff);
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStaff(id));
  };
  return (
    <>
      <div
        className="container-fluid mt-5"
        style={{ maxHeight: "320px", overflowY: "scroll" }}
      >
        <table className="table table-striped table-bordered">
          <thead className="table-dark sticky-top">
            <tr className="text-center" style={{ fontSize: "12px" }}>
              <th scope="col">
                #
              </th>
              <th scope="col">
                Staff Id
              </th>
              <th scope="col">
                First Name
              </th>
              <th scope="col">
                Last Name
              </th>
              <th scope="col">
                Birth Day
              </th>
              <th scope="col">
                Gender
              </th>
              <th scope="col">
                Phone
              </th>
              <th scope="col">
                E mail
              </th>
              <th scope="col">
                Address
              </th>
              <th scope="col">
                Designation
              </th>
              <th scope="col">
                Role
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff, index) => (
              <tr
                className="text-center fw-bolder"
                key={index}
                style={{ fontSize: "12px" }}
              >
                <th scope="row">{index + 1}</th>
                <td>{staff.id}</td>
                <td>{staff.firstName}</td>
                <td>{staff.lastName}</td>
                <td>{staff.birthDay}</td>
                <td>{staff.gender}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td>{staff.designation}</td>
                <td>{staff.role}</td>
                <td>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={props.target}
                    onClick={() => {
                      props.setShowModal("Update");
                      handleUpdateOrDelete(staff.id);
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateOrDelete(staff.id);
                      handleDelete(staff.id);
                    }}
                    className="btn btn-sm btn-danger mx-2 "
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

export default StaffDetailsTable;

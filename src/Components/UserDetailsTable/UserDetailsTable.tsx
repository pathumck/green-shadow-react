import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { deleteUser, fetchAllUsers } from "../../redux/slices/usersSlice";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

function UserDetailsTable(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const allUsers = useSelector((state: RootState) => state.users);

  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure to delete this user: " + id + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
      }
    });
  };
  return (
    <>
      <div
        className="container mt-5"
        style={{ height: "320px", maxHeight: "320px", overflowY: "scroll" }}
      >
        <table className="table table-striped table-bordered">
          <thead className="table-dark sticky-top">
            <tr className="text-center fw-bolder">
              <th scope="col">#</th>
              <th scope="col">User Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers
              .filter(
                (user) =>
                  props.search === "" ||
                  user.username
                    .toLowerCase()
                    .includes(props.search.toLowerCase())
              )
              .map((user, index) => (
                <tr className="text-center fw-bold" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target={props.target}
                      className="btn btn-outline-primary"
                      onClick={() => {
                        props.setShowModal();
                        handleUpdateOrDelete(user.id);
                      }}
                    >
                      <FaEdit className="me-1" /> Update
                    </button>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash className="me-1" />
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

export default UserDetailsTable;

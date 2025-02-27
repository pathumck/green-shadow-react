import { AppDispatch, RootState } from "../../redux/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import { deleteField } from "../../redux/slices/fieldSlice";

function FieldDetailsTable(props: any) {
  const fields = useSelector((state: RootState) => state.fields);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteField(id));
  };

  return (
    <>
      <div className="container-fluid">
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col" className="text-center">
                FieldCode
              </th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Location
              </th>
              <th scope="col" className="text-center">
                Size
              </th>
              <th scope="col" className="text-center">
                Image One
              </th>
              <th scope="col" className="text-center">
                Image Two
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr className="text-center" key={index}>
                <th>{index + 1}</th>
                <td>{field.id}</td>
                <td>{field.name}</td>
                <td>{field.location}</td>
                <td>{field.size}</td>
                <td>
                  {field.imageOne && (
                    <img
                      src={field.imageOne}
                      alt="Image One"
                      style={{ width: "150px", height: "100px" }}
                    />
                  )}
                </td>
                <td>
                  {field.imageTwo && (
                    <img
                      src={field.imageTwo}
                      alt="Image Two"
                      style={{ width: "150px", height: "100px" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={props.target}
                    onClick={() => {
                      props.setShowModal("Update");
                      handleUpdateOrDelete(field.id);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateOrDelete(field.id);
                      handleDelete(field.id);
                    }}
                    className="btn btn-danger mx-2 "
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

export default FieldDetailsTable;

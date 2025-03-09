import { AppDispatch, RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import { deleteField } from "../../redux/slices/fieldSlice";
import Swal from "sweetalert2";

function FieldDetailsTable(props: any) {
  const fields = useSelector((state: RootState) => state.fields);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure to delete this field: " + id + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteField(id));
      }
    });
  };

  return (
    <>
      <div
        className="container-fluid mt-5"
        style={{ maxHeight: "320px", overflowY: "scroll" }}
      >
        <table className="table table-bordered table-striped">
          <thead className="table-dark sticky-top">
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
            {fields
              .filter((field) => {
                return props.search.toLowerCase() === ""
                  ? field
                  : field.name
                      .toLowerCase()
                      .includes(props.search.toLowerCase());
              })
              .map((field, index) => (
                <tr className="text-center fw-bold" key={index}>
                  <td>{index + 1}</td>
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

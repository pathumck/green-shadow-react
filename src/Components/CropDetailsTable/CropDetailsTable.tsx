import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import { deleteCrop } from "../../redux/slices/cropSlice";
import Swal from "sweetalert2";

function CropDetailsTable(props: any) {
  const crops = useSelector((state: RootState) => state.crops);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = async(id: string) => {
    Swal.fire({
      title: "Are you sure to delete this crop: " + id + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCrop(id));
      }
    })
  };

  return (
    <>
      <div
        className="container-fluid mt-5"
        style={{ maxHeight: "320px", overflowY: "scroll" }}
      >
        <table className="table table-bordered table-striped">
          <thead className="table-dark sticky-top">
            <tr className="text-center fw-bold">
              <th scope="col">#</th>
              <th scope="col">Crop Code</th>
              <th scope="col">Common Name</th>
              <th scope="col">Scientific Name</th>
              <th scope="col">Category</th>
              <th scope="col">Season</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {crops
              .filter((crop) => {
                return props.search === ""
                  ? crop
                  : crop.commonName
                      .toLowerCase()
                      .includes(props.search.toLowerCase());
              })
              .map((crop, index) => (
                <tr className="text-center fw-bold" key={index}>
                  <td>{index + 1}</td>
                  <td>{crop.id}</td>
                  <td>{crop.commonName}</td>
                  <td>{crop.scientificName}</td>
                  <td>{crop.category}</td>
                  <td>{crop.season}</td>
                  <td>
                    {crop.image && (
                      <img
                        src={crop.image}
                        alt="Crop Image"
                        width="150px"
                        height="100px"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target={props.target}
                      onClick={() => {
                        props.setShowModal("Update");
                        handleUpdateOrDelete(crop.id);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateOrDelete(crop.id);
                        handleDelete(crop.id);
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

export default CropDetailsTable;

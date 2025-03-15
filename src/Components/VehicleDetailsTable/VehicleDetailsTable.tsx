import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { updateOrDelete } from "../../redux/slices/updateOrDeleteSlice";
import { deleteVehicle } from "../../redux/slices/vehicleSlice";
import Swal from "sweetalert2";

function VehicleDetailsTable(props: any) {
  const allVehicles = useSelector((state: RootState) => state.vehicles);
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdateOrDelete = (id: string) => {
    dispatch(updateOrDelete(id));
  };

  const handleDelete = async (id: string, number: string) => {
    Swal.fire({
      title: "Are you sure to delete this vehicle: " + number + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteVehicle(id));
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
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Vehicle Code</th>
              <th scope="col">Number</th>
              <th scope="col">Category</th>
              <th scope="col">Fuel Type</th>
              <th scope="col">Remarks</th>
              <th scope="col">Status</th>
              <th scope="col">Staff Id</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allVehicles
              .filter((vehicle) => {
                return props.search === ""
                  ? vehicle
                  : vehicle.number
                      .toLowerCase()
                      .includes(props.search.toLowerCase());
              })
              .map((vehicle, index) => (
                <tr className="text-center fw-bolder" key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.number}</td>
                  <td>{vehicle.category}</td>
                  <td>{vehicle.fuelType}</td>
                  <td>{vehicle.remarks}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.staffId}</td>
                  <td>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target={props.target}
                      className="btn btn-primary"
                      onClick={() => {
                        props.setShowModal();
                        handleUpdateOrDelete(vehicle.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id, vehicle.number)}
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

export default VehicleDetailsTable;

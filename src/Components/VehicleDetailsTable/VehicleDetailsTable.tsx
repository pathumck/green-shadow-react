import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

function VehicleDetailsTable(props: any) {
  const allVehicles = useSelector((state: RootState) => state.vehicles);
  return (
    <>
      <div className="container-fluid mt-5" style={{ maxHeight: "320px", minHeight: "320px", overflowY: "scroll" }}>
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
            {allVehicles.map((vehicle, index) => (
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
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-2 ">Delete</button>
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

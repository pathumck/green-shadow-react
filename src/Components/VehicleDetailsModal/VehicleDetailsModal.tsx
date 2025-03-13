import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createVehicle } from "../../redux/slices/vehicleSlice";
import Vehicle from "../../modals/Vehicle";

function VehicleDetailsModal(props: any) {
  const [number, setNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const allStaff = useSelector((state: RootState) => state.staff);

  const handleSubmit = async () => {
    const newVehicle = new Vehicle(
      "ds",
      number,
      category,
      fuelType,
      remarks,
      status,
      staffId
    );
    await dispatch(createVehicle(newVehicle));
  };

  return (
    <>
      <div
        className="modal fade"
        id="vehicle"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Vehicle"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ height: "220px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>Number</label>
                  <input
                    value={number}
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="col-6">
                  <label>Category</label>
                  <select
                    value={category}
                    className="form-select"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="" selected disabled>
                      Select a category
                    </option>
                    <option value="Heavy">Heavy</option>
                    <option value="Light">Light</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Fuel Type</label>
                  <select
                    value={fuelType}
                    className="form-select"
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select a fuel type
                    </option>
                    <option value="Diesal">Diesal</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Remarks</label>
                  <select
                    value={remarks}
                    className="form-select"
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  >
                    <option value="" selected disabled>
                      Select a remark
                    </option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Status</label>
                  <select
                    value={status}
                    className="form-select"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="" selected disabled>
                      Select a condition
                    </option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Bad Condition">Bad Condition</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Staff ID</label>
                  <select
                    value={staffId}
                    className="form-select"
                    onChange={(e) => {
                      setStaffId(e.target.value);
                    }}
                  >
                    <option selected disabled value="">
                      Select a staff
                    </option>
                    {allStaff.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.id + " - " + staff.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handleSubmit()}
                type="button"
                className="btn btn-primary"
              >
                {props.text.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleDetailsModal;

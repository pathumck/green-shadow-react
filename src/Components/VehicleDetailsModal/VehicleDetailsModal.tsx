import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createVehicle, updateVehicle } from "../../redux/slices/vehicleSlice";
import Vehicle from "../../modals/Vehicle";

function VehicleDetailsModal(props: any) {
  const [number, setNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
    const [validate, setValidate] = useState<{
      status: number | null;
      message: string;
    }>();

  const dispatch = useDispatch<AppDispatch>();
  const allStaff = useSelector((state: RootState) => state.staff);
  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const vehicle = useSelector((state: RootState) =>
    state.vehicles.find((vehicle) => vehicle.id === updateOrDeleteId)
  );

  const textTitle = props.text.title;

  useEffect(() => {
    if (props.text.title === "Update") {
      setNumber(vehicle?.number || "");
      setCategory(vehicle?.category || "");
      setFuelType(vehicle?.fuelType || "");
      setRemarks(vehicle?.remarks || "");
      setStatus(vehicle?.status || "");
      setStaffId(vehicle?.staffId || "");
      setValidate({ status: null, message: "" });
    } else {
      setNumber("");
      setCategory("");
      setFuelType("");
      setRemarks("");
      setStatus("");
      setStaffId("");
      setValidate({ status: null, message: "" });
    }
  }, [updateOrDeleteId, textTitle]);

  const validateForm = () : boolean => {
    if (!number) {
      setValidate({ status: 1, message: "Number is required" });
      return false;
    }
    if (!category) {
      setValidate({ status: 2, message: " Select a category" });
      return false;
    }
    if (!fuelType) {
      setValidate({ status: 3, message: "Select a fuel type" });
      return false;
    }
    if (!remarks) {
      setValidate({ status: 4, message: "Enter remarks" });
      return false;
    }
    if (!status) {
      setValidate({ status: 5, message: "Select a status" });
      return false;
    }
    if (!staffId) {
      setValidate({ status: 6, message: "Select a staff" });
      return false;
    }
    return true;
  }


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    if (props.text.title === "Add") {
      const newVehicle = new Vehicle(
        "",
        number,
        category,
        fuelType,
        remarks,
        status,
        staffId
      );
      await dispatch(createVehicle(newVehicle));
    } else {
      const updatedVehicle = new Vehicle(
        updateOrDeleteId,
        number,
        category,
        fuelType,
        remarks,
        status,
        staffId
      );
      await dispatch(updateVehicle(updatedVehicle));
    }
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
                    className={
                      validate?.status && validate.status === 1
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                  {validate?.status && validate.status === 1 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Category</label>
                  <select
                    value={category}
                    className={
                      validate?.status && validate.status === 2
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 2 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Fuel Type</label>
                  <select
                    value={fuelType}
                    className={
                      validate?.status && validate.status === 3
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select a fuel type
                    </option>
                    <option value="Diesal">Diesal</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Other">Other</option>
                  </select>
                  {validate?.status && validate.status === 3 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Remarks</label>
                  <select
                    value={remarks}
                    className={
                      validate?.status && validate.status === 4
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 4 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Status</label>
                  <select
                    value={status}
                    className={
                      validate?.status && validate.status === 5
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 5 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Staff ID</label>
                  <select
                    value={staffId}
                    className={
                      validate?.status && validate.status === 6
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 6 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary vehicle-modal-close"
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

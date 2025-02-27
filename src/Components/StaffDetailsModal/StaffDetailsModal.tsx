import React from "react";
import { useState } from "react";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { createStaff } from "../../redux/slices/staffSlice";
import Staff from "../../modals/Staff";

function StaffDetailsModal(props: any) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (props.text.title === "Add") {
      const newStaff = new Staff(
        "",
        firstName,
        lastName,
        birthDay,
        gender,
        phone,
        email,
        address,
        designation,
        role
      );
      console.log(newStaff);
      await dispatch(createStaff(newStaff));
      setFirstName("");
      setLastName("");
      setBirthDay("");
      setGender("");
      setPhone("");
      setEmail("");
      setAddress("");
      setDesignation("");
      setRole("");
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="staff"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " Staff"}
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
              style={{ height: "330px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>First Name</label>
                  <input
                    value={firstName}
                    type="text"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Last Name</label>
                  <input
                    value={lastName}
                    type="text"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Birth Day</label>
                  <input
                    value={birthDay}
                    type="date"
                    className="form-control"
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Gender</label>
                  <select
                    value={gender}
                    className="form-select"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option selected disabled value="">
                      Select a gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Phone</label>
                  <input
                    value={phone}
                    type="text"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>E mail</label>
                  <input
                    value={email}
                    type="text"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Address</label>
                  <input
                    value={address}
                    type="text"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Designation</label>
                  <select
                    value={designation}
                    className="form-select"
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option selected disabled value="">
                      Select a designation
                    </option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SENIOR ASSISTANT MANAGER">
                      SENIOR ASSISTANT MANAGER
                    </option>
                    <option value="JUNIOR MANAGER">JUNIOR MANAGER</option>
                    <option value="ASSISTANT MANAGER">ASSISTANT MANAGER</option>
                    <option value="HR MANAGER">HR MANAGER</option>
                    <option value="OFFICE ASSISTANT">OFFICE ASSISTANT</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                    <option value="LABOUR">LABOUR</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Role</label>
                  <select
                    value={role}
                    className="form-select"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select a role
                    </option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                    <option value="ADMIN">ADMINISTRATIVE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary staff-modal-close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
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

export default StaffDetailsModal;

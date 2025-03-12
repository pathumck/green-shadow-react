import React, { useEffect } from "react";
import { useState } from "react";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createStaff, updateStaff } from "../../redux/slices/staffSlice";
import Staff from "../../modals/Staff";
import { RootState } from "../../redux/store/store";

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
  const [validate, setValidate] = useState<{
    status: number | null;
    message: string;
  }>();

  const dispatch = useDispatch<AppDispatch>();
  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const staff = useSelector((state: RootState) =>
    state.staff.find((staff) => staff.id === updateOrDeleteId)
  );
  const textTitle = props.text.title;

  useEffect(() => {
    if (props.text.title === "Update") {
      setFirstName(staff?.firstName || "");
      setLastName(staff?.lastName || "");
      setBirthDay(staff?.birthDay || "");
      setGender(staff?.gender || "");
      setPhone(staff?.phone || "");
      setEmail(staff?.email || "");
      setAddress(staff?.address || "");
      setDesignation(staff?.designation || "");
      setRole(staff?.role || "");
    } else {
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
  }, [updateOrDeleteId, textTitle]);

  const validateForm = (): boolean => {
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const phoneRegex = /^(?:\+94|0)([1-9][0-9])\d{7}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName || !nameRegex.test(firstName)) {
      setValidate({ status: 1, message: "Enter a valid first name." });
      return false;
    }
    if (!lastName || !nameRegex.test(lastName)) {
      setValidate({ status: 2, message: "Enter a valid last name." });
      return false;
    }
    if (!birthDay) {
      setValidate({ status: 3, message: "Please select a date." });
      return false;
    }
    if (!gender) {
      setValidate({ status: 4, message: "Please select a gender." });
      return false;
    }
    if (!phone || !phoneRegex.test(phone)) {
      setValidate({ status: 5, message: "Enter a valid number." });
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      setValidate({ status: 6, message: "Enter a valid email." });
      return false;
    }
    if (!address || !nameRegex.test(address)) {
      setValidate({ status: 7, message: "Enter a valid address." });
      return false;
    }
    if (!designation) {
      setValidate({ status: 8, message: "Please select a designation." });
      return false;
    }
    if (!role || !nameRegex.test(role)) {
      setValidate({ status: 9, message: "Please select a role." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setValidate({ status: null, message: "" });
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
    } else {
      const updatedStaff = new Staff(
        updateOrDeleteId,
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
      await dispatch(updateStaff(updatedStaff));
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
                    className={
                      validate?.status && validate.status === 1
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {validate?.status && validate.status === 1 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Last Name</label>
                  <input
                    value={lastName}
                    type="text"
                    className={
                      validate?.status && validate.status === 2
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {validate?.status && validate.status === 2 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Birth Day</label>
                  <input
                    value={birthDay}
                    type="date"
                    className={
                      validate?.status && validate.status === 3
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                  {validate?.status && validate.status === 3 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Gender</label>
                  <select
                    value={gender}
                    className={
                      validate?.status && validate.status === 4
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option selected disabled value="">
                      Select a gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {validate?.status && validate.status === 4 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Phone</label>
                  <input
                    value={phone}
                    type="text"
                    className={
                      validate?.status && validate.status === 5
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {validate?.status && validate.status === 5 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>E mail</label>
                  <input
                    value={email}
                    type="text"
                    className={
                      validate?.status && validate.status === 6
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validate?.status && validate.status === 6 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Address</label>
                  <input
                    value={address}
                    type="text"
                    className={
                      validate?.status && validate.status === 7
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {validate?.status && validate.status === 7 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Designation</label>
                  <select
                    value={designation}
                    className={
                      validate?.status && validate.status === 8
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 8 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Role</label>
                  <select
                    value={role}
                    className={
                      validate?.status && validate.status === 9
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  {validate?.status && validate.status === 9 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
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

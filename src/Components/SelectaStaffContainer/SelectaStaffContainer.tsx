import React, { useEffect, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createFieldsStaff } from "../../redux/slices/field'sStaffSlice";
import FieldStaff from "../../modals/Field'sStaff";

function SelectaStaffContainer() {
  const allStaff = useSelector((state: RootState) => state.staff);
  const fieldId = useSelector((state: RootState) => state.logData.fieldId);
  const [staffId, setStaffId] = useState<string>();
  const [selectedStaffId, setSelectedStaffId] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [designation, setDesignation] = useState<string>();
  const [role, setRole] = useState<string>();

  const disptach = useDispatch<AppDispatch>();

  useEffect(() => {
    const selectedStaffMember = allStaff.find((member) => staffId == member.id);
    if (selectedStaffMember) {
      setSelectedStaffId(selectedStaffMember.id);
      setFirstName(selectedStaffMember.firstName);
      setLastName(selectedStaffMember.lastName);
      setGender(selectedStaffMember.gender);
      setAddress(selectedStaffMember.address);
      setDesignation(selectedStaffMember.designation);
      setRole(selectedStaffMember.role);
    }
  }, [staffId]);

  const handleSubmit = async () => {
    const fieldStaff = new FieldStaff(fieldId, staffId);
    await disptach(createFieldsStaff(fieldStaff));
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className="sub-topic">Select staff</h6>
        </div>
        <div className="col-6 pb-2">
          <label className="">Select a Staff </label>
          <br />
          <select
            className="form-select"
            value={staffId}
            aria-label="Default select example"
            onChange={(e) => setStaffId(e.target.value)}
          >
            <option disabled selected value="">
              Select a staff member
            </option>
            {allStaff.map((staff) => (
              <option value={staff.id}>
                {staff.id + " - " + staff.firstName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label className="">Selected Staff </label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={selectedStaffId}
          />
        </div>
        <div className="col-6">
          <label className="">First Name </label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={firstName}
          />
        </div>
        <div className="col-6">
          <label className="">Last Name</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={lastName}
          />
        </div>
        <div className="col-6">
          <label className="">Gender</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={gender}
          />
        </div>
        <div className="col-6">
          <label className="">Address</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={address}
          />
        </div>
        <div className="col-6 img-container">
          <label className="">Designation</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={designation}
          />
          <label className="">Role</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={role}
          />
        </div>
        <div className="col-6 add-btn-div">
          <button className="btn btn-primary add-btn" onClick={() => {handleSubmit()}}>
            Add <MdOutlineAddCircleOutline size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectaStaffContainer;

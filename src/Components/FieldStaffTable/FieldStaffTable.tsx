import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { deleteFieldStaff, fetchFieldsStaff } from "../../redux/slices/field'sStaffSlice";
import FieldStaff from "../../modals/Field'sStaff";

function FieldStaffTable(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFieldsStaff());
  }, [dispatch]);
  const fieldsStaff = useSelector((state: RootState) => state.fieldStaff);
  const allStaff = useSelector((state: RootState) => state.staff);
  console.log(fieldsStaff);

  const handleDelete = async (staffId: string | undefined) => {
    const toDelete = new FieldStaff(props.fieldId, staffId);
    await dispatch(deleteFieldStaff(toDelete));
  };

  return (
    <>
      <h6 className="sub-topic mt-2">
        Selected field :{" "}
        <label className="form-label fw-bolder">
          {props.fieldId || "None"}
        </label>
      </h6>
      <div className="container-fluid table-wrapper">
        <table className="table table-striped table-bordered">
          <thead className="table-dark sticky-top">
            <tr style={{ fontSize: "12px" }} className="text-center">
              <th scope="col">#</th>
              <th scope="col">Staff Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone</th>
              <th scope="col">E mail</th>
              <th scope="col">Address</th>
              <th scope="col">Designation</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!props.fieldId ? (
              <tr>
                <td colSpan={12} className="text-center fw-bold">
                  Select a field
                </td>
              </tr>
            ) : fieldsStaff.filter(
                (staff) => props.fieldId && props.fieldId === staff.fieldId
              ).length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center fw-bold">
                  No staff associated with the field
                </td>
              </tr>
            ) : (
              fieldsStaff
                .filter((crop) => {
                  return props.fieldId && props.fieldId === crop.fieldId;
                })
                .map((fieldStaff, index) => {
                  const staffDetails = allStaff.find(
                    (staff) => staff.id === fieldStaff.staffId
                  );

                  return (
                    <tr
                      className="text-center fw-bolder"
                      key={fieldStaff.staffId}
                      style={{ fontSize: "12px" }}
                    >
                      <td>{index + 1}</td>
                      <td>{staffDetails?.id}</td>
                      <td>{staffDetails?.firstName}</td>
                      <td>{staffDetails?.lastName}</td>
                      <td>{staffDetails?.birthDay}</td>
                      <td>{staffDetails?.gender}</td>
                      <td>{staffDetails?.phone}</td>
                      <td>{staffDetails?.email}</td>
                      <td>{staffDetails?.address}</td>
                      <td>{staffDetails?.designation}</td>
                      <td>{staffDetails?.role}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(staffDetails?.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FieldStaffTable;

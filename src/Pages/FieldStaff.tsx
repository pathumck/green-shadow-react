import React, { useState } from "react";
import SelectaFieldContainer from "../Components/SelectaFieldContainer/SelectaFieldContainer";
import SelectaStaffContainer from "../Components/SelectaStaffContainer/SelectaStaffContainer";
import PageTitle from "../Components/PageTitle/PageTitle";
import { FaSunPlantWilt } from "react-icons/fa6";
import FieldStaffTable from "../Components/FieldStaffTable/FieldStaffTable";
import NavBar from "../Components/NavBar/NavBar";

function FieldStaff() {
  const [validate, setValidate] = useState("form-control");
  return (
    <>
      <NavBar />
      <PageTitle
        title="Field Staff"
        icon={<FaSunPlantWilt className="align-baseline" size={22} />}
      />
      <div className="row main-wrap-div gap-5 mb-5">
        <div className="col-6 col-md-5 col-dev">
          <SelectaFieldContainer validate={validate} />
        </div>
        <div className="col-6 col-md-5 col-dev">
          <SelectaStaffContainer />
        </div>
       
          <div className="col-lg-12 col-md-11 col-sm-6 col-6 col-dev">
            <FieldStaffTable />
          </div>
       </div>
    </>
  );
}

export default FieldStaff;

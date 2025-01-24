import React from "react";
import SelectaFieldContainer from "../Components/SelectaFieldContainer/SelectaFieldContainer";
import SelectaStaffContainer from "../Components/SelectaStaffContainer/SelectaStaffContainer";
import PageTitle from "../Components/PageTitle/PageTitle";
import { FaSunPlantWilt } from "react-icons/fa6";

function FieldStaff() {
  return (
    <>
      <PageTitle
        title="Field Staff"
        icon={<FaSunPlantWilt className="align-baseline" size={22} />}
      />
      <div className="row main-wrap-div gap-5 mb-5">
        <div className="col-6 col-md-5 col-dev">
          <SelectaFieldContainer />
        </div>
        <div className="col-6 col-md-5 col-dev">
          <SelectaStaffContainer />
        </div>
      </div>
    </>
  );
}

export default FieldStaff;

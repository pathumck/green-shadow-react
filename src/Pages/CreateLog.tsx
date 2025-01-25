import React from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import { SiReadthedocs } from "react-icons/si";
import SelectLogStaffContainer from "../Components/SelectLogStaffContainer/SelectLogStaffContainer";
import SelectaFieldContainer from "../Components/SelectaFieldContainer/SelectaFieldContainer";
import SelectLogCropContainer from "../Components/SelectLogCropContainer/SelectLogCropContainer";
import CreateLogBottomComponent from "../Components/CreateLogBottomComponent/CreateLogBottomComponent";

function CreateLog() {
  return (
    <>
      <PageTitle
        title="Create Log"
        icon={<SiReadthedocs className="align-baseline" size={22} />}
      />

      <SelectLogStaffContainer />
      <div className="row main-wrap-div gap-5 mb-5">
        <div className="col-6 col-md-5 col-dev">
          <SelectaFieldContainer />
        </div>
        <div className="col-6 col-md-5 col-dev">
          <SelectLogCropContainer />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-6 col-dev">
          <CreateLogBottomComponent />
        </div>
      </div>
    </>
  );
}

export default CreateLog;

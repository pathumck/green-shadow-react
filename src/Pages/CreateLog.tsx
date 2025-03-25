import { useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import { SiReadthedocs } from "react-icons/si";
import SelectLogStaffContainer from "../Components/SelectLogStaffContainer/SelectLogStaffContainer";
import SelectaFieldContainer from "../Components/SelectaFieldContainer/SelectaFieldContainer";
import SelectLogCropContainer from "../Components/SelectLogCropContainer/SelectLogCropContainer";
import CreateLogBottomComponent from "../Components/CreateLogBottomComponent/CreateLogBottomComponent";
import NavBar from "../Components/NavBar/NavBar";

function CreateLog() {
  const [validateFieldId, setValidateFieldId] = useState("form-control");
  const [validateCropId, setValidateCropId] = useState("form-control");

  return (
    <>
      <NavBar />
      <PageTitle
        title="Create Log"
        icon={<SiReadthedocs className="align-baseline" size={22} />}
      />

      <SelectLogStaffContainer />
      <div className="row main-wrap-div gap-5 mb-5">
        <div className="col-6 col-md-5 col-dev">
          <SelectaFieldContainer validate={validateFieldId} />
        </div>
        <div className="col-6 col-md-5 col-dev">
          <SelectLogCropContainer validate={validateCropId} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-6 col-dev">
          <CreateLogBottomComponent
            setValidateFieldId={setValidateFieldId}
            setValidateCropId={setValidateCropId}
          />
        </div>
      </div>
    </>
  );
}

export default CreateLog;

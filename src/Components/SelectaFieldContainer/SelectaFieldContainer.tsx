import React, { useEffect, useState } from "react";
import "./SelectaFieldContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { updateFieldId } from "../../redux/slices/logDataSlice";
function SelectaFieldContainer() {
  const [fieldId, setFieldId] = useState("");
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldLocation, setFieldLocation] = useState("");
  const [fieldSize, setFieldSize] = useState<number>(0);
  const [fieldImageOne, setFieldImageOne] = useState("");
  const [fieldImageTwo, setFieldImageTwo] = useState("");
  const fields = useSelector((state: RootState) => state.fields);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    const selectedField = fields.find((field) => field.id === fieldId);
    if (selectedField) {
      dispatch(updateFieldId(selectedField.id));
      setSelectedFieldId(selectedField.id);
      setFieldName(selectedField.name);
      setFieldLocation(selectedField.location);
      setFieldSize(selectedField.size);
      setFieldImageOne(selectedField.imageOne || "");
      setFieldImageTwo(selectedField.imageTwo || "");
    }
  }, [fieldId]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className="sub-topic">Select a field</h6>
        </div>
        <div className="col-6 pb-2">
          <label className="">Select a Field </label>
          <br />
          <select value={fieldId} className="form-select" aria-label="Default select example" onChange={(e) => setFieldId(e.target.value)}>
            <option value="" selected disabled>Select a field</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.id + " - "}
                {field.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label className="">Selected Field </label>
          <br />
          <input value={selectedFieldId} className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Name </label>
          <br />
          <input value={fieldName} className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Location </label>
          <br />
          <input value={fieldLocation} className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6">
          <label className="">Size </label>
          <br />
          <input value={(fieldSize)} className="form-control me-2" placeholder="" disabled />
        </div>
        <div className="col-6"></div>
        <div className="col-6 img-container">
          <label className="">Image One </label>
          <br />
          <div className="img-wrap justify-content-center align-items-center d-flex">
            <img
              src= {fieldImageOne}
              alt="Image One"
              style={{maxWidth: "150px", maxHeight: "130px"}}
            />
          </div>
        </div>
        <div className="col-6 img-container">
          <label className="">Image One </label>
          <br />
          <div className="img-wrap justify-content-center align-items-center d-flex">
            <img 
              src= {fieldImageTwo} 
              alt="Image Two"
              style={{maxWidth: "150px", maxHeight: "130px"}}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectaFieldContainer;

import React from "react";
import "./CreateLogBottomComponent.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateImage, updateStatus } from "../../redux/slices/logDataSlice";
import { createLog } from "../../redux/slices/logSlice";
import Log from "../../modals/Log";

function CreateLogBottomComponent() {
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const selectedFieldId = useSelector(
    (state: RootState) => state.logData.fieldId
  );
  const selectedCropId = useSelector(
    (state: RootState) => state.logData.cropId
  );
  const selectedUserId = useSelector(
    (state: RootState) => state.logData.userId
  );

  const handleSubmit = async () => {
    console.log("Submitted");
    await dispatch(
      createLog(
        new Log(
          0,
          selectedUserId,
          "",
          selectedFieldId,
          selectedCropId,
          description,
          status,
          imagePreview || ""
        )
      )
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        dispatch(updateImage(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        <h6 className="sub-topic">Log Note</h6>
        <div className="row">
          <div className="col-12 log-column">
            <label className="mb-2">Observation Image</label>
            <div className="obs-img-wrap d-flex justify-content-center align-items-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Two Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </div>
            <input
              onChange={handleImageChange}
              type="file"
              className="form-control mt-2 w-75"
            />
            <hr className="w-75" style={{ borderTop: "1px solid black" }} />
          </div>
          <div className="col-12 log-column">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                dispatch(updateImage(e.target.value));
              }}
              className="form-control mt-2"
              rows={5}
            ></textarea>
            <hr className="w-75" style={{ borderTop: "1px solid black" }} />
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                dispatch(updateStatus(e.target.value));
              }}
              className="form-select mb-4 w-50 mt-2"
              aria-label="Default select example"
            >
              <option value="" selected disabled>
                Select status
              </option>
              <option value="Lush">Lush</option>
              <option value="Wet">Wet</option>
              <option value="Dry">Dry</option>
              <option value="Stuned">Stuned</option>
              <option value="Blighted">Blighted</option>
              <option value="Infested">Infested</option>
            </select>
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              className="btn btn-success mb-2"
            >
              Create Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLogBottomComponent;

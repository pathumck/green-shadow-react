import React, { useEffect, useState } from "react";
import "./CreateLogBottomComponent.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCropId,
  updateFieldId,
  updateImage,
  updateStatus,
} from "../../redux/slices/logDataSlice";
import { createLog } from "../../redux/slices/logSlice";
import Log from "../../modals/Log";
import Swal from "sweetalert2";

function CreateLogBottomComponent(props: any) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [validateBottom, setValidateBottom] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateFieldId(null));
    dispatch(updateCropId(null));
  }, []);

  const selectedFieldId = useSelector(
    (state: RootState) => state.logData.fieldId
  );
  const selectedCropId = useSelector(
    (state: RootState) => state.logData.cropId
  );
  const selectedUserId = useSelector(
    (state: RootState) => state.logData.userId
  );

  const validateForm = () => {
    if (!selectedFieldId) {
      props.setValidateFieldId("form-control is-invalid");
      Swal.fire("Please select a field", "", "error");
      return false;
    }
    props.setValidateFieldId("form-control");
    if (!selectedCropId) {
      props.setValidateCropId("form-control is-invalid");
      Swal.fire("Please select a crop", "", "error");
      return false;
    }
    props.setValidateCropId("form-control");
    if (!selectedUserId) {
      Swal.fire("Please select a user", "", "error");
      return false;
    }
    if (!image) {
      Swal.fire("Please select an image", "", "error");
      setValidateBottom(1);
      return false;
    }
    if (!description) {
      Swal.fire("Please type a description", "", "error");
      setValidateBottom(2);
      return false;
    }
    if (!status) {
      Swal.fire("Please select a status", "", "error");
      setValidateBottom(3);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    Swal.fire({
      title: "Do you want to place this log?",
      html: `<img src="${imagePreview}" width="150" height="100"><br><b>Field:</b> ${selectedFieldId}<br><b>Crop:</b> ${selectedCropId}<br><b>Image:</b> <br><b>Description:</b> ${description}<br><b>Status:</b> ${status}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Place",
      denyButtonText: `Don't place`,
    }).then(async (result) => {
      if (result.isConfirmed) {
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
        setValidateBottom(0);
      }
    });
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
              className={
                validateBottom === 1
                  ? "form-control is-invalid mt-2 w-75"
                  : "form-control mt-2 w-75"
              }
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
              className={
                validateBottom === 2
                  ? "form-control is-invalid mt-2"
                  : "form-control mt-2"
              }
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
              className={
                validateBottom === 3
                  ? "form-control is-invalid mb-4 w-50 mt-2"
                  : "form-select mb-4 w-50 mt-2"
              }
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

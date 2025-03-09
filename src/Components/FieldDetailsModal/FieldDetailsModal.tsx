import React, { useEffect, useRef, useState } from "react";
import "./FieldDetailsModal.css";
import { useDispatch, useSelector } from "react-redux";
import { createField, updateField } from "../../redux/slices/fieldSlice";
import Field from "../../modals/Field";
import { AppDispatch } from "../../redux/store/store";
import { RootState } from "../../redux/store/store";
import Swal from "sweetalert2";
function FieldDetailsModal(props: any) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<number | "">("");
  const [imageOne, setImageOne] = useState<File | null | string>(null);
  const [imageTwo, setImageTwo] = useState<File | null | string>(null);
  const [imageOnePreview, setImageOnePreview] = useState<string | null>(null);
  const [imageTwoPreview, setImageTwoPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [validate, setValidate] = useState<{
    status: number | null;
    message: string;
  }>();
  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const field = useSelector((state: RootState) =>
    state.fields.find((field) => field.id === updateOrDeleteId)
  );
  const textTitle = props.text.title;

  const clearFileInputOne = useRef<HTMLInputElement>(null);
  const clearFileInputTwo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.text.title === "Update") {
      setValidate({ status: null, message: "" });
      setName(field?.name || "");
      setLocation(field?.location || "");
      setSize(field?.size || "");
      setImageOnePreview(field?.imageOne || null);
      setImageTwoPreview(field?.imageTwo || null);
      setImageOne("previous");
      setImageTwo("previous");
    } else {
      setImageOne(null);
      setImageTwo(null);
      setValidate({ status: null, message: "" });
      setName("");
      setLocation("");
      setSize("");
      setImageOnePreview(null);
      setImageTwoPreview(null);
      if (clearFileInputOne.current) {
        clearFileInputOne.current.value = "";
      }
      if (clearFileInputTwo.current) {
        clearFileInputTwo.current.value = "";
      }
    }
  }, [updateOrDeleteId, textTitle]);

  const validateForm = (): boolean => {
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const locationRegex = /^[A-Za-z\s]{3,50}$/;
    const sizeRegex = /^[0-9]{1,3}$/;
    if (!name || !nameRegex.test(name)) {
      setValidate({ status: 1, message: "Please enter a valid name." });
      return false;
    }
    if (!location || !locationRegex.test(location)) {
      setValidate({ status: 2, message: "Please enter a valid location." });
      return false;
    }
    if (!size || !sizeRegex.test(size.toString())) {
      setValidate({ status: 3, message: "Please enter a valid size." });
      return false;
    }
    if (!imageOne) {
      setValidate({ status: 4, message: "Please select an image." });
      return false;
    }
    if (!imageTwo) {
      setValidate({ status: 5, message: "Please select an image." });
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
      Swal.fire({
        title: "Do you want to save the new field?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newField = new Field(
            "",
            name,
            location,
            size,
            imageOnePreview,
            imageTwoPreview
          );
          await dispatch(createField(newField));
          setName("");
          setLocation("");
          setSize("");
          setImageOne(null);
          setImageTwo(null);
          setImageOnePreview(null);
          setImageTwoPreview(null);
          if (clearFileInputOne.current) {
            clearFileInputOne.current.value = "";
          }
          if (clearFileInputTwo.current) {
            clearFileInputTwo.current.value = "";
          }
        }
      });
    } else {
      const newField = new Field(
        updateOrDeleteId,
        name,
        location,
        size,
        imageOnePreview,
        imageTwoPreview
      );
      Swal.fire({
        title: "Do you want to update the field : " + updateOrDeleteId + "?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `Don't update`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(updateField(newField));
        }
      });
    }
  };

  const handleImageOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageOne(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageOnePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageTwo(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageTwoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="field"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {textTitle +
                  " Field" +
                  (textTitle === "Update" ? " : " + updateOrDeleteId : "")}
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
              style={{ height: "325px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>Name</label>
                  <input
                    value={name}
                    type="text"
                    className={
                      validate?.status && validate.status === 1
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setName(e.target.value)}
                  />
                  {validate?.status && validate.status === 1 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Location</label>
                  <input
                    value={location}
                    type="text"
                    className={
                      validate?.status && validate.status === 2
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {validate?.status && validate.status === 2 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Size</label>
                  <input
                    value={size}
                    type="text"
                    className={
                      validate?.status && validate.status === 3
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setSize(Number(e.target.value))}
                  />
                  {validate?.status && validate.status === 3 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6"></div>
                <div className="col-6">
                  <label>Image One</label>
                  <input
                    ref={clearFileInputOne}
                    type="file"
                    className={
                      validate?.status && validate.status === 4
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleImageOneChange}
                  />
                  {validate?.status && validate.status === 4 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                  <div className="modal-img-wrap mt-2 justify-content-center align-items-center d-flex">
                    {imageOnePreview && (
                      <img
                        src={imageOnePreview}
                        alt="Image One Preview"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <label>Image Two</label>
                  <input
                    ref={clearFileInputTwo}
                    type="file"
                    className={
                      validate?.status && validate.status === 5
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleImageTwoChange}
                  />
                  {validate?.status && validate.status === 5 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                  <div className="modal-img-wrap mt-2 justify-content-center align-items-center d-flex">
                    {imageTwoPreview && (
                      <img
                        src={imageTwoPreview}
                        alt="Image Two Preview"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary field-modal-close"
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
export default FieldDetailsModal;

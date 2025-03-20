import React, { useEffect, useState } from "react";
import Equipment from "../../modals/Equipment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  createEquipment,
  updateEquipment,
} from "../../redux/slices/equipmentSlice";
import Swal from "sweetalert2";

function EquipmentDetailsModal(props: any) {
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [validate, setValidate] = useState<{
    status: number | null;
    message: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const equipment = useSelector((state: RootState) =>
    state.equipments.find((equipment) => equipment.id === updateOrDeleteId)
  );
  const textTitle = props.text.title;
  useEffect(() => {
    if (props.text.title === "Update") {
      setName(equipment?.name || "");
      setBrand(equipment?.brand || "");
      setModel(equipment?.model || "");
      setCategory(equipment?.category || "");
      setValidate({ status: null, message: "" });
    } else {
      setName("");
      setBrand("");
      setModel("");
      setCategory("");
      setValidate({ status: null, message: "" });
    }
  }, [updateOrDeleteId, textTitle]);

  const validateForm = () => {
    const inputRegex = /^[A-Za-z\s]{3,50}$/;
    if (!name && !inputRegex.test(name)) {
      setValidate({ status: 1, message: "Enter a valid name." });
      return false;
    }
    if (!brand && !inputRegex.test(brand)) {
      setValidate({ status: 2, message: "Enter a valid brand." });
      return false;
    }
    if (!model && !inputRegex.test(model)) {
      setValidate({ status: 3, message: "Enter a valid model." });
      return false;
    }
    if (!category) {
      setValidate({ status: 4, message: "Select a category." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setValidate({ status: null, message: "" });
    if (props.text.title === "Add") {
      Swal.fire({
        title: "Do you want to save the new equipment?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newEquipment = new Equipment("", name, brand, model, category);
          await dispatch(createEquipment(newEquipment));
          setName("");
          setBrand("");
          setModel("");
          setCategory("");
        }
      });
    } else {
      Swal.fire({
        title:
          "Do you want to update this equipment : " + updateOrDeleteId + "?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `Don't update`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedEquipment = new Equipment(
            updateOrDeleteId,
            name,
            brand,
            model,
            category
          );
          await dispatch(updateEquipment(updatedEquipment));
        }
      });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="equipment"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {textTitle +
                  " Equipment" +
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
              style={{ height: "170px", overflowY: "scroll" }}
            >
              <div className="row">
                <div className="col-6">
                  <label>Name</label>
                  <input
                    value={name}
                    type="text"
                    className={
                      validate?.status === 1
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setName(e.target.value)}
                  />
                  {validate?.status === 1 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Brand</label>
                  <input
                    value={brand}
                    type="text"
                    className={
                      validate?.status === 2
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setBrand(e.target.value)}
                  />
                  {validate?.status === 2 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Model</label>
                  <input
                    value={model}
                    type="text"
                    className={
                      validate?.status === 3
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setModel(e.target.value)}
                  />
                  {validate?.status === 3 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
                <div className="col-6">
                  <label>Category</label>
                  <select
                    value={category}
                    className={
                      validate?.status === 4
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select category
                    </option>
                    <option value="OFFICE">OFFICE</option>
                    <option value="FIELD">FIELD</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="IT">IT</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                  {validate?.status === 4 && (
                    <label className="text-danger">{validate.message}</label>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary equipment-modal-close"
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

export default EquipmentDetailsModal;

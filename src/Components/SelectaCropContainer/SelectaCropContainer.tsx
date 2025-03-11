import "./SelectaCropContainer.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { createFieldCrop } from "../../redux/slices/field'sCropsSlice";
import FieldCrop from "../../modals/Field'sCrop";
import { updateFieldId } from "../../redux/slices/logDataSlice";
import Swal from "sweetalert2";

function SelectaCropContainer(props: any) {
  const crops = useSelector((state: RootState) => state.crops);
  const fieldId = useSelector((state: RootState) => state.logData.fieldId);
  const fieldCrops = useSelector((state: RootState) => state.fieldCrops);
  const [cropId, setCropId] = useState<string>("");
  const [selectedCropId, setSelectedCropId] = useState<string>("");
  const [commonName, setCommonName] = useState<string>("");
  const [scientificName, setScientificName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [Image, setImage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [validate, setValidate] = useState<boolean>(true);

  useEffect(() => {
    const selectedCrop = crops.find((crop) => crop.id === cropId);
    if (selectedCrop) {
      setSelectedCropId(selectedCrop.id);
      setCommonName(selectedCrop.commonName);
      setScientificName(selectedCrop.scientificName);
      setCategory(selectedCrop.category);
      setSeason(selectedCrop.season);
      setImage(selectedCrop.image || "");
    }
  }, [cropId]);

  useEffect(() => {
    dispatch(updateFieldId(null));
  }, []);

  const validateForm = () => {
    if (!fieldId) {
      props.setValidate("form-control is-invalid");
      return false;
    }
    props.setValidate("form-control");
    if (!cropId) {
      setValidate(false);
      return false;
    }
    if (
      fieldCrops.some(
        (field) => fieldId === field.fieldId && cropId === field.cropId
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "This crop : " +
          cropId +
          " is already selected for this field : " +
          fieldId,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    Swal.fire({
      title: "Do you want to\nadd crop : " + cropId + "\nto field : " + fieldId + " ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `Don't add`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setValidate(true);
        const fieldCrop = new FieldCrop(fieldId, cropId);
        await dispatch(createFieldCrop(fieldCrop));
      } 
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h6 className="sub-topic">Select a crop</h6>
        </div>
        <div className="col-6 pb-2">
          <label className="">Select a Crop </label>
          <br />
          <select
            className={
              validate === false ? "form-control is-invalid" : "form-control"
            }
            aria-label="Default select example"
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
          >
            <option value="" selected disabled>
              Select a Crop
            </option>
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.id + " - "}
                {crop.commonName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label className="">Selected Crop </label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={selectedCropId}
          />
        </div>
        <div className="col-6">
          <label className="">Common Name </label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={commonName}
          />
        </div>
        <div className="col-6">
          <label className="">Scientific Name</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={scientificName}
          />
        </div>
        <div className="col-6">
          <label className="">Category</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={category}
          />
        </div>
        <div className="col-6">
          <label className="">Season</label>
          <br />
          <input
            className="form-control me-2"
            placeholder=""
            disabled
            value={season}
          />
        </div>
        <div className="col-6 img-container">
          <label className="">Image</label>
          <br />
          <div className="img-wrap justify-content-center align-items-center d-flex">
            <img
              src={Image}
              alt=""
              style={{ maxWidth: "150px", maxHeight: "130px" }}
            />
          </div>
        </div>
        <div className="col-6 add-btn-div">
          <button className="btn btn-primary add-btn" onClick={handleSubmit}>
            Add <MdOutlineAddCircleOutline size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectaCropContainer;

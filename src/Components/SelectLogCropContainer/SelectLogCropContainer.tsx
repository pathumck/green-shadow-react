import { AppDispatch, RootState } from "../../redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCropId } from "../../redux/slices/logDataSlice";

function SelectLogCropContainer() {
  const [cropId, setCropId] = useState("");
  const [selectedCropId, setSelectedCropId] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [cropImage, setImage] = useState("");

  const crops = useSelector((state: RootState) => state.crops);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const selectedCrop = crops.find((crop) => crop.id === cropId);
    if (selectedCrop) {
      dispatch(updateCropId(selectedCrop.id));
      setSelectedCropId(selectedCrop.id);
      setCommonName(selectedCrop.commonName);
      setScientificName(selectedCrop.scientificName);
      setCategory(selectedCrop.category);
      setSeason(selectedCrop.season);
      setImage(selectedCrop.image || "");
    }
  }, [cropId]);

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
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="" selected disabled>
              Select a crop
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
            value={selectedCropId}
            className="form-control me-2"
            placeholder=""
            disabled
          />
        </div>
        <div className="col-6">
          <label className="">Common Name </label>
          <br />
          <input
            value={commonName}
            className="form-control me-2"
            placeholder=""
            disabled
          />
        </div>
        <div className="col-6">
          <label className="">Scientific Name</label>
          <br />
          <input
            value={scientificName}
            className="form-control me-2"
            placeholder=""
            disabled
          />
        </div>
        <div className="col-6">
          <label className="">Category</label>
          <br />
          <input
            value={category}
            className="form-control me-2"
            placeholder=""
            disabled
          />
        </div>
        <div className="col-6">
          <label className="">Season</label>
          <br />
          <input
            value={season}
            className="form-control me-2"
            placeholder=""
            disabled
          />
        </div>
        <div className="col-6 img-container">
          <label className="">Image</label>
          <br />
          <div className="img-wrap justify-content-center align-items-center d-flex">
            <img
              src={cropImage}
              alt="Image One"
              style={{ maxWidth: "150px", maxHeight: "130px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectLogCropContainer;

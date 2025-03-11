import React, { useEffect } from "react";
import "./FieldCropsTable.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  deleteFieldCrop,
  fetchFieldsCrops,
} from "../../redux/slices/field'sCropsSlice";
import FieldCrop from "../../modals/Field'sCrop";
import Swal from "sweetalert2";

function FieldCropsTable(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFieldsCrops());
  }, [dispatch]);
  const fieldsCrops = useSelector((state: RootState) => state.fieldCrops);
  const allCrops = useSelector((state: RootState) => state.crops);
  const selectedFieldId = useSelector(
    (state: RootState) => state.logData.fieldId
  );

  const handleDelete = async (cropId: string | undefined) => {
    Swal.fire({
      title:
        "Are you sure to delete\nthis crop : " +
        cropId +
        "\nfrom field : " +
        selectedFieldId +
        " ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toDelete = new FieldCrop(selectedFieldId, cropId);
        await dispatch(deleteFieldCrop(toDelete));
      }
    });
  };

  return (
    <>
      <h6 className="sub-topic mt-2">
        Selected field :{" "}
        <label className="form-label fw-bolder">
          {props.fieldId || "None"}
        </label>
      </h6>
      <div
        className="container-fluid table-wrapper"
        style={{ maxHeight: "320px", overflowY: "scroll" }}
      >
        <table className="table table-bordered table-striped">
          <thead className="table-dark sticky-top">
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Crop Code</th>
              <th scope="col">Common Name</th>
              <th scope="col">Scientific Name</th>
              <th scope="col">Category</th>
              <th scope="col">Season</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!props.fieldId ? (
              <tr>
                <td colSpan={8} className="text-center fw-bold">
                  Select a field
                </td>
              </tr>
            ) : fieldsCrops.filter(
                (crop) => props.fieldId && props.fieldId === crop.fieldId
              ).length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center fw-bold">
                  No crops in the field
                </td>
              </tr>
            ) : (
              fieldsCrops
                .filter((crop) => {
                  return props.fieldId && props.fieldId === crop.fieldId;
                })
                .map((fieldCrop, index) => {
                  const cropDetails = allCrops.find(
                    (crop) => crop.id === fieldCrop.cropId
                  );

                  return (
                    <tr
                      className="text-center fw-bolder"
                      key={fieldCrop.cropId}
                    >
                      <td>{index + 1}</td>
                      <td>{cropDetails?.id}</td>
                      <td>{cropDetails?.commonName}</td>
                      <td>{cropDetails?.scientificName}</td>
                      <td>{cropDetails?.category}</td>
                      <td>{cropDetails?.season}</td>
                      <td>
                        {cropDetails?.image && (
                          <img
                            src={cropDetails.image}
                            alt="Image"
                            style={{ width: "150px", height: "100px" }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(cropDetails?.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FieldCropsTable;

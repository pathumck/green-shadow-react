import React, { useRef, useState } from "react";
import "./FieldDetailsModal.css";
import { useDispatch } from "react-redux";
import { createField } from "../../redux/slices/fieldSlice";
import Field from "../../modals/Field";
import { AppDispatch } from "../../redux/store/store";
function FieldDetailsModal(props: any) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [imageOne, setImageOne] = useState<File|null>(null);
  const [imageTwo, setImageTwo] = useState<File|null>(null);
  const [imageOnePreview, setImageOnePreview] = useState<string|null>(null);
  const [imageTwoPreview, setImageTwoPreview] = useState<string|null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const clearFileInputOne = useRef<HTMLInputElement>(null)
  const clearFileInputTwo = useRef<HTMLInputElement>(null)
  
  const handleSubmit = async() => {
    const newField = new Field("F0012223d", name, location, size, imageOnePreview, imageTwoPreview);
    console.log(newField)
    await dispatch(createField(newField));
    setName("");
    setLocation("");
    setSize(0);
    setImageOne(null);
    setImageTwo(null);
    setImageOnePreview(null);
    setImageTwoPreview(null);
  }

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
                {props.text.title + " Field"}
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
                    className="form-control" 
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-6">
                  <label>Location</label>
                  <input
                    value={location}
                    type="text"
                    className="form-control"
                    onChange={(e) => setLocation(e.target.value)} 
                  />
                </div>
                <div className="col-6">
                  <label>Size</label>
                  <input 
                    value={size} 
                    type="text" 
                    className="form-control"
                    onChange={(e) => setSize(Number(e.target.value))} 
                  />
                </div>
                <div className="col-6"></div>
                <div className="col-6">
                  <label>Image One</label>
                  <input ref={clearFileInputOne} type="file" className="form-control" onChange={handleImageOneChange}  />
                  <div className="modal-img-wrap mt-2 justify-content-center align-items-center d-flex">
                  {imageOnePreview && (
                      <img
                        src={imageOnePreview}
                        alt="Image One Preview"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                      />
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <label>Image Two</label>
                  <input ref={clearFileInputTwo} type="file" className="form-control" onChange={handleImageTwoChange} />
                  <div className="modal-img-wrap mt-2 justify-content-center align-items-center d-flex">
                    {imageTwoPreview && (
                      <img
                        src={imageTwoPreview}
                        alt="Image Two Preview"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
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

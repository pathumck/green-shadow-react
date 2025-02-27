import React, { useState, useRef, useEffect } from 'react'
import Crop from '../../modals/Crop'
import { useDispatch, useSelector } from 'react-redux'
import { createCrop, updateCrop } from '../../redux/slices/cropSlice'
import { AppDispatch, RootState } from '../../redux/store/store'

function CropDetailsModal(props: any) {
  const [commonName, setCommonName] = useState<string>("")
  const [scientificName, setScientificName] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [season, setSeason] = useState<string>("")
  const [image, setImage] = useState<File|null>(null)
  const [imagePreview, setImagePreview] = useState<string|null>(null)

  const dispatch = useDispatch<AppDispatch>();
  const updateOrDeleteId = useSelector((state: RootState) => state.updateOrDelete);
  const crop = useSelector((state: RootState) => state.crops.find((crop) => crop.id === updateOrDeleteId));
  const textTitle = props.text.title

  const clearFileInput = useRef<HTMLInputElement>(null)

  useEffect(() => { 
    console.log(props.text.title)
    console.log(crop)
    console.log(updateOrDeleteId)
    if (props.text.title === "Update") {
      setCommonName(crop?.commonName || "");
      setScientificName(crop?.scientificName || "");
      setCategory(crop?.category || "");
      setSeason(crop?.season || "");
      setImagePreview(crop?.image || null);
    } else {
      setCommonName("");
      setScientificName("");
      setCategory("");
      setSeason("");
      setImagePreview(null);
    }
  }, [updateOrDeleteId, textTitle]);

  const handleSubmit = async ()=> {
    if(props.text.title === "Add"){
      const newCrop = new Crop("", commonName, scientificName, category, season, imagePreview)
      console.log(newCrop)
      await dispatch(createCrop(newCrop)); 
      setCommonName("")
      setScientificName("")
      setCategory("")
      setSeason("")
      setImagePreview(null)
      if (clearFileInput.current) {
        clearFileInput.current.value = '';
      }
    }else{
      const updatedCrop = new Crop(updateOrDeleteId, commonName, scientificName, category, season, imagePreview)
      console.log(updatedCrop)
      await dispatch(updateCrop(updatedCrop));
    }
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      <div
        className="modal fade"
        id="crop"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {textTitle + " Crop"}
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
              style={{ height: "330px", overflowY: "scroll" }}
            >
              <div className='row'>
                <div className='col-6'>
                  <label>Common Name</label>
                  <input onChange={(e) => setCommonName(e.target.value)} value={commonName} type="text" className='form-control' />
                </div>
                <div className='col-6'>
                  <label>Scientific Name</label>
                  <input onChange={(e) => setScientificName(e.target.value)} value={scientificName} type="text" className='form-control' />
                </div>
                <div className='col-6'>
                  <label>Category</label>
                  <select className='form-select' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Select a category</option>
                    <option value="Vegitable">Vegitable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Seed">Seed</option>
                    <option value="Rice">Rice</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className='col-6'>
                  <label>Season</label>
                  <select className='form-select' value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="" disabled>Select a season</option>
                    <option value="Yala">Yala</option>
                    <option value="Maha">Maha</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-6">
                <label>Image</label>
                <input ref={clearFileInput} type="file" className="form-control" onChange={handleImageChange} />
                <div className="modal-img-wrap mt-2 justify-content-center align-items-center d-flex">
                  {imagePreview && (
                    <img 
                      src={imagePreview} 
                      alt="Image Preview"
                      style={{ maxWidth: "100%", height: "100%" }} 
                      />
                  )}
                </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary crop-modal-close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleSubmit} type="button" className="btn btn-primary">
                {props.text.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CropDetailsModal
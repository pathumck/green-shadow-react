import React, { useState, useEffect } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import { FaPlantWilt } from "react-icons/fa6";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import CropDetailsTable from "../Components/CropDetailsTable/CropDetailsTable";
import CropDetailsModal from "../Components/CropDetailsModal/CropDetailsModal";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Crops() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) =>
    setShowModal({ title: title, btnText: btnText });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  return (
    <>
      <NavBar />
      <PageTitle
        title="Crops"
        icon={<FaPlantWilt className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="crop"
        target="#crop"
        setShowModal={() => handleShow("Add", "Save Crop")}
        search={setSearch}
      />
      <CropDetailsTable
        target="#crop"
        setShowModal={() => handleShow("Update", "Update Crop")}
        search={search}
      />
      <CropDetailsModal text={showModal} />
    </>
  );
}

export default Crops;

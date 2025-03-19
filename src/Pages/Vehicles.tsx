import React, { useEffect, useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { GiFarmTractor } from "react-icons/gi";
import VehicleDetailsTable from "../Components/VehicleDetailsTable/VehicleDetailsTable";
import VehicleDetailsModal from "../Components/VehicleDetailsModal/VehicleDetailsModal";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Vehicles() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) => {
    setShowModal({ title: title, btnText: btnText });
  };
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
        title="Vehicles"
        icon={<GiFarmTractor className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="vehicle"
        target="#vehicle"
        setShowModal={() => {
          handleShow("Add", "Save Vehicle");
        }}
        search={setSearch}
      />
      <VehicleDetailsTable
        target="#vehicle"
        setShowModal={() => handleShow("Update", "Update Vehicle")}
        search={search}
      />
      <VehicleDetailsModal text={showModal} />
    </>
  );
}

export default Vehicles;

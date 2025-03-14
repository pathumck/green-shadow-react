import React, { useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { GiFarmTractor } from "react-icons/gi";
import VehicleDetailsTable from "../Components/VehicleDetailsTable/VehicleDetailsTable";
import VehicleDetailsModal from "../Components/VehicleDetailsModal/VehicleDetailsModal";
import NavBar from "../Components/NavBar/NavBar";

function Vehicles() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) => {
    setShowModal({ title: title, btnText: btnText });
  };
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
      />
      <VehicleDetailsTable
        target="#vehicle"
        setShowModal={() => handleShow("Update", "Update Vehicle")}
      />
      <VehicleDetailsModal text={showModal} />
    </>
  );
}

export default Vehicles;

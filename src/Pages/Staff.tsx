import React, { useEffect, useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { GiFarmer } from "react-icons/gi";
import StaffDetailsTable from "../Components/StaffDetailsTable/StaffDetailsTable";
import StaffDetailsModal from "../Components/StaffDetailsModal/StaffDetailsModal";
import NavBar from "../Components/NavBar/NavBar";

function Staff() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) => {
    setShowModal({ title: title, btnText: btnText });
  };
  const [search, setSearch] = useState("");
  return (
    <>
      <NavBar />
      <PageTitle
        title="Staff"
        icon={<GiFarmer className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="staff"
        target="#staff"
        setShowModal={() => {
          handleShow("Add", "Save Staff");
        }}
        search={setSearch}
      />
      <StaffDetailsTable
        target="#staff"
        setShowModal={() => handleShow("Update", "Update Staff")}
        search={search}
      />
      <StaffDetailsModal text={showModal} />
    </>
  );
}

export default Staff;

import React, { useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { GiFarmer } from "react-icons/gi";
import StaffDetailsTable from "../Components/StaffDetailsTable/StaffDetailsTable";
import StaffDetailsModal from "../Components/StaffDetailsModal/StaffDetailsModal";

function Staff() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) => {
    setShowModal({ title: title, btnText: btnText });
  };
  return (
    <>
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
      />
      <StaffDetailsTable />
      <StaffDetailsModal text={showModal} />
    </>
  );
}

export default Staff;

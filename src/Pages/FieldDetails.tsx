import { useState } from "react";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import PageTitle from "../Components/PageTitle/PageTitle";
import { FaSunPlantWilt } from "react-icons/fa6";
import FieldDetailsTable from "../Components/FieldDetailsTable/FieldDetailsTable";
import FieldDetailsModal from "../Components/FieldDetailsModal/FieldDetailsModal";
import NavBar from "../Components/NavBar/NavBar";

function FieldDetails(props: any) {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) =>
    setShowModal({ title: title, btnText: btnText });
  const [search, setSearch] = useState("");

  return (
    <>
      <NavBar />
      <PageTitle
        title="Field Details"
        icon={<FaSunPlantWilt className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="field"
        target="#field"
        setShowModal={() => handleShow("Add", "Save Field")}
        search={setSearch}
      />
      <FieldDetailsTable
        target="#field"
        setShowModal={() => handleShow("Update", "Update Field")}
        search={search}
      />
      <FieldDetailsModal text={showModal} />
    </>
  );
}

export default FieldDetails;

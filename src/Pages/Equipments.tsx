import { useState, useEffect } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { GiDigDug } from "react-icons/gi";
import EquipmentDetailsTable from "../Components/EquipmentDetailsTable/EquipmentDetailsTable";
import EquipmentDetailsModal from "../Components/EquipmentDetailsModal/EquipmentDetailsModal";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Equipments() {
  const [showModal, setShowModal] = useState({ title: "", btnText: "" });
  const handleShow = (title: string, btnText: string) =>
    setShowModal({ title: title, btnText: btnText });
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
        title="Equipments"
        icon={<GiDigDug className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="equipment"
        target="#equipment"
        setShowModal={() => handleShow("Add", "Save Equipment")}
      />
      <EquipmentDetailsTable
      target="#equipment"
      setShowModal={() => handleShow("Update", "Update Equipment")}
       />
      <EquipmentDetailsModal text={showModal} />
    </>
  );
}

export default Equipments;

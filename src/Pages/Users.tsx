import React, { useEffect, useState } from "react";
import PageTitle from "../Components/PageTitle/PageTitle";
import AddAndSearch from "../Components/AddAndSearch/AddAndSearch";
import { FaUserFriends } from "react-icons/fa";
import NavBar from "../Components/NavBar/NavBar";
import UserDetailsModal from "../Components/UserDetailsModal/UserDetailsModal";
import UserDetailsTable from "../Components/UserDetailsTable/UserDetailsTable";
import { useNavigate } from "react-router-dom";

function Users() {
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
        title="Users"
        icon={<FaUserFriends className="align-baseline" size={22} />}
      />
      <AddAndSearch
        btntext="user"
        target="#user"
        setShowModal={() => handleShow("Add", "Create User")}
        search={setSearch}
      />
      <UserDetailsModal text={showModal} />
      <UserDetailsTable
        target="#user"
        setShowModal={() => handleShow("Update", "Update User")}
        search={search}
      />
    </>
  );
}

export default Users;

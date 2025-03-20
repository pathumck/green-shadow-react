import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { FaSunPlantWilt, FaPlantWilt } from "react-icons/fa6";
import { SiReadthedocs } from "react-icons/si";
import { GiFarmer, GiFarmTractor, GiDigDug } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axiosInstance from "../../utils/axios_instance";
import Swal from "sweetalert2";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.post("/auth/logout");
        localStorage.removeItem("user");
        localStorage.removeItem("refresh");
        navigate("/login", { replace: true });
      }
    });
  };

  function setlogedRole(): string {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.role;
    }
    return "";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{zIndex: 1000}}>
        <div className="container-fluid">
          <img src="public/green-shadow.png" alt="" width="110" />
          {setlogedRole() === "SCIENTIST" ? (
            <>
              <MdAdminPanelSettings size={25} />
              <span className="ms-2 fw-bold text-success">Scientist</span>
            </>
          ) : setlogedRole() === "MANAGER" ? (
            <>
              <MdAdminPanelSettings size={25} />
              <span className="ms-2 fw-bold text-primary">Manager</span>
            </>
          ) : setlogedRole() === "ADMIN" ? (
            <>
              <MdAdminPanelSettings size={25} />
              <span className="ms-2 fw-bold text-danger">Admin</span>
            </>
          ) : (
            ""
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/dashboard">
                  <MdDashboard className="me-1" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaSunPlantWilt className="me-1" />
                  Fields
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/fieldDetails">
                      Field Details
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/fieldCrops">
                      Field's Crops
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/fieldStaff">
                      Field's Staff
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crops">
                  <FaPlantWilt className="me-1" />
                  Crops
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/staff">
                  <GiFarmer className="me-1" />
                  Staff
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <SiReadthedocs className="me-1" />
                  Logs
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/createlog">
                      Create Log
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/previouslogs">
                      Previous Logs
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vehicles">
                  <GiFarmTractor className="me-1" />
                  Vehicles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/equipments">
                  <GiDigDug className="me-1" />
                  Equipments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <FaUserFriends className="me-1" />
                  Users
                </Link>
              </li>
              <li className="nav-item" onClick={() => handleLogout()}>
                <Link className="nav-link text-danger fw-bold" to="#">
                  <RiLogoutCircleRLine className="me-1" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard} from "react-icons/md";
import { FaSunPlantWilt, FaPlantWilt } from "react-icons/fa6";
import { SiReadthedocs } from "react-icons/si";
import { GiFarmer, GiFarmTractor, GiDigDug } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

function NavBar() {
  return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <img src="public/green shadow.png" alt="" width= "170" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/dashboard"><MdDashboard className="me-1" />Dashboard</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaSunPlantWilt className="me-1" />
                    Fields
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/fieldDetails">Field Details</Link></li>
                    <li><Link className="dropdown-item" to="/fieldCrops">Field's Crops</Link></li>
                    <li><Link className="dropdown-item" to="/fieldStaff">Field's Staff</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crops">
                  <FaPlantWilt className="me-1" />
                  Crops</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/staff">
                  <GiFarmer className="me-1" />
                  Staff</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <SiReadthedocs className="me-1" />
                    Logs
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/createlog">Create Log</Link></li>
                    <li><Link className="dropdown-item" to="/previouslogs">Previous Logs</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vehicles">
                  <GiFarmTractor className="me-1" />
                  Vehicles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/equipments">
                  <GiDigDug className="me-1" />
                  Equipments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                  <FaUserFriends className="me-1" />
                  Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                  <RiLogoutCircleRLine className="me-1" />
                  Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}

export default NavBar
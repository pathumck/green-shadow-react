import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <img src="public/green shadow.png" alt="" width= "200" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Fields
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/fieldDetails">Field Details</Link></li>
                    <li><Link className="dropdown-item" to="/fieldCrops">Field's Crops</Link></li>
                    <li><Link className="dropdown-item" to="/fieldStaff">Field's Staff</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crops">Crops</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/staff">Staff</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Logs
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/createlog">Create Log</Link></li>
                    <li><Link className="dropdown-item" to="/previouslogs">Previous Logs</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vehicles">Vehicles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/equipments">Equipments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}

export default NavBar
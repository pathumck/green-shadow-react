import React from 'react'

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
                  <a className="nav-link" aria-current="page" href="#">Dashboard</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Fields
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Field Details</a></li>
                    <li><a className="dropdown-item" href="#">Field's Crops</a></li>
                    <li><a className="dropdown-item" href="#">Field's Staff</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Crops</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Staff</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Logs
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Create Log</a></li>
                    <li><a className="dropdown-item" href="#">Previous Logs</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Vehicles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Equipments</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}

export default NavBar
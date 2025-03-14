import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


export default function Navbar() {
  let navigate = useNavigate();
  const handleLogout=()=>{
localStorage.removeItem('token')
navigate('/login')

  }

  return (
    <div>
<nav style={{height:"70px"}} className="navbar navbar-expand-lg bg-body-secondary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">MyNotebook</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About us</NavLink>
        </li>
      
      </ul>
      {(localStorage.getItem('token')) &&  <button onClick={handleLogout} className="btn btn-dark">Log out</button>}
  
    </div>
  </div>
</nav>      
    </div>
  )
}

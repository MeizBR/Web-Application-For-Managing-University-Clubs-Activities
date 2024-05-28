import './Navbar.css';
import Logo from '../../images/logo.png';
import { Link } from "react-router-dom";
import {FaHome, FaListUl, FaListOl, FaTable, FaComment, FaUser} from 'react-icons/fa'
import React, { useEffect, useState } from "react";
export const Navbar = () => {
  
  return (
    <nav className="navbar navbar-expand-lg tertiary navbar-style" >
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <Link to="/home"><img className='logo' src={Logo} /></Link>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse nav-items-container" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page">
          <Link to="/home"><FaHome className='icons' />Home</Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Link to="/formations"><FaListUl className='icons' />Formations</Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page">
          <Link to="/workshops"><FaListOl className='icons' />Workshops</Link>
          </a>
        </li> 
        <li className="nav-item">
          <a className="nav-link" aria-current="page">
          <Link to="/organisation"><FaTable className='icons' />Organisation</Link>
          </a>
        </li>
        
       
        <li className="nav-item">
            <div class="dropdown">
              <li class="nav-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <a className="nav-link text-primary" aria-current="page" style={{fontWeight:"bold"}}>
              <FaComment className='icons' />
                Feedbacks
                </a>
              </li>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">
                <li className="nav-item">
                      <a className="nav-link" aria-current="page">
                      <Link to="/feedback">Formations Feedback</Link>
                      </a>
                    </li>
                  </a></li>
                <li><a class="dropdown-item" href="#">
                <li className="nav-item">
                      <a className="nav-link" aria-current="page">
                      <Link to="/feedbackWorkshops">Workshops Feedback</Link>
                      </a>
                    </li>
                  </a></li>
              </ul>
            </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" aria-current="page">
          <Link to="/"><FaUser className='icons' />Logout</Link>
          </a>
        </li>

      </ul>
    </div>
  </div>
</nav>

  )

}

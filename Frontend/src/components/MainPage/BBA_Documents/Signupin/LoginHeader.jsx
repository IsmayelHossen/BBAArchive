/**
 * App Header
 */
//  import '../assets/js/app';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { headerlogo } from '../../../Entryfile/imagepath'


const LogInHeader = () => {

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="#" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      <a id="toggle_btn" href="" >
        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3> Bangladesh Bridge Authority - Log In </h3>
      </div>
      {/* /Header Title */}
      {/* <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a> */}

      {/* /Header Menu */}
      {/* Mobile Menu */}
      {/* <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
          <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
          <Link className="dropdown-item" to="/login">Logout</Link>
        </div>
      </div> */}
      {/* /Mobile Menu */}
    </div>

  );
}


export default (LogInHeader);
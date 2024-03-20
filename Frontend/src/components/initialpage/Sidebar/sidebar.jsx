/**
 * App Header
 */

import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { Link } from "react-router-dom";

import "../../assets/css/font-awesome.min.css";
import "../../assets/css/line-awesome.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "../../assets/css/bootstrap-datetimepicker.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/select2.min.css";
import "../../assets/css/style.css";
import "../../assets/js/app";
import "../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";

const Sidebar = () => {
  const location = useLocation();
  let pathname = location.pathname;
  const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
  return (
    <>
        <div className="sidebar" id="sidebar">
    
        {/* <div className="spinner-border text-info my-5" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}

   

      <div className="sidebar-inner sidebarinner_custom overflow-auto">
        <div id="sidebar-menu" className={`sidebar-menu `}>
        <ul style={{ display: "" }}>
  <li>
    <Link className={pathname === "/docs" ? "active" : ""} to="/docs">
      <i className="la la-dashboard me-2" /> <span> Dashboard</span>
    </Link>
  </li>
  
  {/* Settings */}
  {userData?.user_rule!='Reader' && userData?.user_type!='public' && <>
  <li className="submenu text-start">
    <a href="/docs">
      <i className="fa fa-cog me-2" aria-hidden="true"></i> <span> Settings</span>{" "}
      <span className="menu-arrow" />
    </a>
    <ul style={{ display: "none" }}>
      <li>
        <Link className={pathname === "/docs/category/add" ? "active" : ""} to="/docs/category/add">
          Add New Category
        </Link>
      </li>
      <li>
        <Link className={pathname === "/docs/Add" ? "active" : ""} to="/docs/Add">
          Add New Docs
        </Link>
      </li>
    </ul>
  </li>
  </>}


  {/* Documents List */}
  <li className="submenu text-start">
    <a href="#">
      <i className="fa fa-folder mr-2" /> <span> Documents List</span> <span className="menu-arrow" />
    </a>
    <ul style={{ display: "none" }}>
      <li>
        <Link className={pathname === "/docs/list" ? "active" : ""} to="/docs/list">
          View All Documents
        </Link>
      </li>
    </ul>
  </li>

  {/* Audit Log */}
  <li className="submenu text-start">
    <a href="#">
    <i class="fa fa-history"></i> <span> Audit Log</span> <span className="menu-arrow" />
    </a>
    <ul style={{ display: "none" }}>
      <li>
        <Link className={pathname === "/docs/loger" ? "active" : ""} to="/docs/loger">
       Logs  
        </Link>
      </li>
      <li>
        <Link className={pathname === "/docs/visitsinfo" ? "active" : ""} to="/docs/visitsinfo">
       Visits Info
        </Link>
      </li>
    </ul>
  </li>
</ul>



        </div>
      </div>



    
    </div>
    </>
  );
};

export default Sidebar;
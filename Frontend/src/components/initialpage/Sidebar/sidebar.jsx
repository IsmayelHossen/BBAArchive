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

  return (
    <>
        <div className="sidebar" id="sidebar">
    
        {/* <div className="spinner-border text-info my-5" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}

   

      <div className="sidebar-inner overflow-auto">
        <div id="sidebar-menu" className={`sidebar-menu `}>
          <ul>
         
            <li className={pathname.includes("/") ? "" : ""}>
              <a href="/">
                <i className="la la-home" /> <span>Home</span>
              </a>
            </li>
         

<li className="submenu text-start">
  <a href="#">
    <i className="la la-gift" /> <span> Docs</span>{" "}
    <span className="menu-arrow" />
  </a>

  <ul style={{ display: "none" }}>

    <li>
      <Link
        className={pathname.includes("/docs") ? "active" : ""}
        to="/docs"
      >
        <i className="la la-dashboard me-2" /> <span> Dashboard</span>
      </Link>
    </li>
    {/* add Vendor */}
    <li className="submenu text-start">
      <a href="/docs">
        <i class="fa fa-cog me-2" aria-hidden="true"></i> <span> Settings</span>{" "}
        <span className="menu-arrow" />
      </a>
      <ul style={{ display: "none" }}>
        <li>
          <Link
            className={
              pathname.includes("/docs/category/add") ? "active" : ""
            }
            to="/docs/category/add"
          >
            Add New Category
          </Link>
        </li>
        <li>
          <Link
            className={pathname.includes("/docs/Add") ? "active" : ""}
            to="/docs/Add"
          >
            Add New Docs
          </Link>
        </li>
      </ul>
    </li>

    {/* add product */}
    <li className="submenu text-start">
      <a href="#">
        <i className="fa fa-folder mr-2" />{" "}
        <span> Documents List</span> <span className="menu-arrow" />
      </a>
      <ul style={{ display: "none" }}>
        <li>
          <Link
            className={
              pathname.includes("/docs/list") ? "active" : ""
            }
            to="/docs/list"
          >
            View All Documents
          </Link>
        </li>
      </ul>
    </li>
    <li>
          <Link
            className={
              pathname.includes("/docs/loger") ? "active" : ""
            }
            to="/docs/loger"
          >
            Logs
          </Link>
        </li>
    {/* <li className="submenu text-start">
    <a href="#"> <span> Docuemnts Category</span> <span className="menu-arrow" /></a>
    <ul style={{ display: 'none' }}>


      <li>
        <Link className={pathname.includes('/docs/cat/personal') ? "active" : ""} to="/docs/cat/personal">
          BBA
        </Link>
      </li>

      <li>
        <Link className={pathname.includes('/docs/cat/others') ? "active" : ""} to="/docs/cat/others">
          Others
        </Link>
      </li>




    </ul>
  </li> */}

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
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21, headerlogo
} from '../../Entryfile/imagepath';

import '../../assets/js/app';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import axios from 'axios';
function Header() {
    
    const Navigate=useNavigate();
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    console.log("UserData",userData)
    const Logout=()=>{
    
      Cookies.remove('myCookie');
      localStorage.removeItem('userData');
      // Navigate("/");
      window.location.href=('/')
           
    }
    const cookieValue = Cookies.get('myCookie');
    console.log("cookieValue",cookieValue)
    const authToken = cookieValue;

// Set default headers for all axios requests
axios.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
    const location = useLocation();
     let pathname = location.pathname
     if(!cookieValue){
      swal({
        title: "You don't have any access or session out!!",
        icon: "error",
        button: "Ok!",
      });
    setTimeout(()=>{
      window.location.href=('/')
    },1000)
    }

  return (
    <div>
          
    <div>
       <div className="header" style={{right:"0px"}}>
         {/* Logo */}
         <div className="header-left">
           <Link to="/" className="logo">
             <img src={headerlogo} width={40} height={40} alt="" />
           </Link>
         </div>
         {/* /Logo */}
         <a id="toggle_btn" href="" style={{display: pathname.includes('tasks') ?"none" :pathname.includes('compose') ? "none" :""}}>
           <span className="bar-icon"><span />
             <span />
             <span />
           </span>
         </a>
         {/* Header Title */}
         <div className="page-title-box">
         <Link to={'/'}>
         <h3>BBA ARCHIVE</h3>
          </Link> 
         </div>
         {/* /Header Title */}

         <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
         {/* Header Menu */}
         <ul className="nav user-menu">
           {/* Search */}
           {/* <li className="nav-item">
             <div className="top-nav-search">
               <a href="" className="responsive-search">
                 <i className="fa fa-search" />
               </a>
               <form>
                 <input className="form-control" type="text" placeholder="Search here" />
                 <button className="btn" type="submit"><i className="fa fa-search" /></button>
               </form>
             </div>
           </li> */}
           {/* /Search */}
           {/* Flag */}
           {/* /Flag */}
           {/* Notifications */}
           <li className="nav-item dropdown">
             <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
               <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
             </a>
             <div className="dropdown-menu notifications">
              
              
               <div className="topnav-dropdown-footer">
                 <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">View all Notifications</Link>
               </div>
             </div>
           </li>
           {/* /Notifications */}
           {/* Message Notifications */}
           <li className="nav-item dropdown">
             <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
               <i className="fa fa-comment-o" /> <span className="badge badge-pill">8</span>
             </a>
             <div className="dropdown-menu notifications">
               <div className="topnav-dropdown-header">
                 <span className="notification-title">Messages</span>
                 <a href="" className="clear-noti"> Clear All </a>
               </div>
              
               <div className="topnav-dropdown-footer">
                 <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">View all Messages</Link>
               </div>
             </div>
           </li>
           {/* /Message Notifications */}
           <li className="nav-item dropdown has-arrow main-drop">
             <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
               <span className="user-img"><img src={Avatar_21} alt="" />
                 <span className="status online" /></span>
               <span>{userData?.name}</span>
             </a>
             <div className="dropdown-menu">
               {/* <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
               <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>                   */}
               <a className="dropdown-item" onClick={()=>Logout()} >  <i className="fa fa-sign-out"></i> Logout</a>
             </div>
           </li>
         </ul>
         {/* /Header Menu */}
         {/* Mobile Menu */}
         <div className="dropdown mobile-user-menu">
           <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
           <div className="dropdown-menu dropdown-menu-right">
             {/* <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
             <Link className="dropdown-item" to="/settings/companysetting">Settings</Link> */}
             <a className="dropdown-item" onClick={()=>Logout()} >  <i className="fa fa-sign-out"></i> Logout</a>
           </div>
         </div>
         {/* /Mobile Menu */}
       </div>
     </div>
   
  </div>
  )
}
export default Header;
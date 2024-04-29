import React from 'react';
import BBAImage from '../../../assets/img/BBA-logo.png';
import BDImage from '../../../assets/img/bdmonogram.png';
import ArchiveImage from '../../../assets/img/archive.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const PublicHeader = () => {
    return (
        <div>
                 <Helmet>
        <title>BBA ARCHIVE</title>
        <meta name="description" content="BBA DOCUMENTS" />
      </Helmet>
      <div>
       <div className="publicheader clearfix " style={{right:"0px"}}>
     
         <div class="container-fluid d-flex justify-content-between  ">
         
      <Link to="/"> <img src={BDImage} class="bdimagelogo" alt="Bangladesh Monogram" /></Link> 
         <div><h2 className="pdtitle"> Bangladesh Bridge Authority</h2>
                <h3 className="pdnametitle">Archive<img src={ArchiveImage} class="" width="40" height="40" alt="Archive" /></h3></div>
                <div>
                <Link to="/"> <img src={BBAImage} class="bbimagelogo" alt="BBA" /></Link>
             
                </div>
              
             
               
         </div>
      
       <div className='mt-1'>
       <Link to ="/login" className=' h5 mr-1  clearfix float-right' style={{textShadow: '1px 2px 1px #b2b5b7'}}>  <i class="fa fa-sign-in login-icon" aria-hidden="true"></i>Login</Link>
       </div>
       </div>
   
        </div>
        </div>
        
    );
}

export default PublicHeader;

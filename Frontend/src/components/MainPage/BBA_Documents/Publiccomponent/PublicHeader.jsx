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
       <div className="publicheader " style={{right:"0px"}}>
       <Link to ="/login" className='float-right h5'>Login</Link>
         <div class="container-fluid d-flex justify-content-between ">
         
      <Link to="/"> <img src={BDImage} class="bdimagelogo" alt="Bangladesh Monogram" /></Link> 
         <div><h2 className="pdtitle"> Bangladesh Bridge Authority</h2>
                <h3 className="pdnametitle">Archive<img src={ArchiveImage} class="" width="40" height="40" alt="Archive" /></h3></div>
                <div>
                <Link to="/"> <img src={BBAImage} class="bbimagelogo" alt="BBA" /></Link>
             
                </div>
              
             
               
         </div>
 
         {/* /Header Menu */}
         {/* Mobile Menu */}
      
         {/* /Mobile Menu */}
       </div>
     </div>
        </div>
    );
}

export default PublicHeader;

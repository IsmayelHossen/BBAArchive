import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";

import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import swal from "sweetalert";
import "../../../../index.css";

import "../../BBA_Documents/vendor.css";
import { BaseUrl } from "./../CommonUrl";

import PublicHeader from "./PublicHeader";
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const PublicDashboard = ({ alldata9 }) => {
    const location = useLocation();
    let pathname = location.pathname
  const [Alldata, setdata] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  useEffect(() => {
    getDataapicall();
    getDocument();
  }, []);
  const currentDate = new Date();

// Get the current year using the getFullYear() method
const currentYear = currentDate.getFullYear();
  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdatapublic`).then((res) => {
      setfileData(res?.data.data);
      setisLoader(false);
     
    });
  };

  const getDocument = () => {
    axios.get(`${BaseUrl}/documents/categorylistpublic`).then((res) => {
      setdata(res.data.data);
      setisLoader(false);
      console.log(res.data.data);
    });
  };
  const CategoryFileCount = (category) => {
    console.log(category);
    const count = fileData?.filter((data) => data.NAME == category);
    console.log(count.length);
    return count.length;
  };
  //tjhghj
  return (
    <>
 <PublicHeader/>
      {/* Header */}
      <div className="page-wrapper page-wrapper-publicDashboard">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          {/* <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="page-title text-center"> Bangladesh Bridge Authority</h2>
                <h3 className="page-title text-center"> Welcome to  Archive</h3>
              </div>
            </div>
          </div> */}
          {/* /Page Header */}
          {isLoader && (
            <>
              <div class="row">
                <div class="col-md-5"></div>
                <div class="col-md-2 mt-4">
                  <ColorRing
                    visible={true}
                    height="80"
                    width={100}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
                <div class="col-md-5"></div>
              </div>
            </>
          )}
          {!isLoader && (
           <>
            <div className="row">
              <div className=" col-md-6 ">
                <div className="card dash-widget filecard">
                  <div className="card-body">
                    <Link to={`/docs/list`}>
                      <span className="dash-widget-icon">
                        <i class="fa fa-file" aria-hidden="true"></i>
                      </span>

                      <div className="dash-widget-info dash-widget-icon_public">
                        <h3>{fileData?.length}</h3>
                        <span>Total Files</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-6">
                <div className="card dash-widget categorycard">
                  <div className="card-body">
                    <Link to={"/docs/list"}>
                      <span className="dash-widget-icon">
                        <i class="fa fa-object-group" aria-hidden="true"></i>
                      </span>
                      <div className="dash-widget-info dash-widget-icon_public">
                        <h3>{Alldata?.length}</h3>
                        <span>Total  Category </span>
                        {Alldata != null &&
                          Alldata.map((row, index) => (
                            <>
                              {/* <ul style={{listStyleType:'none'}}>
             <li style={{display:"inline-block"}}>{row.name}</li>
           </ul> */}
                            </>
                          ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              </div>
              <div className="row mt-1">
                {Alldata.length != 0 &&
                  Alldata?.map((row, index) => (
                    <>
                      <div className="col-md-3 ">
                        <div className="card dash-widget singlecategorycard">
                          <div className="card-body">
                      
                            <span className="dash-widget-icon">
                              <i class="fa fa-file-o" aria-hidden="true"></i>
                            </span>
                            <div className="dash-widget-info dash-widget-icon_public">
                              <h3>{CategoryFileCount(row.CATEGORY_NAME)}</h3>
                              <span>{row.CATEGORY_NAME}</span>
                            </div>
                        
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
          
           </>
          )}
        </div>
        {/* /Page Content */}
        <div className=" footer-custom">
        {/* Page Content */}
        <div className="content container-fluid">
        <h6>©-{currentYear},Bangladesh Bridge Authority,All Rights Reserved.</h6>
        
            </div>
            </div>
      </div>
    </>
  );
};

export default PublicDashboard;

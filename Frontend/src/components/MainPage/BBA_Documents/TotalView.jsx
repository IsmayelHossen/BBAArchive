import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

import "../../../index.css";
import { BaseUrl } from "./CommonUrl";

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const TotalView = ({ alldata9 }) => {
  console.log(alldata9);
  const [Alldata, setdata] = useState([]);
  const [UsersData, setUsersData] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  const[todayvisitors,settodayvisitors]=useState([])
  const[totalreadDownload,settotalreadDownload]=useState([])
  useEffect(() => {
    getDataapicall();
    getTodayVisitors();
    getTotalReadDownload();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getallusers`).then((res) => {
        setUsersData(res?.data.data);
        console.log("user",res?.data.data)
      setisLoader(false);
     
    });
  };

  const getTodayVisitors = () => {
    axios.get(`${BaseUrl}/documents/gettoday_visitore`).then((res) => {
      settodayvisitors(res.data.data);
      setisLoader(false);
      console.log(res.data.data);
    });
  };
  const getTotalReadDownload = () => {
    axios.get(`${BaseUrl}/documents/get/totalread_download`).then((res) => {
      settotalreadDownload(res.data.data);
      setisLoader(false);
      console.log(res.data.data);
    });
  };
  
    const privateUsers = UsersData?.filter((data) => data.usertype === 'private');
    const publicUsers = UsersData?.filter((data) => data.usertype === 'public');

    const TotalRead = totalreadDownload?.filter((data) => data.process_type === 'Reading');
    const TotalDownload = totalreadDownload?.filter((data) => data.process_type === 'Download');
  
  //tjhghj
  return (
    <>
      <Helmet>
        <title>Visits Information - BBA Archive</title>
        <meta name="description" content="BBA DOCUMENTS" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title text-start">Visit Information</h3>
              </div>
            </div>
          </div>
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
              <div className=" col-md-4 ">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={`/docs/usershow`}>
                      <span className="dash-widget-icon">
                    
                      <i class="fa fa-users"></i>
                      </span>

                      <div className="dash-widget-info">
                        <h3>{UsersData?.length}</h3>
                        <span>Total Users</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                  <a href="#">
                      <span className="dash-widget-icon">
                      <i class="fa fa-user"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>  {privateUsers.length}</h3>
                        <span>BBA Employees </span>
                     
                      </div>
                  </a>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                  <a href="#">
                      <span className="dash-widget-icon">
                      <i class="fa fa-user"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>  {publicUsers.length}</h3>
                        <span>Guest Users </span>
                     
                      </div>
                      </a>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/docs/loger"}>
                      <span className="dash-widget-icon">
                      <i class="fa fa-user"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>{todayvisitors?.length}</h3>
                        <span>Today Visitors </span>
                       
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/docs/report"}>
                      <span className="dash-widget-icon">
                      <i class="fa fa-user"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>{Alldata?.length}</h3>
                        <span>Monthly Visitors </span>
                        {Alldata != null &&
                          Alldata.map((row, index) => (
                            <>
                             
                            </>
                          ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/docs/readdownload/download"}>
                      <span className="dash-widget-icon">
                      <i class="fa fa-download"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>{TotalDownload?.length}</h3>
                        <span>Total Download </span>
                       
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" col-md-4">
                <div className="card dash-widget">
                  <div className="card-body">
                    <Link to={"/docs/readdownload/read"}>
                      <span className="dash-widget-icon">
                      <i class="fa fa-book"></i>
                      </span>
                      <div className="dash-widget-info">
                        <h3>{TotalRead?.length}</h3>
                        <span>Online Read </span>
                       
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              </div>
           
          
           </>
          )}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default TotalView;

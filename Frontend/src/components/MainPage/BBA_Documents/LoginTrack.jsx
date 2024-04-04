import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../BBA_Documents/vendor.css";
import { Link } from "react-router-dom";

import ViewDocuments from "./ViewDocuments";
import { BaseUrl } from "./CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const LoginTrack = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [file, setFile] = useState([]);
  const [intialValue, setintialValue] = useState({
    id: "",
    name: "",
  });
  var datetime = "";
  const [fileData, setfileData] = useState([]);
  const [progress, setProgress] = useState("");
  const [progressShow, setprogressShow] = useState(false);
  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getDataapicall();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/loger/view`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setdata(res.data.data);
    });
  };

  //search vendor
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDataapicall();
    } else {
      const searchby_lowercase = search.toLowerCase();
      const SeearcData = Alldata.filter((item) => {
        const row =
        item.NAME + " " + item.USER_RULE + " " + item.CREATED_AT+" "+item.TERMINAL_IP+" " + item.TERMINAL_TYPE.split("_")[0]+" "+ item.USER_ID+" "+item.EXIT_TIME ;
      return row.toLowerCase().includes(searchby_lowercase);
        // item.name.toLowerCase().includes(query)
      });
      
      setdata(SeearcData);
    }
  };
  //gfhf
  //table
  const columns = [
    // {
    //   title: "Entry By",
    //   dataIndex: "NAME_1",
    // },
    // {
    //   title: "Designation",
    //   dataIndex: "DES_NAME",
    // },
    // Example without external libraries

    {
      title: "User",
      dataIndex: "NAME",
    },
    {
      title: "Entry Time",
      // dataIndex: "CREATED_AT",
      render: (text, record) => {
        const utcDateTime = new Date(record.CREATED_AT); // Assuming CREATED_AT contains UTC time
        const offset = 1; // Offset for Dhaka, Bangladesh (UTC+6) in minutes
    
        // Adjust the time for the desired time zone
        const localDateTime = new Date(utcDateTime.getTime() + (offset * 60 * 1000));
    
        // Get the hour and minute components
        const hours = localDateTime.getHours();
        const minutes = localDateTime.getMinutes();
    
        // Determine AM/PM indicator
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
    
        // Format the hour to 12-hour format
        const formattedHour = hours % 12 || 12;
    
        // Format the local date time string
        const formattedDateTime = `${localDateTime.getDate().toString().padStart(2, '0')}-${(localDateTime.getMonth() + 1).toString().padStart(2, '0')}-${localDateTime.getFullYear()} ${formattedHour}:${minutes.toString().padStart(2, '0')}:${localDateTime.getSeconds().toString().padStart(2, '0')} ${amOrPm}`;
    
        return formattedDateTime;
      }
    },
    {
      title: "Exit Time",
      dataIndex: "EXIT_TIME",
    },
    
    {
      title: "Device Name",
      dataIndex: "TERMINAL_TYPE",
    },
    {
        title: "IP",
        dataIndex: "TERMINAL_IP",
      },
      {
        title: "User Rule",
        dataIndex: "USER_RULE",
      },
     

   
  ];

  return (
    <>
      
      <Helmet>
        <title>Dashboard - BBA Document </title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <h4
                className="text-center mx-auto mb-3 text-uppercase fddd"
                id="hddd"
              >
                BBA ARCHIVE <br></br>
              </h4>
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  {/* Welcome To Documents Management */}
                </h4>
              </div>
              {/* header */}
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
                <div
                  class="form-group has-search"
                  style={{ marginBottom: "0px" }}
                >
                  <span class="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    class="form-control bba_documents-form-control"
                    value={searchdata}
                    name="searchStatus"
                    placeholder="Search"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                
                >
                  <span>Log Details</span>
                </button>
              </div>
            </div>
            <div class="card-body1">
              {/* /Page Header */}
            
              {/*ADD DOCUMENT END*/}

              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  {DataLoader && (
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
                  {!DataLoader && (
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total: Alldata?.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={Alldata ? Alldata : ""}
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

             
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default LoginTrack;



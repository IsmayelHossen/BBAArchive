import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import swal from "sweetalert";
import "../../../../index.css";

import "../../BBA_Documents/vendor.css";
import { BaseUrl } from "./../CommonUrl";
import { ColorRing, LineWave } from "react-loader-spinner";

import PublicHeader from "./PublicHeader";
const PublicDocumentList = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [Vendor_data, SetVendorData] = useState([]);
  const [Vendor_Info, setVendorInfo] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [usedatafromApi, setusedatafromApi] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState("90");

  const [counter, setCounter] = useState(1);
  const [file, setFile] = useState([]);
  const useParam = useParams();
  const [filteredData, setfilteredData] = useState({});

  const [fileData, setfileData] = useState([]);
  const [categoryData, setcategoryData] = useState("");
  const [FilterSearch, setFilterSearch] = useState("");
  
  useEffect(() => {
    document.title = "BBA DOCUMENT LIST";
   
    getDocument();
    getCategory();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getDocument = () => {
    axios.get(`${BaseUrl}/documents/docslistPublic`).then((res) => {
      setDataLoader(false);
      setfileData(res.data.data);
    });
  };

  //search and filter

  const SearchByFilter = async (e) => {
    const filter = e.target.value;
    console.log(filter);
    setFilterSearch(e.target.value);
    if (filter == "" && searchdata == "") {
      getDocument();
    } else {
      if (filter != "") {
        // categories wise filter
        // setFilterSearch(e.target.value);
        axios
          .get(`${BaseUrl}/documents/all_documents_filterPublic/${filter}`)
          .then((response) => {
            console.log(response.data);
            // console.log(response.data.data);
            setdata("");
            setfileData(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        getDocument();
      }
    }
  };
  //get last stage filter data
  const lastStageFilterDataBack = (filterSearch) => {
    if (filterSearch == "" && searchdata == "") {
      getDocument();
    } else {
      axios
        .get(`${BaseUrl}/documents/all_documents_filterPublic/${filterSearch}`)
        .then((response) => {
          console.log("00000", response.data);
          // console.log(response.data.data);
          setdata("");
          setfileData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const SearchData = (e) => {
    //first of all  filter check
    // .replace(/[^\w]/gi, "");
    const search = e.target.value.toLowerCase();
    setsearchdata(e.target.value);
    if (FilterSearch == "" && search == "") {
      getDocument();
    } else if (FilterSearch == "" && search != "") {
    
      axios
        .get(`${BaseUrl}/documents/docslistPublic`)
        .then((response) => {
        
          setdata("");
          setFilterSearch("");
          const AllgetaData = response.data.data;

          const sarchData = AllgetaData.filter((item) => {
            const row =
              item.MEETING_DATE + " " + item.MEETING_ID + " " + item.NAME+" "+item.DOCUMENT_TAG+" " + item.FILENAME.split("_")[0] ;
            return row.toLowerCase().includes(search);
            // item.name.toLowerCase().includes(query)
          });
          console.log("Search", sarchData);
          setfileData(sarchData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (FilterSearch != "" && search != "") {
      console.log("filtr", FilterSearch, "search", search);

      axios
        .get(`${BaseUrl}/documents/docslistPublic`)
        .then((response) => {
          setdata("");
          const alldata = response.data.data;
          const CategoryFilterData = alldata.filter((item) => {
           console.log("item.CATEGORY_ID",item.CATEGORY_ID)
           const row =
           item.CATEGORY_ID + " "
            return row.includes(FilterSearch);
            // item.name.toLowerCase().includes(query)
          });

          const SeearchonFilterData = CategoryFilterData.filter((item) => {
            const row =
            item.MEETING_DATE + " " + item.MEETING_ID + " " + item.NAME+" "+item.DOCUMENT_TAG+" " + item.FILENAME.split("_")[0] ;
          return row.toLowerCase().includes(search);
            // item.name.toLowerCase().includes(query)
          });
          
          setfileData(SeearchonFilterData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (FilterSearch != "" && search == "") {
      lastStageFilterDataBack(FilterSearch);
    } else {
      getDocument();
    }
  };




  const getCategory = () => {
    axios.get(`${BaseUrl}/documents/categoryPublic`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setcategoryData(res.data.data);
    });
  };
  const date = new Date().toLocaleTimeString();
  const OnlyPdfFileRead = () => {
    swal("Only Pdf file you can read!", "", "warning");
  };
  const ReadingPost=(type,categoryid,filename,doc_id)=>{

const data={
  type,
  categoryid,
  filename,
  doc_id
}
console.log("etert",data)
axios.post(`${BaseUrl}/documents/read_downloadPublic/add`, data).then((response) => {
  if (response) {
  
   
  }
})}
const DownloadPost = (type, categoryid, filename, doc_id) => {
  // Construct the URL of the file to download
  const fileUrl = `${BaseUrl}/uploadDoc/${filename}`;

  // Set window.location.href to initiate the file download
  window.location.href = fileUrl;

  // Prepare data for the POST request (if needed)
  const data = {
    type,
    categoryid,
    filename,
    doc_id
  };

  // Example: POST request using Axios to update download count
  axios.post(`${BaseUrl}/documents/read_download/add`, data)
    .then((response) => {
      // Handle response if needed
    })
    .catch((error) => {
      // Handle error if needed
    });
};

  const columns = [
    {
      title: "Entry Date",
      dataIndex: "DATENTIME",
    },
    {
      title: "Held on the date",
      dataIndex: "MEETING_DATE",
    },
    {
      title: "Documents Type",
      dataIndex: "NAME",
    },
    {
      title: "Document Id",
      dataIndex: "MEETING_ID",
    },

    {
      title: "File Name",
      dataIndex: "FILENAME",
      render: (text, rowKey) => (
        <>
          <p>{rowKey.FILENAME.split("_")[0]}</p>
        </>
      ),
    },
    {
      title: "Ebook",
      render: (text, rowKey) => (
        <>
        {rowKey.DOCTYPE=="public"?      rowKey.FILENAME.split(".")[1] === "pdf" ? (
            <Link  onClick={()=>ReadingPost('Reading',rowKey.CATEGORY_ID,rowKey.FILENAME,rowKey.DOCUMENTS_ID)}  to={`/docs/reader/${rowKey.FILENAME}/${rowKey.ID}`}>
              <i class="fa fa-book h3"></i>
            </Link>
          ) : (
            <a onClick={OnlyPdfFileRead}>
              <i class="fa fa-book h3"></i>
            </a>
          ):      rowKey.FILENAME.split(".")[1] === "pdf" ? (
            <Link to={`/login`}>
              <i class="fa fa-book h3" style={{color:'red'}}></i>
            </Link>
          ) : (
            <a onClick={OnlyPdfFileRead}>
              <i class="fa fa-book h3"></i>
            </a>
          )}
    
        </>
      ),
    },
    {
      title: "Download",
      render: (text, rowKey) => (
        <>
      
        <Link to={`/login`}>
        <span class="fa fa-download">
            
         ({" "}
          {rowKey.F_SIZE / 1024 > 1023
            ? (rowKey.F_SIZE / 1024 / 1024).toPrecision(3) + " mb"
            : Math.ceil(rowKey.F_SIZE / 1024) + " kb"}
          )
        </span>
            </Link>
        
        
     
          
          
        </>
      ),
    },
    {
        title: "Type",
        dataIndex: "DOCTYPE",
      },
  ];

  return (
    <>
<PublicHeader/>
      {/* Header */}
      <div className="page-wrapper page-wrapper-publicDashboard">
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="card-header1">
            <h4
              className="text-center mx-auto mb-3 text-uppercase fddd"
              id="hddd"
            >
              BBA ARCHIVE LIST
            </h4>
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div class="row ">
                <div class="col-md-7">
                  <div className="mb-2 row">
                    <label for="inputtext" class="col-sm-2 col-form-label">
                      {" "}
                      Filter
                    </label>
                    <div className="col-sm-10">
                      <select
                        class="form-select form-control bba_documents-form-control"
                        {...register("document_type", {
                          onChange: (e) => {
                            SearchByFilter(e);
                          },
                          required: true,
                        })}
                      >
                        <option value="">Select Type</option>
                        {categoryData.length > 0 && (
                          <>
                            {categoryData.map((row, index) => (
                              <option value={row.ID}>
                                {row.CATEGORY_NAME}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
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
                      placeholder="Search by Id,filename,held date"
                      onChange={(e) => SearchData(e)}
                    />
                  </div>
                </div>
              </div>

              <div class="ml-4">
                <button class="Button_success">
                  Total File:({fileData.length})
                </button>
              </div>
            </div>
          </div>
          <div class="card-body1">
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
                        total: fileData.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      // bordered
                      dataSource={fileData}
                      rowKey={(rowKey) => rowKey.id}
                      onChange={console.log("change")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PublicDocumentList;

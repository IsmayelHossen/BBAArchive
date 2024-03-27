import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { useForm } from "react-hook-form";
import { BaseUrl } from "./CommonUrl";
import { ColorRing, LineWave } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const ViewDocuments = () => {
  const useParam = useParams();
  const [data, setdata] = useState([]);

  const [vendorDeleteId, setvendorDeleteId] = useState("");

  const [DataLoader, setDataLoader] = useState(true);
  const [filteredData, setfilteredData] = useState({});

  const [Alldata, setAlldata] = useState([]);
  const [fileData, setfileData] = useState([]);
  const [searchdata, setsearchdata] = useState();
  const [progress, setProgress] = useState("");
  const [progressButton, setprogressButton] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    document.title = "TYPE WISE DOCUMENTS VIEW";

    getDataapicall();
    getDocuments();
  }, []);

  const getDocuments = () => {
    axios.get(`${BaseUrl}/documents/filedata/${useParam.id}`).then((res) => {
      setDataLoader(false);
      setfileData(res.data.data);
    });
  };

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      setdata(res.data.data);
      const filteredData = res.data.data.filter(
        (data) => data.ID == useParam.id
      );
      console.log(filteredData);
      setfilteredData(filteredData[0]);
    });
  };

  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    // setsearchdata(e.target.value);
    const searchdata = e.target.value;
    if (searchdata == "") {
      getDocuments();
    } else {
      const serachbylowercase = searchdata.toLowerCase();
      const documents_type = filteredData.NAME;
      axios
        .get(
          `${BaseUrl}/documents/individual_documents_search/${searchdata}/${useParam.id}`
        )
        .then((response) => {
          console.log(response.data.data);
          // setdata("");
          setfileData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const DeleteIndividual_vendor = (id, filename) => {
    setvendorDeleteId(id);
    console.log(id);
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/delete/docs/${id}/${filename}`)
          .then((response) => {
            if (response.data.success) {
              getDocuments();
              swal("Successfully Deleted!", "", "success");
            }
          })
          .catch((error) => { });
      } else {
        swal("Record is not delete!");
      }
    });
  };
  // submit for store vendor  data info
  const onSubmit = (data) => {
    setprogressButton(true);

    var datentime = new Date().toLocaleString();
    var date = datentime.split("/")[1];
    var month = datentime.split("/")[0];
    var year = datentime.split(",")[0].split("/")[2];
    var time = datentime.split(",")[1];
    var RearangeTime = date + "/" + month + "/" + year + "," + time;
    const formData = new FormData();
    formData.append("datentime", RearangeTime);
    formData.append("idp", useParam.id);
    formData.append("id", useParam.document_id);

    if (data.add_more_file.length > 1) {
      for (let i = 0; i < data.add_more_file.length; i++) {
        formData.append("add_more_file", data.add_more_file[i]);
      }
    } else {
      formData.append("add_more_file", data.add_more_file[0]);
    }
    axios
      .post(`${BaseUrl}/documents/add_moreFile`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response) {
          window.$("#exampleModal").modal("hide");
          swal("Successfully Added", "", "success");
          getDocuments();
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //dfg
  const OnlyPdfFileRead = () => {
    swal("Only Pdf file you can read!", "", "warning");
  };
  return (
    <>
      {console.log("render344")}
      <Helmet>
        <title>Dashboard - BBA Documents</title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="card-header1">
            <h4
              className="text-center mx-auto mb-3 text-uppercase fddd"
              id="hddd"
            >
              BBA ARCHIVE <br></br>
              Documents Type: {filteredData.NAME}-({useParam.document_id})
            </h4>
            <div className="d-flex justify-content-between align-items-center Page_header_title_search">
              <div
                class="form-group has-search"
                style={{ marginBottom: "0px" }}
              >
                {/* <span class="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  class="form-control bba_documents-form-control"
                  value={searchdata}
                  name="searchStatus"
                  placeholder="Search"
                  onChange={(e) => SearchData(e)}
                /> */}
                Held on the Date: {filteredData.MEETING_DATE}
              </div>
              <div>
                <button
                  type="button"
                  class="Button_success "
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  {" "}
                  <i className="fa fa-plus" /> Add More File
                </button>
              </div>
            </div>
          </div>

          {/* add more file start */}
          <div
            class="modal custom-modal fade "
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            {/* ADD DOCUMENT START */}

            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content modal-content_docs">
                <div class="modal-header">
                  <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                    <i class="fa fa-plus"></i> Add More File(to{" "}
                    {filteredData.NAME})
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body ">
                  <div className="row Product_add">
                    {/* vendor form */}

                    <div class="col-md-12">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        class="mb-3 form_design"
                      >
                        <div className="mb-2 row">
                          <label
                            for="inputtext"
                            class="col-sm-4 col-form-label"
                          >
                            {" "}
                            <span style={{ color: "red" }}>*</span>Add New
                            Document
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="file"
                              id="customFile"
                              {...register("add_more_file", {
                                required: true,
                              })}
                              multiple
                            />
                          </div>
                          {progressButton && (
                            <>
                              <div class="progress">
                                <div
                                  class="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  style={{ width: `${progress}%` }}
                                >
                                  {progress}%
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="SubmitFooter">
                          <button
                            type="submitupdate mt-4"
                            class="Button_success"
                          >
                            <span>Add</span>
                          </button>
                          <button
                            type="button"
                            class="Button_Danger1"
                            data-dismiss="modal"
                          >
                            <span> Close</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* add more file end */}
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
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>Entry Date</th>
                          <th>File Name</th>
                          <th>Ebook</th>
                          <th>Download</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fileData.length > 0 &&
                          fileData.map((row, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{row.DATENTIME}</td>
                              <td>{row.FILENAME.split("_")[0]}</td>

                              <td>
                            
                                {row.FILENAME.split(".")[1] === "pdf" ? (
                                  <Link
                                    to={`/docs/pdfview/${row.FILENAME}/${row.ID}`}
                                  >
                                    <i class="fa fa-book h3"></i>
                                  </Link>
                                ) : (
                                  <a onClick={OnlyPdfFileRead}>
                                    <i class="fa fa-book h3"></i>
                                  </a>
                                )}
                              </td>
                              <td>
                                <a
                                  href={`${BaseUrl}/uploadDoc/${row.FILENAME}`}
                                  // href="http://localhost:3000/72.pdf"
                                  class="btn btn-primary btn-sm mr-2"
                                  download
                                >
                                  <span class="fa fa-download"></span>({" "}
                                  {row.F_SIZE / 1024 > 1023
                                    ? (row.F_SIZE / 1024 / 1024).toPrecision(
                                      3
                                    ) + " mb"
                                    : Math.ceil(row.F_SIZE / 1024) + " kb"}
                                  )
                                </a>
                              </td>
                              <td className="">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    DeleteIndividual_vendor(
                                      row.ID,
                                      row.FILENAME
                                    );
                                  }}
                                >
                                  <i
                                    className="fa fa-trash-o m-r-5"
                                    style={{ fontSize: "20px", color: "red" }}
                                  />
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {/* ebook trial verson start */}
              <div></div>

              {/* ebook trial verson end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewDocuments;

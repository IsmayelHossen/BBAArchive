/**
 * Vendor Add Information component
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../../paginationfunction";
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

const Create_Document1 = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [file, setFile] = useState([]);
  const [intialValue, setintialValue] = useState({
    id: "",
    name: "",
  });
  const [progress, setProgress] = useState("");
  const [progressShow, setprogressShow] = useState(false);
  const [documentType, setdocumentType] = useState("");
  const [lastDocId, setlastDocId] = useState("");
  const [nextDocId, setnextDocId] = useState("");
  const [categoryData, setcategoryData] = useState("");
  const [lastIdLoadder, setlastIdLoadder] = useState(false);
  const [HeadingTag, setHeadingTag] = useState([]);
  const [finalSubmit, setfinalSubmit] = useState(false);
  const [document_tag, setdocument_tag] = useState("");
  const [DocumentTagWrite, setDocumentTagWrite] = useState("");


//user info
const userDataString = localStorage.getItem('userData');
const userData = JSON.parse(userDataString);

  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getDataapicall();
  }, [searchdata]);

  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

    getCategory();
  }, []);

  const getDataapicall = () => {
    axios.get(`${BaseUrl}/documents/getdata`).then((res) => {
      console.log(res.data.data);

      const AllgetaData = [
        ...new Map(res?.data?.data.map((m) => [m.NAME, m])).values(),
      ];
      const sarchData = AllgetaData.filter((item) => {
        if (searchdata == "") {
          return item;
        }

        const row = item.NAME + " " + item.DOCUMENT_TAG;
        return row.toLowerCase().includes(searchdata);
        // item.name.toLowerCase().includes(query)
      });
      setdata(sarchData);
      console.log("sarch", sarchData);
      setDataLoader(false);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/documents/category_fordocuments`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setcategoryData(res.data.data);
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    reset: reset1,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  //get last documents id
  const handleOnchangeforlast_id = async (e) => {
    setdocumentType(e.target.value);

    console.log(e.target.value);
    await axios
      .get(`${BaseUrl}/documents/getlastId/${e.target.value}`)
      .then((res) => {
        setlastDocId(Number(res.data.data[0].id));
        console.log("number", res.data.data[0].id);
        setnextDocId(Number(res.data.data[0].id) + 1);
        setlastIdLoadder(true);
      });
  };
  //tag add
  const SubmitTagAdd = (e) => {
    if(document_tag==""){
      e.preventDefault();
      swal({
        title: "Please Add Some Tags,Heading or Important Key words!",
        icon: "warning",
        button: "Ok!",
      });
    }
    else{
      e.preventDefault();
      const document_tag1 = {
        name: document_tag,
      };
      setHeadingTag([...HeadingTag, document_tag1]);
  
      console.log(HeadingTag);
      console.log(document_tag);
      setdocument_tag("");
    }
   
  };
  const DemoDataDelete = (index) => {
    // alert(index);
    const arrarydata = HeadingTag;
    arrarydata.indexOf(index);

    arrarydata.splice(index, 1);

    setHeadingTag([...arrarydata]);
  };

  // submit for store documents
  useEffect(() => {
    console.log(HeadingTag);
  }, [document_tag]);
  const onSubmit = (data) => {
    setprogressShow(true);
    var datentime = new Date().toLocaleString();
    var date = datentime.split("/")[1];
    var month = datentime.split("/")[0];
    var year = datentime.split(",")[0].split("/")[2];
    var time = datentime.split(",")[1];
    var RearangeTime = date + "/" + month + "/" + year + "," + time;
    console.log(RearangeTime);
    const employee_id = userData.user_id;
    const formData = new FormData();
    var meeting_date = data.meeting_date;
    var meeting_date_day = meeting_date.split("-")[2];
    var meeting_date_month = meeting_date.split("-")[1];
    var meeting_date_year = meeting_date.split("-")[0];
    var rearrange_meeting_date =
      meeting_date_day + "/" + meeting_date_month + "/" + meeting_date_year;
    console.log(rearrange_meeting_date);

    if (data.doc_id == "") {
      data.doc_id = nextDocId;
    }

    formData.append("datentime", RearangeTime);
    formData.append("id", data.doc_id);
    formData.append("category_id", documentType);
    formData.append("employee_id", employee_id);
    formData.append("meeting_date", rearrange_meeting_date);
    formData.append("accessibility", data.accessibility);
    console.log(data);
    if (data.documents.length > 1) {
      for (let i = 0; i < data.documents.length; i++) {
        formData.append("documents", data.documents[i]);
      }
    } else {
      formData.append("documents", data.documents[0]);
    }
    if (HeadingTag.length > 0) {
      for (let i = 0; i < HeadingTag.length; i++) {
        formData.append("document_tag", HeadingTag[i].name);
      }
    } else {
      formData.append("document_tag", HeadingTag);
    }
    axios
      .post(`${BaseUrl}/documents/process_post`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          console.log(data);
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response) {
          console.log(response.data.data);
          window.$("#exampleModal").modal("hide");
          getDataapicall();
          reset({
            document_type: "",
            doc_id: "",
            meeting_date: "",
            documents: "",
          });
          setnextDocId("");
          setdocumentType("");
          setHeadingTag([]);

          setprogressShow(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };





  //search
  const SearchData = (e) => {
  
 
    setsearchdata(e.target.value.toLowerCase());
    const search = e.target.value;
    if (search == "") {
      getDataapicall();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/documents/category/search/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);
          setdata("");
          setdata(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "Documents Type",
      dataIndex: "NAME",
   
    },

    {
      title: "Type Details",

      render: (text, record) => (
        <>
          <Link
            className="btn btn-success btn-sm"
            to={`/docs/type_wise_view/${record.NAME}`}
          >
            <span class="fa fa-eye"></span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      {console.log("render344")}
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
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  BBA Archive
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
                    placeholder="Search by type"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
                <button
                  type="button"
                  class="Button_success float-right"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Document</span>
                </button>
              </div>
            </div>
            <div class="card-body1">
              {/* /Page Header */}
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
                        <i class="fa fa-plus"></i> Add Document
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
                            class="form_design"
                          >
                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Document
                                Type
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class="form-select form-control bba_documents-form-control"
                                  {...register("document_type", {
                                    onChange: (e) => {
                                      handleOnchangeforlast_id(e);
                                    },
                                    required: true,
                                  })}
                                >
                                  <option value="">Select Type</option>
                                  {categoryData?.length > 0 && (
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

                            {/* after select category this secton will show ..start*/}
                            {documentType != "" && (
                              <>
                                <div className="mb-2 row" >
                                  <label
                                    for="inputtext"
                                    class="col-sm-4 col-form-label"
                                  >
                                    {" "}
                                    <span style={{ color: "red" }}>*</span>
                                    Document Id/Name
                                  </label>
                                  <div className="col-sm-8" style={{textAlign:'left'}}>
                                    {!lastIdLoadder && (
                                      <>
                                        <div
                                          class="spinner-border text-primary"
                                          role="status"
                                        >
                                          <span class="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                      </>
                                    )}
                                    <input
                                      type="text"
                                      class="form-control bba_documents-form-control"
                                      placeholder="Document ID/Name"
                                      // defaultValue={nextDocId}
                                      {...register("doc_id", {
                                        required: true,
                                      })}
                                    />
                                    <span>
                                      Last Document entry number is:
                                      {lastDocId == null ? "0" : lastDocId} &
                                      next will be{" "}
                                      <span style={{ color: "red" }}>
                                        {nextDocId}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* after select category this secton will show ..end*/}

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Held on
                                the date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  id="validationDefault03"
                                  placeholder="Held on the date"
                                  {...register("meeting_date", {
                                    // onChange: (e) => {handleOnchange(e)},
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Document
                                File
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="file"
                                  id="customFile"
                                  class="form-control bba_documents-form-control"
                                  {...register("documents", {
                                    required: true,
                                  })}
                                  multiple
                                />
                              </div>
                              {progressShow && (
                                <>
                                  <div class="progress mb-2">
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
                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Accessibility
                               
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class="form-select form-control bba_documents-form-control"
                                  {...register("accessibility", {
                                    
                                    required: true,
                                  })}
                                >
                                  <option value="">Select Type</option>
                                  <option value="public">
                                  Public
                                  </option>
                                  <option value="private">Private</option>
                                </select>
                              </div>
                            </div>
                            <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>Document
                                Tag Add Or Next Step
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class="form-select form-control bba_documents-form-control"
                                  onChange={(e) =>
                                    setDocumentTagWrite(e.target.value)
                                  }
                                >
                                  <option value="">Select Type</option>
                                  <option value="tagAdd">
                                    Document Tag Add
                                  </option>
                                  <option value="nextstep">Next Step</option>
                                </select>
                              </div>
                            </div>

                            {DocumentTagWrite == "tagAdd" && (
                              <>
                                <div className="mb-2 row">
                                  <label
                                    for="inputtext"
                                    class="col-sm-4 col-form-label"
                                  >
                                    {" "}
                                    Document Heading,Tag,Keyword
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      class="form-control bba_documents-form-control"
                                      id="validationDefault03"
                                      placeholder="Tag,Heading"
                                      name="document_tag"
                                      value={document_tag}
                                      onChange={(e) =>
                                        setdocument_tag(e.target.value)
                                      }
                                    ></input>
                                  </div>
                                </div>
                                <div>
                                  <button
                                    class="btn btn-primary btn-sm"
                                    onClick={SubmitTagAdd}
                                  >
                                    Tag Add
                                  </button>
                                </div>

                                <div class="previewTag ">
                                  {HeadingTag.length > 0 && (
                                    <>
                                      <table class="table table-striped mt-2">
                                        <thead>
                                          <tr>
                                            <th>SI</th>
                                            <th>Tag Name</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {HeadingTag.map((row, index) => (
                                            <>
                                              <tr>
                                                <td>
                                                  <button class="btn btn-danger btn-sm">
                                                    {" "}
                                                    <i
                                                      class="fa fa-times"
                                                      aria-hidden="true"
                                                      onClick={() =>
                                                        DemoDataDelete(index)
                                                      }
                                                    ></i>
                                                  </button>
                                                </td>
                                                <td> {row.name}</td>
                                              </tr>
                                            </>
                                          ))}
                                        </tbody>
                                      </table>
                                    </>
                                  )}
                                </div>
                                <div className="SubmitFooter">
                                  <button
                                    type="submitupdate"
                                    class="btn btn-success btn-sm mr-2"
                                  >
                                    <span>Final Add</span>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    data-dismiss="modal"
                                  >
                                    <span> Close</span>
                                  </button>
                                </div>
                              </>
                            )}
                            {DocumentTagWrite == "nextstep" && (
                              <>
                                <div className="SubmitFooter">
                                  <button
                                    type="submitupdate"
                                    class="btn btn-success btn-sm mr-2"
                                  >
                                    <span>Final Add</span>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    data-dismiss="modal"
                                  >
                                    <span> Close</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                          total: Alldata.length > 0 ? Alldata : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={Alldata.length ? Alldata : ""}
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

export default Create_Document1;

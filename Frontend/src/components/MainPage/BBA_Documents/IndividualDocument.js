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
import { itemRender, onShowSizeChange } from "../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../../index.css";
import "../BBA_Documents/vendor.css";
import { Link, useParams } from "react-router-dom";

import ViewDocuments from "./ViewDocuments";
import { BaseUrl } from "./CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";
// import Dashboard from "../MainPage/Main/Dashboard";

const IndividualDocument = () => {
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
  const useParam = useParams();
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

      const AllgetaData = res.data.data.filter(
        (item) => item.NAME == useParam.type
      );
      console.log("AllgetaData",useParam.type)
      AllgetaData.sort((a, b) => b.MEETING_ID - a.MEETING_ID);
      const sarchData = AllgetaData.filter((item) => {
        if (searchdata == "") {
          return item;
        }

        const row =
          item.MEETING_DATE + " " + item.MEETING_ID + " " + item.DOCUMENT_TAG;
        return row.toLowerCase().includes(searchdata);
        // item.name.toLowerCase().includes(query)
      });
      setdata(sarchData);
      console.log("sarch", sarchData);
      setDataLoader(false);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/documents/category/view`).then((res) => {
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
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  console.log("userData",userData)
  //get last documents id
  const handleOnchangeforlast_id = async (e) => {
    setdocumentType(e.target.value);

    console.log(e.target.value);
    await axios
      .get(`${BaseUrl}/documents/getlastId/${e.target.value}`)
      .then((res) => {
        setlastDocId(Number(res.data.data[0].ID));
        setnextDocId(Number(res.data.data[0].ID) + 1);
        setlastIdLoadder(true);
      });
  };
  //tag add
  const SubmitTagAdd = (e) => {
    e.preventDefault();
    const document_tag1 = {
      name: document_tag,
    };
    setHeadingTag([...HeadingTag, document_tag1]);

    console.log(HeadingTag);
    console.log(document_tag);
    setdocument_tag("");
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


  const EditIndividual = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = Alldata.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };

  const onSubmitUpdate = async (data) => {
    if (data.document_id == "") {
      data.document_id = UpdateDataFound.MEETING_ID;
    }
    if (data.category_id == "") {
      data.category_id = UpdateDataFound.CATEGORY_ID;
    }
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }
    if (data.meeting_date == "") {
      data.meeting_date = UpdateDataFound.MEETING_DATE;
    }
    if(data.doctype==""){
      data.doctype=UpdateDataFound.DOCTYPE
      
    }

    console.log(data);

    const updateResult = await axios
      .put(`${BaseUrl}/documents/update/${data.id}`, data)
      .then((response) => {
        if (response.data.success) {
          getDataapicall();
          swal({
            title: "Updated Successfully!",
            icon: "success",
            button: "Ok!",
          });
       
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });

    // console.log(UpdateDataFound);
  };
  //fghf
  //data delete
  const DeleteIndividual_vendor = (id) => {
    setvendorDeleteId(id);

    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/delete/${id}`)
          .then((response) => {
            if (response.data.success) {
              getDataapicall();
              swal("Successfully Deleted!Thank You", "", "success");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value.toLowerCase());
  };

  //table
  const columns = [
    {
      title: "Documents ID/Name",
      dataIndex: "MEETING_ID",
      className: "dataBreak",
    },

    {
      title: "Held on the date",
      dataIndex: "MEETING_DATE",
    },
    {
      title: "Entry Date & Time",
      // dataIndex: "DATENTIME",
      render: (text, record) => <>{record.DATENTIME}</>,
    },

    {
      title: "Documents Details",

      render: (text, record) => (
        <>
          <Link
            className="btn btn-success btn-sm"
            to={`/docs/viewDocuments/${record.ID}/${record.MEETING_ID}/${record.CATEGORY_ID}`}
          >
            <span class="fa fa-eye"></span>
          </Link>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "DOCTYPE",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary btn-sm"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                EditIndividual(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
            {userData.user_rule=='Admin' &&     <a
              className="btn btn-danger btn-sm"
              onClick={() => {
                DeleteIndividual_vendor(record.ID);
              }}
            >
              <i
                className="fa fa-trash-o"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>}
        
          </div>
        </div>
      ),
    },
  ];

  const uniqueDOCTYPES = [
    ...new Map(Alldata.map((m) => [m.DOCTYPE, m])).values(),
  ];
  console.log("uniqueDOCTYPES",uniqueDOCTYPES)
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
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  {useParam.type}
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
                    placeholder="Search by id,held date,Tag"
                    onChange={(e) => SearchData(e)}
                  />
                </div>
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
                        dataSource={Alldata ? Alldata : ""}
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h6
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{
                          fontWeight: "600",
                          color: "#5265ac",
                          fontSize: "15px",
                        }}
                      >
                        <i className="fa fa-pencil m-r-5" /> Update Document
                        {/*UpdateDataFound.id*/}
                      </h6>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    {/* handleSubmit1(onSubmit1) */}
                    {/* vendor update form */}
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        <form
                          onSubmit={handleSubmit1(onSubmitUpdate)}
                          class="form_design"
                        >
                          <div className="mb-2 row" style={{ display: "none" }}>
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="number"
                                class="form-control bba_documents-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.ID}
                                {...register1("id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> document
                              id/name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Id"
                                defaultValue={UpdateDataFound.MEETING_ID}
                                {...register1("document_id")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Held on
                              the date
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Held on the date"
                                defaultValue={UpdateDataFound.MEETING_DATE}
                                {...register1("meeting_date")}
                              />
                            </div>
                          </div>
                          <div className="mb-2 row ">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Documents
                              Type
                            </label>
                            {/* <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder=" Document Types"
                                id="validationDefault07"
                                defaultValue={UpdateDataFound.NAME}
                                {...register1("name")}
                              />
                            </div> */}

                            <div className="col-sm-8">
                              <select
                                class="form-select form-control bba_documents-form-control"
                                {...register1("category_id")}
                              >
                                {categoryData.length > 0 && (
                                  <>
                                    {categoryData.map((row, index) => (
                                      <>
                                        {row.ID ==
                                          UpdateDataFound.CATEGORY_ID && (
                                          <option
                                            value={row.ID}
                                            selected="selected"
                                          >
                                            {row.CATEGORY_NAME}
                                          </option>
                                        )}

                                        {row.ID !=
                                          UpdateDataFound.CATEGORY_ID && (
                                          <option value={row.ID}>
                                            {row.CATEGORY_NAME}
                                          </option>
                                        )}
                                      </>
                                    ))}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="mb-2 row ">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Accessibility
                              Type
                            </label>
                           

                            <div className="col-sm-8">
                              <select
                                class="form-select form-control bba_documents-form-control"
                                {...register1("doctype")}
                              >
                            <>
                                        {'public' ==
                                          UpdateDataFound.DOCTYPE?  (
                                          <option
                                            value={'public'}
                                            selected="selected"
                                          >
                                            {'public'}
                                          </option>
                                        ): <option
                                        value={'private'}
                                        selected="selected"
                                      >
                                        {'private'}
                                      </option>}

                                        
                                      </>
                                {  UpdateDataFound.DOCTYPE=='public'? <option value='private'>
                                private
                                          </option>: <option value="public">
                                          public
                                          </option>}
                                
                              </select>
                            </div>
                          </div>
                          <div className="SubmitFooter">
                            <button type="submit" class="Button_success">
                              <span>Update</span>
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
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default IndividualDocument;

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

const Docs_Category = () => {
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
    axios.get(`${BaseUrl}/documents/category/view`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setdata(res.data.data);
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

  // submit for store vendor  data info
  const onSubmit = (data) => {
    console.log(data);
    axios.post(`${BaseUrl}/documents/category/add`, data).then((response) => {
      if (response.data.success ){
        console.log(response.data.data);
        window.$("#exampleModal").modal("hide");
        getDataapicall();
      }
      if(response.data.success==false ){
        swal("Already this category exist","","warning")
      }
    });
  };

  const EditCategory = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = Alldata.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };

  const onSubmitUpdate = async (data) => {
    if (data.category_name == "") {
      data.category_name = UpdateDataFound.CATEGORY_NAME;
    }

    console.log(data);

    const updateResult = await axios
      .put(`${BaseUrl}/documents/category/update/${UpdateId}`, data)
      .then((response) => {
        if (response.data.success) {
          getDataapicall();
          swal({
            title: "Updated Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset1();
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });

    // console.log(UpdateDataFound);
  };

  //data delete
  const DeleteCategory = (id) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/documents/category/delete/${id}`)
          .then((response) => {
            if (response.data.success) {
              getDataapicall();
              swal("Successfully Deleted!Thank You", "", "success");
            }
            else if(response.data.success==false){
              swal("You cannot delete category,due to its has files exist", "", "warning");
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

  //search vendor
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getDataapicall();
    } else {
    
      const searchby_lowercase = search.toLowerCase().replace(/'/g, "''");
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

    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
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
                EditCategory(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
            <a
              className="btn btn-danger btn-sm"
              href="#"
              onClick={() => {
                DeleteCategory(record.ID);
              }}
            >
              <i
                className="fa fa-trash-o"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
          </div>
        </div>
      ),
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
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus"></i> <span>Add Category</span>
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
                        <i class="fa fa-plus"></i> Add Category
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
                                Category Name
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Category Name"
                                  {...register("category_name", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="SubmitFooter">
                              <button
                                type="submitupdate"
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
                        Category
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
                              <span style={{ color: "red" }}>*</span>Category
                              Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Category Name"
                                defaultValue={UpdateDataFound.CATEGORY_NAME}
                                {...register1("category_name")}
                              />
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

export default Docs_Category;
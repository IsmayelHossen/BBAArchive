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

const Create_Document = () => {
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
    document.title = "View Categories Wise";

    getDataapicall();
  }, [searchdata]);

  useEffect(() => {
    document.title = "View Categories Wise";

    getCategory();
  }, []);

  const getDataapicall = () => {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    console.log("userData.usertype",userData)
    axios.get(`${BaseUrl}/documents/getdataCategory_wise/${userData.usertype}`).then((res) => {
      console.log(res.data.data);

      const AllgetaData = res.data.data.filter(
        (item) => item.NAME == useParam.type
      );
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
  const onSubmit = (data) => {
    setprogressShow(true);
    var datentime = new Date().toLocaleString();
    var date = datentime.split("/")[1];
    var month = datentime.split("/")[0];
    var year = datentime.split(",")[0].split("/")[2];
    var time = datentime.split(",")[1];
    var RearangeTime = date + "/" + month + "/" + year + "," + time;
    console.log(RearangeTime);
    const employee_id = 685;
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
    formData.append("name", documentType);
    formData.append("employee_id", employee_id);
    formData.append("meeting_date", rearrange_meeting_date);

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
    if (data.name == "") {
      data.name = UpdateDataFound.NAME;
    }
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }
    if (data.meeting_date == "") {
      data.meeting_date = UpdateDataFound.MEETING_DATE;
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
  //fghf
  //data delete
  const DeleteIndividual_vendor = (id) => {
    setvendorDeleteId(id);
console.log(id)
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
      title: "Documents ID",
      dataIndex: "MEETING_ID",
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
            to={`/docs/viewDocuments/${record.ID}/${record.MEETING_ID}`}
          >
            <span class="fa fa-eye"></span>
          </Link>
        </>
      ),
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
            <a
              className="btn btn-danger btn-sm"
              onClick={() => {
                DeleteIndividual_vendor(record.ID);
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

              
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default Create_Document;

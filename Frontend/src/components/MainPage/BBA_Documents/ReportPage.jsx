import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import { ColorRing, FallingLines, LineWave, Rings, Watch } from "react-loader-spinner";
import { useReactToPrint } from "react-to-print";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const ReportPage = () => {
    const[ReportGenerateData,setReportGenerateData]=useState([])
    const[Isloader,setIsloader]=useState(false)
    const[reportType,setreportType]=useState("")
    
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
      
      const onSubmit=async(data)=>{
        setreportType(data.report_type)
       
        const fromDate = new Date(data.fromdate);
const toDate = new Date(data.todate);
if (fromDate > toDate) {
  swal("To date  must be greater than from date","",'warning')
  
} else {
  setReportGenerateData([])
  if(data.report_type=="all"){
      console.log(data.report_type)
  setIsloader(true)
      await axios
      .get(`${BaseUrl}/documents/report/${data.report_type}`)
      .then((response) => {
        if (response.data.success==true) {
            console.log("response.data.data",response.data.data)
            setReportGenerateData(response.data.data)
            setIsloader(false)
          
        // if(response.data.data.length==0){
        //   swal("No data found","",'warning')
        // }
        }
      })
  
      .catch((error) => {
        console.log(error);
      
      });
  }
  else{
      console.log(data.report_type)
      setIsloader(true)
          await axios
          .get(`${BaseUrl}/documents/report/${data.fromdate}/${data.todate}`)
          .then((response) => {
            if (response.data.success==true) {
                console.log("response.data.data",response.data.data)
                setReportGenerateData(response.data.data)
                setIsloader(false)
                // if(response.data.data.length==0){
                //   swal("No data found","",'warning')
                // }
               
            }
          })
      
          .catch((error) => {
            console.log(error);
          
          });
  }
}


      }
      const componentRefBookList = useRef();
      const handlePrintBookList = useReactToPrint({
        content: () => componentRefBookList.current,
      });
    return (
        <div>
            <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
        <style type="text/css" media="print">
              {
                " @media print{body{background:#fff;zoom:90%}@page :right {margin-right:.2cm; } @page{size:potrait;margin:.2cm}::-webkit-scrollbar{display:none} "
              }
            </style>
            <h3>Report Generate</h3>
           <div class="row">
            <div class="col-md-8">
            <form
             onSubmit={handleSubmit(onSubmit)}
               class="form_design_report pt-4"
             >
               <div className="mb-1 row">
                 <label for="inputtext" class="col-sm-4 col-form-label">
                   {" "}
                   <span style={{ color: "red" }}>*</span>
                   Report Type
                 </label>
                 <div className="col-sm-8">
                   <select
                     class=" form-select form-control bba_documents-form-control"
                     name="select_type_toPrint"
                     //   onChange={GetDataToPrint}
                     {...register("report_type", {
                       required:true,
                     })}
                   >
                     <option value="">Select Report Type</option>
                     
                     <option value="datetodata">From Date -To Date</option>
                     <option value="all">All</option>
                  
                   </select>
                 </div>
               </div>
               {reportType=='datetodata' && <>
               <div className="mb-2 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                From Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  id="validationDefault03"
                                  placeholder="Held on the date"
                                  {...register("fromdate", {
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
                                <span style={{ color: "red" }}>*</span>
                                To Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  id="validationDefault03"
                                  placeholder="Held on the date"
                                  {...register("todate", {
                                    // onChange: (e) => {handleOnchange(e)},
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
               </>}
               <button type="submit" class="btn btn-primary mb-2">Generate</button>
               </form>
            </div>
            <div class="col-md-4">
                <button class="btn btn-primary btn-sm mr-2 mb-2 mt-2"   onClick={handlePrintBookList}>PDF<i class="fa fa-file-pdf-o"></i></button>
                <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-primary btn-sm mr-2"
                              table={`table-to-xls-download`}
                              filename="tablexls"
                              sheet="tablexls"
                              buttonText={
                                <>
                                Excel
                                  <i
                                    class="fa fa-file-excel-o"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  <i
                                    class="fa fa-download"
                                    aria-hidden="true"
                                  ></i>
                                </>
                              }
                            />
                {/* <button class="btn btn-primary mb-2">Download Excel</button> */}
            </div>
           </div>
                {Isloader?<> <Watch
  visible={true}
  height="80"
  width="80"
  radius="48"
  color="#75ADCE"
  ariaLabel="watch-loading"
  wrapperStyle={{
    margin: '0 auto !important',
  display:'block',
  marginTop:'20px !importnant'
 }}
  wrapperClass=""
  /></>:  <div className="row">

  {ReportGenerateData?.length>0 && <>
  <div ref={componentRefBookList}>
  <h4 class="text-center">Login History</h4>

<table class="table table-bordered"  >

<thead>
<th>User</th>
<th>User Rule</th>
<th>IP</th>
<th>Device Name</th>
<th>Entry Time</th>
<th>Exit Time</th>
</thead>
<tbody>
{ReportGenerateData.map((row)=>(
<tr>
<td>{row.NAME}</td>
<td>{row.USER_RULE}</td>
<td>{row.TERMINAL_IP}</td>
<td>{row.TERMINAL_TYPE}</td>
<td>
{
row.CREATED_AT
}
</td>
<td>{row.EXIT_TIME}</td>


</tr>
))}


</tbody>
</table>
  </div>

  </>}     
{/* excel download */}
<div >

<table
                            class=" ReportTable table mt-2 d-none "
                            id={`table-to-xls-download`} 
                          >
                             <caption>Login History</caption>
                            <thead>
<th>User</th>
<th>User Rule</th>
<th>IP</th>
<th>Device Name</th>
<th>Entry Time</th>
<th>Exit Time</th>
                            </thead>
                            <tbody>
{ReportGenerateData.map((row)=>(
<tr>
<td>{row.NAME}</td>
<td>{row.USER_RULE}</td>
<td>{row.TERMINAL_IP}</td>
<td>{row.TERMINAL_TYPE}</td>
<td>
{
(() => {
const utcDateTime = new Date(row.CREATED_AT); // Assuming CREATED_AT contains UTC time
// const offset = ; // Offset for Dhaka, Bangladesh (UTC+6) in minutes

// Adjust the time for the desired time zone
const localDateTime = new Date(utcDateTime.getTime() + ( 60 * 1000));

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
})()
}
</td>
<td>{row.EXIT_TIME}</td>


</tr>
))}


</tbody>
                          </table>

</div>


   </div>}
              
            </div>
            </div>
        </div>
    );
}

export default ReportPage;

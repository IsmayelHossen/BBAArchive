const express = require("express");
const Create_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");
//database
var a;
var b;
var c;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req",req.body)
    if(req.body.accessibility=='public'){
      cb(null, "./public/uploadDoc/");
    }
    else{
      cb(null, "./private/uploadDoc/");
    }
   
  },
  filename: (req, file, cb) => {
    const fileext = path.extname(file.originalname);

    // if(req.body.id&& req.body.name){
    //       const a = document_id_result[0].id;
    // }
    // else{
    //     const a = req.body.id

    // }

    const filename =
      file.originalname.replace(fileext, "_").toLowerCase() +
      new Date().getTime();
    cb(null, filename + fileext);
  },
});
const upload = multer({
  storage: storage,
});
const uploadSingleImage = upload.array("documents");
const uploadFile_more = upload.array("add_more_file");

Create_Route.post("/process_post",RouteCheckUsingJWT, async function (req, res, next) {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }

    console.log(req.body);
    const { datentime, category_id, employee_id, meeting_date,accessibility } = req.body;
    var id=req.body.id.replace(/'/g, "''")
    // var document_tag = req.body.document_tag.replace(/'/g, "''");
    var sumTag = "";
    if (
      Array.isArray(req.body.document_tag) &&
      req.body.document_tag.length > 0
    ) {
      var sumTag = "";
      req.body.document_tag.map((row) => {
        sumTag = row.replace(/'/g, "''") + " " + sumTag;
      });
    } else {
      sumTag = req.body.document_tag.replace(/'/g, "''");
    }

    const query = `INSERT INTO documents(datentime, meeting_id, category_id,emp_id,meeting_date,document_tag,doctype) VALUES('${datentime}','${id}', '${category_id}','${employee_id}','${meeting_date}','${sumTag}','${accessibility}')`;
    const result = await DBQuery(query);
    const get_document_id_query = "SELECT MAX(ID) as id from documents";
    const document_id_result = await DBQuery(get_document_id_query);

    a = document_id_result[0].id;

    if (req.files.length > 0) {
      req.files.map(async (row, index) => {
        var filename=row.filename.replace(/'/g, "''");
   
        const query2 = `INSERT INTO  fileupload(datentime,fileName, documents_id, f_size) VALUES('${req.body.datentime}','${filename}', '${document_id_result[0].id}','${row.size}')`;
        const result2 = await DBQuery(query2);
      });
    }

    res.status(200).json({
      success: true,
    });
  });
});

Create_Route.post("/add_moreFile",RouteCheckUsingJWT, async function (req, res, next) {
  uploadFile_more(req, res, async function (err) {
    if (err) {
      console.log("hhh");
      return res.status(200).send({ status: 400, message: err.message });
    }

    req.files.map(async (row, index) => {
      console.log(row.filename);
      console.log(req.body.idp);
      const query = `INSERT INTO  fileupload(datentime,fileName, documents_id, f_size) VALUES('${req.body.datentime}','${row.filename}', '${req.body.idp}','${row.size}')`;
      const result2 = await DBQuery(query);
    });
    res.status(200).json({
      success: true,
    });
  });
});

Create_Route.post("/category/add",RouteCheckUsingJWT, async function (req, res, next) {
  console.log(req.body);
  const category_name = req.body.category_name.replace(/'/gi, "''");
  const checkexist=`select*from category where category_name='${category_name}'`;
  const checkresult = await DBQuery(checkexist);
  if(checkresult.length>0){
    res.status(200).json({
      success: false,
    });
  }
  else{
    console.log("user_id",req.user_id)
    const query = `INSERT INTO  category(category_name,emp_id) VALUES('${category_name}','${req.user_id}')`;
    const result2 = await DBQuery(query);
    res.status(200).json({
      success: true,
    });
  }

});
Create_Route.post("/read_download/add",RouteCheckUsingJWT, async function (req, res, next) {
  console.log(req.body);
  console.log(req.user_id)
  
  
  const parts = req.ip || req.remoteAddress;
  // const ENTRY_USER = logInfo?.employe_id;
  var ip = parts?.split(':');
   ip = ip[ip.length - 1]
  const TERMINAL_TYPE =  req.device?.type;

  // Extract the day, month, and year
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1; // Month is zero-based, so we add 1
  const year = new Date().getFullYear();
  
  // Convert to Dhaka time zone
  const options = { timeZone: 'Asia/Dhaka' };
  const dhakaTime = new Date().toLocaleString('en-US', { ...options, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
  
  // Format the date as "day-month-year" and time as "hour:minute:second AM/PM"
  if(day<10){
    day='0'+day
  }
  if(month<10){
month='0'+month;
  }
  const formattedDateTime = `${day}-${month}-${year}, ${dhakaTime}`;

  const query = `INSERT INTO   read_download(createtime,terminal_type ,terminal_ip,emp_id,category,filename,process_type,doc_id) VALUES('${formattedDateTime}','${TERMINAL_TYPE}','${ip}','${req.user_id}','${req.body.categoryid}','${req.body.filename}','${req.body.type}','${req.body.doc_id}')`;
  const result2 = await DBQuery(query);
 
});
//public routes
Create_Route.post("/read_downloadPublic/add", async function (req, res, next) {
  console.log(req.body);


  
  const parts = req.ip || req.remoteAddress;
  // const ENTRY_USER = logInfo?.employe_id;
  var ip = parts?.split(':');
   ip = ip[ip.length - 1]
  const TERMINAL_TYPE =  req.device?.type;;

    // Extract the day, month, and year
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1; // Month is zero-based, so we add 1
    const year = new Date().getFullYear();
    
    // Convert to Dhaka time zone
    const options = { timeZone: 'Asia/Dhaka' };
    const dhakaTime = new Date().toLocaleString('en-US', { ...options, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    
    // Format the date as "day-month-year" and time as "hour:minute:second AM/PM"
    if(day<10){
      day='0'+day
    }
    if(month<10){
  month='0'+month;
    }
    const formattedDateTime = `${day}-${month}-${year}, ${dhakaTime}`;
  const query = `INSERT INTO   read_download(createtime,terminal_type ,terminal_ip,emp_id,category,filename,process_type,doc_id) VALUES('${formattedDateTime}','${TERMINAL_TYPE}','${ip}','1001','${req.body.categoryid}','${req.body.filename}','${req.body.type}','${req.body.doc_id}')`;
  const result2 = await DBQuery(query);
 
});
module.exports = Create_Route;

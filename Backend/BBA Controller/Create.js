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
    cb(null, "./public/uploadDoc/");
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
    const { datentime, id, category_id, employee_id, meeting_date,accessibility } = req.body;
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

    const query = `INSERT INTO DOCUMENTS(datentime, meeting_id, category_id,emp_id,meeting_date,document_tag,doctype) VALUES('${datentime}','${id}', '${category_id}','${employee_id}','${meeting_date}','${sumTag}','${accessibility}')`;
    const result = await DBQuery(query);
    const get_document_id_query = "SELECT MAX(ID) as id from documents";
    const document_id_result = await DBQuery(get_document_id_query);

    a = document_id_result[0].id;

    if (req.files.length > 0) {
      req.files.map(async (row, index) => {
        const query2 = `INSERT INTO  fileupload(datentime,fileName, documents_id, f_size) VALUES('${req.body.datentime}','${row.filename}', '${document_id_result[0].id}','${row.size}')`;
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
  const query = `INSERT INTO  category(category_name) VALUES('${category_name}')`;
  const result2 = await DBQuery(query);
  res.status(200).json({
    success: true,
  });
});

module.exports = Create_Route;

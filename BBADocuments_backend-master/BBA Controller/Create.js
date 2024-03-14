const express = require("express");
const Create_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const Connection = require("../Database/Connection");
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

Create_Route.post("/process_post", Connection, async function (req, res, next) {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }

    console.log(req.body);
    const { datentime, id, name, employee_id, meeting_date } = req.body;
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

    const query = `INSERT INTO DOCUMENTS(datentime, meeting_id, NAME,emp_id,meeting_date,document_tag) VALUES('${datentime}','${id}', '${name}','${employee_id}','${meeting_date}','${sumTag}')`;
    try {
      let result = await req.Conn.execute(query);
      const get_document_id_query = "SELECT MAX(ID) as id from documents";
      const queryExecuted = await req.Conn.execute(get_document_id_query);
      const document_id_result = queryExecuted.rows;

      a = document_id_result[0].ID;

      if (req.files.length > 0) {
        req.files.map(async (row, index) => {
          const query2 = `INSERT INTO  fileupload(datentime,fileName, documents_id, f_size) VALUES('${req.body.datentime}','${row.filename}', '${document_id_result[0].ID}','${row.size}')`;
          const result2 = await req.Conn.execute(query2);
        });
      }

      res.status(200).json({
        success: true,
        msg: "Data Added Successfully",
      });
    } catch (error) {
      console.log(error);
      console.log("Query not executed");
    }
  });
});

Create_Route.post("/add_moreFile", Connection, async function (req, res, next) {
  uploadFile_more(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }
    try {
      req.files.map(async (row, index) => {
        const query = `INSERT INTO  fileupload(datentime,fileName, documents_id, f_size) VALUES('${req.body.datentime}','${row.filename}', '${req.body.idp}','${row.size}')`;
        const result2 = await DBQuery(query);
      });
      res.status(200).json({
        success: true,
      });
      if (req.Conn) {
        // conn assignment worked, need to close
        console.log("close");
        await req.Conn.close();
      }
    } catch (errors) {
      console.log(errors);
      console.log("Query not executed");
    }
  });
});

Create_Route.post("/category/add", Connection, async function (req, res, next) {
  console.log(req.body);
  const category_name = req.body.category_name.replace(/'/gi, "''");
  try {
    const query = `INSERT INTO  category(category_name) VALUES('${category_name}')`;
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      msg: "Category Added Successfully",
    });
    if (req.Conn) {
      // conn assignment worked, need to close
      console.log("close");
      await req.Conn.close();
    }
  } catch (errors) {
    console.log(errors);
    console.log("Query not executed");
  }
});

module.exports = Create_Route;

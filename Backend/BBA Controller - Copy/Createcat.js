const express = require("express");
const Createcat_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
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
      file.originalname.replace(fileext, "_").toLowerCase() + req.body.id;
    cb(null, filename + fileext);
  },
});
const upload = multer({
  storage: storage,
});
const uploadSingleImage = upload.array("documents");

Createcat_Route.post("/processcat_post", async function (req, res, next) {
  uploadSingleImage(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }

    console.log(req.body);
    const query = `INSERT INTO DOCUMENTS(datentime, document_id, NAME) VALUES('${req.body.datentime}','${req.body.id}', '${req.body.name}')`;
    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
    });
  });
});

module.exports = Createcat_Route;

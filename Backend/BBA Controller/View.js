const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");

//get method
View_Route.get("/getdata",RouteCheckUsingJWT, async function (req, res) {
  console.log("getdata")
  const query =
    `SELECT category.category_name as NAME ,documents.* from documents inner join category on documents.category_id=category.id`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
  // console.log(rows);
});
//get category wise 
View_Route.get("/getdataCategory_wise/:usertype", RouteCheckUsingJWT,async function (req, res) {

  const usertype1 = req.params.usertype;
  console.log("getdata",usertype1)
  if(usertype1=='private'){
    const query =
    `SELECT category.category_name as NAME,documents.* from documents inner join category on documents.category_id=category.id`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
  }
  else{
   
    const query =
    ` SELECT category.category_name as NAME ,documents.* from documents inner join category on documents.category_id=category.id where documents.doctype='${usertype1}`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
  }

  // console.log(rows);
});
View_Route.get("/filedata/:id",RouteCheckUsingJWT, async function (req, res) {
  const documents_id = req.params.id;
  const query = `SELECT * FROM fileupload where documents_id =${documents_id} order by filename ASC `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

View_Route.get("/docslist", RouteCheckUsingJWT,async function (req, res) {
  const s = req.params.id;

  const query = `SELECT category.category_name as NAME, documents.*,fileupload.*  FROM fileupload
   inner join documents on documents.id=fileupload.documents_id
inner join category on category.id=documents.category_id
    order by fileupload.id asc `;

  const result = await DBQuery(query);
  console.log(result)
  res.status(200).json({
    success: true,
    data: result,
  });
});
//category view
View_Route.get("/category/view",RouteCheckUsingJWT, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//category list

View_Route.get("/categorylist",RouteCheckUsingJWT, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//get document last id
View_Route.get("/getlastId/:docType",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

  console.log(docTye);
  
  const query = `SELECT MAX(CAST(meeting_id AS int)) AS id from documents where category_id='${docTye}' `;

  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/loger/view",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

  console.log(docTye);
  
  const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id order by logers.id desc`;

  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = View_Route;

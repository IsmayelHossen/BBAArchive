const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");
//database

//update method
Update_Route.put("/update/:id",RouteCheckUsingJWT, async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  const { category_id, document_id, meeting_date,doctype } = req.body;
  const query = `update documents set  CATEGORY_ID='${category_id}',MEETING_ID='${document_id}',meeting_date='${meeting_date}',DOCTYPE='${doctype}' where id=${id}`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

//update category method
Update_Route.put("/category/update/:id",RouteCheckUsingJWT, async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  const { category_name } = req.body;
  const query = `update category set  category_name='${category_name}' where id=${id}`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Update_Route;

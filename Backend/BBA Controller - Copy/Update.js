const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
//database

//update method
Update_Route.put("/update/:id", async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  const { name, document_id, meeting_date } = req.body;
  const query = `update documents set  name='${name}',MEETING_ID='${document_id}',meeting_date='${meeting_date}' where id=${id}`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

//update category method
Update_Route.put("/category/update/:id", async function (req, res) {
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

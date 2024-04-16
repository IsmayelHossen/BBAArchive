const express = require("express");
const Delete_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { log } = require("console");
//database
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");

Delete_Route.delete("/delete/docs/:id/:filename",RouteCheckUsingJWT, async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const query = `delete from fileupload where id='${id}'`;
  const result1 = await DBQuery(query);

  const filepath = `public/uploadDoc/${req.params.filename}`;

  await fs.unlink(filepath, () => {
    res.status(200).json({
      success: true,
      message: "Deleted data suceessfully",
    });
  });
});

Delete_Route.delete("/delete/:id",RouteCheckUsingJWT, async function (req, res) {
  const id = req.params.id;
  console.log("delete",{ id });
  const allfilename = `select*from fileupload where documents_id=${id}`;
  const allfilename1 = await DBQuery(allfilename);

  allfilename1.map(async (row, index) => {
    const filepath = `public/uploadDoc/${row.FILENAME}`;
    await fs.unlink(filepath, () => {});
  });

  const query1 = `delete from fileupload where documents_id=${id}`;
  const result1 = await DBQuery(query1);

  const query2 = `delete from documents where ID='${id}' `;
  const result2 = await DBQuery(query2);
  res.status(200).json({
    success: true,
    data: result2,
  });
});
//category delete

Delete_Route.delete("/category/delete/:id",RouteCheckUsingJWT, async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const query = `delete from category where id='${id}'`;
  const result1 = await DBQuery(query);
  console.log("result1",result1.errno)
  if(result1.errno==1451){
    res.status(200).json({
      success: false,
      message: "Deleted data suceessfully",
    });
  }
  else{
    res.status(200).json({
      success: true,
      message: "Deleted data suceessfully",
    });
  }

});
module.exports = Delete_Route;

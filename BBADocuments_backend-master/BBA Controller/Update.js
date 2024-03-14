const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const Connection = require("../Database/Connection");
//database

//update method
Update_Route.put("/update/:id", Connection, async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  const { name, document_id, meeting_date } = req.body;
  const query = `update documents set  name='${name}',MEETING_ID='${document_id}',meeting_date='${meeting_date}' where id=${id}`;
  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
      msg: "Data Updated Successfully",
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

//update category method
Update_Route.put("/category/update/:id", Connection, async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  const { category_name } = req.body;
  const query = `update category set  category_name='${category_name}' where id=${id}`;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
      msg: "Data Updated Successfully",
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

module.exports = Update_Route;

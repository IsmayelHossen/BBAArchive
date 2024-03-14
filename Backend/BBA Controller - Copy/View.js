const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const Connection = require("../Database/Connection");
//get method
View_Route.get("/getdata", Connection, async function (req, res) {
  const query =
    "SELECT*from documents order  by id desc";
  
  
    try {
     await  req.mysqlConnection.query(query, (error, results) => {
        if (error) {
          console.error("Error executing SQL query:", error);
        
         
          return;
        }
       
        res.status(200).json({
          success: true,
          data: results,
        });
    if (req.mysqlConnection) {
      // conn assignment worked, need to close
      console.log("close");
   req.mysqlConnection.end();
    }
  })
 } catch (errors) {
    console.log(errors);
    console.log("Query not executed");
  }

  // console.log(rows);
});

View_Route.get("/filedata/:id", Connection, async function (req, res) {
  const documents_id = req.params.id;
  const query = `SELECT * FROM fileupload where documents_id =${documents_id} order by filename ASC `;
  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
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

View_Route.get("/docslist", Connection, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT documents.*,fileupload.*  FROM fileupload inner join documents on documents.id=fileupload.documents_id order by fileupload.id asc `;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
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
//category view
View_Route.get("/category/view", Connection, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category order by id desc `;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
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

//category list

View_Route.get("/categorylist", Connection, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
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
//get document last id
View_Route.get("/getlastId/:docType", Connection, async function (req, res) {
  const docTye = req.params.docType;
  console.log(docTye);
  const query = `SELECT MAX(CAST(meeting_id AS int)) AS id from documents where name='${docTye}' `;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
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
module.exports = View_Route;
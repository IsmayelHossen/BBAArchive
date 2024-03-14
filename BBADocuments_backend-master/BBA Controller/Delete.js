const express = require("express");
const Delete_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { log } = require("console");
//database
const DBQuery = require("../Database/Query_Builder");
const Connection = require("../Database/Connection");

Delete_Route.delete(
  "/delete/docs/:id/:filename",
  Connection,
  async function (req, res) {
    const id = req.params.id;
    try {
      const query = `delete from fileupload where id='${id}'`;
      let result1 = await req.Conn.execute(query);

      const filepath = `public/uploadDoc/${req.params.filename}`;

      await fs.unlink(filepath, () => {
        res.status(200).json({
          success: true,
          message: "Deleted data suceessfully",
        });
      });
    } catch (error) {
      console.log(error);
      console.log("Query not executed");
    }
  }
);

Delete_Route.delete("/delete/:id", Connection, async function (req, res) {
  const id = req.params.id;
  console.log({ id });
  const query = `select*from fileupload where documents_id=${id}`;
  try {
    let result = await req.Conn.execute(query);
    const allfilename1 = result.rows;

    allfilename1.map(async (row, index) => {
      const filepath = `public/uploadDoc/${row.FILENAME}`;
      await fs.unlink(filepath, () => {});
    });

    const query1 = `delete from fileupload where documents_id=${id}`;
    let result1 = await req.Conn.execute(query1);

    const query2 = `delete from documents where ID='${id}' `;
    let result2 = await req.Conn.execute(query2);
    res.status(200).json({
      success: true,
      msg: "Deleted Data Successfully",
    });
    if (req.Conn) {
      console.log("close");
      await req.Conn.close();
    }
  } catch (error) {
    console.log(error);
    console.log("Query not executed");
  }
});
//category delete

Delete_Route.delete(
  "/category/delete/:id",
  Connection,
  async function (req, res) {
    const id = req.params.id;
    console.log(id);
    const query = `delete from category where id='${id}'`;

    try {
      let result = await req.Conn.execute(query);
      res.status(200).json({
        success: true,
        message: "Deleted data suceessfully",
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
  }
);
module.exports = Delete_Route;

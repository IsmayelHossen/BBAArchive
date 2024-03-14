const express = require("express");
const Search_Route = express.Router();
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const Connection = require("../Database/Connection");
const { Console } = require("console");
Search_Route.get("/search/:search", Connection, async function (req, res) {
  const s = req.params;

  // const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' OR meeting_id like '%${s.search}%' OR lower(datentime) like '%${s.search}%' OR lower(emp_id) like '%${s.search}%' `;
  const query = `SELECT documents.*,view_employees.* from documents join view_employees on documents.emp_id=view_employees.emp_id  where  documents.meeting_id like '%${s.search}%' OR lower(documents.meeting_date) like '%${s.search}%' OR lower(documents.document_tag) like '%${s.search}%' order by documents.meeting_id asc`;

  try {
    let result = await req.Conn.execute(query);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
    if (req.Conn) {
      console.log("close");
      await req.Conn.close();
    }
  } catch (errors) {
    console.log(errors);
    console.log("Query not executed");
  }
});

//search without filter

Search_Route.get(
  "/all_documents_search_withoutFilter/:search",
  Connection,
  async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload inner join documents on fileupload.documents_id=documents.id where (lower(documents.name)  like '%${s.search}%' OR documents.meeting_date  like '%${s.search}%' OR documents.meeting_id  like '%${s.search}%') order by documents.meeting_id asc   `;
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
  }
);
Search_Route.get(
  "/all_documents_search/:search/:filter",
  Connection,
  async function (req, res) {
    const s = req.params;
    console.log("dfgfd", s);
    const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload inner join documents on fileupload.documents_id=documents.id where (lower(documents.name)  like '%${s.search}%' OR documents.meeting_date  like '%${s.search}%' OR documents.meeting_id  like '%${s.search}%' OR lower(documents.document_tag) like '%${s.search}%') AND documents.name='${s.filter}' order by documents.meeting_id asc  `;
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
  }
);
Search_Route.get(
  "/all_documents_filter/:filter",
  Connection,
  async function (req, res) {
    const filter = req.params.filter;
    console.log("hello", filter);
    const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload  join documents on fileupload.documents_id=documents.id where documents.name='${filter}' order by documents.id asc    `;
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
  }
);

//category search

Search_Route.get(
  "/category/search/:search",
  Connection,
  async function (req, res) {
    const s = req.params;
    console.log(s);
    // const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' OR meeting_id like '%${s.search}%' OR lower(datentime) like '%${s.search}%' OR lower(emp_id) like '%${s.search}%' `;
    const query = `SELECT*from category where lower(category_name) like '%${s.search}%'`;
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
  }
);

module.exports = Search_Route;

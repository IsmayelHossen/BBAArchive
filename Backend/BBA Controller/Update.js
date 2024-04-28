const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");
//database
const fs = require('fs');
//update method
Update_Route.put("/update/:id",RouteCheckUsingJWT, async function (req, res) {
  console.log(req.body);
  const id = req.params.id;
    // Extract the day, month, and year
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1; // Month is zero-based, so we add 1
    const year = new Date().getFullYear();
    
    // Convert to Dhaka time zone
    const options = { timeZone: 'Asia/Dhaka' };
    const dhakaTime = new Date().toLocaleString('en-US', { ...options, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    
    // Format the date as "day-month-year" and time as "hour:minute:second AM/PM"
    if(day<10){
      day='0'+day
    }
    if(month<10){
  month='0'+month;
    }

  //public to private or private to public 
  const privateDir =  path.resolve(__dirname, '..', 'private/uploadDoc');
  // path.resolve(__dirname, '..', 'private');
  // const publicDir = path.join(__dirname, 'public');
  const publicDir = path.resolve(__dirname, '..', 'public/uploadDoc');

  const query_dataTypes=`select*from fileupload where DOCUMENTS_ID =${id}`;
  const resultcheck = await DBQuery(query_dataTypes);
  console.log("query_dataTypes",resultcheck)

  if (req.body.doctype === 'public') {
    resultcheck.forEach(row => {
      const fileName = row.FILENAME;
      const privateFilePath = path.join(privateDir, fileName);
      const publicFilePath = path.join(publicDir, fileName);
      console.log("privateFilePath",privateFilePath)
      if (fs.existsSync(privateFilePath)) {
        console.log("privateFilePath2",privateFilePath)
        fs.renameSync(privateFilePath, publicFilePath);
      }
    });
  } else if (req.body.doctype === 'private') {
    resultcheck.forEach(row => {
      const fileName = row.FILENAME;
      const privateFilePath = path.join(privateDir, fileName);
      const publicFilePath = path.join(publicDir, fileName);
      console.log("publicFilePath",publicFilePath)
      if (fs.existsSync(publicFilePath)) {
        console.log("publicFilePath",publicFilePath)
        fs.renameSync(publicFilePath, privateFilePath);
      }
    });
  }


    const formattedDateTime = `${day}-${month}-${year}, ${dhakaTime}`;
  const { category_id, document_id, meeting_date,doctype } = req.body;
  const query = `update documents set  CATEGORY_ID='${category_id}',MEETING_ID='${document_id}',meeting_date='${meeting_date}',DOCTYPE='${doctype}',update_at='${formattedDateTime}' where id=${id}`;
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

const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
const RouteCheckUsingJWT = require("../Database/RouteChecking/RouteCheckingUsingjws");
// all public routes start

View_Route.get("/getdatapublic", async function (req, res) {
 //("getdata")
  const query =
    `SELECT category.category_name as NAME ,documents.* from documents inner join category on documents.category_id=category.id`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
 
});
View_Route.get("/categorylistpublic", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);
  console.log("result",result)
  res.status(200).json({
    success: true,
    data: result,
  });
})
View_Route.get("/docslistPublic",async function (req, res) {
  const s = req.params.id;

  const query = `SELECT category.category_name as NAME, documents.*,fileupload.*  FROM fileupload
   inner join documents on documents.id=fileupload.documents_id
inner join category on category.id=documents.category_id where documents.doctype='public'
    order by fileupload.id asc `;

  const result = await DBQuery(query);
 //(result)
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/categoryPublic", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//all  public routes end
//get method
View_Route.get("/getdata",RouteCheckUsingJWT, async function (req, res) {
 //("getdata")
 if(req.user_rule=='Admin'){
  const query =
  `SELECT category.category_name as NAME ,documents.* from documents inner join category on documents.category_id=category.id`;
const result = await DBQuery(query);

res.status(200).json({
  success: true,
  data: result,
});
 }
 else{
  const query =
  `SELECT category.category_name as NAME ,documents.* from documents inner join category on documents.category_id=category.id where documents.emp_id=${req.user_id}`;
const result = await DBQuery(query);

res.status(200).json({
  success: true,
  data: result,
});
 }

  ////(rows);
});
//get category wise 
View_Route.get("/getdataCategory_wise/:usertype", RouteCheckUsingJWT,async function (req, res) {

  const usertype1 = req.params.usertype;
 //("getdata",usertype1)
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

  ////(rows);
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
 //(result)
  res.status(200).json({
    success: true,
    data: result,
  });
});
//category view
View_Route.get("/category/view",RouteCheckUsingJWT, async function (req, res) {
  const s = req.params.id;
 
  console.log("user_rule",req.user_rule,"req.user_id",req.user_id)
  if(req.user_rule=='Admin'){
    const query = `SELECT*from category `;

    const result = await DBQuery(query);
  
    res.status(200).json({
      success: true,
      data: result,
    });
  }
  else{
    const query = `SELECT*from category where emp_id=${req.user_id} `;

    const result = await DBQuery(query);
  
    res.status(200).json({
      success: true,
      data: result,
    });
  }

});
// categoryfor_documentlist page
View_Route.get("/categoryfor_documentlist/view",RouteCheckUsingJWT, async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//category list dashboard


//get document last id
View_Route.get("/getlastId/:docType",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

 //(docTye);
  
  const query = `SELECT MAX(CAST(meeting_id AS int)) AS id from documents where category_id='${docTye}' `;

  const result = await DBQuery(query);
 //(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/loger/view",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

 //(docTye);
  
  const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id order by logers.id desc`;

  const result = await DBQuery(query);
 //(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//readdownload
View_Route.get("/get/totalread_download",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

 //(docTye);
  
  const query = `SELECT read_download.*,users.name,users.mobile,users.user_id,category.category_name from read_download inner join users on read_download.emp_id=users.user_id
  inner join category on read_download.category=category.id
 `;

  const result = await DBQuery(query);
 //(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});

View_Route.get("/update/exitTime",RouteCheckUsingJWT, async function (req, res) {
 

 //("req.user_id",req.user_id);
  
  const query = `SELECT*from logers where user_id=${req.user_id} order by id desc`;

  const result = await DBQuery(query);
  const currentDate = new Date();

  // Extract the day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const year = currentDate.getFullYear();
  
  // Convert to Dhaka time zone
  const options = { timeZone: 'Asia/Dhaka' };
  const dhakaTime = currentDate.toLocaleString('en-US', { ...options, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
  
  // Format the date as "day-month-year" and time as "hour:minute:second AM/PM"
  if(day<10){
    day='0'+day
  }
  if(month<10){
month='0'+month;
  }
  const formattedDateTime = `${day}-${month}-${year}, ${dhakaTime}`;
  
 //("Formatted DateTime:", formattedDateTime);
  const Updatequery = `update logers set EXIT_TIME='${formattedDateTime}'  where id='${result[0]?.ID}'`;
  const result2 = await DBQuery(Updatequery);
 //(result2);
  res.status(200).json({
    success: true,
   
  });
});
View_Route.get("/getallusers",RouteCheckUsingJWT, async function (req, res) {
  const docTye = req.params.docType;

 //(docTye);
  
  const query = `SELECT*from users order by id asc`;

  const result = await DBQuery(query);
 //(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/gettoday_visitore",RouteCheckUsingJWT, async function (req, res) {
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const year = currentDate.getFullYear();
  const todaydate=day+"-"+month+"-"+year

 //("today",todaydate);
  
  const query = `SELECT distinct(terminal_ip) FROM logers  WHERE DATE(CREATED_AT) = '${todaydate}'`;

  const result = await DBQuery(query);
 //(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/report/:reporttype",RouteCheckUsingJWT, async function (req, res) {
 //(req.params.reporttype)
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const year = currentDate.getFullYear();
  const todaydate=year+"-"+month+"-"+day

 //("today",todaydate);
  // if(req.params.reporttype=="daywise"){
  //  // const query = `SELECT distinct(terminal_ip) FROM logers  WHERE DATE(CREATED_AT) = '${todaydate}'`;
  //  //SELECT DISTINCT terminal_ip FROM logers WHERE YEAR(CREATED_AT) = 2024 AND DAY(CREATED_AT) = 19; 
  //   const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id  WHERE YEAR(CREATED_AT) = ${year} AND DAY(CREATED_AT) = ${day} order by logers.id desc`;
  //   const result = await DBQuery(query);
  //  //(result);
  //   res.status(200).json({
  //     success: true,
  //     data: result,
  //   });
  // }
  // else if(req.params.reporttype=="monthwise"){
  //   const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id  WHERE YEAR(CREATED_AT) = ${year} AND MONTH(CREATED_AT) = ${month} order by logers.id desc`;
  //   const result = await DBQuery(query);
  //  //(result);
  //   res.status(200).json({
  //     success: true,
  //     data: result,
  //   });
  // }
  // else if(req.params.reporttype=="yearwise"){
  //   const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id  WHERE YEAR(CREATED_AT) = ${year} order by logers.id desc`;
  //   const result = await DBQuery(query);
  //  //(result);
  //   res.status(200).json({
  //     success: true,
  //     data: result,
  //   });
  // }
 
    const query = `SELECT logers.*,users.NAME from logers inner join users on logers.user_id=users.user_id order by logers.id desc`;
    const result = await DBQuery(query);
   //(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  

});
View_Route.get("/report/:datefrom/:dateto",RouteCheckUsingJWT, async function (req, res) {

 let fromdate=req.params.datefrom.split('-')[2]+"-"+req.params.datefrom.split('-')[1]+"-"+req.params.datefrom.split('-')[0]
 let todate=req.params.dateto.split('-')[2]+"-"+req.params.dateto.split('-')[1]+"-"+req.params.dateto.split('-')[0]
 console.log(fromdate)
 console.log(todate)
 
 
  const query = `
  SELECT logers.*, users.NAME 
  FROM logers 
  INNER JOIN users ON logers.user_id = users.user_id 
  WHERE (logers.CREATED_AT >= '${fromdate}' AND logers.CREATED_AT <= '${todate}') 
    OR logers.CREATED_AT LIKE '%${fromdate}%' 
    OR logers.CREATED_AT LIKE '%${todate}%'
  ORDER BY logers.id DESC;
`;

    const result = await DBQuery(query);
   console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  

});
View_Route.get("/get/users",RouteCheckUsingJWT, async function (req, res) {
  const currentDate = new Date();
  const query = `select name,email,designation,nidnumber,user_id,user_rule,usertype,  mobile from users order by name desc `;

  const result = await DBQuery(query);
 
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/get/readdownload/:type",RouteCheckUsingJWT, async function (req, res) {
 console.log(req.params.type)
 if(req.params.type=="download"){
  const query = `select  read_download.*,users.usertype,users.user_rule,users.name,category.category_name from read_download inner join users on read_download.emp_id=users.user_id
  inner join category on read_download.category=category.id where read_download.process_type='Download' `;

  const result = await DBQuery(query);
 
  res.status(200).json({
    success: true,
    data: result,
  });
 }
 else{
  const query = `select  read_download.*,users.usertype,users.user_rule,users.name,category.category_name from read_download inner join users on read_download.emp_id=users.user_id
  inner join category on read_download.category=category.id where read_download.process_type='Reading' `;

  const result = await DBQuery(query);
 
  res.status(200).json({
    success: true,
    data: result,
  });
 }

});
module.exports = View_Route;

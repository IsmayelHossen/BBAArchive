const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DBQuery = require("../Database/Query_Builder");
const LoginRegRouter = express.Router();
//signup route
LoginRegRouter.post("/reg", async function (req, res, next) {
  console.log(req.body);
  try {
     
    const ip = req.ip || req.remoteAddress;
    // const ENTRY_USER = logInfo?.employe_id;
   
    const TERMINAL_TYPE =  req.device?.type;;
 
    const id = Math.floor(Math.random() * 100);
    const hasPassword = await bcrypt.hash(req.body.password, 10);

  
    const visitor_user="select max(user_id) as user_id from users where usertype='public'";
    const visitor_user_result = await DBQuery(visitor_user);
    const visitor_user_mobile = `select * from users where mobile='${req.body.mobile}'`;
    const visitor_user_mobile_result = await DBQuery(visitor_user_mobile);
    const user_nidnumber = `select * from users where nidnumber='${req.body.nid}'`;
    const user__nidnumber_result = await DBQuery(user_nidnumber);
    console.log("visitor_user_result",visitor_user_mobile_result[0]?.mobile)
    if (visitor_user_mobile_result.length > 0) {
      // Mobile number already exists
      return res.status(200).json({
          Existmobile: true,
          message: "Mobile number already exists",
      });
  } 
  else if (user__nidnumber_result.length > 0) {
    console.log("NID already exists");
    res.status(200).json({
        ExistNid: true,
        message: "NID number already exists",
    });
}
  else if (visitor_user_result[0].user_id!=null){
      console.log("hittt",visitor_user_result[0].user_id)
    
      // const ENTRY_USER = Number(visitor_user_result[0].user_id) + 1;
      const ENTRY_USER = visitor_user_result[0].user_id + 1;
      console.log("ENTRY_USER", ENTRY_USER)
      const query = `INSERT INTO users(name,email,mobile,nidnumber,password,vcode,terminal_type,terminal_ip,usertype,user_id,user_rule)VALUES('${req.body.username}','${req.body.email}','${req.body.mobile}','${req.body.nid}','${hasPassword}','${req.body.OTP}','${TERMINAL_TYPE}','${ip}','public','${ENTRY_USER}','Reader')`;
      
      const result = await DBQuery(query);
      res.status(200).json({
        success: true,
        data: req.body,
        message: "Signup Successfully Done",
      });
    }
    else{
      const ENTRY_USER=1000;
      const query = `INSERT INTO users(name,email,mobile,nidnumber,password,vcode,terminal_type,terminal_ip,usertype,user_id,user_rule)VALUES('${req.body.username}','${req.body.email}','${req.body.mobile}','${req.body.nid}','${hasPassword}','${req.body.OTP}','${TERMINAL_TYPE}','${ip}','public','${ENTRY_USER}','Reader')`;
      // query = `INSERT INTO userlogin(ID,NAME,EMAIL,PASSWORD) VALUES(2,'ismayel','ismayelhossen123@gmail.com','0123');`;
      const result = await DBQuery(query);
      res.status(200).json({
        success: true,
        data: req.body,
        message: "Signup Successfully Done",
      });
    }

  } catch(error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

//login route
LoginRegRouter.post("/login", async function (req, res, next) {
    console.log(req.body)
  const query = `SELECT*FROM users WHERE mobile='${req.body.mobile}' and userverified=1 `;
  const findUser = await DBQuery(query);
  console.log("findUser",findUser.length)
  try {
    if ( findUser.length > 0) {
      console.log("in")
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        findUser[0].password
      );
      if (isValidPassword) {
console.log(isValidPassword)
        const token = jwt.sign(
          {
            name: findUser[0].name,
            Email: findUser[0].email,
            Nid: findUser[0].nidnumber,
            usertype:findUser[0].usertype,
            user_id:findUser[0].user_id
          },
          process.env.JWT_TOKEN_SECRET,
          {
            expiresIn: 6000 * 30,
          }
        );
        //add data to loger table start
        const ENTRY_USER=1000;
        const parts = req.ip || req.remoteAddress;
        // const ENTRY_USER = logInfo?.employe_id;
        var ip = parts?.split(':');
         ip = ip[ip.length - 1]
        const TERMINAL_TYPE =  req.device?.type;;
      const query = `INSERT INTO  logers (terminal_type,terminal_ip,user_id,user_rule)VALUES('${TERMINAL_TYPE}','${ip}','${findUser[0].user_id}','${findUser[0].user_rule}')`;
      const savetoLoger = await DBQuery(query)
      console.log("savetoLoger",savetoLoger)
      if(savetoLoger.affectedRows){
        res.status(200).json({
          Success: true,
        access_token: token,
        message: "Login successfully",
     
        });
      }
      //add data to loger table end
     
         
      } else {
       await res.status(200).json({
          Success1: true,
          message: "Authentication failed user password or mobile number wrong",
        });
      }
    } else {
     await res.status(200).json({
        Success2: true,
        message: "Authentication failed user not found",
      });
    }
  } catch (error){
    console.log(error)
    await res.status(401).json({
      error: "Authentication failed",
    });
  }
});
//verify
LoginRegRouter.post("/verify", async function (req, res, next) {
    console.log(req.body);
    try {
      
       const query = `select*from users where  vcode=${req.body.vcode}`;
      // query = `INSERT INTO userlogin(ID,NAME,EMAIL,PASSWORD) VALUES(2,'ismayel','ismayelhossen123@gmail.com','0123');`;
      const result = await DBQuery(query);
      if(result.length>0){
          const query = `update users set userverified=1 where vcode=${req.body.vcode}`;
      const result12 = await DBQuery(query);
      if(result12.affectedRows){
        res.status(200).json({
          success: true,
          data: req.body,
          message: "Signup Successfully Done",
        });
      }
     
    
      }
      else{
        res.status(200).json({
          success: false,
          message: "Some Error!",
        });  
      }
      console.log(result)

    } catch {
      res.status(500).json({
        message: "Signup Failed",
      });
    }
  });
module.exports = LoginRegRouter;
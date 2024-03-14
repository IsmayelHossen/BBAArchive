const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DBQuery = require("../Database/Query_Builder");
const LoginRegRouter = express.Router();
//signup route
LoginRegRouter.post("/reg", async function (req, res, next) {
  console.log(req.body);
  try {
    const id = Math.floor(Math.random() * 100);
    const hasPassword = await bcrypt.hash(req.body.password, 10);
    query = `INSERT INTO users(name,email,mobile,designation,password,vcode)VALUES('${req.body.username}','${req.body.email}','${req.body.mobile}','${req.body.designation}','${hasPassword}','${req.body.OTP}')`;
    // query = `INSERT INTO userlogin(ID,NAME,EMAIL,PASSWORD) VALUES(2,'ismayel','ismayelhossen123@gmail.com','0123');`;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "Signup Successfully Done",
    });
  } catch {
    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

//login route
LoginRegRouter.post("/login", async function (req, res, next) {
    console.log(req.body)
  const query = `SELECT*FROM users WHERE mobile='${req.body.mobile}' and usertype in(1,2) `;
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
          },
          process.env.JWT_TOKEN_SECRET,
          {
            expiresIn: 6000 * 30,
          }
        );
      
        res.cookie("access_token", token, {
          // httpOnly: true, // cookie cannot be accessed by client-side JavaScript
          expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        });
       await res.status(200).json({
            Success: true,
          access_token: token,
          message: "Login successfully",
          email: req.body.email,
          });
         
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
  } catch {
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
          const query = `update users set usertype=1 where vcode=${req.body.vcode}`;
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

const express = require("express");
const jwt = require("jsonwebtoken");
const RouteCheckUsingJWT = (req, res, next) => {
  //console.log(req);
  const { authorization } = req.headers;
  try {
   
    if(authorization){
    const token = authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const { name, Email ,user_id} = decoded;
    req.name = name;
    req.Email = Email;
    req.user_id=user_id;
  
 
    next();
    }

  } catch (error) {
    console.log(error);
    next("Token Not Valid");
  }
};
module.exports = RouteCheckUsingJWT;

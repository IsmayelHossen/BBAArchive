import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import BBAImage from '../../../assets/img/BBA-logo.png';
import LogInHeader from "./LoginHeader";
import axios from "axios";
import { BaseUrl } from "../CommonUrl";
import swal from "sweetalert";
// import useAuth from "./hooks/useAuth";
const Registration = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
//   const { loginAction, user, loginResult } = useAuth()
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };




const onSubmit = (data) => {
    const Otp = Math.floor(Math.random() * 1000000);
    data.OTP=Otp;
    console.log("data",data)
    console.log("nid",typeof data.nid.length)
     if (data.mobile.length !== 11) {
      swal({
        title: "Mobile Number must be exactly 11 digits!!",
        icon: "error",
        button: "Ok!",
      });
      return;
    }
   
    else if (data.nid.length!==10&&data.nid.length!==13&&data.nid.length!== 17) {
      swal({
        title: "NID number must be either 10, 13, or 17 digits long!!",
        icon: "error",
        button: "Ok!",
      });
      
    }
    else if(data.password!=data.repassword){
      swal({
        title: "Password not match!",
        icon: "error",
        button: "Ok!",
      });
    }
    else{
      axios
          .post(`${BaseUrl}/loginReg/reg`, data, {
            
          })
          .then((response) => {
            console.log("response",response)
            if(response.data.Existmobile==true){
              swal({
                title: "Already this mobile number is exists!",
                icon: "error",
                button: "Ok!",
              });
            }
            else if(response.data.ExistNid==true){
              swal({
                title: "Already this nid number is exists!",
                icon: "error",
                button: "Ok!",
              });
            }
            
            else {
                const mobile=data.mobile 

            const Msg = `BBA ARCHIVE:OTP is ${Otp}`;
           
            //sms send  for librarian
            // LIB_GETREQUESTSMS
            if (response.data.success==true) {
              fetch(
                `https://eservice.bba.gov.bd/api/sms?mobile=${mobile}&apikey=$2a$12$X3ydCr5No7MfKe2aFNJriuVl5YIXQH3thNA.dD.eD0FOmSf92eP2O&message=${Msg}`
              );
              navigate('/verify/')
            }
           
              
             
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  
      };
    




  //
  return (
    <>
      <div>

<div className="container mt-5">
<div className="company-info">
  <img src={`${BBAImage}`} alt="BBA Archive" className="company-logo img-fluid" />
  <h1 className="company-name">BBA Archive</h1>
</div>
  <div className="signup-form">
    <form  onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <div className="form-group input-container">
       
        <input type="text" className="form-control login-form"  {...register("username", {
           required: 'User name is required',
          })} placeholder="User Name" required="required" />
           <span className="required-asterisk">*</span>
           {errors.username && <span style={{color:'red',textAlign:'left'}}>{errors.username.message}</span>}
      </div>
      <div className="form-group input-container">
     
        <input type="number" className="form-control login-form" {...register("mobile", {
            required: 'Mobile number is required',
          })} placeholder="Mobile Number" required="required" />
           <span className="required-asterisk">*</span>
           {errors.mobile && <span style={{color:'red',textAlign:'left'}}>{errors.mobile.message}</span>}
      </div>
      <div className="form-group">
        <input type="email" className="form-control login-form" {...register("email", {
         
          })} placeholder="Email"  />
          
      </div>
      <div className="form-group input-container">
     
        <input type="number" className="form-control login-form" {...register("nid", {
           required: 'NID is required',
          })} placeholder="NID number" required="required" />
           <span className="required-asterisk">*</span>
           {errors.nid && <span style={{color:'red',textAlign:'left'}}>{errors.nid.message}</span>}
      </div>
      <div className="form-group input-container">
     
        <input type="password" className="form-control login-form" {...register("password", {
           required: 'Password is required',
          })} placeholder="Password" required="required" />
           <span className="required-asterisk">*</span>
           {errors.password && <span style={{color:'red',textAlign:'left'}}>{errors.password.message}</span>}
      </div>
      <div className="form-group input-container">
        
        <input type="password" className="form-control login-form" {...register("repassword", {
           required: 'Re password is required',
          })} placeholder="Re-Password" required="required" />
           <span className="required-asterisk">*</span>
           {errors.repassword && <span style={{color:'red',textAlign:'left'}}>{errors.repassword.message}</span>}
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary custom-primary btn-block">Sign Up</button>
      </div>
      <div className="text-center">Already have an account? <Link to="/">Sign In here</Link></div>
    </form>
  </div>
</div>

      </div>
    </>
  );
}
export default Registration;

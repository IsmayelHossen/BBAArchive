import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../../Entryfile/imagepath';
import LogInHeader from "./LoginHeader";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { BaseUrl } from "../CommonUrl";
// import useAuth from "./hooks/useAuth";
import { headerlogo } from '../../../Entryfile/imagepath'
import BBAImage from '../../../assets/img/BBA-logo.png';
import swal from "sweetalert";
import Cookies from "js-cookie";
const Login = () => {
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
console.log("data",data)
if (data.mobile.length !== 11) {
  swal({
    title: "Number must be exactly 11 digits!!",
    icon: "error",
    button: "Ok!",
  });
  return;
}
else{
  axios
  .post(`${BaseUrl}/loginReg/login`, data, {
    
  })
  .then((response) => {
    console.log("response",response)
   
     if(response.data.Success1){
      swal({
        title: "Mobile number or Password wrong!!",
        icon: "error",
        button: "Ok!",
      });
    }
    else if(response.data.Success2){
      swal({
        title: "User Not Found!!",
        icon: "error",
        button: "Ok!",
      });
    }
    else{
      const token=response.data.access_token;
      Cookies.set('myCookie', token, { expires: 1/8 }); 
      const decodedToken = jwtDecode(token);
      localStorage.setItem('userData', JSON.stringify(decodedToken));
  
      // window.location.href=('/docs/')
      window.location.href=('/docs')
     
     
     
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
        {
        //   <div className="mb-5">
        //     <LogInHeader></LogInHeader>
        //     <div>
        //       <div className="row  page-size my-5">
        //         <div className="col-lg-3 col-sm-3 col-md-12 bg-primary d-flex justify-content-center  align-items-center">
        //           <div className="text-center p-lg-0 p-5">
        //             <img src="" className="image-size" alt="" />
        //             <h3 className="text-white fw-bold mt-2">
        //               BANGLADESH BRIDGE AUTHORITY
        //             </h3>
        //           </div>
        //         </div>
        //         <div className="col-sm-2 col-md-2 col-lg-2 me-5"></div>

        //         <div className="col-sm-4 col-12 col-md-8 col-lg-4 text-start mt-lg-5 pt-lg-5">
        //           <div className="py-lg-5 border shadow login-style">
        //             <h2 className="fw-bold text-center mt-5">LOG IN</h2>

        //             <form
        //               className="px-5 pb-5"
        //               onSubmit={handleSubmit(onSubmit)}
        //               action=""
        //             >
        //               <div className="mb-3">
        //                 <label
        //                   htmlFor="exampleFormControlInput1"
        //                   className="form-label text-start"
        //                 >
        //                   Username
        //                 </label>
        //                 <input
        //                   value={userData}
        //                   onChange={(e) => setUserData(e.target.value)}
        //                   type="text"
        //                   placeholder="User Name"
        //                   className="form-control w-100"
        //                   id="exampleFormControlInput1"
        //                   required
        //                 />
        //                 <div className="mb-3">
        //                   <label
        //                     htmlFor="exampleFormControlInput2"
        //                     className="form-label text-start pt-2"
        //                   >
        //                     Password
        //                   </label>
        //                   <div className="pass-wrapper d-flex input-group mb-3">
        //                     <input
        //                       value={password}
        //                       className="form-control"
        //                       placeholder="Password"
        //                       name="password"
        //                       type={passwordShown ? "text" : "password"}
        //                       aria-describedby="basic-addon2"
        //                       onChange={(e) => setPassword(e.target.value)}
        //                       required
        //                     />

        //                     <span
        //                       class="input-group-text btn-eye "
        //                       id="basic-addon2"
        //                     >
        //                       <i
        //                         onClick={togglePasswordVisiblity}
        //                         class={
        //                           passwordShown
        //                             ? "fa fa-eye"
        //                             : "fa fa-eye-slash"
        //                         }
        //                         aria-hidden="true"
        //                       ></i>
        //                     </span>
        //                   </div>

        //                   {/* <input onChange={e => setPassword(e.target.value)} type="password" className="form-control w-100" id="exampleFormControlInput2" /> */}
        //                 </div>

        //                 <br />
        //                 <button
        //                   type="submit"
        //                   className="btn btn-primary fs-5 w-100"
        //                 >
        //                   Log In
        //                   {isLoading ? (
        //                     <div
        //                       style={{ width: "20px", height: "20px" }}
        //                       class="spinner-border ms-2  text-light"
        //                       role="status"
        //                     >
        //                       <span style={{}} class="visually-hidden ">
        //                         Loading...
        //                       </span>
        //                     </div>
        //                   ) : (
        //                     <span> &rarr; </span>
        //                   )}
        //                 </button>
        //               </div>
        //             </form>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        }
<div className="container mt-5">
<div className="company-info">
  <img src={`${BBAImage}`} alt="BBA Archive" className="company-logo img-fluid" />
  <h1 className="company-name">BBA Archive</h1>
</div>
  <div className="signup-form">
  
    <form   onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
     
      <div className="form-group" style={{textAlign: "left"}}>
      <input
        type="number"
        className="form-control login-form"
        {...register("mobile", {
          required: 'Mobile number is required',
          pattern: {
            value: /[0-9]{11}/ig,
            message: 'Number must be exactly 11 digits',
          }
        })}
        placeholder="Mobile Number"
        required
      />
      {errors.mobile && <span style={{color:'red',textAlign:'left'}}>{errors.mobile.message}</span>}
    
      </div>
   
      <div className="form-group" style={{textAlign: "left"}}>
        <input type="password" className="form-control login-form" 
          {...register("password", {
            required: 'Password is required',
           
          })} placeholder="Password"  />
           {errors.password && <span style={{color:'red',textAlign:'left'}}>{errors.password.message}</span>}
      </div>
      <div className="form-group" >
        <button type="submit" className="btn btn-primary custom-primary btn-block">Sign In</button>
      </div>
      <div className="text-center">Don't have any account? <Link to="/registration">Sign Up here</Link></div>
    
    </form>
  </div>
</div>

      </div>
    </>
  );
}
export default Login;

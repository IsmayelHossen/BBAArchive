import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../CommonUrl';
import swal from 'sweetalert';
import BBAImage from '../../../assets/img/BBA-logo.png';
const Verify = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
            axios
              .post(`${BaseUrl}/loginReg/verify`, data, {
                
              })
              .then((response) => {
             
                if (response.data.success==true) {
                    navigate('/login')
                 
                }
                else{
                  swal({
                    title: "OTP Number is wrong!!",
                    icon: "error",
                    button: "Ok!",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          };
    return (

<div className="container mt-5">
<div className="company-info">
  <img src={`${BBAImage}`} alt="BBA Archive" className="company-logo img-fluid" />
  <h1 className="company-name">BBA Archive</h1>
</div>
  <div className="signup-form">
    <form   onSubmit={handleSubmit(onSubmit)}>
    <h4>Verify Mobile Number</h4>
     
      <div className="form-group" style={{textAlign:'left'}}>
        <input type="number" className="form-control login-form" {...register("vcode", {
             required: 'OTP is required',
          })} placeholder="OTP Number" required="required" />
            {errors.vcode && <span style={{color:'red',textAlign:'left'}}>{errors.vcode.message}</span>}
      </div>
     
      <div className="form-group">
        <button type="submit" className="btn btn-primary custom-primary btn-block">Submit</button>
      </div>
      <div className="text-center"><span style={{color:'red',fontSize:'16px'}}>*</span>OTP is sent to your mobile,please check and verify</div>
    
    </form>
  </div>
</div>

       
    );
}

export default Verify;

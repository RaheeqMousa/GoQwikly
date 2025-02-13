import React, { useState } from 'react';
import style from './ForgotPass.module.css';
import Loader from '../../../component/user/Loader/Loader';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPass() {
    console.log('Resetting');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error,setError]=useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail } = useParams();
  const navigate = useNavigate();

  const resetPass = async (data) => {
    setIsLoading(true);
    console.log(data, userEmail);
    if(data.password!==data.confirmPass) {
        setError("Passwords do not match")
        setIsLoading(false);
        return;
    }
    try {
      const res = await axios.patch('https://ecommerce-node4.onrender.com/auth/forgotPassword', {
        email:userEmail, 
        password: data.password,
        code: data.code
      });

      console.log(res);
      if (res.status === 200) {
        console.log("success");
        navigate('/auth/login');
      }
    } catch (e) {
      console.log(e.response.data);
      setError("Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={`d-flex justify-content-center align-items-center vh-100 ${style.back}`}>
        <form className={`${style.resetPassForm} d-flex flex-column gap-4`} onSubmit={handleSubmit(resetPass)}>
          <div className='d-flex align-items-center justify-content-center'>
            <h3>Reset Password</h3>
          </div>
          {error && <div className='text-danger fw-bold'>{error}</div>}

          <div className='d-flex justify-content-center align-items-start flex-column gap-5'>
            {/* New Password */}
            <div className='d-flex gap-3'>
              
              <input type="password" id="password" className='fs-5' placeholder='Enter new Password'
                {...register("password", { required: "New password is required" })}
              />
            </div>
            {errors.password && <div className='text-danger'>{errors.password.message}</div>}

            {/* Confirm Password */}
            <div className='d-flex gap-3'>
              
              <input type="password" id="confirmPass" className='fs-5' placeholder='Enter new Password again'
                {...register("confirmPass", { required: "Confirmation is required" })}
              />
            </div>
            {errors.confirmPass && <div className='text-danger'>{errors.confirmPass.message}</div>}

            {/* Sent Code */}
            <div className='d-flex gap-3'>
             
              <input type="text" id="sentCode" className='fs-5' placeholder='Enter sent code'
                {...register("code", { required: "Code is required" })}
              />
            </div>
            {errors.code && <div className='text-danger'>{errors.code.message}</div>}

            {/* Submit Button */}
            <div className='d-flex align-items-center justify-content-center w-100'>
              <button type='submit' className='btn btn-dark rounded py-2 px-4'>Reset Password</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

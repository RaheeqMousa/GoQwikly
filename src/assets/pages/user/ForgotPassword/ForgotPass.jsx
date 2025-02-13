import React,{useState } from 'react'
import style from './ForgotPass.module.css'
import Loader from '../../../component/user/Loader/Loader'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function ForgotPass() {

    const {register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading,setIsLoading]=useState(false);

    const navigate =useNavigate();
    const sendCode=async (data)=>{
      setIsLoading(true);
      try{

        // Send Email Code Here
        const res= await axios.patch('https://ecommerce-node4.onrender.com/auth/sendcode',data );
        console.log(data, " ", res);
        if(res.status === 200){
          console.log("email sent successfully");
          navigate(`/auth/resetPass/${data.email}`)
          // navigate to reset password page
          console.log("navigate to reset password page");
        }
      }catch(e){
        console.log(e)
        
      }finally{
        setIsLoading(false);
      }
    }

    if(isLoading){
      return <Loader />
    }

  return (
   <>
    <div className={`d-flex justify-content-center align-items-center vh-100  ${style.back}`}>
        <form className={`${style.forgotPassForm} d-flex flex-column gap-5`} onSubmit={handleSubmit(sendCode)}>
            <div className='d-flex align-items-center justify-content-center'>
              <h3>Forgot Password</h3>
            </div>

            <div className='d-flex jusify-content-center align-items-start flex-column gap-5'>
              <div className='d-flex gap-3'>
                <label for="email" className='fs-3'>Email:</label>
                <input type="email" id="email" name="email" className='fs-5' placeholder='Enter your Email:' {...register("email",{required:"email address is required"}) }/>
              </div>
              {errors.email && <div className='text-danger'>{errors.email?.message}</div>}
              
              <div className='d-flex align-items-center justify-content-center w-100'>
                <button type='submit' className='btn btn-dark rounded py-2 px-4 '>Send Code </button>
              </div>
              
            </div>
           
        </form>
    </div> 
   </>

  )
}
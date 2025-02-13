import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import {Link} from 'react-router-dom'


export default function LoginScreen() {
  const [isLoading,setIsLoading] = useState(false);
  const [serverError,setServerError]=useState(null);
  const {register,handleSubmit,reset,formState:{errors}}=useForm();
  const navigate=useNavigate();

  const registerUser=async (value)=>{
    setIsLoading(true);
   
      try{
      //send data to API
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`,value);
      navigate('/products')

      if(response.status==200){//success alert and navigate to login
        
        localStorage.setItem('userToken',response.data.token);
        console.log(localStorage.getItem('userToken')," fffff");
        toast('user logged in Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

      }
    }catch(e){
      console.log(e.response);
    }finally{
      setIsLoading(false);
    }
  }


  return (

    <>
    <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.back}`} >
      <form onSubmit={handleSubmit(registerUser)} className={`d-flex  justify-content-center align-items-center flex-column gap-4 py-5 ${styles.loginForm}`}>
        <h2 className='text-center'>Login</h2>
        <div>
          <input type="email" placeholder="Enter email" {...register("email",{required:"email is required"})} />
          {errors.userName? <div className='text-danger'>{errors.email?.message}</div>:null}
        </div>

        <div controlid="floatingInput" label="password" className="mb-3">
          <input type="password" placeholder="Enter password" {...register("password",{required:"password is required"})}/>
          {errors.userName? <div className='text-danger'>{errors.password?.message}</div>:null}
        </div>

        {serverError && <div className='text-danger'>{serverError}</div>}

        <Link to='/auth/register'>Don't have an account?</Link>
        <Link to='/auth/forgotPass' >Forgot password?</Link>
        <button type="submit"  disabled={isLoading}>{isLoading?"Loading...":"Login"}</button>
      </form>
    </div>
    </>
    
  )
}

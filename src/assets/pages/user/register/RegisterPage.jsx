import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { toast, Bounce } from'react-toastify';


export default function RegisterPage() {

  const [isLoading,setIsLoading] = useState(false);
  const [serverError,setServerError]=useState(null);
  const {register,handleSubmit,reset,formState:{errors}}=useForm();
  const navigate=useNavigate();

  const registerUser=async (value)=>{
    setIsLoading(true);
   
      try{
      //send data to API
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`,value);
      if(response.status==201){//success alert and navigate to login
        navigate("/login");

        toast('Added Successfully, check your email', {
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
      
      // if(response.status==500){
      //   toast(`Error, ${error?.message}`, {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     transition: Bounce,
      //     });
      // }
    }catch(e){
      console.log(errors);
        setServerError(e.response.data);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.back}`} >
        <form onSubmit={handleSubmit(registerUser)} className={`d-flex  justify-content-center align-items-center flex-column gap-4 py-5 ${styles.signUp}`}>
          <h2>SignUp</h2>
          <div>
            <input type="text" placeholder="Enter username" 
            {...register("userName",{required:"userName is required"})}  />

            {errors.userName? <div className='text-danger'>{errors.userName?.message}</div>:null}
            
          </div>

          <div>
            <input type="email"  placeholder="Enter email" {...register("email",{required:"email is required"})} />
            {errors.email? <div className='text-danger'>{errors.email?.message}</div>:null}
          </div>
          
          <div controlid="floatingInput" label="password" className="mb-3">
            <input type="password"  placeholder="Enter password" {...register("password",{required:"password is required"})}/>
            {errors.password? <div className='text-danger'>{errors.password?.message}</div>:null}
          </div>

          {serverError && <div className='text-danger'>{serverError?.message}</div>}

          <Link to='/auth/login'>Already have an account?</Link>
          <button type="submit" disabled={isLoading}>{isLoading?"Loading...":"Register"}</button>
        </form>
      </div>
    </>
 
    
  )
}
